import React from "react"

export function AmbientBackground() {
    return (
        <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none transition-colors duration-500">
            {/* Ambient glassmorphism gradient orbs */}
            <div
                className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[var(--accent-honey)] mix-blend-multiply dark:mix-blend-screen blur-[120px] opacity-15 dark:opacity-10 animate-pulse-slow"
                style={{ animationDuration: '10s' }}
            />

            {/* Added a warm secondary color to offset the honey */}
            <div
                className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-amber-600/50 mix-blend-multiply dark:mix-blend-screen blur-[120px] opacity-10 dark:opacity-5 animate-pulse-slow"
                style={{ animationDuration: '14s', animationDelay: '2s' }}
            />

            <div
                className="absolute top-[40%] right-[10%] w-[30vw] h-[30vw] rounded-full bg-[var(--accent-honey)] mix-blend-multiply dark:mix-blend-screen blur-[100px] opacity-10 dark:opacity-5 animate-pulse-slow"
                style={{ animationDuration: '11s', animationDelay: '4s' }}
            />

            {/* Subtle noise texture over the background */}
            <div className="absolute inset-0 bg-noise opacity-[0.15]" />
        </div>
    )
}
