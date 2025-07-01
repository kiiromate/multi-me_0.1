import { BlogPostLayout } from "./blog-post-layout"
import { CodeBlock } from "./code-block"
import { Blockquote } from "./blockquote"
import { BlogImage } from "./blog-image"
import { MarginNote } from "./margin-note"

export default function BlogPostDemo() {
  const sampleCode = `// Building complexity from simple systems
const buildPortfolio = (requirements) => {
  const phases = [
    'foundation',
    'visuals', 
    'content',
    'optimization'
  ];
  
  return phases.reduce((project, phase) => {
    return project.implement(phase);
  }, new Project(requirements));
};

// One sock at a time approach
const cleanRoom = (messyRoom) => {
  return messyRoom
    .filter(item => item.type === 'sock')
    .forEach(sock => sock.organize());
};`

  return (
    <BlogPostLayout
      title="What Building My Portfolio Taught Me About Systems Thinking"
      excerpt="I thought I was just making a website. Turns out, I was designing my own decision-making blueprint."
      heroImage="/placeholder.svg?height=600&width=1200"
      publishedAt="2024-01-15"
      readTime="8 min read"
      author={{
        name: "Kaze Keza",
        avatar: "/placeholder.svg?height=40&width=40",
      }}
    >
      <div className="space-y-8">
        <p className="text-xl font-medium text-text-primary italic">
          Building my portfolio started as a "simple" coding project. But between perfecting CSS animations and debating
          color palettes, I accidentally enrolled in a masterclass on <strong>systems thinking</strong>. Here's what I
          learned:
        </p>

        <hr className="border-text-secondary/20 my-12" />

        <section className="relative">
          <h2 className="font-inter font-semibold text-3xl text-text-primary mb-6">
            1. Complexity is just a bunch of simple things stacked together
          </h2>

          <MarginNote
            note="This insight came from struggling with my initial overwhelming checklist. Breaking it down into phases made everything manageable."
            title="Personal Reflection"
          />

          <Blockquote author="Me, probably">Like cleaning a messy room by starting with one sock.</Blockquote>

          <p>
            My initial checklist was overwhelming: animations, CMS integration, SEO, performance targets. It felt like
            solving a Rubik's Cube while juggling. Then I remembered:{" "}
            <strong>break chaos into bite-sized systems</strong>.
          </p>

          <p>I split the project into phases (shoutout to my PRD roadmap):</p>

          <ol className="list-decimal list-inside space-y-2 ml-4">
            <li>
              <strong>Foundation</strong>: Next.js setup, Sanity.io integration, basic pages.
            </li>
            <li>
              <strong>Visuals</strong>: GSAP animations, P5.js generative art.
            </li>
            <li>
              <strong>Content</strong>: Blog templates, data visualizations.
            </li>
            <li>
              <strong>Optimization</strong>: Performance tweaks, accessibility fixes.
            </li>
          </ol>

          <Blockquote>
            Complexity isn't the enemy—<em>disorganization</em> is. Whether coding or planning a wedding, start small.
            One sock at a time.
          </Blockquote>
        </section>

        <section className="relative">
          <h2 className="font-inter font-semibold text-3xl text-text-primary mb-6">
            2. Feedback loops are your friend
          </h2>

          <MarginNote
            note="Performance optimization became a recurring theme. Every 'delightful' feature needed to be balanced against functionality."
            title="Technical Note"
          />

          <Blockquote>Why did that animation make my laptop sound like a jet engine?</Blockquote>

          <p>
            Early on, I built a slick theme-switching animation. It looked <em>chef's kiss</em>… until performance
            metrics tanked. My Lighthouse score plummeted. Lesson learned:{" "}
            <strong>"delightful" and "functional" aren't always friends</strong>.
          </p>

          <p>I iterated:</p>

          <CodeBlock
            code={`// Performance optimization iterations
const optimizeAnimation = () => {
  // Added reduced motion fallbacks
  if (prefersReducedMotion()) {
    return simpleTransition();
  }
  
  // Offloaded to Web Workers
  const worker = new Worker('animation-worker.js');
  worker.postMessage({ type: 'ANIMATE', data: themeData });
  
  // Ruthlessly optimized CSS
  return {
    willChange: 'transform',
    transform: 'translateZ(0)', // Hardware acceleration
    transition: 'transform 0.3s ease-out'
  };
};`}
            language="javascript"
            filename="theme-animation.js"
          />

          <Blockquote>
            Systems thinking isn't about perfection—it's about creating processes that let you <em>learn as you go</em>.
          </Blockquote>
        </section>

        <section>
          <h2 className="font-inter font-semibold text-3xl text-text-primary mb-6">
            3. Style without purpose is just noise
          </h2>

          <Blockquote>That animation isn't just pretty—it's a silent salesperson.</Blockquote>

          <p>
            Every design choice had a <em>why</em>:
          </p>

          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>
              <strong>Dual light/dark theme</strong>: Demonstrates responsive coding skills.
            </li>
            <li>
              <strong>Magnetic buttons</strong>: Guides attention without arrows.
            </li>
            <li>
              <strong>Generative art backgrounds</strong>: Showcases creativity <em>and</em> technical chops.
            </li>
          </ul>

          <BlogImage
            src="/placeholder.svg?height=400&width=800"
            alt="Portfolio design system showcase"
            caption="Every element serves both aesthetic and functional purposes"
          />

          <Blockquote>
            Form follows function. Whether designing a website or a presentation, ask:{" "}
            <em>What's this element doing?</em>
          </Blockquote>
        </section>

        <section className="relative">
          <h2 className="font-inter font-semibold text-3xl text-text-primary mb-6">4. Everything connects</h2>

          <MarginNote
            note="This interconnectedness became apparent when changing one component affected three others. True systems thinking in action."
            title="Systems Insight"
          />

          <Blockquote>Turns out, CSS and bee conservation have a lot in common.</Blockquote>

          <p>Building this portfolio wasn't just a tech challenge—it was a puzzle of disciplines:</p>

          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Writing blog content influenced SEO and Sanity.io schemas.</li>
            <li>Designing animations impacted performance budgets and frontend optimization.</li>
            <li>Data visualizations required merging design and code.</li>
          </ul>

          <Blockquote>
            Skills are transferable. Code, design, storytelling—they're different languages, but they all solve problems
            holistically.
          </Blockquote>
        </section>

        <section className="bg-accent-honey/5 rounded-xl p-8 border border-accent-honey/20">
          <h2 className="font-inter font-semibold text-3xl text-text-primary mb-6">
            Closing: Systems Thinking is a Life Skill
          </h2>

          <p>
            Building this website taught me that systems thinking isn't a buzzword—it's how I naturally operate. It's
            why I can code a React component <em>and</em> write a blog post <em>and</em> explain my process over coffee.
          </p>

          <p>
            Next time you're overwhelmed by a project, remember: <strong>Trust the process</strong>. Embrace feedback
            loops. And know that even the smallest detail (like a well-placed CSS transition) can ripple into something
            bigger.
          </p>

          <p>
            After all, life's just one big system of interconnected "socks." And hey—if all else fails, there's always
            coffee. ☕
          </p>
        </section>

        <footer className="text-center py-8 border-t border-text-secondary/20">
          <p className="font-system text-text-secondary">
            <strong>P.S.</strong> Want to see the final product? Swing by{" "}
            <a href="#" className="text-accent-honey hover:underline">
              Portfolio Link
            </a>{" "}
            and say hi!
          </p>
        </footer>
      </div>
    </BlogPostLayout>
  )
}
