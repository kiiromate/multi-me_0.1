# Custom Domain Configuration Guide for kazekeza.com

This guide walks you through connecting your custom domain `kazekeza.com` to your Netlify deployment.

## Prerequisites

- ✅ Netlify account with deployed site
- ✅ Domain registered at Porkbun (kazekeza.com)
- ✅ Access to Porkbun DNS management
- ✅ Access to Netlify dashboard

## Step 1: Add Custom Domain in Netlify

1. **Log in to Netlify Dashboard**
   - Go to https://app.netlify.com
   - Select your KAZE KEZA portfolio site

2. **Navigate to Domain Settings**
   - Click on "Domain settings" in the site menu
   - Or go to: Site settings → Domain management

3. **Add Custom Domain**
   - Click "Add custom domain" or "Add domain alias"
   - Enter: `kazekeza.com`
   - Click "Verify"
   - Netlify will confirm you own the domain
   - Click "Add domain"

4. **Add www Subdomain (Optional but Recommended)**
   - Click "Add domain alias" again
   - Enter: `www.kazekeza.com`
   - Click "Add domain"

5. **Note Netlify's DNS Information**
   - Netlify will provide you with DNS records to configure
   - You'll see something like:
     - **Load balancer IP**: `75.2.60.5` (example - use the actual IP shown)
     - **Netlify subdomain**: `your-site-name.netlify.app`

## Step 2: Configure DNS Records at Porkbun

1. **Log in to Porkbun**
   - Go to https://porkbun.com/account/login
   - Log in with your credentials

2. **Access DNS Management**
   - Go to "Domain Management"
   - Find `kazekeza.com` in your domain list
   - Click "DNS" or "Manage DNS"

3. **Configure A Record (Apex Domain)**
   - Click "Add" or "Add Record"
   - Set the following:
     - **Type**: A
     - **Host**: @ (or leave blank for root domain)
     - **Answer**: [Netlify Load Balancer IP from Step 1]
     - **TTL**: 600 (10 minutes) or 3600 (1 hour)
   - Click "Add" or "Save"

4. **Configure CNAME Record (www Subdomain)**
   - Click "Add" or "Add Record"
   - Set the following:
     - **Type**: CNAME
     - **Host**: www
     - **Answer**: [your-site-name].netlify.app (from Step 1)
     - **TTL**: 600 or 3600
   - Click "Add" or "Save"

5. **Remove Conflicting Records (If Any)**
   - Check for existing A or CNAME records for @ and www
   - Delete any conflicting records that point elsewhere
   - Keep only the new Netlify records

### Example DNS Configuration

```
Type    Host    Answer                          TTL
----    ----    ------                          ---
A       @       75.2.60.5                       600
CNAME   www     your-site-name.netlify.app      600
```

## Step 3: Wait for DNS Propagation

DNS changes can take time to propagate globally:

- **Minimum**: 10-30 minutes
- **Typical**: 1-4 hours
- **Maximum**: 24-48 hours (rare)

### Check DNS Propagation

Use these tools to verify DNS propagation:

1. **Command Line (Windows)**
   ```cmd
   nslookup kazekeza.com
   nslookup www.kazekeza.com
   ```

2. **Command Line (Alternative)**
   ```cmd
   ping kazekeza.com
   ping www.kazekeza.com
   ```

3. **Online Tools**
   - https://www.whatsmydns.net/#A/kazekeza.com
   - https://dnschecker.org/#A/kazekeza.com
   - https://mxtoolbox.com/SuperTool.aspx?action=a%3akazekeza.com

### What to Look For

- A record for `kazekeza.com` should point to Netlify's IP
- CNAME for `www.kazekeza.com` should point to your Netlify subdomain
- Multiple global locations should show the same results

## Step 4: Enable HTTPS in Netlify

Once DNS propagation is complete:

1. **Return to Netlify Domain Settings**
   - Go back to your site's Domain settings
   - Netlify should now show "DNS verification successful"

2. **Provision SSL Certificate**
   - Netlify automatically provisions a Let's Encrypt SSL certificate
   - This happens automatically once DNS is verified
   - Look for "HTTPS" section in Domain settings
   - Status should change from "Waiting for DNS" to "Certificate provisioned"

