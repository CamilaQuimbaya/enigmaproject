import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'node:fs';

const LOGO = 'public/enigma-logo-redgold.png';
const logoB64 = readFileSync(LOGO).toString('base64');
const logoData = `data:image/png;base64,${logoB64}`;

// ---------- Favicons (cuadrados, múltiplos aptos para Google) ----------
const iconSizes = [16, 32, 48, 96, 180, 192, 512];
for (const s of iconSizes) {
  const out = s === 180 ? 'public/apple-touch-icon.png' : `public/favicon-${s}.png`;
  await sharp(LOGO).resize(s, s, { fit: 'contain', background: { r: 10, g: 13, b: 18, alpha: 0 } }).png().toFile(out);
}
// favicon.ico (48px PNG servido como .ico — aceptado por navegadores y Google)
await sharp(LOGO).resize(48, 48, { fit: 'contain', background: { r: 10, g: 13, b: 18, alpha: 0 } }).png().toFile('public/favicon.ico');

// ---------- Tarjeta social Open Graph 1200×630 ----------
const W = 1200, H = 630;
const esc = (s) => s.replace(/&/g, '&amp;');
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <radialGradient id="glow" cx="50%" cy="38%" r="75%">
      <stop offset="0%" stop-color="#141A22"/>
      <stop offset="60%" stop-color="#0A0D12"/>
      <stop offset="100%" stop-color="#070A0E"/>
    </radialGradient>
    <radialGradient id="wine" cx="50%" cy="30%" r="45%">
      <stop offset="0%" stop-color="#6F1320" stop-opacity="0.34"/>
      <stop offset="100%" stop-color="#6F1320" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="rule" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#A81E2E"/>
      <stop offset="100%" stop-color="#6F1320"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  <rect width="${W}" height="${H}" fill="url(#wine)"/>
  <rect x="18" y="18" width="${W - 36}" height="${H - 36}" fill="none" stroke="#6F1320" stroke-opacity="0.35" stroke-width="1.5" rx="6"/>
  <image href="${logoData}" x="${(W - 190) / 2}" y="96" width="190" height="190"/>
  <text x="${W / 2}" y="372" text-anchor="middle" font-family="DejaVu Serif" font-weight="bold" font-size="76" letter-spacing="14" fill="#F2EEE6">ENIGMA</text>
  <text x="${W / 2}" y="410" text-anchor="middle" font-family="DejaVu Sans" font-weight="bold" font-size="21" letter-spacing="13" fill="#CE5567">CAPITAL SOLUTIONS</text>
  <rect x="${W / 2 - 40}" y="440" width="80" height="3" rx="1.5" fill="url(#rule)"/>
  <text x="${W / 2}" y="492" text-anchor="middle" font-family="DejaVu Sans" font-size="27" fill="#AEB4BF">${esc('Commercial Funding & Private Capital Consulting')}</text>
  <text x="${W / 2}" y="540" text-anchor="middle" font-family="DejaVu Sans" font-size="17" letter-spacing="2" fill="#7C828E">A BRAND OF ENIGMA ENTERPRISES LLC</text>
</svg>`;
writeFileSync('/tmp/og.svg', svg);
await sharp(Buffer.from(svg)).png().toFile('public/og-image.png');
await sharp(Buffer.from(svg)).jpeg({ quality: 88 }).toFile('public/og-image.jpg');

console.log('OK — iconos + og-image generados');
