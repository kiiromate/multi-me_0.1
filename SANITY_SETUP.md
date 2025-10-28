# Sanity CMS Setup Guide

This portfolio uses Sanity CMS for content management. Follow these steps to get started.

## Initial Setup

### 1. Create a Sanity Account
- Go to [sanity.io](https://www.sanity.io)
- Sign up for a free account
- Create a new project

### 2. Initialize Sanity

Run this command in your terminal:

```bash
npm create sanity@latest
```

When prompted:
- **Project name**: Choose a name (e.g., "kaze-portfolio")
- **Use the default dataset configuration?**: Yes
- **Project output path**: Select a temporary location (we already have the config)
- **Select project template**: Clean project with no predefined schemas

After creation, note your:
- **Project ID** (you'll need this)
- **Dataset name** (usually "production")

### 3. Configure Environment Variables

1. Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

2. Edit `.env.local` and add your Sanity credentials:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=abc12def  # Your project ID from step 2
   NEXT_PUBLIC_SANITY_DATASET=production    # Usually "production"
   ```

### 4. Deploy Your Schemas

Deploy the schemas to your Sanity project:

```bash
npx sanity@latest schema deploy
```

Or navigate to the studio and it will auto-deploy:
```bash
npm run dev
# Then visit http://localhost:3000/studio
```

## Accessing the CMS

### Local Development
Once configured, access your CMS at:
```
http://localhost:3000/studio
```

### Production
After deployment, access at:
```
https://your-domain.com/studio
```

## Content Structure

### Projects
Create and manage your portfolio projects:
- Title, description, and detailed content
- Project images and gallery
- Technologies/tags
- Status (Live, In Development, Prototype)
- Links to live demo and GitHub
- Featured flag for homepage

### Blog Posts
Write and publish blog posts:
- Title, excerpt, and full content with rich text
- Featured image
- Tags for categorization
- Read time
- Featured flag for homepage

### About
Manage your about page content:
- Name and professional title
- Bio with rich text
- Location and availability
- Profile image
- Skills with descriptions
- Social links
- CTA text

## Adding Content

1. Go to your Studio at `/studio`
2. Click the "+" button or select a document type
3. Fill in the fields
4. Click "Publish"
5. Your content will appear on the site automatically!

## Tips

- **Featured Content**: Mark projects and posts as "featured" to show them on the homepage
- **Display Order**: Use the "order" field on projects to control their sequence
- **Images**: Always add alt text for accessibility
- **Slugs**: These create the URLs for your content (e.g., `/blog/my-first-post`)

## Need Help?

- [Sanity Documentation](https://www.sanity.io/docs)
- [Sanity Slack Community](https://slack.sanity.io)

## Security Note

Never commit your `.env.local` file to version control. It's already in `.gitignore`.
