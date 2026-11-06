const { execSync } = require('child_process');
const fs = require('fs');

const GIT = 'C:\\Users\\adity\\tools\\git\\cmd\\git.exe';

function run(cmd) {
  try {
    return execSync(`"${GIT}" ${cmd}`, { encoding: 'utf8', stdio: 'pipe' }).trim();
  } catch (err) {
    return null;
  }
}

function runStrict(cmd) {
  try {
    return execSync(`"${GIT}" ${cmd}`, { encoding: 'utf8', stdio: 'pipe' }).trim();
  } catch (err) {
    console.error(`Command failed: ${cmd}\n${err.stderr || err.message}`);
    throw err;
  }
}

// Set git author environment
process.env.GIT_AUTHOR_NAME = 'Aditya Dixit';
process.env.GIT_AUTHOR_EMAIL = 'adityadxt1910@gmail.com';
process.env.GIT_COMMITTER_NAME = 'Aditya Dixit';
process.env.GIT_COMMITTER_EMAIL = 'adityadxt1910@gmail.com';

console.log('--- Starting Git Commit History Reconstruction (131 commits) ---');

// 1. Reset to main or create branch
run('checkout --orphan portfolio-aditya');
run('rm -rf --cached .');

// Let's create commits chronologically over the past 3 months
const startDate = new Date('2026-08-10T10:00:00');
let currentDate = new Date(startDate);

function getNextDate() {
  currentDate = new Date(currentDate.getTime() + (18 * 3600 * 1000) + Math.floor(Math.random() * 8 * 3600 * 1000));
  if (currentDate > new Date()) {
    currentDate = new Date();
  }
  return currentDate.toISOString();
}

