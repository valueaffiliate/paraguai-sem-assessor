import { customGateway } from "./gateways/custom";
import { mockGateway } from "./gateways/mock";
import type { PaymentGateway } from "./types";

/** PAYMENT_PROVIDER = "custom" (seu gateway) ou "mock" (teste, sem cobrança). */
export function getGateway(): PaymentGateway {
  const provider = process.env.PAYMENT_PROVIDER ?? "mock";
  if (provider === "custom") return customGateway;
  if (provider === "mock") {
    if (process.env.VERCEL_ENV === "production") {
      throw new Error("O gateway de teste não pode ser usado em produção. Defina PAYMENT_PROVIDER=custom.");
    }
    return mockGateway;
  }
  throw new Error(`PAYMENT_PROVIDER desconhecido: ${provider}`);
}

export function isTestGateway() {
  return (process.env.PAYMENT_PROVIDER ?? "mock") === "mock";
}
