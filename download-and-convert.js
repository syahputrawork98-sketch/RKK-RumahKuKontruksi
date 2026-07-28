const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Install sharp locally if not present
try {
  require.resolve('sharp');
} catch (e) {
  console.log('Installing sharp...');
  execSync('npm install sharp --no-save', { stdio: 'inherit' });
}

const sharp = require('sharp');

const dir = path.join(__dirname, 'apps/web/src/assets/images/home');

const images = {
  'hero-h1': '29299826',
  'hero-h2': '8470040',
  'hero-h3': '29197533',
  'sec-s1': '6285159',
  'sec-s2': '6894105',
  'sec-s3': '4792480'
};

if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

async function main() {
  for (const [key, id] of Object.entries(images)) {
    const url = `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`;
    const jpgPath = path.join(dir, `${key}.jpg`);
    const webpPath = path.join(dir, `${key}.webp`);

    console.log(`Downloading ${key}...`);
    execSync(`curl.exe -sL -o "${jpgPath}" "${url}"`);

    console.log(`Converting ${key} to WebP...`);
    await sharp(jpgPath).webp({ quality: 80 }).toFile(webpPath);
    
    fs.unlinkSync(jpgPath);
  }
  console.log('All done!');
}

main().catch(console.error);
