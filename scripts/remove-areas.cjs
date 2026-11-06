const fs = require('fs');

// 1. Update Areas.js
let areasContent = fs.readFileSync('./sources/Game/World/Areas/Areas.js', 'utf8');

areasContent = areasContent.replace(/import\s*\{\s*AltarArea\s*\}\s*from\s*'\.\/AltarArea\.js';?\r?\n/, '');
areasContent = areasContent.replace(/import\s*\{\s*BehindTheSceneArea\s*\}\s*from\s*'\.\/BehindTheSceneArea\.js';?\r?\n/, '');
areasContent = areasContent.replace(/import\s*\{\s*CookieArea\s*\}\s*from\s*'\.\/CookieArea\.js';?\r?\n/, '');

areasContent = areasContent.replace(/\s*\[\s*'altar'[\s\S]*?\],?\r?\n/, '\n');
areasContent = areasContent.replace(/\s*\[\s*'behindTheScene'[\s\S]*?\],?\r?\n/, '\n');
areasContent = areasContent.replace(/\s*\[\s*'cookie'[\s\S]*?\],?\r?\n/, '\n');

areasContent = areasContent.replace(
    /for\(const child of model\)\r?\n\s*\{/,
    `const removedAreaNames = ['altar', 'behindTheScene', 'cookie']\n        for(const child of model)\n        {\n            if(removedAreaNames.some(name => child.name.startsWith(name)))\n            {\n                child.visible = false\n                this.game.resources.areasModel.scene.remove(child)\n                continue\n            }`
);

fs.writeFileSync('./sources/Game/World/Areas/Areas.js', areasContent, 'utf8');
console.log('Areas.js successfully updated!');

// 2. Update achievements.js
let achContent = fs.readFileSync('./sources/data/achievements.js', 'utf8');

// Update total areas count from 13 to 10
achContent = achContent.replace(
    /(\[\s*'areas',\s*'Traveler',\s*'Vist every area\.',\s*)13,/,
    '$110,'
);

// Remove cookie achievements (4 items)
achContent = achContent.replace(/\s*\[\s*'cookie'[\s\S]*?1\s*\],?\r?\n/, '\n');
achContent = achContent.replace(/\s*\[\s*'cookie'[\s\S]*?10\s*\],?\r?\n/, '\n');
achContent = achContent.replace(/\s*\[\s*'cookie'[\s\S]*?100\s*\],?\r?\n/, '\n');
achContent = achContent.replace(/\s*\[\s*'cookie'[\s\S]*?1000\s*\],?\r?\n/, '\n');

// Remove altar achievement
achContent = achContent.replace(/\s*\[\s*'sacrifice'[\s\S]*?1\s*\],?\r?\n/, '\n');

fs.writeFileSync('./sources/data/achievements.js', achContent, 'utf8');
console.log('achievements.js successfully updated!');

// 3. Update index.html (remove behindTheScene menu items)
let htmlContent = fs.readFileSync('./sources/index.html', 'utf8');

// Navigation button
htmlContent = htmlContent.replace(/<!-- Behind the scene -->\r?\n\s*<button class="js-navigation-item item" data-name="behindTheScene">[\s\S]*?<\/button>/, '');

// Preview
htmlContent = htmlContent.replace(/<!-- Behind the scene -->\r?\n\s*<div class="js-preview preview behindTheScene-preview">[\s\S]*?<\/div>/, '');

// Content
htmlContent = htmlContent.replace(/<!-- Behind the scene -->\r?\n\s*<div class="js-content content behindTheScene-content">[\s\S]*?<\/div>\r?\n\s*<\/div>/, '');

fs.writeFileSync('./sources/index.html', htmlContent, 'utf8');
console.log('index.html successfully updated!');
