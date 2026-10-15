# Atlas Trips

> Slow, privately guided journeys through Morocco, from the blue lanes of Chefchaouen to the dunes of Erg Chebbi. A travel landing page and destination explorer, designed like a magazine rather than a booking portal.

![Atlas Trips desktop screenshot](docs/screenshot.png)

<p align="center"><img src="docs/mobile.png" alt="Atlas Trips on mobile" width="300" /></p>

## The redesign

The first version used illustrated SVG scenes and a procedural 3D globe. This version is art-directed around **real photography of Morocco** (Creative Commons, from Wikimedia Commons) and an editorial, travel-magazine layout.

- **Layered photographic hero**: a full-bleed Erg Chebbi sunset with scroll-linked parallax. Three planes move at three rates: the dunes drift down and push in, the serif headline lifts away faster, and an inset print of camel shadows rises fastest. A band scrim sits under the copy only, so the sky and sun stay untouched.
- **Editorial intro**: a long serif statement, then a portrait-cropped Chefchaouen photo with gentle parallax beside a hairline definition list ("How we travel").
- **Destination explorer**: 9 destinations filterable by region and landscape. The grid follows a magazine rhythm (a pair of wide frames, then a trio of tall ones, closing on a full-width panorama) and re-balances itself after every filter so no row is left with an empty cell. Cards re-flow with layout animations; the active filter is a sliding cobalt underline.
- **Shared-element detail view**: the card photo morphs into the detail dialog with `layoutId`. The dialog traps focus, closes with Esc or the backdrop, and returns focus to the card.
- **Full-bleed image band**: Aït Benhaddou from above, revealed with a scroll-linked clip-path and parallax, carrying a pull quote over a column scrim.
- **Sticky split itinerary**: the 8-day Marrakech to Fès route on a dark ground. The photo on the left is sticky and cross-fades to the place of the day in view, while a progress line draws down the list. On mobile each change of place shows its photo inline.
- **Booking**: the same validated form (Moroccan phone format, no past dates, shake on invalid submit with focus moved to the first error), restyled as underlined editorial fields, with a live estimate laid out like a receipt.
- **Photo credits** in the footer, generated from `public/photos/credits.json`.

## Design system

| Token | Value | Use |
| --- | --- | --- |
| Paper | `#F3F1EC` | Canvas |
| Ink | `#17191E` / `#4A4E57` | Text, secondary text |
| Night | `#121419` | Itinerary and footer ground |
| Cobalt | `#2140A6` (light ground) / `#A9B8FF` (dark ground) | The one accent: Majorelle blue, one hue in two lightnesses |

