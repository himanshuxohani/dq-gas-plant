import { Panel, StatTile, Pill } from "@/components/ui";
import ProcessFlowDiagram from "@/components/ProcessFlowDiagram";

const FEED_STATS = [
  { label: "Total Feed Gas", value: "115.2", unit: "MMSCFD", trend: 2.1 },
  { label: "Lean Gas Exported", value: "99.7", unit: "MMSCFD", trend: 1.4 },
  { label: "NGL to Ruwais", value: "89.0", unit: "MMSCFD", trend: -0.6, positive: false },
  { label: "Fuel Gas Consumed", value: "99.6", unit: "MMSCFD", trend: 0.8 },
];

export default function ProcessFlowPage() {
  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {FEED_STATS.map((s) => (
          <Panel key={s.label} className="!py-3.5">
            <StatTile {...s} />
          </Panel>
        ))}
      </div>

      <Panel
        eyebrow="DIGITAL QUOTIENT GAS PLANT"
        title="Feed to Product — Live Mass Balance"
        action={<Pill tone="good">Balanced · Δ 0.3%</Pill>}
      >
        <div className="overflow-x-auto scrollbar-thin">
          <div className="min-w-[880px]">
            <ProcessFlowDiagram />
          </div>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-4 border-t border-ember-500/10 pt-3 text-[11px] text-mist-200/50 light:text-ink-500">
          <span className="flex items-center gap-1.5"><i className="h-2 w-2 rounded-full bg-ember-500" /> Process gas</span>
          <span className="flex items-center gap-1.5"><i className="h-2 w-2 rounded-full bg-orange-300" /> Sweeping / fuel gas</span>
          <span className="flex items-center gap-1.5"><i className="h-2 w-2 rounded-full bg-rose-500" /> NGL / liquids export</span>
          <span className="ml-auto font-mono">All values in MMSCFD · updated 5 min ago</span>
        </div>
      </Panel>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Panel eyebrow="TRAIN STATUS" title="Compression Trains">
          <ul className="space-y-3">
            {[
              { name: "Booster Compressor", load: "82%", status: "good" },
              { name: "LP Compressor 2K-101/201", load: "88%", status: "good" },
              { name: "IP Compressor 2K-102/202", load: "91%", status: "warn" },
              { name: "HP Compressor 2K-103/203", load: "95%", status: "warn" },
            ].map((t) => (
              <li key={t.name} className="flex items-center justify-between text-[12px]">
                <span className="text-mist-200/75 light:text-ink-700">{t.name}</span>
                <span className="flex items-center gap-2">
                  <span className="font-mono text-white light:text-ink-900">{t.load}</span>
                  <Pill tone={t.status}>{t.status === "good" ? "Normal" : "Watch"}</Pill>
                </span>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel eyebrow="NGL & DEHYDRATION" title="Recovery Train Efficiency">
          <div className="space-y-3">
            {[
              { name: "Dehydration Train A", v: 96 },
              { name: "Dehydration Train B", v: 94 },
              { name: "NGL Recovery Train A", v: 91 },
              { name: "NGL Recovery Train B", v: 89 },
            ].map((r) => (
              <div key={r.name} className="flex items-center justify-between text-[12px]">
                <span className="text-mist-200/75 light:text-ink-700">{r.name}</span>
                <div className="h-1.5 w-24 overflow-hidden rounded-full bg-white/8 light:bg-ink-900/10">
                  <div className="h-full rounded-full bg-gradient-to-r from-ember-500/70 to-ember-500" style={{ width: `${r.v}%` }} />
                </div>
                <span className="font-mono text-white light:text-ink-900">{r.v}%</span>
              </div>
            ))}
          </div>
        </Panel>

        <Panel eyebrow="DISTRIBUTION" title="Lean Gas Allocation">
          <ul className="space-y-3 text-[12px]">
            <li className="flex items-center justify-between"><span className="text-mist-200/75 light:text-ink-700">LGR · ADNOC Onshore</span><span className="font-mono text-ember-400">99.7 MMSCFD</span></li>
            <li className="flex items-center justify-between"><span className="text-mist-200/75 light:text-ink-700">Fuel Gas · ADNOC Onshore</span><span className="font-mono text-ember-400">66.0 MMSCFD</span></li>
            <li className="flex items-center justify-between"><span className="text-mist-200/75 light:text-ink-700">Fuel Gas · ADNOC Gas Processing</span><span className="font-mono text-ember-400">33.6 MMSCFD</span></li>
            <li className="flex items-center justify-between"><span className="text-mist-200/75 light:text-ink-700">Sweeping Gas · 36″ HP Line</span><span className="font-mono text-ember-400">45.1 MMSCFD</span></li>
            <li className="flex items-center justify-between"><span className="text-mist-200/75 light:text-ink-700">Habshan Injection / Th.C Manifold</span><span className="font-mono text-ember-400">22.1 MMSCFD</span></li>
          </ul>
        </Panel>
      </div>
    </div>
  );
}
