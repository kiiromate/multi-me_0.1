import { headers } from "next/headers"
import { AppLocale, normalizeLocale } from "./config"

export async function getRequestLocale(): Promise<AppLocale> {
  const headerStore = await headers()
  return normalizeLocale(headerStore.get("x-locale"))
}

