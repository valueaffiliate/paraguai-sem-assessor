export function Logo({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const fg = tone === "light" ? "text-white" : "text-navy";
  return (
    <span className={`flex items-center gap-2.5 ${fg}`}>
      <svg width="30" height="30" viewBox="0 0 30 30" aria-hidden>
        <rect x="1" y="1" width="28" height="28" rx="7" fill="currentColor" opacity=".08" />
        <rect x="1" y="1" width="28" height="28" rx="7" fill="none" stroke="currentColor" strokeOpacity=".35" />
        <rect x="7" y="9" width="16" height="3" rx="1" fill="#D74A45" />
        <rect x="7" y="13.5" width="16" height="3" rx="1" fill="currentColor" opacity=".25" />
        <rect x="7" y="18" width="16" height="3" rx="1" fill="#2a5ba8" />
      </svg>
      <span className="font-[family-name:var(--font-display)] text-[15px] font-extrabold leading-none tracking-tight">
        Paraguai <span className="font-semibold opacity-70">Sem Assessor</span>
      </span>
    </span>
  );
}
