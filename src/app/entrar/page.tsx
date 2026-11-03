import type { Metadata } from "next";
import { LoginForm } from "@/components/checkout/LoginForm";
import { Shell } from "@/components/checkout/Shell";
import { authConfigured } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Área do aluno | Paraguai Sem Assessor", robots: { index: false } };

export default async function EntrarPage({ searchParams }: { searchParams: Promise<{ erro?: string }> }) {
  const { erro } = await searchParams;
  return (
    <Shell>
      <div className="mx-auto max-w-md">
        <h1 className="text-3xl font-extrabold text-navy">Área do aluno</h1>
        <p className="mt-2 text-ink-soft">Entre com o e-mail usado na compra. Enviamos um link de acesso, sem senha.</p>
        {erro && (
          <p className="mt-5 rounded-lg border border-red/30 bg-red/5 px-4 py-3 text-sm text-red">
            O link expirou ou já foi usado. Peça um novo abaixo.
          </p>
        )}
        <div className="mt-7">
          {authConfigured() ? (
            <LoginForm />
          ) : (
            <p className="rounded-xl border border-line bg-white px-5 py-4 text-sm text-ink-soft">
              O login ainda não está configurado. Defina NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY.
            </p>
          )}
        </div>
      </div>
    </Shell>
  );
}
