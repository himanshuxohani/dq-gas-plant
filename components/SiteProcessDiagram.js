"use client";

import { Wind, Filter, Droplet, Database, Waves, ArrowRight } from "lucide-react";

function Block({ icon: Icon, title, sub, tone = "steel", pct }) {
  const tones = {
    steel: "border-ink-500/60 bg-ink-800/70",
    ember: "border-ember-500/70 bg-ember-500/10 shadow-glow",
  };
  return (
    <div className={`flex min-w-[132px] flex-col gap-2 rounded-xl border px-3 py-2.5 ${tones[tone]} light:bg-white`}>
      <div className="flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-ember-500/15 text-ember-400">
          <Icon size={14} />
        </div>
        <p className="text-[10.5px] font-semibold leading-tight text-white light:text-ink-900">{title}</p>
      </div>
      {sub && <p className="text-[9.5px] text-mist-200/50 light:text-ink-500">{sub}</p>}
      {pct !== undefined && (
        <div className="flex items-center gap-1.5">
          <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/10 light:bg-ink-900/10">
            <div className="h-full rounded-full bg-ember-500" style={{ width: `${pct}%` }} />
          </div>
          <span className="font-mono text-[9.5px] text-ember-400">{pct}%</span>
        </div>
      )}
    </div>
  );
}

function Arrow() {
  return <ArrowRight size={16} className="mx-1 shrink-0 text-ember-500/70" />;
}

export default function SiteProcessDiagram() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap items-center gap-1">
        <Block icon={Wind} title="Gas Reduction Compression" sub="Make-up gas from network" />
        <Arrow />
        <div className="flex flex-col gap-2 rounded-xl border border-ember-500/40 bg-ink-900/40 p-2.5 light:bg-mist-100/60">
          <p className="px-1 text-[9.5px] font-medium tracking-wide text-ember-400/90">DQ COMPLEX 1 · FEED GAS SEPARATION & COMPRESSION</p>
          <div className="flex flex-wrap gap-2">
            <Block icon={Filter} title="Train 1" tone="ember" pct={95.5} />
            <Block icon={Filter} title="Train 2" tone="ember" pct={92.1} />
          </div>
        </div>
        <Arrow />
        <div className="flex flex-col gap-2 rounded-xl border border-ember-500/40 bg-ink-900/40 p-2.5 light:bg-mist-100/60">
          <p className="px-1 text-[9.5px] font-medium tracking-wide text-ember-400/90">DQ COMPLEX 2 · SWEETENING / DRYING / NGL RECOVERY</p>
          <div className="flex flex-wrap gap-2">
            <Block icon={Droplet} title="Train 1" tone="ember" pct={91.7} />
            <Block icon={Droplet} title="Train 2" tone="ember" pct={88.4} />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-1 pl-4">
        <Arrow />
        <Block icon={Database} title="Condensate Storage" sub="Buffer tanks" />
        <Arrow />
        <Block icon={Waves} title="Sour Water Treatment" sub="DQ Complex 3" />
        <Arrow />
        <div className="flex flex-wrap gap-2">
          <Block icon={ArrowRight} title="DQ Complex 1 F.G. to ADNOC" tone="ember" />
          <Block icon={ArrowRight} title="DQ Complex 2 F.G. to ADNOC" tone="ember" />
          <Block icon={ArrowRight} title="NGL to ADNOC Refining" tone="ember" />
        </div>
      </div>
    </div>
  );
}
