export type OrderStatus = "pending" | "paid" | "failed" | "expired" | "refunded" | "canceled";
export type PaymentMethod = "pix" | "card";

export interface Customer {
  name: string;
  email: string;
  /** CPF só com dígitos. */
  document: string;
  phone?: string;
}

/** O que o checkout mostra depois de criar a cobrança. */
export type ChargeResult =
  | {
      kind: "pix";
      providerChargeId: string;
      /** Código Pix copia e cola (EMV). */
      copyPaste: string;
      /** Imagem do QR em data URI, se o gateway devolver. Caso contrário é gerada a partir do copia e cola. */
      qrImage?: string;
      expiresAt?: string;
    }
  | {
      kind: "redirect";
      providerChargeId: string;
      /** Página de pagamento hospedada pelo gateway (cartão, por exemplo). */
      url: string;
    };

export interface CreateChargeInput {
  orderId: string;
  amountCents: number;
  currency: string;
  description: string;
  method: PaymentMethod;
  customer: Customer;
  /** URL pública do webhook. */
  notificationUrl: string;
  /** Para onde o gateway devolve o cliente (pagamento por redirecionamento). */
  returnUrl: string;
}

/** Evento de webhook já validado e traduzido para o formato interno. */
export interface WebhookEvent {
  providerEventId?: string;
  providerChargeId?: string;
  /** Algumas integrações devolvem o nosso id do pedido como referência externa. */
  orderId?: string;
  status: OrderStatus;
  /** Valor pago informado pelo gateway, para conferência. */
  amountCents?: number;
  raw: unknown;
}

export interface PaymentGateway {
  readonly id: string;
  readonly methods: PaymentMethod[];
  createCharge(input: CreateChargeInput): Promise<ChargeResult>;
  /** Valida a assinatura e traduz o corpo do webhook. Deve lançar erro se a assinatura for inválida. */
  parseWebhook(req: { rawBody: string; headers: Headers }): Promise<WebhookEvent>;
}
