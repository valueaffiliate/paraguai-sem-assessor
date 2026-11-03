import { NextResponse } from "next/server";
import { publicOrder } from "@/lib/orders";
import { getStore } from "@/lib/store";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function GET(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id } = await ctx.params;
  if (!UUID.test(id)) return NextResponse.json({ error: "Pedido não encontrado." }, { status: 404 });
  const order = await getStore().getOrder(id);
  if (!order) return NextResponse.json({ error: "Pedido não encontrado." }, { status: 404 });
  return NextResponse.json(publicOrder(order), { headers: { "Cache-Control": "no-store" } });
}
