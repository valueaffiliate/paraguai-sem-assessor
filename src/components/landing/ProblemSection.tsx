const pains = [
  { title: "Não saber quais documentos preparar no Brasil", text: "Certidões, antecedentes e apostilamento têm ordem e prazo. Um documento fora do padrão pode atrasar a viagem inteira." },
  { title: "Confundir residência, cédula e cidadania", text: "São etapas diferentes, com requisitos próprios. Entender a diferença evita planejar a etapa errada." },
  { title: "Viajar sem entender os procedimentos necessários", text: "Os atendimentos são presenciais. Chegar sem saber o que apresentar costuma significar dias extras e custos a mais." },
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
          <div className="mt-7 space-y-5 text-[17px] leading-relaxed text-ink-soft">
            <p>
              Para quem pretende solicitar residência no Paraguai, uma das maiores dificuldades é entender quais
              documentos preparar, qual modalidade consultar, como organizar as etapas e onde confirmar os requisitos.
            </p>
            <p>Muitas informações estão espalhadas por diferentes páginas governamentais, frequentemente em espanhol.</p>
            <p>
              O Paraguai Sem Assessor reúne esse conhecimento em português, com uma sequência didática e ferramentas
              práticas.
            </p>
          </div>
        </div>

        <div className="min-w-0">
          <p className="eyebrow text-ink-soft">Três dificuldades comuns</p>
          <ol className="mt-4 divide-y divide-line border-y border-line">
            {pains.map((p, i) => (
              <li key={p.title} className="grid grid-cols-[2.5rem_1fr] gap-4 py-6">
                <span className="tabular font-[family-name:var(--font-display)] text-sm font-bold text-red">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-lg font-bold text-navy">{p.title}</h3>
                  <p className="mt-1.5 leading-relaxed text-ink-soft">{p.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-8 border-l-2 border-red pl-5 font-[family-name:var(--font-display)] text-xl font-bold leading-snug text-navy">
            Nosso objetivo é transformar informações dispersas em um roteiro organizado para você executar.
          </p>
        </div>
      </div>
    </section>
  );
}
