import { NextResponse } from "next/server";
import { CheckoutError, baseUrl, createCheckout } from "@/lib/orders";

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Requisição inválida." }, { status: 400 });
  }
  try {
    const utm =
      body.utm && typeof body.utm === "object"
        ? Object.fromEntries(
            Object.entries(body.utm as Record<string, unknown>)
              .filter(([k, v]) => /^utm_[a-z]+$/.test(k) && typeof v === "string")
              .map(([k, v]) => [k, String(v).slice(0, 120)]),
          )
        : undefined;
    const result = await createCheckout(
      {
        name: String(body.name ?? ""),
        email: String(body.email ?? ""),
        cpf: String(body.cpf ?? ""),
        phone: body.phone ? String(body.phone) : undefined,
        method: body.method === "card" ? "card" : "pix",
        utm,
      },
      baseUrl(req.url),
    );
    return NextResponse.json(result);
  } catch (e) {
    if (e instanceof CheckoutError) return NextResponse.json({ error: e.message, field: e.field }, { status: 422 });
    console.error("[checkout]", e);
    return NextResponse.json({ error: "Erro inesperado. Tente novamente." }, { status: 500 });
  }
}
