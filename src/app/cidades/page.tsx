import type { Metadata } from "next";
import Link from "next/link";
import { cities } from "@/config/site";
import { Photo } from "@/components/landing/Photo";
import { SimplePage } from "@/components/simple/SimplePage";

export const metadata: Metadata = {
  title: "Cidades do Paraguai para brasileiros | Paraguai Sem Assessor",
  description: "Apresentação de Assunção, Ciudad del Este, Encarnación e Pedro Juan Caballero para quem planeja morar no Paraguai.",
  alternates: { canonical: "/cidades" },
};

export default function CidadesPage() {
  return (
    <SimplePage title="Cidades do Paraguai">
      <p>
        Uma apresentação inicial de quatro cidades procuradas por brasileiros. O guia completo, com moradia,
        deslocamento e serviços, faz parte do módulo 11 do guia.
      </p>
      <div className="grid gap-6 pt-4">
        {cities.map((c) => (
          <article key={c.slug} className="overflow-hidden rounded-2xl border border-line bg-white">
            <Photo photo={c.photo} sizes="(min-width:768px) 720px, 100vw" className="aspect-[21/9] w-full" />
            <div className="p-6">
              <p className="tabular text-xs text-ink-soft">{c.department} · {c.coords}</p>
              <h2 className="mt-1 text-2xl font-extrabold text-navy">{c.name}</h2>
              <p className="mt-2">{c.highlight}</p>
            </div>
          </article>
        ))}
      </div>
      <p className="pt-4">
        <Link href="/#oferta" className="font-semibold text-red hover:underline">Conhecer o guia completo</Link>
      </p>
    </SimplePage>
  );
}
