import { Panel, Sparkline, Pill } from "@/components/ui";
import ScorecardRow from "@/components/ScorecardRow";
import NetworkMap from "@/components/NetworkMap";

const PRODUCTION = [88, 90, 87, 93, 95, 91, 97, 96, 99, 94, 98, 100];
const ASSETS = [
  { name: "ADNOC LNG", status: "Online", availability: "98.2%" },
  { name: "ADNOC Onshore", status: "Online", availability: "96.4%" },
  { name: "Borouge", status: "Online", availability: "97.1%" },
  { name: "ADNOC Refining", status: "Alert", availability: "88.6%" },
  { name: "ADNOC Sour Gas", status: "Alert", availability: "84.3%" },
  { name: "Habshan & Bab", status: "Online", availability: "95.0%" },
  { name: "Ruwais", status: "Online", availability: "97.8%" },
  { name: "Shipping", status: "Online", availability: "99.1%" },
];

export default function GroupPerformancePage() {
  return (
    <div className="flex flex-col gap-5">
      <ScorecardRow />

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.5fr_1fr]">
        <Panel
          eyebrow="ASSET NETWORK"
          title="Group Performance — Facility Map"
          action={<Pill tone="good">Network health 94.2%</Pill>}
        >
          <NetworkMap detailed />
        </Panel>

        <div className="flex flex-col gap-5">
          <Panel eyebrow="TREND" title="Production Index · 12 Months">
            <Sparkline points={PRODUCTION} height={90} />
            <div className="mt-2 flex justify-between text-[10px] text-mist-200/40 light:text-ink-500">
              <span>Jan</span><span>Jun</span><span>Dec</span>
            </div>
          </Panel>

          <Panel eyebrow="ASSETS" title="Availability by Facility">
            <ul className="space-y-2.5">
              {ASSETS.map((a) => (
                <li key={a.name} className="flex items-center justify-between text-[12px]">
                  <span className="flex items-center gap-2 text-mist-200/75 light:text-ink-700">
                    <span className={`h-1.5 w-1.5 rounded-full ${a.status === "Alert" ? "bg-rose-500" : "bg-emerald-400"}`} />
                    {a.name}
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="font-mono text-white light:text-ink-900">{a.availability}</span>
                    <Pill tone={a.status === "Alert" ? "bad" : "good"}>{a.status}</Pill>
                  </span>
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </div>
    </div>
  );
}
