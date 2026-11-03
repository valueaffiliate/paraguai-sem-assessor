import type { Metadata } from "next";
import { PendingDoc } from "@/components/simple/SimplePage";

export const metadata: Metadata = { title: "Termos de uso | Paraguai Sem Assessor", robots: { index: false } };

export default function Page() {
  return <PendingDoc title="Termos de uso" />;
}
