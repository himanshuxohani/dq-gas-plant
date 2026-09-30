"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Workflow, GitBranch, Building2, LineChart, Activity, Flame, Bell, Settings,
} from "lucide-react";
import { NAV_ITEMS } from "@/lib/nav";
import ThemeToggle from "@/components/ThemeToggle";

const ICONS = { Workflow, GitBranch, Building2, LineChart, Activity };

export default function AppShell({ children }) {
  const pathname = usePathname();
  const active = NAV_ITEMS.find((n) => n.href === pathname) || NAV_ITEMS[0];

  return (
    <div className="canvas min-h-screen text-mist-100 light:text-ink-900">
      <div className="mx-auto flex min-h-screen max-w-[1600px]">
        {/* Sidebar */}
        <aside className="sticky top-0 hidden h-screen w-[248px] shrink-0 flex-col border-r border-ember-500/15 px-4 py-6 md:flex">
          <div className="mb-8 flex items-center gap-2.5 px-1">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-ember-400 to-ember-600 shadow-glow">
              <Flame size={18} className="text-ink-950" strokeWidth={2.5} />
            </div>
            <div className="leading-tight">
              <p className="font-display text-[15px] font-semibold text-white light:text-ink-900">Digital Quotient</p>
              <p className="text-[11px] tracking-wide text-mist-200/60 light:text-ink-600">Gas Plant Value Chain</p>
            </div>
          </div>

          <nav className="flex flex-1 flex-col gap-1">
            {NAV_ITEMS.map((item) => {
              const Icon = ICONS[item.icon];
              const isActive = item.href === pathname;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group flex items-start gap-3 rounded-xl px-3 py-2.5 transition-colors ${
                    isActive
                      ? "bg-ember-500/12 text-white light:text-ink-900"
                      : "text-mist-200/70 hover:bg-white/5 hover:text-mist-100 light:text-ink-600 light:hover:bg-ember-500/8"
                  }`}
                >
                  <Icon
                    size={17}
                    className={`mt-0.5 shrink-0 ${isActive ? "text-ember-400" : "text-mist-200/40 group-hover:text-ember-400/70 light:text-ink-500"}`}
                  />
                  <span className="flex flex-col">
                    <span className="text-[13px] font-medium leading-tight">{item.label}</span>
                    <span className="mt-0.5 text-[11px] leading-tight text-mist-200/40 light:text-ink-500">
                      {item.description}
                    </span>
                  </span>
                  {isActive && <span className="ml-auto mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-ember-500" />}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto space-y-3 border-t border-ember-500/10 pt-4">
            <div className="flex items-center justify-between px-1">
              <span className="text-[11px] uppercase tracking-wider text-mist-200/40 light:text-ink-500">Appearance</span>
              <ThemeToggle compact />
            </div>
            <div className="rounded-xl bg-ember-500/8 px-3 py-2.5 text-[11px] leading-relaxed text-mist-200/55 light:text-ink-600">
              Live data refresh · <span className="text-ember-400 font-medium">every 5 min</span>
            </div>
          </div>
        </aside>

        {/* Main column */}
        <div className="flex min-h-screen flex-1 flex-col">
          {/* Topbar */}
          <header className="sticky top-0 z-20 flex items-center justify-between border-b border-ember-500/15 bg-ink-950/70 px-5 py-3.5 backdrop-blur light:bg-mist-50/70 md:px-8">
            <div>
              <p className="font-display text-[17px] font-semibold text-white light:text-ink-900">{active.label}</p>
              <p className="text-[12px] text-mist-200/50 light:text-ink-600">{active.description}</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="hidden h-9 w-9 items-center justify-center rounded-full border border-ember-500/20 text-mist-200/70 hover:text-ember-400 sm:flex">
                <Bell size={16} />
              </button>
              <button className="hidden h-9 w-9 items-center justify-center rounded-full border border-ember-500/20 text-mist-200/70 hover:text-ember-400 sm:flex">
                <Settings size={16} />
              </button>
              <div className="hidden md:block">
                <ThemeToggle />
              </div>
              <div className="flex items-center gap-2 rounded-full border border-ember-500/20 py-1 pl-1 pr-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-ember-500 text-[10px] font-semibold text-ink-950">
                  OP
                </div>
                <span className="text-[12px] text-mist-200/80 light:text-ink-700">Ops Analyst</span>
              </div>
            </div>
          </header>

          {/* Mobile nav */}
          <nav className="flex gap-1 overflow-x-auto border-b border-ember-500/15 px-4 py-2 scrollbar-thin md:hidden">
            {NAV_ITEMS.map((item) => {
              const isActive = item.href === pathname;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`shrink-0 rounded-full px-3 py-1.5 text-[12px] font-medium ${
                    isActive ? "bg-ember-500 text-ink-950" : "bg-white/5 text-mist-200/70"
                  }`}
                >
                  {item.short}
                </Link>
              );
            })}
          </nav>

          <main className="flex-1 px-4 py-5 md:px-8 md:py-7">{children}</main>
        </div>
      </div>
    </div>
  );
}
