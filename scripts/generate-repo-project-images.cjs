const sharp = require('sharp');
const path = require('path');

const destDir = path.resolve('./static/projects/images');

// 1. AegisCore AI Hero Card (1920x1080)
const aegisSvg = `
<svg width="1920" height="1080" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="cyberGlow" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#141E33" />
      <stop offset="60%" stop-color="#080C14" />
      <stop offset="100%" stop-color="#04060A" />
    </radialGradient>
    <linearGradient id="cyberAccent" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#00F0FF" />
      <stop offset="50%" stop-color="#7000FF" />
      <stop offset="100%" stop-color="#FF007A" />
    </linearGradient>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#1E293B" stroke-width="0.7" opacity="0.35"/>
    </pattern>
  </defs>

  <rect width="1920" height="1080" fill="url(#cyberGlow)"/>
  <rect width="1920" height="1080" fill="url(#grid)"/>

  <!-- Center Glassmorphism Showcase Card -->
  <rect x="180" y="140" width="1560" height="800" rx="24" fill="#0D1526" fill-opacity="0.75" stroke="#38BDF8" stroke-width="1.5" stroke-opacity="0.3"/>

  <!-- Top Badge -->
  <rect x="240" y="210" width="360" height="42" rx="21" fill="#0369A1" fill-opacity="0.25" stroke="#38BDF8" stroke-width="1"/>
  <circle cx="265" cy="231" r="5" fill="#38BDF8"/>
  <text x="285" y="237" font-family="'Segoe UI', Roboto, sans-serif" font-weight="700" font-size="15" fill="#38BDF8" letter-spacing="2">EVIDENCE-DRIVEN CYBERSECURITY</text>

  <!-- Title & Subtitle -->
  <text x="240" y="340" font-family="'Segoe UI', Roboto, sans-serif" font-weight="900" font-size="68" fill="#F8FAFC" letter-spacing="-1">AegisCore AI</text>
  <text x="240" y="405" font-family="'Segoe UI', Roboto, sans-serif" font-weight="500" font-size="26" fill="#94A3B8">Business-Impact-Aware • Policy-Constrained • Verified Incident Response</text>

  <!-- Architecture Pipeline Visual -->
  <rect x="240" y="470" width="1440" height="230" rx="16" fill="#070C18" stroke="#1E293B" stroke-width="1.2"/>

  <!-- Pipeline Step 1 -->
  <rect x="280" y="515" width="280" height="140" rx="12" fill="#0F172A" stroke="#334155" stroke-width="1"/>
  <text x="310" y="560" font-family="'Segoe UI', sans-serif" font-weight="700" font-size="18" fill="#38BDF8">01 · TELEMETRY INGEST</text>
  <text x="310" y="595" font-family="'Segoe UI', sans-serif" font-weight="400" font-size="14" fill="#94A3B8">Syslog, SIEM &amp; CloudTrail</text>
  <text x="310" y="620" font-family="'Segoe UI', sans-serif" font-weight="400" font-size="14" fill="#64748B">Zero-noise event normalizer</text>

  <!-- Arrow -->
  <path d="M 585 585 L 635 585" stroke="#00F0FF" stroke-width="2" marker-end="url(#arrow)"/>

  <!-- Pipeline Step 2 -->
  <rect x="660" y="515" width="280" height="140" rx="12" fill="#0F172A" stroke="#334155" stroke-width="1"/>
  <text x="690" y="560" font-family="'Segoe UI', sans-serif" font-weight="700" font-size="18" fill="#A855F7">02 · GRAPH REASONING</text>
  <text x="690" y="595" font-family="'Segoe UI', sans-serif" font-weight="400" font-size="14" fill="#94A3B8">LangGraph Agent Loop</text>
  <text x="690" y="620" font-family="'Segoe UI', sans-serif" font-weight="400" font-size="14" fill="#64748B">MITRE ATT&amp;CK mapping</text>

  <!-- Arrow -->
  <path d="M 965 585 L 1015 585" stroke="#A855F7" stroke-width="2"/>

  <!-- Pipeline Step 3 -->
  <rect x="1040" y="515" width="280" height="140" rx="12" fill="#0F172A" stroke="#334155" stroke-width="1"/>
  <text x="1070" y="560" font-family="'Segoe UI', sans-serif" font-weight="700" font-size="18" fill="#EC4899">03 · POLICY BOUNDS</text>
  <text x="1070" y="595" font-family="'Segoe UI', sans-serif" font-weight="400" font-size="14" fill="#94A3B8">Deterministic Guardrails</text>
  <text x="1070" y="620" font-family="'Segoe UI', sans-serif" font-weight="400" font-size="14" fill="#64748B">Zero hallucinated mitigation</text>

  <!-- Arrow -->
  <path d="M 1345 585 L 1395 585" stroke="#EC4899" stroke-width="2"/>

  <!-- Pipeline Step 4 -->
  <rect x="1420" y="515" width="220" height="140" rx="12" fill="#032B28" stroke="#10B981" stroke-width="1"/>
  <text x="1445" y="560" font-family="'Segoe UI', sans-serif" font-weight="700" font-size="18" fill="#34D399">04 · RUNBOOK</text>
  <text x="1445" y="595" font-family="'Segoe UI', sans-serif" font-weight="400" font-size="14" fill="#A7F3D0">Verified Patch</text>
  <text x="1445" y="620" font-family="'Segoe UI', sans-serif" font-weight="400" font-size="14" fill="#6EE7B7">&lt; 1.2s Triage</text>

  <!-- Stack Pills at Bottom -->
  <rect x="240" y="740" width="130" height="36" rx="8" fill="#1E293B"/>
  <text x="305" y="763" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-size="14" font-weight="600" fill="#E2E8F0">Python 3.12</text>

  <rect x="385" y="740" width="110" height="36" rx="8" fill="#1E293B"/>
  <text x="440" y="763" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-size="14" font-weight="600" fill="#E2E8F0">FastAPI</text>

  <rect x="510" y="740" width="125" height="36" rx="8" fill="#1E293B"/>
  <text x="572" y="763" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-size="14" font-weight="600" fill="#E2E8F0">LangGraph</text>

  <rect x="650" y="740" width="135" height="36" rx="8" fill="#1E293B"/>
  <text x="717" y="763" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-size="14" font-weight="600" fill="#E2E8F0">React 18 + TS</text>

  <rect x="800" y="740" width="145" height="36" rx="8" fill="#1E293B"/>
  <text x="872" y="763" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-size="14" font-weight="600" fill="#E2E8F0">Vector RAG</text>
</svg>
`;

