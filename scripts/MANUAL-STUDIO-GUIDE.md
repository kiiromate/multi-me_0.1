# Manual Studio Creation Guide - Data Viz Project

If you prefer to create the project manually in Sanity Studio, follow these steps:

## Step-by-Step Instructions

### 1. Access Sanity Studio

1. Make sure your dev server is running: `npm run dev`
2. Open your browser and go to: **http://localhost:3000/studio**
3. Sign in if prompted

### 2. Create New Project

1. In the Studio sidebar, click on **Projects**
2. Click the **+** button or **Create** button
3. You'll see a blank project form

### 3. Fill in Basic Information

**Title:**
```
Interactive Data Visualization Dashboard
```

**Slug:** (will auto-generate as you type the title)
```
data-visualization-dashboard
```

**Description:**
```
A comprehensive suite of interactive data visualizations that transform complex datasets into accessible, engaging visual stories. Built with performance, accessibility, and responsive design as core principles.
```

### 4. Add Main Content

In the **Content** rich text editor, paste this:

```
This project showcases the power of thoughtful data presentation through a collection of interactive charts and visualizations. Each component is designed to handle real-world data scenarios while maintaining smooth performance and accessibility compliance.

The dashboard features five distinct visualization types:

**Line Charts** - Tracking trends over time with smooth animations and interactive tooltips. Perfect for showing growth patterns, seasonal variations, and temporal data analysis.

**Bar Charts** - Comparing values across categories with both horizontal and vertical orientations. Includes animated transitions and value labels for clear data communication.

**Pie Charts** - Displaying proportional relationships with interactive segments, legends, and percentage breakdowns. Optimized for mobile touch interactions.

**Scatter Plots** - Revealing correlations and patterns in multi-dimensional data. Features trend lines, category grouping, and bubble sizing for additional data dimensions.

**Heatmaps** - Visualizing activity patterns and intensity across two dimensions. Ideal for time-based analysis and identifying peak activity periods.

Every visualization is built with WCAG 2.1 AA accessibility standards, including keyboard navigation, screen reader support, and colorblind-friendly palettes. The components are fully responsive, adapting seamlessly from mobile to desktop viewports while maintaining 60fps animation performance.
```

### 5. Add Tags

Click **Add item** under Tags and add each tag:
- `Data Visualization`
- `React`
- `TypeScript`
- `Recharts`
- `Accessibility`
- `Interactive Design`

### 6. Set Project Details

**Status:** Select `live` from dropdown

**Featured:** ✅ Check this box

**Year:** `2024`

**Order:** `2`

**Live URL:**
```
https://kazekeza.com/data-viz
```

**GitHub URL:** (leave empty for now)

### 7. Add Main Image

1. Click on **Main Image** section
2. Click **Upload** or drag and drop an image
3. **To get the image:**
   - Visit http://localhost:3000/data-viz
   - Take a screenshot of the page (showing header + charts)
   - Save as PNG or JPG
   - Upload to Studio

4. **Alt Text:**
```
Interactive data visualization dashboard showing multiple chart types including line charts, bar charts, pie charts, scatter plots, and heatmaps
```

### 8. Add Gallery Images (Optional but Recommended)

For each chart, click **Add item** in Gallery:

**Image 1 - Line Chart:**
- Screenshot of the "Website Traffic Growth" chart
- Alt text: `Line chart showing website traffic growth over 12 months with smooth animations`

**Image 2 - Bar Charts:**
- Screenshot of the "Technology Proficiency" and "Project Distribution" charts
- Alt text: `Horizontal bar chart displaying technology proficiency levels across different frameworks`

**Image 3 - Scatter Plot:**
- Screenshot of the "Performance vs Load Time Analysis" chart
- Alt text: `Scatter plot analyzing performance vs load time correlation with trend line`

**Image 4 - Heatmap:**
- Screenshot of the "Development Activity Heatmap"
- Alt text: `Heatmap visualizing weekly development activity patterns across weekdays and hours`

### 9. Publish

1. Review all fields to make sure everything is filled in
2. Click **Publish** button in the top right corner
3. You should see a success message

### 10. Verify

1. Go to http://localhost:3000 (homepage)
   - You should see the Data Viz project in the featured section
2. Go to http://localhost:3000/projects
   - You should see the project in the projects list
3. Click on the project card
   - It should navigate to /data-viz page

## Quick Screenshot Tips

### Using Windows Snipping Tool:
1. Press `Win + Shift + S`
2. Select area to capture
3. Screenshot is copied to clipboard
4. Paste into Paint or image editor
5. Save as PNG

### Using Browser DevTools:
1. Press `F12` to open DevTools
2. Press `Ctrl + Shift + P` (Command Palette)
3. Type "screenshot"
4. Select "Capture full size screenshot"
5. Image will download automatically

### Recommended Screenshot Sizes:
- **Main Image:** 1200x800px or larger
- **Gallery Images:** 800x600px or larger
- **Format:** PNG for best quality, JPG for smaller file size

## Troubleshooting

**Can't access Studio:**
- Make sure dev server is running
- Check that you're logged into Sanity
- Try clearing browser cache

**Images not uploading:**
- Check file size (max 10MB usually)
- Try a different image format (PNG vs JPG)
- Make sure you have write permissions

**Project not appearing on site:**
- Make sure you clicked **Publish** (not just Save)
- Check that **Featured** is checked
- Refresh your browser on the homepage

**Changes not showing:**
- Hard refresh the page (Ctrl + F5)
- Check browser console for errors
- Verify environment variables are set correctly

---

**Need Help?**
- Check the full guide: `scripts/DATA-VIZ-PROJECT-GUIDE.md`
- Review the content JSON: `scripts/dataviz-project-content.json`
- Run the seed script: `npx tsx scripts/seed-dataviz-project.ts`
