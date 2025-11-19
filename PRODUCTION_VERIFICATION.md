# Production Verification Guide

Complete checklist for verifying your production deployment at https://kazekeza.com

## 🎯 Overview

This guide helps you systematically verify that your production deployment is working correctly. Complete all sections to ensure a successful launch.

**Estimated Time**: 20-30 minutes

---

## 📋 Quick Verification

Run the automated verification script first:

```bash
npm run verify:deployment
```

This checks:
- ✅ All pages are accessible
- ✅ HTTPS is configured
- ✅ Redirects work correctly
- ✅ No critical errors

If the script passes, proceed with manual verification below.

---

## 1. Site Accessibility

### 1.1 Primary Domain

- [ ] Visit `https://kazekeza.com`
- [ ] Site loads without errors
- [ ] Page loads in under 3 seconds
- [ ] No "Site not found" errors

### 1.2 HTTPS Verification

- [ ] URL shows `https://` (not `http://`)
- [ ] Lock icon visible in address bar
- [ ] Click lock icon → Certificate is valid
- [ ] Certificate issued by Let's Encrypt
- [ ] No "Not Secure" warnings

### 1.3 Redirect Testing

Test each URL and verify it redirects correctly:

| Test URL | Expected Result | Status |
|----------|-----------------|--------|
| `http://kazekeza.com` | → `https://kazekeza.com` | [ ] |
| `https://kazekeza.com` | Loads (no redirect) | [ ] |
| `http://www.kazekeza.com` | → `https://kazekeza.com` | [ ] |
| `https://www.kazekeza.com` | → `https://kazekeza.com` | [ ] |

---

## 2. Page Functionality

### 2.1 All Pages Load

Navigate to each page and verify it loads correctly:

- [ ] **Homepage** (`/`)
  - Hero section displays
  - Featured projects show (if any)
  - Featured blog posts show (if any)
  - Animations play smoothly
  - No layout shifts

- [ ] **Projects Page** (`/projects`)
  - All projects display
  - Project cards show images
  - Tags display correctly
  - Filter/sort works (if implemented)
  - Project links work

- [ ] **Blog Page** (`/blog`)
  - All blog posts display
  - Post cards show correctly
  - Dates format properly
  - Search works (if implemented)
  - Read time displays

- [ ] **About Page** (`/about`)
  - Profile information displays
  - Profile image loads
  - Skills section shows
  - Social links work
  - Bio text displays correctly

- [ ] **Contact Page** (`/contact`)
  - Contact form displays
  - Form validation works
  - Submit button present
  - No console errors

- [ ] **Data Viz Page** (`/data-viz`)
  - Visualizations load
  - Charts render correctly
  - Interactive elements work
  - No rendering errors

- [ ] **Sanity Studio** (`/studio`)
  - Studio loads
  - Login prompt appears (if not logged in)
  - Can access after login
  - All content types visible

### 2.2 Individual Content Pages

- [ ] **Project Detail Pages** (`/projects/[slug]`)
  - Pick a project and click it
  - Detail page loads
  - Images display
  - Content renders correctly
  - Back navigation works

- [ ] **Blog Post Pages** (`/blog/[slug]`)
  - Pick a blog post and click it
  - Post content displays
  - Rich text renders correctly
  - Images load
  - Code blocks format properly (if any)

---

## 3. Content Verification

### 3.1 Sanity Content Loading

- [ ] Homepage shows real content (not placeholders)
- [ ] Projects load from Sanity
- [ ] Blog posts load from Sanity
- [ ] About page shows your information
- [ ] No "[YOUR NAME]" or placeholder text visible
- [ ] No "Lorem ipsum" text visible

### 3.2 Images

- [ ] All images load correctly
- [ ] No broken image icons
- [ ] Images are optimized (not huge file sizes)
- [ ] Alt text present (check with screen reader or inspect)
- [ ] Profile image displays on About page
- [ ] Project images display correctly
- [ ] Blog post images load

