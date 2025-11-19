# Creative Coding Project Content Guide

This guide will help you create the third featured project in Sanity Studio.

## Access Sanity Studio

1. Navigate to http://localhost:3000/studio
2. Click on "Projects" in the sidebar
3. Click "Create new document" or the "+" button
4. Select "Project" as the document type

## Project Content

### Basic Information

**Title:**
```
Organic Motion: p5.js Animation System
```

**Slug:** (will auto-generate, but verify it's)
```
organic-motion-p5js
```

**Description:**
```
A collection of custom p5.js animations exploring organic movement and generative patterns. Built for the Multi-Me portfolio, these animations demonstrate the intersection of code and art through particle systems, spiral geometries, and fluid motion.
```

### Rich Text Content

Copy and paste this into the Content field:

```
The animation system features three core components that bring life to the portfolio interface.

## Spiral Background Animation

A mesmerizing spiral pattern that responds to user interaction, creating depth through layered geometric forms. The spiral uses polar coordinates and sine waves to generate organic, breathing motion at 30fps for optimal performance.

The mathematical beauty lies in the simplicity: each point follows a spiral path defined by angle and radius, with subtle variations creating the illusion of depth and movement.

## Hero Particle System

An interactive particle field where hundreds of particles flow and respond to mouse movement. Each particle follows physics-based motion with attraction/repulsion forces, creating an ever-evolving canvas that never repeats.

The system demonstrates emergent behavior - simple rules for individual particles create complex, organic patterns at the macro level. It's a digital ecosystem that feels alive.

## Loading Animation

A minimalist loading experience using rotating geometric shapes that pulse and fade. The animation provides visual feedback while maintaining the portfolio's clean aesthetic.

Even in moments of waiting, the experience should be delightful and purposeful.

## Technical Approach

- **Performance-optimized** with 30fps cap for smooth motion without battery drain
- **Reduced motion support** for accessibility - respects user preferences
- **Dynamic imports** to minimize bundle size and improve load times
- **Canvas-based rendering** with requestAnimationFrame for efficient drawing
- **Responsive sizing** adapts to all viewports from mobile to 4K displays

## Artistic Philosophy

These animations embody the "less, but better" design principle - each motion is purposeful, subtle, and enhances rather than distracts from the content. The organic quality reflects the human element in technology.

The goal isn't to show off technical prowess, but to create moments of delight that make the portfolio feel more human, more alive. Technology in service of experience.

## Code Architecture

The animations are built as React components with p5.js in instance mode, allowing multiple sketches to coexist on the same page. Each animation is lazy-loaded to prevent blocking the initial page render.

```typescript
// Example: Particle class structure
class Particle {
  position: Vector
  velocity: Vector
  acceleration: Vector
  
  update() {
    // Physics simulation
  }
  
  display() {
    // Canvas rendering
  }
}
```

The modular approach makes it easy to add new animations or modify existing ones without affecting the rest of the system.
```

### Metadata

**Tags:** (Add these tags)
- p5.js
- Generative Art
- Creative Coding
- Animation
- JavaScript
- Canvas
- Interactive
- TypeScript

**Status:** 
- Select: `live`

**Year:**
```
2024
```

**Featured:**
- Toggle ON (check the box)

**Order:** (optional)
```
3
```

### Links

**Live URL:**
```
https://kazekeza.com
```

**GitHub URL:**
```
https://github.com/kazekeza/multi-me
```
(Replace with your actual GitHub username/repository)

### Images

**Main Image:**
You'll need to capture a screenshot of one of the animations. Here's how:

1. Open http://localhost:3000 in your browser
2. Wait for the hero animation to load
3. Take a screenshot (Windows: Win + Shift + S, Mac: Cmd + Shift + 4)
4. Crop to show just the animation canvas
5. Save as `p5js-hero-animation.png`
6. Upload in Sanity Studio under "Main Image"
7. Add alt text: "Interactive particle system with flowing organic motion"

**Gallery Images:** (optional but recommended)
1. Screenshot of spiral background animation
   - Alt text: "Spiral geometric pattern with layered depth"
2. Screenshot of loading animation
   - Alt text: "Minimalist rotating geometric loading animation"
3. Code snippet screenshot from components/animations/
   - Alt text: "TypeScript code showing particle physics implementation"

### Tips for Screenshots

- Use a dark theme for consistency
- Capture at a moment when the animation looks dynamic
- Ensure good contrast and clarity
- Consider using a screen recording tool and extracting a frame
- Recommended size: 1200x800px or similar 3:2 ratio

## Publishing

1. Review all fields to ensure they're filled correctly
2. Click "Publish" button in the bottom bar
3. Verify the project appears in the projects list
4. Check that it's marked as featured (star icon should be visible)

## Verification

After publishing, verify the project appears on your portfolio:

1. Navigate to http://localhost:3000/projects
2. The project should appear in the featured section
3. Click on the project to view the detail page
4. Verify all content renders correctly
5. Check that images load properly
6. Verify links work correctly

## Notes

- This project is meta - it documents the very animations used in the portfolio itself
- It demonstrates your ability to create both functional and artistic code
- The technical details show depth of knowledge in performance optimization
- The artistic philosophy shows thoughtful approach to design
- Perfect example of the "Multi-Me" concept: developer + designer + artist

## Alternative Project Ideas

If you prefer to showcase a different creative coding project, consider:

1. **Generative Art Gallery** - A collection of algorithmic art pieces
2. **Interactive Data Sculpture** - 3D visualization using three.js
3. **Audio Visualizer** - Real-time music visualization with Web Audio API
4. **Cellular Automata** - Conway's Game of Life or similar simulation
5. **Fractal Explorer** - Interactive Mandelbrot or Julia set renderer

Choose whichever best represents your creative coding work!
