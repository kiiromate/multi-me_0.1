"use client"

import { motion } from "framer-motion"
import { Calendar, Clock, User, ArrowLeft, Eye } from "lucide-react"
import Link from "next/link"
import { TableOfContents } from "@/components/blog/table-of-contents"
import { ReadingProgress } from "@/components/blog/reading-progress"
import { SocialShare } from "@/components/blog/social-share"
import { RelatedPosts } from "@/components/blog/related-posts"
import { CodeBlock } from "@/components/blog/code-block"
import { Blockquote } from "@/components/blog/blockquote"
import { InteractiveChart } from "@/components/blog/interactive-chart"
import { CalloutBox } from "@/components/blog/callout-box"

// Mock data - in a real app, this would come from a CMS or API
const getBlogPost = (slug: string) => {
  const posts = {
    "minimal-web-design": {
      id: 1,
      title: "The Art of Minimal Web Design",
      subtitle: "How reducing visual noise can amplify your message and improve user experience",
      excerpt:
        "In a world saturated with information and visual stimuli, minimal web design emerges as a powerful approach to creating meaningful digital experiences. This deep dive explores the principles, psychology, and practical implementation of minimalism in modern web design.",
      content: "full-content", // We'll define this below
      date: "2024-12-15",
      readTime: "8 min read",
      author: {
        name: "Kaze Keza",
        avatar: "/placeholder.svg?height=40&width=40",
        bio: "Creative technologist passionate about sustainable design and data storytelling.",
      },
      tags: ["Design", "UX", "Minimalism", "Web Design"],
      category: "Design",
      heroImage: "/placeholder.svg?height=600&width=1200",
      views: 1247,
      featured: true,
      tableOfContents: [
        { id: "introduction", title: "Introduction", level: 1 },
        { id: "principles", title: "Core Principles of Minimal Design", level: 1 },
        { id: "whitespace", title: "The Power of Whitespace", level: 2 },
        { id: "typography", title: "Typography in Minimal Design", level: 2 },
        { id: "psychology", title: "The Psychology Behind Minimalism", level: 1 },
        { id: "implementation", title: "Practical Implementation", level: 1 },
        { id: "case-studies", title: "Case Studies", level: 2 },
        { id: "conclusion", title: "Conclusion", level: 1 },
      ],
    },
    "data-viz-ethics": {
      id: 2,
      title: "Data Visualization Ethics: The Responsibility of Visual Storytelling",
      subtitle: "Examining the ethical implications of data representation in our digital age",
      excerpt:
        "Data visualization is not just about making numbers look pretty. It's about truth, responsibility, and the power to influence understanding. This article explores the ethical considerations every data visualizer should embrace.",
      content: "full-content",
      date: "2024-12-10",
      readTime: "12 min read",
      author: {
        name: "Kaze Keza",
        avatar: "/placeholder.svg?height=40&width=40",
        bio: "Creative technologist passionate about sustainable design and data storytelling.",
      },
      tags: ["Data Visualization", "Ethics", "Responsibility", "Design"],
      category: "Technology",
      heroImage: "/placeholder.svg?height=600&width=1200",
      views: 892,
      featured: true,
      tableOfContents: [
        { id: "introduction", title: "The Power of Visual Data", level: 1 },
        { id: "ethical-framework", title: "An Ethical Framework for Data Viz", level: 1 },
        { id: "common-pitfalls", title: "Common Ethical Pitfalls", level: 2 },
        { id: "best-practices", title: "Best Practices for Ethical Visualization", level: 1 },
        { id: "case-studies", title: "Real-World Examples", level: 2 },
        { id: "conclusion", title: "Moving Forward Responsibly", level: 1 },
      ],
    },
  }

  return posts[slug as keyof typeof posts] || null
}

interface BlogPostPageProps {
  params: { slug: string }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getBlogPost(params.slug)

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <p className="text-[var(--secondary-text-color)] mb-8">The blog post you're looking for doesn't exist.</p>
          <Link href="/blog" className="accent-button inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      <ReadingProgress />

