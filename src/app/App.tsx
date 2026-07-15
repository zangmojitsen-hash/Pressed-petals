import { useState, useCallback, useRef, useEffect } from "react";
import { motion } from "motion/react";
import html2canvas from "html2canvas";


import Brown from "./assests/Brown.png";
import Pink from "./assests/Pink.png";
import Red from "./assests/Red.png";





// ── Photo URLs ──────────────────────────────────────────────────────────
const PHOTOS = {
  bluePoppy: "https://images.unsplash.com/photo-1775582279556-e31c01be364f?w=200&h=200&fit=crop&auto=format",
  bluePoppyB: "https://images.unsplash.com/photo-1691614873927-7c58fbe08725?w=200&h=200&fit=crop&auto=format",
  bhutanValley: "https://images.unsplash.com/photo-1772702824356-934c933fd3a4?w=300&h=240&fit=crop&auto=format",
  bhutanMisty: "https://images.unsplash.com/photo-1772702824640-26fd4da9638b?w=200&h=200&fit=crop&auto=format",
  prayerFlags: "https://images.unsplash.com/photo-1761048169740-0f01bfb22f4c?w=200&h=200&fit=crop&auto=format",
  village: "https://images.unsplash.com/photo-1761048169758-fff7dc2f5612?w=200&h=200&fit=crop&auto=format",
};

// ── Blue Himalayan Poppy SVG ────────────────────────────────────────────
function BluePoppySVG({
  size = 100,
  gId = "bp0",
  className = "",
  style = {},
}: {
  size?: number;
  gId?: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const g1 = `bpg1-${gId}`;
  const g2 = `bpg2-${gId}`;
  const gc = `bpgc-${gId}`;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      style={{ overflow: "visible", ...style }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id={g1} cx="50%" cy="62%" r="58%">
          <stop offset="0%" stopColor="#4fa8d8" stopOpacity="0.92" />
          <stop offset="100%" stopColor="#b0d8f0" stopOpacity="0.58" />
        </radialGradient>
        <radialGradient id={g2} cx="50%" cy="62%" r="58%">
          <stop offset="0%" stopColor="#2a68b0" stopOpacity="0.88" />
          <stop offset="100%" stopColor="#80badd" stopOpacity="0.62" />
        </radialGradient>
        <radialGradient id={gc} cx="38%" cy="38%" r="68%">
          <stop offset="0%" stopColor="#fad568" />
          <stop offset="100%" stopColor="#c49018" />
        </radialGradient>
      </defs>
      {/* 4 main petals */}
      {[0, 90, 180, 270].map((rot, i) => (
        <ellipse
          key={rot}
          cx="50"
          cy="21"
          rx="13"
          ry="28"
          fill={`url(#${i % 2 === 0 ? g1 : g2})`}
          transform={`rotate(${rot}, 50, 50)`}
        />
      ))}
      {/* Diagonal softening petals */}
      {[45, 225].map((rot) => (
        <ellipse
          key={rot}
          cx="50"
          cy="26"
          rx="8"
          ry="20"
          fill={`url(#${g1})`}
          fillOpacity="0.48"
          transform={`rotate(${rot}, 50, 50)`}
        />
      ))}
      {/* Stem */}
      <path
        d="M50 72 Q47 83 50 96"
        stroke="#5a8850"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Leaf */}
      <ellipse
        cx="43"
        cy="84"
        rx="7.5"
        ry="3"
        fill="#5a8850"
        fillOpacity="0.78"
        transform="rotate(-30, 43, 84)"
      />
      {/* Center disk */}
      <circle cx="50" cy="50" r="11.5" fill={`url(#${gc})`} />
      {/* Stamen ring */}
      {Array.from({ length: 14 }, (_, i) => {
        const a = (i * (360 / 14) * Math.PI) / 180;
        return (
          <circle
            key={i}
            cx={50 + 8.8 * Math.cos(a)}
            cy={50 + 8.8 * Math.sin(a)}
            r="1.3"
            fill="#7a3e00"
            fillOpacity="0.88"
          />
        );
      })}
      <circle cx="50" cy="50" r="3.8" fill="#5c2e00" />
    </svg>
  );
}

// ── Sparkle Star ────────────────────────────────────────────────────────
function Sparkle({ size = 22, color = "#c9a870" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 22 22" fill="none">
      <path
        d="M11 1 L12.8 9.2 L21 11 L12.8 12.8 L11 21 L9.2 12.8 L1 11 L9.2 9.2 Z"
        fill={color}
        fillOpacity="0.9"
      />
      <circle cx="11" cy="11" r="2.5" fill="white" fillOpacity="0.6" />
    </svg>
  );
}

// ── Tiny Twinkle ────────────────────────────────────────────────────────
function Twinkle({
  size = 12,
  color = "#c9a870",
}: {
  size?: number;
  color?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 12 12"
      fill="none"
    >
      <path
        d="M6 0.5 L7 4.5 L11.5 6 L7 7.5 L6 11.5 L5 7.5 L0.5 6 L5 4.5 Z"
        fill={color}
      />
    </svg>
  );
}


