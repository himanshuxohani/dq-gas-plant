import { Panel, StatTile, Gauge, Donut, Bars, Sparkline, Pill } from "@/components/ui";
import SiteProcessDiagram from "@/components/SiteProcessDiagram";

const WORK_ORDERS = [12, 34, 58, 40, 71, 66, 90, 82, 60, 45, 30, 20];
const BAD_ACTORS = [
  { asset: "E-6001", desc: "Deethanizer", cost: "$40,600", freq: 246 },
  { asset: "F-6001", desc: "Deethanizer Drum", cost: "$21,900", freq: 246 },
  { asset: "PT-301", desc: "Pressure Transmitter", cost: "$18,600", freq: 240 },
  { asset: "PT-301", desc: "Pressure Transmitter", cost: "$11,200", freq: 239 },
  { asset: "J-3002A", desc: "Pump", cost: "$16,300", freq: 239 },
];

export default function ValueChainPage() {
  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.35fr_1fr]">
        {/* Left: process view */}
        <Panel eyebrow="SITE VALUE CHAIN · DETAIL" title="All Plants in Digital Quotient Gas Plant" action={<Pill tone="good">Overall Utilization 95.9%</Pill>}>
          <div className="mb-4 grid grid-cols-3 gap-3">
            <Panel className="!py-3"><StatTile label="Oil Production vs. Quota" value="3" unit="/3 MMBOPD" trend={1.1} /></Panel>
            <Panel className="!py-3"><StatTile label="Volume Exported to ADNOC" value="4,279" unit="MBSCFD" trend={0.6} /></Panel>
            <Panel className="!py-3"><Gauge value={96} label="Overall Utilization" size={64} /></Panel>
          </div>
          <div className="overflow-x-auto scrollbar-thin">
            <div className="min-w-[760px] rounded-xl border border-ember-500/10 bg-ink-950/30 p-4 light:bg-mist-50/60">
              <SiteProcessDiagram />
            </div>
          </div>
        </Panel>

        {/* Right: KPIs */}
        <div className="flex flex-col gap-5">
          <Panel eyebrow="RELIABILITY" title="Monthly Work Orders">
            <Sparkline points={WORK_ORDERS} height={70} />
            <div className="mt-2 flex justify-between text-[10px] text-mist-200/40 light:text-ink-500">
              <span>Jan</span><span>Apr</span><span>Jul</span><span>Oct</span><span>Dec</span>
            </div>
          </Panel>

          <div className="grid grid-cols-2 gap-5">
            <Panel eyebrow="PRIORITY MIX" title="Work Orders">
              <Donut
                size={100}
                segments={[
                  { label: "Immediate", value: 6, color: "#F43F5E" },
                  { label: "Urgent", value: 22, color: "#F97316" },
                  { label: "Scheduled", value: 72, color: "#FED7AA" },
                ]}
              />
            </Panel>
            <Panel eyebrow="YTD STATUS" title="Work Order Status">
              <Donut
                size={100}
                segments={[
                  { label: "Closed", value: 68, color: "#34D399" },
                  { label: "In Progress", value: 20, color: "#F97316" },
                  { label: "Open", value: 12, color: "#64748B" },
                ]}
              />
            </Panel>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        <Panel eyebrow="COST" title="RM vs PM Cost">
          <div className="flex items-center justify-around py-2">
            <StatTile label="RM Cost" value="$300" trend={12} positive={false} />
            <StatTile label="PM Cost" value="$150" trend={-8} positive />
          </div>
        </Panel>
        <Panel eyebrow="BUDGET" title="Actual vs Planned Cost">
          <div className="flex items-center justify-around py-2">
            <StatTile label="Actual" value="$21,788" trend={-33.4} positive />
            <StatTile label="Planned" value="$328,707" />
          </div>
        </Panel>
        <Panel eyebrow="MAINTENANCE" title="Mean Time (hrs.)">
          <div className="flex items-center justify-around py-2">
            <StatTile label="Between Failures" value="600" unit="hrs" />
            <StatTile label="To Repair" value="20" unit="min" />
          </div>
        </Panel>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.2fr_1fr]">
        <Panel eyebrow="RELIABILITY" title="Top 5 Assets with Highest Failure Cost">
          <table className="w-full text-[12px]">
            <thead>
              <tr className="text-left text-[10.5px] uppercase tracking-wide text-mist-200/40 light:text-ink-500">
                <th className="pb-2 font-medium">Asset</th>
                <th className="pb-2 font-medium">Description</th>
                <th className="pb-2 font-medium text-right">Cost</th>
                <th className="pb-2 font-medium text-right">Frequency</th>
              </tr>
            </thead>
            <tbody>
              {BAD_ACTORS.map((r) => (
                <tr key={r.asset + r.desc} className="border-t border-ember-500/8">
                  <td className="py-2 font-mono text-ember-400">{r.asset}</td>
                  <td className="py-2 text-mist-200/75 light:text-ink-700">{r.desc}</td>
                  <td className="py-2 text-right font-mono text-white light:text-ink-900">{r.cost}</td>
                  <td className="py-2 text-right font-mono text-white light:text-ink-900">{r.freq}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Panel>

        <Panel eyebrow="SCHEDULE" title="Delayed Work Orders">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col items-center gap-2 rounded-xl bg-ember-500/8 py-4">
              <p className="text-[10.5px] text-mist-200/60 light:text-ink-600">Delayed Start</p>
              <p className="font-display text-[26px] font-semibold text-ember-400">97.4%</p>
            </div>
            <div className="flex flex-col items-center gap-2 rounded-xl bg-emerald-500/8 py-4">
              <p className="text-[10.5px] text-mist-200/60 light:text-ink-600">Delayed Completion</p>
              <p className="font-display text-[26px] font-semibold text-emerald-400">2.26%</p>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between rounded-xl bg-white/5 px-4 py-3 light:bg-ink-900/5">
            <span className="text-[11px] text-mist-200/60 light:text-ink-600">Max Hours · Actual / Planned</span>
            <span className="font-mono text-[12px] text-white light:text-ink-900">392.3 / 6,347.5</span>
            <Pill tone="good">-93.8% deviation</Pill>
          </div>
        </Panel>
      </div>
    </div>
  );
}
