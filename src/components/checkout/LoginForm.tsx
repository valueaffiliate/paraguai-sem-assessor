"use client";

import { useState } from "react";
import { Loader2, MailCheck } from "lucide-react";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { isValidEmail } from "@/lib/validate";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [msg, setMsg] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const value = email.trim().toLowerCase();
    if (!isValidEmail(value)) {
      setState("error");
      setMsg("Confira o e-mail informado.");
      return;
    }
    setState("sending");
    const { error } = await supabaseBrowser().auth.signInWithOtp({
      email: value,
      options: { shouldCreateUser: false, emailRedirectTo: `${window.location.origin}/auth/callback?next=/aluno` },
    });
    // Não revelamos se o e-mail tem compra: a mensagem é a mesma nos dois casos.
    if (error && /rate|limit|seconds/i.test(error.message)) {
      setState("error");
      setMsg("Muitas tentativas. Aguarde um minuto e tente de novo.");
      return;
    }
    setState("sent");
  }

  if (state === "sent") {
    return (
      <div className="rounded-xl border border-line bg-white p-6 text-center">
        <MailCheck size={36} className="mx-auto text-green" aria-hidden />
        <p className="mt-3 font-semibold text-navy">Confira seu e-mail</p>
        <p className="mt-1 text-sm text-ink-soft">
          Se houver uma compra com <strong>{email}</strong>, enviamos um link de acesso. Ele vale por tempo limitado.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="space-y-4">
      <div>
        <label htmlFor="login-email" className="text-sm font-medium text-navy">E-mail usado na compra</label>
        <input
          id="login-email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1.5 w-full rounded-lg border border-line bg-white px-3.5 py-3 text-[15px] text-navy outline-none focus:border-navy focus:ring-2 focus:ring-navy/10"
        />
      </div>
      {state === "error" && <p role="alert" className="text-sm text-red">{msg}</p>}
      <button
        type="submit"
        disabled={state === "sending"}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-navy px-6 py-3.5 text-[15px] font-semibold text-white disabled:opacity-70"
      >
        {state === "sending" && <Loader2 size={17} className="animate-spin" aria-hidden />}
        Receber link de acesso
      </button>
    </form>
  );
}
