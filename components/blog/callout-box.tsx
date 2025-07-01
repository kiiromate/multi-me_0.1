import type React from "react"
import { AlertTriangle, Lightbulb, Info, Target, BookOpen } from "lucide-react"

interface CalloutBoxProps {
  type: "warning" | "insight" | "info" | "action" | "research"
  title: string
  children: React.ReactNode
}

export function CalloutBox({ type, title, children }: CalloutBoxProps) {
  const configs = {
    warning: {
      icon: AlertTriangle,
      bgColor: "bg-red-50 dark:bg-red-900/20",
      borderColor: "border-red-200 dark:border-red-800",
      iconColor: "text-red-600 dark:text-red-400",
      titleColor: "text-red-800 dark:text-red-200",
    },
    insight: {
      icon: Lightbulb,
      bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
      borderColor: "border-yellow-200 dark:border-yellow-800",
      iconColor: "text-yellow-600 dark:text-yellow-400",
      titleColor: "text-yellow-800 dark:text-yellow-200",
    },
    info: {
      icon: Info,
      bgColor: "bg-blue-50 dark:bg-blue-900/20",
      borderColor: "border-blue-200 dark:border-blue-800",
      iconColor: "text-blue-600 dark:text-blue-400",
      titleColor: "text-blue-800 dark:text-blue-200",
    },
    action: {
      icon: Target,
      bgColor: "bg-green-50 dark:bg-green-900/20",
      borderColor: "border-green-200 dark:border-green-800",
      iconColor: "text-green-600 dark:text-green-400",
      titleColor: "text-green-800 dark:text-green-200",
    },
    research: {
      icon: BookOpen,
      bgColor: "bg-purple-50 dark:bg-purple-900/20",
      borderColor: "border-purple-200 dark:border-purple-800",
      iconColor: "text-purple-600 dark:text-purple-400",
      titleColor: "text-purple-800 dark:text-purple-200",
    },
  }

  const config = configs[type]
  const Icon = config.icon

  return (
    <div className={`${config.bgColor} ${config.borderColor} border rounded-lg p-6 my-6`}>
      <div className="flex items-start gap-3">
        <Icon className={`w-5 h-5 ${config.iconColor} mt-1 flex-shrink-0`} />
        <div>
          <h4 className={`font-semibold ${config.titleColor} mb-2`}>{title}</h4>
          <div className="text-[var(--text-color)]">{children}</div>
        </div>
      </div>
    </div>
  )
}
