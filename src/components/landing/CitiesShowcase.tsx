import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cities } from "@/config/site";
import { Photo } from "./Photo";

export function CitiesShowcase() {
  return (
    <section id="cidades" className="bg-white py-20 md:py-28">
      <div className="container-x">
        <div className="max-w-3xl">
          <p className="eyebrow text-red">Descubra o Paraguai</p>
          <h2 className="mt-4 text-3xl font-extrabold leading-tight text-navy md:text-[2.75rem]">
            Sua documentação é o começo. Conhecer o país também faz parte do planejamento.
          </h2>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-12">
          {cities.map((c, i) => (
            <article
              key={c.slug}
              className={`group relative min-w-0 overflow-hidden rounded-2xl ${
                i === 0 ? "lg:col-span-7 lg:row-span-2" : i === 1 ? "lg:col-span-5" : i === 2 ? "lg:col-span-5" : "md:col-span-2 lg:col-span-12"
              }`}
            >
              <Photo
                photo={c.photo}
                sizes={i === 0 ? "(min-width:1024px) 680px, 100vw" : "(min-width:1024px) 480px, 100vw"}
                credit={false}
                className={`w-full ${i === 0 ? "aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[520px]" : i === 3 ? "aspect-[16/10] md:aspect-[21/7]" : "aspect-[16/10]"}`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy-deep/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5 text-white md:p-7">
                <p className="tabular text-xs text-white/60">
                  {c.department} · {c.coords}
                </p>
                <h3 className="mt-1 text-2xl font-extrabold md:text-3xl">{c.name}</h3>
                <p className="mt-2 max-w-md text-sm leading-relaxed text-white/80">{c.highlight}</p>
                {c.photo?.verified && (
                  <a
                    href={c.photo.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block text-[10px] text-white/50 hover:text-white/80"
                  >
                    Foto: {c.photo.author} · {c.photo.license}
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-sm text-ink-soft">
            Apresentação geral das cidades. Custo de vida e moradia variam e são tratados no guia de cidades do treinamento.
          </p>
          <Link
            href="/cidades"
            className="inline-flex items-center gap-2 rounded-full border border-navy px-6 py-3 text-sm font-semibold text-navy transition hover:bg-navy hover:text-white"
          >
            Explorar as cidades do Paraguai <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
