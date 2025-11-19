# Content Scripts

This directory contains scripts and content files for populating the Sanity CMS with initial data.

## Files

### About Page Content

**about-content.json** - Complete about page content in JSON format

**ABOUT-CONTENT-GUIDE.md** - Step-by-step guide for adding about page content

**seed-about.ts** - TypeScript script for programmatically importing about content

### Data Visualization Project

**dataviz-project-content.json** - Complete data viz project content in JSON format

**DATA-VIZ-PROJECT-GUIDE.md** - Complete guide for creating the data viz project

**MANUAL-STUDIO-GUIDE.md** - Step-by-step manual creation in Sanity Studio

**seed-dataviz-project.ts** - TypeScript script for creating the data viz project

### Testing

**test-sanity-connection.ts** - Test Sanity connection and credentials

**test-sanity-connection.mjs** - JavaScript version of connection test

## Usage

### Quick Start (Manual Entry)

1. Start the dev server: `npm run dev`
2. Navigate to http://localhost:3000/studio
3. Follow the instructions in `MANUAL-STUDIO-GUIDE.md` for projects
4. Or follow `ABOUT-CONTENT-GUIDE.md` for about page

### Advanced (Programmatic Import)

1. Install dependencies: `npm install dotenv`
2. Get API token from https://sanity.io/manage
3. Add token to `.env.local`: `SANITY_API_TOKEN=your_token_here`
4. Run seed scripts:
   - About page: `npx tsx scripts/seed-about.ts`
   - Data viz project: `npx tsx scripts/seed-dataviz-project.ts`

## Content Overview

The about page content includes:
- Name: KAZE KEZA
- Professional Title: Data Storyteller × Creative Technologist × Multi-Me
- Bio: 4 paragraphs reflecting the Multi-Me concept
- Location: Remote
- Availability: Open to Opportunities
- Fun Fact: About 30fps animation philosophy
- Skills: 4 skill areas with descriptions and technologies
- Social Links: GitHub, LinkedIn, Twitter, Email, Website
- CTA Text: Contact section message

## Requirements Satisfied

- ✅ 3.1: Display "KAZE KEZA" instead of placeholder
- ✅ 3.2: Display authentic professional title
- ✅ 3.4: Display real profile information
- ✅ 6.3: Require name, professional title, and bio
- ✅ 6.5: Require alternative text for images

## Next Steps

After adding the content:
1. Upload a profile image in Sanity Studio
2. Verify content displays correctly at http://localhost:3000/about
3. Customize any content to match your personal voice
4. Test responsive design on mobile devices
