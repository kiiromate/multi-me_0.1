# Sanity CMS Environment Setup Guide

This guide will help you set up your Sanity CMS environment for the KAZE KEZA portfolio.

## Prerequisites

- Node.js 18+ installed
- A Sanity account (free at https://sanity.io)

## Step 1: Create a Sanity Project

1. Go to https://sanity.io/manage
2. Click "Create project"
3. Choose a project name (e.g., "kaze-keza-portfolio")
4. Select a plan (Free tier is sufficient to start)
5. Note your **Project ID** (you'll need this in the next step)

## Step 2: Configure Environment Variables

The `.env.local` file has been created with placeholder values. You need to update it with your actual Sanity credentials:

1. Open `.env.local` in your editor
2. Replace `your_project_id_here` with your actual Sanity Project ID
3. Verify the dataset is set to `production` (or your preferred dataset name)
4. Verify the site URL is correct

Your `.env.local` should look like this:

```env
# Sanity CMS Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=abc123xyz  # Your actual project ID
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SITE_URL=https://kazekeza.com
```

## Step 3: Test the Connection

Run the connection test script to verify everything is configured correctly:

```bash
npx tsx scripts/test-sanity-connection.ts
```

If successful, you should see:
- ✅ Environment variables validated
- ✅ Successfully connected to Sanity CMS
- ✅ Dataset accessible

## Step 4: Access Sanity Studio

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open your browser and navigate to:
   ```
   http://localhost:3000/studio
   ```

3. Sign in with your Sanity account

4. You should see the Studio interface with three content types:
   - Projects
   - Blog Posts
   - About

## Troubleshooting

### Error: "Missing required environment variables"

- Make sure `.env.local` exists in the project root
- Verify you've replaced `your_project_id_here` with your actual Project ID
- Restart your development server after updating `.env.local`

### Error: "Failed to connect to Sanity"

- Check that your Project ID is correct (no typos)
- Verify your Sanity project exists at https://sanity.io/manage
- Ensure you have internet connectivity
- Try logging into Sanity Studio at http://localhost:3000/studio

### Studio shows "Invalid configuration"

- Verify your dataset name is correct (usually "production")
- Check that all environment variables are set
- Clear your browser cache and try again

## Next Steps

Once your environment is set up:

1. ✅ Environment configured
2. 📝 Create content in Sanity Studio (Task 8 in the implementation plan)
3. 🎨 Update pages to fetch from Sanity (Tasks 3-6)
4. 🚀 Deploy to production (Task 10)

## Security Notes

- ⚠️ Never commit `.env.local` to version control (it's already in `.gitignore`)
- ✅ The `NEXT_PUBLIC_*` variables are safe to expose in the browser
- ✅ They only allow read access to published content
- 🔒 Write access requires authentication through Sanity Studio

## Additional Resources

- [Sanity Documentation](https://www.sanity.io/docs)
- [Next.js + Sanity Guide](https://www.sanity.io/guides/nextjs-app-router-live-preview)
- [GROQ Query Language](https://www.sanity.io/docs/groq)
