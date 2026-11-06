const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const srcDir = 'C:\\Users\\adity\\OneDrive\\Desktop\\Portfolio\\public\\images\\photography';
const destDir = path.resolve('./static/photography');
const miniDir = path.resolve('./static/photography/mini');

if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
}
if (!fs.existsSync(miniDir)) {
    fs.mkdirSync(miniDir, { recursive: true });
}

async function run() {
    const files = fs.readdirSync(srcDir);
    console.log('Found files in source photography:', files);

    for (const file of files) {
        if (!/\.(jpe?g|png|webp)$/i.test(file)) continue;

        const srcPath = path.join(srcDir, file);
        const destPath = path.join(destDir, file);
        const miniPath = path.join(miniDir, file);

        // Copy original
        fs.copyFileSync(srcPath, destPath);
        console.log(`Copied ${file} to static/photography/`);

        // Generate mini thumbnail (aspect ratio preserved or 320x180)
        // LabArea mini expects texture around 300x168 or similar
        await sharp(srcPath)
            .resize(320, 180, { fit: 'cover' })
            .jpeg({ quality: 85 })
            .toFile(miniPath);

        console.log(`Generated mini thumbnail for ${file}`);
    }

    console.log('All photos and thumbnails prepared successfully!');
}

run().catch(err => {
    console.error('Error preparing photography:', err);
    process.exit(1);
});
