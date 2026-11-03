import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { LogOut } from "lucide-react";
import { modules, product } from "@/config/site";
import { Shell } from "@/components/checkout/Shell";
import { getStore } from "@/lib/store";
import { authConfigured, supabaseServer } from "@/lib/supabase/server";

export const metadata: Metadata = { title: "Meu guia | Paraguai Sem Assessor", robots: { index: false } };
export const dynamic = "force-dynamic";

export default async function AlunoPage() {
  if (!authConfigured()) redirect("/entrar");
  const supabase = await supabaseServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.email) redirect("/entrar");

  const hasAccess = await getStore().hasAccess(user.email, product.id);

  return (
    <Shell>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="eyebrow text-red">Área do aluno</p>
          <h1 className="mt-2 text-3xl font-extrabold text-navy">{product.name}</h1>
          <p className="mt-1 text-sm text-ink-soft">{user.email}</p>
        </div>
        <form action="/auth/sair" method="post">
          <button className="flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-sm font-medium text-navy hover:bg-mist">
            <LogOut size={15} aria-hidden /> Sair
          </button>
        </form>
      </div>

      {!hasAccess ? (
        <p className="mt-10 max-w-xl rounded-xl border border-line bg-white px-5 py-4 text-ink-soft">
          Não encontramos uma compra aprovada para este e-mail. Se você acabou de pagar, aguarde alguns minutos e atualize
          a página.
        </p>
      ) : (
        <ol className="mt-10 grid gap-3 md:grid-cols-2">
          {modules.map((m, i) => (
            <li key={m.title} className="flex gap-4 rounded-xl border border-line bg-white p-5">
              <span className="tabular font-[family-name:var(--font-display)] text-sm font-bold text-red">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0">
                <p className="font-semibold text-navy">{m.title}</p>
                <p className="mt-1 text-sm text-ink-soft">{m.description}</p>
                <p className="mt-2 text-xs font-semibold text-ink-soft">
                  {m.status === "disponivel" ? "Disponível" : "Conteúdo em preparação"}
                </p>
              </div>
            </li>
          ))}
        </ol>
      )}
    </Shell>
  );
}
