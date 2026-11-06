const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const srcProjectsDir = 'C:\\Users\\adity\\OneDrive\\Desktop\\Portfolio\\public\\images\\projects';
const destDir = path.resolve('./static/projects/images');

// Helper: frame a web screenshot onto a 1920x1080 canvas without stretching
async function enhanceWebScreenshot(srcFile, destFile, bgColor) {
    const srcPath = path.join(srcProjectsDir, srcFile);
    if (!fs.existsSync(srcPath)) {
        console.error('Source file missing:', srcPath);
        return;
    }

    const meta = await sharp(srcPath).metadata();
    console.log(`Processing UI: ${srcFile} (${meta.width}x${meta.height})`);

    // Scale so it fits cleanly within 1920x1080 preserving aspect ratio
    const fg = await sharp(srcPath)
        .resize({
            width: 1920,
            height: 1080,
            fit: 'contain',
            background: bgColor
        })
        .png()
        .toBuffer();

    const destPath = path.join(destDir, destFile);
    await sharp(fg).png({ quality: 95 }).toFile(destPath);
    console.log(`✓ Generated enhanced UI: ${destFile}`);
}

// Helper: frame a vertical poster onto a 1920x1080 16:9 canvas with blurred atmospheric backdrop
async function enhancePoster(srcFile, destFile) {
    const srcPath = path.join(srcProjectsDir, srcFile);
    if (!fs.existsSync(srcPath)) {
        console.error('Source file missing:', srcPath);
        return;
    }

    console.log(`Processing Poster: ${srcFile}`);

    // Atmospheric blurred ambient background
    const bg = await sharp(srcPath)
        .resize(1920, 1080, { fit: 'cover' })
        .blur(35)
        .modulate({ brightness: 0.35, saturation: 1.2 })
        .toBuffer();

    // Crisp foreground poster preserving aspect ratio
    const fg = await sharp(srcPath)
        .resize({ height: 1000, fit: 'inside' })
        .toBuffer();

    const destPath = path.join(destDir, destFile);
    await sharp(bg)
        .composite([{ input: fg, gravity: 'center' }])
        .png({ quality: 95 })
        .toFile(destPath);

    console.log(`✓ Generated enhanced Poster: ${destFile}`);
}

async function run() {
    console.log('Generating pixel-perfect 16:9 project billboard assets...');

    // 1. CivicSentinel AI
    // Image 1: Main Admin UI (project1.png)
    await enhanceWebScreenshot('project1.png', 'civicsentinel-1.png', { r: 8, g: 17, b: 25, alpha: 1 });
    // Image 2: India Innovates 2026 National Finalist Poster at Bharat Mandapam
    await enhancePoster('India-Innovates-2026.jpg', 'civicsentinel-2.png');

    // 2. SneakerVault
    // Image 1: E-Commerce Platform UI (project2.png)
    await enhanceWebScreenshot('project2.png', 'sneakervault-1.png', { r: 24, g: 21, b: 32, alpha: 1 });

    // 3. CampusIQ
    // Image 1: Academic Platform UI (project3.png)
    await enhanceWebScreenshot('project3.png', 'campusiq-1.png', { r: 227, g: 227, b: 240, alpha: 1 });

    // 4. Brew & Co.
    // Image 1: Artisan Coffee UI (project4.png)
    await enhanceWebScreenshot('project4.png', 'brewandco-1.png', { r: 44, g: 33, b: 26, alpha: 1 });

    // 5. VarshaDrishti (Explainable AI Satellite Rainfall Prediction - SIH ISRO Track)
    // Image 1: AI Radar / Satellite Dashboard (project6.png)
    await enhanceWebScreenshot('project6.png', 'varshadrishti-1.png', { r: 15, g: 20, b: 28, alpha: 1 });
    // Image 2: National AI/ML Hackathon by AVEVA / Green Bharat
    await enhancePoster('National-AI-ML-Hackathon-By-AVEVA.jpg', 'varshadrishti-2.png');

    // 6. FAR AWAY 2026
    // Image 1: International Hackathon Poster (FarAway-2026.jpg)
    await enhancePoster('FarAway-2026.jpg', 'faraway-1.png');

    console.log('All project assets generated successfully in 16:9 1080p resolution!');
}

run().catch(console.error);
