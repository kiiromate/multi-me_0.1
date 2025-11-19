import { HeroSkeleton, FeaturedProjectsSkeleton, BlogPostsSkeleton } from "@/components/loading-skeletons"

export default function HomeLoading() {
  return (
    <div className="space-y-16 sm:space-y-24 py-8 sm:py-16">
      <HeroSkeleton />
      <FeaturedProjectsSkeleton />
      <BlogPostsSkeleton />
    </div>
  )
}
