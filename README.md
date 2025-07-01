# KAZE KEZA Portfolio

A modern, minimalist portfolio showcasing data storytelling and creative technology work. Built with Next.js, featuring custom p5.js animations and a focus on sustainable web development.

## ✨ Features

- **Custom Loading Animation**: p5.js-powered circular animation with theme adaptation
- **Dynamic Backgrounds**: Spiral background animation for immersive experiences
- **Hero Animation**: Custom p5.js hero background for the homepage
- **Glass Morphism UI**: Modern glass-effect components with subtle interactions
- **Dark/Light Theme**: Seamless theme switching with system preference detection
- **Responsive Design**: Mobile-first approach with smooth animations
- **Performance Optimized**: Lazy loading, dynamic imports, and optimized animations
- **Accessibility**: WCAG compliant with proper focus management and screen reader support

## 🚀 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS with custom CSS variables
- **Animations**: Framer Motion + custom p5.js canvas animations
- **UI Components**: Radix UI primitives with custom styling
- **Typography**: Inter (primary) + JetBrains Mono (code)
- **Icons**: Lucide React
- **Analytics**: Vercel Analytics & Speed Insights

## 🎨 Design Philosophy

Following Dieter Rams' principle of "Weniger, aber besser" (Less, but better):

- **Clean like code**: Minimal, purposeful design
- **Vibrant like nature**: Honey accent color (#EBA937) with organic animations
- **Inspired like art**: Creative p5.js backgrounds and micro-interactions

## 🛠️ Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
├── app/                    # Next.js app directory
│   ├── about/             # About page
│   ├── blog/              # Blog pages
│   ├── contact/           # Contact page
│   ├── data-viz/          # Data visualization showcase
│   ├── projects/          # Projects showcase
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── animations/        # p5.js and motion components
│   ├── blog/              # Blog-specific components
│   ├── contact/           # Contact form components
│   ├── data-viz/          # Chart components
│   ├── layout/            # Layout components
│   ├── seo/               # SEO components
│   └── ui/                # Reusable UI components
├── lib/                   # Utilities and configurations
│   ├── accessibility.ts  # Accessibility utilities
│   ├── seo.ts            # SEO configuration
│   ├── theme-provider.tsx # Theme management
│   └── utils.ts          # General utilities
└── styles/               # Global styles
```

## 🎯 Key Components

### Loading Animation
Custom p5.js loader with circular patterns that adapt to the current theme.

### Spiral Background
Organic, noise-based spiral animation that creates depth without distraction.

### Hero Animation
Geometric pattern animation specifically designed for the homepage hero section.

### Glass Cards
Modern glass morphism effects with subtle hover interactions and magnetic cursor following.

## 🌍 Performance & Sustainability

- **Optimized Animations**: 30fps cap for better performance
- **Dynamic Imports**: Lazy loading of heavy components
- **Reduced Motion Support**: Respects user preferences
- **Efficient Rendering**: Canvas-based animations with proper cleanup
- **Minimal Bundle Size**: Tree-shaking and code splitting

## 📱 Responsive Design

- **Mobile-first**: Designed for mobile, enhanced for desktop
- **Touch-friendly**: 44px minimum touch targets
- **Adaptive Layouts**: Fluid grids and flexible typography
- **Performance**: Optimized for all device types

## ♿ Accessibility

- **WCAG 2.1 AA Compliant**: High contrast ratios and proper focus management
- **Screen Reader Support**: Semantic HTML and ARIA labels
- **Keyboard Navigation**: Full keyboard accessibility
- **Reduced Motion**: Respects user motion preferences

## 🚀 Deployment

Optimized for Vercel deployment with:
- Automatic builds on push
- Edge functions support
- Analytics integration
- Performance monitoring

## 📄 License

This project is licensed under the Creative Commons CC0 1.0 Universal License - see the [LICENSE](LICENSE) file for details.

---

Built with ❤️ by KAZE KEZA