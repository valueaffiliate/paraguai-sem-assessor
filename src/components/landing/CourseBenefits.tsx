import { ArrowUpRight } from "lucide-react";
import { learnTopics } from "@/config/site";

export function CourseBenefits() {
  return (
    <section id="o-que-voce-aprende" className="bg-white py-20 md:py-28">
      <div className="container-x">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow text-red">O que você vai aprender</p>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight text-navy md:text-[2.75rem]">
              Um treinamento completo para organizar sua documentação.
            </h2>
          </div>
          <p className="max-w-sm text-ink-soft">
            Seis frentes de estudo. Cada uma leva ao módulo ou à ferramenta correspondente.
          </p>
        </div>

        <div className="mt-14 grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
          {learnTopics.map((t) => (
            <a
              key={t.title}
              href={t.href}
              className="group flex min-w-0 flex-col justify-between gap-8 border-t border-line py-8"
            >
              <div>
                <h3 className="text-xl font-bold text-navy">{t.title}</h3>
                <p className="mt-3 leading-relaxed text-ink-soft">{t.text}</p>
              </div>
              <span className="flex items-center gap-1.5 text-sm font-semibold text-navy">
                {t.tag}
                <ArrowUpRight size={15} className="text-red transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
