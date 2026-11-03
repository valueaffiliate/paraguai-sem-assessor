"use client";

import { trackX } from "@/lib/track";

/** Link para a seção de oferta que registra o clique no X Pixel (quando configurado). */
export function OfferLink({
  children,
  className,
  onClick,
  tabIndex,
  source,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  tabIndex?: number;
  source: string;
}) {
  return (
    <a
      href="#oferta"
      className={className}
      tabIndex={tabIndex}
      onClick={() => {
        trackX("offerClick", { content_name: source });
        onClick?.();
      }}
    >
      {children}
    </a>
  );
}