3. **Enable Force HTTPS**
   - In the "HTTPS" section, find "Force HTTPS"
   - Toggle it ON
   - This redirects all HTTP traffic to HTTPS

4. **Verify HTTPS Settings**
   - Certificate should show as "Active"
   - Force HTTPS should be "Enabled"
   - Certificate should auto-renew (Let's Encrypt renews every 90 days)

## Step 5: Verify Domain Configuration

### Test Your Domain

1. **Test HTTP Redirect**
   - Visit: http://kazekeza.com
   - Should redirect to: https://kazekeza.com

2. **Test HTTPS**
   - Visit: https://kazekeza.com
   - Should load with valid SSL certificate (padlock icon)

3. **Test www Subdomain**
   - Visit: https://www.kazekeza.com
   - Should redirect to: https://kazekeza.com (or load if you prefer www)

4. **Test SSL Certificate**
   - Click the padlock icon in browser
   - Verify certificate is issued by Let's Encrypt
   - Check expiration date (should be ~90 days from now)

### Browser Testing

Test in multiple browsers:
- Chrome/Edge
- Firefox
- Safari (if available)
- Mobile browsers

### Check for Issues

Common issues to verify:

- ✅ No mixed content warnings (HTTP resources on HTTPS page)
- ✅ No certificate errors
- ✅ All assets load correctly
- ✅ Sanity images load from CDN
- ✅ Animations work properly
- ✅ No console errors

## Troubleshooting

### DNS Not Propagating

**Problem**: DNS changes not visible after several hours

**Solutions**:
1. Verify DNS records are correct in Porkbun
2. Check for typos in domain name or IP address
3. Ensure no conflicting DNS records exist
4. Try flushing your local DNS cache:
   ```cmd
   ipconfig /flushdns
   ```
5. Try a different DNS server (Google DNS: 8.8.8.8)

### SSL Certificate Not Provisioning

**Problem**: Netlify can't provision SSL certificate

**Solutions**:
1. Ensure DNS is fully propagated (wait longer)
2. Verify A record points to correct Netlify IP
3. Check that domain is verified in Netlify
4. Try removing and re-adding the domain
5. Contact Netlify support if issue persists

### Mixed Content Warnings

**Problem**: Browser shows "Not Secure" despite HTTPS

**Solutions**:
1. Check for HTTP resources (images, scripts) in your code
2. Ensure all Sanity images use HTTPS URLs
3. Update any hardcoded HTTP URLs to HTTPS
4. Check browser console for specific mixed content errors

### Domain Shows Netlify 404

**Problem**: Domain loads but shows Netlify 404 page

**Solutions**:
1. Verify build completed successfully in Netlify
2. Check that publish directory is set to `.next`
3. Verify redirect rules in `netlify.toml`
4. Try triggering a new deployment

## Post-Configuration Checklist

After domain is live, verify:

- [ ] https://kazekeza.com loads correctly
- [ ] https://www.kazekeza.com redirects or loads
- [ ] http://kazekeza.com redirects to HTTPS
- [ ] SSL certificate is valid and trusted
- [ ] All pages load (home, projects, blog, about, contact)
- [ ] All images load from Sanity CDN
- [ ] Animations work properly
- [ ] No console errors
- [ ] Mobile responsive design works
- [ ] Contact form submits (if backend connected)
- [ ] Lighthouse scores are acceptable (Performance 80+)

## Environment Variables

Ensure your `.env.local` has the correct site URL:

```env
NEXT_PUBLIC_SITE_URL=https://kazekeza.com
```

This is already configured in your local environment and should be set in Netlify's environment variables as well.

## Next Steps

After domain configuration is complete:

1. Update social media profiles with new URL
2. Update GitHub repository description
3. Submit sitemap to Google Search Console
4. Set up Google Analytics (if desired)
5. Monitor site performance with Vercel Analytics
6. Consider setting up email forwarding for contact@kazekeza.com

## Support Resources

- **Netlify Docs**: https://docs.netlify.com/domains-https/custom-domains/
- **Porkbun Support**: https://kb.porkbun.com/
- **Let's Encrypt**: https://letsencrypt.org/
- **DNS Checker**: https://www.whatsmydns.net/

---

**Note**: This is a manual configuration task that requires access to external dashboards. The code-level configuration (environment variables, Netlify config) is already complete in your repository.
