import { Skeleton } from "@/components/ui/skeleton"
import { AboutProfileSkeleton, AboutContentSkeleton } from "@/components/loading-skeletons"

export default function AboutLoading() {
  return (
    <div className="relative z-10 min-h-screen">
      <section className="pt-20 pb-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12 items-start">
            {/* Profile Skeleton */}
            <div className="lg:col-span-1">
              <AboutProfileSkeleton />
            </div>

            {/* Content Skeleton */}
            <div className="lg:col-span-2 space-y-12">
              <AboutContentSkeleton />
              
              {/* Skills Skeleton */}
              <div className="glass-card p-8 space-y-6">
                <Skeleton className="h-8 w-48 mb-6" />
                <div className="space-y-6">
                  <div>
                    <Skeleton className="h-6 w-40 mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <div className="flex gap-2 mt-2">
                      <Skeleton className="h-6 w-16" />
                      <Skeleton className="h-6 w-20" />
                      <Skeleton className="h-6 w-16" />
                    </div>
                  </div>
                  <div>
                    <Skeleton className="h-6 w-40 mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <div className="flex gap-2 mt-2">
                      <Skeleton className="h-6 w-16" />
                      <Skeleton className="h-6 w-20" />
                      <Skeleton className="h-6 w-16" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Skeleton */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center glass-card p-12 space-y-6">
          <Skeleton className="h-12 w-96 mx-auto" />
          <Skeleton className="h-6 w-full max-w-2xl mx-auto" />
          <Skeleton className="h-14 w-40 mx-auto" />
        </div>
      </section>
    </div>
  )
}