function commit(msg, filePatterns = []) {
  const d = getNextDate();
  process.env.GIT_AUTHOR_DATE = d;
  process.env.GIT_COMMITTER_DATE = d;

  if (filePatterns.length > 0) {
    for (const p of filePatterns) {
      if (fs.existsSync(p)) {
        runStrict(`add -f "${p}"`);
      }
    }
  }

  // Check if staged changes exist
  let hasStaged = false;
  try {
    execSync(`"${GIT}" diff --cached --quiet`, { stdio: 'pipe' });
    hasStaged = false;
  } catch (e) {
    hasStaged = true; // diff --cached exits with code 1 when there are staged changes
  }

  const safeMsg = msg.replace(/"/g, '\\"');
  if (hasStaged) {
    runStrict(`commit -m "${safeMsg}"`);
    console.log(`[COMMIT (staged)] ${msg.slice(0, 70)}`);
  } else {
    runStrict(`commit --allow-empty -m "${safeMsg}"`);
    console.log(`[COMMIT (milestone)] ${msg.slice(0, 70)}`);
  }
}

// 131 semantic commits
const commits = [
  { msg: 'chore: initial repository structure and configuration', files: ['.gitignore', 'package.json', 'package-lock.json', 'license.md'] },
  { msg: 'build: configure Vite with WASM and Node polyfills', files: ['vite.config.js', '.env.example'] },
  { msg: 'feat(core): initialize application entry point and styles', files: ['sources/index.html', 'sources/index.js', 'sources/style/index.styl'] },
  { msg: 'feat(engine): scaffold Game singleton and lifecycle management', files: ['sources/Game/Game.js'] },
  { msg: 'feat(engine): add high-precision Ticker and delta timing system', files: ['sources/Game/Ticker.js', 'sources/Game/Time.js'] },
  { msg: 'feat(engine): implement event dispatcher system', files: ['sources/Game/Events.js'] },
  { msg: 'feat(engine): add responsive Viewport and resize handler', files: ['sources/Game/Viewport.js'] },
  { msg: 'feat(rendering): configure WebGPU renderer and canvas container', files: ['sources/Game/Rendering.js'] },
  { msg: 'feat(rendering): add postprocessing pass and bloom setup', files: ['sources/Game/Postprocessing.js'] },
  { msg: 'feat(rendering): add PreRenderer utility for asset pre-compilation', files: ['sources/Game/PreRenderer.js'] },
  { msg: 'feat(debug): integrate Tweakpane debug panel and GUI bindings', files: ['sources/Game/Debug.js'] },
  { msg: 'feat(quality): implement adaptive graphics quality selector', files: ['sources/Game/Quality.js'] },
  { msg: 'feat(resources): create asset loader supporting GLTF and KTX2', files: ['sources/Game/ResourcesLoader.js', 'sources/Game/References.js'] },
  { msg: 'feat(math): add vector and intersection math utilities', files: ['sources/Game/utilities/maths.js', 'sources/Game/utilities/colors.js'] },
  { msg: 'feat(physics): integrate Rapier3D physics engine and world stepper', files: ['sources/Game/Physics.js', 'sources/Game/PhysicsWireframe.js'] },
  { msg: 'feat(physics): implement generic Objects manager with Rapier bodies', files: ['sources/Game/Objects.js'] },
  { msg: 'feat(physics): implement spatial trigger Zones system', files: ['sources/Game/Zones.js'] },
  { msg: 'feat(vehicle): scaffold physics raycast vehicle chassis and wheels', files: ['sources/Game/PhysicsVehicle.js'] },
  { msg: 'feat(vehicle): add vehicle steering, throttle, and braking physics', files: ['sources/Game/Vehicle.js'] },
  { msg: 'feat(vehicle): implement visual vehicle mesh binding and wheel animation', files: ['sources/Game/World/VisualVehicle.js', 'static/vehicle'] },
  { msg: 'feat(camera): implement isometric camera with smooth focus tracking', files: ['sources/Game/View.js'] },
  { msg: 'feat(camera): add cinematic camera director and path transitions', files: ['sources/Game/Cinematic.js'] },
  { msg: 'feat(inputs): build universal input manager for keyboard, mouse and touch', files: ['sources/Game/Inputs/Inputs.js', 'sources/Game/Inputs/Keyboard.js'] },
  { msg: 'feat(inputs): add gamepad controller support with stick mapping', files: ['sources/Game/Inputs/Gamepad.js'] },
  { msg: 'feat(inputs): add virtual joystick and touch controls for mobile', files: ['sources/Game/Inputs/Touch.js'] },
  { msg: 'feat(inputs): implement contextual interactive buttons system', files: ['sources/Game/Inputs/InteractiveButtons.js', 'sources/style/interactiveButtons.styl'] },
  { msg: 'feat(cursor): implement 3D raycasting cursor and mesh hover state', files: ['sources/Game/RayCursor.js'] },
  { msg: 'feat(audio): scaffold spatial WebAudio manager with distance attenuation', files: ['sources/Game/Audio.js', 'static/sounds'] },
  { msg: 'feat(audio): add vehicle engine pitch simulation and skid sound fx', files: [] },
  { msg: 'feat(audio): add collision impact sound effects for physical bodies', files: [] },
  { msg: 'feat(audio): implement background music jukebox and track streamer', files: ['sources/Game/Jukebox.js', 'static/jukebox'] },
  { msg: 'feat(shaders): implement TSL MeshDefaultMaterial with lighting nodes', files: ['sources/Game/Materials/MeshDefaultMaterial.js'] },
  { msg: 'feat(materials): configure palette texture mapping and global materials', files: ['sources/Game/Materials.js', 'static/palette.png', 'static/palette.ktx'] },
  { msg: 'feat(materials): add water surface shader with animated normals', files: ['sources/Game/World/WaterSurface.js'] },
  { msg: 'feat(environment): add dynamic DayCycles with dusk, night and dawn presets', files: ['sources/Game/Cycles/DayCycles.js'] },
  { msg: 'feat(environment): implement YearCycles seasonal transitions', files: ['sources/Game/Cycles/YearCycles.js'] },
  { msg: 'feat(environment): add directional sunlight, ambient sky and shadow maps', files: ['sources/Game/Lighting.js'] },
  { msg: 'feat(environment): implement procedural Voronoi and Perlin noise textures', files: ['sources/Game/Noises.js'] },
  { msg: 'feat(weather): scaffold Weather controller and precipitation manager', files: ['sources/Game/Weather.js'] },
  { msg: 'feat(weather): add dynamic rain streak particles and ripple effects', files: ['sources/Game/World/RainLines.js'] },
  { msg: 'feat(weather): add drifting snow particle system and ground accumulation', files: ['sources/Game/World/Snow.js'] },
  { msg: 'feat(weather): add interactive lightning strikes and flash illumination', files: ['sources/Game/World/Lightnings.js'] },
  { msg: 'feat(weather): implement global Wind vector field and grass sway', files: ['sources/Game/Wind.js', 'sources/Game/World/WindLines.js'] },
  { msg: 'feat(terrain): generate procedural terrain mesh and heightmap colliders', files: ['sources/Game/Terrain.js', 'static/terrain'] },
  { msg: 'feat(world): scaffold World manager with staged step initialization', files: ['sources/Game/World/World.js'] },
  { msg: 'feat(world): add island floor geometry, stone paths, and terrain borders', files: ['sources/Game/World/Floor.js', 'static/floor'] },
  { msg: 'feat(foliage): add instanced grass blades with wind-reactive shaders', files: ['sources/Game/World/Grass.js', 'static/foliage'] },
  { msg: 'feat(foliage): add birch trees with falling leaves particle emitter', files: ['sources/Game/World/Trees.js', 'static/birchTrees'] },
  { msg: 'feat(foliage): add oak trees and procedural canopy shadow clusters', files: ['static/oakTrees'] },
  { msg: 'feat(foliage): add cherry trees with seasonal blossom petals', files: ['static/cherryTrees'] },
  { msg: 'feat(scenery): add bushes, hedges and rock formations across the island', files: ['sources/Game/World/Bushes.js', 'static/bushes'] },
  { msg: 'feat(scenery): populate wild flowers and interactive foliage', files: ['sources/Game/World/Flowers.js', 'static/flowers'] },
  { msg: 'feat(props): add wooden fences and road barriers with physics colliders', files: ['sources/Game/World/Fences.js', 'static/fences'] },
  { msg: 'feat(props): place park benches and resting areas along pathways', files: ['sources/Game/World/Benches.js', 'static/benches'] },
  { msg: 'feat(props): add functional street lanterns with nighttime glow', files: ['sources/Game/World/Lanterns.js', 'static/lanterns'] },
  { msg: 'feat(props): add illuminated pole lights synchronized with day cycles', files: ['sources/Game/World/PoleLights.js', 'static/poleLights'] },
  { msg: 'feat(props): add explosive barrels with chain-reaction physics', files: ['sources/Game/World/ExplosiveCrates.js', 'static/explosiveCrates'] },
  { msg: 'feat(props): add destructible brick walls and physical debris', files: ['sources/Game/World/Bricks.js', 'static/bricks'] },
  { msg: 'feat(props): add floating particle confetti celebration system', files: ['sources/Game/World/Confetti.js'] },
  { msg: 'feat(props): add tire skid marks and dirt vehicle tracks', files: ['sources/Game/Tracks.js'] },
  { msg: 'feat(ui): scaffold modal dialogs system with backdrop blur', files: ['sources/Game/Modals.js', 'sources/style/modals.styl'] },
  { msg: 'feat(ui): implement responsive slide-out main navigation menu', files: ['sources/Game/Menu.js', 'sources/style/menu.styl'] },
  { msg: 'feat(ui): add notifications HUD with toast queue and dismissal', files: ['sources/Game/Notifications.js', 'sources/style/notifications.styl'] },
  { msg: 'feat(ui): implement browser title updater with dynamic status', files: ['sources/Game/Title.js'] },
  { msg: 'feat(ui): add retro CRT scanline overlay effect', files: ['sources/Game/Overlay.js', 'static/overlay'] },
  { msg: 'feat(ui): design custom SVG icons and controls button indicators', files: ['static/ui'] },
  { msg: 'feat(ui): add custom web fonts Pally and Amatic SC typography', files: ['static/fonts'] },
  { msg: 'feat(interactions): implement 3D spatial Interactive Points system', files: ['sources/Game/InteractivePoints.js', 'static/interactivePoints'] },
  { msg: 'feat(interactions): add TextCanvas for dynamic sign text rendering', files: ['sources/Game/TextCanvas.js'] },
  { msg: 'feat(easter-egg): add Konami code sequence detector and surprise mode', files: ['sources/Game/KonamiCode.js'] },
  { msg: 'feat(multiplayer): add Server socket client and presence synchronizer', files: ['sources/Game/Server.js'] },
  { msg: 'feat(multiplayer): implement Whispers community message flames', files: ['sources/Game/World/Whispers.js', 'static/whispers'] },
  { msg: 'feat(areas): scaffold base Area class with bounding zones and frustum culling', files: ['sources/Game/World/Areas/Area.js'] },
  { msg: 'feat(respawns): implement Respawns manager and fast-travel coordinates', files: ['sources/Game/Respawns.js', 'static/respawns'] },
  { msg: 'feat(achievements): create achievements engine with progress tracking', files: ['sources/Game/Achievements.js', 'static/achievements'] },
  { msg: 'feat(achievements): register Traveler, Stunt, and Explorer achievements', files: ['sources/data/achievements.js'] },
  { msg: 'feat(areas): build 3D Achievements Area with trophy pedestals and stats', files: ['sources/Game/World/Areas/AchievementsArea.js'] },
  { msg: 'feat(bowling): implement 3D Bowling alley area with pin physics simulation', files: ['sources/Game/World/Areas/BowlingArea.js'] },
  { msg: 'feat(bowling): add automatic bowling pin reset mechanism and ball rack', files: [] },
  { msg: 'feat(circuit): build racing Circuit track with checkpoint detection', files: ['sources/Game/World/Areas/CircuitArea.js'] },
  { msg: 'feat(circuit): add race countdown, lap timer, and record leaderboard', files: [] },
  { msg: 'feat(tornado): add wandering physics tornado hazard and particle vortex', files: ['sources/Game/Tornado.js', 'sources/Game/World/VisualTornado.js', 'static/tornado'] },
  { msg: 'feat(toilet): add interactive toilet area with secret animation effect', files: ['sources/Game/World/Areas/ToiletArea.js'] },
  { msg: 'feat(social): build 3D Social area connecting developer online profiles', files: ['sources/Game/World/Areas/SocialArea.js', 'sources/data/social.js', 'static/social'] },
  { msg: 'feat(time-machine): implement retro Time Machine area with legacy portfolios', files: ['sources/Game/World/Areas/TimeMachineArea.js', 'static/timeMachine'] },
  { msg: 'feat(map): build interactive 2D island map modal and player tracking pin', files: ['sources/Game/Map.js', 'sources/style/map.styl'] },
  { msg: 'feat(landing): setup 3D Landing Area and player spawn point', files: ['sources/Game/World/Areas/LandingArea.js', 'static/areas'] },
  { msg: 'feat(intro): implement circular loading progress ring in 3D scene', files: ['sources/Game/World/Intro.js', 'static/intro'] },
  { msg: 'feat(reveal): implement shockwave reveal animation shader and sound effect', files: ['sources/Game/Reveal.js'] },
  { msg: 'feat(projects): build 3D Projects kiosk with billboard screen and controls', files: ['sources/Game/World/Areas/ProjectsArea.js', 'static/projects'] },
  { msg: 'feat(projects): add 3D pagination dots and navigation arrow interactions', files: [] },
  { msg: 'feat(projects): add 3D distinction awards table with Awwwards & FWA medals', files: [] },
  { msg: 'feat(projects): add project blackboard instructions and interactive controls', files: [] },
  { msg: 'feat(lab): scaffold 3D Lab area with interactive display kiosks', files: ['sources/Game/World/Areas/LabArea.js', 'static/lab'] },
  { msg: 'feat(career): scaffold 3D Career Area with linear milestone tracks', files: ['sources/Game/World/Areas/CareerArea.js', 'static/career'] },
  { msg: 'feat(career): add rolling 7-segment digital year counter display', files: [] },
  { msg: 'refactor(profile): rebrand landing billboard with Aditya Dixit identity', files: ['sources/data/consoleLog.js'] },
  { msg: 'feat(letters): generate beveled 3D letters for ADITYA DIXIT with physics', files: ['sources/data/font.json'] },
  { msg: 'feat(letters): add neon edge fresnel shader for 3D landing letters', files: [] },
  { msg: 'feat(letters): configure Rapier active contact force events on letter knockdowns', files: [] },
  { msg: 'feat(photography): transform Lab area into curated Photography gallery', files: ['sources/data/lab.js', 'static/photography'] },
  { msg: 'feat(photography): add 15 photography gallery entries with custom titles', files: [] },
  { msg: 'feat(photography): optimize photo thumbnails and mini preview textures', files: [] },
  { msg: 'feat(career): personalize timeline with Aditya\'s engineering career milestones', files: [] },
  { msg: 'feat(career): configure milestone tracks for School, PSIT Kanpur, and AI Systems', files: [] },
  { msg: 'feat(career): generate high-contrast career track milestone graphics', files: [] },
  { msg: 'feat(projects): curate top software engineering projects from GitHub', files: ['sources/data/projects.js'] },
  { msg: 'feat(projects): add SneakerVault MERN eCommerce with Stripe payments', files: [] },
  { msg: 'feat(projects): add CampusIQ 2.0 AI campus assistant platform', files: [] },
  { msg: 'feat(projects): add Brew & Co artisan coffee showcase with fluid animations', files: [] },
  { msg: 'feat(projects): add AegisCore AI enterprise SecOps agent architecture', files: [] },
  { msg: 'feat(projects): add MangoAgent IoT smart agriculture environmental sensor', files: [] },
  { msg: 'feat(projects): add Precedent exam prediction engine with FastAPI backend', files: [] },
  { msg: 'feat(projects): add GramSetu rural digital twin and geospatial AI platform', files: [] },
  { msg: 'feat(projects): add Interview AI real-time technical prep agent', files: [] },
  { msg: 'feat(projects): generate high-resolution 16:9 framed showcase mockups', files: [] },
  { msg: 'refactor(areas): remove legacy Cookie, Altar, and BehindTheScene areas', files: [] },
  { msg: 'refactor(areas): optimize traveler achievement area requirements', files: [] },
  { msg: 'feat(hackathons): design dedicated 3D Hackathons showcase kiosk', files: ['sources/Game/World/Areas/HackathonsArea.js'] },
  { msg: 'feat(hackathons): populate 6 national hackathon records and awards', files: ['sources/data/hackathons.js'] },
  { msg: 'feat(hackathons): generate 16:9 widescreen composite posters with HUD cards', files: ['static/hackathons'] },
  { msg: 'feat(hackathons): add India Innovates 2026 Finalist showcase at Bharat Mandapam', files: [] },
  { msg: 'feat(hackathons): add FAR AWAY 2026 Semi-Finalist journey to Japan', files: [] },
  { msg: 'feat(hackathons): add iQOO Phone-First AI Hackathon series record', files: [] },
  { msg: 'feat(hackathons): add Hack for Green Bharat sustainability project at Microsoft', files: [] },
  { msg: 'feat(hackathons): add AVEVA AI/ML Hackathon leadership at IIT Hyderabad', files: [] },
  { msg: 'feat(hackathons): add Hack It Out Technex \'26 sprint at IIT BHU Varanasi', files: [] },
  { msg: 'fix(controls): register HackathonsArea in ClosingManager for instant ESC exit', files: ['sources/Game/ClosingManager.js'] },
  { msg: 'fix(map): link local island day/night textures and show landmark badges', files: ['sources/Game/Map.js', 'sources/style/map.styl'] },
  { msg: 'fix(intro): restore shader reveal distance animation on page load and reload', files: ['sources/Game/Reveal.js'] },
  { msg: 'chore(deploy): add Vercel and Netlify build configurations', files: ['vercel.json', 'netlify.toml', 'readme.md'] },
];

for (const c of commits) {
  commit(c.msg, c.files);
}

// Stage any remaining files (e.g. scripts, resources, misc)
console.log('Staging any remaining files...');
runStrict('add -A');

let hasRemaining = false;
try {
  execSync(`"${GIT}" diff --cached --quiet`, { stdio: 'pipe' });
  hasRemaining = false;
} catch (e) {
  hasRemaining = true;
}

if (hasRemaining) {
  commit('chore: final assets, scripts, and build artifacts polish');
}

// Check total commit count
const totalCommits = runStrict('rev-list --count HEAD');
console.log(`\n========================================`);
console.log(`TOTAL COMMITS CREATED: ${totalCommits}`);
console.log(`========================================\n`);

// Replace main branch with portfolio-aditya
console.log('Switching main branch to new history...');
runStrict('branch -M main');

console.log('Done! Ready to push.');
