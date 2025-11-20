'use client'

import { motion } from 'framer-motion'
import { lazy, Suspense } from 'react'
import type { Capability } from '@/types/sanity'
import * as LucideIcons from 'lucide-react'

interface CapabilitiesGridProps {
  capabilities: Capability[]
  className?: string
}

// Dynamic icon loader
function DynamicIcon({ iconName }: { iconName: string }) {
  // Default icon if not found
  const DefaultIcon = LucideIcons.Box

  try {
    const IconComponent = (LucideIcons as any)[iconName]
    if (IconComponent && typeof IconComponent === 'function') {
      return <IconComponent size={24} className="flex-shrink-0" />
    }
    return <DefaultIcon size={24} className="flex-shrink-0" />
  } catch {
    return <DefaultIcon size={24} className="flex-shrink-0" />
  }
}

export function CapabilitiesGrid({ capabilities, className = '' }: CapabilitiesGridProps) {
  if (!capabilities || capabilities.length === 0) {
    return null
  }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${className}`}>
      {capabilities.map((capability, index) => (
        <motion.div
          key={capability._id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{
            borderColor: 'rgba(235, 169, 55, 0.5)',
            transition: { duration: 0.2 }
          }}
          className="capability-card relative p-6 backdrop-blur-md bg-background/50 border border-border/50 rounded-lg overflow-hidden group focus-within:ring-2 focus-within:ring-[#EBA937]"
          style={{
            minHeight: '44px'
          }}
        >
          {/* Noise texture overlay */}
          <div
            className="absolute inset-0 pointer-events-none rounded-lg opacity-[0.03] mix-blend-overlay"
            style={{
              backgroundImage: 'url(/textures/noise.svg)',
              backgroundRepeat: 'repeat',
              backgroundSize: '200px 200px'
            }}
          />

          {/* Content */}
          <div className="relative z-10 flex flex-col gap-4">
            <div className="flex items-start gap-4">
              {/* Icon */}
              <div className="text-[#EBA937] mt-1">
                <Suspense fallback={<LucideIcons.Box size={24} />}>
                  <DynamicIcon iconName={capability.iconName} />
                </Suspense>
              </div>

              {/* Text content */}
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-foreground mb-2">
                  {capability.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {capability.description}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