// 2. Precedent Hero Card (1920x1080)
const precedentSvg = `
<svg width="1920" height="1080" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="precedentGlow" cx="50%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#1B1726" />
      <stop offset="60%" stop-color="#0A0810" />
      <stop offset="100%" stop-color="#050408" />
    </radialGradient>
  </defs>

  <rect width="1920" height="1080" fill="url(#precedentGlow)"/>

  <!-- Glass Card -->
  <rect x="180" y="140" width="1560" height="800" rx="24" fill="#120E1E" fill-opacity="0.8" stroke="#A855F7" stroke-width="1.5" stroke-opacity="0.3"/>

  <!-- Badge -->
  <rect x="240" y="210" width="340" height="42" rx="21" fill="#7E22CE" fill-opacity="0.25" stroke="#C084FC" stroke-width="1"/>
  <circle cx="265" cy="231" r="5" fill="#C084FC"/>
  <text x="285" y="237" font-family="'Segoe UI', sans-serif" font-weight="700" font-size="15" fill="#C084FC" letter-spacing="2">AI EXAM PREP PLATFORM</text>

  <!-- Title & Subtitle -->
  <text x="240" y="340" font-family="'Segoe UI', sans-serif" font-weight="900" font-size="68" fill="#FAF5FF" letter-spacing="-1">Precedent</text>
  <text x="240" y="405" font-family="'Segoe UI', sans-serif" font-weight="500" font-size="26" fill="#D8B4FE">PYQ Topic Predictor • Marks-Optimized Revision • Exam-Accurate Mock Synthesis</text>

  <!-- 3 Metric Cards -->
  <rect x="240" y="480" width="450" height="200" rx="16" fill="#18122B" stroke="#2E1065" stroke-width="1.2"/>
  <text x="280" y="540" font-family="'Segoe UI', sans-serif" font-weight="700" font-size="22" fill="#E9D5FF">Multi-Year PYQ Ingestion</text>
  <text x="280" y="585" font-family="'Segoe UI', sans-serif" font-weight="400" font-size="16" fill="#C4B5FD">Semantic cross-referencing against university</text>
  <text x="280" y="615" font-family="'Segoe UI', sans-serif" font-weight="400" font-size="16" fill="#C4B5FD">syllabi to isolate high-yield exam modules.</text>

  <rect x="730" y="480" width="450" height="200" rx="16" fill="#18122B" stroke="#2E1065" stroke-width="1.2"/>
  <text x="770" y="540" font-family="'Segoe UI', sans-serif" font-weight="700" font-size="22" fill="#E9D5FF">Topic Frequency Predictor</text>
  <text x="770" y="585" font-family="'Segoe UI', sans-serif" font-weight="400" font-size="16" fill="#C4B5FD">Calculates repeat probability scores per unit</text>
  <text x="770" y="615" font-family="'Segoe UI', sans-serif" font-weight="400" font-size="16" fill="#C4B5FD">to maximize score-per-hour study ROI.</text>

  <rect x="1220" y="480" width="450" height="200" rx="16" fill="#18122B" stroke="#2E1065" stroke-width="1.2"/>
  <text x="1260" y="540" font-family="'Segoe UI', sans-serif" font-weight="700" font-size="22" fill="#E9D5FF">Mock Paper Generator</text>
  <text x="1260" y="585" font-family="'Segoe UI', sans-serif" font-weight="400" font-size="16" fill="#C4B5FD">Synthesizes strictly formatted mock papers</text>
  <text x="1260" y="615" font-family="'Segoe UI', sans-serif" font-weight="400" font-size="16" fill="#C4B5FD">with detailed marking schemes and model answers.</text>

  <!-- Tags -->
  <rect x="240" y="730" width="130" height="36" rx="8" fill="#2E1065"/>
  <text x="305" y="753" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-size="14" font-weight="600" fill="#F3E8FF">Python</text>

  <rect x="385" y="730" width="140" height="36" rx="8" fill="#2E1065"/>
  <text x="455" y="753" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-size="14" font-weight="600" fill="#F3E8FF">FastAPI RAG</text>

  <rect x="540" y="730" width="160" height="36" rx="8" fill="#2E1065"/>
  <text x="620" y="753" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-size="14" font-weight="600" fill="#F3E8FF">Topic Prediction</text>

  <rect x="715" y="730" width="130" height="36" rx="8" fill="#2E1065"/>
  <text x="780" y="753" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-size="14" font-weight="600" fill="#F3E8FF">Netlify Live</text>
</svg>
`;

