"use client";

import { Wind, Droplets, Factory, RadioTower, ArrowRight } from "lucide-react";

// Coordinate space is 1000 x 560; everything is positioned with % so it scales.
const W = 1000;
const H = 560;
const X = (x) => `${(x / W) * 100}%`;
const Y = (y) => `${(y / H) * 100}%`;

function Node({ x, y, children, align = "center" }) {
  const translate =
    align === "center" ? "-translate-x-1/2 -translate-y-1/2" : align === "left" ? "-translate-y-1/2" : "-translate-x-full -translate-y-1/2";
  return (
    <div className={`absolute ${translate}`} style={{ left: X(x), top: Y(y) }}>
      {children}
    </div>
  );
}

function CompressorIcon({ tone = "ember" }) {
  const tones = {
    ember: "from-ember-400 to-ember-600 shadow-glow",
    steel: "from-ink-500 to-ink-700",
  };
  return (
    <div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${tones[tone]}`}>
      <Wind size={20} className="text-white" />
    </div>
  );
}

function TrainNode({ icon: Icon, title, sub }) {
  return (
    <div className="flex flex-col items-center gap-1.5 text-center">
      <div className="flex h-[72px] w-[72px] items-center justify-center rounded-full border-2 border-ember-500/70 bg-ink-900/80 shadow-glow light:bg-white">
        <Icon size={26} className="text-ember-400" />
      </div>
      <p className="max-w-[110px] text-[10.5px] font-semibold leading-tight text-white light:text-ink-900">{title}</p>
      {sub && <p className="text-[9.5px] text-mist-200/50 light:text-ink-500">{sub}</p>}
    </div>
  );
}

function FeedLabel({ title, value, align = "left" }) {
  return (
    <div className={`flex flex-col ${align === "left" ? "items-start" : "items-end"}`}>
      <span className="text-[10.5px] text-mist-200/60 light:text-ink-600">{title}</span>
      <span className="font-mono text-[13px] font-semibold text-ember-400">{value}</span>
    </div>
  );
}

function CompLabel({ title, sub }) {
  return (
    <div className="mt-1 text-center">
      <p className="text-[10px] font-semibold text-white light:text-ink-900">{title}</p>
      <p className="text-[9px] text-mist-200/50 light:text-ink-500">{sub}</p>
    </div>
  );
}

function OutTag({ x, y, title, value, tone = "ember" }) {
  const valueColor = tone === "ember" ? "text-ember-400" : "text-emerald-400";
  return (
    <Node x={x} y={y} align="right">
      <div className="flex items-center gap-2">
        <div className="text-right">
          <p className="max-w-[190px] text-[10.5px] leading-tight text-mist-200/70 light:text-ink-600">{title}</p>
          {value && <p className={`font-mono text-[13px] font-semibold ${valueColor}`}>{value}</p>}
        </div>
        <ArrowRight size={13} className="text-ember-500" />
      </div>
    </Node>
  );
}

// Orthogonal connector with an arrowhead at the end.
function Connector({ points, dashed = false, bold = false, tone = "ember" }) {
  const d = points.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x},${y}`).join(" ");
  const stroke = tone === "ember" ? "#F97316" : tone === "amber" ? "#FDBA74" : "#F43F5E";
  return (
    <path
      d={d}
      fill="none"
      stroke={stroke}
      strokeWidth={bold ? 3 : 1.6}
      strokeDasharray={dashed ? "4 4" : undefined}
      markerEnd="url(#arrowHead)"
      opacity={bold ? 1 : 0.85}
    />
  );
}

function ValueTag({ x, y, value, tone = "ember" }) {
  const stroke = tone === "ember" ? "text-ember-400" : "text-rose-400";
  return (
    <Node x={x} y={y}>
      <span className={`rounded-md border border-ember-500/25 bg-ink-950/80 px-1.5 py-0.5 font-mono text-[10.5px] font-semibold ${stroke} light:bg-white`}>
        {value}
      </span>
    </Node>
  );
}

