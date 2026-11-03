import { ExternalLink, ShieldCheck } from "lucide-react";
import { sources } from "@/config/site";

export function TransparencySection() {
  return (
    <section id="fontes" className="border-t border-line bg-paper py-16 md:py-20">
      <div className="container-x grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="eyebrow flex items-center gap-2 text-ink-soft">
            <ShieldCheck size={14} aria-hidden /> Transparência
          </p>
          <h2 className="mt-4 text-2xl font-extrabold text-navy md:text-3xl">
            Informação independente e procedimentos oficiais.
          </h2>
          <div className="mt-5 space-y-4 leading-relaxed text-ink-soft">
            <p>
              O Paraguai Sem Assessor é um produto educacional independente. Não possui vínculo institucional com o
              Governo do Paraguai, com a Dirección Nacional de Migraciones ou com a Polícia Nacional paraguaia.
            </p>
            <p>
              O treinamento orienta o planejamento e a compreensão dos procedimentos, mas não substitui análise
              individual quando necessária e não garante emissão de documentos.
            </p>
            <p>Requisitos e valores oficiais podem ser alterados pelas autoridades.</p>
          </div>
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-navy">Fontes oficiais consultadas</p>
          <ul className="mt-3 divide-y divide-line rounded-xl border border-line bg-white">
            {sources.items.map((s) => (
              <li key={s.url}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-4 px-4 py-3.5 text-sm text-navy hover:bg-mist/60"
                >
                  <span className="min-w-0">
                    <span className="block font-medium">{s.label}</span>
                    <span className="block truncate text-xs text-ink-soft">{s.url.replace("https://", "")}</span>
                  </span>
                  <ExternalLink size={15} className="shrink-0 text-ink-soft" aria-hidden />
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-ink-soft">
            {sources.checkedAt
              ? `Fontes conferidas em ${new Date(sources.checkedAt + "T12:00:00").toLocaleDateString("pt-BR")}.`
              : "Data de conferência: pendente de revisão editorial."}{" "}
            Fonte: migraciones.gov.py.
          </p>
        </div>
      </div>
    </section>
  );
}