// ── Prayer Flags Banner ──────────────────────────────────────────────────
function PrayerFlagsBanner() {
  const colors = ["#4a90d9", "#f0ebe0", "#d94a4a", "#4aad5a", "#e8c030"];
  const dzongkha = ["ལྷ", "མི", "སེམས", "ཤིང", "མེ"];
  return (
    <div className="absolute top-0 left-0 right-0 pointer-events-none" style={{ zIndex: 10 }}>
      <svg width="100%" height="64" viewBox="0 0 1200 64" preserveAspectRatio="none">
        <path
          d="M-10 20 Q200 26 400 18 Q600 10 800 18 Q1000 26 1210 20"
          stroke="#a09080"
          strokeWidth="1.5"
          fill="none"
        />
        {Array.from({ length: 26 }, (_, i) => {
          const pct = i / 25;
          const x = pct * 1200;
          const ry = 20 + Math.sin(pct * Math.PI) * -6;
          const ci = i % 5;
          return (
            <g key={i}>
              <line x1={x} y1={ry} x2={x} y2={ry + 2} stroke="#a09080" strokeWidth="1" />
              <polygon
                points={`${x - 13},${ry + 2} ${x + 13},${ry + 2} ${x},${ry + 42}`}
                fill={colors[ci]}
                fillOpacity="0.82"
              />
              <text
                x={x}
                y={ry + 26}
                textAnchor="middle"
                fontSize="7.5"
                fill={ci === 1 ? "#6a5a3a" : "white"}
                fillOpacity="0.55"
                fontFamily="serif"
              >
                {dzongkha[ci]}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// ── Photo Strip ──────────────────────────────────────────────────────────
function PhotoStrip({
  rotate = -6,
  photos,
}: {
  rotate?: number;
  photos: { src: string; alt: string; label: string }[];
}) {
  return (
    <div
      
    >
      {photos.map(({ src, alt, label }, i) => (
        <div key={i} style={{ marginBottom: i < photos.length - 1 ? "4px" : "0" }}>
          
        </div>
      ))}
      <div
        style={{
          textAlign: "center",
          fontSize: "9px",
          fontFamily: "Caveat, cursive",
          color: "#9a8870",
          paddingTop: "4px",
          letterSpacing: "0.06em",
        }}
      >
        
      </div>
    </div>
  );
}

// ── Bhutanese Postage Stamp ──────────────────────────────────────────────
function BhutaneseStamp(
  {
    rotate = 4,
    gId = "s0",
    scale = 1,
  }: {
    rotate?: number;
    gId?: string;
    scale?: number;
  }
) {
  const pid = `perf-${gId}`;


  return (
    <div
style={{
    transform: `rotate(${rotate}deg) scale(${scale})`,
    display: "inline-block",}}>

      <svg width="92" height="114" viewBox="0 0 92 114" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id={pid} x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
            <circle cx="4" cy="4" r="2.8" fill="white" />
          </pattern>
        </defs>
        {/* Perforation background */}
        <rect x="0" y="0" width="92" height="114" fill="#ede0c0" rx="2" />
        <rect x="0" y="0" width="92" height="114" fill={`url(#${pid})`} />
        {/* Inner cream area */}
        <rect x="9" y="9" width="74" height="96" fill="#fdf6e4" rx="1" />
        {/* Gold border */}
        <rect x="9" y="9" width="74" height="96" fill="none" stroke="#c8a050" strokeWidth="1.8" rx="1" />
        <rect x="12" y="12" width="68" height="90" fill="none" stroke="#c8a050" strokeWidth="0.6" strokeDasharray="3,3" rx="0.5" />
        {/* Blue poppy illustration */}
        <circle cx="46" cy="52" r="24" fill="#e4eef8" />
        {[0, 90, 180, 270].map((rot, i) => (
          <ellipse
            key={rot}
            cx="46"
            cy="36"
            rx="7"
            ry="15"
            fill={i % 2 === 0 ? "#5a9fd4" : "#3570b8"}
            fillOpacity="0.82"
            transform={`rotate(${rot}, 46, 52)`}
          />
        ))}
        <circle cx="46" cy="52" r="6" fill="#f5c842" />
        <circle cx="46" cy="52" r="3" fill="#c89020" />
        {/* Country text */}
        <text x="46" y="22" textAnchor="middle" fontSize="6.5" fontFamily="serif" fill="#8a6a28" letterSpacing="1.5">
          འབྲུག་ཡུལ
        </text>
        <text x="46" y="90" textAnchor="middle" fontSize="7.5" fontFamily="serif" fill="#6a4a18" letterSpacing="2">
          BHUTAN
        </text>
        <text x="46" y="102" textAnchor="middle" fontSize="9" fontFamily="serif" fill="#c8a050" fontWeight="bold">
          Nu. 25
        </text>
      </svg>
    </div>
  );
}

// ── Washi Tape Strip ─────────────────────────────────────────────────────
function WashiTape({
  width = 80,
  rotate = -15,
  color = "#d4a8c4",
  pattern = "dots",
}: {
  width?: number;
  rotate?: number;
  color?: string;
  pattern?: "dots" | "stripes" | "checks";
}) {
  const patternStyle: React.CSSProperties =
    pattern === "dots"
      ? {
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.55) 2px, transparent 2px)",
          backgroundSize: "8px 8px",
        }
      : pattern === "stripes"
      ? {
          backgroundImage:
            "repeating-linear-gradient(45deg, rgba(255,255,255,0.35) 0px, rgba(255,255,255,0.35) 2px, transparent 2px, transparent 8px)",
        }
      : {
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.2) 0px, rgba(255,255,255,0.2) 4px, transparent 4px, transparent 8px), repeating-linear-gradient(90deg, rgba(255,255,255,0.2) 0px, rgba(255,255,255,0.2) 4px, transparent 4px, transparent 8px)",
        };

  return (
    <div
      style={{
        width: `${width}px`,
        height: "22px",
        background: color,
        opacity: 0.72,
        transform: `rotate(${rotate}deg)`,
        borderRadius: "2px",
        position: "relative",
        overflow: "hidden",
        ...patternStyle,
      }}
    />
  );
}

// ── Postcard from Bhutan ─────────────────────────────────────────────────
function PostcardBhutan({ rotate = -8 }: { rotate?: number }) {
  return (
    <div
      style={{
        transform: `rotate(${rotate}deg)`,
        width: "164px",
        height: "112px",
        background: "#fef9f0",
        border: "1px solid #d4c4a0",
        boxShadow: "2px 5px 16px rgba(50,30,80,0.16)",
        borderRadius: "3px",
        display: "flex",
        overflow: "hidden",
      }}
    >
      {/* Image half */}
      <div style={{ width: "82px", flexShrink: 0, overflow: "hidden" }}>
        <img
          src={PHOTOS.prayerFlags}
          alt="Prayer flags in Bhutan mountains"
          style={{ width: "82px", height: "112px", objectFit: "cover", display: "block" }}
        />
      </div>
      {/* Vertical divider */}
      <div style={{ width: "1px", background: "#c8b890", flexShrink: 0 }} />
      {/* Right side */}
      <div style={{ flex: 1, padding: "6px 7px", position: "relative" }}>
        {/* Stamp area */}
        <div
          style={{
            float: "right",
            width: "28px",
            height: "32px",
            border: "1px solid #c8a060",
            background: "#f5ead4",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ fontSize: "14px" }}>✿</span>
        </div>
        {/* Address lines */}
        <div
          style={{
            fontFamily: "Caveat, cursive",
            fontSize: "9px",
            color: "#8a7a5a",
            marginTop: "40px",
            lineHeight: 1.7,
          }}
        >
          <div>To: you ♡</div>
          <div style={{ borderBottom: "0.5px solid #d4c4a0", paddingBottom: "3px" }}>
            From: Bhutan
          </div>
          <div style={{ fontSize: "8px", color: "#b8a888", marginTop: "2px" }}>with love ✿</div>
        </div>
        {/* Postmark */}
        <div
          style={{
            position: "absolute",
            bottom: "5px",
            right: "5px",
            width: "36px",
            height: "36px",
            border: "1.5px solid rgba(150,100,50,0.28)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: "rotate(-18deg)",
          }}
        >
          <div
            style={{
              fontSize: "5px",
              fontFamily: "serif",
              color: "rgba(130,90,40,0.38)",
              textAlign: "center",
              lineHeight: 1.3,
            }}
          >
            THIMPHU
            <br />
            BHUTAN
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Bhutanese Textile Fragment ───────────────────────────────────────────
function TextileFragment({ rotate = 12 }: { rotate?: number }) {
  const row1 = ["#f5c040", "#4a8a4a", "#4a70b8", "#e87050", "#f5c040", "#4a8a4a"];
  const row2 = ["#4a70b8", "#e87050", "#f5c040", "#4a8a4a", "#4a70b8", "#e87050"];
  return (
    <div style={{ transform: `rotate(${rotate}deg)`, display: "inline-block" }}>
      <svg width="78" height="108" viewBox="0 0 78 108" xmlns="http://www.w3.org/2000/svg">
        {/* Base fabric */}
        <rect x="0" y="0" width="78" height="100" fill="#7a3a62" rx="2" />
        {/* Woven grid */}
        {Array.from({ length: 10 }, (_, row) =>
          Array.from({ length: 6 }, (_, col) => {
            const color = row % 2 === 0 ? row1[col] : row2[col];
            return (
              <rect
                key={`${row}-${col}`}
                x={col * 13}
                y={row * 10}
                width="6"
                height="5"
                fill={color}
                fillOpacity="0.65"
              />
            );
          })
        )}
        {/* Central diamond motif */}
        <polygon points="39,18 52,38 39,58 26,38" fill="none" stroke="#f5c040" strokeWidth="1.8" />
        <polygon points="39,26 47,38 39,50 31,38" fill="#f5c040" fillOpacity="0.45" />
        <circle cx="39" cy="38" r="4" fill="#f5c040" fillOpacity="0.7" />
        {/* Top gold border */}
        <rect x="0" y="0" width="78" height="3" fill="#c9a870" />
        <rect x="0" y="6" width="78" height="1.5" fill="#c9a870" fillOpacity="0.5" />
        {/* Bottom gold border */}
        <rect x="0" y="97" width="78" height="3" fill="#c9a870" />
        {/* Fringe */}
        {Array.from({ length: 9 }, (_, i) => (
          <line
            key={i}
            x1={4 + i * 8.5}
            y1="100"
            x2={4 + i * 8.5 + 2}
            y2="114"
            stroke="#7a3a62"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        ))}
      </svg>
    </div>
  );
}

// ── Dzong Window Deco ────────────────────────────────────────────────────
function DzongWindowDeco() {
  return (
    <svg width="60" height="80" viewBox="0 0 60 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Arch window shape */}
      <path
        d="M5 80 L5 35 Q5 5 30 5 Q55 5 55 35 L55 80 Z"
        stroke="#c9a870"
        strokeWidth="1.5"
        fill="rgba(180,150,220,0.08)"
      />
      {/* Inner arch */}
      <path
        d="M11 78 L11 38 Q11 13 30 13 Q49 13 49 38 L49 78"
        stroke="#c9a870"
        strokeWidth="0.8"
        strokeDasharray="3,3"
        fill="none"
      />
      {/* Decorative top ornament */}
      <circle cx="30" cy="5" r="4" fill="#c9a870" fillOpacity="0.7" />
      <circle cx="30" cy="5" r="2" fill="#fdf6ee" />
      {/* Side columns */}
      <line x1="5" y1="55" x2="5" y2="80" stroke="#c9a870" strokeWidth="3" strokeLinecap="round" />
      <line x1="55" y1="55" x2="55" y2="80" stroke="#c9a870" strokeWidth="3" strokeLinecap="round" />
      {/* Horizontal band */}
      <line x1="5" y1="55" x2="55" y2="55" stroke="#c9a870" strokeWidth="1.2" />
      {/* Pattern in band */}
      {[14, 22, 30, 38, 46].map((x) => (
        <circle key={x} cx={x} cy="55" r="1.5" fill="#c9a870" fillOpacity="0.6" />
      ))}
    </svg>
  );
}

// ── Central Photo Album ──────────────────────────────────────────────────
function CentralAlbum() {
  return (
    <div
      style={{
        display: "flex",
        width: "520px",
        maxWidth: "92vw",
        filter: "drop-shadow(0 14px 44px rgba(60,30,90,0.28))",
        position: "relative",
      }}
    >
      {/* LEFT PAGE */}
      <div
        style={{
          flex: 1,
          background: "linear-gradient(160deg, #f9f4ec 0%, #f5eee4 100%)",
          borderRadius: "6px 0 0 6px",
          padding: "22px 18px 22px 22px",
          minHeight: "330px",
          boxShadow: "inset -4px 0 14px rgba(50,20,80,0.1)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Faint ruled lines */}
        {[80, 110, 140, 190, 220, 265, 295].map((y) => (
          <div
            key={y}
            style={{
              position: "absolute",
              left: "16px",
              right: "12px",
              top: `${y}px`,
              height: "1px",
              background: "rgba(180,160,140,0.18)",
            }}
          />
        ))}

        {/* Polaroid 1 */}
        <div style={{ position: "relative", display: "inline-block", marginBottom: "6px" }}>
          <div
            style={{
              transform: "rotate(-5deg)",
              background: "white",
              padding: "6px 6px 26px",
              boxShadow: "0 2px 10px rgba(40,20,70,0.17)",
              display: "inline-block",
            }}
          >
           
            <div
              style={{
                textAlign: "center",
                fontFamily: "Caveat, cursive",
                fontSize: "9.5px",
                color: "#8a7a6a",
                paddingTop: "5px",
              }}
            >
          
            </div>
          </div>
          {/* Washi tape over polaroid corner */}
          
        </div>

        {/* Polaroid 2 */}
        <div style={{ marginLeft: "28px", display: "inline-block" }}>
          <div
            style={{
              transform: "rotate(5deg)",
              background: "white",
              padding: "6px 6px 26px",
              boxShadow: "0 2px 10px rgba(40,20,70,0.17)",
              display: "inline-block",
            }}
          >
            
            <div
              style={{
                textAlign: "center",
                fontFamily: "Caveat, cursive",
                fontSize: "9.5px",
                color: "#8a7a6a",
                paddingTop: "5px",
              }}
            >
              
            </div>
          </div>
        </div>

        {/* Handwritten notes */}
        <div
          style={{
            fontFamily: "Caveat, cursive",
            fontSize: "11.5px",
            color: "#9a8a7a",
            transform: "rotate(-2deg)",
            marginTop: "10px",
            marginLeft: "6px",
            lineHeight: 1.7,
          }}
        >
          <div> ✦</div>
          <div style={{ color: "#b8a898", fontSize: "10px" }}>འབྲུག་ཡུལ · Bhutan</div>
        </div>

        {/* Decorative stickers */}
        <div style={{ position: "absolute", right: "14px", top: "130px", opacity: 0.55, fontSize: "16px" }}>✦</div>
        <div style={{ position: "absolute", right: "26px", top: "162px", opacity: 0.35, fontSize: "11px" }}>✦</div>
        <div style={{ position: "absolute", right: "10px", bottom: "30px", opacity: 0.4, fontSize: "13px", transform: "rotate(10deg)" }}>
          ✿
        </div>

        {/* Dzong window deco */}
        <div style={{ position: "absolute", right: "8px", top: "200px", opacity: 0.4 }}>
          <DzongWindowDeco />
        </div>
      </div>

      {/* SPINE */}
      <div
        style={{
          width: "18px",
          background: "linear-gradient(to right, #3a2858, #4c3870, #3a2858)",
          flexShrink: 0,
          position: "relative",
        }}
      >
        {[18, 34, 50, 66, 82, 98, 114, 130, 146, 162].map((y) => (
          <div
            key={y}
            style={{
              position: "absolute",
              top: `${y}px`,
              left: "3px",
              right: "3px",
              height: "5px",
              background: "#c9a870",
              borderRadius: "1px",
              opacity: 0.8,
            }}
          />
        ))}
      </div>

      {/* RIGHT PAGE */}
      <div
        style={{
          flex: 1,
          background: "linear-gradient(160deg, #fef9f4 0%, #faf2e8 100%)",
          borderRadius: "0 6px 6px 0",
          padding: "22px 22px 22px 18px",
          minHeight: "330px",
          boxShadow: "inset 4px 0 14px rgba(50,20,80,0.07)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Faint ruled lines */}
        {[165, 195, 220, 248, 278, 305].map((y) => (
          <div
            key={y}
            style={{
              position: "absolute",
              left: "14px",
              right: "16px",
              top: `${y}px`,
              height: "1px",
              background: "rgba(180,160,140,0.16)",
            }}
          />
        ))}

        {/* Large polaroid */}
        <div style={{ position: "relative", display: "inline-block" }}>
          <div
            style={{
              transform: "rotate(3deg)",
              background: "white",
              padding: "7px 7px 32px",
              boxShadow: "0 4px 16px rgba(40,20,70,0.2)",
              display: "inline-block",
            }}
          >
            
            <div
              style={{
                textAlign: "center",
                fontFamily: "Caveat, cursive",
                fontSize: "10.5px",
                color: "#8a7a6a",
                paddingTop: "7px",
              }}
            >
              
            </div>
          </div>
         
        
        </div>

        {/* Journal section */}
        <div
          style={{
            fontFamily: "Caveat, cursive",
            marginTop: "14px",
            lineHeight: 1.75,
          }}
        >
          
        </div>

        {/* Bookmark ribbon */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: "26px",
            width: "15px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            
          >
            {[16, 30, 44].map((y) => (
              <div
                key={y}
                style={{
                  position: "absolute",
                  top: `${y}px`,
                  left: "3px",
                  right: "3px",
                  height: "3.5px",
                  background: "#c9a870",
                  borderRadius: "1px",
                  opacity: 0.85,
                }}
              />
            ))}
          </div>
          <div
            
          />
        </div>

        {/* Decorative corner element */}
        <div
          style={{
            position: "absolute",
            bottom: "16px",
            right: "18px",
            fontFamily: "Caveat, cursive",
            fontSize: "24px",
            color: "#c4a8d4",
            opacity: 0.55,
            transform: "rotate(12deg)",
          }}
        >
          ✿
        </div>
      </div>
    </div>
  );
}





// ── CTA Poppy Button ─────────────────────────────────────────────────────
function CTAPoppy({ onClick }: { onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.button
      onClick={onClick}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.93 }}
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        padding: "0",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
      }}
      aria-label="Begin the photo booth experience"
    >

      <motion.div
        animate={
          hovered
            ? { rotate: [0, -10, 10, -6, 6, 0], scale: [1, 1.05, 1] }
            : { rotate: 0, scale: 1 }
        }
        transition={{ duration: 0.6 }}
      >
        <BluePoppySVG size={130} gId="cta" />
      </motion.div>
      <div
        style={{
          fontFamily: "Caveat, cursive",
          fontSize: "18px",
          color: "#6a5a8a",
          letterSpacing: "0.03em",
          transition: "color 0.3s",
        }}
      >
        {hovered ? "let’s begin ✿" : "click the poppy to begin ✿"}
      </div>
      {/* Ripple rings on hover */}
      {hovered && (
        <motion.div
          style={{
            position: "absolute",
            width: "130px",
            height: "130px",
            borderRadius: "50%",
            border: "2px solid rgba(90,140,190,0.35)",
            pointerEvents: "none",
          }}
          initial={{ scale: 0.8, opacity: 0.8 }}
          animate={{ scale: 1.6, opacity: 0 }}
          transition={{ duration: 0.9, repeat: Infinity }}
        />
      )}
    </motion.button>
  );
}

// ── Booth Screen ─────────────────────────────────────────────────────────
function BoothScreen({
  onBack,
  onComplete,
}: {
  onBack: () => void;
  onComplete: (photos: string[]) => void;
}) {


  const [selectedFilter, setSelectedFilter] = useState(0);
  const [captured, setCaptured] = useState<number[]>([]);
  const [capturing, setCapturing] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [capturedPhotos, setCapturedPhotos] = useState<string[]>([]);
  const [readyToContinue, setReadyToContinue] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);



  useEffect(() => {
  navigator.mediaDevices
    .getUserMedia({ video: true })
    .then((stream) => {
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    })
    .catch(() => {
      alert("Camera access denied!");
    });
}, []);

  const filters = [
    { name: "Paro Bloom", css: "saturate(1.2) hue-rotate(5deg)", color: "#d4a8c4" },
    { name: "Druk Dawn", css: "sepia(0.3) saturate(1.4) brightness(1.05)", color: "#c9a870" },
    { name: "Himalayan", css: "saturate(0.8) brightness(1.1) contrast(1.05)", color: "#7ba7bc" },
    { name: "Thimphu Dusk", css: "hue-rotate(-15deg) saturate(1.3) brightness(0.95)", color: "#d4849a" },
  ];

  const handleCapture = useCallback(() => {
  if (
    capturing ||
    capturedPhotos.length >= 2 ||
    !videoRef.current ||
    !canvasRef.current
  )
    return;

  let count = 3;
  setCountdown(count);

  const interval = setInterval(() => {
    count--;

    if (count > 0) {
      setCountdown(count);
    } else {
      clearInterval(interval);
      setCountdown(null);
      setCapturing(true);

      setTimeout(() => {
        const video = videoRef.current!;
        const canvas = canvasRef.current!;
        const ctx = canvas.getContext("2d");

        if (!ctx) return;

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        ctx.save();
        ctx.scale(-1, 1);

        ctx.drawImage(
          video,
          -canvas.width,
          0,
          canvas.width,
          canvas.height
        );

        ctx.restore();

        const photoData = canvas.toDataURL("image/png");

        setCapturedPhotos((prev) => {
          const updated = [...prev, photoData];

          if (updated.length === 2) {
            setReadyToContinue(true);
          }

          return updated;
        });

        setCaptured((prev) => [...prev, Date.now()]);

        setCapturing(false);
      }, 600);
    }
  }, 1000);
}, [capturing, capturedPhotos]);



  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      style={{
        position: "fixed",
        inset: 0,
        background: "linear-gradient(135deg, #ebe2f5 0%, #f3e6f0 45%, #f7ede7 100%),",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 50,
        padding: "24px",
        overflow: "hidden",
      }}
    >
    
{/* ===== Watercolor Background ===== */}

<div
  style={{
    position: "absolute",
    top: "-180px",
    left: "-180px",
    width: "600px",
    height: "600px",
    borderRadius: "50%",
    background: "#b8dcff",
    opacity: 0.95,
    filter: "blur(140px)",
    zIndex: 0,
  }}
/>

<div
  style={{
    position: "absolute",
    top: "80px",
    right: "-120px",
    width: "450px",
    height: "450px",
    borderRadius: "50%",
    background: "#fff0a6",
    opacity: 0.9,
    filter: "blur(120px)",
    zIndex: 0,
  }}
/>

<div
  style={{
    position: "absolute",
    bottom: "-180px",
    left: "-100px",
    width: "520px",
    height: "520px",
    borderRadius: "50%",
    background: "#dba3c3",
    opacity: 0.8,
    filter: "blur(130px)",
    zIndex: 0,
  }}
/>

<div
  style={{
    position: "absolute",
    bottom: "-160px",
    right: "-180px",
    width: "650px",
    height: "650px",
    borderRadius: "50%",
    background: "#c2deef",
    opacity: 0.95,
    filter: "blur(150px)",
    zIndex: 0,
  }}
/>

<div
  style={{
    position: "absolute",
    top: "38%",
    left: "40%",
    width: "320px",
    height: "320px",
    borderRadius: "50%",
    background: "#cf9af8",
    opacity: 0.65,
    filter: "blur(100px)",
    zIndex: 0,
  }}
/>

  
{readyToContinue && (
<button
 onClick={() => {
    onComplete(capturedPhotos);
}}


  style={{
      position: "absolute",
      top: "20px",
      right: "20px",
      padding: "10px 22px",
      borderRadius: "999px",
      border: "none",
      background: "#c9a870",
      color: "white",
      cursor: "pointer",
      fontFamily: "Caveat, cursive",
      fontSize: "18px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
      zIndex: 100,
    }}
  >
    Done ✨
  </button>
)}


      {/* Back button */}
      <button
        onClick={onBack}
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          background: "none",
          border: "1px solid rgba(200,170,255,0.3)",
          color: "#c4b0e0",
          fontFamily: "Caveat, cursive",
          fontSize: "15px",
          padding: "6px 16px",
          borderRadius: "20px",
          cursor: "pointer",
          letterSpacing: "0.04em",
        }}
      >
        ← back 
      </button>

      {/* Title */}
      <div
        style={{
          fontFamily: "Playfair Display, serif",
          fontStyle: "cursive",
          fontSize: "clamp(22px, 3.5vw, 36px)",
          color: "#987eaf",
          marginBottom: "24px",
          textAlign: "center",
        }}
      >
        <span style={{ color: "#7ba7bc" }}></span>
      </div>

      <div style={{ 
        display: "flex", 
        gap: "60px", alignItems: "flex-start", 
        flexWrap: "wrap", 
        justifyContent: "center" }}>


        {/* Camera viewfinder */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
          {/* Viewfinder frame */}
          <div
            style={{
              position: "relative",
              width: "360px",
              height: "380px",
              border: "2px solid rgba(180,150,220,0.4)",
              borderRadius: "12px",
              overflow: "hidden",
              background: "#0d0820",
            }}
          >
            {/* Dzong arch overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "radial-gradient(ellipse at 50% 100%, rgba(100,70,180,0.12) 0%, transparent 60%)",
                pointerEvents: "none",
                zIndex: 2,
              }}
            />
            {/* Corner accents */}
            {[
              { top: "8px", left: "8px", borderTop: "2px solid #c9a870", borderLeft: "2px solid #c9a870" },
              { top: "8px", right: "8px", borderTop: "2px solid #c9a870", borderRight: "2px solid #c9a870" },
              { bottom: "8px", left: "8px", borderBottom: "2px solid #c9a870", borderLeft: "2px solid #c9a870" },
              { bottom: "8px", right: "8px", borderBottom: "2px solid #c9a870", borderRight: "2px solid #c9a870" },
            ].map((style, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  width: "20px",
                  height: "20px",
                  ...style,
                  zIndex: 3,
                }}
              />
            ))}
            {/* Live preview image (simulated) */}

            {/* Live preview image (simulated) */}

{countdown !== null && (
  <div
    style={{
      position: "absolute",
      inset: 0,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "rgba(0,0,0,0.25)",
      zIndex: 50,
      fontSize: "100px",
      color: "#f2f084",
      fontFamily: "'Noto Serif Tibetan', serif",
      fontWeight: "bold",
      textShadow: "0 8px 30px rgba(0,0,0,0.45)",
      userSelect: "none",
      pointerEvents: "none",
    }}
  >
    {{
      3: "༣",
      2: "༢",
      1: "༡",
    }[countdown as 1 | 2 | 3]}
  </div>
)}


          
<video
  ref={videoRef}
  autoPlay
  playsInline
  muted
  style={{
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "filter 0.4s ease",
    opacity: 0.88,
    transform: "scaleX(-1)",
  }}
/>
<canvas
  ref={canvasRef}
  style={{ display: "none" }}
/>


            {/* Flash overlay */}
            {capturing && (
              <motion.div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "white",
                  zIndex: 4,
                }}
                initial={{ opacity: 0.9 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              />
            )}
            {/* Center crosshair */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "40px",
                height: "40px",
                border: "1.5px solid rgba(200,170,255,0.35)",
                borderRadius: "50%",
                zIndex: 3,
                pointerEvents: "none",
              }}
            />
          </div>

          {/* Filter selector */}
          

          {/* Capture button */}
          <motion.button
            onClick={handleCapture}
            whileHover={{ scale: captured.length < 4 ? 1.08 : 1 }}
            whileTap={{ scale: 0.92 }}
            disabled={capturing || captured.length >= 4}
            style={{
              background: "none",
              border: "none",
              cursor: captured.length < 4 ? "pointer" : "not-allowed",
              opacity: captured.length >= 4 ? 0.4 : 1,
            }}
          >
            <BluePoppySVG size={80} gId="capture-btn" />
            <div
              style={{
                fontFamily: "Caveat, cursive",
                fontSize: "14px",
                color: "#c4b0e0",
                marginTop: "4px",
                textAlign: "center",
              }}
            >
              {captured.length >= 4 ? "strip full ✿" : "capture ✿"}
            </div>
          </motion.button>
        </div>

        {/* Photo strip result */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
          <div
            style={{
              fontFamily: "Caveat, cursive",
              fontSize: "14px",
              color: "#a898c8",
              marginBottom: "4px",
            }}
          >
            your strip ✿
          </div>
          <div
            style={{
              background: "white",
              padding: "8px 8px 6px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
              display: "flex",
              flexDirection: "column",
              gap: "4px",
            }}
          >
            {Array.from({ length: 2 }, (_, i) => (
              <div
                key={i}
                style={{
                  width: "90px",
                  height: "68px",
                  background: captured[i]
                    ? "transparent"
                    : "rgba(220,210,235,0.25)",
                  border: captured[i] ? "none" : "1.5px dashed rgba(160,130,200,0.3)",
                  position: "relative",
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {captured[i] ? (
                  <img
                    src={capturedPhotos[i]}
                    alt={`Captured photo ${i + 1}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    
                    }}
                  />
                ) : (
                  <span style={{ fontSize: "18px", opacity: 0.3 }}>✿</span>
                )}
              </div>
            ))}
            <div
              style={{
                textAlign: "center",
                fontFamily: "Caveat, cursive",
                fontSize: "9px",
                color: "#8a7a6a",
                paddingTop: "3px",
              }}
            >
              
            </div>
          </div>
          {captured.length > 0 && (
            <motion.button
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                background: "rgba(200,170,255,0.12)",
                border: "1px solid rgba(200,170,255,0.3)",
                borderRadius: "20px",
                color: "#c4b0e0",
                fontFamily: "Caveat, cursive",
                fontSize: "13px",
                padding: "6px 18px",
                cursor: "pointer",
                marginTop: "4px",
              }}
              onClick={() => {
  setCaptured([]);
  setCapturedPhotos([]);
  setCapturing(false);
}}

            >
              redo strip ✿
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ── Floating Element Configs ─────────────────────────────────────────────
const FLOATING_POPPIES = [
  { left: "6%", top: "14%", size: 62, initRot: -22, dy: -16, dur: 5.5, delay: 0, gId: "fp1" },
  { left: "84%", top: "18%", size: 78, initRot: 16, dy: -20, dur: 6.2, delay: 1.4, gId: "fp2" },
  { left: "3%", top: "56%", size: 48, initRot: -38, dy: -12, dur: 4.9, delay: 0.7, gId: "fp3" },
  { left: "87%", top: "64%", size: 68, initRot: 28, dy: -18, dur: 5.4, delay: 2.1, gId: "fp4" },
  { left: "12%", top: "80%", size: 44, initRot: 12, dy: -10, dur: 6.8, delay: 1.1, gId: "fp5" },
  { left: "76%", top: "80%", size: 54, initRot: -16, dy: -14, dur: 5.1, delay: 0.4, gId: "fp6" },
  { left: "48%", top: "6%", size: 38, initRot: 5, dy: -8, dur: 7.2, delay: 1.8, gId: "fp7" },
];

const TWINKLES = [
  { left: "18%", top: "10%", size: 13, color: "#c9a870", delay: 0 },
  { left: "74%", top: "8%", size: 9, color: "#d4849a", delay: 1.1 },
  { left: "42%", top: "6%", size: 11, color: "#7ba7bc", delay: 0.4 },
  { left: "33%", top: "86%", size: 9, color: "#c9a870", delay: 1.6 },
  { left: "62%", top: "89%", size: 13, color: "#d4849a", delay: 0.2 },
  { left: "93%", top: "38%", size: 10, color: "#7ba7bc", delay: 0.9 },
  { left: "2%", top: "33%", size: 12, color: "#c9a870", delay: 2.1 },
  { left: "82%", top: "46%", size: 8, color: "#d4849a", delay: 1.3 },
  { left: "22%", top: "50%", size: 10, color: "#c9a870", delay: 0.6 },
  { left: "68%", top: "54%", size: 7, color: "#7ba7bc", delay: 1.9 },
  { left: "52%", top: "18%", size: 15, color: "#e8c4b8", delay: 0.3 },
  { left: "38%", top: "72%", size: 8, color: "#c9a870", delay: 1.5 },
  { left: "88%", top: "76%", size: 11, color: "#d4849a", delay: 0.8 },
];

// ── Click Sparkle ────────────────────────────────────────────────────────
interface SparklePos {
  x: number;
  y: number;
  id: number;
  color: string;
}

const SPARKLE_COLORS = ["#c9a870", "#d4849a", "#7ba7bc", "#e8c4b8", "#c8b8e8"];

// ── Main App ──────────────────────────────────────────────────────────────
export default function App() {
  const stripRef = useRef<HTMLDivElement>(null);

  const downloadStrip = async () => {
    alert("Download clicked!");

    if (!stripRef.current) {
    alert("stripRef is NULL");
    return;
}

    const canvas = await html2canvas(stripRef.current, {
      backgroundColor: null,
      scale: 3,
      useCORS: true,
      allowTaint: true,
      logging: false,
      imageTimeout: 0,
});

  const link = document.createElement("a");
  link.download = "BhutanPhotostrip.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
};


  const [screen, setScreen] = useState<"landing" | "booth" | "strips" | "preview">("landing");
  const [selectedStrip, setSelectedStrip] = useState("");
  const [photos, setPhotos] = useState<string[]>([]);
  


  const [sparkles, setSparkles] = useState<SparklePos[]>([]);

  const handleClick = useCallback((e: React.MouseEvent) => {
    const newSparkle: SparklePos = {
      x: e.clientX,
      y: e.clientY,
      id: Date.now() + Math.random(),
      color: SPARKLE_COLORS[Math.floor(Math.random() * SPARKLE_COLORS.length)],
    };
    setSparkles((prev) => [...prev.slice(-10), newSparkle]);
    setTimeout(() => {
      setSparkles((prev) => prev.filter((s) => s.id !== newSparkle.id));
    }, 1000);
  }, []);

if (screen === "booth") {
  return (
    <BoothScreen
      onBack={() => setScreen("landing")}
      onComplete={(capturedPhotos) => {
        setPhotos(capturedPhotos);
        setScreen("preview");
      }}
    />
  );
}

if (screen === "strips") {
  return (
    <StripSelectionScreen
      setScreen={setScreen}
      setSelectedStrip={setSelectedStrip}
    />
  );
}

if (screen === "preview") {

  let stripImage;

if (selectedStrip === "brown") {
  stripImage = Brown;
} else if (selectedStrip === "pink") {
  stripImage = Pink;
} else {
  stripImage = Red;
}

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom, #FFFDF9, #FFF7F8)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        padding: "40px",
      }}
    >
      {/* Falling Blue Petals */}
    {Array.from({ length: 80 }).map((_, i) => (
      <motion.div
        key={i}
        initial={{
          y: -100,
          x: Math.random() * window.innerWidth,
          rotate: 0,
          opacity: 0,
        }}
        animate={{
          y: window.innerHeight + 100,
          x: [
            Math.random() * window.innerWidth,
            Math.random() * window.innerWidth,
          ],
          rotate: [0, 180, 360],
          opacity: [0, 0.8, 0.8, 0],
        }}
        transition={{
          duration: 6 + Math.random() * 8,
          delay: Math.random() * 5,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 1,
        }}
      >
        <svg
          width={12 + Math.random() * 16}
          height={16 + Math.random() * 20}
          viewBox="0 0 18 24"
>
  <path
    d="M9 0 C15 4 16 16 9 24 C2 16 3 4 9 0 Z"
    fill="#abdaef"
  />
</svg>

      </motion.div>
    ))}





      {/* Background Decorations */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(circle at center, rgba(255,230,240,0.4), transparent 70%)",
        }}
      />

      {/* Heading */}
      <h1
        style={{
          fontSize: "58px",
          fontFamily: "Playfair Display",
          fontStyle: "italic",
          color: "#eeb8e2",
          marginBottom: "10px",
        }}
      >
        your strip is ready!
      </h1>

      {/* Subtitle */}
      <p
        style={{
          fontFamily: "Caveat",
          fontSize: "28px",
          color: "#9b6bb5",
          marginBottom: "40px",
        }}
      >
    
      </p>

      {/* Glow */}
      <div
        style={{
          background:
            "radial-gradient(circle, rgba(255,225,235,0.6), transparent 70%)",
          padding: "40px",
          borderRadius: "50%",
        }}
      >
        {/* ==========================
            YOUR PHOTOSTRIP GOES HERE
           ========================== */}

        <div
          ref={stripRef}
          style={{
              position: "relative",
              display: "inline-block",
              marginTop: "40px",
  }}
>
  <img
  src={stripImage}
  style={{
    width: "190px",
    height: "auto",
    display: "block",
  }}
/>


  {photos[0] && (
  <img
    src={photos[0]}
    style={{
      position: "absolute",
      top: "110px",
      left: "11px",
      width: "170px",
      height: "170px",
      objectFit: "cover",
    }}
  />
)}

  {photos[1] && (
  <img
    src={photos[1]}
    style={{
      position: "absolute",
      top: "310px",
      left: "11px",
      width: "170px",
      height: "170px",
      objectFit: "cover",
    }}
  />
)}


</div>
      </div>

      {/* Download Button */}

      <button
        onClick={downloadStrip}
        style={{
            marginTop: "45px",
            background: "white",
            border: "1px solid #E6C6D5",
            borderRadius: "20px",
            padding: "16px 40px",
            cursor: "pointer",
            fontFamily: "Caveat, cursive",
            fontSize: "22px",
            fontWeight: 600,
            letterSpacing: "0.5px",
            color: "#eda9c7",
            boxShadow: "0 10px 25px rgba(0,0,0,.08)",
            transition: "0.3s",
}}

      >
        ✿ download ✿
      </button>

      <button
  onClick={() => {
    setPhotos([]);
    setSelectedStrip("");
    setScreen("landing");
  }}
  style={{
    marginTop: "20px",
    background: "transparent",
    border: "1px solid #E6C6D5",
    borderRadius: "20px",
    padding: "14px 34px",
    cursor: "pointer",
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "22px",
    fontStyle: "italic",
    color: "#B68AA6",
    transition: "0.3s",
  }}
>
    ⌂ Home Page
</button>


      {/* Back */}

      <button
        onClick={() => setScreen("strips")}
        style={{
          position: "absolute",
          top: "30px",
          left: "30px",
          borderRadius: "999px",
          border: "1px solid #DDD",
          background: "white",
          padding: "10px 20px",
          cursor: "pointer",
        }}
      >
        ← choose your strip
      </button>
    </div>
  );
}



  return (
    <div
      className="relative w-full min-h-screen overflow-x-hidden"
      style={{
        background: "radial-gradient(ellipse at 25% 15%, #e4d8f5 0%, #fdf6ee 35%, #f5e8f2 65%, #eaecf8 100%)",
        fontFamily: "Nunito, sans-serif",
        cursor: "default",
      }}
      onClick={handleClick}
    >
      {/* Paper grain overlay */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          opacity: 0.6,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Click sparkles */}
      {sparkles.map(({ x, y, id, color }) => (
        <motion.div
          key={id}
          style={{
            position: "fixed",
            left: x - 11,
            top: y - 11,
            pointerEvents: "none",
            zIndex: 100,
          }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: [0, 1.6, 0], opacity: [1, 0.9, 0] }}
          transition={{ duration: 0.75 }}
        >
          <Sparkle size={22} color={color} />
        </motion.div>
      ))}

      {/* ── Floating poppies ── */}
      {FLOATING_POPPIES.map((p) => (
        <motion.div
          key={p.gId}
          style={{ position: "absolute", left: p.left, top: p.top, zIndex: 2 }}
          animate={{ y: [0, p.dy, 0], rotate: [p.initRot, p.initRot + 9, p.initRot] }}
          transition={{ duration: p.dur, repeat: Infinity, ease: "easeInOut", delay: p.delay }}
          whileHover={{ scale: 1.2, zIndex: 6 }}
        >
          <BluePoppySVG size={p.size} gId={p.gId} />
        </motion.div>
      ))}

      {/* ── Floating twinkle stars ── */}
      {TWINKLES.map((t, i) => (
        <motion.div
          key={i}
          style={{ position: "absolute", left: t.left, top: t.top, zIndex: 2 }}
          animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2.2 + i * 0.28, repeat: Infinity, ease: "easeInOut", delay: t.delay }}
        >
          <Twinkle size={t.size} color={t.color} />
        </motion.div>
      ))}

      {/* ── Left side decorative elements ── */}
      {/* Photo strip */}
      <motion.div
        style={{ position: "absolute", left: "1%", top: "20%", zIndex: 4 }}
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 7.2, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.05 }}
      >
        <PhotoStrip
          rotate={-7}
          photos={[
            { src: PHOTOS.bluePoppy, alt: "Blue poppies", label: "blue poppies" },
            { src: PHOTOS.bhutanMisty, alt: "Misty Bhutan valley", label: "misty valley" },
            { src: PHOTOS.prayerFlags, alt: "Prayer flags", label: "prayer flags" },
          ]}
        />
      </motion.div>

      {/* Stamp - left low */}
      <motion.div
        style={{ position: "absolute", left: "2%", top: "68%", zIndex: 4 }}
        animate={{ y: [0, -9, 0], rotate: [0, 2, 0] }}
        transition={{ duration: 5.6, repeat: Infinity, ease: "easeInOut", delay: 1.0 }}
        whileHover={{ scale: 1.1 }}
      >
        <BhutaneseStamp rotate={-6} gId="sl" />
      </motion.div>

      {/* Washi tape - left mid */}
      <motion.div
        style={{ position: "absolute", left: "11%", top: "34%", zIndex: 3 }}
        animate={{ rotate: [-22, -20, -22] }}
        transition={{ duration: 4.2, repeat: Infinity }}
      >
        <WashiTape width={74} rotate={-22} color="#c8b4d8" pattern="dots" />
      </motion.div>

      {/* Textile - left upper */}
      <motion.div
        style={{ position: "absolute", left: "7%", top: "10%", zIndex: 3 }}
        animate={{ y: [0, -7, 0], rotate: [-8, -6, -8] }}
        transition={{ duration: 8.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
        whileHover={{ scale: 1.06 }}
      >
        <TextileFragment rotate={-8} />
      </motion.div>

      {/* ── Right side decorative elements ── */}
      {/* Photo strip */}
      <motion.div
        style={{ position: "absolute", right: "1%", top: "26%", zIndex: 4 }}
        animate={{ y: [0, -16, 0] }}
        transition={{ duration: 6.6, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
        whileHover={{ scale: 1.05 }}
      >
        <PhotoStrip
          rotate={9}
          photos={[
            { src: PHOTOS.village, alt: "Mountain village", label: "mountain village" },
            { src: PHOTOS.bluePoppyB, alt: "Blue poppy closeup", label: "bloom" },
            { src: PHOTOS.bhutanValley, alt: "Valley at sunrise", label: "paro valley" },
          ]}
        />
      </motion.div>

      {/* Postcard - right */}
      <motion.div
        style={{ position: "absolute", right: "3%", top: "60%", zIndex: 4 }}
        animate={{ y: [0, -11, 0], rotate: [-7, -5, -7] }}
        transition={{ duration: 6.4, repeat: Infinity, ease: "easeInOut", delay: 1.6 }}
        whileHover={{ scale: 1.05 }}
      >
        <PostcardBhutan rotate={-7} />
      </motion.div>

      {/* Textile - right upper */}
      <motion.div
        style={{ position: "absolute", right: "12%", top: "14%", zIndex: 3 }}
        animate={{ y: [0, -6, 0], rotate: [13, 15, 13] }}
        transition={{ duration: 8.8, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.08 }}
      >
        <TextileFragment rotate={13} />
      </motion.div>

      {/* Stamp - right upper */}
      <motion.div
        style={{ position: "absolute", right: "4%", top: "7%", zIndex: 4 }}
        animate={{ y: [0, -10, 0], rotate: [0, -2, 0] }}
        transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut", delay: 2.0 }}
        whileHover={{ scale: 1.1 }}
      >
        <BhutaneseStamp rotate={9} gId="sr" />
      </motion.div>

      {/* Washi tape - right low */}
      <motion.div
        style={{ position: "absolute", right: "16%", top: "76%", zIndex: 3 }}
        animate={{ rotate: [17, 19, 17] }}
        transition={{ duration: 3.8, repeat: Infinity }}
      >
        <WashiTape width={64} rotate={17} color="#a8d4c8" pattern="stripes" />
      </motion.div>

      {/* Washi tape - bottom left area */}
      <motion.div
        style={{ position: "absolute", left: "18%", top: "84%", zIndex: 3 }}
        animate={{ rotate: [-10, -8, -10] }}
        transition={{ duration: 5, repeat: Infinity }}
      >
        <WashiTape width={56} rotate={-10} color="#d4c4a8" pattern="checks" />
      </motion.div>

      {/* ── Main centered content ── */}
      <div
        style={{
          position: "relative",
          zIndex: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: "76px",
          paddingBottom: "64px",
          minHeight: "100vh",
        }}
      >
        {/* Header / Title */}
        <motion.div
          initial={{ opacity: 0, y: -22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: "easeOut" }}
          style={{ textAlign: "center", marginBottom: "20px" }}
        >
          {/* Kana / Dzongkha label */}
          <div
            style={{
              fontFamily: "Caveat, cursive",
              fontSize: "13px",
              color: "#9a88b8",
              letterSpacing: "0.18em",
              marginBottom: "6px",
              opacity: 0.85,
            }}
          >
          </div>

          {/* Main display title */}
          <h1
            style={{
              fontFamily: "Playfair Display, serif",
              fontStyle: "italic",
              fontSize: "clamp(44px, 7.5vw, 80px)",
              fontWeight: 600,
              color: "#3a2458",
              lineHeight: 1.08,
              letterSpacing: "-0.025em",
              margin: 0,
              textShadow: "0 3px 24px rgba(90,50,150,0.14)",
            }}
          >
            pressed{" "}
            <span style={{ color: "#6a9cb8" }}>petals</span>
          </h1>
          




          {/* Decorative divider */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              margin: "14px 0 10px",
            }}
          >
            <div
              style={{
                width: "55px",
                height: "1px",
                background: "linear-gradient(to right, transparent, #c9a870)",
              }}
            />

            

            <Twinkle size={9} color="#c9a870" />
            <BluePoppySVG size={20} gId="d1" />
            <Twinkle size={9} color="#c9a870" />
            <div
              style={{
                width: "55px",
                height: "1px",
                background: "linear-gradient(to left, transparent, #c9a870)",
              }}
            />
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontFamily: "Caveat, cursive",
              fontSize: "19px",
              color: "#7a6a9a",
              letterSpacing: "0.025em",
            }}
          >
            
          </div>
        </motion.div>


        
        
          
        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.7 }}
          style={{ position: "relative", display: "flex", justifyContent: "center" }}
        >
          <CTAPoppy onClick={() => setScreen("booth")} />
        </motion.div>

        {/* Bottom hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.4 }}
          style={{
            marginTop: "28px",
            fontFamily: "Caveat, cursive",
            fontSize: "13px",
            color: "#a898b8",
            textAlign: "center",
            letterSpacing: "0.08em",
          }}
        >
          click anywhere for a little surprise · made by jitsen
        </motion.div>
      </div>
    </div>
  );
}

const C = {
  poppyPetalA: "#f4a8d8",
  poppyPetalB: "#d26b80",
  poppyCenter: "#fad568",
  poppyStem: "#5a8850",

  gold: "#d4b888",
  goldDim: "#bfa06b",

  petalPink: "#f0c8d0",
  petalDust: "#dba8b8",
  petalCream: "#f5e8d8",
  petalBlue: "#b8d0e8",
  petalPlum: "#c8a8c8",

  stampBg: "#faf0d8",
  stampBorder: "#c8a050",

  plum: "#4a2840",
  plumMid: "#6a4868",
  text: "#281520",
};


// A single pressed-flower petal — slightly irregular, botanical

function PressedPetal({
  w = 18, h = 32, color = C.petalPink, rotate = 0, opacity = 0.7,
}: {
  w?: number; h?: number; color?: string; rotate?: number; opacity?: number;
}) {
  return (
    <svg
      width={w} height={h}
      viewBox="0 0 18 32"
      style={{ overflow: "visible", transform: `rotate(${rotate}deg)` }}
    >
      <path
        d="M9 1.5 Q15.5 5 16 13 Q16.5 22 9 30.5 Q1.5 22 2 13 Q2.5 5 9 1.5 Z"
        fill={color} fillOpacity={opacity}
      />
      {/* Central vein */}
      <path d="M9 5 Q10 14 9.5 24" stroke="white" strokeWidth="0.55" strokeOpacity="0.38" fill="none" />
    </svg>
  );
}

// Tiny 4-point gold sparkle
function GoldSparkle({ size = 10, opacity = 0.8 }: { size?: number; opacity?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" style={{ overflow: "visible" }}>
      <path
        d="M7 0.5 L8.1 5.6 L13.5 7 L8.1 8.4 L7 13.5 L5.9 8.4 L0.5 7 L5.9 5.6 Z"
        fill={C.gold} fillOpacity={opacity}
      />
    </svg>
  );
}

// Tinier diamond sparkle for density variation
function DiamondSparkle({ size = 7, opacity = 0.6 }: { size?: number; opacity?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 8 8">
      <path d="M4 0 L5.4 4 L4 8 L2.6 4 Z" fill={C.goldDim} fillOpacity={opacity} />
      <path d="M0 4 L4 2.6 L8 4 L4 5.4 Z" fill={C.goldDim} fillOpacity={opacity} />
    </svg>
  );
}


// Small Bhutanese textile accent — just a corner fragment, very muted
function TextileAccent({ rotate = 0 }: { rotate?: number }) {
  const bands = ["#c8a870", "#8a6880", "#7080b8", "#c87860", "#c8a870"];
  return (
    <svg width="56" height="72" viewBox="0 0 56 72" style={{ transform: `rotate(${rotate}deg)`, overflow: "visible" }}>
      {/* Base */}
      <rect x="0" y="0" width="56" height="64" fill="#7a3860" fillOpacity="0.55" rx="2" />
      {/* Woven grid — very small, subtle */}
      {Array.from({ length: 8 }, (_, row) =>
        Array.from({ length: 5 }, (_, col) => (
          <rect key={`${row}-${col}`}
            x={col * 11.2} y={row * 8}
            width="5" height="4"
            fill={bands[col % bands.length]} fillOpacity="0.45"
          />
        ))
      )}
      {/* Central small diamond */}
      <polygon points="28,14 36,28 28,42 20,28" fill="none" stroke={C.gold} strokeWidth="1.2" strokeOpacity="0.5" />
      <circle cx="28" cy="28" r="3" fill={C.gold} fillOpacity="0.3" />
      {/* Top/bottom gold bands */}
      <rect x="0" y="0"  width="56" height="2.5" fill={C.gold} fillOpacity="0.7" />
      <rect x="0" y="61" width="56" height="2.5" fill={C.gold} fillOpacity="0.7" />
      {/* Fringe */}
      {Array.from({ length: 7 }, (_, i) => (
        <line key={i} x1={4 + i * 8} y1="64" x2={5 + i * 8} y2="78"
          stroke="#7a3860" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.5" />
      ))}
    </svg>
  );
}

// Tiny floating petal cluster — 3 overlapping petals arranged around a point
function PetalCluster({
  colors = [C.petalPink, C.petalDust, C.petalCream],
  scale = 1,
}: {
  colors?: string[];
  scale?: number;
}) {
  const cfg = [
    { x:  0,  y:  0, rot: -15, c: colors[0] },
    { x: 12,  y:  4, rot:  30, c: colors[1] },
    { x:  5,  y: -8, rot:  70, c: colors[2] },
  ];
  return (
    <svg width={40 * scale} height={44 * scale} viewBox="0 0 40 44" style={{ overflow: "visible" }}>
      {cfg.map((p, i) => (
        <g key={i} transform={`translate(${p.x},${p.y}) rotate(${p.rot},9,18)`}>
          <path
            d="M9 1 Q16 5 16 13 Q16 24 9 30 Q2 24 2 13 Q2 5 9 1 Z"
            fill={p.c} fillOpacity="0.68"
          />
          <path d="M9 4 Q10.5 13 10 22" stroke="white" strokeWidth="0.5" strokeOpacity="0.3" fill="none" />
        </g>
      ))}
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DECORATION LAYOUT DATA
// All positions are viewport-relative (left/right/top/bottom as CSS strings)
// ─────────────────────────────────────────────────────────────────────────────

// Floating poppies
const POPPIES = [
  // top-left corner cluster
  { id:"tl1", pos:{ left:"2.2%",  top:"6%"  }, size:52, rot:-18, dy:-10, dur:6.2, delay:0   },
  { id:"tl2", pos:{ left:"6.5%",  top:"1.5%"}, size:36, rot: 12, dy:-7,  dur:7.8, delay:1.5 },
  { id:"tl3", pos:{ left:"0.8%",  top:"18%" }, size:40, rot:-35, dy:-9,  dur:5.8, delay:0.9 },
  // top-right
  { id:"tr1", pos:{ right:"3.5%", top:"8%"  }, size:46, rot: 20, dy:-12, dur:6.8, delay:0.6 },
  { id:"tr2", pos:{ right:"9%",   top:"2%"  }, size:32, rot: -8, dy:-6,  dur:8.2, delay:2.1 },
  // bottom-left
  { id:"bl1", pos:{ left:"1.8%",  bottom:"12%"}, size:44, rot:-25, dy:-10, dur:6.5, delay:1.2 },
  { id:"bl2", pos:{ left:"7%",    bottom:"4%" }, size:30, rot:  8, dy:-7,  dur:7.4, delay:0.4 },
  // bottom-right
  { id:"br1", pos:{ right:"2%",   bottom:"8%" }, size:54, rot: 22, dy:-13, dur:5.9, delay:0.8 },
  { id:"br2", pos:{ right:"8.5%", bottom:"3%" }, size:38, rot:-12, dy:-8,  dur:7.1, delay:1.8 },
  // mid edges
  { id:"ml1", pos:{ left:"1%",    top:"54%"   }, size:28, rot:-30, dy:-6,  dur:8.5, delay:2.4 },
  { id:"mr1", pos:{ right:"1.5%", top:"48%"   }, size:34, rot: 18, dy:-9,  dur:7.6, delay:1.1 },
];

// Individual petals
const PETALS: {
  id:string; pos:React.CSSProperties; w:number; h:number;
  color:string; rot:number; op:number; delay:number; dur:number;
}[] = [
  // top-left
  { id:"p1",  pos:{ left:"10%",  top:"2.5%"}, w:14,h:25, color:C.petalPink,  rot: 40, op:0.65, delay:0,   dur:6.5 },
  { id:"p2",  pos:{ left:"14%",  top:"7%"  }, w:12,h:22, color:C.petalCream, rot:-20, op:0.55, delay:1.3, dur:7.2 },
  { id:"p3",  pos:{ left:"4%",   top:"11%" }, w:10,h:18, color:C.petalDust,  rot: 60, op:0.60, delay:0.7, dur:5.8 },
  // top-right
  { id:"p4",  pos:{ right:"13%", top:"3%"  }, w:15,h:26, color:C.petalBlue,  rot:-45, op:0.62, delay:0.5, dur:7.8 },
  { id:"p5",  pos:{ right:"5%",  top:"14%" }, w:12,h:20, color:C.petalPink,  rot: 25, op:0.58, delay:1.8, dur:6.1 },
  { id:"p6",  pos:{ right:"16%", top:"8%"  }, w:10,h:17, color:C.petalPlum,  rot:-10, op:0.50, delay:0.3, dur:8.4 },
  // bottom-left
  { id:"p7",  pos:{ left:"12%",  bottom:"5.5%"}, w:14,h:24, color:C.petalPink,  rot: 35, op:0.60, delay:1.0, dur:7.0 },
  { id:"p8",  pos:{ left:"3.5%", bottom:"18%"  }, w:10,h:18, color:C.petalCream, rot:-55, op:0.55, delay:2.2, dur:6.8 },
  { id:"p9",  pos:{ left:"16%",  bottom:"10%"  }, w:11,h:19, color:C.petalDust,  rot: 15, op:0.62, delay:0.6, dur:7.5 },
  // bottom-right
  { id:"p10", pos:{ right:"11%", bottom:"5%"   }, w:16,h:28, color:C.petalBlue,  rot:-30, op:0.65, delay:1.5, dur:6.4 },
  { id:"p11", pos:{ right:"3.5%",bottom:"16%"  }, w:12,h:21, color:C.petalPink,  rot: 50, op:0.58, delay:0.9, dur:7.9 },
  { id:"p12", pos:{ right:"17%", bottom:"10%"  }, w:10,h:17, color:C.petalPlum,  rot:-20, op:0.52, delay:2.0, dur:6.2 },
  // left edge mid
  { id:"p13", pos:{ left:"2%",   top:"44%"     }, w:11,h:20, color:C.petalCream, rot: 70, op:0.50, delay:0.4, dur:8.0 },
  { id:"p14", pos:{ left:"5%",   top:"60%"     }, w:9, h:16, color:C.petalPink,  rot:-40, op:0.45, delay:1.7, dur:6.6 },
  // right edge mid
  { id:"p15", pos:{ right:"3%",  top:"58%"     }, w:12,h:20, color:C.petalDust,  rot: 25, op:0.50, delay:1.1, dur:7.3 },
  { id:"p16", pos:{ right:"6%",  top:"65%"     }, w:9, h:15, color:C.petalBlue,  rot:-60, op:0.44, delay:0.2, dur:8.8 },
];

// Gold sparkles
const SPARKLES: { id:string; pos:React.CSSProperties; size:number; op:number; delay:number; dur:number; big:boolean }[] = [
  // top-left
  { id:"s1",  pos:{ left:"12%",  top:"4%"  }, size:10, op:0.75, delay:0,   dur:2.4, big:true  },
  { id:"s2",  pos:{ left:"7%",   top:"9%"  }, size:7,  op:0.60, delay:1.2, dur:3.0, big:false },
  { id:"s3",  pos:{ left:"16%",  top:"11%" }, size:6,  op:0.55, delay:0.5, dur:2.8, big:false },
  { id:"s4",  pos:{ left:"3%",   top:"16%" }, size:8,  op:0.65, delay:1.8, dur:2.2, big:false },
  { id:"s5",  pos:{ left:"20%",  top:"5%"  }, size:5,  op:0.50, delay:0.8, dur:3.4, big:false },
  // top-right
  { id:"s6",  pos:{ right:"11%", top:"5%"  }, size:11, op:0.78, delay:0.4, dur:2.6, big:true  },
  { id:"s7",  pos:{ right:"5%",  top:"12%" }, size:7,  op:0.62, delay:1.5, dur:3.1, big:false },
  { id:"s8",  pos:{ right:"18%", top:"4%"  }, size:6,  op:0.55, delay:0.2, dur:2.5, big:false },
  { id:"s9",  pos:{ right:"14%", top:"12%" }, size:5,  op:0.48, delay:2.2, dur:3.8, big:false },
  // bottom-left
  { id:"s10", pos:{ left:"9%",   bottom:"8%"  }, size:9,  op:0.70, delay:0.6, dur:2.3, big:true  },
  { id:"s11", pos:{ left:"18%",  bottom:"4%"  }, size:6,  op:0.55, delay:1.9, dur:2.9, big:false },
  { id:"s12", pos:{ left:"4%",   bottom:"20%" }, size:5,  op:0.48, delay:0.3, dur:3.5, big:false },
  // bottom-right
  { id:"s13", pos:{ right:"9%",  bottom:"7%"  }, size:10, op:0.72, delay:1.0, dur:2.7, big:true  },
  { id:"s14", pos:{ right:"4%",  bottom:"18%" }, size:7,  op:0.60, delay:0.7, dur:3.2, big:false },
  { id:"s15", pos:{ right:"19%", bottom:"5%"  }, size:5,  op:0.50, delay:2.0, dur:2.6, big:false },
  { id:"s16", pos:{ right:"13%", bottom:"13%" }, size:6,  op:0.52, delay:1.4, dur:3.0, big:false },
  // mid edges
  { id:"s17", pos:{ left:"2%",   top:"38%"    }, size:7,  op:0.45, delay:0.9, dur:3.6, big:false },
  { id:"s18", pos:{ right:"2%",  top:"40%"    }, size:8,  op:0.48, delay:1.6, dur:3.3, big:false },
  { id:"s19", pos:{ left:"22%",  top:"3%"     }, size:5,  op:0.42, delay:2.4, dur:4.0, big:false },
  { id:"s20", pos:{ right:"22%", top:"3%"     }, size:5,  op:0.42, delay:1.1, dur:3.7, big:false },
];



function StripSelectionScreen({
setScreen,
setSelectedStrip
}: any){

  return (
    <div
      className="relative w-full min-h-screen overflow-hidden"
      style={{
        // Multi-stop diagonal gradient: rose-cream → pure cream → lavender-cream → powder-blue cream
        background: `
          radial-gradient(ellipse 80% 60% at 8% 5%,   rgba(245,210,218,0.55) 0%, transparent 60%),
          radial-gradient(ellipse 60% 50% at 92% 6%,  rgba(200,220,240,0.40) 0%, transparent 55%),
          radial-gradient(ellipse 70% 55% at 5% 96%,  rgba(235,208,220,0.45) 0%, transparent 60%),
          radial-gradient(ellipse 65% 50% at 94% 94%, rgba(180,200,238,0.38) 0%, transparent 55%),
          linear-gradient(168deg, #fef8f5 0%, #fdf8f2 45%, #f9f5fc 100%)
        `,
        fontFamily: "Nunito, sans-serif",
      }}
    >
      {/* ── Paper grain overlay ──────────────────────────────────────────── */}
      <div
        aria-hidden
        style={{
          position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='280' height='280'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='280' height='280' filter='url(%23n)' opacity='0.038'/%3E%3C/svg%3E")`,
          opacity: 0.55,
        }}
      />

      {/* ── Subtle vignette at edges ─────────────────────────────────────── */}
      <div
        aria-hidden
        style={{
          position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
          background: "radial-gradient(ellipse 90% 85% at 50% 50%, transparent 55%, rgba(200,170,185,0.08) 100%)",
        }}
      />

      {/* ════════════════════════════════════════════════════════════════════
          FLOATING BLUE POPPIES
      ════════════════════════════════════════════════════════════════════ */}
      {POPPIES.map((p) => (
        <motion.div
          key={p.id}
          aria-hidden
          style={{ position: "absolute", ...p.pos, zIndex: 2 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, p.dy, 0], rotate: [p.rot, p.rot + 7, p.rot] }}
          transition={{
            opacity:  { duration: 1.2, delay: p.delay },
            y:        { duration: p.dur, repeat: Infinity, ease: "easeInOut", delay: p.delay },
            rotate:   { duration: p.dur * 1.1, repeat: Infinity, ease: "easeInOut", delay: p.delay + 0.3 },
          }}
        >
          <BluePoppySVG size={p.size} gId={p.id} />
        </motion.div>
      ))}

      {/* ════════════════════════════════════════════════════════════════════
          PRESSED PETALS (individual)
      ════════════════════════════════════════════════════════════════════ */}
      {PETALS.map((p) => (
        <motion.div
          key={p.id}
          aria-hidden
          style={{ position: "absolute", ...p.pos, zIndex: 2 }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: p.op,
            rotate: [p.rot - 2, p.rot + 2, p.rot - 2],
            y: [0, -4, 0],
          }}
          transition={{
            opacity: { duration: 1.4, delay: p.delay },
            rotate:  { duration: p.dur, repeat: Infinity, ease: "easeInOut", delay: p.delay },
            y:       { duration: p.dur * 0.9, repeat: Infinity, ease: "easeInOut", delay: p.delay + 0.5 },
          }}
        >
          <PressedPetal w={p.w} h={p.h} color={p.color} rotate={0} opacity={p.op} />
        </motion.div>
      ))}

      {/* ════════════════════════════════════════════════════════════════════
          GOLD SPARKLES
      ════════════════════════════════════════════════════════════════════ */}
      {SPARKLES.map((s) => (
        <motion.div
          key={s.id}
          aria-hidden
          style={{ position: "absolute", ...s.pos, zIndex: 3 }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: [s.op * 0.6, s.op, s.op * 0.6], scale: [0.85, 1.15, 0.85] }}
          transition={{
            opacity: { duration: s.dur, repeat: Infinity, ease: "easeInOut", delay: s.delay },
            scale:   { duration: s.dur, repeat: Infinity, ease: "easeInOut", delay: s.delay + 0.2 },
          }}
        >
          {s.big
            ? <GoldSparkle size={s.size} opacity={s.op} />
            : <DiamondSparkle size={s.size} opacity={s.op} />
          }
        </motion.div>
      ))}

      {/* ════════════════════════════════════════════════════════════════════
          BHUTANESE STAMPS  (corners, two only)
      ════════════════════════════════════════════════════════════════════ */}
      {/* Top-left */}
      <motion.div
        aria-hidden
        style={{ position: "absolute", left: "1.5%", top: "22%", zIndex: 4 }}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: [0, -5, 0] }}
        transition={{
          opacity: { duration: 1.2, delay: 0.8 },
          y:       { duration: 7.5, repeat: Infinity, ease: "easeInOut", delay: 1.2 },
        }}
      >
        <BhutaneseStamp rotate={-9} gId="stamp-tl" scale={0.88} />
      </motion.div>

      {/* Bottom-right */}
      <motion.div
        aria-hidden
        style={{ position: "absolute", right: "2%", bottom: "22%", zIndex: 4 }}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: [0, -6, 0] }}
        transition={{
          opacity: { duration: 1.2, delay: 1.4 },
          y:       { duration: 8.2, repeat: Infinity, ease: "easeInOut", delay: 0.6 },
        }}
      >
        <BhutaneseStamp rotate={7} gId="stamp-br" scale={0.82} />
      </motion.div>

      {/* ════════════════════════════════════════════════════════════════════
          TEXTILE ACCENTS  (two corner fragments)
      ════════════════════════════════════════════════════════════════════ */}
      <motion.div
        aria-hidden
        style={{ position: "absolute", right: "2%", top: "16%", zIndex: 2, opacity: 0.52 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.52, rotate: [10, 12, 10], y: [0, -4, 0] }}
        transition={{
          opacity: { duration: 1.5, delay: 1.0 },
          rotate:  { duration: 9.0, repeat: Infinity, ease: "easeInOut" },
          y:       { duration: 8.0, repeat: Infinity, ease: "easeInOut", delay: 1.5 },
        }}
      >
        <TextileAccent rotate={10} />
      </motion.div>

      <motion.div
        aria-hidden
        style={{ position: "absolute", left: "2.5%", bottom: "24%", zIndex: 2, opacity: 0.48 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.48, rotate: [-8, -6, -8], y: [0, -3, 0] }}
        transition={{
          opacity: { duration: 1.5, delay: 1.6 },
          rotate:  { duration: 10,  repeat: Infinity, ease: "easeInOut", delay: 0.8 },
          y:       { duration: 8.8, repeat: Infinity, ease: "easeInOut", delay: 0.4 },
        }}
      >
        <TextileAccent rotate={-8} />
      </motion.div>

      {/* ════════════════════════════════════════════════════════════════════
          PETAL CLUSTERS  (dense corner groupings)
      ════════════════════════════════════════════════════════════════════ */}
      {/* Top-left cluster */}
      <motion.div
        aria-hidden
        style={{ position: "absolute", left: "17%", top: "1.5%", zIndex: 2 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.65, y: [0, -6, 0], rotate: [0, 3, 0] }}
        transition={{ opacity:{ duration:1.4,delay:0.5 }, y:{ duration:7.4,repeat:Infinity,ease:"easeInOut",delay:0.8 }, rotate:{ duration:8.0,repeat:Infinity,ease:"easeInOut" } }}
      >
        <PetalCluster colors={[C.petalPink, C.petalDust, C.petalCream]} scale={0.9} />
      </motion.div>

      {/* Top-right cluster */}
      <motion.div
        aria-hidden
        style={{ position: "absolute", right: "20%", top: "1%", zIndex: 2 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.62, y: [0, -5, 0], rotate: [0, -3, 0] }}
        transition={{ opacity:{ duration:1.4,delay:1.1 }, y:{ duration:8.1,repeat:Infinity,ease:"easeInOut",delay:1.4 }, rotate:{ duration:9.0,repeat:Infinity,ease:"easeInOut",delay:0.5 } }}
      >
        <PetalCluster colors={[C.petalBlue, C.petalPlum, C.petalPink]} scale={0.85} />
      </motion.div>

      {/* Bottom-left cluster */}
      <motion.div
        aria-hidden
        style={{ position: "absolute", left: "20%", bottom: "2%", zIndex: 2 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.60, y: [0, -4, 0], rotate: [0, 2, 0] }}
        transition={{ opacity:{ duration:1.4,delay:0.7 }, y:{ duration:7.8,repeat:Infinity,ease:"easeInOut",delay:2.0 }, rotate:{ duration:8.5,repeat:Infinity,ease:"easeInOut",delay:1.0 } }}
      >
        <PetalCluster colors={[C.petalCream, C.petalPink, C.petalDust]} scale={0.8} />
      </motion.div>

      {/* Bottom-right cluster */}
      <motion.div
        aria-hidden
        style={{ position: "absolute", right: "18%", bottom: "1.5%", zIndex: 2 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.58, y: [0, -5, 0], rotate: [0, -2, 0] }}
        transition={{ opacity:{ duration:1.4,delay:1.3 }, y:{ duration:8.6,repeat:Infinity,ease:"easeInOut",delay:0.6 }, rotate:{ duration:9.5,repeat:Infinity,ease:"easeInOut",delay:1.8 } }}
      >
        <PetalCluster colors={[C.petalPlum, C.petalBlue, C.petalCream]} scale={0.85} />
      </motion.div>

      {/* ════════════════════════════════════════════════════════════════════
          TITLE SECTION  — top ~18% of the page
      ════════════════════════════════════════════════════════════════════ */}
      <div
        style={{
          position: "relative", zIndex: 10,
          display: "flex", flexDirection: "column",
          alignItems: "center",
          paddingTop: "clamp(44px, 6vh, 72px)",
          paddingBottom: "clamp(20px, 3vh, 36px)",
        }}
      >
        {/* Brand wordmark */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: "Playfair Display, serif",
            fontSize: "clamp(9px, 1.1vw, 12px)",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: C.gold,
            marginBottom: "clamp(10px, 1.8vh, 18px)",
            display: "flex",
            alignItems: "center",
            gap: "14px",
          }}
        >
          {/* Left rule */}
          <span style={{
            display: "inline-block", width: "clamp(28px, 4vw, 52px)", height: "0.5px",
            background: `linear-gradient(to right, transparent, ${C.gold})`,
          }} />
          Pressed Petals
          {/* Right rule */}
          <span style={{
            display: "inline-block", width: "clamp(28px, 4vw, 52px)", height: "0.5px",
            background: `linear-gradient(to left, transparent, ${C.gold})`,
          }} />
        </motion.div>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: "Playfair Display, serif",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "clamp(34px, 5.5vw, 68px)",
            color: C.text,
            letterSpacing: "-0.025em",
            lineHeight: 1.1,
            margin: 0,
            textAlign: "center",
          }}
        >
          Choose Your Photostrip
        </motion.h1>

        {/* Handwritten subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.38, ease: "easeOut" }}
          style={{
            fontFamily: "Caveat, cursive",
            fontSize: "clamp(15px, 1.8vw, 20px)",
            color: C.plumMid,
            marginTop: "clamp(8px, 1.4vh, 14px)",
            opacity: 0.78,
            letterSpacing: "0.02em",
          }}
        >
          pick your favourite ✿
        </motion.div>

        {/* Decorative divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0.4 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.9, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginTop: "clamp(12px, 2vh, 20px)",
          }}
        >
          <span style={{
            display: "inline-block", width: "clamp(40px, 6vw, 80px)", height: "0.75px",
            background: `linear-gradient(to right, transparent, rgba(180,140,160,0.35))`,
          }} />
          {/* Centre ornament — two petals + a sparkle */}
          <span style={{ display: "flex", alignItems: "center", gap: "5px", opacity: 0.65 }}>
            <PressedPetal w={9} h={16} color={C.petalPink} rotate={-30} opacity={0.7} />
            <GoldSparkle size={9} opacity={0.7} />
            <PressedPetal w={9} h={16} color={C.petalBlue} rotate={30} opacity={0.7} />
          </span>
          <span style={{
            display: "inline-block", width: "clamp(40px, 6vw, 80px)", height: "0.75px",
            background: `linear-gradient(to left, transparent, rgba(180,140,160,0.35))`,
          }} />
        </motion.div>
      </div>

      {/* ════════════════════════════════════════════════════════════════════
          EMPTY CENTER AREA  — ~65% of viewport height
          This space is intentionally clear for custom photostrip designs.
      ════════════════════════════════════════════════════════════════════ */}
      <div
