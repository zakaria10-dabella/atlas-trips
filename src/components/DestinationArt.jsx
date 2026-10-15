import { useId } from 'react'

/** Hand-drawn SVG landscape so the project ships with zero external images. */
export default function DestinationArt({ scene, palette, className = '' }) {
  const uid = useId().replace(/:/g, '')
  const [skyTop, skyBottom, ground, light] = palette
  return (
    <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`sky-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={skyTop} />
          <stop offset="1" stopColor={skyBottom} />
        </linearGradient>
        <pattern id={`zellige-${uid}`} width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M12 0l4 8 8 4-8 4-4 8-4-8-8-4 8-4z" fill={light} opacity=".12" />
        </pattern>
      </defs>
      <rect width="400" height="300" fill={`url(#sky-${uid})`} />
      <rect width="400" height="300" fill={`url(#zellige-${uid})`} />
      <circle cx="300" cy="90" r="38" fill={light} opacity=".85" />
      <circle cx="300" cy="90" r="58" fill={light} opacity=".18" />
      <Scene scene={scene} ground={ground} light={light} />
    </svg>
  )
}

function Scene({ scene, ground, light }) {
  switch (scene) {
    case 'dunes':
      return (
        <g>
          <path d="M0 210 C80 150 140 160 210 200 S330 170 400 190 V300 H0z" fill={ground} opacity=".55" />
          <path d="M0 240 C90 190 170 210 240 245 S350 220 400 230 V300 H0z" fill={ground} opacity=".8" />
          <path d="M0 270 C110 240 200 255 280 275 S370 262 400 266 V300 H0z" fill={ground} />
          <g fill="#3B2414" opacity=".75">
            <ellipse cx="120" cy="214" rx="9" ry="5" />
            <rect x="113" y="216" width="2" height="10" />
            <rect x="125" y="216" width="2" height="10" />
            <path d="M128 212 q6 -10 10 -4" stroke="#3B2414" strokeWidth="2" fill="none" />
          </g>
        </g>
      )
    case 'mountains':
      return (
        <g>
          <path d="M0 230 L70 140 L130 200 L200 110 L280 210 L340 150 L400 220 V300 H0z" fill={ground} opacity=".55" />
          <path d="M200 110 L222 138 L208 134 L196 144 L186 130z" fill="#fff" opacity=".9" />
          <path d="M70 140 L86 160 L74 156 L62 162z" fill="#fff" opacity=".8" />
          <path d="M0 260 L90 190 L170 250 L260 180 L400 260 V300 H0z" fill={ground} />
          <g fill={ground} opacity=".9">
            <rect x="40" y="250" width="22" height="16" />
            <rect x="66" y="246" width="18" height="20" />
          </g>
        </g>
      )
    case 'sea':
      return (
        <g>
          <path d="M0 200 H400 V300 H0z" fill={ground} opacity=".7" />
          <path d="M0 220 q25 -8 50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0" stroke={light} strokeWidth="2" fill="none" opacity=".6" />
          <path d="M0 250 q25 -8 50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0" stroke={light} strokeWidth="2" fill="none" opacity=".4" />
          <g fill="#F7F1E6">
            <path d="M0 170 H150 V215 H0z" />
            {[0, 20, 40, 60, 80, 100, 120, 140].map((x) => (
              <rect key={x} x={x} y="160" width="12" height="12" />
            ))}
            <rect x="110" y="128" width="34" height="44" />
            <rect x="106" y="120" width="42" height="10" />
          </g>
          <path d="M260 214 l16 -30 v30z M282 214 h-34 l6 8 h22z" fill="#F7F1E6" opacity=".9" />
        </g>
      )
    case 'blue':
      return (
        <g>
          <path d="M0 160 C100 120 220 110 400 150 V300 H0z" fill="#4E6B3F" opacity=".5" />
          {[
            [10, 200, 60, 50, '#5A7FD0'], [70, 190, 50, 60, '#3E63B8'], [120, 205, 70, 45, '#8FB0EA'],
            [190, 185, 55, 65, '#5A7FD0'], [245, 200, 60, 50, '#2F4BA8'], [305, 190, 95, 60, '#8FB0EA'],
            [30, 240, 80, 60, '#2F4BA8'], [110, 245, 70, 55, '#5A7FD0'], [180, 238, 90, 62, '#3E63B8'], [270, 245, 130, 55, '#5A7FD0'],
          ].map(([x, y, w, h, c], i) => (
            <g key={i}>
              <rect x={x} y={y} width={w} height={h} fill={c} />
              <path d={`M${x + w / 2 - 6} ${y + h} v-16 a6 6 0 0 1 12 0 v16z`} fill="#1F2F66" opacity=".55" />
            </g>
          ))}
        </g>
      )
    case 'kasbah':
      return (
        <g>
          <path d="M0 230 C120 210 260 215 400 235 V300 H0z" fill={ground} opacity=".6" />
          <g fill={ground}>
            <path d="M120 230 V150 l10 -8 l10 8 V230z" />
            <rect x="140" y="170" width="70" height="60" />
            <path d="M210 230 V140 l12 -10 l12 10 V230z" />
            <rect x="234" y="185" width="60" height="45" />
            <path d="M160 170 V120 h30 V170z" />
          </g>
          <g fill="#3A1D0F" opacity=".45">
            <rect x="150" y="185" width="6" height="10" /><rect x="170" y="185" width="6" height="10" />
            <rect x="190" y="185" width="6" height="10" /><rect x="245" y="198" width="6" height="10" />
            <rect x="265" y="198" width="6" height="10" /><rect x="170" y="135" width="10" height="12" />
          </g>
          <path d="M0 270 C140 255 260 262 400 272 V300 H0z" fill="#6B8F5A" opacity=".8" />
        </g>
      )
    case 'lagoon':
      return (
        <g>
          <path d="M0 190 H400 V300 H0z" fill="#3FB5BE" opacity=".75" />
          <path d="M0 230 C120 200 200 215 260 240 S360 250 400 245 V300 H0z" fill={ground} />
          <g transform="translate(110 120)">
            <path d="M0 0 q40 -24 80 0" stroke="#F06A4C" strokeWidth="6" fill="none" />
            <path d="M0 0 L36 70 M80 0 L42 70" stroke="#1E2A3A" strokeWidth="1" opacity=".5" />
          </g>
        </g>
      )
    case 'medina':
    default:
      return (
        <g>
          <g fill={ground} opacity=".55">
            <rect x="0" y="200" width="400" height="100" />
            <rect x="20" y="180" width="60" height="30" /><rect x="300" y="175" width="80" height="30" />
          </g>
          <g fill={ground}>
            <rect x="200" y="90" width="34" height="150" />
            <rect x="196" y="84" width="42" height="10" />
            <rect x="210" y="62" width="14" height="24" />
            <circle cx="217" cy="56" r="5" fill={light} />
            <rect x="0" y="230" width="400" height="70" />
            <rect x="40" y="205" width="90" height="30" />
            <rect x="260" y="200" width="110" height="35" />
          </g>
          <g fill={light} opacity=".35">
            {[50, 80, 110, 280, 310, 340].map((x) => (
              <path key={x} d={`M${x} 235 v-14 a7 7 0 0 1 14 0 v14z`} />
            ))}
            <path d="M210 130 a7 7 0 0 1 14 0 v14 h-14z" />
          </g>
          <g fill="#2F7A4F" opacity=".9">
            <path d="M160 230 q2 -40 4 -60 q-14 -2 -24 6 q10 -14 26 -8 q-6 -14 -22 -14 q18 -6 26 8 q6 -14 22 -12 q-14 6 -18 16 q16 -2 24 10 q-14 -6 -26 -2 q0 20 -2 56z" />
          </g>
        </g>
      )
  }
}
