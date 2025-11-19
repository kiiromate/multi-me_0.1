#!/usr/bin/env node

/**
 * Lighthouse Audit Script
 * Runs Lighthouse audits on all main pages and generates a report
 */

import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs/promises';
import path from 'path';

const execAsync = promisify(exec);

const PAGES = [
  { name: 'Home', url: 'http://localhost:3000' },
  { name: 'Projects', url: 'http://localhost:3000/projects' },
  { name: 'Blog', url: 'http://localhost:3000/blog' },
  { name: 'About', url: 'http://localhost:3000/about' },
];

const CATEGORIES = ['performance', 'accessibility', 'best-practices', 'seo'];

async function runLighthouse(url, outputPath) {
  const command = `npx lighthouse ${url} --output=json --output-path=${outputPath} --chrome-flags="--headless" --quiet`;
  
  try {
    await execAsync(command);
    return true;
  } catch (error) {
    console.error(`Error running Lighthouse for ${url}:`, error.message);
    return false;
  }
}

async function parseResults(filePath) {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    const results = JSON.parse(data);
    
    return {
      performance: Math.round(results.categories.performance.score * 100),
      accessibility: Math.round(results.categories.accessibility.score * 100),
      bestPractices: Math.round(results.categories['best-practices'].score * 100),
      seo: Math.round(results.categories.seo.score * 100),
      audits: results.audits,
    };
  } catch (error) {
    console.error(`Error parsing results from ${filePath}:`, error.message);
    return null;
  }
}

function generateMarkdownReport(results) {
  let markdown = '# Lighthouse Audit Report\n\n';
  markdown += `Generated: ${new Date().toISOString()}\n\n`;
  markdown += '## Summary\n\n';
  markdown += '| Page | Performance | Accessibility | Best Practices | SEO |\n';
  markdown += '|------|-------------|---------------|----------------|-----|\n';
  
  results.forEach(result => {
    const perf = result.scores.performance >= 80 ? '✅' : '⚠️';
    const a11y = result.scores.accessibility >= 90 ? '✅' : '⚠️';
    const bp = result.scores.bestPractices >= 80 ? '✅' : '⚠️';
    const seo = result.scores.seo >= 90 ? '✅' : '⚠️';
    
    markdown += `| ${result.page} | ${perf} ${result.scores.performance} | ${a11y} ${result.scores.accessibility} | ${bp} ${result.scores.bestPractices} | ${seo} ${result.scores.seo} |\n`;
  });
  
  markdown += '\n## Target Thresholds\n\n';
  markdown += '- Performance: ≥ 80\n';
  markdown += '- Accessibility: ≥ 90\n';
  markdown += '- Best Practices: ≥ 80\n';
  markdown += '- SEO: ≥ 90\n\n';
  
  markdown += '## Issues Identified\n\n';
  
  results.forEach(result => {
    const issues = [];
    
    if (result.scores.performance < 80) {
      issues.push('Performance below target');
    }
    if (result.scores.accessibility < 90) {
      issues.push('Accessibility below target');
    }
    if (result.scores.bestPractices < 80) {
      issues.push('Best Practices below target');
    }
    if (result.scores.seo < 90) {
      issues.push('SEO below target');
    }
    
    if (issues.length > 0) {
      markdown += `### ${result.page}\n\n`;
      issues.forEach(issue => {
        markdown += `- ⚠️ ${issue}\n`;
      });
      markdown += '\n';
    }
  });
  
  if (results.every(r => 
    r.scores.performance >= 80 && 
    r.scores.accessibility >= 90 && 
    r.scores.bestPractices >= 80 && 
    r.scores.seo >= 90
  )) {
    markdown += '✅ All pages meet target thresholds!\n\n';
  }
  
  return markdown;
}

async function main() {
  console.log('🔍 Starting Lighthouse audits...\n');
  
  const resultsDir = path.join(process.cwd(), '.lighthouse');
  await fs.mkdir(resultsDir, { recursive: true });
  
  const allResults = [];
  
  for (const page of PAGES) {
    console.log(`Auditing ${page.name}...`);
    const outputPath = path.join(resultsDir, `${page.name.toLowerCase()}.json`);
    
    const success = await runLighthouse(page.url, outputPath);
    
    if (success) {
      const scores = await parseResults(outputPath);
      if (scores) {
        allResults.push({
          page: page.name,
          url: page.url,
          scores: {
            performance: scores.performance,
            accessibility: scores.accessibility,
            bestPractices: scores.bestPractices,
            seo: scores.seo,
          },
        });
        console.log(`✅ ${page.name}: P${scores.performance} A${scores.accessibility} BP${scores.bestPractices} SEO${scores.seo}\n`);
      }
    }
  }
  
  // Generate markdown report
  const report = generateMarkdownReport(allResults);
  const reportPath = path.join(process.cwd(), 'LIGHTHOUSE_REPORT.md');
  await fs.writeFile(reportPath, report);
  
  console.log(`\n📊 Report saved to: ${reportPath}`);
  console.log('\n✨ Lighthouse audits complete!');
}

main().catch(console.error);