style={{
display:"flex",
justifyContent:"center",
gap:"40px",
marginTop:"40px"
}}
>

<img
src={Brown}
style={{
width:"180px",
cursor:"pointer"
}}
onClick={() => {
setSelectedStrip("brown");
setScreen("preview");
}}
/>

<img
src={Pink}

style={{
width:"180px",
cursor:"pointer"
}}

onClick={()=>{
setSelectedStrip("pink");
setScreen("preview");
}}
/>

<img
src={Red}

style={{
width:"180px",
cursor:"pointer"
}}

onClick={()=>{
setSelectedStrip("red");
setScreen("preview");
}}
/>


</div>


      {/* ════════════════════════════════════════════════════════════════════
          BOTTOM AREA  — gentle footer space
      ════════════════════════════════════════════════════════════════════ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay: 0.9 }}
        style={{
          position: "relative", zIndex: 10,
          display: "flex", flexDirection: "column",
          alignItems: "center",
          paddingBottom: "clamp(28px, 4vh, 48px)",
          gap: "8px",
        }}
      >
        {/* Bottom rule */}
        <div style={{
          width: "clamp(50px, 8vw, 100px)", height: "0.5px",
          background: `linear-gradient(to right, transparent, ${C.gold}, transparent)`,
          opacity: 0.45,
        }} />
        {/* Tiny brand footer */}
        <div style={{
          fontFamily: "Caveat, cursive",
          fontSize: "clamp(10px, 1.2vw, 13px)",
          color: C.plumMid,
          opacity: 0.38,
          letterSpacing: "0.14em",
        }}>
          pressed petals · 
        </div>
      </motion.div>
    </div>
  );
}



