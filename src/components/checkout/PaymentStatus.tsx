"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Copy, Loader2, XCircle } from "lucide-react";
import type { PublicOrder } from "@/lib/orders";
import { trackX } from "@/lib/track";

export function PaymentStatus({ initial, testMode }: { initial: PublicOrder; testMode: boolean }) {
  const [order, setOrder] = useState(initial);
  const [copied, setCopied] = useState(false);
  const [simulating, setSimulating] = useState(false);
  const tracked = useRef(false);

  useEffect(() => {
    if (order.status !== "pending") return;
    const t = setInterval(async () => {
      try {
        const res = await fetch(`/api/pedidos/${order.id}`, { cache: "no-store" });
        if (res.ok) setOrder(await res.json());
      } catch {
        /* tenta de novo no próximo ciclo */
      }
    }, 4000);
    return () => clearInterval(t);
  }, [order.id, order.status]);

  useEffect(() => {
    if (order.status === "paid" && !tracked.current) {
      tracked.current = true;
      trackX("purchase", { conversion_id: order.id });
    }
  }, [order.status, order.id]);

  async function copy() {
    if (!order.pix) return;
    try {
      await navigator.clipboard.writeText(order.pix.copyPaste);
    } catch {
      const el = document.getElementById("pix-code") as HTMLTextAreaElement | null;
      el?.select();
      document.execCommand?.("copy");
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }

  async function simulate() {
    setSimulating(true);
    await fetch("/api/dev/simular-pagamento", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId: order.id }),
    });
    const res = await fetch(`/api/pedidos/${order.id}`, { cache: "no-store" });
    if (res.ok) setOrder(await res.json());
    setSimulating(false);
  }

  const price = (order.amountCents / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  if (order.status === "paid") {
    return (
      <div className="mx-auto max-w-xl rounded-2xl border border-line bg-white p-8 text-center md:p-10">
        <CheckCircle2 size={48} className="mx-auto text-green" aria-hidden />
        <h1 className="mt-4 text-3xl font-extrabold text-navy">Pagamento confirmado</h1>
        <p className="mt-3 leading-relaxed text-ink-soft">
          Seu acesso ao Guia Paraguai Sem Assessor foi liberado para <strong className="text-navy">{order.emailMasked}</strong>.
          Para entrar, use esse e-mail na área do aluno. Você recebe um link de acesso na caixa de entrada.
        </p>
        <Link
          href="/entrar"
          className="mt-7 inline-flex items-center justify-center rounded-full bg-red px-8 py-4 text-[15px] font-semibold text-white hover:brightness-110"
        >
          Entrar na área do aluno
        </Link>
      </div>
    );
  }

  if (order.status !== "pending") {
    const msg: Record<string, string> = {
      failed: "O pagamento não foi aprovado.",
      expired: "O prazo deste pagamento expirou.",
      canceled: "Este pedido foi cancelado.",
      refunded: "Este pedido foi reembolsado.",
    };
    return (
      <div className="mx-auto max-w-xl rounded-2xl border border-line bg-white p-8 text-center md:p-10">
        <XCircle size={48} className="mx-auto text-red" aria-hidden />
        <h1 className="mt-4 text-2xl font-extrabold text-navy">{msg[order.status] ?? "Pagamento não concluído."}</h1>
        <Link href="/checkout" className="mt-7 inline-flex rounded-full bg-navy px-8 py-3.5 text-sm font-semibold text-white">
          Tentar novamente
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-4xl gap-10 md:grid-cols-[1fr_1.1fr] md:items-start">
      <div className="rounded-2xl border border-line bg-white p-6 text-center">
        {order.pix ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={order.pix.qrImage} alt="QR code do Pix" width={280} height={280} className="mx-auto h-auto w-full max-w-[280px]" />
        ) : (
          <Loader2 className="mx-auto my-16 animate-spin text-ink-soft" aria-hidden />
        )}
        <p className="mt-3 flex items-center justify-center gap-2 text-sm text-ink-soft">
          <Loader2 size={14} className="animate-spin" aria-hidden /> Aguardando pagamento
        </p>
      </div>

      <div className="min-w-0">
        <p className="eyebrow text-red">Pagamento via Pix</p>
        <h1 className="mt-3 text-3xl font-extrabold text-navy">
          Pague <span className="tabular">{price}</span> para liberar o guia
        </h1>
        <ol className="mt-6 space-y-2 text-ink-soft">
          <li>1. Abra o app do seu banco e escolha pagar com Pix.</li>
          <li>2. Leia o QR code ou use o código copia e cola.</li>
          <li>3. Esta página atualiza sozinha quando o pagamento for confirmado.</li>
        </ol>
        {order.pix && (
          <>
            <label htmlFor="pix-code" className="mt-7 block text-sm font-medium text-navy">Pix copia e cola</label>
            <textarea
              id="pix-code"
              readOnly
              rows={3}
              value={order.pix.copyPaste}
              className="mt-1.5 w-full resize-none rounded-lg border border-line bg-white p-3 font-mono text-xs text-ink-soft"
            />
            <button
              type="button"
              onClick={copy}
              className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full bg-red px-6 py-3.5 text-[15px] font-semibold text-white hover:brightness-110"
            >
              <Copy size={16} aria-hidden /> {copied ? "Código copiado" : "Copiar código Pix"}
            </button>
            {order.pix.expiresAt && (
              <p className="mt-3 text-xs text-ink-soft">
                Válido até {new Date(order.pix.expiresAt).toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" })}.
              </p>
            )}
          </>
        )}
        {order.redirectUrl && (
          <a href={order.redirectUrl} className="mt-6 inline-flex rounded-full bg-red px-6 py-3.5 font-semibold text-white">
            Ir para o pagamento
          </a>
        )}
        {testMode && (
          <button
            type="button"
            onClick={simulate}
            disabled={simulating}
            className="mt-6 w-full rounded-full border border-dashed border-[#c99a1e] bg-[#fff8e6] px-6 py-3 text-sm font-semibold text-[#6b4e00]"
          >
            {simulating ? "Simulando…" : "Simular pagamento aprovado (modo de teste)"}
          </button>
        )}
      </div>
    </div>
  );
}
