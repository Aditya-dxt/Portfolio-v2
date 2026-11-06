const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const sourceDir = 'C:/Users/adity/OneDrive/Desktop/Portfolio/public/images/projects/';
const targetDir = path.resolve('static/hackathons/images');

const hackathons = [
  {
    id: 'india-innovates',
    file: 'India-Innovates-2026.jpg',
    category: 'GOVERNMENT OF INDIA • NATIONAL CIVIC TECH',
    title: 'India Innovates 2026',
    badge: '🏆 FINALIST — BHARAT MANDAPAM',
    badgeColor: '#f59e0b',
    themeColor: '#ff9933',
    organizer: 'Ministry of Culture & Digital, Govt of India',
    venue: 'Bharat Mandapam, New Delhi',
    timeline: 'Mar 28–29, 2026',
    role: 'Team Leader — Finalist',
    project: 'CivicSentinel AI',
    desc: 'National civic-tech hackathon with 1 Crore+ applicants nationwide. Built CivicSentinel AI — an AI-driven complaint routing, automated priority indexing, and real-time civic governance platform selected among the top finalist teams.',
    tags: ['Civic Tech', 'AI / ML', 'Full-Stack MERN', 'National Finalist']
  },
  {
    id: 'faraway',
    file: 'FarAway-2026.jpg',
    category: 'INTERNATIONAL YOUTH HACKATHON • ASIA ROUNDS',
    title: 'FAR AWAY 2026',
    badge: '✈️ SEMI-FINALIST — DELHI ➔ JAPAN',
    badgeColor: '#38bdf8',
    themeColor: '#f472b6',
    organizer: 'Zuup (Zylon Labs)',
    venue: 'New Delhi ➔ Tokyo, Japan (Finale)',
    timeline: '2026 International Series',
    role: 'Team Leader — Semi Finalist',
    project: 'Global Youth Solution Prototype',
    desc: "India's biggest international youth hackathon (ages 15–25) spanning 3 rigorous competitive stages — from nationwide online qualifiers to Delhi semifinals and a fully-sponsored grand finale in Japan for top teams.",
    tags: ['International', 'Zuup Labs', 'Rapid Prototyping', 'Semi-Finalist']
  },
  {
    id: 'iqoo-hackathon',
    file: 'IQOO-Hackathon-2026.jpg',
    category: 'PHONE-FIRST AI ARCHITECTURE SERIES',
    title: 'iQOO Hackathon 2026',
    badge: '⚡ PHONE-FIRST AI PARTICIPANT',
    badgeColor: '#eab308',
    themeColor: '#06b6d4',
    organizer: 'iQOO × Reskilll',
    venue: 'Bengaluru • Pune • Chennai • Hyderabad',
    timeline: 'Aug 29 – Oct 11, 2026',
    role: 'Participant & AI Developer',
    project: 'On-Device AI Copilot Engine',
    desc: "India's first phone-first AI hackathon series — 30-hour intensive engineering sprints across 4 major tech hubs with a ₹40 Lakh prize pool. Architected on-device intelligence leveraging smartphone hardware as primary dev environment.",
    tags: ['Mobile AI', 'iQOO', '30-Hour Sprint', '₹40L Prize Pool']
  },
  {
    id: 'green-bharat',
    file: 'Hack-For-Green-Bharat.png',
    category: 'MICROSOFT SUSTAINABILITY & GREEN-TECH SPRINT',
    title: 'Hack for Green Bharat',
    badge: '🌱 TEAM LEADER — TECH MASTERS',
    badgeColor: '#10b981',
    themeColor: '#34d399',
    organizer: 'Tech Masters India × Microsoft',
    venue: 'Microsoft Office, Gurugram',
    timeline: 'Mar 13, 2026',
    role: 'Team Leader & ML Lead',
    project: 'EcoTrack AI Sustainability Suite',
    desc: 'AI-focused sustainability and environmental hackathon held at Microsoft Gurugram. Designed machine learning pipelines and real-time environmental data analytics to optimize energy and carbon footprint monitoring.',
    tags: ['AI Sustainability', 'Microsoft Gurugram', 'Machine Learning', 'Team Leader']
  },
  {
    id: 'aveva-aiml',
    file: 'National-AI-ML-Hackathon-By-AVEVA.jpg',
    category: 'IIT HYDERABAD • YUVAAN 2026 FLAGSHIP',
    title: 'National AI/ML Hackathon',
    badge: '🤖 TEAM LEADER — AVEVA TRACK',
    badgeColor: '#84cc16',
    themeColor: '#a3e635',
    organizer: 'IIT Hyderabad × AVEVA',
    venue: 'IIT Hyderabad Campus',
    timeline: 'Mar 21, 2026',
    role: 'Team Leader & Algorithm Designer',
    project: 'Industrial Predictive Analytics',
    desc: 'National-level competitive AI/ML hackathon focused on high-throughput industrial AI solutions. Led team through problem decomposition, neural network training, and prototype deployment under tight hackathon limits.',
    tags: ['Industrial AI', 'IIT Hyderabad', 'AVEVA', 'Deep Learning']
  },
  {
    id: 'technex-hackitout',
    file: 'Hack-It-Out.jpg',
    category: 'IIT BHU VARANASI • TECHNEX \'26 HACKATHON',
    title: 'Hack It Out — Technex \'26',
    badge: '🔥 TEAM LEADER — IIT BHU',
    badgeColor: '#ef4444',
    themeColor: '#f97316',
    organizer: 'IIT (BHU) Varanasi',
    venue: 'IIT BHU, Varanasi',
    timeline: 'Mar 13–15, 2026',
    role: 'Team Leader — Full-Stack',
    project: 'Resilient Rapid Systems',
    desc: 'Flagship 36-hour hackathon of Technex at IIT BHU. Spearheaded rapid prototype ideation, end-to-end architecture design, API integrations, and pitching to panel of industry judges.',
    tags: ['Technex', 'IIT BHU', '36hr Hackathon', 'Team Leader']
  }
];

