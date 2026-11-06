const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const outDir = path.resolve('./static/career');

const items = [
    {
        filename: 'careerHetic.png',
        width: 316,
        height: 60,
        svg: `
<svg width="316" height="60" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="0" width="316" height="60" fill="rgba(0,0,0,0)" />
  <text x="50%" y="22" dominant-baseline="middle" text-anchor="middle" font-family="'Segoe UI', Arial, Helvetica, sans-serif" font-weight="900" font-size="20" fill="rgb(255,0,0)" letter-spacing="1.5">ST. THOMAS SCHOOL</text>
  <rect x="8" y="36" width="300" height="20" rx="3" fill="rgb(0,255,0)" />
  <text x="50%" y="47" dominant-baseline="middle" text-anchor="middle" font-family="'Segoe UI', Arial, Helvetica, sans-serif" font-weight="800" font-size="11" fill="rgb(255,0,0)" letter-spacing="0.8">ICSE 91.2% · ISC 83.4% · CAPTAIN</text>
</svg>`
    },
    {
        filename: 'careerUzik.png',
        width: 168,
        height: 60,
        svg: `
<svg width="168" height="60" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="0" width="168" height="60" fill="rgba(0,0,0,0)" />
  <text x="50%" y="22" dominant-baseline="middle" text-anchor="middle" font-family="'Segoe UI', Arial, Helvetica, sans-serif" font-weight="900" font-size="19" fill="rgb(255,0,0)" letter-spacing="1">PSIT KANPUR</text>
  <rect x="6" y="36" width="156" height="20" rx="3" fill="rgb(0,255,0)" />
  <text x="50%" y="47" dominant-baseline="middle" text-anchor="middle" font-family="'Segoe UI', Arial, Helvetica, sans-serif" font-weight="800" font-size="10.5" fill="rgb(255,0,0)" letter-spacing="0.5">B.TECH CSE (2024–28)</text>
</svg>`
    },
    {
        filename: 'careerImmersiveGarden.png',
        width: 340,
        height: 60,
        svg: `
<svg width="340" height="60" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="0" width="340" height="60" fill="rgba(0,0,0,0)" />
  <text x="50%" y="22" dominant-baseline="middle" text-anchor="middle" font-family="'Segoe UI', Arial, Helvetica, sans-serif" font-weight="900" font-size="20" fill="rgb(255,0,0)" letter-spacing="1.5">INDIA INNOVATES 2026</text>
  <rect x="10" y="36" width="320" height="20" rx="3" fill="rgb(0,255,0)" />
  <text x="50%" y="47" dominant-baseline="middle" text-anchor="middle" font-family="'Segoe UI', Arial, Helvetica, sans-serif" font-weight="800" font-size="11" fill="rgb(255,0,0)" letter-spacing="0.8">FINALIST @ BHARAT MANDAPAM</text>
</svg>`
    },
    {
        filename: 'careerFreelancer.png',
        width: 240,
        height: 60,
        svg: `
<svg width="240" height="60" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="0" width="240" height="60" fill="rgba(0,0,0,0)" />
  <text x="50%" y="22" dominant-baseline="middle" text-anchor="middle" font-family="'Segoe UI', Arial, Helvetica, sans-serif" font-weight="900" font-size="19" fill="rgb(255,0,0)" letter-spacing="1">FULL-STACK &amp; AI</text>
  <rect x="6" y="36" width="228" height="20" rx="3" fill="rgb(0,255,0)" />
  <text x="50%" y="47" dominant-baseline="middle" text-anchor="middle" font-family="'Segoe UI', Arial, Helvetica, sans-serif" font-weight="800" font-size="10" fill="rgb(255,0,0)" letter-spacing="0.5">300+ DSA · MERN · 7+ SHIPPED</text>
</svg>`
    },
    {
        filename: 'careerOnlineTeacher.png',
        width: 332,
        height: 92,
        svg: `
<svg width="332" height="92" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="0" width="332" height="92" fill="rgba(0,0,0,0)" />
  <text x="50%" y="22" dominant-baseline="middle" text-anchor="middle" font-family="'Segoe UI', Arial, Helvetica, sans-serif" font-weight="900" font-size="20" fill="rgb(255,0,0)" letter-spacing="1.5">FLYRANK AI</text>
  <rect x="10" y="36" width="312" height="22" rx="3" fill="rgb(0,255,0)" />
  <text x="50%" y="48" dominant-baseline="middle" text-anchor="middle" font-family="'Segoe UI', Arial, Helvetica, sans-serif" font-weight="800" font-size="11" fill="rgb(255,0,0)" letter-spacing="0.8">FRONT-END AI ENGINEERING INTERN</text>
  <rect x="10" y="64" width="312" height="22" rx="3" fill="rgb(0,255,0)" />
  <text x="50%" y="76" dominant-baseline="middle" text-anchor="middle" font-family="'Segoe UI', Arial, Helvetica, sans-serif" font-weight="800" font-size="10.5" fill="rgb(255,0,0)" letter-spacing="0.5">CLAUDE CODE · CURSOR · 130+ COUNTRIES</text>
</svg>`
    },
    {
        filename: 'careerIRLTeacher.png',
        width: 268,
        height: 92,
        svg: `
<svg width="268" height="92" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="0" width="268" height="92" fill="rgba(0,0,0,0)" />
  <text x="50%" y="22" dominant-baseline="middle" text-anchor="middle" font-family="'Segoe UI', Arial, Helvetica, sans-serif" font-weight="900" font-size="19" fill="rgb(255,0,0)" letter-spacing="1">PRODIGY INFOTECH</text>
  <rect x="8" y="36" width="252" height="22" rx="3" fill="rgb(0,255,0)" />
  <text x="50%" y="48" dominant-baseline="middle" text-anchor="middle" font-family="'Segoe UI', Arial, Helvetica, sans-serif" font-weight="800" font-size="11" fill="rgb(255,0,0)" letter-spacing="0.6">FULL-STACK WEB DEV INTERN</text>
  <rect x="8" y="64" width="252" height="22" rx="3" fill="rgb(0,255,0)" />
  <text x="50%" y="76" dominant-baseline="middle" text-anchor="middle" font-family="'Segoe UI', Arial, Helvetica, sans-serif" font-weight="800" font-size="10.5" fill="rgb(255,0,0)" letter-spacing="0.5">JWT / RBAC · MERN · SOCKET.IO</text>
</svg>`
    }
];

async function run() {
    for (const item of items) {
        const dest = path.join(outDir, item.filename);
        await sharp(Buffer.from(item.svg))
            .png()
            .toFile(dest);
        console.log(`Generated ${item.filename} (${item.width}x${item.height})`);
    }
    console.log('All career textures generated successfully!');
}

run().catch(console.error);
