const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const photos = [
    { id: 'a', file: 'A.jpeg', title: 'Moonlit Night' },
    { id: 'b', file: 'B.jpg',  title: 'Dusk Lamplight' },
    { id: 'c', file: 'C.jpeg', title: 'River Ghat Serenity' },
    { id: 'd', file: 'D.jpeg', title: 'Parkway Lanterns' },
    { id: 'e', file: 'E.jpeg', title: 'Hoop Under Stars' },
    { id: 'f', file: 'F.jpg',  title: 'Palm Silhouette' },
    { id: 'g', file: 'G.jpeg', title: 'Moon Through Branches' },
    { id: 'h', file: 'H.jpeg', title: 'City Light Reflections' },
    { id: 'i', file: 'I.jpeg', title: 'Evening Horizon' },
    { id: 'j', file: 'J.jpeg', title: 'Urban Perspective' },
    { id: 'k', file: 'K.jpeg', title: 'Midnight Architecture' },
    { id: 'l', file: 'L.jpeg', title: 'Golden Hour Frame' },
    { id: 'm', file: 'M.jpeg', title: 'Urban Symmetry' },
    { id: 'n', file: 'N.jpeg', title: 'Nocturnal Trails' },
    { id: 'o', file: 'O.jpeg', title: 'Quiet Solitude' },
];

const srcDir = path.resolve('./static/photography');
const outDir = path.resolve('./static/lab/images');

async function processPhoto(item) {
    const srcPath = path.join(srcDir, item.file);
    if (!fs.existsSync(srcPath)) {
        console.error('File not found:', srcPath);
        return;
    }

    // 1. Main billboard (960x540)
    // Blurred moody background
    const bgMain = await sharp(srcPath)
        .resize(960, 540, { fit: 'cover' })
        .blur(25)
        .modulate({ brightness: 0.45, saturation: 1.2 })
        .toBuffer();

    // Centered sharp photo
    const fgMain = await sharp(srcPath)
        .resize({ height: 510, width: 900, fit: 'inside' })
        .toBuffer();

    const mainOut = path.join(outDir, `photo-${item.id}.png`);
    await sharp(bgMain)
        .composite([{ input: fgMain, gravity: 'center' }])
        .png({ quality: 90 })
        .toFile(mainOut);

    // 2. Mini thumbnail for scroller (240x136)
    const bgMini = await sharp(srcPath)
        .resize(240, 136, { fit: 'cover' })
        .blur(10)
        .modulate({ brightness: 0.5 })
        .toBuffer();

    const fgMini = await sharp(srcPath)
        .resize({ height: 128, width: 220, fit: 'inside' })
        .toBuffer();

    const miniOut = path.join(outDir, `photo-${item.id}-mini.png`);
    await sharp(bgMini)
        .composite([{ input: fgMini, gravity: 'center' }])
        .png({ quality: 85 })
        .toFile(miniOut);

    console.log(`✓ Processed ${item.title} -> photo-${item.id}.png & mini`);
}

async function run() {
    console.log('Generating photography composites for 3D Lab/Gallery...');
    for (const p of photos) {
        await processPhoto(p);
    }
    console.log('All photography assets successfully generated!');
}

run().catch(console.error);