      <article className="relative">
        {/* Hero Section */}
        <motion.section
          className="relative h-[70vh] overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-honey)]/20 to-[var(--accent-honey)]/5" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--background-color)] via-[var(--background-color)]/50 to-transparent" />

          <div className="relative z-10 h-full flex items-end">
            <div className="max-w-4xl mx-auto px-6 pb-16">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-[var(--secondary-text-color)] hover:text-[var(--accent-honey)] transition-colors duration-200 mb-6"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Blog
                </Link>

                <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--secondary-text-color)] mb-4">
                  <span className="px-3 py-1 bg-[var(--accent-honey)] text-[var(--background-color)] rounded-full font-medium">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(post.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {post.readTime}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {post.views.toLocaleString()} views
                  </span>
                </div>

                <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">{post.title}</h1>
                <p className="text-xl text-[var(--secondary-text-color)] leading-relaxed max-w-3xl">{post.subtitle}</p>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Content Layout */}
        <div className="relative">
          <div className="max-w-7xl mx-auto px-6 py-16">
            <div className="grid lg:grid-cols-12 gap-12">
              {/* Table of Contents - Desktop Sidebar */}
              <div className="hidden lg:block lg:col-span-3">
                <div className="sticky top-24">
                  <TableOfContents items={post.tableOfContents} />
                  <div className="mt-8">
                    <SocialShare title={post.title} url={`https://kazekeza.dev/blog/${params.slug}`} vertical={true} />
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className="lg:col-span-9">
                <motion.div
                  className="prose prose-lg max-w-none"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  {params.slug === "minimal-web-design" && <MinimalWebDesignContent />}
                  {params.slug === "data-viz-ethics" && <DataVizEthicsContent />}
                </motion.div>

                {/* Mobile Social Share */}
                <div className="lg:hidden mt-12 pt-8 border-t border-[var(--subtle-border-color)]">
                  <SocialShare title={post.title} url={`https://kazekeza.dev/blog/${params.slug}`} />
                </div>

                {/* Author Bio */}
                <motion.div
                  className="mt-16 p-8 glass-card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-full bg-[var(--accent-honey)]/20 flex items-center justify-center flex-shrink-0">
                      <User className="w-8 h-8 text-[var(--accent-honey)]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">About {post.author.name}</h3>
                      <p className="text-[var(--secondary-text-color)] leading-relaxed">{post.author.bio}</p>
                    </div>
                  </div>
                </motion.div>

                {/* Related Posts */}
                <div className="mt-16">
                  <RelatedPosts currentPostId={post.id} category={post.category} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  )
}

