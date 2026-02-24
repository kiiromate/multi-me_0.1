"use client"

import dynamic from "next/dynamic"

export const HeroCanvasClient = dynamic(
    () => import("@/components/animations/hero-animation").then((mod) => mod.HeroAnimation),
    {
        ssr: false,
        loading: () => <div className="fixed inset-0 -z-10 bg-[var(--background-color)]" />,
    }
)
