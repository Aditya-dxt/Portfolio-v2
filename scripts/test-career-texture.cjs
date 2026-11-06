const sharp = require('sharp');

const svg = `
<svg width="316" height="60" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="0" width="316" height="60" fill="rgba(0,0,0,0)" />
  <text x="50%" y="22" dominant-baseline="middle" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-weight="900" font-size="20" fill="rgb(255,0,0)" letter-spacing="1">ST. THOMAS SCHOOL</text>
  <rect x="15" y="36" width="286" height="20" rx="3" fill="rgb(0,255,0)" />
  <text x="50%" y="47" dominant-baseline="middle" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="11" fill="rgb(255,0,0)" letter-spacing="1">ICSE 91.2% · ISC 83.4% · CAPTAIN</text>
</svg>
`;

sharp(Buffer.from(svg))
  .png()
  .toFile('./static/career/test-svg.png')
  .then(() => console.log('SVG test succeeded!'))
  .catch(console.error);
