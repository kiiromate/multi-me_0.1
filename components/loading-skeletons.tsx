"use client"

import { Skeleton } from "@/components/ui/skeleton"
import GlassCard from "@/components/ui/glass-card"

/**
 * Loading skeleton for project cards
 */
export function ProjectCardSkeleton() {
  return (
    <div className="glass-card overflow-hidden">
      <Skeleton className="aspect-video w-full" />
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-16" />
        </div>
        <Skeleton className="h-8 w-3/4" />
        <Skeleton className="h-20 w-full" />
        <div className="flex gap-2">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-16" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-10 w-24" />
          <Skeleton className="h-10 w-24" />
        </div>
      </div>
    </div>
  )
}

/**
 * Loading skeleton for blog post cards
 */
export function BlogCardSkeleton() {
  return (
    <div className="glass-card p-6 space-y-4">
      <div className="flex items-center gap-4">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-16" />
      </div>
      <Skeleton className="h-8 w-full" />
      <Skeleton className="h-16 w-full" />
      <div className="flex gap-2">
        <Skeleton className="h-6 w-16" />
        <Skeleton className="h-6 w-20" />
      </div>
      <Skeleton className="h-6 w-32" />
    </div>
  )
}

/**
 * Loading skeleton for about page profile section
 */
export function AboutProfileSkeleton() {
  return (
    <GlassCard className="p-8 text-center">
      <Skeleton className="w-32 h-32 mx-auto rounded-full mb-6" />
      <Skeleton className="h-8 w-48 mx-auto mb-2" />
      <Skeleton className="h-6 w-64 mx-auto mb-4" />
      <div className="space-y-3 mb-6">
        <Skeleton className="h-4 w-40 mx-auto" />
        <Skeleton className="h-4 w-36 mx-auto" />
        <Skeleton className="h-4 w-44 mx-auto" />
      </div>
      <div className="flex justify-center gap-4">
        <Skeleton className="h-10 w-10 rounded-full" />
        <Skeleton className="h-10 w-10 rounded-full" />
        <Skeleton className="h-10 w-10 rounded-full" />
        <Skeleton className="h-10 w-10 rounded-full" />
      </div>
    </GlassCard>
  )
}

/**
 * Loading skeleton for about page content section
 */
export function AboutContentSkeleton() {
  return (
    <GlassCard className="p-8 space-y-4">
      <Skeleton className="h-10 w-48 mb-6" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
    </GlassCard>
  )
}

/**
 * Loading skeleton for homepage hero section
 */
export function HeroSkeleton() {
  return (
    <section className="text-center space-y-6 sm:space-y-8 py-12 sm:py-20">
      <div className="space-y-4 sm:space-y-6">
        <Skeleton className="h-16 sm:h-24 w-3/4 mx-auto" />
        <Skeleton className="h-8 sm:h-12 w-2/3 mx-auto" />
        <Skeleton className="h-6 w-full max-w-3xl mx-auto" />
        <Skeleton className="h-6 w-5/6 max-w-3xl mx-auto" />
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
        <Skeleton className="h-14 w-40" />
        <Skeleton className="h-14 w-40" />
      </div>
    </section>
  )
}

/**
 * Loading skeleton for featured projects section
 */
export function FeaturedProjectsSkeleton() {
  return (
    <section className="space-y-8 sm:space-y-12">
      <div className="text-center space-y-4">
        <Skeleton className="h-12 w-64 mx-auto" />
        <Skeleton className="h-6 w-96 mx-auto" />
      </div>
      <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
        <ProjectCardSkeleton />
        <ProjectCardSkeleton />
        <ProjectCardSkeleton />
      </div>
    </section>
  )
}

/**
 * Loading skeleton for blog posts section
 */
export function BlogPostsSkeleton() {
  return (
    <section className="space-y-8 sm:space-y-12">
      <div className="text-center space-y-4">
        <Skeleton className="h-12 w-64 mx-auto" />
        <Skeleton className="h-6 w-96 mx-auto" />
      </div>
      <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
        <BlogCardSkeleton />
        <BlogCardSkeleton />
        <BlogCardSkeleton />
      </div>
    </section>
  )
}
