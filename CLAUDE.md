# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

> ⚠️ **Next.js 16.** APIs, conventions, and file structure may differ from training data.
> Read the relevant guide in `node_modules/next/dist/docs/` before writing framework code
> (async `params`/`searchParams`, route handlers, `next/font`, etc.). See `AGENTS.md`.

## What this is

**Popfolio** — a web service that takes a person's works (images) + a few words about
themselves and automatically stands it up as a trendy "pop-up brand" page (not a quiet
museum, not a résumé), shareable by URL. The product is Korean-first; UI copy and content
are in Korean.

**Read `Plan.md` first** — it is the living design doc that defines the decided direction,
data model, milestones (M0–M6), and what is intentionally out of scope. Key decisions:
pretty templates + auto-fill (no AI generation), no login, server file storage,
Next.js + Vercel, current goal is a local demo.

The **result page is the heart** of the product — build/verify how a portfolio *looks*
before wiring up input and storage.

## Commands

```bash
npm run dev      # dev server at http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
```

There is **no linter or test runner** configured (scaffolded with `--no-eslint`).
Verify changes by running the dev server and looking at the pages, not via tests.

## Architecture

The "auto-fill" magic is a **mood system**, not AI:

- `lib/moods.ts` — the core. Each `MoodId` (`modern` | `warm` | `minimal` | `vivid`)
  bundles a palette + font pairing + accent style as `MoodTokens`. `moodToCssVars(id)`
  converts a mood into `--pf-*` CSS custom properties.
- Those vars are injected onto a `.pf-root` wrapper (see `app/globals.css`), and brand
  components read them via `var(--pf-*)` and the `.pf-*` utility classes. This is how one
  layout re-skins into four distinct looks — and how "picking a mood" re-renders the page.
- `lib/types.ts` — `Portfolio` / `WorkItem`: the shape of one saved portfolio (Plan.md §3).
- Fonts are declared in `app/layout.tsx` via `next/font/google` (Noto Sans KR body, plus
  per-mood display faces) and exposed as `--font-*` vars that `lib/moods.ts` references.
  Adding a font means wiring it in both places.

Planned (per Plan.md, not all built yet): routes `/` (landing), `/create` (form),
`/p/[id]` (result), API `POST /api/portfolios` + `POST /api/upload`; storage as files
under `data/` keyed by a short id, isolated behind a `lib/storage.ts` swap point so it can
later move to a DB.

Sample abstract SVG "works" live in `public/sample/` for building the result page before
real uploads exist.
