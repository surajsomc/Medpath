/**
 * Reads .env for CMS_PROD and writes public/admin/env.js.
 * Run before dev/build (predev, prebuild). If CMS_PROD=true in .env, admin requires login in prod.
 */
const fs = require('fs');
const path = require('path');

const envPath = path.join(process.cwd(), '.env');
const outPath = path.join(process.cwd(), 'public', 'admin', 'env.js');

let cmsProd = false;
if (fs.existsSync(envPath)) {
  const env = fs.readFileSync(envPath, 'utf8');
  cmsProd = /CMS_PROD\s*=\s*true/i.test(env);
}

fs.writeFileSync(outPath, `window.CMS_PROD = ${cmsProd};\n`);
console.log(`[cms-env] public/admin/env.js: CMS_PROD=${cmsProd}`);
