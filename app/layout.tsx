import type React from "react"
import type { Metadata, Viewport } from "next"
import { Outfit } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/lib/theme-provider"
import { LayoutContent } from "@/components/layout/layout-content"
import { SkipToContent } from "@/components/ui/skip-to-content"
import { generateSEO, structuredData } from "@/lib/seo"
import { StructuredData } from "@/components/seo/structured-data"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Suspense } from "react"
import { client } from "@/lib/sanity/client"
import { aboutQuery } from "@/lib/sanity/queries"
import { safeFetch } from "@/lib/sanity/error-handling"
import { AmbientBackground } from "@/components/ui/ambient-background"
import { getRequestLocale } from "@/lib/i18n/request-locale"
import { getMessages } from "@/lib/i18n/messages"
import { localizePath } from "@/lib/i18n/config"

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
  preload: true,
})

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()

  // Provide deterministic fallback in case Sanity fetch fails
  const fallbackAbout = { bioVariants: { oneLiner: "Creative technologist building reliable digital systems." } }
  const about: any = await safeFetch(client, aboutQuery, { locale }, fallbackAbout)

  const canonical = localizePath("/", locale)
  const localeCode = locale === "fr" ? "fr_FR" : "en_US"

  return generateSEO({
    description: about?.bioVariants?.oneLiner || fallbackAbout.bioVariants.oneLiner,
    locale: localeCode,
    canonicalPath: canonical,
    alternates: {
      en: "/",
      fr: "/fr",
    },
  })
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3f4f6" },
    { media: "(prefers-color-scheme: dark)", color: "#121212" },
  ],
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const locale = await getRequestLocale()
  const messages = getMessages(locale)
  // Fetch About data for footer
  const aboutData: any = await safeFetch(client, aboutQuery, { locale }, null)
  return (
    <html lang={locale} suppressHydrationWarning className={`${outfit.variable}`}>
      <head>
        {/* Preload critical resources */}
        <link rel="preload" href="/fonts/Inter-Regular.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />

        {/* Critical CSS for initial render */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
            /* Critical CSS for initial render */
            :root {
              --background-color: #f3f4f6;
              --text-color: #111827;
              --secondary-text-color: #4b5563;
              --accent-honey: #eba937;
              --subtle-border-color: #e5e7eb;
              --content-bg-color-rgb: 243, 244, 246;
              --blur-intensity-main: 10px;
              --blur-intensity-overlay: 15px;
            }
            [data-theme="dark"] {
              --background-color: #121212;
              --text-color: #e5e7eb;
              --secondary-text-color: #9ca3af;
              --subtle-border-color: #374151;
              --content-bg-color-rgb: 18, 18, 18;
            }
            body { 
              font-family: var(--font-outfit), system-ui, sans-serif;
              background-color: var(--background-color);
              color: var(--text-color);
              line-height: 1.7;
              margin: 0;
              padding: 0;
            }
            .glass-card {
              backdrop-filter: blur(var(--blur-intensity-main));
              background: rgba(var(--content-bg-color-rgb), 0.1);
              border: 1px solid var(--subtle-border-color);
              border-radius: 0.75rem;
            }
          `,
          }}
        />
      </head>
      <body className="font-sans antialiased">
        <SkipToContent />
        <AmbientBackground />
        <StructuredData data={structuredData} />
        <Suspense fallback={<div>{messages.common.loading}</div>}>
          <ThemeProvider defaultTheme="system" storageKey="portfolio-theme">
            <LayoutContent
              locale={locale}
              footerData={{
                oneLiner: aboutData?.bioVariants?.oneLiner,
                socialLinks: aboutData?.socialLinks
              }}
            >
              {children}
            </LayoutContent>
          </ThemeProvider>
        </Suspense>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
