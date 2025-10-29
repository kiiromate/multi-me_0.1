# UTM Tracking Quick Reference

Copy-paste UTM URLs for your different channels.

---

## 🔗 Standard Links

Replace `https://your-domain.com` with your actual domain.

### Social Media Profiles

```
Twitter Bio:
https://your-domain.com/?utm_source=twitter&utm_medium=profile

LinkedIn About:
https://your-domain.com/?utm_source=linkedin&utm_medium=profile

GitHub README:
https://your-domain.com/?utm_source=github&utm_medium=profile

Instagram Bio:
https://your-domain.com/?utm_source=instagram&utm_medium=profile

YouTube About:
https://your-domain.com/?utm_source=youtube&utm_medium=profile
```

### Email Communications

```
Email Signature:
https://your-domain.com/?utm_source=email&utm_medium=signature

Newsletter Link:
https://your-domain.com/?utm_source=newsletter&utm_medium=email

Cold Outreach:
https://your-domain.com/?utm_source=outreach&utm_medium=email&utm_campaign=job_search
```

### Resume & Applications

```
Resume PDF:
https://your-domain.com/?utm_source=resume&utm_medium=pdf

Job Application:
https://your-domain.com/?utm_source=application&utm_medium=job_board&utm_campaign=[company_name]
```

### Content Marketing

```
Dev.to Article:
https://your-domain.com/?utm_source=devto&utm_medium=article&utm_campaign=[article_title]

Medium Post:
https://your-domain.com/?utm_source=medium&utm_medium=article&utm_campaign=[article_title]

Guest Blog Post:
https://your-domain.com/?utm_source=[blog_name]&utm_medium=guest_post

Hashnode Article:
https://your-domain.com/?utm_source=hashnode&utm_medium=article
```

---

## 📱 Sharing Projects

When sharing a specific project on social media:

```
Twitter Project Share:
https://your-domain.com/projects/[project-slug]?utm_source=twitter&utm_medium=social&utm_campaign=project_[project_name]

LinkedIn Project Share:
https://your-domain.com/projects/[project-slug]?utm_source=linkedin&utm_medium=social&utm_campaign=project_[project_name]

Reddit/HackerNews:
https://your-domain.com/projects/[project-slug]?utm_source=reddit&utm_medium=community&utm_campaign=project_[project_name]
```

---

## 📝 Sharing Blog Posts

```
Twitter Blog Share:
https://your-domain.com/blog/[post-slug]?utm_source=twitter&utm_medium=social&utm_campaign=blog_[post_title]

LinkedIn Blog Share:
https://your-domain.com/blog/[post-slug]?utm_source=linkedin&utm_medium=social&utm_campaign=blog_[post_title]

Dev.to Cross-Post:
https://your-domain.com/blog/[post-slug]?utm_source=devto&utm_medium=crosspost
```

---

## 🎯 Campaign Templates

Use these for specific campaigns:

### Job Search Campaign

```
All job-related links (applications, networking):
?utm_campaign=job_search_2024&utm_medium=[channel]&utm_source=[platform]

Examples:
- LinkedIn message: &utm_source=linkedin&utm_medium=direct_message&utm_campaign=job_search_2024
- Indeed application: &utm_source=indeed&utm_medium=application&utm_campaign=job_search_2024
```

### Product Launch

```
When launching a new project:
?utm_campaign=launch_[project_name]&utm_medium=social&utm_source=[platform]

Examples:
- Twitter: &utm_source=twitter&utm_medium=social&utm_campaign=launch_my_project
- ProductHunt: &utm_source=producthunt&utm_medium=listing&utm_campaign=launch_my_project
```

### Conference/Event

```
When attending a conference:
?utm_campaign=[event_name]_2024&utm_medium=event&utm_source=[platform]

Examples:
- Event bio: &utm_source=conference&utm_medium=bio&utm_campaign=reactconf_2024
- Slide deck: &utm_source=slides&utm_medium=presentation&utm_campaign=reactconf_2024
```

---

## 🛠️ UTM Builder Tool

Use this format to build custom URLs:

```
BASE_URL?utm_source=[SOURCE]&utm_medium=[MEDIUM]&utm_campaign=[CAMPAIGN]

Where:
- SOURCE = Where the traffic comes from (twitter, linkedin, newsletter)
- MEDIUM = Type of marketing (social, email, referral, cpc)
- CAMPAIGN = Specific campaign name (project_launch, job_search)
```

**Optional parameters:**
- `utm_term` = Keywords for paid search
- `utm_content` = For A/B testing different links

---

## 📊 Tracking Sheet Template

Keep a spreadsheet to track your campaigns:

| Date | Channel | URL | Campaign | Purpose | Notes |
|------|---------|-----|----------|---------|-------|
| 2024-01-15 | Twitter | your-domain.com/?utm... | job_search | Applied to TechCorp | 50 clicks |
| 2024-01-16 | LinkedIn | your-domain.com/?utm... | project_launch | Shared new project | 120 clicks |

---

## 🎨 Code Usage Examples

### In Your Components

```typescript
import { generateSocialUrl } from '@/lib/analytics'

// Generate a Twitter share link
const twitterUrl = generateSocialUrl(
  'https://your-domain.com/projects/my-project',
  'twitter',
  'project_launch'
)

// Use in a share button
<a href={twitterUrl} target="_blank">
  Share on Twitter
</a>
```

### Track When Someone Clicks

```typescript
import { trackExternalLink } from '@/lib/analytics'

<a
  href={projectUrl}
  onClick={() => trackExternalLink(projectUrl, 'Project Demo')}
>
  View Live Demo
</a>
```

---

## ✅ Best Practices

1. **Be Consistent**
   - Always use lowercase
   - Use underscores, not spaces
   - Example: `job_search_2024` not `Job Search 2024`

2. **Keep It Simple**
   - Source: Where (twitter, linkedin, resume)
   - Medium: What (social, email, pdf)
   - Campaign: Why (project_launch, job_search)

3. **Document Everything**
   - Keep a spreadsheet of your UTM links
   - Note what worked and what didn't
   - Track conversion rates

4. **Test Before Sharing**
   - Click your UTM links
   - Check Google Analytics Real-time
   - Verify they show up correctly

5. **Update Regularly**
   - Change campaign names for new initiatives
   - Update links in your profiles
   - Remove old campaigns

---

## 🔍 Checking Your Data

In Google Analytics 4:

1. **Traffic Sources**
   - Reports → Acquisition → Traffic acquisition
   - See breakdown by source/medium

2. **Campaigns**
   - Reports → Acquisition → User acquisition
   - Filter by campaign name

3. **Real-time**
   - Reports → Realtime
   - See active users and their source

---

## 📞 Need Help?

Come back after Sanity setup and we'll:
- Implement event tracking on buttons and links
- Set up conversion goals
- Create custom dashboards
- Optimize your tracking strategy

---

Happy tracking! 📊
