const https = require('https');
const fs = require('fs');
const path = require('path');

const urls = {
  'hero-h1': 'https://www.pexels.com/photo/architects-reviewing-construction-blueprints-outdoors-29299826/',
  'hero-h2': 'https://www.pexels.com/photo/man-and-woman-holding-a-blueprint-of-a-house-8470040/',
  'hero-h3': 'https://www.pexels.com/photo/construction-site-with-engineers-discussing-plans-29197533/',
  'sec-s1': 'https://www.pexels.com/photo/architect-working-on-a-project-6285159/',
  'sec-s2': 'https://www.pexels.com/photo/an-architect-s-work-table-with-tools-and-blueprints-6894105/',
  'sec-s3': 'https://www.pexels.com/photo/pen-with-ruler-and-eyeglasses-placed-on-house-plan-4792480/'
};

const outputDir = path.join(__dirname, 'apps/web/src/assets/images/home');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function fetchPage(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
      let data = '';
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return resolve(fetchPage(res.headers.location));
      }
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

async function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
         return resolve(downloadImage(res.headers.location, filename));
      }
      const file = fs.createWriteStream(filename);
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', reject);
  });
}

async function main() {
  for (const [name, url] of Object.entries(urls)) {
    console.log(`Fetching ${name}...`);
    try {
      const html = await fetchPage(url);
      const match = html.match(/<meta property="og:image" content="([^"]+)"/i);
      if (match) {
        let imgUrl = match[1];
        console.log(`Found image URL for ${name}: ${imgUrl}`);
        const dest = path.join(outputDir, `${name}.jpg`);
        await downloadImage(imgUrl, dest);
        console.log(`Downloaded ${name}.jpg`);
      } else {
        console.log(`Could not find image for ${name}`);
      }
    } catch (e) {
      console.error(`Error for ${name}:`, e);
    }
  }
}

main();
