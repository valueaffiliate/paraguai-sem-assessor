import type { Customer, OrderStatus, PaymentMethod } from "@/lib/payments/types";

export interface Order {
  id: string;
  createdAt: string;
  product: string;
  amountCents: number;
  currency: string;
  status: OrderStatus;
  customer: Customer;
  provider: string;
  providerChargeId: string | null;
  paymentMethod: PaymentMethod | null;
  paymentData: Record<string, unknown> | null;
  paidAt: string | null;
}

export interface NewOrder {
  product: string;
  amountCents: number;
  currency: string;
  customer: Customer;
  provider: string;
  paymentMethod: PaymentMethod;
  utm?: Record<string, string> | null;
}

export interface OrderStore {
  readonly kind: "supabase" | "memory";
  createOrder(o: NewOrder): Promise<Order>;
  getOrder(id: string): Promise<Order | null>;
  findByCharge(provider: string, chargeId: string): Promise<Order | null>;
  attachCharge(id: string, chargeId: string, paymentData: Record<string, unknown>): Promise<void>;
  /** Atualiza o status. Um pedido pago só pode ir para "refunded". Retorna o pedido atualizado. */
  setStatus(id: string, status: OrderStatus): Promise<Order | null>;
  /** Registra o evento. Retorna false se o mesmo evento já tinha sido recebido. */
  recordEvent(e: { provider: string; providerEventId?: string; orderId?: string; status?: string; payload: unknown }): Promise<boolean>;
  grantAccess(email: string, product: string, orderId: string): Promise<void>;
  revokeAccess(email: string, product: string): Promise<void>;
  hasAccess(email: string, product: string): Promise<boolean>;
}
