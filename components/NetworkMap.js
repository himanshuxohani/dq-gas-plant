"use client";

import { Building2 } from "lucide-react";

const W = 1000;
const H = 520;

const RAW_FACILITIES = [
  { name: "ADNOC LNG", status: "online" },
  { name: "ADNOC Onshore", status: "online" },
  { name: "Borouge", status: "online" },
  { name: "ADNOC Refining", status: "alert" },
  { name: "Rabdan", status: "online" },
  { name: "Ruwais", status: "online" },
  { name: "ADNOC Onshore Injection", status: "online" },
  { name: "Shipping", status: "online" },
  { name: "ADNOC Industrial Gas", status: "online" },
  { name: "Habshan", status: "online" },
  { name: "Habshan & Bab", status: "online" },
  { name: "ADNOC Sour Gas", status: "alert" },
  { name: "Bahasa", status: "online" },
  { name: "Asab", status: "online" },
];

// Spread nodes evenly around the hub (starting at the top, going clockwise) and
// alternate two radius rings so neighbouring labels never sit on top of each other.
const STEP = 360 / RAW_FACILITIES.length;
export const FACILITIES = RAW_FACILITIES.map((f, i) => ({
  ...f,
  angle: -90 + i * STEP,
  radiusScale: i % 2 === 0 ? 1 : 0.68,
}));

function polar(cx, cy, r, angleDeg) {
  const rad = (angleDeg * Math.PI) / 180;
  return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
}

export default function NetworkMap({ compact = false, detailed = false }) {
  const cx = W / 2;
  const cy = H / 2 + 10;
  const rBase = compact ? 210 : 230;

  const nodes = FACILITIES.map((f) => {
    const r = rBase * (f.radiusScale || 1);
    const [x, y] = polar(cx, cy, r, f.angle);
    return { ...f, x, y };
  });

  return (
    <div className="relative w-full" style={{ aspectRatio: `${W} / ${H}`, minHeight: 360 }}>
      <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full">
        <defs>
          <radialGradient id="hqGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#F97316" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#F97316" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx={cx} cy={cy} r={160} fill="url(#hqGlow)" />
        {nodes.map((n) => (
          <line
            key={n.name}
            x1={cx}
            y1={cy}
            x2={n.x}
            y2={n.y}
            stroke={n.status === "alert" ? "#F43F5E" : "#F97316"}
            strokeOpacity={0.45}
            strokeWidth={1.4}
            strokeDasharray={n.status === "alert" ? "3 4" : undefined}
          />
        ))}
        {nodes.map((n) => (
          <circle key={`dot-${n.name}`} cx={n.x} cy={n.y} r={5} fill={n.status === "alert" ? "#F43F5E" : "#34D399"} />
        ))}
      </svg>

      {/* HQ */}
      <div
        className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5"
        style={{ left: `${(cx / W) * 100}%`, top: `${(cy / H) * 100}%` }}
      >
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-ember-400 to-ember-600 shadow-glow">
          <Building2 size={24} className="text-white" />
        </div>
        <span className="rounded-full bg-ink-950/80 px-2 py-0.5 text-[10.5px] font-semibold text-white light:bg-white light:text-ink-900">
          HQ
        </span>
      </div>

      {/* facility labels */}
      {nodes.map((n) => {
        const leftPct = (n.x / W) * 100;
        const alignRight = leftPct > 62;
        const alignCenter = leftPct >= 38 && leftPct <= 62;
        return (
          <div
            key={`label-${n.name}`}
            className={`absolute flex -translate-y-1/2 items-center gap-1.5 ${
              alignCenter ? "-translate-x-1/2 flex-col" : alignRight ? "-translate-x-full flex-row-reverse" : "flex-row"
            }`}
            style={{ left: `${leftPct}%`, top: `${(n.y / H) * 100}%` }}
          >
            <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${n.status === "alert" ? "bg-rose-500" : "bg-emerald-400"}`} />
            <span
              className={`whitespace-nowrap rounded-md bg-ink-950/70 px-1.5 text-[10px] font-medium text-mist-100 light:bg-white/80 light:text-ink-800 ${
                detailed ? "flex flex-col items-center gap-0.5 py-1" : "py-0.5"
              }`}
            >
              {n.name}
              {detailed && (
                <span className={`text-[8.5px] font-semibold tracking-wide ${n.status === "alert" ? "text-rose-400" : "text-emerald-400"}`}>
                  {n.status === "alert" ? "ALERT" : "ONLINE"}
                </span>
              )}
            </span>
          </div>
        );
      })}
    </div>
  );
}
