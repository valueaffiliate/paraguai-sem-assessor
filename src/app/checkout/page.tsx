import type { Metadata } from "next";
import { Check } from "lucide-react";
import { formatBRL, offer, product } from "@/config/site";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { Shell, TestModeBanner } from "@/components/checkout/Shell";
import { getGateway, isTestGateway } from "@/lib/payments";

export const metadata: Metadata = { title: "Checkout | Paraguai Sem Assessor", robots: { index: false } };
export const dynamic = "force-dynamic";

export default function CheckoutPage() {
  const methods = getGateway().methods;
  return (
    <Shell back="/#oferta">
      {isTestGateway() && <TestModeBanner />}
      <div className="grid gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
        <section className="min-w-0">
          <h1 className="text-3xl font-extrabold text-navy md:text-4xl">Finalize sua compra</h1>
          <p className="mt-2 text-ink-soft">Preencha seus dados para gerar o pagamento.</p>
          <div className="mt-8">
            <CheckoutForm methods={methods} priceLabel={formatBRL(offer.launchPrice)} />
          </div>
        </section>

        <aside className="min-w-0 lg:pt-2">
          <div className="rounded-2xl bg-navy-deep p-7 text-white lg:sticky lg:top-8">
            <p className="eyebrow text-white/60">Seu pedido</p>
            <p className="mt-3 text-xl font-bold">{product.name}</p>
            <div className="mt-5 flex items-end justify-between border-y border-white/15 py-5">
              <span className="text-white/70">{offer.paymentType}</span>
              <span className="tabular font-[family-name:var(--font-display)] text-3xl font-extrabold">{formatBRL(offer.launchPrice)}</span>
            </div>
            <ul className="mt-5 space-y-2.5 text-sm text-white/85">
              {offer.benefits.map((b) => (
                <li key={b} className="flex items-center gap-2.5">
                  <Check size={15} className="text-[#7fd3b9]" aria-hidden /> {b}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs leading-relaxed text-white/55">{offer.disclaimer}</p>
          </div>
        </aside>
      </div>
    </Shell>
  );
}
