"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  BookOpen,
  Calculator,
  CheckSquare,
  LayoutDashboard,
  MapPin,
  PlayCircle,
  Square,
  CheckCircle2,
} from "lucide-react";
import { cities, formatBRL, modules } from "@/config/site";

type Tab = "dashboard" | "aulas" | "checklists" | "cidades";

const tabs: { id: Tab; label: string; icon: typeof BookOpen }[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "aulas", label: "Aulas", icon: PlayCircle },
  { id: "checklists", label: "Checklists", icon: CheckSquare },
  { id: "cidades", label: "Cidades", icon: MapPin },
];

const checklistSeed = [
  { id: "c1", label: "Certidão de nascimento ou casamento", group: "Brasil", done: true },
  { id: "c2", label: "Antecedentes criminais", group: "Brasil", done: true },
  { id: "c3", label: "Apostilamento dos documentos", group: "Brasil", done: false },
  { id: "c4", label: "Conferência de validade das certidões", group: "Brasil", done: false },
  { id: "c5", label: "Cópias e organização da pasta", group: "Viagem", done: false },
  { id: "c6", label: "Requisitos da modalidade conferidos na fonte oficial", group: "Paraguai", done: false },
];

export function PlatformPreview() {
  const [tab, setTab] = useState<Tab>("dashboard");

  return (
    <section id="plataforma" className="relative overflow-hidden bg-navy-deep py-20 text-white md:py-28">
      <div aria-hidden className="pointer-events-none absolute -top-40 right-[-10%] h-[520px] w-[520px] rounded-full bg-[#1d3a5f] opacity-40 blur-[120px]" />
      <div className="container-x relative">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-2xl">
            <p className="eyebrow text-[#f08a85]">A plataforma</p>
            <h2 className="mt-4 text-4xl font-extrabold leading-tight md:text-[3.25rem]">Muito mais que um e-book.</h2>
            <p className="mt-5 text-lg leading-relaxed text-white/70">
              Uma plataforma digital para estudar, organizar e acompanhar cada etapa do seu planejamento.
            </p>
          </div>

          <div role="tablist" aria-label="Telas da plataforma" className="flex w-full gap-1 overflow-x-auto rounded-full border border-white/15 bg-white/5 p-1 lg:w-auto">
            {tabs.map((t) => {
              const Icon = t.icon;
              const active = tab === t.id;
              return (
                <button
                  key={t.id}
                  id={`tab-${t.id}`}
                  role="tab"
                  type="button"
                  aria-selected={active}
                  aria-controls="painel-plataforma"
                  onClick={() => setTab(t.id)}
                  className={`flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition ${
                    active ? "bg-white text-navy" : "text-white/70 hover:text-white"
                  }`}
                >
                  <Icon size={15} aria-hidden />
                  {t.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="relative mt-12 md:mt-16">
          {/* Notebook */}
          <div className="mx-auto max-w-[980px] lg:mr-[110px]">
            <div className="rounded-t-[18px] border border-white/15 bg-[#1a2433] p-2 shadow-[0_40px_80px_-30px_rgba(0,0,0,.7)] md:p-3">
              <div className="flex items-center gap-1.5 px-2 pb-2">
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                <span className="ml-3 hidden truncate rounded-md bg-white/10 px-3 py-0.5 text-[11px] text-white/50 sm:block">
                  plataforma · Paraguai Sem Assessor
                </span>
              </div>
              <div
                id="painel-plataforma"
                role="tabpanel"
                aria-labelledby={`tab-${tab}`}
                className="relative h-[460px] overflow-hidden rounded-lg bg-paper text-navy md:h-[520px]"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={tab}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.22 }}
                    className="flex h-full"
                  >
                    <Sidebar tab={tab} onSelect={setTab} />
                    <div className="min-w-0 flex-1 overflow-y-auto p-4 md:p-6">
                      {tab === "dashboard" && <DashboardView />}
                      {tab === "aulas" && <LessonsView />}
                      {tab === "checklists" && <ChecklistView />}
                      {tab === "cidades" && <CitiesView />}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
            <div className="mx-[-3%] h-3 rounded-b-xl bg-gradient-to-b from-[#2b3647] to-[#141c28]" />
          </div>

          {/* Celular com a calculadora */}
          <div className="relative mx-auto mt-10 w-[270px] lg:absolute lg:right-0 lg:bottom-[-30px] lg:mt-0">
            <div className="rounded-[34px] border border-white/20 bg-[#101824] p-2.5 shadow-[0_40px_70px_-25px_rgba(0,0,0,.8)]">
              <div className="overflow-hidden rounded-[26px] bg-paper text-navy">
                <div className="mx-auto mt-2 h-1.5 w-16 rounded-full bg-navy/15" />
                <CostCalculator />
              </div>
            </div>
          </div>
        </div>

        <p className="mt-16 text-center text-xs text-white/50 lg:mt-20">
          Demonstração ilustrativa da interface do aluno. Progresso e valores exibidos são exemplos.
        </p>
      </div>
    </section>
  );
}

function Sidebar({ tab, onSelect }: { tab: Tab; onSelect: (t: Tab) => void }) {
  return (
    <aside className="hidden w-48 shrink-0 flex-col gap-1 border-r border-line bg-white p-3 md:flex">
      <p className="px-2 pb-3 pt-1 font-[family-name:var(--font-display)] text-sm font-extrabold">PSA</p>
      {tabs.map((t) => {
        const Icon = t.icon;
        return (
          <button
            key={t.id}
            type="button"
            tabIndex={-1}
            onClick={() => onSelect(t.id)}
            className={`flex items-center gap-2 rounded-md px-2 py-2 text-left text-[13px] ${
              tab === t.id ? "bg-mist font-semibold text-navy" : "text-ink-soft hover:bg-mist/60"
            }`}
          >
            <Icon size={14} aria-hidden />
            {t.label}
          </button>
        );
      })}
      <div className="mt-auto flex items-center gap-2 rounded-md px-2 py-2 text-[13px] text-ink-soft">
        <Calculator size={14} aria-hidden /> Calculadora
      </div>
    </aside>
  );
}

function ExampleTag() {
  return (
    <span className="rounded-full bg-mist px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-ink-soft">
      Exemplo
    </span>
  );
}

function DashboardView() {
  const sample = [100, 100, 60, 20, 0, 0];
  const done = checklistSeed.filter((c) => c.done).length;
  return (
    <div>
      <div className="flex items-center gap-2">
        <h3 className="text-lg font-bold">Seu planejamento</h3>
        <ExampleTag />
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <div className="rounded-lg border border-line bg-white p-4">
          <p className="text-xs text-ink-soft">Progresso geral</p>
          <p className="tabular mt-1 text-2xl font-extrabold">19%</p>
          <div className="mt-2 h-1.5 rounded-full bg-mist">
            <div className="h-full w-[19%] rounded-full bg-green" />
          </div>
        </div>
        <div className="rounded-lg border border-line bg-white p-4">
          <p className="text-xs text-ink-soft">Checklist de documentos</p>
          <p className="tabular mt-1 text-2xl font-extrabold">{done}/{checklistSeed.length}</p>
          <p className="mt-1 text-xs text-ink-soft">itens concluídos</p>
        </div>
        <div className="rounded-lg border border-line bg-white p-4">
          <p className="text-xs text-ink-soft">Próxima etapa</p>
          <p className="mt-1 text-sm font-semibold leading-snug">Apostilamento dos documentos</p>
        </div>
      </div>
      <p className="mt-6 text-xs font-semibold uppercase tracking-wider text-ink-soft">Módulos</p>
      <ul className="mt-2 divide-y divide-line rounded-lg border border-line bg-white">
        {modules.slice(0, 6).map((m, i) => (
          <li key={m.title} className="flex items-center gap-3 px-4 py-2.5 text-sm">
            <span className="tabular w-6 text-xs text-ink-soft">{String(i + 1).padStart(2, "0")}</span>
            <span className="min-w-0 flex-1 truncate">{m.title}</span>
            <span className="h-1.5 w-20 rounded-full bg-mist">
              <span className="block h-full rounded-full bg-navy" style={{ width: `${sample[i]}%` }} />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function LessonsView() {
  const [active, setActive] = useState(2);
  return (
    <div className="grid h-full gap-4 lg:grid-cols-[1fr_220px]">
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-wider text-red">Módulo {String(active + 1).padStart(2, "0")}</p>
        <h3 className="mt-1 text-lg font-bold">{modules[active].title}</h3>
        <div className="mt-3 flex aspect-video items-center justify-center rounded-lg bg-navy text-white/80">
          <PlayCircle size={44} strokeWidth={1.3} aria-hidden />
        </div>
        <p className="mt-3 text-sm leading-relaxed text-ink-soft">{modules[active].description}</p>
      </div>
      <ul className="hidden max-h-full overflow-y-auto rounded-lg border border-line bg-white lg:block">
        {modules.map((m, i) => (
          <li key={m.title}>
            <button
              type="button"
              onClick={() => setActive(i)}
              className={`flex w-full gap-2 border-b border-line px-3 py-2 text-left text-xs last:border-0 ${
                i === active ? "bg-mist font-semibold" : "text-ink-soft hover:bg-mist/50"
              }`}
            >
              <span className="tabular">{String(i + 1).padStart(2, "0")}</span>
              <span className="truncate">{m.title}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ChecklistView() {
  const [items, setItems] = useState(checklistSeed);
  const done = items.filter((i) => i.done).length;
  const groups = ["Brasil", "Viagem", "Paraguai"];
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-bold">Checklist de documentos</h3>
          <ExampleTag />
        </div>
        <p className="tabular text-sm text-ink-soft">
          {done} de {items.length} concluídos
        </p>
      </div>
      <div className="mt-3 h-1.5 rounded-full bg-mist">
        <div className="h-full rounded-full bg-green transition-all" style={{ width: `${(done / items.length) * 100}%` }} />
      </div>
      {groups.map((g) => (
        <div key={g} className="mt-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-ink-soft">{g}</p>
          <ul className="mt-2 space-y-1.5">
            {items
              .filter((i) => i.group === g)
              .map((i) => (
                <li key={i.id}>
                  <button
                    type="button"
                    onClick={() => setItems((all) => all.map((x) => (x.id === i.id ? { ...x, done: !x.done } : x)))}
                    aria-pressed={i.done}
                    className="flex w-full items-center gap-3 rounded-md border border-line bg-white px-3 py-2.5 text-left text-sm hover:border-navy/30"
                  >
                    {i.done ? (
                      <CheckCircle2 size={17} className="shrink-0 text-green" aria-hidden />
                    ) : (
                      <Square size={17} className="shrink-0 text-ink-soft" aria-hidden />
                    )}
                    <span className={i.done ? "text-ink-soft line-through" : ""}>{i.label}</span>
                  </button>
                </li>
              ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function CitiesView() {
  const [sel, setSel] = useState(0);
  const c = cities[sel];
  return (
    <div>
      <h3 className="text-lg font-bold">Guia de cidades</h3>
      <div className="mt-3 flex flex-wrap gap-2">
        {cities.map((city, i) => (
          <button
            key={city.slug}
            type="button"
            onClick={() => setSel(i)}
            className={`rounded-full border px-3 py-1.5 text-sm ${
              i === sel ? "border-navy bg-navy text-white" : "border-line bg-white text-ink-soft hover:border-navy/40"
            }`}
          >
            {city.name}
          </button>
        ))}
      </div>
      <div className="mt-5 rounded-lg border border-line bg-white p-5">
        <p className="tabular text-xs text-ink-soft">
          {c.department} · {c.coords}
        </p>
        <p className="mt-1 font-[family-name:var(--font-display)] text-2xl font-extrabold">{c.name}</p>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">{c.highlight}</p>
        <div className="mt-4 grid gap-2 text-sm sm:grid-cols-3">
          {["Moradia", "Deslocamento", "Serviços"].map((k) => (
            <div key={k} className="rounded-md bg-mist px-3 py-2">
              <p className="text-xs text-ink-soft">{k}</p>
              <p className="font-medium">Ver no módulo 11</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CostCalculator() {
  const [v, setV] = useState({ taxas: 900, viagem: 1200, hospedagem: 1500, documentos: 600 });
  const total = useMemo(() => Object.values(v).reduce((a, b) => a + b, 0), [v]);
  const fields: { key: keyof typeof v; label: string }[] = [
    { key: "taxas", label: "Taxas oficiais (sua estimativa)" },
    { key: "documentos", label: "Certidões e apostilamento" },
    { key: "viagem", label: "Viagem" },
    { key: "hospedagem", label: "Hospedagem" },
  ];
  return (
    <div className="px-4 pt-3 pb-5">
      <div className="flex items-center justify-between">
        <p className="text-sm font-bold">Calculadora de custos</p>
        <ExampleTag />
      </div>
      <div className="mt-3 space-y-2.5">
        {fields.map((f) => (
          <label key={f.key} htmlFor={`calc-${f.key}`} className="block">
            <span className="text-[11px] text-ink-soft">{f.label}</span>
            <div className="mt-0.5 flex items-center rounded-md border border-line bg-white px-2">
              <span className="text-xs text-ink-soft">R$</span>
              <input
                id={`calc-${f.key}`}
                type="number"
                inputMode="numeric"
                min={0}
                value={v[f.key]}
                onChange={(e) => setV((s) => ({ ...s, [f.key]: Math.max(0, Number(e.target.value) || 0) }))}
                className="tabular w-full bg-transparent px-1.5 py-1.5 text-sm outline-none"
              />
            </div>
          </label>
        ))}
      </div>
      <div className="mt-4 rounded-lg bg-navy px-3 py-3 text-white">
        <p className="text-[11px] text-white/60">Total estimado</p>
        <p className="tabular text-xl font-extrabold">{formatBRL(total)}</p>
      </div>
      <p className="mt-2 text-[10px] leading-snug text-ink-soft">
        Valores de exemplo. Taxas oficiais devem ser conferidas na tabela da Migraciones.
      </p>
    </div>
  );
}
