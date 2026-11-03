import type { Metadata } from "next";
import { PendingDoc } from "@/components/simple/SimplePage";

export const metadata: Metadata = { title: "Política de privacidade | Paraguai Sem Assessor", robots: { index: false } };

export default function Page() {
  return <PendingDoc title="Política de privacidade" />;
}
