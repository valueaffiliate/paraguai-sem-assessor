import Link from "next/link";
import { ArrowLeft, Lock } from "lucide-react";
import { Logo } from "@/components/landing/Logo";

export function Shell({ children, back = "/" }: { children: React.ReactNode; back?: string }) {
  return (
    <div className="min-h-screen bg-paper">
      <header className="border-b border-line bg-white">
        <div className="container-x flex h-16 items-center justify-between">
          <Link href="/" aria-label="Paraguai Sem Assessor, início">
            <Logo />
          </Link>
          <div className="flex items-center gap-5 text-sm text-ink-soft">
            <span className="hidden items-center gap-1.5 sm:flex">
              <Lock size={14} aria-hidden /> Conexão segura
            </span>
            <Link href={back} className="flex items-center gap-1.5 font-medium hover:text-navy">
              <ArrowLeft size={15} aria-hidden /> Voltar
            </Link>
          </div>
        </div>
      </header>
      <main className="container-x py-10 md:py-14">{children}</main>
    </div>
  );
}

export function TestModeBanner() {
  return (
    <p className="mb-8 rounded-xl border border-[#e9c46a] bg-[#fff8e6] px-4 py-3 text-sm text-[#6b4e00]">
      <strong>Modo de teste.</strong> Nenhuma cobrança real é feita. Configure o seu gateway (PAYMENT_PROVIDER=custom)
      antes de divulgar.
    </p>
  );
}
