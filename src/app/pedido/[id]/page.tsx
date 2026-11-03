import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PaymentStatus } from "@/components/checkout/PaymentStatus";
import { Shell, TestModeBanner } from "@/components/checkout/Shell";
import { publicOrder } from "@/lib/orders";
import { isTestGateway } from "@/lib/payments";
import { getStore } from "@/lib/store";

export const metadata: Metadata = { title: "Pagamento | Paraguai Sem Assessor", robots: { index: false } };
export const dynamic = "force-dynamic";

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export default async function PedidoPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!UUID.test(id)) notFound();
  const order = await getStore().getOrder(id);
  if (!order) notFound();
  const test = isTestGateway();
  return (
    <Shell back="/checkout">
      {test && <TestModeBanner />}
      <PaymentStatus initial={publicOrder(order)} testMode={test} />
    </Shell>
  );
}
