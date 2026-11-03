import { offer, tracking } from "@/config/site";

type Twq = (...args: unknown[]) => void;

/** Dispara um evento do X Pixel, se o pixel e o evento estiverem configurados. */
export function trackX(event: keyof typeof tracking.xEvents, params: Record<string, unknown> = {}) {
  const id = tracking.xEvents[event];
  const twq = (globalThis as { twq?: Twq }).twq;
  if (!tracking.xPixelId || !id || typeof twq !== "function") return;
  twq("event", id, { value: offer.launchPrice, currency: offer.currency, ...params });
}
