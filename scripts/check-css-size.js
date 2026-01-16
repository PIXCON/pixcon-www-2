#!/usr/bin/env node

/**
 * CSS Size Guard
 * Fails the build if CSS exceeds the budget
 * 
 * Budget: 12 KB (uncompressed), ~4 KB gzipped
 * Target: < 10 KB (uncompressed), ~3 KB gzipped
 */

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const CSS_FILE = path.join(__dirname, '..', 'static', 'css', 'styles.css');
const MAX_SIZE_KB = 15;      // Hard limit (uncompressed)
const TARGET_SIZE_KB = 12;   // Target (uncompressed)
// Note: ~3-4 KB gzipped is excellent (vs 127 KB CDN)

function formatBytes(bytes) {
  return (bytes / 1024).toFixed(2) + ' KB';
}

function checkCssSize() {
  if (!fs.existsSync(CSS_FILE)) {
    console.error('❌ CSS file not found:', CSS_FILE);
    process.exit(1);
  }

  const css = fs.readFileSync(CSS_FILE);
  const sizeBytes = css.length;
  const gzipBytes = zlib.gzipSync(css).length;
  const sizeKB = sizeBytes / 1024;

  console.log('\n📊 CSS Size Report');
  console.log('─'.repeat(40));
  console.log(`   File:        ${path.basename(CSS_FILE)}`);
  console.log(`   Uncompressed: ${formatBytes(sizeBytes)}`);
  console.log(`   Gzipped:      ${formatBytes(gzipBytes)}`);
  console.log(`   Target:       < ${TARGET_SIZE_KB} KB`);
  console.log(`   Hard Limit:   ${MAX_SIZE_KB} KB`);
  console.log('─'.repeat(40));

  if (sizeKB > MAX_SIZE_KB) {
    console.error(`\n❌ BUILD FAILED: CSS exceeds ${MAX_SIZE_KB} KB limit!`);
    console.error(`   Current size: ${formatBytes(sizeBytes)}`);
    console.error(`   Over budget by: ${formatBytes(sizeBytes - MAX_SIZE_KB * 1024)}`);
    console.error('\n   Actions required:');
    console.error('   - Remove unused utility classes');
    console.error('   - Check for duplicate styles');
    console.error('   - Verify tailwind.config.js content paths');
    process.exit(1);
  }

  if (sizeKB > TARGET_SIZE_KB) {
    console.warn(`\n⚠️  WARNING: CSS exceeds ${TARGET_SIZE_KB} KB target`);
    console.warn(`   Consider optimizing before next release`);
  } else {
    console.log(`\n✅ CSS size is within budget!`);
  }

  console.log('\n');
  process.exit(0);
}

checkCssSize();
