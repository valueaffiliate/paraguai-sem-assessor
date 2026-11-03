"use client";

import Image from "next/image";
import { useState } from "react";
import type { Photo as PhotoT } from "@/config/site";

/** Foto com crédito. Se não carregar (ou não tiver licença verificada), mostra um fundo neutro. */
export function Photo({
  photo,
  sizes,
  priority,
  className = "",
  credit = true,
}: {
  photo: PhotoT | null;
  sizes: string;
  priority?: boolean;
  className?: string;
  credit?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const show = photo && photo.verified && !failed;
  return (
    <div className={`relative overflow-hidden bg-navy ${className}`}>
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(120%_80%_at_20%_10%,#1d3a5f_0%,#11233b_55%,#0b1728_100%)]" />
      {show && (
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes={sizes}
          priority={priority}
          loading={priority ? undefined : "lazy"}
          className="object-cover"
          onError={() => setFailed(true)}
        />
      )}
      {credit && show && (
        <a
          href={photo.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-2 right-2 z-10 rounded bg-black/45 px-1.5 py-0.5 text-[10px] leading-tight text-white/85 backdrop-blur-sm hover:text-white"
        >
          Foto: {photo.author} · {photo.license}
        </a>
      )}
    </div>
  );
}
