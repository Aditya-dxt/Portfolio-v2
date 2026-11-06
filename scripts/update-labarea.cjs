const fs = require('fs');

let content = fs.readFileSync('./sources/Game/World/Areas/LabArea.js', 'utf8');

// 1. Title in debug panel
content = content.replace("title: '🧪 Lab'", "title: '📷 Photography'");

// 2. Interactive point label
content = content.replace(
    /this\.references\.items\.get\('interactivePoint'\)\[0\]\.position,\s*'Lab'/,
    "this.references.items.get('interactivePoint')[0].position,\n            'Photography'"
);

// 3. Loader in getResourceAndLoad
content = content.replace(
    /const loader = this\.game\.resourcesLoader\.getLoader\('textureKtx'\)\s*loader\.load\(\s*path,/,
    `const isKtx = key.endsWith('.ktx')\n                const loader = this.game.resourcesLoader.getLoader(isKtx ? 'textureKtx' : 'texture')\n\n                loader.load(\n                    path,`
);

// 4. Loader in setScroller
content = content.replace(
    /const loader = this\.game\.resourcesLoader\.getLoader\('textureKtx'\)\s*loader\.load\(\s*`lab\/images\/\${project\.imageMini}`,/,
    `const isKtx = project.imageMini.endsWith('.ktx')\n                        const loader = this.game.resourcesLoader.getLoader(isKtx ? 'textureKtx' : 'texture')\n\n                        loader.load(\n                            \`lab/images/\${project.imageMini}\`,`
);

fs.writeFileSync('./sources/Game/World/Areas/LabArea.js', content, 'utf8');
console.log('LabArea.js successfully updated for Photography!');
