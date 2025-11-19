#!/usr/bin/env node

/**
 * Production Deployment Verification Script
 * Tests all critical aspects of the kazekeza.com deployment
 */

const SITE_URL = 'https://kazekeza.com';
const TIMEOUT = 10000;

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function logSuccess(message) {
  log(`✓ ${message}`, colors.green);
}

function logError(message) {
  log(`✗ ${message}`, colors.red);
}

function logInfo(message) {
  log(`ℹ ${message}`, colors.cyan);
}

function logWarning(message) {
  log(`⚠ ${message}`, colors.yellow);
}

async function fetchWithTimeout(url, options = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT);
  
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeout);
    return response;
  } catch (error) {
    clearTimeout(timeout);
    throw error;
  }
}

async function testHTTPS() {
  log('\n📋 Testing HTTPS Configuration...', colors.blue);
  
  try {
    // Test HTTPS access
    const response = await fetchWithTimeout(SITE_URL);
    if (response.ok) {
      logSuccess(`HTTPS works correctly (Status: ${response.status})`);
    } else {
      logError(`HTTPS returned status ${response.status}`);
      return false;
    }
    
    // Check if HTTP redirects to HTTPS
    try {
      const httpResponse = await fetchWithTimeout('http://kazekeza.com', {
        redirect: 'manual'
      });
      if (httpResponse.status === 301 || httpResponse.status === 302 || httpResponse.status === 308) {
        const location = httpResponse.headers.get('location');
        if (location && location.startsWith('https://')) {
          logSuccess('HTTP correctly redirects to HTTPS');
        } else {
          logWarning('HTTP redirect exists but may not point to HTTPS');
        }
      } else {
        logWarning('HTTP to HTTPS redirect not detected');
      }
    } catch (error) {
      logWarning('Could not verify HTTP to HTTPS redirect');
    }
    
    return true;
  } catch (error) {
    logError(`HTTPS test failed: ${error.message}`);
    return false;
  }
}

async function testPageLoad(path, pageName) {
  try {
    const url = `${SITE_URL}${path}`;
    const response = await fetchWithTimeout(url);
    
    if (response.ok) {
      const html = await response.text();
      
      // Check for basic HTML structure
      if (html.includes('<!DOCTYPE html>') || html.includes('<html')) {
        logSuccess(`${pageName} loads successfully`);
        
        // Check for common error indicators
        if (html.includes('404') || html.includes('Not Found')) {
          logWarning(`${pageName} may contain 404 content`);
        }
        
        return { success: true, html };
      } else {
        logError(`${pageName} returned invalid HTML`);
        return { success: false };
      }
    } else {
      logError(`${pageName} returned status ${response.status}`);
      return { success: false };
    }
  } catch (error) {
    logError(`${pageName} failed to load: ${error.message}`);
    return { success: false };
  }
}

async function testAllPages() {
  log('\n📋 Testing All Pages...', colors.blue);
  
  const pages = [
    { path: '/', name: 'Homepage' },
    { path: '/about', name: 'About Page' },
    { path: '/projects', name: 'Projects Page' },
    { path: '/blog', name: 'Blog Page' },
    { path: '/contact', name: 'Contact Page' },
    { path: '/data-viz', name: 'Data Visualization Page' },
  ];
  
  let allPassed = true;
  
  for (const page of pages) {
    const result = await testPageLoad(page.path, page.name);
    if (!result.success) {
      allPassed = false;
    }
  }
  
  return allPassed;
}

async function testSanityContent() {
  log('\n📋 Testing Sanity Content Integration...', colors.blue);
  
  try {
    // Test homepage for Sanity content
    const homeResponse = await fetchWithTimeout(SITE_URL);
    const homeHtml = await homeResponse.text();
    
    // Check for indicators that content is loading from Sanity
    const hasContent = !homeHtml.includes('[YOUR NAME]') && 
                      !homeHtml.includes('[PROFESSIONAL TITLE]') &&
                      !homeHtml.includes('placeholder');
    
    if (hasContent) {
      logSuccess('Homepage appears to load content from Sanity (no placeholders detected)');
    } else {
      logWarning('Homepage may still contain placeholder content');
    }
    
    // Test projects page
    const projectsResponse = await fetchWithTimeout(`${SITE_URL}/projects`);
    const projectsHtml = await projectsResponse.text();
    
    if (!projectsHtml.includes('[PROJECT TITLE]')) {
      logSuccess('Projects page appears to load content from Sanity');
    } else {
      logWarning('Projects page may contain placeholder content');
    }
    
    // Test about page
    const aboutResponse = await fetchWithTimeout(`${SITE_URL}/about`);
    const aboutHtml = await aboutResponse.text();
    
    if (aboutHtml.includes('KAZE KEZA') || !aboutHtml.includes('[YOUR NAME]')) {
      logSuccess('About page appears to load content from Sanity');
    } else {
      logWarning('About page may contain placeholder content');
    }
    
    return true;
  } catch (error) {
    logError(`Sanity content test failed: ${error.message}`);
    return false;
  }
}

