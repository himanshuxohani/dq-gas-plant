"use client";

import { Users, HeartPulse } from "lucide-react";
import { Panel, Gauge, Trend } from "@/components/ui";

export default function ScorecardRow() {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
      {/* People */}
      <Panel eyebrow="PEOPLE" title="Emiratization">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-ember-500/12 text-ember-400">
            <Users size={20} />
          </div>
          <Gauge value={51} size={64} label={null} />
        </div>
        <div className="mt-3 flex justify-between text-[11px] text-mist-200/60 light:text-ink-600">
          <span>M · <b className="font-mono text-white light:text-ink-900">2,312</b></span>
          <span>F · <b className="font-mono text-white light:text-ink-900">2,232</b></span>
        </div>
      </Panel>

      {/* Profitability */}
      <Panel eyebrow="PROFITABILITY" title="vs. Budget Variance">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-mist-200/60 light:text-ink-600">OPEX</span>
            <span className="flex items-center gap-1.5 font-mono text-[13px] text-white light:text-ink-900">1.73% <Trend value={-1.73} /></span>
          </div>
          <p className="text-[10.5px] text-mist-200/40 light:text-ink-500">160.1MM favorable</p>
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-mist-200/60 light:text-ink-600">CAPEX</span>
            <span className="flex items-center gap-1.5 font-mono text-[13px] text-white light:text-ink-900">29.47% <Trend value={29.47} positive={false} /></span>
          </div>
          <p className="text-[10.5px] text-mist-200/40 light:text-ink-500">240.3MM over plan</p>
        </div>
      </Panel>

      {/* Performance */}
      <Panel eyebrow="PERFORMANCE" title="Production Volume">
        <div className="space-y-2.5">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-mist-200/60 light:text-ink-600">C2 Raw Ethane</span>
            <span className="flex items-center gap-1.5 font-mono text-white light:text-ink-900">9,924 T/D <Trend value={2.4} /></span>
          </div>
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-mist-200/60 light:text-ink-600">Sulphur</span>
            <span className="flex items-center gap-1.5 font-mono text-white light:text-ink-900">6,425 T/D <Trend value={-1.1} positive={false} /></span>
          </div>
          <Gauge value={75} size={72} label="Asset Availability" />
        </div>
      </Panel>

      {/* Efficiency */}
      <Panel eyebrow="EFFICIENCY" title="Schedule Index">
        <div className="grid grid-cols-2 gap-2">
          <Gauge value={30} size={64} label="Critical Milestones" />
          <Gauge value={80} size={64} label="Project Schedule" />
        </div>
        <div className="mt-3 flex items-center justify-between rounded-lg bg-white/5 px-2.5 py-1.5 light:bg-ink-900/5">
          <span className="text-[10.5px] text-mist-200/60 light:text-ink-600">Procurement Cycle Time</span>
          <span className="font-mono text-[12px] text-ember-400">2.72 pts</span>
        </div>
      </Panel>

      {/* HSE */}
      <Panel eyebrow="HSE" title="Compliance">
        <div className="flex items-center gap-3">
          <Gauge value={75} size={64} label="HSECES" />
          <div className="flex flex-col items-center gap-1 rounded-xl bg-white/5 px-3 py-2 light:bg-ink-900/5">
            <HeartPulse size={16} className="text-ember-400" />
            <span className="font-mono text-[15px] font-semibold text-white light:text-ink-900">2</span>
            <span className="text-[9.5px] text-mist-200/50 light:text-ink-500">TRIR</span>
          </div>
        </div>
        <div className="mt-3">
          <div className="flex items-center justify-between text-[10.5px] text-mist-200/60 light:text-ink-600">
            <span>HSE & PS Culture Transformation</span>
            <span className="font-mono text-white light:text-ink-900">30%</span>
          </div>
          <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-white/8 light:bg-ink-900/10">
            <div className="h-full w-[30%] rounded-full bg-gradient-to-r from-ember-500/70 to-ember-500" />
          </div>
        </div>
      </Panel>
    </div>
  );
}