**Typography**: [Playfair Display](https://fonts.google.com/specimen/Playfair+Display) for display (big type-scale contrast, italics for emphasis inside headlines) paired with [Source Serif 4](https://fonts.google.com/specimen/Source+Serif+4) for text and UI. Tracking tightens as size grows, headings use `text-wrap: balance`, prices use tabular numerals.

**Motion**: scroll-linked parallax with `useScroll` / `useTransform`, staggered reveals on a single ease-out curve (`cubic-bezier(0.23, 1, 0.32, 1)`), layout animations for the filtered grid and `layoutId` shared elements. Only `transform`, `opacity` and `clip-path` animate. With `prefers-reduced-motion`, parallax and reveal offsets are removed (opacity fades remain) through `useReducedMotion` and `<MotionConfig reducedMotion="user">`.

**Accessibility**: contrast at or above 4.5:1 for text, visible cobalt focus rings (lighter on dark grounds), 44px minimum touch targets, radio-group semantics for filters and stay types, `aria-live` counts and estimate, descriptive alt text on every photograph, and a skip link.

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
public/photos/              # photography + credits.json
src/
├── components/
│   ├── Navbar.jsx            # transparent over the hero, solid after it
│   ├── Hero.jsx              # layered photographic hero with parallax
│   ├── Intro.jsx             # editorial statement + "How we travel"
│   ├── Explorer.jsx          # filters, balanced magazine grid, dialog orchestration
│   ├── DestinationCard.jsx   # photo card with layoutId
│   ├── DestinationModal.jsx  # shared-element detail dialog
│   ├── Band.jsx              # full-bleed Aït Benhaddou band
│   ├── Itinerary.jsx         # sticky split 8-day route
│   ├── Booking.jsx           # validated form + live estimate + success state
│   ├── Reveal.jsx            # whileInView helper, shared ease
│   └── Footer.jsx            # links + photo credits
├── data/
│   ├── destinations.js       # destinations, photos, prices in MAD
│   └── itinerary.js
├── App.jsx
├── main.jsx                  # MotionConfig reducedMotion="user"
└── index.css                 # Tailwind layers + tokens in use
```

## Photo credits

All photographs come from Wikimedia Commons and are used under their Creative Commons licences (full data in [`public/photos/credits.json`](public/photos/credits.json)).

| File | Original | Author | Licence |
| --- | --- | --- | --- |
| `photos/marrakech.jpg` | [Jamaa El Fna, Marrakesh, Morocco, 20250124 1804 7017.jpg](https://commons.wikimedia.org/wiki/File:Jamaa_El_Fna,_Marrakesh,_Morocco,_20250124_1804_7017.jpg) | Jakub Hałun | CC BY 4.0 |
| `photos/chefchaouen.jpg` | [2018 01 (Blue) - Chaouen.jpg](https://commons.wikimedia.org/wiki/File:2018_01_(Blue)_-_Chaouen.jpg) | Fbrandao.1963 | CC BY-SA 4.0 |
| `photos/merzouga.jpg` | [Camel Tour on Erg Chebbi riding across the dunes.jpg](https://commons.wikimedia.org/wiki/File:Camel_Tour_on_Erg_Chebbi_riding_across_the_dunes.jpg) | Johannes K Becker | CC BY-SA 3.0 |
| `photos/essaouira.jpg` | [Port of Essaouira 01.jpg](https://commons.wikimedia.org/wiki/File:Port_of_Essaouira_01.jpg) | Adam Harangozó | CC BY-SA 4.0 |
| `photos/fes.jpg` | [Fez Chouara Tannery (54239949701).jpg](https://commons.wikimedia.org/wiki/File:Fez_Chouara_Tannery_(54239949701).jpg) | Jorge Franganillo | CC BY 2.0 |
| `photos/aitbenhaddou.jpg` | [Ksar Aït Benhaddou, Marocco (أيت بن حدو، المغرب, ⴰⵢⵜ ⵃⴰⴷⴷⵓ).jpg](https://commons.wikimedia.org/wiki/File:Ksar_Aït_Benhaddou,_Marocco_(أيت_بن_حدو،_المغرب,_ⴰⵢⵜ_ⵃⴰⴷⴷⵓ).jpg) | Petar Milošević | CC BY-SA 4.0 |
| `photos/imlil.jpg` | [Morocco Toubkal National Park Imlil Valley.jpg](https://commons.wikimedia.org/wiki/File:Morocco_Toubkal_National_Park_Imlil_Valley.jpg) | Alexander Klink | CC BY 4.0 |
| `photos/dakhla.jpg` | [FortecolorWestsaharaIII-30.jpg](https://commons.wikimedia.org/wiki/File:FortecolorWestsaharaIII-30.jpg) | Trincerone | CC BY-SA 4.0 |
| `photos/tangier.jpg` | [Tangier - 44699733295.jpg](https://commons.wikimedia.org/wiki/File:Tangier_-_44699733295.jpg) | Mike McBey | CC BY 2.0 |
| `photos/hero-dunes.jpg` | [Erg Chebbi sunset.jpg](https://commons.wikimedia.org/wiki/File:Erg_Chebbi_sunset.jpg) | Thomas Fuhrmann | CC BY-SA 4.0 |
| `photos/chefchaouen-alley.jpg` | [Inhabitants of the blue city 3.jpg](https://commons.wikimedia.org/wiki/File:Inhabitants_of_the_blue_city_3.jpg) | Sergey Pesterev | CC BY-SA 4.0 |
| `photos/ksar.jpg` | [Ait Zineb - Ksar of Aït Benhaddou - 20190716180605.jpg](https://commons.wikimedia.org/wiki/File:Ait_Zineb_-_Ksar_of_Aït_Benhaddou_-_20190716180605.jpg) | C messier | CC BY-SA 4.0 |

## Author

**Zakaria Dabella**, UI/UX designer & web developer based in Casablanca, Morocco.

- Portfolio: [zakaria-dabella-portfolio.vercel.app](https://zakaria-dabella-portfolio.vercel.app/)
- GitHub: [@zakaria10-dabella](https://github.com/zakaria10-dabella)

## License

Code: [MIT](LICENSE) © 2026 Zakaria Dabella. Photographs remain under their own licences listed above.
