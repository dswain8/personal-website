/** Illustrated desk-by-window backdrop for Option A homepage. Decorative only. */
export default function DeskScene() {
  return (
    <div className="desk-scene" aria-hidden="true">
      <svg
        className="desk-scene-svg"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#9eb4c2" />
            <stop offset="45%" stopColor="#b8c9d2" />
            <stop offset="100%" stopColor="#d4dde2" />
          </linearGradient>
          <linearGradient id="wall" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#c5c9c4" />
            <stop offset="55%" stopColor="#b8bdb6" />
            <stop offset="100%" stopColor="#aeb4ae" />
          </linearGradient>
          <linearGradient id="deskWood" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8a5c38" />
            <stop offset="40%" stopColor="#6e4528" />
            <stop offset="100%" stopColor="#4a2e1a" />
          </linearGradient>
          <linearGradient id="curtain" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#5a6d68" />
            <stop offset="35%" stopColor="#7a8f88" />
            <stop offset="70%" stopColor="#657a74" />
            <stop offset="100%" stopColor="#4e615c" />
          </linearGradient>
          <linearGradient id="glassLight" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(255,255,255,0.22)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
          <clipPath id="winClip">
            <rect x="420" y="48" width="600" height="380" rx="4" />
          </clipPath>
        </defs>

        {/* Room wall */}
        <rect width="1440" height="900" fill="url(#wall)" />
        {/* Soft window light wash on wall */}
        <ellipse
          className="desk-scene-glow"
          cx="720"
          cy="280"
          rx="520"
          ry="340"
          fill="rgba(232,240,244,0.45)"
        />

        {/* Window frame */}
        <rect
          x="408"
          y="36"
          width="624"
          height="404"
          rx="6"
          fill="#3d4a48"
        />
        <rect
          x="420"
          y="48"
          width="600"
          height="380"
          rx="3"
          fill="url(#sky)"
          clipPath="url(#winClip)"
        />

        {/* Soft hills + monsoon haze outside */}
        <g clipPath="url(#winClip)">
          <ellipse
            className="desk-scene-haze"
            cx="720"
            cy="200"
            rx="280"
            ry="60"
            fill="rgba(255,255,255,0.28)"
          />
          <path
            d="M420 320 C520 260, 580 280, 680 250 C780 220, 860 270, 1020 240 L1020 428 L420 428 Z"
            fill="#7a9482"
            opacity="0.85"
          />
          <path
            d="M420 350 C540 300, 620 330, 740 300 C860 270, 940 320, 1020 290 L1020 428 L420 428 Z"
            fill="#5f7a6a"
          />
          <path
            d="M420 390 C500 360, 640 380, 780 355 C900 335, 980 360, 1020 350 L1020 428 L420 428 Z"
            fill="#4a6356"
          />
          {/* Light rain streaks */}
          <g className="desk-scene-rain" opacity="0.22" stroke="#e8f0f4" strokeWidth="1.2">
            <line x1="480" y1="70" x2="468" y2="200" />
            <line x1="560" y1="90" x2="548" y2="240" />
            <line x1="640" y1="60" x2="628" y2="190" />
            <line x1="720" y1="100" x2="708" y2="250" />
            <line x1="800" y1="75" x2="788" y2="210" />
            <line x1="880" y1="95" x2="868" y2="235" />
            <line x1="960" y1="80" x2="948" y2="220" />
          </g>
          <rect
            x="420"
            y="48"
            width="600"
            height="380"
            fill="url(#glassLight)"
          />
        </g>

        {/* Mullions */}
        <rect x="712" y="48" width="8" height="380" fill="#2f3a38" />
        <rect x="420" y="230" width="600" height="6" fill="#2f3a38" />
        {/* Inner sill */}
        <rect x="400" y="420" width="640" height="22" rx="2" fill="#4a5654" />
        <rect x="400" y="436" width="640" height="10" fill="#353f3d" />

        {/* Curtain (left) */}
        <g className="desk-scene-curtain">
          <path
            d="M360 40 C390 80, 370 160, 395 240 C370 320, 390 400, 365 460 L300 460 L300 40 Z"
            fill="url(#curtain)"
          />
          <path
            d="M320 40 C350 100, 330 200, 355 280 C335 360, 350 420, 325 460"
            fill="none"
            stroke="rgba(30,40,38,0.2)"
            strokeWidth="3"
          />
        </g>

        {/* Desk surface */}
        <path
          d="M0 560 L1440 540 L1440 900 L0 900 Z"
          fill="url(#deskWood)"
        />
        {/* Wood grain hints */}
        <g opacity="0.12" stroke="#2a180c" strokeWidth="1.5" fill="none">
          <path d="M0 620 Q360 600, 720 630 T1440 610" />
          <path d="M0 700 Q400 680, 800 710 T1440 690" />
          <path d="M0 780 Q360 760, 720 790 T1440 770" />
        </g>
        {/* Desk front edge */}
        <path d="M0 560 L1440 540 L1440 575 L0 595 Z" fill="#3e2616" />
        {/* Soft shadow where radio sits */}
        <ellipse
          cx="720"
          cy="620"
          rx="340"
          ry="36"
          fill="rgba(20,12,6,0.35)"
        />

        {/* Quiet props — notebook + mug, left of radio zone */}
        <g className="desk-scene-props">
          <rect
            x="180"
            y="575"
            width="110"
            height="78"
            rx="3"
            fill="#e8e2d4"
            transform="rotate(-4 235 614)"
          />
          <rect
            x="188"
            y="582"
            width="94"
            height="4"
            fill="#c9c2b0"
            transform="rotate(-4 235 584)"
          />
          <ellipse cx="1180" cy="600" rx="36" ry="12" fill="rgba(20,12,6,0.2)" />
          <path
            d="M1155 560 v40 a28 14 0 0 0 56 0 v-40 z"
            fill="#d8d2c6"
          />
          <ellipse cx="1183" cy="560" rx="28" ry="10" fill="#ece7db" />
          <ellipse cx="1183" cy="558" rx="20" ry="7" fill="#6a7a72" />
          <path
            d="M1210 548 q18 -8 22 10"
            fill="none"
            stroke="#b8b0a0"
            strokeWidth="5"
            strokeLinecap="round"
          />
        </g>
      </svg>
    </div>
  );
}
