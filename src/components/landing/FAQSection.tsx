"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { faq } from "@/config/site";

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="perguntas" className="bg-white py-20 md:py-28">
      <div className="container-x grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div>
          <p className="eyebrow text-red">Perguntas frequentes</p>
          <h2 className="mt-4 text-3xl font-extrabold leading-tight text-navy md:text-[2.75rem]">
            Antes de decidir, tire suas dúvidas.
          </h2>
          <p className="mt-5 text-ink-soft">
            Respostas diretas sobre o que o treinamento é, o que ele não faz e o que depende das autoridades paraguaias.
          </p>
        </div>
        <ul className="border-t border-line">
          {faq.map((f, i) => {
            const isOpen = open === i;
            return (
              <li key={f.q} className="border-b border-line">
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-${i}`}
                    id={`faq-btn-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-6 py-5 text-left text-[17px] font-semibold text-navy"
                  >
                    {f.q}
                    <Plus size={18} aria-hidden className={`shrink-0 transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`} />
                  </button>
                </h3>
                <div
                  id={`faq-${i}`}
                  role="region"
                  aria-labelledby={`faq-btn-${i}`}
                  className={`grid transition-[grid-template-rows] duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                >
                  <div className="overflow-hidden">
                    <p className="pb-6 pr-10 leading-relaxed text-ink-soft">{f.a}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
