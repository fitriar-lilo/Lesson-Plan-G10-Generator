// Default Semesta School official header as high-res scalable SVG data URI
export function getSemestaDefaultHeaderSVG(primaryColor = '#1e3a8a'): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 160" width="1000" height="160">
    <defs>
      <linearGradient id="headerGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${primaryColor}"/>
        <stop offset="100%" stop-color="#0f172a"/>
      </linearGradient>
      <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#f59e0b"/>
        <stop offset="100%" stop-color="#d97706"/>
      </linearGradient>
    </defs>
    
    <!-- Background Frame -->
    <rect x="0" y="0" width="1000" height="160" fill="#ffffff" />
    <rect x="10" y="8" width="980" height="144" rx="8" fill="url(#headerGrad)" />
    
    <!-- Decorative Gold Accent Bars -->
    <rect x="10" y="146" width="980" height="6" rx="3" fill="url(#goldGrad)" />
    <rect x="25" y="20" width="4" height="120" rx="2" fill="url(#goldGrad)" />
    
    <!-- School Emblem / Shield -->
    <g transform="translate(45, 24)">
      <circle cx="55" cy="56" r="48" fill="#ffffff" opacity="0.15" />
      <path d="M 55,14 L 92,28 C 92,72 55,98 55,98 C 55,98 18,72 18,28 Z" fill="#ffffff" stroke="url(#goldGrad)" stroke-width="4"/>
      <!-- Inner Emblem Details -->
      <path d="M 55,24 L 84,36 C 84,68 55,88 55,88 C 55,88 26,68 26,36 Z" fill="${primaryColor}"/>
      <!-- Compass / Globe / Star Icon -->
      <circle cx="55" cy="54" r="18" fill="none" stroke="#f59e0b" stroke-width="2.5"/>
      <ellipse cx="55" cy="54" rx="18" ry="7" fill="none" stroke="#ffffff" stroke-width="1.5"/>
      <line x1="55" y1="36" x2="55" y2="72" stroke="#ffffff" stroke-width="1.5"/>
      <polygon points="55,42 59,51 68,52 61,58 63,67 55,62 47,67 49,58 42,52 51,51" fill="#f59e0b"/>
    </g>
    
    <!-- School Name & Subtitles -->
    <text x="175" y="46" font-family="'Nunito', 'Segoe UI', Arial, sans-serif" font-weight="800" font-size="25" fill="#ffffff" letter-spacing="1.5">
      SEMESTA BILINGUAL BOARDING SCHOOL
    </text>
    
    <text x="175" y="73" font-family="'Nunito', 'Segoe UI', Arial, sans-serif" font-weight="600" font-size="14.5" fill="#fde047" letter-spacing="1">
      CAMBRIDGE INTERNATIONAL SCHOOL ID058 &bull; HIGH SCHOOL (SMA)
    </text>
    
    <text x="175" y="97" font-family="'Nunito', 'Segoe UI', Arial, sans-serif" font-weight="500" font-size="13" fill="#cbd5e1">
      Jl. Raya Semarang - Boja KM. 15, Gunungpati, Semarang &bull; www.semesta.sch.id
    </text>

    <text x="175" y="125" font-family="'Nunito', 'Segoe UI', Arial, sans-serif" font-weight="800" font-size="16" fill="#ffffff" letter-spacing="1.2">
      CAMBRIDGE IGCSE MATHEMATICS (0580) &mdash; LESSON PLAN (RANCANGAN PEMBELAJARAN)
    </text>

    <!-- Right Side Badge -->
    <g transform="translate(850, 24)">
      <rect x="0" y="8" width="115" height="96" rx="6" fill="#ffffff" opacity="0.12" stroke="#f59e0b" stroke-width="1.5" />
      <text x="57" y="34" font-family="'Nunito', sans-serif" font-weight="800" font-size="12" fill="#fde047" text-anchor="middle">CURRICULUM</text>
      <text x="57" y="58" font-family="'Nunito', sans-serif" font-weight="900" font-size="18" fill="#ffffff" text-anchor="middle">IGCSE 0580</text>
      <text x="57" y="78" font-family="'Nunito', sans-serif" font-weight="700" font-size="12" fill="#cbd5e1" text-anchor="middle">YEAR 10 (SMA)</text>
      <text x="57" y="94" font-family="'Nunito', sans-serif" font-weight="600" font-size="10" fill="#93c5fd" text-anchor="middle">SEM. 2026/2027</text>
    </g>
  </svg>`;

  // Safe base64 encoding for browser canvas compatibility
  const base64 = typeof window !== 'undefined' && window.btoa
    ? window.btoa(unescape(encodeURIComponent(svg)))
    : Buffer.from(svg).toString('base64');

  return `data:image/svg+xml;base64,${base64}`;
}
