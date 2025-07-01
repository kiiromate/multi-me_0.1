import { ProjectCard } from "./project-card"
import { BlogCard } from "./blog-card"
import { ContentGrid } from "./content-grid"

// Sample data
const sampleProjects = [
  {
    title: "E-commerce Dashboard",
    description:
      "A comprehensive admin dashboard for managing online stores with real-time analytics, inventory management, and customer insights.",
    image: "/placeholder.svg?height=300&width=500",
    techStack: ["React", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example",
    status: "completed" as const,
    slug: "ecommerce-dashboard",
  },
  {
    title: "AI Content Generator",
    description:
      "An intelligent content creation tool that helps writers generate ideas, outlines, and drafts using advanced language models.",
    image: "/placeholder.svg?height=300&width=500",
    techStack: ["Next.js", "OpenAI API", "Prisma", "Vercel"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example",
    status: "in-progress" as const,
    slug: "ai-content-generator",
  },
  {
    title: "Mobile Fitness App",
    description:
      "A React Native application for tracking workouts, nutrition, and progress with social features and gamification.",
    image: "/placeholder.svg?height=300&width=500",
    techStack: ["React Native", "Expo", "Firebase", "Redux"],
    githubUrl: "https://github.com/example",
    status: "planned" as const,
    slug: "mobile-fitness-app",
  },
]

const sampleBlogPosts = [
  {
    title: "The Future of Web Development: Trends to Watch in 2024",
    excerpt:
      "Exploring the latest trends shaping the web development landscape, from AI integration to new frameworks and the evolution of user experience design.",
    image: "/placeholder.svg?height=300&width=500",
    publishedAt: "2024-01-15",
    readTime: "8 min read",
    category: "Technology",
    author: {
      name: "Kaze Keza",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    slug: "future-of-web-development-2024",
    featured: true,
  },
  {
    title: "Building Accessible React Components",
    excerpt:
      "A comprehensive guide to creating inclusive user interfaces that work for everyone, covering ARIA patterns, keyboard navigation, and testing strategies.",
    image: "/placeholder.svg?height=300&width=500",
    publishedAt: "2024-01-10",
    readTime: "12 min read",
    category: "Development",
    author: {
      name: "Kaze Keza",
    },
    slug: "building-accessible-react-components",
  },
  {
    title: "Design Systems at Scale",
    excerpt:
      "How to create and maintain design systems that grow with your organization while ensuring consistency and developer experience.",
    image: "/placeholder.svg?height=300&width=500",
    publishedAt: "2024-01-05",
    readTime: "6 min read",
    category: "Design",
    author: {
      name: "Kaze Keza",
    },
    slug: "design-systems-at-scale",
  },
]

export default function CardsShowcase() {
  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center space-y-6 mb-16">
          <h1 className="font-inter font-bold text-6xl text-text-primary tracking-tighter">
            Card System
            <br />
            <span className="text-accent-honey">Showcase</span>
          </h1>
          <p className="font-system text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
            Glass morphism cards with thoughtful hover interactions, perfect typography hierarchy, and responsive
            layouts that adapt beautifully to any screen size.
          </p>
        </div>

        {/* Projects Section */}
        <section className="space-y-8 mb-20">
          <div className="space-y-4">
            <h2 className="font-inter font-semibold text-4xl text-text-primary">Featured Projects</h2>
            <p className="font-system text-lg text-text-secondary max-w-2xl">
              Showcasing recent work with detailed project information, tech stacks, and live demos.
            </p>
          </div>

          <ContentGrid variant="projects">
            {sampleProjects.map((project) => (
              <ProjectCard key={project.slug} {...project} />
            ))}
          </ContentGrid>
        </section>

        {/* Blog Section */}
        <section className="space-y-8">
          <div className="space-y-4">
            <h2 className="font-inter font-semibold text-4xl text-text-primary">Latest Articles</h2>
            <p className="font-system text-lg text-text-secondary max-w-2xl">
              Thoughts on design, development, and the intersection of technology and creativity.
            </p>
          </div>

          <ContentGrid variant="blog">
            {sampleBlogPosts.map((post) => (
              <BlogCard key={post.slug} {...post} />
            ))}
          </ContentGrid>
        </section>

        {/* Design Principles */}
        <section className="mt-20 pt-16 border-t border-text-secondary/10">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <h3 className="font-inter font-semibold text-xl text-text-primary">Glass Morphism</h3>
              <p className="font-system text-text-secondary leading-relaxed">
                Subtle backdrop blur effects create depth and visual hierarchy while maintaining readability across
                themes.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="font-inter font-semibold text-xl text-text-primary">Thoughtful Interactions</h3>
              <p className="font-system text-text-secondary leading-relaxed">
                Smooth hover states with scale transforms and glowing borders provide tactile feedback without
                overwhelming the content.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="font-inter font-semibold text-xl text-text-primary">Responsive Design</h3>
              <p className="font-system text-text-secondary leading-relaxed">
                Adaptive layouts that flow naturally from single-column mobile to multi-column desktop experiences.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
