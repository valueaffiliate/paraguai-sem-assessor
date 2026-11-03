"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { modules, type ModuleStatus } from "@/config/site";

const statusLabel: Record<ModuleStatus, string | null> = {
  disponivel: "Disponível",
  "em-breve": "Em breve",
  "nao-definido": null,
};

export function ModulesSection() {
  const [open, setOpen] = useState<number | null>(0);

  useEffect(() => {
    const sync = () => {
      const m = window.location.hash.match(/^#modulo-(\d+)$/);
      if (m) setOpen(Number(m[1]) - 1);
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const half = Math.ceil(modules.length / 2);
  const cols = [modules.slice(0, half), modules.slice(half)];

  return (
    <section id="modulos" className="bg-paper py-20 md:py-28">
      <div className="container-x">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end">
          <div>
            <p className="eyebrow text-red">Conteúdo do treinamento</p>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight text-navy md:text-[2.75rem]">
              Tudo organizado em 15 módulos.
            </h2>
          </div>
          <p className="text-ink-soft lg:justify-self-end lg:max-w-md">
            Da preparação no Brasil aos procedimentos no Paraguai, na ordem em que você vai precisar de cada assunto.
          </p>
        </div>

        <div className="mt-12 grid gap-x-10 lg:grid-cols-2">
          {cols.map((col, ci) => (
            <ul key={ci} className="border-t border-line">
              {col.map((m, j) => {
                const i = ci * half + j;
                const isOpen = open === i;
                const label = statusLabel[m.status];
                return (
                  <li key={m.title} id={`modulo-${i + 1}`} className="scroll-mt-28 border-b border-line">
                    <h3>
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={`modulo-${i + 1}-conteudo`}
                        onClick={() => setOpen(isOpen ? null : i)}
                        className="group flex w-full items-center gap-4 py-5 text-left"
                      >
                        <span className="tabular w-7 shrink-0 font-[family-name:var(--font-display)] text-sm font-bold text-red">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="min-w-0 flex-1 text-[17px] font-semibold text-navy">{m.title}</span>
                        {label && (
                          <span
                            className={`hidden rounded-full px-2.5 py-0.5 text-[11px] font-semibold sm:inline ${
                              m.status === "disponivel" ? "bg-green/10 text-green" : "bg-mist text-ink-soft"
                            }`}
                          >
                            {label}
                          </span>
                        )}
                        <Plus
                          size={18}
                          aria-hidden
                          className={`shrink-0 text-navy transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                        />
                      </button>
                    </h3>
                    <div
                      id={`modulo-${i + 1}-conteudo`}
                      className={`grid transition-[grid-template-rows] duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                    >
                      <div className="overflow-hidden">
                        <p className="pb-5 pl-11 pr-8 leading-relaxed text-ink-soft">{m.description}</p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
