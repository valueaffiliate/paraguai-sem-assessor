"use client";

import { useEffect, useState } from "react";
import { formatBRL, offer } from "@/config/site";
import { OfferLink } from "./OfferLink";

export function MobileStickyCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const offerEl = document.getElementById("oferta");
    let offerInView = false;
    const io = offerEl
      ? new IntersectionObserver(([e]) => {
          offerInView = e.isIntersecting;
          update();
        })
      : null;
    function update() {
      setVisible(window.scrollY > window.innerHeight * 0.8 && !offerInView);
    }
    if (offerEl && io) io.observe(offerEl);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      io?.disconnect();
    };
  }, []);

  return (
    <div
      aria-hidden={!visible}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/95 backdrop-blur-md transition-transform duration-300 md:hidden ${
        visible ? "translate-y-0" : "pointer-events-none translate-y-full"
      }`}
      style={{
        paddingBottom: "max(12px, env(safe-area-inset-bottom, 0px))",
        paddingLeft: "max(16px, env(safe-area-inset-left, 0px))",
        paddingRight: "max(16px, env(safe-area-inset-right, 0px))",
        paddingTop: 12,
      }}
    >
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm leading-tight text-ink-soft">
          Acesso por
          <span className="tabular block text-lg font-extrabold text-navy">{formatBRL(offer.launchPrice)}</span>
        </p>
        <OfferLink
          source="barra-celular"
          tabIndex={visible ? 0 : -1}
          className="rounded-full bg-red px-6 py-3 text-sm font-semibold text-white"
        >
          Começar agora
        </OfferLink>
      </div>
    </div>
  );
}