async function testPerformance() {
  log('\n📋 Testing Performance...', colors.blue);
  
  try {
    const startTime = Date.now();
    const response = await fetchWithTimeout(SITE_URL);
    const endTime = Date.now();
    const loadTime = endTime - startTime;
    
    if (loadTime < 2000) {
      logSuccess(`Homepage loads in ${loadTime}ms (excellent)`);
    } else if (loadTime < 4000) {
      logSuccess(`Homepage loads in ${loadTime}ms (good)`);
    } else {
      logWarning(`Homepage loads in ${loadTime}ms (could be improved)`);
    }
    
    // Check response headers for optimization
    const headers = response.headers;
    
    if (headers.get('content-encoding')) {
      logSuccess(`Compression enabled: ${headers.get('content-encoding')}`);
    } else {
      logWarning('Compression not detected');
    }
    
    if (headers.get('cache-control')) {
      logSuccess('Cache headers configured');
    }
    
    return true;
  } catch (error) {
    logError(`Performance test failed: ${error.message}`);
    return false;
  }
}

async function testSEO() {
  log('\n📋 Testing SEO Configuration...', colors.blue);
  
  try {
    const response = await fetchWithTimeout(SITE_URL);
    const html = await response.text();
    
    // Check for essential meta tags
    if (html.includes('<title>')) {
      logSuccess('Title tag present');
    } else {
      logWarning('Title tag missing');
    }
    
    if (html.includes('description')) {
      logSuccess('Meta description present');
    } else {
      logWarning('Meta description may be missing');
    }
    
    if (html.includes('og:')) {
      logSuccess('Open Graph tags present');
    } else {
      logWarning('Open Graph tags may be missing');
    }
    
    // Test robots.txt
    try {
      const robotsResponse = await fetchWithTimeout(`${SITE_URL}/robots.txt`);
      if (robotsResponse.ok) {
        logSuccess('robots.txt accessible');
      }
    } catch (error) {
      logWarning('robots.txt not accessible');
    }
    
    // Test sitemap
    try {
      const sitemapResponse = await fetchWithTimeout(`${SITE_URL}/sitemap.xml`);
      if (sitemapResponse.ok) {
        logSuccess('sitemap.xml accessible');
      }
    } catch (error) {
      logWarning('sitemap.xml not accessible');
    }
    
    return true;
  } catch (error) {
    logError(`SEO test failed: ${error.message}`);
    return false;
  }
}

async function runAllTests() {
  log('\n🚀 Starting Production Deployment Verification', colors.blue);
  log(`Testing: ${SITE_URL}\n`, colors.cyan);
  
  const results = {
    https: await testHTTPS(),
    pages: await testAllPages(),
    sanity: await testSanityContent(),
    performance: await testPerformance(),
    seo: await testSEO(),
  };
  
  log('\n' + '='.repeat(60), colors.blue);
  log('📊 VERIFICATION SUMMARY', colors.blue);
  log('='.repeat(60), colors.blue);
  
  const allPassed = Object.values(results).every(result => result);
  
  Object.entries(results).forEach(([test, passed]) => {
    const status = passed ? '✓' : '✗';
    const color = passed ? colors.green : colors.red;
    log(`${status} ${test.toUpperCase()}: ${passed ? 'PASSED' : 'FAILED'}`, color);
  });
  
  log('='.repeat(60) + '\n', colors.blue);
  
  if (allPassed) {
    log('🎉 All verification tests passed!', colors.green);
    log('✨ Production deployment is ready!', colors.green);
  } else {
    log('⚠️  Some tests failed or have warnings', colors.yellow);
    log('Please review the results above and address any issues', colors.yellow);
  }
  
  log('\n💡 Next Steps:', colors.cyan);
  log('1. Manually test the site in a browser at https://kazekeza.com');
  log('2. Check browser console for any JavaScript errors');
  log('3. Test all interactive features (theme toggle, navigation, forms)');
  log('4. Verify mobile responsiveness');
  log('5. Run Lighthouse audit for performance and accessibility scores\n');
  
  process.exit(allPassed ? 0 : 1);
}

// Run the verification
runAllTests().catch(error => {
  logError(`\nFatal error: ${error.message}`);
  process.exit(1);
});
