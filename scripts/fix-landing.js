const fs = require('fs');
let content = fs.readFileSync('./sources/Game/World/Areas/LandingArea.js', 'utf8');
content = content.replace(
    /setObjects\(\)\r?\n\s*\{\r?\n[\s\S]*?super\.setObjects\(\)\r?\n\s*\}/,
    `setObjects()\n    {\n        for(let i = this.model.children.length - 1; i >= 0; i--)\n        {\n            const child = this.model.children[i]\n            if(child.name.toLowerCase().includes('letter'))\n            {\n                this.model.remove(child)\n            }\n        }\n        super.setObjects()\n    }`
);
fs.writeFileSync('./sources/Game/World/Areas/LandingArea.js', content, 'utf8');
console.log('LandingArea setObjects updated successfully');
