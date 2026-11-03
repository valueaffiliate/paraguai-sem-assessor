import { randomUUID } from "node:crypto";
import type { Order, OrderStore } from "./types";

/** Armazenamento em memória SOMENTE para desenvolvimento local sem Supabase. Perde tudo ao reiniciar. */
type Mem = { orders: Map<string, Order>; events: Set<string>; access: Map<string, boolean> };
const g = globalThis as unknown as { __psaMem?: Mem };
const mem: Mem = (g.__psaMem ??= { orders: new Map(), events: new Set(), access: new Map() });
const key = (email: string, product: string) => `${email.toLowerCase()}|${product}`;

export const memoryStore: OrderStore = {
  kind: "memory",
  async createOrder(o) {
    const order: Order = {
      id: randomUUID(),
      createdAt: new Date().toISOString(),
      product: o.product,
      amountCents: o.amountCents,
      currency: o.currency,
      status: "pending",
      customer: o.customer,
      provider: o.provider,
      providerChargeId: null,
      paymentMethod: o.paymentMethod,
      paymentData: null,
      paidAt: null,
    };
    mem.orders.set(order.id, order);
    return order;
  },
  async getOrder(id) {
    return mem.orders.get(id) ?? null;
  },
  async findByCharge(provider, chargeId) {
    for (const o of mem.orders.values()) if (o.provider === provider && o.providerChargeId === chargeId) return o;
    return null;
  },
  async attachCharge(id, chargeId, paymentData) {
    const o = mem.orders.get(id);
    if (o) Object.assign(o, { providerChargeId: chargeId, paymentData });
  },
  async setStatus(id, status) {
    const o = mem.orders.get(id);
    if (!o) return null;
    if (o.status === "paid" && status !== "refunded") return o;
    o.status = status;
    if (status === "paid" && !o.paidAt) o.paidAt = new Date().toISOString();
    return o;
  },
  async recordEvent(e) {
    if (!e.providerEventId) return true;
    const k = `${e.provider}|${e.providerEventId}`;
    if (mem.events.has(k)) return false;
    mem.events.add(k);
    return true;
  },
  async grantAccess(email, product) {
    mem.access.set(key(email, product), true);
  },
  async revokeAccess(email, product) {
    mem.access.delete(key(email, product));
  },
  async hasAccess(email, product) {
    return mem.access.get(key(email, product)) === true;
  },
};
