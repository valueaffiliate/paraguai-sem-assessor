"use client";

import { useState } from "react";
import { ArrowRight, Info } from "lucide-react";
import { offer } from "@/config/site";

/** Leva ao checkout configurado. Sem checkout, mostra um aviso claro em vez de simular pagamento. */
export function CheckoutButton({ label, className = "" }: { label: string; className?: string }) {
  const [notice, setNotice] = useState(false);

  if (offer.checkoutUrl) {
    return (
      <a href={offer.checkoutUrl} className={className} rel="noopener">
        {label} <ArrowRight size={18} aria-hidden />
      </a>
    );
  }

  return (
    <div className="w-full">
      <button type="button" onClick={() => setNotice(true)} className={className}>
        {label} <ArrowRight size={18} aria-hidden />
      </button>
      {notice && (
      <p
        id="aviso-checkout"
        role="status"
        className="mt-3 flex items-start gap-2 rounded-lg border border-white/20 bg-white/5 px-4 py-3 text-left text-sm text-white/85"
      >
        <Info size={16} className="mt-0.5 shrink-0" aria-hidden />
        O checkout ainda não está ativo. Nenhuma compra é processada nesta página por enquanto.
      </p>
      )}
    </div>
  );
}