// Content Components for specific blog posts
function MinimalWebDesignContent() {
  return (
    <div className="space-y-8">
      <section id="introduction">
        <p className="text-xl font-medium text-[var(--text-color)] mb-6">
          In our hyperconnected world, where every pixel competes for attention, minimal web design emerges as a beacon
          of clarity. It's not about having less—it's about having exactly what you need, when you need it.
        </p>

        <p>
          This philosophy, rooted in Dieter Rams' principle of "Weniger, aber besser" (Less, but better), transforms how
          we approach digital experiences. When we strip away the unnecessary, what remains isn't emptiness—it's
          intention.
        </p>

        <CalloutBox type="insight" title="Key Insight">
          Minimal design isn't about removing features; it's about removing friction between users and their goals.
        </CalloutBox>
      </section>

      <section id="principles">
        <h2 className="text-3xl font-bold mb-6">Core Principles of Minimal Design</h2>

        <p>
          Minimal web design rests on several foundational principles that guide every decision from layout to
          interaction design:
        </p>

        <div className="grid md:grid-cols-2 gap-6 my-8">
          <div className="glass-card p-6">
            <h3 className="text-xl font-semibold mb-3 text-[var(--accent-honey)]">Purposeful Simplicity</h3>
            <p className="text-[var(--secondary-text-color)]">
              Every element serves a specific purpose. If it doesn't contribute to the user's goal, it doesn't belong.
            </p>
          </div>
          <div className="glass-card p-6">
            <h3 className="text-xl font-semibold mb-3 text-[var(--accent-honey)]">Generous Whitespace</h3>
            <p className="text-[var(--secondary-text-color)]">
              Whitespace isn't empty space—it's breathing room that allows content to shine and users to focus.
            </p>
          </div>
          <div className="glass-card p-6">
            <h3 className="text-xl font-semibold mb-3 text-[var(--accent-honey)]">Intentional Typography</h3>
            <p className="text-[var(--secondary-text-color)]">
              Typography becomes the primary design element, creating hierarchy and personality without decoration.
            </p>
          </div>
          <div className="glass-card p-6">
            <h3 className="text-xl font-semibold mb-3 text-[var(--accent-honey)]">Functional Beauty</h3>
            <p className="text-[var(--secondary-text-color)]">
              Aesthetics emerge from function, not the other way around. Beauty is a byproduct of good design.
            </p>
          </div>
        </div>

        <h3 id="whitespace" className="text-2xl font-semibold mb-4 mt-12">
          The Power of Whitespace
        </h3>

        <p>
          Whitespace—or negative space—is perhaps the most misunderstood element in web design. Clients often see it as
          "wasted space," but designers know it's where the magic happens.
        </p>

        <Blockquote author="Jan Tschichold" source="The New Typography">
          White space is to be regarded as an active element, not a passive background.
        </Blockquote>

        <p>Consider how whitespace functions in minimal design:</p>

        <ul className="space-y-2 ml-6">
          <li>
            <strong>Creates Focus:</strong> By surrounding important elements with space, we naturally draw attention to
            them
          </li>
          <li>
            <strong>Improves Readability:</strong> Adequate spacing between lines and paragraphs reduces cognitive load
          </li>
          <li>
            <strong>Establishes Hierarchy:</strong> Different amounts of space can indicate relationships between
            elements
          </li>
          <li>
            <strong>Conveys Quality:</strong> Generous spacing often signals premium, thoughtful design
          </li>
        </ul>

        <h3 id="typography" className="text-2xl font-semibold mb-4 mt-12">
          Typography in Minimal Design
        </h3>

        <p>
          When decoration is stripped away, typography becomes the primary vehicle for personality and hierarchy. The
          choice of typeface, size, weight, and spacing carries the entire visual load.
        </p>

        <CodeBlock
          code={`/* Minimal typography system */
:root {
  --font-primary: 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
  
  /* Modular scale (1.25 ratio) */
  --text-xs: 0.8rem;
  --text-sm: 1rem;
  --text-md: 1.25rem;
  --text-lg: 1.563rem;
  --text-xl: 1.953rem;
  --text-2xl: 2.441rem;
  --text-3xl: 3.052rem;
}

.minimal-text {
  font-family: var(--font-primary);
  line-height: 1.7;
  letter-spacing: -0.01em;
  color: var(--text-primary);
}`}
          language="css"
          filename="minimal-typography.css"
        />
      </section>

      <section id="psychology">
        <h2 className="text-3xl font-bold mb-6">The Psychology Behind Minimalism</h2>

        <p>
          Minimal design isn't just an aesthetic choice—it's rooted in cognitive psychology. Our brains are constantly
          processing visual information, and reducing visual noise directly impacts user experience.
        </p>

        <InteractiveChart
          title="Cognitive Load vs. Design Complexity"
          description="This chart shows how cognitive load increases exponentially with design complexity, while user satisfaction follows an inverse relationship."
          type="line"
          data={[
            { complexity: 1, cognitiveLoad: 2, satisfaction: 9 },
            { complexity: 2, cognitiveLoad: 3, satisfaction: 8.5 },
            { complexity: 3, cognitiveLoad: 5, satisfaction: 7.5 },
            { complexity: 4, cognitiveLoad: 8, satisfaction: 6 },
            { complexity: 5, cognitiveLoad: 12, satisfaction: 4 },
            { complexity: 6, cognitiveLoad: 18, satisfaction: 2.5 },
          ]}
        />

        <CalloutBox type="research" title="Research Finding">
          Studies show that users form opinions about websites within 50 milliseconds. Minimal designs consistently
          score higher in perceived trustworthiness and professionalism.
        </CalloutBox>

        <p>The psychological benefits of minimal design include:</p>

        <div className="bg-[var(--accent-honey)]/5 rounded-lg p-6 my-8">
          <h4 className="font-semibold mb-4">Cognitive Benefits</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h5 className="font-medium text-[var(--accent-honey)] mb-2">Reduced Decision Fatigue</h5>
              <p className="text-sm text-[var(--secondary-text-color)]">
                Fewer choices mean users can focus on what matters most
              </p>
            </div>
            <div>
              <h5 className="font-medium text-[var(--accent-honey)] mb-2">Improved Focus</h5>
              <p className="text-sm text-[var(--secondary-text-color)]">
                Less visual noise allows for deeper engagement with content
              </p>
            </div>
            <div>
              <h5 className="font-medium text-[var(--accent-honey)] mb-2">Faster Processing</h5>
              <p className="text-sm text-[var(--secondary-text-color)]">
                Simpler layouts are processed more quickly by the brain
              </p>
            </div>
            <div>
              <h5 className="font-medium text-[var(--accent-honey)] mb-2">Enhanced Memory</h5>
              <p className="text-sm text-[var(--secondary-text-color)]">
                Clear hierarchy helps users remember where they found information
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="implementation">
        <h2 className="text-3xl font-bold mb-6">Practical Implementation</h2>

        <p>
          Implementing minimal design requires discipline and a systematic approach. Here's a practical framework for
          creating minimal web experiences:
        </p>

        <h3 className="text-xl font-semibold mb-4 mt-8">The Subtraction Method</h3>

        <p>Start with everything you think you need, then systematically remove elements:</p>

        <ol className="space-y-4 ml-6 my-6">
          <li>
            <strong>1. Audit Current Elements:</strong> List every component, image, and piece of text on your page
          </li>
          <li>
            <strong>2. Define Core Goals:</strong> What are the 1-3 primary actions users should take?
          </li>
          <li>
            <strong>3. Eliminate Non-Essential:</strong> Remove anything that doesn't directly support core goals
          </li>
          <li>
            <strong>4. Combine Similar Elements:</strong> Merge redundant components and simplify navigation
          </li>
          <li>
            <strong>5. Test and Iterate:</strong> Validate that simplified design still meets user needs
          </li>
        </ol>

        <h3 id="case-studies" className="text-2xl font-semibold mb-4 mt-12">
          Case Studies
        </h3>

        <div className="space-y-8">
          <div className="glass-card p-8">
            <h4 className="text-xl font-semibold mb-4">Case Study: Apple.com</h4>
            <p className="text-[var(--secondary-text-color)] mb-4">
              Apple's website exemplifies minimal design principles. Each product page focuses on a single hero image,
              minimal text, and clear calls-to-action.
            </p>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <strong className="text-[var(--accent-honey)]">Whitespace Usage:</strong>
                <p className="text-[var(--secondary-text-color)]">70% of page area</p>
              </div>
              <div>
                <strong className="text-[var(--accent-honey)]">Color Palette:</strong>
                <p className="text-[var(--secondary-text-color)]">3-4 colors maximum</p>
              </div>
              <div>
                <strong className="text-[var(--accent-honey)]">Typography:</strong>
                <p className="text-[var(--secondary-text-color)]">Single font family</p>
              </div>
            </div>
          </div>

          <div className="glass-card p-8">
            <h4 className="text-xl font-semibold mb-4">Case Study: Medium.com</h4>
            <p className="text-[var(--secondary-text-color)] mb-4">
              Medium's reading experience prioritizes content above all else. The interface disappears, leaving only the
              words and the reader.
            </p>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <strong className="text-[var(--accent-honey)]">Reading Width:</strong>
                <p className="text-[var(--secondary-text-color)]">Optimal 65-75 characters</p>
              </div>
              <div>
                <strong className="text-[var(--accent-honey)]">Line Height:</strong>
                <p className="text-[var(--secondary-text-color)]">1.6-1.8 for readability</p>
              </div>
              <div>
                <strong className="text-[var(--accent-honey)]">Distractions:</strong>
                <p className="text-[var(--secondary-text-color)]">Hidden until needed</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="conclusion">
        <h2 className="text-3xl font-bold mb-6">Conclusion</h2>

        <p>
          Minimal web design isn't about following trends—it's about respecting your users' time and attention. In a
          world where every interface competes for engagement, the websites that succeed are those that get out of their
          users' way.
        </p>

        <Blockquote>
          The best interface is no interface. The second best is a minimal one that disappears when not needed.
        </Blockquote>

        <p>
          As we move forward in an increasingly complex digital landscape, the principles of minimal design become more
          relevant, not less. They remind us that our job as designers isn't to impress—it's to serve.
        </p>

        <CalloutBox type="action" title="Next Steps">
          Ready to implement minimal design in your next project? Start by auditing your current design and asking:
          "What would happen if I removed this element?" You might be surprised by how much you don't need.
        </CalloutBox>
      </section>
    </div>
  )
}

