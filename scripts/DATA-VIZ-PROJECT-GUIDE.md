# Data Visualization Project Creation Guide

This guide will help you create the second featured project in Sanity Studio.

## Prerequisites

Before running the seed script, you need to:

### 1. Get Your Sanity API Token

1. Go to https://sanity.io/manage
2. Select your project
3. Navigate to **API** → **Tokens**
4. Click **Add API Token**
5. Name it: `Portfolio Seed Script`
6. Permissions: **Editor** (or **Administrator**)
7. Copy the token

### 2. Update .env.local

Add the token to your `.env.local` file:

```bash
# Sanity CMS Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_actual_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token_here

# Site Configuration
NEXT_PUBLIC_SITE_URL=https://kazekeza.com
```

## Running the Seed Script

Once your environment is configured:

```bash
npx tsx scripts/seed-dataviz-project.ts
```

This will create the **Interactive Data Visualization Dashboard** project with:
- ✅ Title and description
- ✅ Rich text content describing all chart types
- ✅ Tags: Data Visualization, React, TypeScript, Recharts, Accessibility, Interactive Design
- ✅ Status: Live
- ✅ Year: 2024
- ✅ Featured: Yes
- ✅ Order: 2
- ✅ Live URL: https://kazekeza.com/data-viz

## Adding Images (Manual Step)

After running the seed script, you need to add images in Sanity Studio:

### 1. Capture Screenshots

Visit http://localhost:3000/data-viz and take screenshots:

**For Main Image:**
- Full page screenshot showing the header and first few charts
- Recommended size: 1200x800px or larger
- Format: PNG or JPG

**For Gallery (Optional):**
- Screenshot of Line Chart (Website Traffic Growth)
- Screenshot of Bar Charts (Technology Proficiency & Project Distribution)
- Screenshot of Scatter Plot (Performance Analysis)
- Screenshot of Heatmap (Activity Patterns)

### 2. Upload in Studio

1. Go to http://localhost:3000/studio
2. Navigate to **Projects**
3. Find **Interactive Data Visualization Dashboard**
4. Click to edit

**Main Image:**
- Click on the **Main Image** field
- Upload your full page screenshot
- Add alt text: `Interactive data visualization dashboard showing multiple chart types including line charts, bar charts, pie charts, scatter plots, and heatmaps`

**Gallery (Optional):**
- Click **Add item** in the Gallery section
- Upload each chart screenshot
- Add descriptive alt text for each:
  - `Line chart showing website traffic growth over 12 months`
  - `Horizontal bar chart displaying technology proficiency levels`
  - `Scatter plot analyzing performance vs load time correlation`
  - `Heatmap visualizing weekly development activity patterns`

### 3. Publish

- Click **Publish** in the top right corner
- The project will now appear on your homepage and projects page

## Project Content Details

### Title
Interactive Data Visualization Dashboard

### Description
A comprehensive suite of interactive data visualizations that transform complex datasets into accessible, engaging visual stories. Built with performance, accessibility, and responsive design as core principles.

### Key Features Highlighted
- 5 distinct visualization types (Line, Bar, Pie, Scatter, Heatmap)
- WCAG 2.1 AA accessibility compliance
- Keyboard navigation and screen reader support
- Colorblind-friendly palettes
- Fully responsive design
- 60fps animation performance
- Interactive tooltips and hover effects

### Technologies
- React & TypeScript
- Recharts library
- Framer Motion for animations
- Tailwind CSS for styling
- Next.js 15 App Router

## Verification

After completing all steps, verify:

1. ✅ Project appears in Studio under Projects
2. ✅ Project is marked as Featured
3. ✅ Main image is uploaded with alt text
4. ✅ Project is Published (not draft)
5. ✅ Visit http://localhost:3000 - project should appear in featured section
6. ✅ Visit http://localhost:3000/projects - project should appear in list
7. ✅ Click on project card - should link to /data-viz page

## Troubleshooting

### "Missing SANITY_API_TOKEN"
- Make sure you added the token to `.env.local`
- Restart your terminal/dev server after adding the token

### "Permission denied"
- Your API token needs Editor or Administrator permissions
- Create a new token with proper permissions

### "Project already exists"
- The script will update the existing project
- This is safe and expected behavior

### Images not showing
- Make sure images are uploaded in Studio
- Check that alt text is added
- Verify the project is Published (not draft)

## Next Steps

After completing this task:
- Move on to Task 8.4: Create third project (Creative Coding)
- Or continue with Task 8.5: Create first blog post

---

**Task Reference:** Phase 1 Foundation - Task 8.3
**Requirements:** 4.1, 4.2, 4.3, 4.4, 4.5
