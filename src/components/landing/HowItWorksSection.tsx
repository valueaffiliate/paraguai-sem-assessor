import { Info } from "lucide-react";
import { steps } from "@/config/site";
import { SectionCTA } from "./SectionCTA";

export function HowItWorksSection() {
  return (
    <section id="como-funciona" className="bg-paper py-20 md:py-28">
      <div className="container-x">
        <div className="max-w-3xl">
          <p className="eyebrow text-red">Como funciona</p>
          <h2 className="mt-4 text-3xl font-extrabold leading-tight text-navy md:text-[2.75rem]">
            Do planejamento aos procedimentos: entenda cada etapa.
          </h2>
        </div>

        <ol className="relative mt-14 grid gap-0 md:grid-cols-4 md:gap-6">
          <span aria-hidden className="absolute left-[15px] top-2 bottom-2 w-px bg-line md:left-0 md:right-0 md:top-[15px] md:bottom-auto md:h-px md:w-auto" />
          {steps.map((s, i) => (
            <li key={s.title} className="relative grid grid-cols-[32px_1fr] gap-5 pb-10 last:pb-0 md:block md:pb-0">
              <span className="tabular relative z-10 flex h-8 w-8 items-center justify-center rounded-full border border-navy bg-paper text-xs font-bold text-navy">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="md:mt-6 md:pr-4">
                <p className="eyebrow text-ink-soft">Etapa {String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-2 text-xl font-bold text-navy">{s.title}</h3>
                <p className="mt-2 leading-relaxed text-ink-soft">{s.text}</p>
              </div>
            </li>
          ))}
        </ol>

        <p className="mt-14 flex items-start gap-3 rounded-xl bg-mist px-5 py-4 text-sm leading-relaxed text-ink-soft">
          <Info size={16} className="mt-0.5 shrink-0 text-navy" aria-hidden />
          O percurso varia conforme o perfil do solicitante, o regime migratório e as regras vigentes.
        </p>
        <SectionCTA label="Quero seguir esse passo a passo" />
      </div>
    </section>
  );
}
