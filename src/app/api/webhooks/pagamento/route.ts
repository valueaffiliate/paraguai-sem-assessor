import { NextResponse } from "next/server";
import { processWebhook } from "@/lib/orders";

/** URL para cadastrar no painel do gateway: https://SEU-DOMINIO/api/webhooks/pagamento */
export async function POST(req: Request) {
  const rawBody = await req.text();
  try {
    const result = await processWebhook(rawBody, req.headers);
    return NextResponse.json(result);
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    if (/assinatura/i.test(msg)) return NextResponse.json({ error: "Assinatura inválida" }, { status: 401 });
    console.error("[webhook]", e);
    // 500 faz o gateway tentar de novo mais tarde.
    return NextResponse.json({ error: "Erro ao processar" }, { status: 500 });
  }
}
