# Digital Quotient Gas Plant — Value Chain Dashboard

A 5-screen Next.js dashboard rebuilt from scratch in an orange ("ember") theme, recreating:

1. **Gas Process Flow** (`/`) — LP/IP/HP compression trains, dehydration & NGL recovery, lean gas distribution, live mass-balance diagram.
2. **Site Value Chain** (`/value-chain`) — plant-level process block diagram + reliability KPIs (work orders, bad actors, MTBF/MTTR, cost).
3. **Corporate Overview** (`/corporate-overview`) — People / Profitability / Performance / Efficiency / HSE scorecard + live asset network map. **This screen has an explicit light/dark toggle** at the top, in addition to the global one in the sidebar/topbar.
4. **Process Value Chain** (`/process-value-chain`) — expanded financial, efficiency, performance, HSE and HR scorecard.
5. **Group Performance** (`/group-performance`) — full asset network with status badges, production trend, and per-facility availability table.

All 5 screens live in one app, reachable from the left sidebar (desktop) or the horizontal tab bar (mobile).

## Theme

- Built entirely with Tailwind CSS using a custom **ember/orange** palette (`ember-*`) on a deep navy canvas (`ink-*`), replacing the original blue/cyan accents.
- Light/dark mode is a real toggle (not just prefers-color-scheme): it flips a `.light` / `.dark` class on `<html>`, persisted to `localStorage`. Every screen respects it; screen 3 additionally calls it out explicitly, matching the source mock that showed a sun/moon control.

## Getting started

```bash
npm install
npm run dev       # http://localhost:3000
```

Production build:

```bash
npm run build
npm run start
```

## Notes

- All figures (MMSCFD values, KPI percentages, asset names) are illustrative placeholders wired up in each `app/*/page.js` file — swap them for a live data source (API route, database, or BI feed) whenever you're ready; the layout and components don't need to change.
- Fonts use the system UI stack (no external font fetch), so the app builds in network-restricted environments. To use custom fonts, drop `.woff2` files in `/public/fonts`, add `@font-face` rules in `app/globals.css`, and point the `--font-display` / `--font-body` / `--font-mono` variables at them.
- Icons: [lucide-react](https://lucide.dev/).
- Charts (gauges, sparklines, donuts, bar groups) are hand-rolled SVG/CSS in `components/ui.js` — no charting library dependency.

## Project structure

```
app/
  layout.js                 root layout (theme provider + app shell)
  globals.css                theme tokens, canvas background
  page.js                    Screen 1: Gas Process Flow
  value-chain/page.js        Screen 2: Site Value Chain
  corporate-overview/page.js Screen 3: Corporate Overview (light/dark toggle)
  process-value-chain/page.js Screen 4: Process Value Chain
  group-performance/page.js  Screen 5: Group Performance
components/
  AppShell.js       sidebar + topbar + mobile nav
  ThemeToggle.js     sun/moon switch
  ui.js              Panel, Gauge, Donut, Sparkline, Bars, ProgressRow, StatTile, Pill, Trend
  ProcessFlowDiagram.js   Screen 1 SVG diagram
  SiteProcessDiagram.js   Screen 2 block diagram
  NetworkMap.js           Screens 3–5 asset network map
  ScorecardRow.js         People/Profitability/Performance/Efficiency/HSE cards
lib/
  theme-context.js   light/dark state + localStorage persistence
  nav.js             sidebar navigation model
```
