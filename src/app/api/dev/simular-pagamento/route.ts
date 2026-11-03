import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { isTestGateway } from "@/lib/payments";
import { signMockPayload } from "@/lib/payments/gateways/mock";
import { processWebhook } from "@/lib/orders";
import { getStore } from "@/lib/store";

/** Só existe com o gateway de teste. Simula o webhook de "pago" de um pedido. */
export async function POST(req: Request) {
  if (!isTestGateway() || process.env.VERCEL_ENV === "production") {
    return NextResponse.json({ error: "Indisponível" }, { status: 404 });
  }
  const { orderId } = (await req.json().catch(() => ({}))) as { orderId?: string };
  const order = orderId ? await getStore().getOrder(orderId) : null;
  if (!order?.providerChargeId) return NextResponse.json({ error: "Pedido não encontrado" }, { status: 404 });

  const rawBody = JSON.stringify({
    id: `evt_${randomUUID()}`,
    charge_id: order.providerChargeId,
    status: "paid",
    amount_cents: order.amountCents,
  });
  const headers = new Headers({ "x-signature": signMockPayload(rawBody) });
  return NextResponse.json(await processWebhook(rawBody, headers));
}
