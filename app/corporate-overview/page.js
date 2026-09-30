"use client";

import { Sun, Moon, Settings } from "lucide-react";
import { Panel, Pill } from "@/components/ui";
import ScorecardRow from "@/components/ScorecardRow";
import NetworkMap from "@/components/NetworkMap";
import ThemeToggle from "@/components/ThemeToggle";
import { useTheme } from "@/lib/theme-context";

export default function CorporateOverviewPage() {
  const { theme } = useTheme();

  return (
    <div className="flex flex-col gap-5">
      <Panel className="!py-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Settings size={15} className="text-mist-200/40 light:text-ink-500" />
            <p className="text-[11.5px] text-mist-200/60 light:text-ink-600">
              Display mode · this screen supports both <span className="text-ember-400 font-medium">light</span> and{" "}
              <span className="text-ember-400 font-medium">dark</span> viewing for the control room and daylight offices.
            </p>
          </div>
          <ThemeToggle />
        </div>
      </Panel>

      <ScorecardRow />

      <Panel
        eyebrow="ASSET NETWORK"
        title="Group Facilities — Live Status"
        action={
          <div className="flex items-center gap-2">
            <Pill tone="good">13 Online</Pill>
            <Pill tone="bad">1 Alert</Pill>
          </div>
        }
      >
        <NetworkMap />
        <div className="mt-3 flex items-center gap-4 border-t border-ember-500/10 pt-3 text-[11px] text-mist-200/50 light:text-ink-500">
          <span className="flex items-center gap-1.5"><i className="h-2 w-2 rounded-full bg-emerald-400" /> Online</span>
          <span className="flex items-center gap-1.5"><i className="h-2 w-2 rounded-full bg-rose-500" /> Alert / attention needed</span>
          <span className="ml-auto">Currently viewing in <b className="text-ember-400">{theme === "dark" ? "dark" : "light"} mode</b></span>
        </div>
      </Panel>
    </div>
  );
}
