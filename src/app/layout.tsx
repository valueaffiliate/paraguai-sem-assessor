import type { Metadata, Viewport } from "next";
import "./globals.css";
import { brand, offer, faq } from "@/config/site";

const title = "Paraguai Sem Assessor | Residência no Paraguai para brasileiros, passo a passo";
const description =
  "Guia digital em português para entender a residência no Paraguai, preparar documentos (certidões, apostilamento, antecedentes) e solicitar sua documentação por conta própria. Sem promessa de aprovação.";

export const metadata: Metadata = {
  metadataBase: new URL(brand.siteUrl),
  title,
  description,
  keywords: [
    "como tirar documentação paraguaia",
    "residência no Paraguai para brasileiros",
    "como morar legalmente no Paraguai",
    "como solicitar residência paraguaia",
    "cédula paraguaia para brasileiros",
    "documentos para morar no Paraguai",
    "residência MERCOSUL Paraguai",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: brand.locale,
    url: "/",
    siteName: brand.name,
    title,
    description,
  },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0b1728",
  viewportFit: "cover",
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Course",
    name: brand.name,
    description: brand.description,
    inLanguage: "pt-BR",
    provider: { "@type": "Organization", name: brand.name, url: brand.siteUrl },
    offers: {
      "@type": "Offer",
      price: offer.launchPrice.toFixed(2),
      priceCurrency: offer.currency,
      category: "Paid",
    },
    hasCourseInstance: { "@type": "CourseInstance", courseMode: "online" },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  },
];

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Manrope:wght@500;600;700;800&display=swap"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
