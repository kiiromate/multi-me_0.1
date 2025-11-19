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

### Initial Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Configure Sanity CMS**
   
   This portfolio uses Sanity CMS for content management. Follow these steps:
   
   - Create a Sanity project at https://sanity.io/manage
   - Copy your Project ID
   - Update `.env.local` with your credentials (see `SANITY_ENV_SETUP.md` for detailed instructions)
   
   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_SITE_URL=https://kazekeza.com
   ```

3. **Test Sanity connection**
   ```bash
   npm run test:sanity
   ```

### Development Commands

```bash
# Start development server
npm run dev

# Access Sanity Studio
# Navigate to http://localhost:3000/studio

# Build for production
npm run build

# Start production server
npm start

# Test Sanity connection
npm run test:sanity
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

This portfolio is deployed on **Netlify** at [https://kazekeza.com](https://kazekeza.com)

### Quick Deploy

1. **Connect to Netlify**
   - Sign up at [netlify.com](https://www.netlify.com/)
   - Connect your GitHub repository
   - Build settings are configured in `netlify.toml`

2. **Set Environment Variables**
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_SITE_URL=https://kazekeza.com
   ```

3. **Deploy**
   - Push to main branch for automatic deployment
   - Or trigger manual deploy in Netlify dashboard

### Deployment Resources

- 📋 **Overview**: See [DEPLOYMENT_SUMMARY.md](./DEPLOYMENT_SUMMARY.md) for deployment overview
- 📖 **Full Guide**: See [DEPLOYMENT.md](./DEPLOYMENT.md) for complete step-by-step instructions
- ⚡ **Quick Start**: See [.netlify-deploy-quick-start.md](./.netlify-deploy-quick-start.md) for rapid deployment
- ✅ **Checklist**: Use [.deployment-checklist.md](./.deployment-checklist.md) to verify readiness

### Verify Deployment

After deploying, run the verification script:

```bash
npm run verify:deployment
```

This checks:
- All pages are accessible
- HTTPS is configured correctly
- Content loads from Sanity
- No critical errors

### Continuous Deployment

- **Automatic**: Push to main branch triggers deployment
- **Preview**: Pull requests get preview deployments
- **Rollback**: Instant rollback to previous versions in Netlify dashboard

## 📚 Documentation

- [Content Creation Guide](./CONTENT_GUIDE.md): How to manage projects and blog posts.
- [Deployment Guide](./DEPLOYMENT.md): Detailed deployment instructions.

## 📄 License

This project is licensed under the Creative Commons CC0 1.0 Universal License - see the [LICENSE](LICENSE) file for details.

---

Built with ❤️ by KAZE KEZA