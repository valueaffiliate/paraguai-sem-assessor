import type { Metadata } from "next";
import { PendingDoc } from "@/components/simple/SimplePage";

export const metadata: Metadata = { title: "Contato | Paraguai Sem Assessor", robots: { index: false } };

export default function Page() {
  return <PendingDoc title="Contato" />;
}
