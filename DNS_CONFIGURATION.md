# DNS Configuration Guide

Complete guide for connecting the custom domain **kazekeza.com** to your Netlify deployment.

## 🌐 Overview

This guide covers:
1. Adding the domain in Netlify
2. Configuring DNS records at Porkbun
3. Enabling HTTPS
4. Verifying the setup

**Estimated Time**: 30-60 minutes (including DNS propagation)

---

## 📋 Prerequisites

- [ ] Netlify site deployed and working
- [ ] Domain kazekeza.com purchased at Porkbun
- [ ] Access to Porkbun account
- [ ] Netlify site name noted (e.g., `kaze-portfolio-123.netlify.app`)

---

## Step 1: Add Domain in Netlify

### 1.1 Navigate to Domain Settings

1. Log in to [Netlify](https://app.netlify.com/)
2. Select your portfolio site
3. Go to **Domain management** (in the left sidebar)

### 1.2 Add Custom Domain

1. Click **"Add a domain"** or **"Add custom domain"**
2. Enter: `kazekeza.com`
3. Click **"Verify"**
4. Netlify will check if you own the domain
5. Click **"Add domain"** to confirm

### 1.3 Note Your Netlify Information

You'll need this for DNS configuration:

- **Netlify Site Name**: `[your-site-name].netlify.app`
- **Netlify Load Balancer IP**: Usually `75.2.60.5` (check Netlify docs for current IP)

Netlify will show you the DNS records you need to add. Keep this page open.

---

## Step 2: Choose DNS Configuration Method

You have two options:

### Option A: Netlify DNS (Recommended)

**Pros**:
- ✅ Easier setup
- ✅ Automatic SSL
- ✅ Faster propagation
- ✅ Netlify manages everything

**Cons**:
- ❌ Less control over DNS
- ❌ Tied to Netlify

**Best for**: Most users, especially if you don't need advanced DNS features

### Option B: External DNS (Porkbun)

**Pros**:
- ✅ Full DNS control
- ✅ Can use Porkbun features
- ✅ Not tied to Netlify

**Cons**:
- ❌ More complex setup
- ❌ Manual DNS record management
- ❌ Slower propagation

**Best for**: Users who need advanced DNS features or want to keep DNS at Porkbun

---

## Option A: Netlify DNS Setup

### Step 1: Enable Netlify DNS

1. In Netlify **Domain management**, find your domain
2. Click **"Set up Netlify DNS"** or **"Use Netlify DNS"**
3. Netlify will show you nameservers (usually 4 nameservers)

Example nameservers:
```
dns1.p01.nsone.net
dns2.p01.nsone.net
dns3.p01.nsone.net
dns4.p01.nsone.net
```

**Important**: Copy these nameservers - you'll need them for Porkbun.

### Step 2: Update Nameservers at Porkbun

1. Log in to [Porkbun](https://porkbun.com/account/domains)
2. Find **kazekeza.com** in your domain list
3. Click on the domain name
4. Go to **"Nameservers"** section
5. Select **"Use Custom Nameservers"**
6. Enter the 4 Netlify nameservers (one per field)
7. Click **"Update Nameservers"**

### Step 3: Wait for Propagation

- Nameserver changes take 1-24 hours (usually 1-4 hours)
- Check status at [whatsmydns.net](https://www.whatsmydns.net/)
- Enter `kazekeza.com` and select "NS" record type

### Step 4: Verify in Netlify

1. Return to Netlify **Domain management**
2. Netlify will automatically detect when nameservers are updated
3. Once detected, Netlify will configure all DNS records
4. SSL certificate will be provisioned automatically

**Done!** Skip to "Step 3: Enable HTTPS" below.

---

## Option B: External DNS Setup (Porkbun)

### Step 1: Get Netlify DNS Information

In Netlify **Domain management**, note:

1. **Primary domain**: `kazekeza.com`
2. **Netlify site**: `[your-site-name].netlify.app`
3. **Load balancer IP**: Check Netlify docs or use `75.2.60.5`

### Step 2: Configure DNS at Porkbun

1. Log in to [Porkbun](https://porkbun.com/account/domainsSpeedy)
2. Find **kazekeza.com**
3. Click **"DNS"** or **"Manage DNS"**

### Step 3: Add DNS Records

Delete any existing A or CNAME records for `@` and `www`, then add:

#### Record 1: Apex Domain (A Record)

| Field | Value |
|-------|-------|
| **Type** | A |
| **Host** | @ |
| **Answer** | `75.2.60.5` |
| **TTL** | 600 |

**Note**: Check [Netlify's current load balancer IP](https://docs.netlify.com/domains-https/custom-domains/configure-external-dns/#configure-an-apex-domain) if `75.2.60.5` doesn't work.

#### Record 2: WWW Subdomain (CNAME Record)

| Field | Value |
|-------|-------|
| **Type** | CNAME |
| **Host** | www |
| **Answer** | `[your-site-name].netlify.app` |
| **TTL** | 600 |

**Important**: Replace `[your-site-name]` with your actual Netlify site name.

### Step 4: Optional - Add AAAA Record (IPv6)

For IPv6 support, add:

| Field | Value |
|-------|-------|
| **Type** | AAAA |
| **Host** | @ |
| **Answer** | Check Netlify docs for current IPv6 |
| **TTL** | 600 |

### Step 5: Save DNS Records

1. Click **"Add"** or **"Save"** for each record
2. Verify all records are listed correctly
3. Note the time - DNS propagation starts now

### Step 6: Wait for DNS Propagation

**Typical Timeline**:
- 5-15 minutes: Some DNS servers updated
- 30-60 minutes: Most DNS servers updated
- 24-48 hours: All DNS servers updated (rare)

**Check Propagation**:
1. Go to [whatsmydns.net](https://www.whatsmydns.net/)
2. Enter `kazekeza.com`
3. Select "A" record type
4. Should show `75.2.60.5` globally

**Test Locally**:
```bash
# Check A record
nslookup kazekeza.com

# Check CNAME record
nslookup www.kazekeza.com

# Or use dig (Mac/Linux)
dig kazekeza.com
dig www.kazekeza.com
```

---

## Step 3: Enable HTTPS

### 3.1 Wait for SSL Certificate

1. Return to Netlify **Domain management**
2. Once DNS propagates, Netlify automatically provisions SSL
3. This uses Let's Encrypt (free, automatic)
4. Usually takes 1-5 minutes after DNS propagates

**Status Indicators**:
- ⏳ "Waiting for DNS propagation"
- ⏳ "Provisioning certificate"
- ✅ "Certificate active"

### 3.2 Enable Force HTTPS

Once SSL is active:

1. In Netlify **Domain management**
2. Find **"HTTPS"** section
3. Enable **"Force HTTPS"**
4. This redirects all HTTP traffic to HTTPS

### 3.3 Enable HSTS (Optional but Recommended)

1. In **"HTTPS"** section
2. Enable **"HSTS"** (HTTP Strict Transport Security)
3. This tells browsers to always use HTTPS

**Warning**: Only enable HSTS after confirming HTTPS works correctly.

---

## Step 4: Configure WWW Redirect

### 4.1 Set Primary Domain

1. In Netlify **Domain management**
2. Under **"Custom domains"**
3. You should see both:
   - `kazekeza.com`
   - `www.kazekeza.com`

4. Set **primary domain** to `kazekeza.com` (without www)
5. Netlify will automatically redirect `www` to non-www

### 4.2 Test Redirects

Test these URLs in your browser:

- `http://kazekeza.com` → Should redirect to `https://kazekeza.com`
- `https://www.kazekeza.com` → Should redirect to `https://kazekeza.com`
- `http://www.kazekeza.com` → Should redirect to `https://kazekeza.com`

All should end up at: `https://kazekeza.com`

---

## Step 5: Verify Configuration

### 5.1 DNS Verification

```bash
# Check A record
nslookup kazekeza.com
# Should return: 75.2.60.5

# Check CNAME record
nslookup www.kazekeza.com
# Should return: [your-site].netlify.app

# Check nameservers (if using Netlify DNS)
nslookup -type=NS kazekeza.com
# Should return: Netlify nameservers
```

### 5.2 SSL Verification

1. Visit `https://kazekeza.com`
2. Click the lock icon in address bar
3. Verify certificate is valid
4. Check certificate is issued by Let's Encrypt
5. Verify expiration date (should be ~3 months from now)

### 5.3 Redirect Verification

Test all these URLs:

| URL | Expected Result |
|-----|-----------------|
| `http://kazekeza.com` | Redirect to `https://kazekeza.com` |
| `https://kazekeza.com` | Load site (no redirect) |
| `http://www.kazekeza.com` | Redirect to `https://kazekeza.com` |
| `https://www.kazekeza.com` | Redirect to `https://kazekeza.com` |

### 5.4 Content Verification

1. Visit `https://kazekeza.com`
2. Verify site loads correctly
3. Check all pages work
4. Verify content from Sanity displays
5. Check browser console for errors

---

## 🚨 Troubleshooting

### "Domain not found" or "Site not found"

**Cause**: DNS not propagated yet

**Solution**:
1. Wait 30-60 minutes
2. Check DNS propagation at whatsmydns.net
3. Clear browser cache
4. Try incognito/private browsing mode

### "Your connection is not private" SSL error

**Cause**: SSL certificate not provisioned yet

**Solution**:
1. Wait for DNS to fully propagate
2. Check Netlify domain settings for SSL status
3. If stuck, try "Renew certificate" in Netlify
4. May take up to 24 hours in rare cases

### WWW not redirecting

**Cause**: CNAME record not set or primary domain not configured

**Solution**:
1. Verify CNAME record exists at Porkbun
2. Check primary domain is set in Netlify
3. Wait for DNS propagation
4. Clear browser cache

### Mixed content warnings

**Cause**: Some resources loading over HTTP

**Solution**:
1. Check browser console for specific URLs
2. Update any hardcoded HTTP URLs to HTTPS
3. Ensure all images use HTTPS
4. Check Sanity image URLs

### DNS propagation taking too long

**Cause**: DNS caching or incorrect records

**Solution**:
1. Verify DNS records are correct at Porkbun
2. Check for typos in domain name
3. Try flushing local DNS cache:
   ```bash
   # Windows
   ipconfig /flushdns
   
   # Mac
   sudo dscacheutil -flushcache
   
   # Linux
   sudo systemd-resolve --flush-caches
   ```
4. Try different network (mobile data vs WiFi)

---

## 📊 DNS Propagation Checker

Use these tools to check DNS propagation:

1. **whatsmydns.net** - Global DNS checker
   - Enter: `kazekeza.com`
   - Check: A, CNAME, NS records

2. **dnschecker.org** - Alternative DNS checker
   - More detailed information
   - Shows propagation percentage

3. **Command Line**:
   ```bash
   # Check from Google DNS
   nslookup kazekeza.com 8.8.8.8
   
   # Check from Cloudflare DNS
   nslookup kazekeza.com 1.1.1.1
   ```

---

## 🎯 Configuration Checklist

Use this checklist to track your progress:

### Netlify Configuration
- [ ] Domain added in Netlify
- [ ] DNS method chosen (Netlify DNS or External)
- [ ] Netlify site name noted

### DNS Configuration
- [ ] A record added (or nameservers updated)
- [ ] CNAME record added (or nameservers updated)
- [ ] DNS records verified at registrar
- [ ] DNS propagation confirmed

### HTTPS Configuration
- [ ] SSL certificate provisioned
- [ ] Force HTTPS enabled
- [ ] HSTS enabled (optional)
- [ ] Certificate verified in browser

### Redirect Configuration
- [ ] Primary domain set to kazekeza.com
- [ ] WWW redirect configured
- [ ] HTTP to HTTPS redirect working
- [ ] All redirect combinations tested

### Verification
- [ ] Site loads at https://kazekeza.com
- [ ] SSL certificate valid
- [ ] All pages accessible
- [ ] Content displays correctly
- [ ] No console errors

---

## 📚 Additional Resources

- [Netlify Custom Domains](https://docs.netlify.com/domains-https/custom-domains/)
- [Netlify DNS](https://docs.netlify.com/domains-https/netlify-dns/)
- [Porkbun DNS Help](https://kb.porkbun.com/category/7-dns)
- [Let's Encrypt](https://letsencrypt.org/)
- [DNS Propagation Explained](https://www.cloudflare.com/learning/dns/dns-propagation/)

---

## 🔄 Maintenance

### SSL Certificate Renewal

- Netlify automatically renews Let's Encrypt certificates
- Renewal happens ~30 days before expiration
- No action needed from you
- Check certificate expiration in browser

### DNS Record Updates

If you need to update DNS records:

**Netlify DNS**:
1. Go to Netlify → Domain management → DNS records
2. Add/edit/delete records as needed
3. Changes take effect in minutes

**External DNS (Porkbun)**:
1. Log in to Porkbun
2. Go to DNS management for kazekeza.com
3. Update records
4. Wait for propagation (5-60 minutes)

---

**Configuration Date**: _____________

**DNS Method Used**: [ ] Netlify DNS [ ] External DNS

**SSL Enabled**: _____________

**Verified By**: _____________
