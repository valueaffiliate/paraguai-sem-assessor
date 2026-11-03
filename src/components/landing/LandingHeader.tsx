"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { nav } from "@/config/site";
import { Logo } from "./Logo";
import { OfferLink } from "./OfferLink";

export function LandingHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? "border-b border-line bg-paper/95 backdrop-blur-md" : "bg-transparent"
      }`}
      style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
    >
      <div className="container-x flex h-16 items-center justify-between gap-6 md:h-[72px]">
        <a href="#topo" aria-label="Paraguai Sem Assessor, início">
          <Logo tone={solid ? "dark" : "light"} />
        </a>

        <nav aria-label="Principal" className="hidden items-center gap-7 lg:flex">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className={`text-sm font-medium transition-colors ${
                solid ? "text-ink-soft hover:text-navy" : "text-white/80 hover:text-white"
              }`}
            >
              {n.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <OfferLink
            source="menu"
            className="hidden rounded-full bg-red px-5 py-2.5 text-sm font-semibold text-white transition hover:brightness-110 sm:inline-flex"
          >
            Quero o guia
          </OfferLink>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            className={`inline-flex h-10 w-10 items-center justify-center rounded-full lg:hidden ${
              solid ? "text-navy hover:bg-mist" : "text-white hover:bg-white/10"
            }`}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <div id="menu-mobile" hidden={!open} className="border-t border-line bg-paper lg:hidden">
        <nav aria-label="Menu móvel" className="container-x flex flex-col py-3">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="border-b border-line py-3.5 text-[15px] font-medium text-navy last:border-0"
            >
              {n.label}
            </a>
          ))}
          <OfferLink
            source="menu"
            onClick={() => setOpen(false)}
            className="mt-3 mb-2 rounded-full bg-red py-3 text-center text-sm font-semibold text-white"
          >
            Quero o guia
          </OfferLink>
        </nav>
      </div>
    </header>
  );
}