function escapeXml(unsafe) {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
    }
  });
}

async function buildBanners() {
  console.log('Generating 16:9 widescreen composite posters...');

  for (const h of hackathons) {
    const srcPath = path.join(sourceDir, h.file);
    if (!fs.existsSync(srcPath)) {
      console.error(`Source file not found: ${srcPath}`);
      continue;
    }

    // 1. Prepare blurred background
    const bgBuffer = await sharp(srcPath)
      .resize(1920, 1080, { fit: 'cover' })
      .blur(40)
      .modulate({ brightness: 0.18, saturation: 1.2 })
      .toBuffer();

    // 2. Prepare crisp framed poster on left
    // Max width 720, max height 960
    const posterMeta = await sharp(srcPath).metadata();
    const posterAspect = posterMeta.width / posterMeta.height;
    
    let targetH = 940;
    let targetW = Math.round(targetH * posterAspect);
    if (targetW > 720) {
      targetW = 720;
      targetH = Math.round(targetW / posterAspect);
    }

    const posterResized = await sharp(srcPath)
      .resize(targetW, targetH, { fit: 'inside' })
      .toBuffer();

    // Poster placement: centered vertically, left padding 80
    const posterX = Math.round(70 + (720 - targetW) / 2);
    const posterY = Math.round((1080 - targetH) / 2);

    // 3. SVG overlay for HUD panel & framed aesthetics
    const cardX = 840;
    const cardY = 70;
    const cardW = 1010;
    const cardH = 940;

    const tagsHtml = h.tags.map((t, idx) => {
      const offsetX = cardX + 50 + idx * 210;
      return `
        <g transform="translate(${offsetX}, ${cardY + 810})">
          <rect width="190" height="42" rx="10" fill="#1e293b" fill-opacity="0.9" stroke="#334155" stroke-width="1.5"/>
          <text x="95" y="26" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="600" fill="#cbd5e1" text-anchor="middle">${escapeXml(t)}</text>
        </g>
      `;
    }).join('\n');

    const svgOverlay = Buffer.from(`
      <svg width="1920" height="1080" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="glow" cx="20%" cy="50%" r="50%">
            <stop offset="0%" stop-color="${h.themeColor}" stop-opacity="0.35"/>
            <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
          </radialGradient>
          <linearGradient id="cardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#0f172a" stop-opacity="0.94"/>
            <stop offset="100%" stop-color="#090d16" stop-opacity="0.96"/>
          </linearGradient>
          <linearGradient id="badgeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="${h.badgeColor}" stop-opacity="0.25"/>
            <stop offset="100%" stop-color="${h.themeColor}" stop-opacity="0.15"/>
          </linearGradient>
          <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="18" stdDeviation="25" flood-color="#000000" flood-opacity="0.8"/>
          </filter>
        </defs>

        <!-- Ambient Glow -->
        <rect width="1920" height="1080" fill="url(#glow)"/>

        <!-- Poster Card Border & Shadow -->
        <rect x="${posterX - 6}" y="${posterY - 6}" width="${targetW + 12}" height="${targetH + 12}" rx="22" fill="none" stroke="${h.badgeColor}" stroke-opacity="0.4" stroke-width="3" filter="url(#shadow)"/>

        <!-- Details Card -->
        <rect x="${cardX}" y="${cardY}" width="${cardW}" height="${cardH}" rx="28" fill="url(#cardGrad)" stroke="#334155" stroke-width="2" filter="url(#shadow)"/>
        
        <!-- Subtle Top Accent Line -->
        <path d="M ${cardX + 40} ${cardY} L ${cardX + cardW - 40} ${cardY}" stroke="${h.themeColor}" stroke-width="4" stroke-linecap="round"/>

        <!-- Category Tag -->
        <text x="${cardX + 50}" y="${cardY + 65}" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="700" letter-spacing="2.5" fill="${h.badgeColor}">
          ${escapeXml(h.category)}
        </text>

        <!-- Main Title -->
        <text x="${cardX + 50}" y="${cardY + 125}" font-family="system-ui, -apple-system, sans-serif" font-size="44" font-weight="800" fill="#ffffff" letter-spacing="-0.5">
          ${escapeXml(h.title)}
        </text>

        <!-- Distinction Badge -->
        <g transform="translate(${cardX + 50}, ${cardY + 155})">
          <rect width="520" height="48" rx="12" fill="url(#badgeGrad)" stroke="${h.badgeColor}" stroke-width="2"/>
          <text x="25" y="31" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="800" fill="#ffffff">
            ${escapeXml(h.badge)}
          </text>
        </g>

        <!-- Meta Grid -->
        <!-- Row 1: Organizer & Venue -->
        <g transform="translate(${cardX + 50}, ${cardY + 245})">
          <text x="0" y="0" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="700" letter-spacing="1" fill="#94a3b8">ORGANIZER</text>
          <text x="0" y="28" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="600" fill="#e2e8f0">${escapeXml(h.organizer)}</text>

          <text x="500" y="0" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="700" letter-spacing="1" fill="#94a3b8">VENUE</text>
          <text x="500" y="28" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="600" fill="#e2e8f0">${escapeXml(h.venue)}</text>
        </g>

        <!-- Row 2: Timeline & Role -->
        <g transform="translate(${cardX + 50}, ${cardY + 335})">
          <text x="0" y="0" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="700" letter-spacing="1" fill="#94a3b8">TIMELINE</text>
          <text x="0" y="28" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="600" fill="#38bdf8">${escapeXml(h.timeline)}</text>

          <text x="500" y="0" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="700" letter-spacing="1" fill="#94a3b8">LEADERSHIP ROLE</text>
          <text x="500" y="28" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="700" fill="#a7f3d0">${escapeXml(h.role)}</text>
        </g>

        <!-- Divider -->
        <line x1="${cardX + 50}" y1="${cardY + 400}" x2="${cardX + cardW - 50}" y2="${cardY + 400}" stroke="#1e293b" stroke-width="2"/>

        <!-- Project / Impact Highlight Box -->
        <g transform="translate(${cardX + 50}, ${cardY + 430})">
          <rect width="${cardW - 100}" height="320" rx="18" fill="#0b1120" stroke="#1e293b" stroke-width="1.5"/>
          
          <text x="35" y="42" font-family="system-ui, -apple-system, sans-serif" font-size="15" font-weight="700" letter-spacing="1.5" fill="${h.themeColor}">
            PROJECT &amp; SYSTEM ARCHITECTURE
          </text>
          
          <text x="35" y="85" font-family="system-ui, -apple-system, sans-serif" font-size="28" font-weight="800" fill="#f8fafc">
            ${escapeXml(h.project)}
          </text>
          
          <!-- Wrapped description (foreignObject for clean auto-wrap) -->
          <foreignObject x="35" y="110" width="${cardW - 170}" height="180">
            <div xmlns="http://www.w3.org/1999/xhtml" style="font-family: system-ui, -apple-system, sans-serif; font-size: 20px; line-height: 1.55; color: #94a3b8; font-weight: 400;">
              ${escapeXml(h.desc)}
            </div>
          </foreignObject>
        </g>

        <!-- Tag Pills -->
        ${tagsHtml}

        <!-- Verified Footer -->
        <g transform="translate(${cardX + cardW - 50}, ${cardY + cardH - 35})">
          <text x="0" y="0" font-family="system-ui, -apple-system, sans-serif" font-size="15" font-weight="600" fill="#64748b" text-anchor="end">
            🛡️ VERIFIED HACKATHON RECORD • ADITYA DIXIT
          </text>
        </g>
      </svg>
    `);

    // 4. Combine all layers
    const compositeOutput = await sharp(bgBuffer)
      .composite([
        {
          input: posterResized,
          top: posterY,
          left: posterX
        },
        {
          input: svgOverlay,
          top: 0,
          left: 0
        }
      ])
      .png({ quality: 90 })
      .toFile(path.join(targetDir, `${h.id}.png`));

    console.log(`✓ Created: ${h.id}.png (${compositeOutput.width}x${compositeOutput.height})`);
  }

  console.log('All 6 hackathon 16:9 widescreen posters created successfully!');
}

buildBanners().catch(console.error);
