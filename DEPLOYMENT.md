# Deployment Guide - KAZE KEZA Portfolio

This guide walks you through deploying the portfolio to production on Netlify with the custom domain kazekeza.com.

## Prerequisites

- GitHub repository with the portfolio code
- Netlify account (free tier is sufficient)
- Porkbun account with kazekeza.com domain
- Sanity project ID and dataset name

## Step 1: Configure Netlify Deployment

### 1.1 Create Netlify Account

1. Go to [netlify.com](https://www.netlify.com/)
2. Click "Sign up" and choose "Sign up with GitHub"
3. Authorize Netlify to access your GitHub account

### 1.2 Connect GitHub Repository

1. From Netlify dashboard, click "Add new site" → "Import an existing project"
2. Choose "Deploy with GitHub"
3. Select your portfolio repository from the list
4. If you don't see it, click "Configure the Netlify app on GitHub" to grant access

### 1.3 Configure Build Settings

Netlify should auto-detect Next.js settings, but verify these values:

- **Branch to deploy**: `main` (or your default branch)
- **Build command**: `npm run build`
- **Publish directory**: `.next`
- **Node version**: Set in netlify.toml (already configured as 18)

Click "Deploy site" to create the site (don't worry, we'll add environment variables next).

### 1.4 Verify Initial Deployment

1. Netlify will assign a random URL like `random-name-123456.netlify.app`
2. The first build will likely fail due to missing environment variables - this is expected
3. Note your site name for the next steps

## Step 2: Configure Environment Variables

### 2.1 Add Environment Variables in Netlify

1. In your Netlify site dashboard, go to "Site configuration" → "Environment variables"
2. Click "Add a variable" and add each of the following:

**Required Variables:**

| Variable Name | Value | Notes |
|---------------|-------|-------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Your Sanity project ID | Found in Sanity dashboard |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` | Your Sanity dataset name |
| `NEXT_PUBLIC_SITE_URL` | `https://kazekeza.com` | Your production domain |

### 2.2 Get Sanity Credentials

If you don't have your Sanity project ID:

1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Select your project
3. Copy the Project ID from the project settings
4. Dataset is typically `production` unless you changed it

### 2.3 Trigger Rebuild

1. After adding all environment variables, go to "Deploys"
2. Click "Trigger deploy" → "Deploy site"
3. Wait for the build to complete (usually 2-5 minutes)
4. Check the deploy log for any errors

### 2.4 Verify Deployment

1. Click on the deploy URL (e.g., `random-name-123456.netlify.app`)
2. Verify the site loads correctly
3. Check that content from Sanity is displaying
4. Open browser console and verify no errors

## Step 3: Connect Custom Domain

### 3.1 Add Domain in Netlify

1. In Netlify dashboard, go to "Domain management"
2. Click "Add a domain"
3. Enter `kazekeza.com`
4. Click "Verify" - Netlify will check if you own the domain
5. Click "Add domain" to confirm

### 3.2 Configure DNS at Porkbun

You have two options for DNS configuration:

#### Option A: Netlify DNS (Recommended - Easier)

1. In Netlify, under "Domain management", click "Set up Netlify DNS"
2. Netlify will provide nameservers (e.g., `dns1.p01.nsone.net`)
3. Go to [Porkbun domain management](https://porkbun.com/account/domains)
4. Select kazekeza.com
5. Go to "Nameservers" section
6. Change from Porkbun nameservers to Netlify nameservers
7. Save changes

#### Option B: External DNS (More Control)

1. In Netlify, note the IP address shown for A record (or use `75.2.60.5`)
2. Go to [Porkbun DNS management](https://porkbun.com/account/domainsSpeedy)
3. Select kazekeza.com
4. Add/update these DNS records:

**DNS Records:**

| Type | Host | Answer/Value | TTL |
|------|------|--------------|-----|
| A | @ | `75.2.60.5` | 600 |
| CNAME | www | `[your-site-name].netlify.app` | 600 |

**Note**: Replace `[your-site-name]` with your actual Netlify site name.

### 3.3 Wait for DNS Propagation

- DNS changes can take 5 minutes to 48 hours to propagate
- Typically takes 15-30 minutes for most users
- Check propagation status: [whatsmydns.net](https://www.whatsmydns.net/)

### 3.4 Enable HTTPS

1. Once DNS is configured, return to Netlify "Domain management"
2. Netlify will automatically provision an SSL certificate (Let's Encrypt)
3. This usually takes 1-2 minutes after DNS propagates
4. Once ready, enable "Force HTTPS" to redirect all HTTP traffic to HTTPS

### 3.5 Configure WWW Redirect

1. In Netlify "Domain management", under "Custom domains"
2. Set primary domain to `kazekeza.com` (without www)
3. Netlify will automatically redirect `www.kazekeza.com` to `kazekeza.com`

## Step 4: Verify Production Deployment

### 4.1 Test Site Access

1. Open browser and navigate to `https://kazekeza.com`
2. Verify the site loads without errors
3. Check that HTTPS is working (lock icon in address bar)
4. Test `http://kazekeza.com` redirects to HTTPS
5. Test `www.kazekeza.com` redirects to `kazekeza.com`

### 4.2 Test All Pages

Navigate through all pages and verify they work:

- [ ] Homepage (`/`)
- [ ] Projects page (`/projects`)
- [ ] Blog page (`/blog`)
- [ ] About page (`/about`)
- [ ] Contact page (`/contact`)
- [ ] Data Viz page (`/data-viz`)
- [ ] Sanity Studio (`/studio`)

### 4.3 Verify Content Loading

1. Check that all content from Sanity displays correctly
2. Verify images load and are optimized
3. Check that project cards show real data
4. Verify blog posts display correctly
5. Confirm about page shows your information

### 4.4 Check Console for Errors

1. Open browser DevTools (F12)
2. Go to Console tab
3. Refresh the page
4. Verify no errors appear (warnings are okay)
5. Check Network tab for failed requests

### 4.5 Test Functionality

- [ ] Theme toggle works (dark/light mode)
- [ ] Navigation works on all pages
- [ ] Mobile menu works on small screens
- [ ] Animations play smoothly
- [ ] Links work (social links, project links)
- [ ] Contact form validation works
- [ ] Search/filter works on blog page

### 4.6 Mobile Testing

1. Test on actual mobile device or use DevTools device emulation
2. Verify responsive design works
3. Check touch targets are large enough
4. Test mobile menu functionality
5. Verify animations perform well on mobile

## Step 5: Performance Verification

### 5.1 Run Lighthouse Audit

1. Open Chrome DevTools (F12)
2. Go to "Lighthouse" tab
3. Select "Desktop" or "Mobile"
4. Check all categories
5. Click "Analyze page load"

**Target Scores:**
- Performance: 80+
- Accessibility: 95+
- Best Practices: 90+
- SEO: 95+

### 5.2 Check Core Web Vitals

Monitor these metrics:
- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1

### 5.3 Test Loading Speed

1. Use [WebPageTest](https://www.webpagetest.org/)
2. Enter `https://kazekeza.com`
3. Select test location close to your target audience
4. Review waterfall chart and timing metrics

## Troubleshooting

### Build Fails

**Issue**: Build fails with "Module not found" error
- **Solution**: Check that all dependencies are in package.json
- Run `npm install` locally to verify

**Issue**: Build fails with TypeScript errors
- **Solution**: TypeScript errors are ignored in build (see next.config.mjs)
- If build still fails, check the deploy log for the actual error

### Environment Variables Not Working

**Issue**: Site loads but shows no content from Sanity
- **Solution**: Verify environment variables are set correctly in Netlify
- Check variable names match exactly (case-sensitive)
- Trigger a new deploy after adding variables

### Domain Not Connecting

**Issue**: Domain shows "Site not found" error
- **Solution**: DNS may not have propagated yet - wait 30 minutes
- Verify DNS records are correct in Porkbun
- Check DNS propagation at whatsmydns.net

**Issue**: HTTPS not working
- **Solution**: Wait for SSL certificate to provision (can take up to 24 hours)
- Verify DNS is pointing to Netlify correctly
- Check Netlify domain settings for SSL status

### Images Not Loading

**Issue**: Images show broken or don't load
- **Solution**: Check Sanity image URLs are correct
- Verify NEXT_PUBLIC_SANITY_PROJECT_ID is set
- Check browser console for CORS errors

## Continuous Deployment

### Automatic Deploys

Netlify is now configured for continuous deployment:

1. Push code to `main` branch on GitHub
2. Netlify automatically detects the push
3. Builds and deploys the new version
4. Usually takes 2-5 minutes

### Deploy Previews

Netlify creates deploy previews for pull requests:

1. Create a pull request on GitHub
2. Netlify builds a preview deployment
3. Preview URL is posted as a comment on the PR
4. Test changes before merging

### Rollback

If a deployment has issues:

1. Go to Netlify "Deploys" tab
2. Find a previous successful deploy
3. Click "..." menu → "Publish deploy"
4. Site reverts to that version instantly

## Monitoring

### Netlify Analytics (Optional)

1. Go to "Analytics" in Netlify dashboard
2. Enable Netlify Analytics (paid feature)
3. View traffic, page views, and performance metrics

### Vercel Analytics (Already Integrated)

The site already includes Vercel Analytics:
- View analytics at [vercel.com/analytics](https://vercel.com/analytics)
- Monitor page views, user sessions, and Web Vitals

## Next Steps

After successful deployment:

1. ✅ Update README.md with live URL
2. ✅ Share the site with friends/colleagues for feedback
3. ✅ Monitor analytics and performance
4. ✅ Set up Sanity webhooks for instant content updates (optional)
5. ✅ Configure custom 404 page (optional)
6. ✅ Set up form notifications (when contact form backend is added)

## Support Resources

- [Netlify Documentation](https://docs.netlify.com/)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
- [Porkbun DNS Help](https://kb.porkbun.com/category/7-dns)
- [Sanity Documentation](https://www.sanity.io/docs)

## Deployment Checklist

Use this checklist to track your deployment progress:

- [ ] Created Netlify account
- [ ] Connected GitHub repository
- [ ] Configured build settings
- [ ] Added environment variables
- [ ] Verified initial deployment
- [ ] Added custom domain in Netlify
- [ ] Configured DNS at Porkbun
- [ ] Waited for DNS propagation
- [ ] Enabled HTTPS
- [ ] Tested site at https://kazekeza.com
- [ ] Verified all pages work
- [ ] Checked content loads from Sanity
- [ ] Tested on mobile devices
- [ ] Ran Lighthouse audit
- [ ] No console errors
- [ ] Updated documentation

---

**Deployment Date**: _____________

**Deployed By**: _____________

**Production URL**: https://kazekeza.com

**Netlify Site Name**: _____________