### 3.3 Links

Test all external links:

- [ ] **Social Links** (About page)
  - GitHub link works
  - LinkedIn link works
  - Twitter/X link works
  - Email link opens mail client
  - Other social links work

- [ ] **Project Links**
  - Live demo links work
  - GitHub repo links work
  - External links open in new tab

- [ ] **Navigation Links**
  - All nav menu items work
  - Footer links work
  - Logo links to homepage

---

## 4. Console Error Check

### 4.1 Browser Console

1. Open DevTools (F12 or Cmd+Option+I)
2. Go to **Console** tab
3. Refresh the page
4. Check for errors:

- [ ] No red error messages
- [ ] No 404 errors (missing resources)
- [ ] No CORS errors
- [ ] No Sanity connection errors
- [ ] Warnings are acceptable (yellow)

**Common Acceptable Warnings**:
- React hydration warnings (if minor)
- Third-party script warnings
- Analytics warnings

**Unacceptable Errors**:
- ❌ "Failed to fetch"
- ❌ "Cannot read property of undefined"
- ❌ "Network error"
- ❌ "404 Not Found"

### 4.2 Network Tab

1. Open DevTools → **Network** tab
2. Refresh the page
3. Check for issues:

- [ ] All requests return 200 or 304 status
- [ ] No 404 errors (missing files)
- [ ] No 500 errors (server errors)
- [ ] Images load successfully
- [ ] Sanity API requests succeed

---

## 5. Functionality Testing

### 5.1 Theme Toggle

- [ ] Theme toggle button visible
- [ ] Click to switch to dark mode
- [ ] Dark mode applies correctly
- [ ] Click to switch to light mode
- [ ] Light mode applies correctly
- [ ] Theme persists on page refresh

### 5.2 Navigation

- [ ] Desktop navigation works
- [ ] Mobile menu button visible on small screens
- [ ] Mobile menu opens/closes
- [ ] All menu items clickable
- [ ] Active page highlighted (if implemented)

### 5.3 Animations

- [ ] Page transitions smooth
- [ ] Scroll animations trigger
- [ ] Hover effects work
- [ ] Loading animations display
- [ ] No janky or stuttering animations
- [ ] Animations respect reduced motion preference

### 5.4 Forms

- [ ] Contact form displays
- [ ] Required field validation works
- [ ] Email validation works
- [ ] Submit button enabled/disabled correctly
- [ ] Error messages display properly
- [ ] Success message shows (if backend connected)

### 5.5 Search/Filter (if implemented)

- [ ] Blog search works
- [ ] Project filter works
- [ ] Results update correctly
- [ ] Clear filter works
- [ ] No results message displays when appropriate

---

## 6. Mobile Testing

### 6.1 Responsive Design

Test on actual mobile device or use DevTools device emulation:

**Devices to Test**:
- [ ] iPhone (iOS Safari)
- [ ] Android phone (Chrome)
- [ ] Tablet (iPad or Android)

**Checks**:
- [ ] Layout adapts to screen size
- [ ] Text is readable (not too small)
- [ ] Images scale correctly
- [ ] No horizontal scrolling
- [ ] Touch targets are large enough (44px minimum)
- [ ] Mobile menu works
- [ ] Forms are usable on mobile

### 6.2 Mobile Performance

- [ ] Pages load quickly on mobile
- [ ] Animations perform well
- [ ] No lag when scrolling
- [ ] Images load progressively
- [ ] Site feels responsive

---

## 7. Performance Testing

### 7.1 Lighthouse Audit

1. Open Chrome DevTools (F12)
2. Go to **Lighthouse** tab
3. Select **Desktop** mode
4. Check all categories
5. Click **"Analyze page load"**

**Target Scores**:
- [ ] Performance: 80+ (green)
- [ ] Accessibility: 95+ (green)
- [ ] Best Practices: 90+ (green)
- [ ] SEO: 95+ (green)

