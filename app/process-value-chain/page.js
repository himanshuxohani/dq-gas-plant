import { Panel, Gauge, ProgressRow, StatTile, Bars, Pill } from "@/components/ui";

const EMISSIONS = [
  { label: "Combustion", value: 58 },
  { label: "Flaring", value: 24 },
  { label: "Fugitive", value: 12 },
];

const EXPORT_MIX = [
  { label: "Crude", value: 62, color: "#F97316" },
  { label: "Gas", value: 48, color: "#FDBA74" },
  { label: "NGLs", value: 33, color: "#FB923C" },
  { label: "Sulphur", value: 14, color: "#EA580C" },
];

export default function ProcessValueChainPage() {
  return (
    <div className="flex flex-col gap-5">
      {/* Corporate snapshot strip */}
      <Panel eyebrow="DIGITAL QUOTIENT GAS PLANT" title="Corporate Snapshot" action={<Pill tone="good">On plan</Pill>}>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatTile label="OPEX Variance" value="160" unit="$MM" trend={-45} positive />
          <StatTile label="CAPEX Variance" value="240" unit="$MM" trend={78} positive={false} />
          <StatTile label="Asset Availability" value="75" unit="%" trend={1.2} />
          <StatTile label="Emiratization" value="45" unit="%" trend={0.4} />
        </div>
      </Panel>

      {/* Performance — the richest section, given full width so nothing sits half-empty */}
      <Panel eyebrow="PERFORMANCE" title="Line Inventory, Pipeline Availability & Emissions">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[auto_1fr_1fr]">
          <div className="flex items-center justify-center gap-6 lg:justify-start">
            <Gauge value={85} size={92} label="Line Inventory" />
            <Gauge value={99} size={92} label="Pipeline Availability" />
          </div>
          <div>
            <p className="mb-2 text-[10.5px] text-mist-200/50 light:text-ink-500">Export mix · Crude · Sales Gas · NGLs · Liq. Sulphur</p>
            <Bars height={110} data={EXPORT_MIX} />
          </div>
          <div>
            <p className="mb-2 text-[10.5px] text-mist-200/50 light:text-ink-500">Emissions by source</p>
            <Bars height={110} data={EMISSIONS.map((e) => ({ ...e, color: "#F97316" }))} />
          </div>
        </div>
        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-white/5 px-4 py-3 light:bg-ink-900/5">
          <span className="text-[11px] text-mist-200/60 light:text-ink-600">Asset Availability (all facilities)</span>
          <div className="flex items-center gap-3">
            <span className="font-mono text-[15px] font-semibold text-ember-400">32.5%</span>
            <Pill tone="bad">-4.61 pts · -7% vs. plan</Pill>
          </div>
        </div>
      </Panel>

      {/* Profitability / Efficiency / HSE / HR — equal-height row, four across */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <Panel eyebrow="PROFITABILITY" title="Budget Variance">
          <div className="space-y-4">
            <ProgressRow label="OPEX Actual vs Budget Variance" value={45} />
            <ProgressRow label="CAPEX Actual vs Budget Variance" value={78} />
            <StatTile label="Net Operating Profit after Tax" value="—" unit="$MM" />
            <div className="grid grid-cols-2 gap-3">
              <StatTile label="Free Cash Flow" value="—" unit="$MM" />
              <StatTile label="EBITDA" value="—" unit="$MM" />
            </div>
          </div>
        </Panel>

        <Panel eyebrow="EFFICIENCY" title="Cycle & Audit Index">
          <div className="space-y-4">
            <ProgressRow label="Timely Action on Internal Audits" value={90} />
            <ProgressRow label="Procurement Time Cycle Index" value={72} />
            <ProgressRow label="Free Cash Flow Index" value={64} />
            <div className="flex items-center justify-between text-[11px] pt-1">
              <span className="text-mist-200/60 light:text-ink-600">Overall efficiency trend</span>
              <Pill tone="ember">On track</Pill>
            </div>
          </div>
        </Panel>

        <Panel eyebrow="HSE" title="Safety Record">
          <div className="grid grid-cols-2 gap-3">
            <StatTile label="Fatality Cases" value="0" trend={0} />
            <StatTile label="Catastrophic Events" value="0" trend={0} />
            <StatTile label="Recordable Incident Rate" value="0.42" />
            <StatTile label="Leadership Site Visits" value="18" trend={9} />
          </div>
          <div className="mt-4">
            <ProgressRow label="HSE & PS Culture Transformation" value={30} />
          </div>
        </Panel>

        <Panel eyebrow="HR" title="Talent & Positions">
          <div className="space-y-4">
            <ProgressRow label="Filled on Prioritized Positions" value={68} />
            <ProgressRow label="Emirati Leadership Attraction Pledge" value={45} />
            <div className="grid grid-cols-2 gap-3">
              <StatTile label="Colleague Performance Agreement" value="96" unit="%" />
              <StatTile label="Open Requisitions" value="34" trend={-6} positive />
            </div>
          </div>
        </Panel>
      </div>
    </div>
  );
}
