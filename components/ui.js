"use client";

import { ArrowUp, ArrowDown } from "lucide-react";

export function Panel({ title, eyebrow, action, children, className = "" }) {
  return (
    <section className={`panel rounded-2xl px-4 py-4 shadow-panel md:px-5 md:py-5 ${className}`}>
      {(title || eyebrow) && (
        <div className="mb-3.5 flex items-center justify-between">
          <div>
            {eyebrow && (
              <p className="text-[10.5px] font-medium tracking-wide text-ember-400/90">{eyebrow}</p>
            )}
            {title && (
              <h3 className="font-display text-[14px] font-semibold text-white light:text-ink-900">{title}</h3>
            )}
          </div>
          {action}
        </div>
      )}
      {children}
    </section>
  );
}

export function Trend({ value, positive }) {
  const good = positive === undefined ? value >= 0 : positive;
  return (
    <span
      className={`inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 text-[11px] font-semibold ${
        good ? "bg-emerald-500/12 text-emerald-400" : "bg-rose-500/12 text-rose-400"
      }`}
    >
      {value >= 0 ? <ArrowUp size={11} /> : <ArrowDown size={11} />}
      {Math.abs(value)}%
    </span>
  );
}

export function StatTile({ label, value, unit, trend, positive }) {
  return (
    <div className="flex flex-col gap-1.5">
      <p className="text-[11px] text-mist-200/50 light:text-ink-500">{label}</p>
      <div className="flex items-baseline gap-1.5">
        <span className="font-display text-[22px] font-semibold text-white light:text-ink-900">{value}</span>
        {unit && <span className="text-[11px] text-mist-200/50 light:text-ink-500">{unit}</span>}
      </div>
      {trend !== undefined && <Trend value={trend} positive={positive} />}
    </div>
  );
}

export function Gauge({ value, max = 100, label, size = 96, warn = 60, good = 80 }) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  const r = size / 2 - 8;
  const c = 2 * Math.PI * r;
  const offset = c - (pct / 100) * c;
  const color = pct >= good ? "#34D399" : pct >= warn ? "#F97316" : "#F43F5E";

  return (
    <div className="flex flex-col items-center gap-2">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          className="text-white/8 light:text-ink-900/8"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ transition: "stroke-dashoffset 0.6s ease" }}
        />
        <text
          x="50%"
          y="47%"
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-white font-display text-[17px] font-semibold light:fill-ink-900"
        >
          {value}%
        </text>
      </svg>
      {label && <p className="text-center text-[11px] leading-tight text-mist-200/60 light:text-ink-600">{label}</p>}
    </div>
  );
}

export function ProgressRow({ label, value, max = 100, color = "#F97316" }) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between text-[11.5px]">
        <span className="text-mist-200/70 light:text-ink-600">{label}</span>
        <span className="font-medium text-white light:text-ink-900">{value}{max === 100 ? "%" : `/${max}`}</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/8 light:bg-ink-900/10">
        <div
          className="h-full rounded-full"
          style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${color}99, ${color})` }}
        />
      </div>
    </div>
  );
}

export function Sparkline({ points, width = 160, height = 44, color = "#F97316", filled = true }) {
  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min || 1;
  const step = width / (points.length - 1);
  const coords = points.map((p, i) => [i * step, height - ((p - min) / range) * (height - 6) - 3]);
  const path = coords.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
  const area = `${path} L${width},${height} L0,${height} Z`;

  return (
    <svg width="100%" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none" className="overflow-visible">
      {filled && (
        <defs>
          <linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.35" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
      )}
      {filled && <path d={area} fill="url(#sparkFill)" />}
      <path d={path} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Donut({ segments, size = 120, thickness = 16 }) {
  const total = segments.reduce((s, seg) => s + seg.value, 0);
  const r = size / 2 - thickness / 2;
  const c = 2 * Math.PI * r;
  let offsetAcc = 0;

  return (
    <div className="flex items-center gap-4">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {segments.map((seg, i) => {
          const frac = seg.value / total;
          const dash = frac * c;
          const el = (
            <circle
              key={i}
              cx={size / 2}
              cy={size / 2}
              r={r}
              fill="none"
              stroke={seg.color}
              strokeWidth={thickness}
              strokeDasharray={`${dash} ${c - dash}`}
              strokeDashoffset={-offsetAcc}
              transform={`rotate(-90 ${size / 2} ${size / 2})`}
              strokeLinecap="butt"
            />
          );
          offsetAcc += dash;
          return el;
        })}
      </svg>
      <ul className="space-y-1.5">
        {segments.map((seg, i) => (
          <li key={i} className="flex items-center gap-2 text-[11px]">
            <span className="h-2 w-2 rounded-full" style={{ background: seg.color }} />
            <span className="text-mist-200/70 light:text-ink-600">{seg.label}</span>
            <span className="font-medium text-white light:text-ink-900">{seg.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Bars({ data, height = 120, color = "#F97316" }) {
  const max = Math.max(...data.map((d) => d.value));
  return (
    <div className="flex items-end gap-2" style={{ height }}>
      {data.map((d, i) => (
        <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
          <div className="flex w-full flex-1 items-end">
            <div
              className="w-full rounded-t-md"
              style={{
                height: `${(d.value / max) * 100}%`,
                background: d.color || `linear-gradient(180deg, ${color}, ${color}66)`,
                minHeight: 3,
              }}
              title={`${d.label}: ${d.value}`}
            />
          </div>
          <span className="text-[10px] text-mist-200/50 light:text-ink-500">{d.label}</span>
        </div>
      ))}
    </div>
  );
}

export function Pill({ children, tone = "neutral" }) {
  const tones = {
    neutral: "bg-white/8 text-mist-200/80 light:bg-ink-900/8 light:text-ink-600",
    good: "bg-emerald-500/12 text-emerald-400",
    warn: "bg-amber-500/12 text-amber-400",
    bad: "bg-rose-500/12 text-rose-400",
    ember: "bg-ember-500/15 text-ember-400",
  };
  return <span className={`rounded-full px-2 py-0.5 text-[10.5px] font-medium ${tones[tone]}`}>{children}</span>;
}
