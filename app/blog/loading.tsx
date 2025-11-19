import { Skeleton } from "@/components/ui/skeleton"
import { BlogCardSkeleton } from "@/components/loading-skeletons"

export default function BlogLoading() {
  return (
    <div className="relative z-10 min-h-screen">
      {/* Header Skeleton */}
      <section className="pt-20 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <Skeleton className="h-16 w-96 mx-auto" />
          <Skeleton className="h-6 w-full max-w-2xl mx-auto" />
          
          {/* Search Skeleton */}
          <div className="flex flex-col gap-4 max-w-2xl mx-auto mt-8">
            <Skeleton className="h-12 w-full" />
            <div className="flex flex-wrap gap-2 justify-center">
              <Skeleton className="h-8 w-16" />
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-8 w-24" />
              <Skeleton className="h-8 w-20" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Posts Skeleton */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <Skeleton className="h-10 w-64 mx-auto mb-12" />
          <div className="grid lg:grid-cols-2 gap-8">
            <BlogCardSkeleton />
            <BlogCardSkeleton />
          </div>
        </div>
      </section>

      {/* All Posts Skeleton */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <Skeleton className="h-10 w-64 mx-auto mb-12" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <BlogCardSkeleton />
            <BlogCardSkeleton />
            <BlogCardSkeleton />
            <BlogCardSkeleton />
            <BlogCardSkeleton />
            <BlogCardSkeleton />
          </div>
        </div>
      </section>
    </div>
  )
}
