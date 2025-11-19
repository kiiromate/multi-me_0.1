#!/usr/bin/env node

/**
 * Deployment Verification Script
 * 
 * This script helps verify that the production deployment is working correctly.
 * Run this after deploying to Netlify to check all critical functionality.
 * 
 * Usage: node scripts/verify-deployment.mjs
 */

const PRODUCTION_URL = 'https://kazekeza.com';
const TIMEOUT = 10000; // 10 seconds

// ANSI color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logSuccess(message) {
  log(`✓ ${message}`, 'green');
}

function logError(message) {
  log(`✗ ${message}`, 'red');
}

function logWarning(message) {
  log(`⚠ ${message}`, 'yellow');
}

function logInfo(message) {
  log(`ℹ ${message}`, 'cyan');
}

async function checkUrl(url, description) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), TIMEOUT);

    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Deployment-Verification-Script/1.0',
      },
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      logSuccess(`${description}: ${response.status} ${response.statusText}`);
      return { success: true, status: response.status, url };
    } else {
      logError(`${description}: ${response.status} ${response.statusText}`);
      return { success: false, status: response.status, url };
    }
  } catch (error) {
    if (error.name === 'AbortError') {
      logError(`${description}: Request timeout (>${TIMEOUT}ms)`);
    } else {
      logError(`${description}: ${error.message}`);
    }
    return { success: false, error: error.message, url };
  }
}

async function checkHttpsRedirect(domain) {
  try {
    const httpUrl = `http://${domain}`;
    const response = await fetch(httpUrl, {
      redirect: 'manual',
      headers: {
        'User-Agent': 'Deployment-Verification-Script/1.0',
      },
    });

    if (response.status === 301 || response.status === 302) {
      const location = response.headers.get('location');
      if (location && location.startsWith('https://')) {
        logSuccess(`HTTP to HTTPS redirect: ${httpUrl} → ${location}`);
        return true;
      }
    }

    logWarning(`HTTP to HTTPS redirect not configured for ${httpUrl}`);
    return false;
  } catch (error) {
    logError(`Failed to check HTTPS redirect: ${error.message}`);
    return false;
  }
}

async function verifyDeployment() {
  log('\n🚀 KAZE KEZA Portfolio - Deployment Verification\n', 'blue');
  log('═'.repeat(60), 'blue');
  log('\n');

  const results = {
    passed: 0,
    failed: 0,
    warnings: 0,
  };

  // Check environment variables
  log('📋 Checking Environment Variables...', 'cyan');
  const requiredEnvVars = [
    'NEXT_PUBLIC_SANITY_PROJECT_ID',
    'NEXT_PUBLIC_SANITY_DATASET',
    'NEXT_PUBLIC_SITE_URL',
  ];

  for (const envVar of requiredEnvVars) {
    if (process.env[envVar]) {
      logSuccess(`${envVar} is set`);
      results.passed++;
    } else {
      logWarning(`${envVar} is not set (this is okay for production check)`);
      results.warnings++;
    }
  }

  log('\n');

  // Check main pages
  log('🌐 Checking Page Accessibility...', 'cyan');
  const pages = [
    { path: '/', description: 'Homepage' },
    { path: '/projects', description: 'Projects page' },
    { path: '/blog', description: 'Blog page' },
    { path: '/about', description: 'About page' },
    { path: '/contact', description: 'Contact page' },
    { path: '/data-viz', description: 'Data Viz page' },
    { path: '/studio', description: 'Sanity Studio' },
  ];

  for (const page of pages) {
    const result = await checkUrl(`${PRODUCTION_URL}${page.path}`, page.description);
    if (result.success) {
      results.passed++;
    } else {
      results.failed++;
    }
  }

  log('\n');

  // Check HTTPS redirect
  log('🔒 Checking HTTPS Configuration...', 'cyan');
  const domain = PRODUCTION_URL.replace('https://', '');
  const httpsRedirect = await checkHttpsRedirect(domain);
  if (httpsRedirect) {
    results.passed++;
  } else {
    results.warnings++;
  }

  log('\n');

  // Check WWW redirect
  log('🌍 Checking WWW Redirect...', 'cyan');
  const wwwResult = await checkUrl(`https://www.${domain}`, 'WWW redirect');
  if (wwwResult.success) {
    results.passed++;
  } else {
    results.warnings++;
    logInfo('WWW redirect may not be configured yet - this is optional');
  }

  log('\n');

  // Summary
  log('═'.repeat(60), 'blue');
  log('\n📊 Verification Summary\n', 'blue');
  
  logSuccess(`Passed: ${results.passed}`);
  if (results.warnings > 0) {
    logWarning(`Warnings: ${results.warnings}`);
  }
  if (results.failed > 0) {
    logError(`Failed: ${results.failed}`);
  }

  log('\n');

  if (results.failed === 0) {
    log('🎉 Deployment verification completed successfully!', 'green');
    log('\nNext steps:', 'cyan');
    log('  1. Test the site manually in a browser');
    log('  2. Run Lighthouse audit for performance');
    log('  3. Check browser console for errors');
    log('  4. Test on mobile devices');
    log('\n');
    return true;
  } else {
    log('❌ Deployment verification found issues', 'red');
    log('\nPlease review the errors above and:', 'yellow');
    log('  1. Check Netlify deploy logs');
    log('  2. Verify environment variables are set');
    log('  3. Ensure DNS has propagated');
    log('  4. Check Netlify domain settings');
    log('\n');
    return false;
  }
}

// Run verification
verifyDeployment()
  .then((success) => {
    process.exit(success ? 0 : 1);
  })
  .catch((error) => {
    logError(`Verification script error: ${error.message}`);
    process.exit(1);
  });
