import { Header } from "./header"

export default function HeaderDemo() {
  return (
    <div className="min-h-screen bg-bg-primary">
      <Header />

      {/* Demo content to show sticky behavior */}
      <main className="max-w-4xl mx-auto px-6 py-16 space-y-16">
        <section className="space-y-8">
          <h1 className="font-inter font-bold text-6xl text-text-primary tracking-tighter">
            Sticky Header
            <br />
            <span className="text-accent-honey">Demo</span>
          </h1>
          <p className="font-manrope text-xl text-text-secondary max-w-2xl">
            Scroll down to see the header's glass morphism effect and sticky behavior in action. The backdrop blur
            intensifies as you scroll, creating visual separation from the content.
          </p>
        </section>

        {/* Content sections to demonstrate scrolling */}
        {Array.from({ length: 8 }, (_, i) => (
          <section key={i} className="space-y-6">
            <h2 className="font-inter font-semibold text-3xl text-text-primary">Section {i + 1}</h2>
            <div className="space-y-4">
              <p className="font-manrope text-base text-text-primary">
                This is a demonstration of the sticky header behavior. As you scroll through this content, notice how
                the header maintains its position at the top of the viewport while the backdrop blur effect creates
                visual separation from the scrolling content below.
              </p>
              <p className="font-manrope text-base text-text-primary">
                The navigation links feature smooth hover transitions and active states with animated underlines that
                expand from the center outwards. The mobile hamburger menu transforms smoothly between states, following
                modern interaction patterns.
              </p>
              <p className="font-manrope text-base text-text-secondary">
                The design follows Dieter Rams' principles of good design: it's innovative, useful, aesthetic,
                understandable, unobtrusive, honest, long-lasting, thorough, environmentally friendly, and involves as
                little design as possible.
              </p>
            </div>
          </section>
        ))}

        {/* Call to action section */}
        <section className="text-center space-y-6 py-16">
          <h2 className="font-inter font-semibold text-4xl text-text-primary">Ready to explore?</h2>
          <p className="font-manrope text-lg text-text-secondary max-w-2xl mx-auto">
            Navigate through the different sections using the header navigation to see the active states and smooth
            transitions in action.
          </p>
          <div className="flex gap-4 justify-center pt-4">
            <button className="bg-accent-honey text-bg-primary font-inter font-medium px-8 py-3 rounded-lg hover-accent transition-all duration-200">
              View Projects
            </button>
            <button className="border border-text-secondary text-text-primary hover:border-accent-honey hover:text-accent-honey font-inter font-medium px-8 py-3 rounded-lg transition-all duration-200">
              Read Blog
            </button>
          </div>
        </section>
      </main>
    </div>
  )
}
