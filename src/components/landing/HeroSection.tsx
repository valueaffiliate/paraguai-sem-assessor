import { ArrowRight, Check } from "lucide-react";
import { photos } from "@/config/site";
import { Photo } from "./Photo";

const facts = ["Guia 100% digital", "Passo a passo em português", "Checklists e fontes oficiais"];

export function HeroSection() {
  return (
    <section id="topo" className="relative isolate overflow-hidden bg-navy-deep text-white">
      <Photo photo={photos.hero} priority sizes="100vw" credit={false} className="!absolute inset-0 -z-10" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(11,23,40,.92)_0%,rgba(11,23,40,.72)_45%,rgba(11,23,40,.25)_100%)]" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-navy-deep/90 to-transparent" />

      <div className="container-x flex min-h-[640px] flex-col justify-end pt-32 pb-10 md:min-h-[min(88svh,860px)] md:pb-14">
        <div className="max-w-[46rem]">
          <p className="eyebrow rise flex items-center gap-3 text-white/75">
            <span className="flag-rule inline-block w-8" aria-hidden />
            Seu caminho para viver legalmente no Paraguai
          </p>
          <h1 className="rise rise-2 mt-6 text-[2.3rem] font-extrabold leading-[1.05] sm:text-6xl lg:text-[4.4rem]">
            Sua documentação paraguaia, sem depender de uma consultoria.
          </h1>
          <p className="rise rise-3 mt-6 max-w-[38rem] text-lg leading-relaxed text-white/80 md:text-xl">
            Aprenda a organizar seus documentos, entender as modalidades de residência e seguir os procedimentos
            oficiais para solicitar sua documentação no Paraguai por conta própria.
          </p>
          <div className="rise rise-4 mt-9 flex flex-col gap-3 sm:flex-row">
            <a
              href="#oferta"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-red px-7 py-4 text-[15px] font-semibold text-white shadow-[0_10px_30px_-10px_rgba(215,74,69,.7)] transition hover:brightness-110"
            >
              Quero o guia passo a passo
              <ArrowRight size={18} className="transition group-hover:translate-x-0.5" />
            </a>
            <a
              href="#plataforma"
              className="inline-flex items-center justify-center rounded-full border border-white/30 px-7 py-4 text-[15px] font-semibold text-white transition hover:bg-white/10"
            >
              Ver o que tem no guia
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-white/15 pt-6 md:mt-20 md:flex-row md:items-end md:justify-between">
          <ul className="flex flex-col gap-3 sm:flex-row sm:gap-8">
            {facts.map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm text-white/85">
                <Check size={15} className="text-[#7fd3b9]" aria-hidden />
                {f}
              </li>
            ))}
          </ul>
          <a
            href={photos.hero.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="tabular text-xs text-white/55 hover:text-white/80"
          >
            Asunción · 25°16′S 57°38′O — Foto: {photos.hero.author}, {photos.hero.license}
          </a>
        </div>
      </div>
    </section>
  );
}
