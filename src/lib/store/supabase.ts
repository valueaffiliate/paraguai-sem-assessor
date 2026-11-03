import "server-only";
import { supabaseAdmin } from "@/lib/supabase/admin";
import type { Order, OrderStore } from "./types";

type Row = {
  id: string;
  created_at: string;
  product: string;
  amount_cents: number;
  currency: string;
  status: Order["status"];
  customer_name: string;
  customer_email: string;
  customer_document: string;
  customer_phone: string | null;
  provider: string;
  provider_charge_id: string | null;
  payment_method: Order["paymentMethod"];
  payment_data: Record<string, unknown> | null;
  paid_at: string | null;
};

const toOrder = (r: Row): Order => ({
  id: r.id,
  createdAt: r.created_at,
  product: r.product,
  amountCents: r.amount_cents,
  currency: r.currency,
  status: r.status,
  customer: { name: r.customer_name, email: r.customer_email, document: r.customer_document, phone: r.customer_phone ?? undefined },
  provider: r.provider,
  providerChargeId: r.provider_charge_id,
  paymentMethod: r.payment_method,
  paymentData: r.payment_data,
  paidAt: r.paid_at,
});

function check<T>(res: { data: T; error: { message: string } | null }): T {
  if (res.error) throw new Error(`Supabase: ${res.error.message}`);
  return res.data;
}

export const supabaseStore: OrderStore = {
  kind: "supabase",
  async createOrder(o) {
    const row = check(
      await supabaseAdmin()
        .from("orders")
        .insert({
          product: o.product,
          amount_cents: o.amountCents,
          currency: o.currency,
          customer_name: o.customer.name,
          customer_email: o.customer.email,
          customer_document: o.customer.document,
          customer_phone: o.customer.phone ?? null,
          provider: o.provider,
          payment_method: o.paymentMethod,
          utm: o.utm ?? null,
        })
        .select()
        .single<Row>(),
    );
    if (!row) throw new Error("Pedido não criado");
    return toOrder(row);
  },
  async getOrder(id) {
    const row = check(await supabaseAdmin().from("orders").select().eq("id", id).maybeSingle<Row>());
    return row ? toOrder(row) : null;
  },
  async findByCharge(provider, chargeId) {
    const row = check(
      await supabaseAdmin().from("orders").select().eq("provider", provider).eq("provider_charge_id", chargeId).maybeSingle<Row>(),
    );
    return row ? toOrder(row) : null;
  },
  async attachCharge(id, chargeId, paymentData) {
    check(
      await supabaseAdmin()
        .from("orders")
        .update({ provider_charge_id: chargeId, payment_data: paymentData, updated_at: new Date().toISOString() })
        .eq("id", id),
    );
  },
  async setStatus(id, status) {
    const now = new Date().toISOString();
    let q = supabaseAdmin()
      .from("orders")
      .update({ status, updated_at: now, ...(status === "paid" ? { paid_at: now } : {}) })
      .eq("id", id);
    // Pedido pago só muda para reembolsado.
    if (status !== "refunded") q = q.neq("status", "paid");
    check(await q);
    return this.getOrder(id);
  },
  async recordEvent(e) {
    const res = await supabaseAdmin().from("payment_events").insert({
      provider: e.provider,
      provider_event_id: e.providerEventId ?? null,
      order_id: e.orderId ?? null,
      status: e.status ?? null,
      payload: e.payload as object,
    });
    if (res.error?.code === "23505") return false; // evento duplicado
    if (res.error) throw new Error(`Supabase: ${res.error.message}`);
    return true;
  },
  async grantAccess(email, product, orderId) {
    const db = supabaseAdmin();
    const existing = check(
      await db.from("entitlements").select("id").eq("email", email.toLowerCase()).eq("product", product).maybeSingle<{ id: string }>(),
    );
    if (existing) {
      check(await db.from("entitlements").update({ revoked_at: null, order_id: orderId }).eq("id", existing.id));
    } else {
      check(await db.from("entitlements").insert({ email: email.toLowerCase(), product, order_id: orderId }));
    }
  },
  async revokeAccess(email, product) {
    check(
      await supabaseAdmin()
        .from("entitlements")
        .update({ revoked_at: new Date().toISOString() })
        .eq("email", email.toLowerCase())
        .eq("product", product),
    );
  },
  async hasAccess(email, product) {
    const row = check(
      await supabaseAdmin()
        .from("entitlements")
        .select("id")
        .eq("email", email.toLowerCase())
        .eq("product", product)
        .is("revoked_at", null)
        .maybeSingle<{ id: string }>(),
    );
    return Boolean(row);
  },
};
