# SEO & UTM Tracking Implementation Plan

This document outlines the SEO improvements and UTM tracking implementation for your portfolio.

---

## 🎯 Phase 1: SEO Improvements

### Current State
- ✅ Basic SEO metadata in `lib/seo.ts`
- ✅ Open Graph tags
- ✅ Twitter Card metadata
- ⚠️ Generic placeholder verification codes
- ⚠️ Default URL (kazekeza.dev) - needs update
- ⚠️ No dynamic metadata for individual pages
- ❌ No sitemap.xml
- ❌ No robots.txt
- ❌ No structured data for projects/blog posts

### Goals
1. **Dynamic SEO** - Each project and blog post gets unique meta tags
2. **Search Visibility** - Proper sitemap and robots.txt
3. **Rich Results** - Structured data for better search appearance
4. **Analytics Ready** - Track performance and conversions
5. **Social Sharing** - Beautiful previews on social media

---

## 📋 SEO Tasks Breakdown

### Task 1: Update Site Configuration ✅ READY
**File**: `lib/seo.ts`
- [ ] Update default URL from `kazekeza.dev` to your actual domain
- [ ] Update social handles (@kazekeza) to your real handles
- [ ] Add Google Search Console verification code
- [ ] Add Bing verification code (optional)
- [ ] Update site name and description

**Priority**: HIGH - Do this first!

---

### Task 2: Dynamic Page Metadata 🔧 TODO
**Impact**: Huge SEO boost for individual pages

**Pages to Update**:
1. **Project Detail Pages** (`/projects/[slug]`)
   - Unique title with project name
   - Project description as meta description
   - Project image as OG image
   - Structured data (Article/CreativeWork)

2. **Blog Post Pages** (`/blog/[slug]`)
   - Post title and excerpt
   - Post featured image
   - Author information
   - Publication date
   - Structured data (BlogPosting)

3. **About Page** (`/about`)
   - Personal branding
   - Your name + professional title
   - Profile image for social cards

**Code Location**: Create `app/projects/[slug]/page.tsx` and `app/blog/[slug]/page.tsx`

---

### Task 3: Sitemap Generation 🔧 TODO
**What**: Auto-generate sitemap.xml from your CMS content

**Why**:
- Helps search engines discover all your pages
- Updates automatically when you add new projects/posts
- Shows last modified dates for better indexing

**Implementation**:
- Use Next.js App Router `sitemap.ts` feature
- Fetch all projects and posts from Sanity
- Generate XML with priorities and change frequencies

**File**: `app/sitemap.ts`

---

### Task 4: Robots.txt 🔧 TODO
**What**: Tell search engines what to crawl

**Configuration**:
```
User-agent: *
Allow: /
Disallow: /studio/
Disallow: /api/

Sitemap: https://your-domain.com/sitemap.xml
```

**File**: `app/robots.ts`

---

### Task 5: Structured Data 🔧 TODO
**What**: Rich snippets for better search results

**Types to Implement**:
1. **Person** (Already exists - just needs real data)
2. **Project/CreativeWork** - For portfolio items
3. **BlogPosting** - For blog posts
4. **BreadcrumbList** - Navigation breadcrumbs

**Benefits**:
- Rich search results
- Google Knowledge Panel eligibility
- Better click-through rates

---

### Task 6: Image Optimization ⚠️ TODO
**Current**: Images from Sanity need optimization

**Setup**:
- Configure Sanity Image URL builder
- Add responsive images with next/image
- Lazy loading for performance
- WebP format for modern browsers

---

## 📊 Phase 2: UTM Tracking & Analytics

### What is UTM Tracking?
UTM parameters help you track where your traffic comes from. For example:
- `?utm_source=twitter&utm_medium=social&utm_campaign=project_launch`
- `?utm_source=newsletter&utm_medium=email&utm_campaign=monthly_update`

### Use Cases for Your Portfolio

1. **Social Media Posts**
   - Twitter: `?utm_source=twitter&utm_medium=social`
   - LinkedIn: `?utm_source=linkedin&utm_medium=social`
   - GitHub: `?utm_source=github&utm_medium=profile`

2. **Email Campaigns**
   - Newsletter: `?utm_source=newsletter&utm_medium=email&utm_campaign=monthly`
   - Cold outreach: `?utm_source=outreach&utm_medium=email&utm_campaign=job_search`

3. **Content Marketing**
   - Guest posts: `?utm_source=medium&utm_medium=article&utm_campaign=guest_post`
   - Comments: `?utm_source=dev_to&utm_medium=comment`

4. **Job Applications**
   - Resume link: `?utm_source=resume&utm_medium=pdf&utm_campaign=job_apps`

---

## 🔧 UTM Implementation Tasks

### Task 1: UTM Utility Functions ✅ READY
**File**: `lib/analytics/utm.ts`

Features:
- Generate UTM URLs programmatically
- Validate UTM parameters
- Extract UTM from current URL
- Store UTM in session storage

---

### Task 2: Analytics Provider Integration 🔧 TODO

