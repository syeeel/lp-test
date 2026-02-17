# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static landing page for **ブレイブ保育士** (BRAVE Nursery Teacher Staffing), a staffing agency for nursery teachers under the Mynavi Group. The site is entirely in Japanese.

## Architecture

This is a no-build-tool static site with three files:

- **index.html** — Single-page landing with sections: header, first view (hero), about/merits, work styles, daily schedule timeline, CTA, and footer. All icons are inline SVGs (no image assets currently used).
- **style.css** — All styling including CSS custom properties (design tokens), animations, and responsive breakpoints (1024px tablet, 768px mobile, 480px small mobile).
- **script.js** — Vanilla JS for: hamburger menu toggle, IntersectionObserver scroll animations (`.anim-item` → `.visible`), sticky header scroll state, and smooth scroll with header offset.

## Development

Open `index.html` directly in a browser or use any local server (e.g., `python3 -m http.server`). No build step, no dependencies, no package manager.

## Design System

CSS custom properties are defined in `:root` in `style.css`:
- **Palette**: coral (primary/CTA), sage (green accent), amber (warm accent), lavender (cool accent), cream/silk/white (backgrounds), ink (text)
- **Fonts**: `--font-display` (Zen Maru Gothic) for body text, `--font-accent` (Outfit) for English/numbers — loaded via Google Fonts
- **Easing**: `--ease-out-expo` and `--ease-spring` custom cubic-beziers used throughout transitions

## Animation Pattern

Scroll-triggered animations use a consistent pattern: add class `anim-item` to an element (starts hidden/translated), and `script.js` IntersectionObserver adds class `visible` to trigger the CSS transition. Staggered delays are defined per-section in CSS (merit-grid, persona-grid, type-grid, timeline, fv).

## Key Conventions

- The page language is Japanese (`lang="ja"`). All user-facing text must be in Japanese.
- All icons are inline SVGs using CSS custom property colors — no icon library or external image files.
- Buttons use `border-radius: 100px` (pill shape) consistently.
- The `images/` and `logo/` directories exist but are currently empty.
