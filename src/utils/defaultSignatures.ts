export function getCursiveSignature(name: string, title?: string): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 110" width="320" height="110">
    <style>
      .sig { font-family: 'Brush Script MT', 'Dancing Script', 'Caveat', cursive, sans-serif; font-size: 34px; fill: #1e3a8a; }
      .meta { font-family: 'Nunito', sans-serif; font-size: 11px; fill: #64748b; font-weight: 600; }
    </style>
    <!-- Cursive flourish line -->
    <path d="M 25,65 Q 90,20 160,55 T 290,45" fill="none" stroke="#2563eb" stroke-width="2.5" opacity="0.6"/>
    <text x="35" y="58" class="sig">${name}</text>
    <line x1="20" y1="80" x2="300" y2="80" stroke="#94a3b8" stroke-width="1.2" stroke-dasharray="4,4"/>
    ${title ? `<text x="35" y="98" class="meta">${title}</text>` : ''}
  </svg>`;

  const base64 = typeof window !== 'undefined' && window.btoa
    ? window.btoa(unescape(encodeURIComponent(svg)))
    : Buffer.from(svg).toString('base64');

  return `data:image/svg+xml;base64,${base64}`;
}
