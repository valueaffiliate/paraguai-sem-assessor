import { createHmac, randomUUID } from "node:crypto";
import type { PaymentGateway, WebhookEvent } from "../types";

/**
 * Gateway de TESTE. Não cobra nada.
 * Gera um Pix fictício e só é confirmado pela rota /api/dev/simular-pagamento.
 * Bloqueado em produção na Vercel (ver getGateway).
 */
export const mockGateway: PaymentGateway = {
  id: "mock",
  methods: ["pix", "card"],

  async createCharge(input) {
    const providerChargeId = `mock_${randomUUID()}`;
    if (input.method === "card") {
      return {
        kind: "redirect",
        providerChargeId,
        url: `${input.returnUrl}${input.returnUrl.includes("?") ? "&" : "?"}simulado=1`,
      };
    }
    return {
      kind: "pix",
      providerChargeId,
      copyPaste: `00020126TESTE-PIX-SEM-VALOR-${providerChargeId}5204000053039865406${(input.amountCents / 100).toFixed(2)}5802BR6304TEST`,
      expiresAt: new Date(Date.now() + 30 * 60_000).toISOString(),
    };
  },

  async parseWebhook({ rawBody, headers }) {
    const secret = process.env.PAYMENT_WEBHOOK_SECRET ?? "segredo-de-teste";
    const expected = createHmac("sha256", secret).update(rawBody).digest("hex");
    if (headers.get("x-signature") !== expected) throw new Error("Assinatura inválida");
    const body = JSON.parse(rawBody) as { id: string; charge_id: string; status: WebhookEvent["status"]; amount_cents: number };
    return {
      providerEventId: body.id,
      providerChargeId: body.charge_id,
      status: body.status,
      amountCents: body.amount_cents,
      raw: body,
    };
  },
};

export function signMockPayload(rawBody: string) {
  const secret = process.env.PAYMENT_WEBHOOK_SECRET ?? "segredo-de-teste";
  return createHmac("sha256", secret).update(rawBody).digest("hex");
}
