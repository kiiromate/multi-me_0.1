import { Skeleton } from "@/components/ui/skeleton"
import { ProjectCardSkeleton } from "@/components/loading-skeletons"

export default function ProjectsLoading() {
  return (
    <div className="relative z-10 min-h-screen">
      {/* Header Skeleton */}
      <section className="pt-20 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <Skeleton className="h-16 w-96 mx-auto" />
          <Skeleton className="h-6 w-full max-w-2xl mx-auto" />
        </div>
      </section>

      {/* Featured Projects Skeleton */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <Skeleton className="h-10 w-64 mx-auto mb-12" />
          <div className="space-y-16">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <Skeleton className="aspect-video w-full" />
              <div className="space-y-4">
                <Skeleton className="h-8 w-32" />
                <Skeleton className="h-10 w-3/4" />
                <Skeleton className="h-24 w-full" />
                <div className="flex gap-2">
                  <Skeleton className="h-8 w-20" />
                  <Skeleton className="h-8 w-24" />
                  <Skeleton className="h-8 w-20" />
                </div>
                <div className="flex gap-4">
                  <Skeleton className="h-12 w-32" />
                  <Skeleton className="h-12 w-32" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* More Projects Skeleton */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <Skeleton className="h-10 w-64 mx-auto mb-12" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ProjectCardSkeleton />
            <ProjectCardSkeleton />
            <ProjectCardSkeleton />
          </div>
        </div>
      </section>
    </div>
  )
}
