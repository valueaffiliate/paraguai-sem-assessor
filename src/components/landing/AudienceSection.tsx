import { SectionCTA } from "./SectionCTA";

const forYou = ["Deseja morar legalmente no Paraguai.", "Quer entender os procedimentos.", "Pretende preparar documentos com autonomia.", "Prefere um guia organizado em português.", "Está disposto a realizar pessoalmente as etapas exigidas."];
const notForYou = ["Procura uma empresa para emitir documentos por você.", "Quer representação individual perante órgãos públicos.", "Precisa de análise jurídica personalizada.", "Espera aprovação ou emissão garantida.", "Não pretende cumprir as exigências presenciais."];

export function AudienceSection() {
  return (
    <section className="bg-paper py-20 md:py-28">
      <div className="container-x">
        <p className="eyebrow text-red">Para quem é</p>
        <div className="mt-10 grid gap-12 md:grid-cols-2 md:gap-16">
          <div>
            <h2 className="text-2xl font-extrabold text-navy md:text-3xl">Este guia é para você se:</h2>
            <ul className="mt-6 divide-y divide-line border-y border-line">
              {forYou.map((t) => (
                <li key={t} className="flex gap-3 py-4 text-[17px] text-navy">
                  <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-green" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-ink-soft md:text-3xl">Talvez não seja para você se:</h2>
            <ul className="mt-6 divide-y divide-line border-y border-line">
              {notForYou.map((t) => (
                <li key={t} className="flex gap-3 py-4 text-[17px] text-ink-soft">
                  <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-soft/40" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <SectionCTA label="É para mim, quero o guia" />
      </div>
    </section>
  );
}