**Option A: Google Analytics 4 (Free)** ⭐ Recommended
- Most popular
- Free forever
- Great for tracking traffic sources
- Conversion tracking
- Real-time data

**Setup**:
1. Create GA4 property
2. Add tracking ID to environment variables
3. Install `@next/third-parties/google` or `react-ga4`
4. Track page views and events

**Option B: Plausible Analytics (Privacy-focused)**
- No cookies
- GDPR compliant
- Simple dashboard
- Paid ($9/month)

**Option C: Vercel Analytics** (If hosting on Vercel)
- Built-in, zero config
- Privacy-friendly
- Free tier available

---

### Task 3: Event Tracking 🔧 TODO

**Events to Track**:
1. **Navigation**
   - External link clicks (GitHub, Live Demo)
   - Social link clicks
   - Contact form submissions

2. **Engagement**
   - Project card clicks
   - Blog post reads (scroll depth)
   - Time on page

3. **Conversions**
   - Contact form submissions
   - Resume downloads (if added later)
   - Email link clicks

---

### Task 4: UTM Parameter Persistence 🔧 TODO

**Problem**: User lands on homepage with UTM → navigates to /contact → UTM lost
**Solution**: Store UTM in session storage, append to all navigation

**Implementation**:
- Capture UTM on first page load
- Store in sessionStorage
- Append to internal navigation
- Include in form submissions

---

### Task 5: Custom Dashboard / Reporting 🔧 TODO (Optional)

Create a simple analytics dashboard:
- Where visitors come from (UTM sources)
- Most popular projects
- Blog post performance
- Contact form conversion rate

**Stack Options**:
- Tinybird + Vercel Analytics
- Custom with Sanity + Analytics API
- Google Looker Studio (free)

---

## 🎯 Recommended Implementation Order

### Immediate (After Sanity Setup)
1. ✅ **Update SEO config** (5 mins)
   - Real domain, social handles, verification codes

2. ✅ **Set up Google Analytics** (15 mins)
   - Create GA4 property
   - Add tracking code
   - Test with GA Debugger

### Week 1
3. **Create sitemap.ts** (30 mins)
4. **Create robots.ts** (10 mins)
5. **Add UTM tracking utilities** (20 mins)
6. **Implement UTM persistence** (45 mins)

### Week 2
7. **Dynamic metadata for projects** (2 hours)
8. **Dynamic metadata for blog posts** (2 hours)
9. **Add structured data** (2 hours)

### Week 3
10. **Event tracking implementation** (3 hours)
11. **Test all tracking** (1 hour)
12. **Create UTM tracking spreadsheet** (30 mins)

---

## 📈 Measuring Success

### SEO Metrics to Track
- **Google Search Console**
  - Impressions (how often you show up in search)
  - Clicks (people visiting from search)
  - Average position
  - Click-through rate (CTR)

- **Target Goals**
  - Month 1: Indexed in Google
  - Month 2: 10+ impressions/day
  - Month 3: First clicks from search
  - Month 6: Ranking for your name + "portfolio"

### UTM Tracking Metrics
- Top traffic sources
- Conversion rate by source
- Best performing campaigns
- ROI on outreach efforts

---

## 🔗 UTM Campaign Templates

Create these standard URLs for sharing:

### Social Media
```
Twitter Bio: https://your-domain.com/?utm_source=twitter&utm_medium=profile
LinkedIn: https://your-domain.com/?utm_source=linkedin&utm_medium=profile
GitHub: https://your-domain.com/?utm_source=github&utm_medium=profile
```

### Email Signature
```
https://your-domain.com/?utm_source=email&utm_medium=signature
```

### Resume
```
https://your-domain.com/?utm_source=resume&utm_medium=pdf
```

### Sharing Projects
```
Project: https://your-domain.com/projects/project-name?utm_source=twitter&utm_medium=social&utm_campaign=project_launch
```

---

## 📚 Resources

### SEO
- [Next.js SEO Docs](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
- [Google Search Console](https://search.google.com/search-console)
- [Schema.org](https://schema.org) - Structured data reference

### UTM Tracking
- [Google Campaign URL Builder](https://ga-dev-tools.google/campaign-url-builder/)
- [UTM Best Practices](https://support.google.com/analytics/answer/1033863)

### Analytics
- [Google Analytics 4](https://analytics.google.com)
- [Vercel Analytics](https://vercel.com/analytics)
- [Plausible](https://plausible.io)

---

## 🚨 Important Notes

1. **Don't Over-Track**: Only track what you'll actually use
2. **Privacy First**: Consider GDPR/privacy implications
3. **Test UTMs**: Always test your tracking before campaigns
4. **Document Campaigns**: Keep a spreadsheet of your UTM campaigns
5. **Regular Review**: Check analytics weekly to adjust strategy

---

## Next Steps

1. **Today**: Read through this plan
2. **After Sanity Setup**: Come back and we'll implement Phase 1 (SEO basics)
3. **Next Session**: UTM tracking and analytics integration

---

Need help with any of these? Just ask! 🚀
