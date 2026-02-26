import { KazeLogo } from "@/components/kaze-logo"

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[var(--background-color)]/80 backdrop-blur-md">
      <KazeLogo size={80} animated={true} />
      <p className="mt-6 text-sm font-medium tracking-widest uppercase text-[var(--secondary-text-color)] animate-pulse">
        Loading
      </p>
    </div>
  )
}
