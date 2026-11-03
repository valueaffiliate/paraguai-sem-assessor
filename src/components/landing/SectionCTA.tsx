import { ArrowRight } from "lucide-react";
import { formatBRL, offer } from "@/config/site";

/** Chamada de compra repetida ao fim das seções. */
export function SectionCTA({
  tone = "light",
  label = "Quero o guia",
  className = "",
}: {
  tone?: "light" | "dark";
  label?: string;
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <div
      className={`mt-14 flex flex-col gap-5 border-t pt-8 sm:flex-row sm:items-center sm:justify-between ${
        dark ? "border-white/15" : "border-line"
      } ${className}`}
    >
      <p className={`text-sm ${dark ? "text-white/70" : "text-ink-soft"}`}>
        <span className={`tabular mr-2 font-[family-name:var(--font-display)] text-2xl font-extrabold ${dark ? "text-white" : "text-navy"}`}>
          {formatBRL(offer.launchPrice)}
        </span>
        {offer.paymentType.toLowerCase()} · acesso 100% digital
      </p>
      <a
        href="#oferta"
        className="group inline-flex items-center justify-center gap-2 rounded-full bg-red px-7 py-3.5 text-[15px] font-semibold text-white shadow-[0_10px_30px_-12px_rgba(215,74,69,.8)] transition hover:brightness-110"
      >
        {label}
        <ArrowRight size={17} className="transition group-hover:translate-x-0.5" aria-hidden />
      </a>
    </div>
  );
}