**If scores are low**:
- Review Lighthouse suggestions
- Focus on Performance and Accessibility first
- Document issues for future optimization

### 7.2 Core Web Vitals

Check these metrics in Lighthouse report:

- [ ] **LCP** (Largest Contentful Paint): < 2.5s
- [ ] **FID** (First Input Delay): < 100ms
- [ ] **CLS** (Cumulative Layout Shift): < 0.1

### 7.3 Page Load Speed

Test with [WebPageTest](https://www.webpagetest.org/):

1. Enter `https://kazekeza.com`
2. Select test location (closest to target audience)
3. Run test
4. Review results:

- [ ] First Contentful Paint < 1.8s
- [ ] Time to Interactive < 3.8s
- [ ] Total page size < 3MB
- [ ] Number of requests < 50

---

## 8. SEO Verification

### 8.1 Meta Tags

View page source (Ctrl+U or Cmd+Option+U) and verify:

- [ ] `<title>` tag present and descriptive
- [ ] `<meta name="description">` present
- [ ] Open Graph tags present (`og:title`, `og:description`, `og:image`)
- [ ] Twitter Card tags present
- [ ] Canonical URL set correctly

### 8.2 Structured Data

1. Go to [Google Rich Results Test](https://search.google.com/test/rich-results)
2. Enter `https://kazekeza.com`
3. Run test
4. Verify:

- [ ] Structured data detected
- [ ] No errors in structured data
- [ ] Person schema present (for About page)

### 8.3 Sitemap & Robots

- [ ] Visit `https://kazekeza.com/sitemap.xml`
- [ ] Sitemap loads and shows all pages
- [ ] Visit `https://kazekeza.com/robots.txt`
- [ ] Robots.txt loads correctly

---

## 9. Accessibility Testing

### 9.1 Automated Testing

Use [axe DevTools](https://www.deque.com/axe/devtools/) browser extension:

1. Install axe DevTools extension
2. Open extension on your site
3. Click "Scan ALL of my page"
4. Review results:

- [ ] No critical issues
- [ ] No serious issues
- [ ] Minor issues documented for future fix

### 9.2 Keyboard Navigation

Test without using mouse:

- [ ] Tab through all interactive elements
- [ ] Focus indicators visible
- [ ] Can access all navigation items
- [ ] Can open/close mobile menu
- [ ] Can submit forms
- [ ] Can activate buttons
- [ ] Skip to content link works

### 9.3 Screen Reader (Basic Test)

Test with screen reader (NVDA on Windows, VoiceOver on Mac):

- [ ] Page title announced
- [ ] Headings announced correctly
- [ ] Links have descriptive text
- [ ] Images have alt text
- [ ] Form labels associated correctly

---

## 10. Cross-Browser Testing

Test on multiple browsers:

### Desktop Browsers

- [ ] **Chrome** (latest)
  - Site loads correctly
  - All features work
  - No console errors

- [ ] **Firefox** (latest)
  - Site loads correctly
  - All features work
  - No console errors

- [ ] **Safari** (latest)
  - Site loads correctly
  - All features work
  - No console errors

- [ ] **Edge** (latest)
  - Site loads correctly
  - All features work
  - No console errors

### Mobile Browsers

- [ ] **iOS Safari**
  - Site loads correctly
  - Touch interactions work
  - No layout issues

- [ ] **Android Chrome**
  - Site loads correctly
  - Touch interactions work
  - No layout issues

---

## 11. Security Checks

### 11.1 HTTPS Configuration

- [ ] All pages load over HTTPS
- [ ] No mixed content warnings
- [ ] SSL certificate valid
- [ ] Certificate not expired
- [ ] Strong encryption (TLS 1.2+)

### 11.2 Security Headers

Check headers at [securityheaders.com](https://securityheaders.com/):

1. Enter `https://kazekeza.com`
2. Scan site
3. Review score:

- [ ] Grade B or higher
- [ ] X-Frame-Options present
- [ ] X-Content-Type-Options present
- [ ] Referrer-Policy present

---

## 12. Analytics Verification

### 12.1 Vercel Analytics (if enabled)

- [ ] Analytics script loads
- [ ] No console errors from analytics
- [ ] Can view data in Vercel dashboard

### 12.2 Netlify Analytics (if enabled)

- [ ] Analytics enabled in Netlify
- [ ] Data appears in Netlify dashboard

---

## 🚨 Common Issues & Solutions

### Issue: Site loads but shows no content

**Solution**:
1. Check browser console for errors
2. Verify environment variables in Netlify
3. Test Sanity connection: `npm run test:sanity`
4. Check Sanity project ID is correct

### Issue: Images not loading

**Solution**:
1. Check Sanity image URLs in console
2. Verify NEXT_PUBLIC_SANITY_PROJECT_ID is set
3. Check image optimization settings
4. Verify images exist in Sanity

### Issue: Slow page load

**Solution**:
1. Run Lighthouse audit
2. Check image sizes (should be optimized)
3. Review Network tab for large files
4. Consider lazy loading more content

### Issue: Console errors

**Solution**:
1. Read error message carefully
2. Check if it's from your code or third-party
3. Fix critical errors first
4. Document warnings for future fix

---

## ✅ Final Checklist

Before considering deployment complete:

### Critical (Must Pass)
- [ ] Site loads at https://kazekeza.com
- [ ] HTTPS working correctly
- [ ] All main pages accessible
- [ ] Content loads from Sanity
- [ ] No critical console errors
- [ ] Mobile responsive
- [ ] Forms work correctly

### Important (Should Pass)
- [ ] Lighthouse Performance 80+
- [ ] All links work
- [ ] Images optimized
- [ ] Theme toggle works
- [ ] Animations smooth
- [ ] Cross-browser compatible

### Nice to Have (Can Fix Later)
- [ ] Lighthouse scores 95+
- [ ] All accessibility issues resolved
- [ ] Perfect SEO score
- [ ] All warnings cleared

---

## 📊 Verification Report Template

Use this template to document your verification:

```
# Production Verification Report

**Date**: _____________
**Verified By**: _____________
**Site URL**: https://kazekeza.com

## Test Results

### Accessibility
- Site loads: ✅ / ❌
- HTTPS working: ✅ / ❌
- All pages load: ✅ / ❌
- Content from Sanity: ✅ / ❌

### Performance
- Lighthouse Performance: ___/100
- Lighthouse Accessibility: ___/100
- Lighthouse Best Practices: ___/100
- Lighthouse SEO: ___/100

### Functionality
- Navigation: ✅ / ❌
- Theme toggle: ✅ / ❌
- Forms: ✅ / ❌
- Mobile responsive: ✅ / ❌

### Issues Found
1. [Issue description]
2. [Issue description]

### Action Items
1. [Action needed]
2. [Action needed]

## Overall Status
[ ] Ready for launch
[ ] Needs fixes before launch
[ ] Critical issues found

**Notes**: _____________
```

---

## 🎉 Launch Checklist

Once all verification passes:

- [ ] All critical checks passed
- [ ] Issues documented
- [ ] Team notified
- [ ] README updated with live URL
- [ ] Social media announcement prepared (optional)
- [ ] Monitoring set up
- [ ] Backup plan ready (rollback procedure)

---

## 📚 Resources

- [Lighthouse Documentation](https://developers.google.com/web/tools/lighthouse)
- [WebPageTest](https://www.webpagetest.org/)
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [Security Headers](https://securityheaders.com/)
- [Google Rich Results Test](https://search.google.com/test/rich-results)

---

**Verification Completed**: [ ] Yes [ ] No

**Ready for Launch**: [ ] Yes [ ] No

**Launch Date**: _____________
