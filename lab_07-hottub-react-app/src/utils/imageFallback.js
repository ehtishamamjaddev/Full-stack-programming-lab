export const getFallbackHotTubImage = (label = 'HOTSPRING Hot Tub') => {
  const safeLabel = (label || 'HOTSPRING Hot Tub').replace(/[<>]/g, '').slice(0, 50);

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800" role="img" aria-label="${safeLabel}">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#e7eef8"/>
          <stop offset="100%" stop-color="#dbe6f5"/>
        </linearGradient>
      </defs>
      <rect width="1200" height="800" fill="url(#bg)"/>
      <rect x="120" y="160" width="960" height="480" rx="28" fill="#f6faff" stroke="#bfd2ea" stroke-width="4"/>
      <text x="50%" y="47%" dominant-baseline="middle" text-anchor="middle" fill="#1e3a5f" font-size="48" font-family="Inter, Segoe UI, Arial">
        HOTSPRING
      </text>
      <text x="50%" y="57%" dominant-baseline="middle" text-anchor="middle" fill="#335b88" font-size="28" font-family="Inter, Segoe UI, Arial">
        ${safeLabel}
      </text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
};
