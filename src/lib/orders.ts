import "server-only";
import QRCode from "qrcode";
import { brand, offer, product } from "@/config/site";
import { getGateway } from "@/lib/payments";
import type { ChargeResult, PaymentMethod } from "@/lib/payments/types";
import { getStore } from "@/lib/store";
import type { Order } from "@/lib/store/types";
import { supabaseAdmin, supabaseConfigured } from "@/lib/supabase/admin";
import { isValidCPF, isValidEmail, onlyDigits } from "@/lib/validate";

export class CheckoutError extends Error {
  constructor(message: string, public field?: string) {
    super(message);
  }
}

export interface CheckoutInput {
  name: string;
  email: string;
  cpf: string;
  phone?: string;
  method: PaymentMethod;
  utm?: Record<string, string>;
}

export function baseUrl(requestUrl?: string) {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  if (requestUrl) return new URL(requestUrl).origin;
  return brand.siteUrl;
}

/** Cria o pedido e a cobrança. O valor vem sempre do servidor (config), nunca do navegador. */
export async function createCheckout(input: CheckoutInput, origin: string) {
  const name = input.name?.trim().replace(/\s+/g, " ") ?? "";
  const email = input.email?.trim().toLowerCase() ?? "";
  const cpf = onlyDigits(input.cpf ?? "");
  const phone = input.phone ? onlyDigits(input.phone) : undefined;

  if (name.length < 5 || !name.includes(" ")) throw new CheckoutError("Informe seu nome completo.", "name");
  if (!isValidEmail(email)) throw new CheckoutError("Confira o e-mail informado.", "email");
  if (!isValidCPF(cpf)) throw new CheckoutError("CPF inválido.", "cpf");
  if (phone && (phone.length < 10 || phone.length > 11)) throw new CheckoutError("Telefone inválido.", "phone");

  const gateway = getGateway();
  if (!gateway.methods.includes(input.method)) throw new CheckoutError("Forma de pagamento indisponível.", "method");

  const store = getStore();
  const amountCents = Math.round(offer.launchPrice * 100);
  const order = await store.createOrder({
    product: product.id,
    amountCents,
    currency: offer.currency,
    customer: { name, email, document: cpf, phone },
    provider: gateway.id,
    paymentMethod: input.method,
    utm: input.utm ?? null,
  });

  let charge: ChargeResult;
  try {
    charge = await gateway.createCharge({
      orderId: order.id,
      amountCents,
      currency: offer.currency,
      description: product.name,
      method: input.method,
      customer: order.customer,
      notificationUrl: `${origin}/api/webhooks/pagamento`,
      returnUrl: `${origin}/pedido/${order.id}`,
    });
  } catch (e) {
    await store.setStatus(order.id, "failed");
    console.error("[checkout] falha ao criar cobrança", e);
    throw new CheckoutError("Não foi possível gerar o pagamento agora. Tente novamente em alguns minutos.");
  }

  const paymentData: Record<string, unknown> =
    charge.kind === "pix"
      ? {
          kind: "pix",
          copyPaste: charge.copyPaste,
          qrImage: charge.qrImage ?? (await QRCode.toDataURL(charge.copyPaste, { margin: 1, width: 360 })),
          expiresAt: charge.expiresAt ?? null,
        }
      : { kind: "redirect", url: charge.url };
  await store.attachCharge(order.id, charge.providerChargeId, paymentData);

  return { orderId: order.id, redirectUrl: charge.kind === "redirect" ? charge.url : null };
}

/** Dados públicos do pedido para a tela de pagamento (sem dados pessoais além do e-mail mascarado). */
export function publicOrder(o: Order) {
  const [user, domain] = o.customer.email.split("@");
  const pd = o.paymentData ?? {};
  return {
    id: o.id,
    status: o.status,
    amountCents: o.amountCents,
    method: o.paymentMethod,
    emailMasked: `${user.slice(0, 2)}${"•".repeat(Math.max(1, user.length - 2))}@${domain}`,
    pix:
      o.status === "pending" && pd.kind === "pix"
        ? { copyPaste: String(pd.copyPaste), qrImage: String(pd.qrImage), expiresAt: (pd.expiresAt as string | null) ?? null }
        : null,
    redirectUrl: o.status === "pending" && pd.kind === "redirect" ? String(pd.url) : null,
  };
}
export type PublicOrder = ReturnType<typeof publicOrder>;

/** Cria o usuário no Supabase Auth (se ainda não existir) para o aluno entrar com o próprio e-mail. */
async function ensureAuthUser(email: string, name: string) {
  if (!supabaseConfigured()) return;
  const { error } = await supabaseAdmin().auth.admin.createUser({
    email,
    email_confirm: true,
    user_metadata: { name },
  });
  if (error && !/already|registered|exists/i.test(error.message)) {
    console.error("[acesso] falha ao criar usuário", error.message);
  }
}

/** Processa o webhook do gateway: idempotente, confere valor e libera ou revoga o acesso. */
export async function processWebhook(rawBody: string, headers: Headers) {
  const gateway = getGateway();
  const event = await gateway.parseWebhook({ rawBody, headers }); // lança se a assinatura for inválida
  const store = getStore();

  let order: Order | null = null;
  if (event.providerChargeId) order = await store.findByCharge(gateway.id, event.providerChargeId);
  if (!order && event.orderId) order = await store.getOrder(event.orderId);

  const isNew = await store.recordEvent({
    provider: gateway.id,
    providerEventId: event.providerEventId,
    orderId: order?.id,
    status: event.status,
    payload: event.raw,
  });
  if (!isNew) return { ok: true, duplicate: true };
  if (!order) {
    console.warn("[webhook] pedido não encontrado", event.providerChargeId, event.orderId);
    return { ok: true, ignored: "pedido não encontrado" };
  }

  if (event.status === "paid") {
    if (event.amountCents !== undefined && event.amountCents < order.amountCents) {
      console.error("[webhook] valor pago menor que o pedido", order.id, event.amountCents, order.amountCents);
      return { ok: true, ignored: "valor divergente" };
    }
    await store.setStatus(order.id, "paid");
    await store.grantAccess(order.customer.email, order.product, order.id);
    await ensureAuthUser(order.customer.email, order.customer.name);
    return { ok: true, status: "paid" };
  }

  if (event.status === "refunded") {
    await store.setStatus(order.id, "refunded");
    await store.revokeAccess(order.customer.email, order.product);
    return { ok: true, status: "refunded" };
  }

  await store.setStatus(order.id, event.status);
  return { ok: true, status: event.status };
}
