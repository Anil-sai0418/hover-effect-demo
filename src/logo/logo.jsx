// // components/StyledSignature.jsx
// export default function StyledSignature({ className = "" }) {
//   return (
//     <div className={`flex flex-col items-center justify-center ${className}`}>
//       <svg 
//         viewBox="0 0 400 200" 
//         className="w-full max-w-md h-auto"
//         xmlns="http://www.w3.org/2000/svg"
//       >
//         <defs>
//           {/* Gradient for ink-like depth */}
//           <linearGradient id="inkGradient" x1="0%" y1="0%" x2="0%" y2="100%">
//             <stop offset="0%" stopColor="#2a2a2a" />
//             <stop offset="100%" stopColor="#1a1a1a" />
//           </linearGradient>

//           {/* Filter for slight ink texture */}
//           <filter id="inkTexture" x="-20%" y="-20%" width="140%" height="140%">
//             <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" result="noise" />
//             <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.5" />
//           </filter>
//         </defs>

//         {/* Elegant Script "SAI" */}
//         <g 
//           fill="none" 
//           stroke="url(#inkGradient)" 
//           strokeLinecap="round" 
//           strokeLinejoin="round"
//           filter="url(#inkTexture)"
//         >
//           {/* Letter S - Elegant loop style */}
//           <path 
//             d="M 80 110 
//                C 50 110, 50 70, 80 70 
//                C 100 70, 100 85, 85 90
//                C 65 95, 55 110, 80 130
//                C 95 140, 105 130, 100 120"
//             strokeWidth="4"
//             fill="none"
//           />

//           {/* Connection stroke */}
//           <path 
//             d="M 100 120 Q 110 100, 130 80" 
//             strokeWidth="2.5"
//           />

//           {/* Letter A - Elegant with loop */}
//           <path 
//             d="M 130 130 L 150 70 L 170 130" 
//             strokeWidth="4"
//           />
//           {/* A crossbar with curve */}
//           <path 
//             d="M 140 105 Q 150 100, 160 103" 
//             strokeWidth="2.5"
//           />
//           {/* Top loop of A */}
//           <path 
//             d="M 145 70 Q 150 60, 155 70" 
//             strokeWidth="2"
//           />

//           {/* Connection to I */}
//           <path 
//             d="M 170 130 Q 185 120, 200 125" 
//             strokeWidth="2"
//           />

//           {/* Letter I - Elegant stem with flourishes */}
//           <path 
//             d="M 200 130 L 200 70" 
//             strokeWidth="4"
//           />
//           {/* Dot as small circle */}
//           <circle cx="200" cy="65" r="4" fill="#2a2a2a" stroke="none" />
//           {/* Bottom flourish */}
//           <path 
//             d="M 185 130 Q 200 145, 215 130" 
//             strokeWidth="2.5"
//           />
//         </g>

//         {/* "SAI" Text Below - Clean sans-serif tracking */}
//         <g 
//           fill="#2a2a2a" 
//           fontFamily="system-ui, -apple-system, sans-serif" 
//           fontSize="14" 
//           fontWeight="300"
//           letterSpacing="0.5em"
//           textAnchor="middle"
//         >
//           <text x="200" y="165" style={{ fontVariantNumeric: 'tabular-nums' }}>
//             S A I
//           </text>
//         </g>
//       </svg>
//     </div>
//   );
// }

// NOTE: Load "Mrs Saint Delafield" font via Google Fonts in index.html

import React from "react";

export default function BrandLogo() {
  return (
    <div className="flex flex-col items-center justify-center p-6">
      <div className="relative flex flex-col items-center">

        {/* Signature Name */}
        <h1
          className="text-5xl md:text-6xl text-zinc-800 leading-none"
          style={{ fontFamily: '"Mrs Saint Delafield", cursive' }}
        >
          Anil
        </h1>

        {/* SAI Text */}
        <div
          className="text-[10px] md:text-xs font-light tracking-[0.6em] text-zinc-600 uppercase -mt-3 ml-3"
          style={{ fontFamily: "system-ui, sans-serif" }}
        >
          SAI
        </div>

      </div>
    </div>
  );
}