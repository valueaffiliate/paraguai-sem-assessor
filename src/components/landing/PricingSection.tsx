import { Check } from "lucide-react";
import { formatBRL, offer } from "@/config/site";
import { CheckoutButton } from "./CheckoutButton";

export function PricingSection() {
  const [reais, cents] = formatBRL(offer.launchPrice).replace("R$", "").trim().split(",");
  const extras = [offer.installments, offer.guarantee, offer.accessPeriod, offer.updatesPolicy].filter(Boolean) as string[];

  return (
    <section id="oferta" className="relative overflow-hidden bg-navy-deep py-20 text-white md:py-28">
      <div className="flag-rule absolute inset-x-0 top-0" aria-hidden />
      <div className="container-x grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <div className="min-w-0">
          <p className="eyebrow text-[#f08a85]">Oferta de lançamento</p>
          <h2 className="mt-4 text-4xl font-extrabold leading-tight md:text-5xl">
            Comece a planejar sua documentação com mais segurança.
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70">
            Acesse o treinamento Paraguai Sem Assessor e tenha um caminho organizado para estudar os procedimentos,
            preparar seus documentos e planejar sua solicitação.
          </p>
          <ul className="mt-10 grid gap-x-8 gap-y-4 sm:grid-cols-2">
            {offer.benefits.map((b) => (
              <li key={b} className="flex items-center gap-3 text-white/90">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10">
                  <Check size={14} className="text-[#7fd3b9]" aria-hidden />
                </span>
                {b}
              </li>
            ))}
          </ul>
        </div>

        <div className="min-w-0 rounded-3xl bg-paper p-7 text-navy shadow-[0_40px_80px_-30px_rgba(0,0,0,.6)] md:p-10">
          <div className="flex items-center justify-between gap-4">
            <p className="eyebrow text-ink-soft">Acesso ao treinamento</p>
            <span className="rounded-full bg-red/10 px-3 py-1 text-xs font-semibold text-red">Preço de lançamento</span>
          </div>
          <p className="tabular mt-6 flex items-start font-[family-name:var(--font-display)] font-extrabold leading-none">
            <span className="mt-2 text-2xl">R$</span>
            <span className="ml-1 text-7xl md:text-[5.5rem]">{reais}</span>
            <span className="mt-2 text-3xl">,{cents}</span>
          </p>
          <p className="mt-3 font-medium">{offer.paymentType}</p>
          <p className="tabular mt-1 text-sm text-ink-soft">
            Preço regular planejado: {formatBRL(offer.plannedRegularPrice)}
          </p>
          {extras.length > 0 && (
            <ul className="mt-5 space-y-1 text-sm text-ink-soft">
              {extras.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
          )}

          <div className="mt-8 [&_#aviso-checkout]:border-line [&_#aviso-checkout]:bg-mist [&_#aviso-checkout]:text-ink-soft">
            <CheckoutButton
              label="Quero acessar o treinamento"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-red px-6 py-4 text-[15px] font-semibold text-white transition hover:brightness-110"
            />
          </div>
          <p className="mt-5 border-t border-line pt-5 text-sm leading-relaxed text-ink-soft">{offer.disclaimer}</p>
        </div>
      </div>
    </section>
  );
}