// 3. GramSetu Hero Card (1920x1080)
const gramSetuSvg = `
<svg width="1920" height="1080" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="gramGlow" cx="50%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#0E231B" />
      <stop offset="60%" stop-color="#06120D" />
      <stop offset="100%" stop-color="#020805" />
    </radialGradient>
  </defs>

  <rect width="1920" height="1080" fill="url(#gramGlow)"/>

  <!-- Glass Card -->
  <rect x="180" y="140" width="1560" height="800" rx="24" fill="#0A1A14" fill-opacity="0.85" stroke="#10B981" stroke-width="1.5" stroke-opacity="0.3"/>

  <!-- Badge -->
  <rect x="240" y="210" width="370" height="42" rx="21" fill="#047857" fill-opacity="0.25" stroke="#34D399" stroke-width="1"/>
  <circle cx="265" cy="231" r="5" fill="#34D399"/>
  <text x="285" y="237" font-family="'Segoe UI', sans-serif" font-weight="700" font-size="15" fill="#34D399" letter-spacing="2">GEOSPATIAL DECISION SUPPORT</text>

  <!-- Title & Subtitle -->
  <text x="240" y="340" font-family="'Segoe UI', sans-serif" font-weight="900" font-size="68" fill="#F0FDF4" letter-spacing="-1">GramSetu</text>
  <text x="240" y="405" font-family="'Segoe UI', sans-serif" font-weight="500" font-size="26" fill="#86EFAC">Rural India Infrastructure Digital Twin • Spatial Accessibility &amp; Gap Analysis</text>

  <!-- 3 Feature Columns -->
  <rect x="240" y="480" width="450" height="200" rx="16" fill="#062016" stroke="#047857" stroke-width="1.2"/>
  <text x="280" y="540" font-family="'Segoe UI', sans-serif" font-weight="700" font-size="22" fill="#D1FAE5">Village Infrastructure Twin</text>
  <text x="280" y="585" font-family="'Segoe UI', sans-serif" font-weight="400" font-size="16" fill="#A7F3D0">Maps roads, power grids, healthcare &amp; water</text>
  <text x="280" y="615" font-family="'Segoe UI', sans-serif" font-weight="400" font-size="16" fill="#A7F3D0">resources into an interactive spatial digital twin.</text>

  <rect x="730" y="480" width="450" height="200" rx="16" fill="#062016" stroke="#047857" stroke-width="1.2"/>
  <text x="770" y="540" font-family="'Segoe UI', sans-serif" font-weight="700" font-size="22" fill="#D1FAE5">Accessibility Gap Detection</text>
  <text x="770" y="585" font-family="'Segoe UI', sans-serif" font-weight="400" font-size="16" fill="#A7F3D0">Isochrone analysis identifying remote habitations</text>
  <text x="770" y="615" font-family="'Segoe UI', sans-serif" font-weight="400" font-size="16" fill="#A7F3D0">cut off from emergency services and primary schools.</text>

  <rect x="1220" y="480" width="450" height="200" rx="16" fill="#062016" stroke="#047857" stroke-width="1.2"/>
  <text x="1260" y="540" font-family="'Segoe UI', sans-serif" font-weight="700" font-size="22" fill="#D1FAE5">Data-Driven Planning</text>
  <text x="1260" y="585" font-family="'Segoe UI', sans-serif" font-weight="400" font-size="16" fill="#A7F3D0">Simulates impact of new road corridors and</text>
  <text x="1260" y="615" font-family="'Segoe UI', sans-serif" font-weight="400" font-size="16" fill="#A7F3D0">prioritizes fund allocation where impact is highest.</text>

  <!-- Tags -->
  <rect x="240" y="730" width="140" height="36" rx="8" fill="#064E3B"/>
  <text x="310" y="753" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-size="14" font-weight="600" fill="#ECFDF5">TypeScript</text>

  <rect x="395" y="730" width="130" height="36" rx="8" fill="#064E3B"/>
  <text x="460" y="753" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-size="14" font-weight="600" fill="#ECFDF5">GIS Engine</text>

  <rect x="540" y="730" width="170" height="36" rx="8" fill="#064E3B"/>
  <text x="625" y="753" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-size="14" font-weight="600" fill="#ECFDF5">Spatial Analytics</text>

  <rect x="725" y="730" width="130" height="36" rx="8" fill="#064E3B"/>
  <text x="790" y="753" text-anchor="middle" font-family="'Segoe UI', sans-serif" font-size="14" font-weight="600" fill="#ECFDF5">Leaflet Maps</text>
</svg>
`;

async function run() {
    await sharp(Buffer.from(aegisSvg)).png().toFile(path.join(destDir, 'aegiscore-1.png'));
    console.log('✓ Generated aegiscore-1.png');

    await sharp(Buffer.from(precedentSvg)).png().toFile(path.join(destDir, 'precedent-1.png'));
    console.log('✓ Generated precedent-1.png');

    await sharp(Buffer.from(gramSetuSvg)).png().toFile(path.join(destDir, 'gramsetu-1.png'));
    console.log('✓ Generated gramsetu-1.png');

    console.log('All custom project graphics created successfully!');
}

run().catch(console.error);
