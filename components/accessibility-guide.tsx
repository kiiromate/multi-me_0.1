import { CheckCircle, AlertCircle, Info } from "lucide-react"

export default function AccessibilityGuide() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-16 space-y-12">
      <header className="text-center space-y-4">
        <h1 className="font-inter font-bold text-4xl text-text-primary">Accessibility Framework</h1>
        <p className="font-system text-lg text-text-secondary max-w-2xl mx-auto">
          Comprehensive accessibility patterns ensuring WCAG 2.1 AA compliance and inclusive user experiences.
        </p>
      </header>

      {/* Color Contrast Section */}
      <section className="space-y-6">
        <h2 className="font-inter font-semibold text-2xl text-text-primary flex items-center gap-2">
          <CheckCircle className="w-6 h-6 text-green-500" />
          Color Contrast Compliance
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-text-primary/5 rounded-lg p-6 border border-text-secondary/10">
            <h3 className="font-inter font-medium text-lg text-text-primary mb-4">Light Theme</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-system text-sm">Primary Text</span>
                <span className="font-mono text-sm text-green-600">13.5:1 (AAA)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-system text-sm">Secondary Text</span>
                <span className="font-mono text-sm text-green-600">4.8:1 (AA)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-system text-sm">Accent Honey</span>
                <span className="font-mono text-sm text-green-600">3.2:1 (AA Large)</span>
              </div>
            </div>
          </div>

          <div className="bg-text-primary/5 rounded-lg p-6 border border-text-secondary/10">
            <h3 className="font-inter font-medium text-lg text-text-primary mb-4">Dark Theme</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="font-system text-sm">Primary Text</span>
                <span className="font-mono text-sm text-green-600">15.2:1 (AAA)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-system text-sm">Secondary Text</span>
                <span className="font-mono text-sm text-green-600">7.1:1 (AAA)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-system text-sm">Accent Honey</span>
                <span className="font-mono text-sm text-green-600">4.1:1 (AA)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Focus States Section */}
      <section className="space-y-6">
        <h2 className="font-inter font-semibold text-2xl text-text-primary flex items-center gap-2">
          <Info className="w-6 h-6 text-blue-500" />
          Focus Management Patterns
        </h2>

        <div className="space-y-4">
          <div className="bg-text-primary/5 rounded-lg p-6 border border-text-secondary/10">
            <h3 className="font-inter font-medium text-lg text-text-primary mb-3">Interactive Elements</h3>
            <div className="flex flex-wrap gap-4">
              <button className="px-4 py-2 bg-accent-honey text-bg-primary rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-accent-honey focus:ring-offset-2 focus:ring-offset-bg-primary">
                Primary Button
              </button>
              <button className="px-4 py-2 border border-text-secondary text-text-primary rounded-lg font-medium hover:border-accent-honey hover:text-accent-honey focus:outline-none focus:ring-2 focus:ring-accent-honey focus:ring-offset-2 focus:ring-offset-bg-primary">
                Secondary Button
              </button>
              <a
                href="#"
                className="px-4 py-2 text-accent-honey underline underline-offset-2 rounded focus:outline-none focus:ring-2 focus:ring-accent-honey focus:ring-offset-2 focus:ring-offset-bg-primary"
              >
                Text Link
              </a>
            </div>
            <p className="font-system text-sm text-text-secondary mt-4">
              All interactive elements have visible focus indicators with 2px honey-colored rings and proper offset.
            </p>
          </div>
        </div>
      </section>

      {/* Reduced Motion Section */}
      <section className="space-y-6">
        <h2 className="font-inter font-semibold text-2xl text-text-primary flex items-center gap-2">
          <AlertCircle className="w-6 h-6 text-amber-500" />
          Reduced Motion Support
        </h2>

        <div className="bg-text-primary/5 rounded-lg p-6 border border-text-secondary/10">
          <h3 className="font-inter font-medium text-lg text-text-primary mb-3">Implementation Strategy</h3>
          <ul className="space-y-2 font-system text-text-secondary">
            <li className="flex items-start gap-2">
              <span className="text-accent-honey mt-1">•</span>
              <span>
                All animations respect{" "}
                <code className="font-mono bg-text-primary/10 px-1 rounded">prefers-reduced-motion</code> media query
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent-honey mt-1">•</span>
              <span>Static fallbacks maintain visual hierarchy and functionality</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent-honey mt-1">•</span>
              <span>Essential animations (loading states) use subtle alternatives</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent-honey mt-1">•</span>
              <span>Hover states remain functional without motion</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Touch Targets Section */}
      <section className="space-y-6">
        <h2 className="font-inter font-semibold text-2xl text-text-primary flex items-center gap-2">
          <CheckCircle className="w-6 h-6 text-green-500" />
          Touch Target Guidelines
        </h2>

        <div className="bg-text-primary/5 rounded-lg p-6 border border-text-secondary/10">
          <h3 className="font-inter font-medium text-lg text-text-primary mb-4">Minimum Size Requirements</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="w-11 h-11 bg-accent-honey/20 rounded-lg mx-auto mb-2 flex items-center justify-center">
                <span className="text-xs font-mono">44px</span>
              </div>
              <span className="font-system text-sm text-text-secondary">Minimum</span>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-accent-honey/30 rounded-lg mx-auto mb-2 flex items-center justify-center">
                <span className="text-xs font-mono">48px</span>
              </div>
              <span className="font-system text-sm text-text-secondary">Recommended</span>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 bg-accent-honey/40 rounded-lg mx-auto mb-2 flex items-center justify-center">
                <span className="text-xs font-mono">56px</span>
              </div>
              <span className="font-system text-sm text-text-secondary">Comfortable</span>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent-honey/50 rounded-lg mx-auto mb-2 flex items-center justify-center">
                <span className="text-xs font-mono">64px</span>
              </div>
              <span className="font-system text-sm text-text-secondary">Generous</span>
            </div>
          </div>
        </div>
      </section>

      {/* Screen Reader Section */}
      <section className="space-y-6">
        <h2 className="font-inter font-semibold text-2xl text-text-primary flex items-center gap-2">
          <Info className="w-6 h-6 text-blue-500" />
          Screen Reader Optimization
        </h2>

        <div className="space-y-4">
          <div className="bg-text-primary/5 rounded-lg p-6 border border-text-secondary/10">
            <h3 className="font-inter font-medium text-lg text-text-primary mb-3">Semantic HTML Structure</h3>
            <div className="font-mono text-sm text-text-secondary space-y-1">
              <div>&lt;header role="banner"&gt;</div>
              <div className="ml-4">&lt;nav role="navigation" aria-label="Main navigation"&gt;</div>
              <div>&lt;main id="main-content"&gt;</div>
              <div className="ml-4">&lt;article&gt;</div>
              <div className="ml-8">&lt;h1&gt;Page Title&lt;/h1&gt;</div>
              <div className="ml-8">&lt;section aria-labelledby="section-heading"&gt;</div>
              <div>&lt;footer role="contentinfo"&gt;</div>
            </div>
          </div>

          <div className="bg-text-primary/5 rounded-lg p-6 border border-text-secondary/10">
            <h3 className="font-inter font-medium text-lg text-text-primary mb-3">ARIA Patterns</h3>
            <ul className="space-y-2 font-system text-text-secondary">
              <li className="flex items-start gap-2">
                <span className="text-accent-honey mt-1">•</span>
                <span>
                  <code className="font-mono bg-text-primary/10 px-1 rounded">aria-label</code> for interactive elements
                  without visible text
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-honey mt-1">•</span>
                <span>
                  <code className="font-mono bg-text-primary/10 px-1 rounded">aria-expanded</code> for collapsible
                  content
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-honey mt-1">•</span>
                <span>
                  <code className="font-mono bg-text-primary/10 px-1 rounded">aria-current</code> for navigation states
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent-honey mt-1">•</span>
                <span>
                  <code className="font-mono bg-text-primary/10 px-1 rounded">aria-live</code> for dynamic content
                  updates
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
