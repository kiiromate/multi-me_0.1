---
description: When to use it: When you need a new visual element on the site (a new type of showcase card, a contact form, a specific layout block) but want to guarantee it matches your exact aesthetic.
---

# Task: Create a New UI Component
I need a new React component for [describe the component, e.g., a newsletter signup block or a new project gallery layout].

# Constraints
1. STRICT DESIGN LOCK: You must use the existing glassmorphism design system. Use standard Tailwind classes and our CSS variables (like `.glass-card`). Do not invent new arbitrary color values.
2. Responsive First: Ensure it stacks correctly on mobile and expands gracefully on desktop.
3. Next.js 15: Create this as a Server Component by default. Only use 'use client' if it specifically requires user interaction or Framer Motion.

Please analyze `app/globals.css` to remind yourself of our design tokens, then output the component code.