import Link from 'next/link'
import { BrandLogo } from '@/components/ui/brand-logo'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '404 - Page Not Found | Kaze Keza',
  description: 'The page you are looking for does not exist.',
}

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-16">
      <div className="max-w-2xl mx-auto text-center space-y-12">
        {/* Deconstructed Brand Logo */}
        <div className="flex justify-center">
          <BrandLogo size="lg" />
        </div>

        {/* Error Message */}
        <div className="space-y-4">
          <h1
            className="font-bold text-foreground"
            style={{
              fontSize: 'clamp(3rem, 5vw + 1rem, 5rem)',
              fontWeight: 700
            }}
          >
            404
          </h1>

          <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
            Page Not Found
          </h2>

          <p className="text-lg text-muted-foreground max-w-md mx-auto leading-relaxed">
            This page seems to have wandered off into the void. Let's get you back on track.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-8 py-4 bg-[#EBA937] text-background font-semibold rounded-lg hover:bg-[#EBA937]/90 transition-all duration-200 hover:scale-105 focus:ring-2 focus:ring-[#EBA937] focus:outline-none min-h-[44px] min-w-[150px]"
          >
            Go Home
          </Link>

          <Link
            href="/projects"
            className="inline-flex items-center justify-center px-8 py-4 border border-[#EBA937] text-[#EBA937] font-semibold rounded-lg hover:bg-[#EBA937]/10 transition-all duration-200 focus:ring-2 focus:ring-[#EBA937] focus:outline-none min-h-[44px] min-w-[150px]"
          >
            View Projects
          </Link>
        </div>

        {/* Popular Links */}
        <div className="pt-8 border-t border-border/50">
          <p className="text-sm text-muted-foreground mb-4">
            Or explore these pages:
          </p>
          <nav className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/#about"
              className="text-[#EBA937] hover:underline focus:ring-2 focus:ring-[#EBA937] rounded px-2 py-1 focus:outline-none"
            >
              The Human
            </Link>
            <Link
              href="/blog"
              className="text-[#EBA937] hover:underline focus:ring-2 focus:ring-[#EBA937] rounded px-2 py-1 focus:outline-none"
            >
              Blog
            </Link>
            <Link
              href="/contact"
              className="text-[#EBA937] hover:underline focus:ring-2 focus:ring-[#EBA937] rounded px-2 py-1 focus:outline-none"
            >
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </div>
  )
}
