# About Page Content Setup Guide

This guide will help you add the about page content to Sanity Studio.

## Content Overview

The about page content includes:
- ✅ Name: "KAZE KEZA"
- ✅ Professional Title: "Data Storyteller × Creative Technologist × Multi-Me"
- ✅ Bio: 4 authentic paragraphs reflecting the Multi-Me concept
- ✅ Location: "Remote"
- ✅ Availability: "Open to Opportunities"
- ✅ Fun Fact: About 30fps animation philosophy
- ✅ Skills: 4 skill areas with descriptions and technologies
- ✅ Social Links: GitHub, LinkedIn, Twitter, Email, Website
- ✅ CTA Text: Contact section message

## Option 1: Manual Entry in Sanity Studio (Recommended)

### Step 1: Start the Development Server

```bash
npm run dev
```

### Step 2: Access Sanity Studio

Navigate to: http://localhost:3000/studio

### Step 3: Create About Document

1. Click on "About" in the left sidebar
2. Click "Create new About document" (if one doesn't exist)
3. Fill in the fields using the content below

### Content to Copy-Paste:

**Name:**
```
KAZE KEZA
```

**Professional Title:**
```
Data Storyteller × Creative Technologist × Multi-Me
```

**Bio:** (Copy each paragraph separately)

Paragraph 1:
```
I'm KAZE KEZA, and I believe in the power of the "Multi-Me" — the idea that we're not just one thing, but a constellation of interests, skills, and perspectives. I'm a data storyteller who codes, a creative technologist who visualizes, and a builder who thinks in systems and narratives.
```

Paragraph 2:
```
My work sits at the intersection of data, design, and code. I transform complex information into compelling visual stories, build interactive experiences that make data accessible, and create tools that help others explore and understand their world. Whether it's through p5.js animations, React applications, or data visualizations, I'm always looking for ways to make the abstract tangible.
```

Paragraph 3:
```
I approach every project with curiosity and a commitment to craft. I believe in building in public, sharing the process, and creating work that's both functional and beautiful. My philosophy follows Dieter Rams' principle: "Weniger, aber besser" — Less, but better.
```

Paragraph 4:
```
When I'm not coding or visualizing data, you'll find me exploring new creative tools, reading about design systems, or experimenting with generative art. I'm always learning, always building, always evolving.
```

**Location:**
```
Remote
```

**Availability Status:**
Select: "Open to Opportunities"

**Fun Fact:**
```
I cap all my animations at 30fps for sustainability and performance — smooth enough to feel alive, efficient enough to respect your battery.
```

**Profile Image:**
- Click "Upload" and select your profile photo
- Add Alt Text: "KAZE KEZA profile photo" (or customize)

**Skills:** (Add 4 skill objects)

Skill 1:
- Skill Area: `Data Visualization & Storytelling`
- Description: `Transforming complex datasets into clear, compelling visual narratives that drive understanding and action.`
- Technologies: `D3.js`, `Recharts`, `Observable`, `Python (Pandas, Matplotlib)`, `Tableau`, `p5.js`

Skill 2:
- Skill Area: `Frontend Development`
- Description: `Building performant, accessible web applications with modern frameworks and best practices.`
- Technologies: `React`, `Next.js`, `TypeScript`, `Tailwind CSS`, `Framer Motion`, `Radix UI`

Skill 3:
- Skill Area: `Creative Coding & Animation`
- Description: `Creating generative art, interactive experiences, and custom animations that bring interfaces to life.`
- Technologies: `p5.js`, `Canvas API`, `WebGL`, `Three.js`, `Framer Motion`, `GSAP`

Skill 4:
- Skill Area: `Content Management & APIs`
- Description: `Architecting flexible content systems and integrating with modern headless CMS platforms.`
- Technologies: `Sanity CMS`, `Contentful`, `GraphQL`, `REST APIs`, `GROQ`

**Social Links:**
- GitHub: `https://github.com/kazekeza`
- LinkedIn: `https://linkedin.com/in/kazekeza`
- Twitter/X: `https://twitter.com/kazekeza`
- Email: `hello@kazekeza.com`
- Website: `https://kazekeza.com`

**Call to Action Text:**
```
I'm currently open to opportunities in data visualization, creative technology, and frontend development. Whether you're looking to collaborate on a project, need help telling your data story, or just want to chat about the intersection of code and creativity — let's connect.
```

### Step 4: Publish

Click the "Publish" button in the bottom right corner.

## Option 2: Programmatic Import (Advanced)

If you prefer to import the content programmatically:

### Step 1: Install Dependencies

```bash
npm install dotenv
```

### Step 2: Get Sanity API Token

1. Go to https://sanity.io/manage
2. Select your project
3. Go to "API" → "Tokens"
4. Create a new token with "Editor" permissions
5. Copy the token

### Step 3: Add Token to .env.local

```bash
SANITY_API_TOKEN=your_token_here
```

### Step 4: Run the Seed Script

```bash
npx tsx scripts/seed-about.ts
```

## Verification

After adding the content:

1. Visit http://localhost:3000/about
2. Verify all content displays correctly
3. Check that the profile image loads
4. Test all social links
5. Verify responsive design on mobile

## Customization

Feel free to customize any of the content to match your personal voice:
- Adjust the bio paragraphs
- Update skills and technologies
- Change social links to your actual profiles
- Modify the CTA text
- Update location and availability

## Next Steps

After completing this task:
- The about page will display authentic content
- All placeholder text will be replaced
- The Multi-Me concept will be reflected in the professional title
- Visitors will see your real profile and skills

## Requirements Satisfied

This content satisfies the following requirements:
- ✅ 3.1: Display "KAZE KEZA" instead of placeholder
- ✅ 3.2: Display authentic professional title
- ✅ 3.4: Display real profile information
- ✅ 6.3: Require name, professional title, and bio
- ✅ 6.4: Automatically generate URL-safe slugs (N/A for about)
- ✅ 6.5: Require alternative text for images
