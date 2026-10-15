# Atlas Trips

> A Morocco travel landing page and destination explorer, from the blue lanes of Chefchaouen to the dunes of Merzouga.

![Atlas Trips desktop screenshot](docs/screenshot.png)

<p align="center"><img src="docs/mobile.png" alt="Atlas Trips on mobile" width="300" /></p>

## Features

- **Animated hero** with a staggered word reveal, a rotating headline ("red city", "blue pearl", "golden dunes"...) and a cross-fading illustrated arch that follows the headline.
- **Destination explorer**: 9 Moroccan destinations filterable by region and landscape type. Cards re-flow with layout animations and a sliding active-chip indicator.
- **Shared-layout detail modal**: the card expands into a full detail view using `layoutId` (image, title and card surface all morph), closes with Esc or backdrop click.
- **Scroll-driven itinerary**: an 8-day Marrakech to Fès timeline whose progress line is drawn with `useScroll` while each day slides in on view.
- **Booking form** with live validation (Moroccan phone format, no past dates), animated error messages, a shake on invalid submit, a live price estimate and an animated success checkmark.
- **Zero external images**: every destination is a hand-built SVG scene (dunes, medina, kasbah, Atlas peaks, Atlantic ramparts) with a zellige pattern overlay.
- Responsive from 375px, keyboard accessible, and honours `prefers-reduced-motion`.

## Tech stack

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-0055FF?logo=framer&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

## Getting started

```bash
npm install
npm run dev      # start the dev server on http://localhost:5173
npm run build    # production build in dist/
npm run preview  # serve the production build
```

## Project structure

```
src/
├── components/
│   ├── Navbar.jsx            # glass-on-scroll header + animated mobile menu
│   ├── Hero.jsx              # staggered + rotating headline, parallax art
│   ├── Explorer.jsx          # filters, layout-animated grid, modal orchestration
│   ├── FilterChips.jsx       # chip group with shared layoutId indicator
│   ├── DestinationCard.jsx   # card with layoutId hooks
│   ├── DestinationModal.jsx  # shared-layout detail view
│   ├── DestinationArt.jsx    # parametric SVG landscapes
│   ├── Itinerary.jsx         # scroll-linked timeline
│   ├── Booking.jsx           # validated form + estimate + success state
│   ├── Reveal.jsx            # whileInView helper
│   └── Footer.jsx
├── data/
│   ├── destinations.js       # mock destinations, prices in MAD
│   └── itinerary.js
├── App.jsx
├── main.jsx                  # MotionConfig reducedMotion="user"
└── index.css                 # Tailwind layers + component classes
```

## Design notes

**Palette** — drawn from Moroccan materials: sand `#F4EBDD` for the canvas, terracotta clay `#C65D3B` (the walls of Marrakech) as the primary action colour, deep ink `#1E2A3A` for text and the itinerary section, saffron `#E3A33B` for highlights and Majorelle blue `#2F4BA8` inside the illustrations.

**Typography** — [Fraunces](https://fonts.google.com/specimen/Fraunces) for display headings, with its soft italic used for the rotating word, paired with [Manrope](https://fonts.google.com/specimen/Manrope) for UI and body text. The serif brings an editorial, travel-magazine feel; Manrope keeps forms and data crisp.

**Motion** — motion is used to explain, not decorate:
- Spring physics (`stiffness 300–400`) for UI feedback (chips, toggles, steppers) so they feel tactile.
- A custom ease `[0.22, 1, 0.36, 1]` for content reveals, so sections settle gently.
- `layoutId` keeps context when opening a destination: the card *becomes* the modal.
- `useScroll` + `useSpring` tie the itinerary line and the top progress bar to reading position.
- Everything respects the OS reduced-motion setting through `<MotionConfig reducedMotion="user">`.

## Author

**Zakaria Dabella** — UI/UX designer & web developer based in Casablanca, Morocco.

- Portfolio: [zakaria-dabella-portfolio.vercel.app](https://zakaria-dabella-portfolio.vercel.app/)
- GitHub: [@zakaria10-dabella](https://github.com/zakaria10-dabella)

## License

[MIT](LICENSE) © 2026 Zakaria Dabella
