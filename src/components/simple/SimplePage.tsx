import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Logo } from "@/components/landing/Logo";

export function SimplePage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-paper">
      <header className="border-b border-line bg-white">
        <div className="container-x flex h-16 items-center justify-between">
          <Link href="/" aria-label="Voltar ao início"><Logo /></Link>
          <Link href="/" className="flex items-center gap-1.5 text-sm font-medium text-ink-soft hover:text-navy">
            <ArrowLeft size={15} /> Voltar
          </Link>
        </div>
      </header>
      <main className="container-x max-w-3xl py-16">
        <h1 className="text-3xl font-extrabold text-navy md:text-4xl">{title}</h1>
        <div className="mt-8 space-y-5 leading-relaxed text-ink-soft">{children}</div>
      </main>
    </div>
  );
}

export function PendingDoc({ title }: { title: string }) {
  return (
    <SimplePage title={title}>
      <p className="rounded-xl border border-line bg-white px-5 py-4">
        Este documento está em elaboração e será publicado antes do início das vendas.
      </p>
    </SimplePage>
  );
}
