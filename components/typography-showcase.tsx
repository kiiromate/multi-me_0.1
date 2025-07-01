import { Button } from "@/components/ui/button"

export default function TypographyShowcase() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 space-y-16">
      {/* Hero Section */}
      <section className="space-y-8 text-center">
        <h1 className="font-inter font-bold text-6xl md:text-6xl lg:text-6xl text-text-primary tracking-tighter text-balance">
          Thoughtful Design,
          <br />
          <span className="text-accent-honey">Precise Execution</span>
        </h1>
        <p className="font-system text-xl text-text-secondary max-w-2xl mx-auto text-balance">
          Clean like code, vibrant like nature, inspired like art. A design system crafted for human connection and
          innovative expression.
        </p>
        <div className="flex gap-4 justify-center pt-4">
          <Button className="bg-accent-honey hover:bg-accent-honey text-bg-primary font-inter font-medium px-8 py-3 rounded-lg hover-accent transition-all duration-200">
            Explore Work
          </Button>
          <Button
            variant="outline"
            className="border-text-secondary text-text-primary hover:border-accent-honey hover:text-accent-honey font-inter font-medium px-8 py-3 rounded-lg transition-all duration-200"
          >
            Get in Touch
          </Button>
        </div>
      </section>

      {/* Typography Hierarchy */}
      <section className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="font-inter font-semibold text-3xl text-text-primary">Typography Hierarchy</h2>
          <p className="text-text-secondary">Modular scale with 1.25 ratio (Major Third)</p>
        </div>

        <div className="grid gap-8">
          {/* Headings */}
          <div className="space-y-6">
            <h1 className="font-inter font-bold text-6xl text-text-primary tracking-tighter">
              H1 - Display Heading
              <span className="block text-sm font-system font-normal text-text-secondary mt-2">
                4.768rem / 76.3px • Inter Bold • -0.02em tracking
              </span>
            </h1>

            <h2 className="font-inter font-semibold text-5xl text-text-primary tracking-tight">
              H2 - Section Heading
              <span className="block text-sm font-system font-normal text-text-secondary mt-2">
                3.815rem / 61px • Inter Semibold • -0.01em tracking
              </span>
            </h2>

            <h3 className="font-inter font-semibold text-4xl text-text-primary">
              H3 - Subsection Heading
              <span className="block text-sm font-system font-normal text-text-secondary mt-2">
                3.052rem / 48.8px • Inter Semibold
              </span>
            </h3>

            <h4 className="font-inter font-medium text-3xl text-text-primary">
              H4 - Article Heading
              <span className="block text-sm font-system font-normal text-text-secondary mt-2">
                2.441rem / 39px • Inter Medium
              </span>
            </h4>

            <h5 className="font-inter font-medium text-2xl text-text-primary">
              H5 - Card Heading
              <span className="block text-sm font-system font-normal text-text-secondary mt-2">
                1.953rem / 31.25px • Inter Medium
              </span>
            </h5>

            <h6 className="font-inter font-medium text-xl text-text-primary">
              H6 - Small Heading
              <span className="block text-sm font-system font-normal text-text-secondary mt-2">
                1.563rem / 25px • Inter Medium
              </span>
            </h6>
          </div>

          {/* Body Text */}
          <div className="space-y-6 pt-8 border-t border-text-secondary/20">
            <h3 className="font-inter font-semibold text-2xl text-text-primary">Body Text</h3>

            <div className="space-y-4">
              <p className="font-system text-lg text-text-primary">
                <strong>Large Body Text (1.25rem)</strong> - Used for introductory paragraphs and important content.
                This size provides excellent readability while maintaining visual hierarchy.
              </p>

              <p className="font-system text-base text-text-primary">
                <strong>Regular Body Text (1rem)</strong> - The foundation of our typography system. With a line-height
                of 1.7, this ensures comfortable reading across all devices. Generous paragraph spacing creates visual
                breathing room that reflects our ambient aesthetic.
              </p>

              <p className="font-system text-sm text-text-secondary">
                <strong>Small Text (0.8rem)</strong> - Perfect for captions, metadata, and secondary information.
                Maintains readability while clearly establishing information hierarchy.
              </p>
            </div>
          </div>

          {/* Code and Monospace */}
          <div className="space-y-6 pt-8 border-t border-text-secondary/20">
            <h3 className="font-inter font-semibold text-2xl text-text-primary">Code & Monospace</h3>

            <div className="bg-text-primary/5 rounded-lg p-6 space-y-4">
              <code className="font-mono text-sm text-accent-honey block">
                const designSystem = {"{"}
                <br />
                &nbsp;&nbsp;typography: 'thoughtful',
                <br />
                &nbsp;&nbsp;spacing: 'generous',
                <br />
                &nbsp;&nbsp;aesthetic: 'ambient'
                <br />
                {"}"};
              </code>

              <p className="font-system text-sm text-text-secondary">
                System monospace fonts provide excellent code readability with clear character distinction
              </p>
            </div>
          </div>

          {/* Interactive Elements */}
          <div className="space-y-6 pt-8 border-t border-text-secondary/20">
            <h3 className="font-inter font-semibold text-2xl text-text-primary">Interactive Elements</h3>

            <div className="flex flex-wrap gap-4">
              <button className="bg-accent-honey text-bg-primary font-inter font-medium px-6 py-3 rounded-lg hover-accent transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent-honey focus:ring-offset-2">
                Primary CTA
              </button>

              <button className="border border-text-secondary text-text-primary hover:border-accent-honey hover:text-accent-honey font-inter font-medium px-6 py-3 rounded-lg transition-all duration-200">
                Secondary Action
              </button>

              <a
                href="#"
                className="text-accent-honey hover-accent font-inter font-medium underline underline-offset-4 decoration-2 transition-all duration-200"
              >
                Text Link
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Color Palette */}
      <section className="space-y-8">
        <h2 className="font-inter font-semibold text-3xl text-text-primary text-center">Color System</h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="font-inter font-medium text-xl text-text-primary">Light Theme</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg" style={{ backgroundColor: "#F8F7F4" }}></div>
                <div>
                  <p className="font-mono text-sm text-text-primary">#F8F7F4</p>
                  <p className="font-system text-sm text-text-secondary">Background Primary</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg" style={{ backgroundColor: "#111827" }}></div>
                <div>
                  <p className="font-mono text-sm text-text-primary">#111827</p>
                  <p className="font-system text-sm text-text-secondary">Text Primary</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg" style={{ backgroundColor: "#6B7280" }}></div>
                <div>
                  <p className="font-mono text-sm text-text-primary">#6B7280</p>
                  <p className="font-system text-sm text-text-secondary">Text Secondary</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg" style={{ backgroundColor: "#EBA937" }}></div>
                <div>
                  <p className="font-mono text-sm text-text-primary">#EBA937</p>
                  <p className="font-system text-sm text-text-secondary">Accent Honey</p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-inter font-medium text-xl text-text-primary">Dark Theme</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-lg border border-text-secondary/20"
                  style={{ backgroundColor: "#0A0A0A" }}
                ></div>
                <div>
                  <p className="font-mono text-sm text-text-primary">#0A0A0A</p>
                  <p className="font-system text-sm text-text-secondary">Background Primary</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg" style={{ backgroundColor: "#E5E7EB" }}></div>
                <div>
                  <p className="font-mono text-sm text-text-primary">#E5E7EB</p>
                  <p className="font-system text-sm text-text-secondary">Text Primary</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg" style={{ backgroundColor: "#9CA3AF" }}></div>
                <div>
                  <p className="font-mono text-sm text-text-primary">#9CA3AF</p>
                  <p className="font-system text-sm text-text-secondary">Text Secondary</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg" style={{ backgroundColor: "#EBA937" }}></div>
                <div>
                  <p className="font-mono text-sm text-text-primary">#EBA937</p>
                  <p className="font-system text-sm text-text-secondary">Accent Honey</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Spacing System */}
      <section className="space-y-8">
        <h2 className="font-inter font-semibold text-3xl text-text-primary text-center">Generous Spacing</h2>
        <p className="text-text-secondary text-center max-w-2xl mx-auto">
          Thoughtful whitespace creates breathing room and reflects our ambient aesthetic. Each spacing decision is
          intentional and human-centered.
        </p>

        <div className="grid gap-6">
          {[
            { size: "4", rem: "1rem", px: "16px", use: "Tight spacing" },
            { size: "8", rem: "2rem", px: "32px", use: "Standard spacing" },
            { size: "12", rem: "3rem", px: "48px", use: "Section spacing" },
            { size: "16", rem: "4rem", px: "64px", use: "Large sections" },
            { size: "24", rem: "6rem", px: "96px", use: "Hero spacing" },
            { size: "32", rem: "8rem", px: "128px", use: "Page sections" },
          ].map((space) => (
            <div key={space.size} className="flex items-center gap-6">
              <div className="bg-accent-honey/20 rounded" style={{ width: space.rem, height: "1rem" }}></div>
              <div>
                <p className="font-mono text-sm text-text-primary">
                  {space.rem} / {space.px}
                </p>
                <p className="font-system text-sm text-text-secondary">{space.use}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
