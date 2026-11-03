import "server-only";
import { supabaseConfigured } from "@/lib/supabase/admin";
import { memoryStore } from "./memory";
import { supabaseStore } from "./supabase";
import type { OrderStore } from "./types";

export function getStore(): OrderStore {
  if (supabaseConfigured()) return supabaseStore;
  if (process.env.VERCEL_ENV === "production") {
    throw new Error("Supabase não configurado em produção (NEXT_PUBLIC_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY).");
  }
  return memoryStore;
}
