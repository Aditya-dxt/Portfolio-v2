const sharp = require('sharp');
const path = require('path');

const destDir = path.resolve('./static/projects/images');

// Interview AI
const interviewSvg = `
<svg width="1920" height="1080" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="interviewGlow" cx="50%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#14213D" />
      <stop offset="60%" stop-color="#090E1A" />
      <stop offset="100%" stop-color="#04060B" />
    </radialGradient>
  </defs>

  <rect width="1920" height="1080" fill="url(#interviewGlow)"/>

  <!-- Glass Card -->
  <rect x="180" y="140" width="1560" height="800" rx="24" fill="#0E172A" fill-opacity="0.8" stroke="#3B82F6" stroke-width="1.5" stroke-opacity="0.3"/>

  <!-- Badge -->
  <rect x="240" y="210" width="310" height="42" rx="21" fill="#1D4ED8" fill-opacity="0.25" stroke="#60A5FA" stroke-width="1"/>
  <circle cx="265" cy="231" r="5" fill="#60A5FA"/>
  <text x="285" y="237" font-family="'Segoe UI', sans-serif" font-weight="700" font-size="15" fill="#60A5FA" letter-spacing="2">DUAL-ENGINE EVALUATION</text>

  <!-- Title & Subtitle -->
  <text x="240" y="340" font-family="'Segoe UI', sans-serif" font-weight="900" font-size="68" fill="#F8FAFC" letter-spacing="-1">Interview AI</text>
  <text x="240" y="405" font-family="'Segoe UI', sans-serif" font-weight="500" font-size="26" fill="#93C5FD">Real-Time Mock Interviewing • Adaptive Questions • Objective Rubric Feedback</text>

  <!-- 3 Feature Columns -->
  <rect x="240" y="480" width="450" height="200" rx="16" fill="#0B1324" stroke="#1E3A8A" stroke-width="1.2"/>
  <text x="280" y="540" font-family="'Segoe UI', sans-serif" font-weight="700" font-size="22" fill="#DBEAFE">Dual-Model Architecture</text>
  <text x="280" y="585" font-family="'Segoe UI', sans-serif" font-weight="400" font-size="16" fill="#93C5FD">OpenAI + Gemini dual-pipeline question</text>
  <text x="280" y="615" font-family="'Segoe UI', sans-serif" font-weight="400" font-size="16" fill="#93C5FD">generation tailored to tech stack and seniority.</text>

  <rect x="730" y="480" width="450" height="200" rx="16" fill="#0B1324" stroke="#1E3A8A" stroke-width="1.2"/>
  <text x="770" y="540" font-family="'Segoe UI', sans-serif" font-weight="700" font-size="22" fill="#DBEAFE">Real-Time Evaluation</text>
  <text x="770" y="585" font-family="'Segoe UI', sans-serif" font-weight="400" font-size="16" fill="#93C5FD">Streaming voice and code analysis grading</text>
  <text x="770" y="615" font-family="'Segoe UI', sans-serif" font-weight="400" font-size="16" fill="#93C5FD">accuracy, depth, syntax, and delivery confidence.</text>

  <rect x="1220" y="480" width="450" height="200" rx="16" fill="#0B1324" stroke="#1E3A8A" stroke-width="1.2"/>
  <text x="1260" y="540" font-family="'Segoe UI', sans-serif" font-weight="700" font-size="22" fill="#DBEAFE">Actionable Scorecards</text>
  <text x="1260" y="585" font-family="'Segoe UI', sans-serif" font-weight="400" font-size="16" fill="#93C5FD">Generates granular rubric breakdowns with</text>
  <text x="1260" y="615" font-family="'Segoe UI', sans-serif" font-weight="400" font-size="16" fill="#93C5FD">code refactoring suggestions and study tips.</text>

  <!-- Tags -->
  <rect x="240" y="730" width="130" height="36" rx="8" fill="#1E3A8A"/>
  <text x="305" y="753" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-size="14" font-weight="600" fill="#EFF6FF">React 18</text>

  <rect x="385" y="730" width="160" height="36" rx="8" fill="#1E3A8A"/>
  <text x="465" y="753" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-size="14" font-weight="600" fill="#EFF6FF">OpenAI + Gemini</text>

  <rect x="560" y="730" width="160" height="36" rx="8" fill="#1E3A8A"/>
  <text x="640" y="753" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-size="14" font-weight="600" fill="#EFF6FF">Web Audio API</text>

  <rect x="735" y="730" width="140" height="36" rx="8" fill="#1E3A8A"/>
  <text x="805" y="753" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-size="14" font-weight="600" fill="#EFF6FF">Vercel Live</text>
</svg>
`;

async function run() {
    await sharp(Buffer.from(interviewSvg)).png().toFile(path.join(destDir, 'interviewai-1.png'));
    console.log('✓ Generated interviewai-1.png');
}

run().catch(console.error);
