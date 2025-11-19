# Content Creation Guide

This guide explains how to manage content for the Kaze Keza portfolio using Sanity Studio.

## 1. Accessing the Studio

The Content Management System (CMS) is built directly into the application.

- **Local Development**: Visit [http://localhost:3000/studio](http://localhost:3000/studio)
- **Production**: Visit [https://kazekeza.com/studio](https://kazekeza.com/studio)

You will need to log in with your Sanity credentials (or the provider you configured, e.g., GitHub/Google).

## 2. Managing Projects

Projects are the core of your portfolio. They represent your work in data visualization, creative coding, and web development.

### Adding a New Project

1. In the Studio, click on **Project** in the left sidebar.
2. Click the **Create** (pencil) icon or "New document".
3. Fill in the following fields:

- **Title**: The name of the project.
- **Slug**: Click "Generate" to create a URL-friendly version of the title.
- **Description**: A brief summary of the project (displayed on cards).
- **Main Image**: The primary visual for the project.
  - *Tip*: Use high-quality screenshots or renders.
  - **Alt Text**: Describe the image for accessibility (Required).
- **Technologie**: Select or create tags for technologies used (e.g., "Next.js", "p5.js", "D3.js").
- **Project Date**: When the project was completed.
- **Links**:
  - **Live URL**: Link to the deployed project.
  - **GitHub URL**: Link to the source code.
- **Content**: The detailed case study. You can add text, images, and code blocks here.

### Featured Projects

To feature a project on the homepage:
- There is currently no explicit "Featured" toggle in the schema (unless added recently). By default, the homepage fetches the most recent projects.
- *Note*: If you want specific control, we can add a `featured` boolean field to the schema in Phase 2.

## 3. Managing Blog Posts

Share your thoughts, tutorials, and process.

### Writing a Post

1. Click on **Post** in the sidebar.
2. Create a new document.
3. Fields:
   - **Title**: Engaging headline.
   - **Slug**: URL identifier.
   - **Published At**: Date of publication.
   - **Main Image**: Cover image for the post.
   - **Excerpt**: A short summary for the blog index page.
   - **Body**: The main content.
     - Use the toolbar to format text (Bold, Italic, Headings).
     - **Images**: You can insert images directly into the body.
     - **Code**: Use the code block for syntax-highlighted snippets.

### SEO for Posts

- Ensure your **Title** contains relevant keywords.
- The **Excerpt** serves as the meta description for the post page.
- Use descriptive **Alt Text** for all images.

## 4. Image Optimization

Sanity automatically optimizes images, but you should follow these best practices:

- **Format**: Upload JPG or PNG. WebP is generated automatically.
- **Size**: Avoid uploading massive raw files. 1920px wide is usually sufficient for full-width images.
- **Aspect Ratio**:
  - Project cards work best with **16:9** images.
  - Profile pictures should be roughly square or 4:5.

## 5. SEO Best Practices

The site uses dynamic SEO metadata.

- **Global SEO**: Configured in `lib/seo.ts`.
- **Page SEO**:
  - **Projects/Blog**: The title and description are automatically used for SEO tags.
  - **Social Sharing**: The `mainImage` is used as the Open Graph (OG) image when sharing on social media.

## 6. Troubleshooting

- **Changes not showing?**
  - Ensure you have clicked **Publish** (green button) at the bottom.
  - If changes don't appear immediately in production, wait a minute for the cache to revalidate (Next.js Revalidation).

- **Studio not loading?**
  - Check your internet connection.
  - Verify you are logged in.
  - In development, check the console for errors.
