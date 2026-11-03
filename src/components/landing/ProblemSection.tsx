import { SectionCTA } from "./SectionCTA";

const pains = [
  "Não saber quais documentos preparar no Brasil",
  "Confundir residência, cédula e cidadania",
  "Viajar sem entender os procedimentos necessários",
];

export function ProblemSection() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container-x grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
        <div className="min-w-0">
          <p className="eyebrow text-red">Antes de começar</p>
          <h2 className="mt-4 text-3xl font-extrabold leading-tight text-navy md:text-[2.75rem]">
            Quer morar no Paraguai, mas não sabe por onde começar?
          </h2>
          <p className="mt-7 text-[17px] leading-relaxed text-ink-soft">
            As regras estão espalhadas em páginas oficiais, quase sempre em espanhol. O Paraguai Sem Assessor
            reúne tudo em um guia em português, na ordem certa para você executar.
          </p>
        </div>

        <div className="min-w-0">
          <p className="eyebrow text-ink-soft">Três dificuldades comuns</p>
          <ol className="mt-4 divide-y divide-line border-y border-line">
            {pains.map((p, i) => (
              <li key={p} className="grid grid-cols-[2.5rem_1fr] items-baseline gap-4 py-5">
                <span className="tabular font-[family-name:var(--font-display)] text-sm font-bold text-red">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-lg font-bold text-navy">{p}</h3>
              </li>
            ))}
          </ol>
          <p className="mt-8 border-l-2 border-red pl-5 font-[family-name:var(--font-display)] text-xl font-bold leading-snug text-navy">
            Nosso objetivo é transformar informações dispersas em um roteiro organizado para você executar.
          </p>
        </div>
        <SectionCTA className="lg:col-span-2 lg:mt-4" />
      </div>
    </section>
  );
}
