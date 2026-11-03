import Link from "next/link";
import { brand, company, nav, sources } from "@/config/site";
import { Logo } from "./Logo";

export function LandingFooter() {
  const legal = [
    { label: "Termos de uso", href: "/termos" },
    { label: "Política de privacidade", href: "/privacidade" },
    { label: "Política de reembolso", href: "/reembolso" },
  ];
  return (
    <footer className="bg-navy-deep pb-28 pt-16 text-white/70 md:pb-12">
      <div className="container-x">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="max-w-sm">
            <Logo tone="light" />
            <p className="mt-4 text-sm leading-relaxed">{brand.description}</p>
          </div>
          <FooterCol title="Navegação">
            {nav.map((n) => (
              <li key={n.href}><a href={n.href} className="hover:text-white">{n.label}</a></li>
            ))}
            <li><a href="#oferta" className="hover:text-white">Oferta</a></li>
          </FooterCol>
          <FooterCol title="Fontes oficiais">
            {sources.items.slice(0, 4).map((s) => (
              <li key={s.url}>
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="hover:text-white">{s.label}</a>
              </li>
            ))}
          </FooterCol>
          <FooterCol title="Institucional">
            {legal.map((l) => (
              <li key={l.href}><Link href={l.href} className="hover:text-white">{l.label}</Link></li>
            ))}
            <li>
              {company.contactEmail ? (
                <a href={`mailto:${company.contactEmail}`} className="hover:text-white">{company.contactEmail}</a>
              ) : (
                <Link href="/contato" className="hover:text-white">Contato</Link>
              )}
            </li>
          </FooterCol>
        </div>
        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/45 md:flex-row md:justify-between">
          <p>
            © {new Date().getFullYear()} {company.legalName ?? brand.name}
            {company.cnpj ? ` · CNPJ ${company.cnpj}` : ""}. Produto educacional independente, sem vínculo com o Governo do Paraguai.
          </p>
          <p>Fotos: Wikimedia Commons, com autor e licença indicados em cada imagem.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-sm font-semibold text-white">{title}</p>
      <ul className="mt-4 space-y-2.5 text-sm">{children}</ul>
    </div>
  );
}
