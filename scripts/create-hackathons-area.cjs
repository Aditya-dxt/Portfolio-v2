const fs = require('fs');

let code = fs.readFileSync('sources/Game/World/Areas/ProjectsArea.js', 'utf8');

// Replace imports
code = code.replace(
  "import projectsData from '../../../data/projects.js'",
  "import hackathonsData from '../../../data/hackathons.js'"
);

// Replace class name
code = code.replace(/class ProjectsArea/g, 'class HackathonsArea');
code = code.replace(/ProjectsArea\./g, 'HackathonsArea.');

// Replace data reference
code = code.replace(/projectsData/g, 'hackathonsData');

// Replace image path
code = code.replace('projects/images/', 'hackathons/images/');

// Replace interactive point label
code = code.replace(
  /'Projects',(\r?\n\s*)InteractivePoints\.ALIGN_RIGHT/,
  "'Hackathons',$1InteractivePoints.ALIGN_RIGHT"
);

// Replace debug panel title
code = code.replace("title: '🔨 Projects'", "title: '🏆 Hackathons'");

// Replace achievement
code = code.replace(
  "this.game.achievements.setProgress('areas', 'projects')",
  "this.game.achievements.setProgress('areas', 'hackathons')"
);

// Safeguard anvil audio position
code = code.replace(
  "positions: this.references.items.get('anvil')[0].position,",
  "positions: this.references.items.get('anvil')?.[0]?.position || new THREE.Vector3(),"
);

// Safeguard oven
code = code.replace(
  "this.oven.blower = this.references.items.get('blower')[0]",
  "this.oven.blower = this.references.items.get('blower')?.[0]"
);
code = code.replace(
  "this.oven.charcoal = this.references.items.get('charcoal')[0]",
  "this.oven.charcoal = this.references.items.get('charcoal')?.[0]"
);

// Safeguard charcoal material assignment if charcoal is missing
code = code.replace(
  "this.oven.charcoal.material = material",
  "if(this.oven.charcoal) this.oven.charcoal.material = material"
);

// Safeguard grinder
code = code.replace(
  "this.grinder = this.references.items.get('grinder')[0]",
  "this.grinder = this.references.items.get('grinder')?.[0]"
);

// Safeguard anvil hammer
code = code.replace(
  "this.anvil.hammer = this.references.items.get('hammer')[0]",
  "this.anvil.hammer = this.references.items.get('hammer')?.[0]"
);

fs.writeFileSync('sources/Game/World/Areas/HackathonsArea.js', code, 'utf8');
console.log('HackathonsArea.js created successfully! File length:', code.length);