export default function ProcessFlowDiagram() {
  return (
    <div className="relative w-full" style={{ aspectRatio: `${W} / ${H}`, minHeight: 420 }}>
      <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full">
        <defs>
          <marker id="arrowHead" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill="#F97316" />
          </marker>
        </defs>

        {/* LP train */}
        <Connector points={[[95, 470], [150, 470]]} />
        <Connector points={[[195, 470], [255, 470]]} />
        <Connector points={[[300, 470], [300, 300], [400, 300]]} />

        {/* IP train */}
        <Connector points={[[95, 330], [255, 330]]} />
        <Connector points={[[300, 330], [400, 320]]} />

        {/* Merge into HP compressor inlet */}
        <Connector points={[[400, 310], [455, 250]]} bold />
        {/* HP gas direct feed */}
        <Connector points={[[95, 195], [455, 195], [455, 230]]} bold />

        {/* HP compressor to top sweeping-gas loop */}
        <Connector points={[[500, 165], [500, 60], [130, 60], [130, 165], [95, 165]]} tone="amber" />
        {/* Top line continues right to LGR */}
        <Connector points={[[500, 60], [900, 60]]} tone="amber" />

        {/* HP compressor down to dehydration */}
        <Connector points={[[500, 235], [500, 300], [580, 380]]} bold />

        {/* Fuel gas branch to ADNOC Onshore / Gas Processing */}
        <Connector points={[[560, 235], [780, 235], [780, 140], [900, 140]]} />
        <Connector points={[[780, 140], [780, 195], [900, 195]]} />

        {/* Dehydration -> High Yield Plant */}
        <Connector points={[[655, 400], [730, 400]]} />
        {/* High Yield -> Lean Gas Station */}
        <Connector points={[[805, 390], [870, 330], [900, 300]]} />
        {/* Lean Gas Station -> outputs */}
        <Connector points={[[945, 280], [1000, 260], [1040, 245]]} />
        <Connector points={[[945, 310], [1000, 340], [1040, 355]]} />

        {/* NGL export (bold red) */}
        <Connector points={[[615, 435], [615, 500], [1040, 500]]} tone="rose" bold />
      </svg>

      {/* Feed inputs */}
      <Node x={30} y={165} align="left"><FeedLabel title="HP Gas" value="47.0 MMSCFD" /></Node>
      <Node x={30} y={330} align="left"><FeedLabel title="IP Gas" value="11.3 MMSCFD" /></Node>
      <Node x={30} y={470} align="left"><FeedLabel title="LP Gas" value="56.9 MMSCFD" /></Node>

      {/* Compressors */}
      <Node x={170} y={470}>
        <CompressorIcon tone="steel" />
        <CompLabel title="Booster Compressor" sub="" />
      </Node>
      <Node x={275} y={470}>
        <CompressorIcon tone="steel" />
        <CompLabel title="LP Compressor" sub="2K-101/201" />
      </Node>
      <Node x={275} y={330}>
        <CompressorIcon tone="ember" />
        <CompLabel title="IP Compressor" sub="2K-102/202" />
      </Node>
      <Node x={500} y={200}>
        <CompressorIcon tone="ember" />
        <CompLabel title="HP Compressor" sub="2K-103/203" />
      </Node>

      {/* Process trains */}
      <Node x={610} y={400}>
        <TrainNode icon={Droplets} title="Dehydration & NGL Recovery" sub="2 Trains" />
      </Node>
      <Node x={765} y={400}>
        <TrainNode icon={Factory} title="High Yield Plant" sub="2 Trains" />
      </Node>
      <Node x={915} y={295}>
        <TrainNode icon={RadioTower} title="Lean Gas Station A&B" sub="" />
      </Node>

      {/* Value tags on lines */}
      <ValueTag x={330} y={300} value="98.2" />
      <ValueTag x={300} y={60} value="45.1" tone="rose" />
      <ValueTag x={700} y={60} value="12.3" tone="rose" />
      <ValueTag x={690} y={400} value="69.9" />
      <ValueTag x={905} y={260} value="22.1" />
      <ValueTag x={800} y={500} value="89.0 · NGL to Ruwais" tone="rose" />

      {/* Outputs */}
      <OutTag x={1000} y={60} title="LGR · ADNOC Onshore" value="99.7 MMSCFD" />
      <OutTag x={1000} y={140} title="ADNOC Onshore · Fuel Gas" value="66.0 MMSCFD" />
      <OutTag x={1000} y={195} title="ADNOC Gas Processing · Fuel Gas" value="33.6 MMSCFD" />
      <OutTag x={1000} y={245} title="Habshan Th.B Injection / Sales Gas to Th.C Manifold" />
      <OutTag x={1000} y={355} title="ADNOC Onshore Injection Facility" />
    </div>
  );
}
