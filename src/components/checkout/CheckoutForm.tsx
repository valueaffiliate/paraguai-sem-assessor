"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CreditCard, Loader2, QrCode } from "lucide-react";
import { formatCPF, formatPhone } from "@/lib/validate";

type Field = "name" | "email" | "cpf" | "phone" | "method";

export function CheckoutForm({ methods, priceLabel }: { methods: ("pix" | "card")[]; priceLabel: string }) {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", cpf: "", phone: "" });
  const [method, setMethod] = useState<"pix" | "card">(methods[0] ?? "pix");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<{ message: string; field?: Field } | null>(null);

  const set = (k: keyof typeof form, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (error?.field === k) setError(null);
  };

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const params = new URLSearchParams(window.location.search);
    const utm = Object.fromEntries([...params].filter(([k]) => k.startsWith("utm_")));
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, method, utm }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError({ message: data.error ?? "Não foi possível continuar.", field: data.field });
        setLoading(false);
        return;
      }
      if (data.redirectUrl) window.location.href = data.redirectUrl;
      else router.push(`/pedido/${data.orderId}`);
    } catch {
      setError({ message: "Sem conexão. Verifique sua internet e tente de novo." });
      setLoading(false);
    }
  }

  const input = (f: Field) =>
    `mt-1.5 w-full rounded-lg border bg-white px-3.5 py-3 text-[15px] text-navy outline-none transition focus:border-navy focus:ring-2 focus:ring-navy/10 ${
      error?.field === f ? "border-red" : "border-line"
    }`;

  return (
    <form onSubmit={submit} noValidate className="space-y-5">
      <div>
        <label htmlFor="ck-name" className="text-sm font-medium text-navy">Nome completo</label>
        <input id="ck-name" autoComplete="name" required value={form.name} onChange={(e) => set("name", e.target.value)} className={input("name")} />
      </div>
      <div>
        <label htmlFor="ck-email" className="text-sm font-medium text-navy">E-mail</label>
        <input id="ck-email" type="email" autoComplete="email" inputMode="email" required value={form.email} onChange={(e) => set("email", e.target.value)} className={input("email")} />
        <p className="mt-1 text-xs text-ink-soft">O acesso ao guia fica vinculado a este e-mail.</p>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="ck-cpf" className="text-sm font-medium text-navy">CPF</label>
          <input id="ck-cpf" inputMode="numeric" required value={form.cpf} onChange={(e) => set("cpf", formatCPF(e.target.value))} placeholder="000.000.000-00" className={input("cpf")} />
        </div>
        <div>
          <label htmlFor="ck-phone" className="text-sm font-medium text-navy">
            Celular <span className="font-normal text-ink-soft">(opcional)</span>
          </label>
          <input id="ck-phone" type="tel" autoComplete="tel" inputMode="tel" value={form.phone} onChange={(e) => set("phone", formatPhone(e.target.value))} placeholder="(00) 00000-0000" className={input("phone")} />
        </div>
      </div>

      <fieldset>
        <legend className="text-sm font-medium text-navy">Forma de pagamento</legend>
        <div className="mt-2 grid gap-3 sm:grid-cols-2">
          {methods.map((m) => (
            <label
              key={m}
              className={`flex cursor-pointer items-center gap-3 rounded-lg border bg-white px-4 py-3.5 text-[15px] transition ${
                method === m ? "border-navy ring-2 ring-navy/10" : "border-line hover:border-navy/40"
              }`}
            >
              <input type="radio" name="method" value={m} checked={method === m} onChange={() => setMethod(m)} className="accent-[#11233b]" />
              {m === "pix" ? <QrCode size={18} aria-hidden /> : <CreditCard size={18} aria-hidden />}
              <span className="font-medium text-navy">{m === "pix" ? "Pix" : "Cartão de crédito"}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {error && (
        <p role="alert" className="rounded-lg border border-red/30 bg-red/5 px-4 py-3 text-sm text-red">
          {error.message}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-red px-6 py-4 text-[15px] font-semibold text-white transition hover:brightness-110 disabled:opacity-70"
      >
        {loading && <Loader2 size={18} className="animate-spin" aria-hidden />}
        {loading ? "Gerando pagamento…" : method === "pix" ? `Gerar Pix de ${priceLabel}` : `Pagar ${priceLabel} com cartão`}
      </button>
      <p className="text-center text-xs leading-relaxed text-ink-soft">
        Ao continuar, você concorda com os <a href="/termos" className="underline">Termos de uso</a> e a{" "}
        <a href="/privacidade" className="underline">Política de privacidade</a>.
      </p>
    </form>
  );
}
