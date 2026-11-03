import { Check, Minus } from "lucide-react";

const alone = ["Informações espalhadas", "Necessidade de organizar diversas fontes", "Dificuldade para entender a sequência", "Ausência de um roteiro único"];
const withUs = ["Conteúdo organizado em português", "Etapas explicadas", "Checklists", "Tutoriais", "Referências oficiais", "Ferramentas de planejamento"];

export function ComparisonSection() {
  return (
    <section className="bg-mist py-20 md:py-28">
      <div className="container-x">
        <div className="max-w-3xl">
          <p className="eyebrow text-red">Por que utilizar o treinamento</p>
          <h2 className="mt-4 text-3xl font-extrabold leading-tight text-navy md:text-[2.75rem]">
            Informação organizada para quem quer fazer por conta própria.
          </h2>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-[1fr_1.15fr]">
          <div className="rounded-2xl border border-line bg-white/60 p-7 md:p-9">
            <h3 className="text-lg font-bold text-ink-soft">Pesquisar tudo sozinho</h3>
            <ul className="mt-6 space-y-4">
              {alone.map((t) => (
                <li key={t} className="flex gap-3 text-ink-soft">
                  <Minus size={18} className="mt-0.5 shrink-0 text-ink-soft/60" aria-hidden />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl bg-navy p-7 text-white shadow-[0_30px_60px_-30px_rgba(17,35,59,.6)] md:p-9">
            <h3 className="text-lg font-bold">Utilizar o Paraguai Sem Assessor</h3>
            <ul className="mt-6 grid gap-4 sm:grid-cols-2">
              {withUs.map((t) => (
                <li key={t} className="flex gap-3 text-white/90">
                  <Check size={18} className="mt-0.5 shrink-0 text-[#7fd3b9]" aria-hidden />
                  {t}
                </li>
              ))}
            </ul>
            <p className="mt-8 border-t border-white/15 pt-5 text-sm text-white/60">
              O benefício é reduzir o esforço de pesquisa e melhorar a organização. Economia financeira depende de cada caso.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
