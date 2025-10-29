# Google Analytics 4 Setup Guide

Complete guide to add Google Analytics to your portfolio and track visitors.

---

## Step 1: Create Google Analytics Account

1. Go to [analytics.google.com](https://analytics.google.com)
2. Click **"Start measuring"**
3. Create an **Account**:
   - Account name: "Personal Portfolio" (or your name)
   - Configure data sharing settings (optional)
   - Click **Next**

4. Create a **Property**:
   - Property name: "Portfolio Website"
   - Reporting time zone: Your timezone
   - Currency: Your currency
   - Click **Next**

5. Business Information:
   - Industry: "Technology" or "Professional Services"
   - Business size: "Small"
   - How you'll use GA: "Examine user behavior"
   - Click **Create**

6. Accept Terms of Service

---

## Step 2: Set Up Data Stream

1. Choose platform: **Web**
2. Enter your website URL: `https://your-domain.com`
3. Stream name: "Portfolio Production"
4. Click **Create stream**

5. **Copy your Measurement ID**
   - It looks like: `G-XXXXXXXXXX`
   - You'll need this in the next step!

---

## Step 3: Add to Your Portfolio

### Option A: Using Next.js Google Analytics Package (Recommended)

1. **Install the package**:
   ```bash
   npm install @next/third-parties
   ```

2. **Add to your root layout**:

   Open `app/layout.tsx` and add:

   ```typescript
   import { GoogleAnalytics } from '@next/third-parties/google'

   export default function RootLayout({ children }) {
     return (
       <html>
         <body>
           {children}
           <GoogleAnalytics gaId="G-XXXXXXXXXX" />
         </body>
       </html>
     )
   }
   ```

   Replace `G-XXXXXXXXXX` with your actual Measurement ID.

### Option B: Using Environment Variable (More Secure)

1. **Add to `.env.local`**:
   ```
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```

2. **Create Analytics Component**:

   Create `components/analytics/google-analytics.tsx`:

   ```typescript
   'use client'

   import { GoogleAnalytics as GA } from '@next/third-parties/google'

   export function GoogleAnalytics() {
     const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

     if (!gaId) {
       console.warn('Google Analytics ID not found')
       return null
     }

     return <GA gaId={gaId} />
   }
   ```

3. **Add to root layout**:
   ```typescript
   import { GoogleAnalytics } from '@/components/analytics/google-analytics'

   export default function RootLayout({ children }) {
     return (
       <html>
         <body>
           {children}
           <GoogleAnalytics />
         </body>
       </html>
     )
   }
   ```

---

## Step 4: Add UTM Tracking (Already Set Up!)

Your portfolio already has UTM tracking utilities. To activate:

1. **Add UTM Tracker to layout**:

   Open `app/layout.tsx`:

   ```typescript
   import { UTMTracker } from '@/components/analytics/utm-tracker'
   import { GoogleAnalytics } from '@/components/analytics/google-analytics'

   export default function RootLayout({ children }) {
     return (
       <html>
         <body>
           <UTMTracker />
           {children}
           <GoogleAnalytics />
         </body>
       </html>
     )
   }
   ```

2. **That's it!** UTM parameters will now be:
   - Automatically captured from URLs
   - Stored for the session
   - Sent with all analytics events

---

## Step 5: Test Your Setup

### Test 1: Real-time Tracking

1. Go to Google Analytics
2. Navigate to **Reports** → **Realtime**
3. Open your portfolio in a new tab
4. You should see yourself as an active user!

### Test 2: UTM Parameters

1. Visit your site with UTM parameters:
   ```
   https://your-domain.com/?utm_source=twitter&utm_medium=social&utm_campaign=test
   ```

2. In Google Analytics:
   - Go to **Reports** → **Realtime**
   - Look for the traffic source (should show as "twitter / social")

### Test 3: Event Tracking (After adding events)

Check the **Realtime** → **Events** tab to see custom events firing.

---

## Step 6: Track Custom Events

Your portfolio has event tracking ready. Here's how to use it:

### Track External Links

```typescript
import { trackExternalLink } from '@/lib/analytics'

<a
  href="https://github.com/..."
  onClick={() => trackExternalLink('https://github.com/...', 'GitHub Repo')}
>
  View on GitHub
</a>
```

### Track Project Clicks

```typescript
import { trackProjectClick } from '@/lib/analytics'

<Link
  href={`/projects/${project.slug}`}
  onClick={() => trackProjectClick(project.title, project.slug)}
>
  {project.title}
</Link>
```

### Track Contact Form

```typescript
import { trackContactFormSubmit, trackContactFormSuccess } from '@/lib/analytics'

const handleSubmit = async (e) => {
  trackContactFormSubmit()

  try {
    // Your form submission logic
    await submitForm(formData)
    trackContactFormSuccess()
  } catch (error) {
    trackContactFormError(error.message)
  }
}
```

---

## Step 7: Generate UTM Tracking Links

Use the built-in utilities to create tracked links:

```typescript
import { generateSocialUrl, UTM_PRESETS } from '@/lib/analytics'

// For your Twitter bio:
const twitterUrl = generateSocialUrl(
  'https://your-domain.com',
  'twitter'
)
// Result: https://your-domain.com?utm_source=twitter&utm_medium=social

// For email signature:
const emailUrl = generateSocialUrl(
  'https://your-domain.com',
  'signature'
)

// Custom campaign:
const campaignUrl = generateSocialUrl(
  'https://your-domain.com',
  'twitter',
  'project_launch_2024'
)
```

---

## What to Track

### Essential Metrics

1. **Traffic Sources**
   - Where visitors come from
   - Which platforms drive the most traffic
   - ROI on your social media time

2. **Popular Content**
   - Most viewed projects
   - Popular blog posts
   - Time spent on pages

3. **User Behavior**
   - Navigation patterns
   - Scroll depth
   - Click behavior

4. **Conversions**
   - Contact form submissions
   - External link clicks (GitHub, live demos)
   - Social link clicks

### Key Reports to Check Weekly

1. **Realtime** → See who's on your site now
2. **Acquisition** → Where visitors come from
3. **Engagement** → What they do on your site
4. **Events** → Track specific interactions

---

## Common UTM Campaigns

Create these URLs for different channels:

### Social Media Profiles
```
Twitter Bio:   https://your-domain.com/?utm_source=twitter&utm_medium=profile
LinkedIn:      https://your-domain.com/?utm_source=linkedin&utm_medium=profile
GitHub:        https://your-domain.com/?utm_source=github&utm_medium=profile
```

### Email & Outreach
```
Newsletter:    https://your-domain.com/?utm_source=newsletter&utm_medium=email
Cold Email:    https://your-domain.com/?utm_source=outreach&utm_medium=email&utm_campaign=job_search
```

### Resume & Applications
```
Resume PDF:    https://your-domain.com/?utm_source=resume&utm_medium=pdf
```

### Content Marketing
```
Dev.to Post:   https://your-domain.com/?utm_source=devto&utm_medium=article&utm_campaign=guest_post
Medium:        https://your-domain.com/?utm_source=medium&utm_medium=article
```

---

## Troubleshooting

### Analytics Not Working?

1. **Check the Measurement ID**
   - Make sure it starts with `G-`
   - Verify it's correct in your code/env file

2. **Check Browser Extensions**
   - Ad blockers can prevent tracking
   - Try in incognito mode

3. **Check Console**
   - Look for GA errors in browser console
   - Development mode logs should show events

4. **Verify Installation**
   - Use [Google Tag Assistant](https://tagassistant.google.com/)
   - It'll tell you if GA is set up correctly

### UTM Parameters Not Showing?

1. **Check Session Storage**
   - Open browser DevTools
   - Go to Application → Session Storage
   - Look for `utm_params` key

2. **Test URL**
   - Add UTM parameters manually
   - Check if they're captured in Realtime report

---

## Privacy Considerations

### GDPR Compliance

If you have visitors from Europe:

1. **Add Cookie Consent**
   - Consider using a consent management tool
   - Only load GA after consent

2. **Update Privacy Policy**
   - Mention Google Analytics usage
   - Link to Google's privacy policy
   - Explain what data you collect

### Anonymous IP

Google Analytics 4 automatically anonymizes IPs, but you can be extra careful:

```typescript
<GoogleAnalytics
  gaId="G-XXXXXXXXXX"
  dataLayerName="dataLayer"
/>
```

---

## Next Steps

1. ✅ **Set up GA4** (15 minutes)
2. ✅ **Add to your site** (10 minutes)
3. ✅ **Test it works** (5 minutes)
4. 📊 **Create UTM links** (30 minutes)
5. 📈 **Check weekly** (ongoing)

---

## Resources

- [Google Analytics 4 Documentation](https://support.google.com/analytics/answer/9304153)
- [GA4 Event Reference](https://developers.google.com/analytics/devguides/collection/ga4/reference/events)
- [UTM Builder Tool](https://ga-dev-tools.google/campaign-url-builder/)
- [Next.js Analytics Guide](https://nextjs.org/docs/app/building-your-application/optimizing/analytics)

---

**Questions?** Come back after you've set up Sanity and we'll implement the tracking together! 🚀
