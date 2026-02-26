# Environment Variables Guide

This guide explains all environment variables needed for the KAZE KEZA Portfolio and how to configure them for different environments.

## 📋 Required Variables

### NEXT_PUBLIC_SANITY_PROJECT_ID

**Description**: Your Sanity project identifier  
**Required**: Yes  
**Example**: `abc123xyz`  
**Where to find**: 
1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Select your project
3. Copy the Project ID from the project settings

**Why it's public**: This ID is safe to expose in the browser. It only allows read access to published content.

---

### NEXT_PUBLIC_SANITY_DATASET

**Description**: The Sanity dataset to use  
**Required**: Yes  
**Default**: `production`  
**Example**: `production`  
**Options**: 
- `production` - Your live content
- `staging` - Test content (if you created this dataset)
- `development` - Development content (if you created this dataset)

**Why it's public**: Dataset names are not sensitive. They determine which content to fetch.

---

### NEXT_PUBLIC_SITE_URL

**Description**: Your production website URL  
**Required**: Yes  
**Example**: `https://kazekeza.com`  
**Usage**: Used for:
- SEO metadata (canonical URLs)
- Open Graph URLs
- Sitemap generation
- Structured data

**Important**: 
- Must include `https://`
- No trailing slash
- Use your actual domain in production

---

## 🔧 Configuration by Environment

### Local Development

1. **Create `.env.local` file** in project root:
   ```bash
   cp .env.example .env.local
   ```

2. **Edit `.env.local`** with your values:
   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_actual_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

3. **Restart dev server** to load new variables:
   ```bash
   npm run dev
   ```

**Note**: `.env.local` is in `.gitignore` and will never be committed.

---

### Netlify Production

#### Method 1: Netlify Dashboard (Recommended)

1. **Navigate to your site** in Netlify dashboard

2. **Go to Site configuration** → **Environment variables**

3. **Add each variable**:
   - Click "Add a variable"
   - Enter variable name (exactly as shown)
   - Enter variable value
   - Click "Create variable"

4. **Add these three variables**:

   | Variable Name | Value |
   |---------------|-------|
   | `NEXT_PUBLIC_SANITY_PROJECT_ID` | Your Sanity project ID |
   | `NEXT_PUBLIC_SANITY_DATASET` | `production` |
   | `NEXT_PUBLIC_SITE_URL` | `https://kazekeza.com` |

5. **Trigger new deploy**:
   - Go to "Deploys" tab
   - Click "Trigger deploy" → "Deploy site"

#### Method 2: Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Link to your site
netlify link

# Set environment variables
netlify env:set NEXT_PUBLIC_SANITY_PROJECT_ID "your_project_id"
netlify env:set NEXT_PUBLIC_SANITY_DATASET "production"
netlify env:set NEXT_PUBLIC_SITE_URL "https://kazekeza.com"

# Trigger deploy
netlify deploy --prod
```

#### Method 3: netlify.toml (Not Recommended for Secrets)

You can add environment variables to `netlify.toml`, but this is **not recommended** because:
- Values are committed to version control
- Less flexible for different environments
- Harder to update without redeploying

Only use this for non-sensitive, static values.

---

### Vercel (Alternative Platform)

If you choose to deploy on Vercel instead:

1. **Go to Project Settings** → **Environment Variables**

2. **Add each variable** for all environments:
   - Production
   - Preview
   - Development

3. **Variable configuration**:

   | Variable | Production | Preview | Development |
   |----------|-----------|---------|-------------|
   | `NEXT_PUBLIC_SANITY_PROJECT_ID` | Your project ID | Your project ID | Your project ID |
   | `NEXT_PUBLIC_SANITY_DATASET` | `production` | `production` | `production` |
   | `NEXT_PUBLIC_SITE_URL` | `https://kazekeza.com` | `https://preview.kazekeza.com` | `http://localhost:3000` |

4. **Redeploy** after adding variables

---

## 🔍 Verification

### Check Variables are Loaded

**Local Development**:
```bash
# Start dev server
npm run dev

# Check browser console
# Open DevTools → Console
# Type: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
# Should show your project ID
```

**Production**:
```bash
# Run verification script
npm run verify:deployment

# Or check manually:
# 1. Visit your site
# 2. Open DevTools → Console
# 3. Type: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
# Should show your project ID (this is okay - it's public)
```

### Test Sanity Connection

```bash
# Test Sanity connection with current env vars
npm run test:sanity
```

This script will:
- Check if environment variables are set
- Test connection to Sanity
- Verify you can fetch content
- Report any issues

---

## 🚨 Troubleshooting

### "Missing required environment variable"

**Problem**: Build fails with error about missing env var

**Solution**:
1. Check variable name is spelled exactly right (case-sensitive)
2. Verify variable is set in Netlify dashboard
3. Trigger a new deploy after adding variables
4. Check deploy logs for the actual error

### "Cannot connect to Sanity"

**Problem**: Site loads but shows no content

**Solution**:
1. Verify `NEXT_PUBLIC_SANITY_PROJECT_ID` is correct
2. Check project ID at sanity.io/manage
3. Ensure dataset name is correct (usually `production`)
4. Test connection locally with `npm run test:sanity`

### "Environment variable not updating"

**Problem**: Changed env var but site still uses old value

**Solution**:
1. Clear browser cache
2. Trigger new deploy in Netlify
3. Wait for deploy to complete (2-5 minutes)
4. Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)

### Variables work locally but not in production

**Problem**: Site works on localhost but not on Netlify

**Solution**:
1. Verify variables are set in Netlify (not just locally)
2. Check variable names match exactly
3. Ensure no typos in values
4. Review Netlify deploy logs for errors

---

## 🔐 Security Best Practices

### Safe to Expose (NEXT_PUBLIC_*)

Variables prefixed with `NEXT_PUBLIC_` are embedded in the browser bundle. This is safe for:
- ✅ Sanity project ID (read-only access)
- ✅ Dataset names
- ✅ Public URLs
- ✅ Feature flags
- ✅ Public API endpoints

### Never Expose (No NEXT_PUBLIC_ prefix)

Keep these server-side only:
- ❌ API secrets and tokens
- ❌ Database credentials
- ❌ Private keys
- ❌ Authentication secrets
- ❌ Payment gateway keys

**Rule**: If it's sensitive, don't prefix it with `NEXT_PUBLIC_`

---

## 📚 Additional Resources

- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [Netlify Environment Variables](https://docs.netlify.com/environment-variables/overview/)
- [Sanity Environment Setup](https://www.sanity.io/docs/environment-variables)

---

## 🎯 Quick Reference

### Local Development
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Production (Netlify)
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SITE_URL=https://kazekeza.com
```

### Verification Commands
```bash
npm run test:sanity          # Test Sanity connection
npm run verify:deployment    # Verify production deployment
```

---

**Last Updated**: 2024  
**Maintained By**: KAZE KEZA
