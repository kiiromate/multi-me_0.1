export const SUPPORTED_LOCALES = ["en", "fr"] as const

export type AppLocale = (typeof SUPPORTED_LOCALES)[number]

export const DEFAULT_LOCALE: AppLocale = "en"

const FRENCH_PREFIX = "/fr"

export function normalizeLocale(value?: string | null): AppLocale {
  return value === "fr" ? "fr" : DEFAULT_LOCALE
}

export function getLocaleFromPathname(pathname: string): AppLocale {
  return pathname === FRENCH_PREFIX || pathname.startsWith(`${FRENCH_PREFIX}/`) ? "fr" : "en"
}

export function stripLocalePrefix(pathname: string): string {
  if (pathname === FRENCH_PREFIX) {
    return "/"
  }

  if (pathname.startsWith(`${FRENCH_PREFIX}/`)) {
    return pathname.slice(FRENCH_PREFIX.length) || "/"
  }

  return pathname
}

function splitPathParts(path: string): { pathname: string; query: string; hash: string } {
  const [beforeHash, hashPart] = path.split("#", 2)
  const [pathnamePart, queryPart] = beforeHash.split("?", 2)

  return {
    pathname: pathnamePart || "/",
    query: queryPart ? `?${queryPart}` : "",
    hash: hashPart ? `#${hashPart}` : "",
  }
}

export function localizePath(path: string, locale: AppLocale): string {
  const { pathname, query, hash } = splitPathParts(path)
  const normalizedPath = pathname.startsWith("/") ? pathname : `/${pathname}`
  const deLocalizedPath = stripLocalePrefix(normalizedPath)

  if (locale === "fr") {
    if (deLocalizedPath === "/") {
      return `/fr${query}${hash}`
    }

    return `/fr${deLocalizedPath}${query}${hash}`
  }

  return `${deLocalizedPath}${query}${hash}`
}