function DataVizEthicsContent() {
  return (
    <div className="space-y-8">
      <section id="introduction">
        <p className="text-xl font-medium text-[var(--text-color)] mb-6">
          Every chart tells a story. Every graph makes an argument. Every visualization shapes understanding. With this
          power comes profound responsibility—one that extends far beyond making data "look good."
        </p>

        <p>
          Data visualization sits at the intersection of art, science, and communication. It's where raw numbers become
          human understanding, where abstract concepts become actionable insights. But this transformation isn't
          neutral—it's shaped by countless decisions that can illuminate truth or obscure it.
        </p>

        <CalloutBox type="warning" title="The Stakes Are High">
          Misleading visualizations have influenced elections, shaped public health responses, and guided
          trillion-dollar investment decisions. The responsibility is real.
        </CalloutBox>
      </section>

      <section id="ethical-framework">
        <h2 className="text-3xl font-bold mb-6">An Ethical Framework for Data Visualization</h2>

        <p>
          Building ethical data visualizations requires a framework that guides decision-making at every step. Here's a
          comprehensive approach based on principles of transparency, accuracy, and respect for the audience.
        </p>

        <div className="grid md:grid-cols-2 gap-8 my-8">
          <div className="glass-card p-6">
            <h3 className="text-xl font-semibold mb-4 text-[var(--accent-honey)]">Truth & Accuracy</h3>
            <ul className="space-y-2 text-[var(--secondary-text-color)]">
              <li>• Represent data without distortion</li>
              <li>• Use appropriate scales and baselines</li>
              <li>• Acknowledge limitations and uncertainties</li>
              <li>• Provide context for interpretation</li>
            </ul>
          </div>

          <div className="glass-card p-6">
            <h3 className="text-xl font-semibold mb-4 text-[var(--accent-honey)]">Transparency</h3>
            <ul className="space-y-2 text-[var(--secondary-text-color)]">
              <li>• Cite data sources clearly</li>
              <li>• Explain methodology and assumptions</li>
              <li>• Make raw data available when possible</li>
              <li>• Disclose conflicts of interest</li>
            </ul>
          </div>

          <div className="glass-card p-6">
            <h3 className="text-xl font-semibold mb-4 text-[var(--accent-honey)]">Accessibility</h3>
            <ul className="space-y-2 text-[var(--secondary-text-color)]">
              <li>• Design for diverse abilities</li>
              <li>• Use colorblind-friendly palettes</li>
              <li>• Provide alternative text descriptions</li>
              <li>• Ensure keyboard navigation</li>
            </ul>
          </div>

          <div className="glass-card p-6">
            <h3 className="text-xl font-semibold mb-4 text-[var(--accent-honey)]">Respect</h3>
            <ul className="space-y-2 text-[var(--secondary-text-color)]">
              <li>• Honor the dignity of data subjects</li>
              <li>• Protect privacy and confidentiality</li>
              <li>• Avoid harmful stereotypes</li>
              <li>• Consider cultural context</li>
            </ul>
          </div>
        </div>

        <h3 id="common-pitfalls" className="text-2xl font-semibold mb-4 mt-12">
          Common Ethical Pitfalls
        </h3>

        <p>Even well-intentioned visualizations can mislead. Here are the most common ethical pitfalls:</p>

        <div className="space-y-6 my-8">
          <div className="border-l-4 border-red-500 pl-6">
            <h4 className="font-semibold text-red-600 mb-2">Truncated Y-Axis</h4>
            <p className="text-[var(--secondary-text-color)]">
              Starting the y-axis at a non-zero value can exaggerate small differences and mislead viewers about the
              magnitude of change.
            </p>
          </div>

          <div className="border-l-4 border-orange-500 pl-6">
            <h4 className="font-semibold text-orange-600 mb-2">Cherry-Picked Time Ranges</h4>
            <p className="text-[var(--secondary-text-color)]">
              Selecting specific date ranges that support a particular narrative while ignoring broader context.
            </p>
          </div>

          <div className="border-l-4 border-yellow-500 pl-6">
            <h4 className="font-semibold text-yellow-600 mb-2">Correlation vs. Causation</h4>
            <p className="text-[var(--secondary-text-color)]">
              Implying causal relationships when only correlation exists, leading to false conclusions about cause and
              effect.
            </p>
          </div>

          <div className="border-l-4 border-blue-500 pl-6">
            <h4 className="font-semibold text-blue-600 mb-2">Inappropriate Chart Types</h4>
            <p className="text-[var(--secondary-text-color)]">
              Using chart types that don't match the data structure or that make accurate comparison difficult.
            </p>
          </div>
        </div>

        <InteractiveChart
          title="The Impact of Y-Axis Manipulation"
          description="This interactive example shows how the same data can tell different stories depending on the y-axis scale."
          type="comparison"
          data={[
            { month: "Jan", sales: 100 },
            { month: "Feb", sales: 102 },
            { month: "Mar", sales: 105 },
            { month: "Apr", sales: 103 },
            { month: "May", sales: 108 },
            { month: "Jun", sales: 110 },
          ]}
        />
      </section>

      <section id="best-practices">
        <h2 className="text-3xl font-bold mb-6">Best Practices for Ethical Visualization</h2>

        <p>
          Creating ethical visualizations requires intentional practices throughout the design process. Here's a
          practical guide:
        </p>

        <h3 className="text-xl font-semibold mb-4 mt-8">The Ethical Design Process</h3>

        <div className="space-y-6">
          <div className="glass-card p-6">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-[var(--accent-honey)] text-[var(--background-color)] flex items-center justify-center font-bold text-sm">
                1
              </div>
              <div>
                <h4 className="font-semibold mb-2">Question Your Assumptions</h4>
                <p className="text-[var(--secondary-text-color)]">
                  Before designing, examine your own biases and assumptions about the data. What story are you hoping to
                  tell? What story does the data actually tell?
                </p>
              </div>
            </div>
          </div>

          <div className="glass-card p-6">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-[var(--accent-honey)] text-[var(--background-color)] flex items-center justify-center font-bold text-sm">
                2
              </div>
              <div>
                <h4 className="font-semibold mb-2">Understand Your Data</h4>
                <p className="text-[var(--secondary-text-color)]">
                  Know the collection methodology, sample size, margin of error, and any limitations. This context is
                  crucial for honest representation.
                </p>
              </div>
            </div>
          </div>

          <div className="glass-card p-6">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-[var(--accent-honey)] text-[var(--background-color)] flex items-center justify-center font-bold text-sm">
                3
              </div>
              <div>
                <h4 className="font-semibold mb-2">Choose Appropriate Representations</h4>
                <p className="text-[var(--secondary-text-color)]">
                  Select chart types and scales that accurately represent the data's true relationships and magnitudes.
                </p>
              </div>
            </div>
          </div>

          <div className="glass-card p-6">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-[var(--accent-honey)] text-[var(--background-color)] flex items-center justify-center font-bold text-sm">
                4
              </div>
              <div>
                <h4 className="font-semibold mb-2">Test for Misinterpretation</h4>
                <p className="text-[var(--secondary-text-color)]">
                  Show your visualization to others and ask what they see. Are they drawing the conclusions you
                  intended?
                </p>
              </div>
            </div>
          </div>
        </div>

        <CodeBlock
          code={`// Ethical data visualization checklist
const ethicalVizChecklist = {
  dataIntegrity: {
    sourcesCited: true,
    methodologyExplained: true,
    limitationsAcknowledged: true,
    uncertaintyQuantified: true
  },
  
  visualIntegrity: {
    appropriateScale: true,
    zeroBaseline: true, // when appropriate
    proportionalAreas: true,
    consistentUnits: true
  },
  
  accessibility: {
    colorblindFriendly: true,
    altTextProvided: true,
    keyboardNavigable: true,
    screenReaderCompatible: true
  },
  
  transparency: {
    rawDataAvailable: true,
    assumptionsStated: true,
    conflictsDisclosed: true,
    updateDateShown: true
  }
};

// Validate before publishing
function validateVisualization(viz) {
  return Object.values(ethicalVizChecklist)
    .every(category => 
      Object.values(category).every(check => check === true)
    );
}`}
          language="javascript"
          filename="ethical-viz-checklist.js"
        />

        <h3 id="case-studies" className="text-2xl font-semibold mb-4 mt-12">
          Real-World Examples
        </h3>

        <div className="space-y-8">
          <div className="glass-card p-8">
            <h4 className="text-xl font-semibold mb-4 text-green-600">✓ Ethical Example: COVID-19 Dashboards</h4>
            <p className="text-[var(--secondary-text-color)] mb-4">
              The best COVID-19 dashboards provided context, acknowledged uncertainty, and updated data sources
              regularly. They helped inform public health decisions without sensationalizing.
            </p>
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
              <h5 className="font-medium mb-2">What Made Them Ethical:</h5>
              <ul className="text-sm space-y-1">
                <li>• Clear data sources and update frequencies</li>
                <li>• Confidence intervals shown where appropriate</li>
                <li>• Multiple perspectives (per capita, absolute numbers)</li>
                <li>• Accessible design for diverse audiences</li>
              </ul>
            </div>
          </div>

          <div className="glass-card p-8">
            <h4 className="text-xl font-semibold mb-4 text-red-600">✗ Problematic Example: Misleading Election Maps</h4>
            <p className="text-[var(--secondary-text-color)] mb-4">
              Election maps that show geographic area without accounting for population density can severely distort
              perceptions of electoral support.
            </p>
            <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
              <h5 className="font-medium mb-2">The Problems:</h5>
              <ul className="text-sm space-y-1">
                <li>• Geographic bias (rural areas appear overrepresented)</li>
                <li>• Missing population context</li>
                <li>• Binary color coding ignores vote margins</li>
                <li>• Can reinforce political polarization</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="conclusion">
        <h2 className="text-3xl font-bold mb-6">Moving Forward Responsibly</h2>

        <p>
          The future of data visualization lies not just in more sophisticated techniques or prettier charts, but in a
          deeper commitment to ethical practice. As data becomes more central to decision-making at every level of
          society, our responsibility as visualizers grows.
        </p>

        <Blockquote author="Edward Tufte" source="The Visual Display of Quantitative Information">
          Excellence in statistical graphics consists of complex ideas communicated with clarity, precision, and
          efficiency.
        </Blockquote>

        <p>
          This excellence isn't just technical—it's moral. It requires us to be honest brokers of information, to
          respect our audience's intelligence, and to acknowledge the power we wield when we transform data into
          understanding.
        </p>

        <CalloutBox type="action" title="Your Ethical Commitment">
          Consider creating your own ethical guidelines for data visualization. What principles will guide your work?
          How will you ensure your visualizations serve truth rather than agenda?
        </CalloutBox>

        <div className="bg-[var(--accent-honey)]/5 rounded-lg p-8 mt-8">
          <h3 className="text-xl font-semibold mb-4">The Ethical Visualizer's Pledge</h3>
          <div className="space-y-3 text-[var(--secondary-text-color)]">
            <p>• I will represent data honestly and without distortion</p>
            <p>• I will provide context necessary for accurate interpretation</p>
            <p>• I will acknowledge limitations and uncertainties</p>
            <p>• I will design for accessibility and inclusion</p>
            <p>• I will be transparent about my methods and sources</p>
            <p>• I will consider the broader impact of my visualizations</p>
          </div>
        </div>
      </section>
    </div>
  )
}
