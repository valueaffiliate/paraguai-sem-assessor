import { createHmac, timingSafeEqual } from "node:crypto";
import type { OrderStatus, PaymentGateway } from "../types";

/**
 * ADAPTADOR DO SEU GATEWAY.
 *
 * Este arquivo é um modelo para APIs REST comuns de gateways brasileiros.
 * Ajuste os pontos marcados com "AJUSTE" conforme a documentação do seu gateway:
 *   1. endpoint e corpo da criação de cobrança;
 *   2. onde ficam o id da cobrança e o código Pix na resposta;
 *   3. cabeçalho e algoritmo da assinatura do webhook;
 *   4. tradução dos status do gateway para os status internos.
 *
 * Variáveis de ambiente:
 *   PAYMENT_API_URL         ex.: https://api.seugateway.com.br/v1
 *   PAYMENT_API_KEY         chave secreta (nunca vai para o navegador)
 *   PAYMENT_WEBHOOK_SECRET  segredo para validar o webhook
 */

const STATUS_MAP: Record<string, OrderStatus> = {
  // AJUSTE: status do gateway -> status interno
  paid: "paid",
  approved: "paid",
  pago: "paid",
  pending: "pending",
  waiting_payment: "pending",
  refused: "failed",
  failed: "failed",
  expired: "expired",
  canceled: "canceled",
  refunded: "refunded",
  chargedback: "refunded",
};

function env(name: string) {
  const v = process.env[name];
  if (!v) throw new Error(`Variável ${name} não configurada`);
  return v;
}

export const customGateway: PaymentGateway = {
  id: "custom",
  methods: ["pix", "card"],

  async createCharge(input) {
    // AJUSTE 1: endpoint e corpo
    const res = await fetch(`${env("PAYMENT_API_URL")}/charges`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${env("PAYMENT_API_KEY")}`,
        "Idempotency-Key": input.orderId,
      },
      body: JSON.stringify({
        amount: input.amountCents,
        currency: input.currency,
        payment_method: input.method,
        description: input.description,
        external_reference: input.orderId,
        notification_url: input.notificationUrl,
        return_url: input.returnUrl,
        customer: {
          name: input.customer.name,
          email: input.customer.email,
          document: input.customer.document,
          phone: input.customer.phone,
        },
      }),
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error(`Gateway recusou a cobrança (${res.status}): ${(await res.text()).slice(0, 300)}`);
    }
    const data = (await res.json()) as Record<string, unknown>;

    // AJUSTE 2: campos da resposta
    const providerChargeId = String(data.id);
    const pix = data.pix as { qr_code?: string; qr_code_base64?: string; expires_at?: string } | undefined;
    if (input.method === "pix" && pix?.qr_code) {
      return {
        kind: "pix",
        providerChargeId,
        copyPaste: pix.qr_code,
        qrImage: pix.qr_code_base64 ? `data:image/png;base64,${pix.qr_code_base64}` : undefined,
        expiresAt: pix.expires_at,
      };
    }
    const url = (data.checkout_url ?? data.payment_url) as string | undefined;
    if (!url) throw new Error("Resposta do gateway sem Pix nem URL de pagamento");
    return { kind: "redirect", providerChargeId, url };
  },

  async parseWebhook({ rawBody, headers }) {
    // AJUSTE 3: assinatura (aqui: HMAC-SHA256 do corpo em hexadecimal no cabeçalho x-signature)
    const received = headers.get("x-signature") ?? "";
    const expected = createHmac("sha256", env("PAYMENT_WEBHOOK_SECRET")).update(rawBody).digest("hex");
    const a = Buffer.from(received);
    const b = Buffer.from(expected);
    if (a.length !== b.length || !timingSafeEqual(a, b)) throw new Error("Assinatura inválida");

    // AJUSTE 4: formato do evento
    const body = JSON.parse(rawBody) as {
      id?: string;
      data?: { id?: string; status?: string; amount?: number; external_reference?: string };
    };
    const status = STATUS_MAP[String(body.data?.status ?? "").toLowerCase()] ?? "pending";
    return {
      providerEventId: body.id,
      providerChargeId: body.data?.id,
      orderId: body.data?.external_reference,
      status,
      amountCents: body.data?.amount,
      raw: body,
    };
  },
};
