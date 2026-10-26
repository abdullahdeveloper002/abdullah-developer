# Abu: Developer Portfolio

A minimalist, flat, code-flavoured portfolio built with **Next.js (App Router, JavaScript)**, **Tailwind CSS v4**, **Framer Motion** and **Lucide React**.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (the page is fully static)
npm run lint
```

## Make it yours

Every piece of content lives in `src/data/`. The projects, experience, education and achievements entries are **sample content** (the three projects and their screenshots are invented examples, and the experience entries are generic wording): replace them with Abu's real details or delete them. Nothing here claims real employment, credentials or results.

| File | What to change |
| --- | --- |
| `src/data/site.js` | Name, description, **email**, **GitHub / LinkedIn URLs**, availability line |
| `src/data/skills.js` | Skills per category. Items with `placeholder: true` are hidden (and so is a category with only placeholders) until you fill them in |
| `src/data/projects.js` | Projects: copy, stack, `liveUrl`, `repoUrl`, screenshot (`image`) |
| `src/data/experience.js` | Roles, education, certifications, achievements |
| `src/data/about.js` | About copy and principles |

**Project screenshots:** the images in `public/projects/` are designed mock-ups. Replace each with a real screenshot (about 1400 x 1080, important content near the top) and update `image.alt` in `src/data/projects.js`. A project with no `image` renders as a text-only card.

### Contact form

The form validates in the browser and again on the server (`src/app/actions.js`). To deliver messages, set `CONTACT_FORM_ENDPOINT` to any service that accepts a JSON POST (e.g. a Formspree endpoint), see `.env.example`. Until it is set, the form tells the visitor it isn't connected and offers a prefilled `mailto:` link instead of pretending to send.

Also set `NEXT_PUBLIC_SITE_URL` to your real domain for correct Open Graph, sitemap and robots output.

## Design system

Colours are inspired by InvoZone's lime-on-forest identity but form their own system. Tokens live in `src/app/globals.css` (`@theme`).

| Role | Token | Value |
| --- | --- | --- |
| Page / alternate band | `paper` / `mist` | `#F4F6F1` / `#E9EDE3` |
| Text / muted text | `ink` / `ink-soft` | `#0E1A12` / `#4A5A4E` |
| Dark surfaces | `night` / `forest` | `#0C1510` / `#273F2B` |
| Primary accent | `lime` (`lime-deep` for text on light) | `#87E64B` (`#2F6D0E`) |
| Secondary accent | `azure` (`azure-deep` for text on light) | `#2176FF` (`#1B5FD1`) |

Surfaces are flat. There are no gradients, only a faint dot grid in the hero. Type: Bricolage Grotesque (headings), Geist (body), Geist Mono (code), all via `next/font`. Spacing: `container-page` (max 72rem), `py-20 / md:py-28` sections, `rounded-card` (1.25rem) and `rounded-control` (0.75rem).

## Architecture

```text
src/
├── app/                 layout, page, actions (contact), OG image, sitemap, robots, 404
├── components/
│   ├── layout/          Navbar (scroll-spy), Footer
│   ├── providers/       MotionProvider (reduced-motion + lazy animation features)
│   ├── sections/        Hero, About, Skills, Projects, Experience, Contact (+ ContactForm)
│   └── ui/              Button, Section, SectionHeading, Reveal, Tag, CodeWindow, ProjectCard, …
├── data/                all site content
├── hooks/               useActiveSection
└── lib/                 utils, validation (shared by form + server action)
```

- **Server Components by default.** Client Components are limited to the navbar, `Reveal`, the contact form and the footer year.
- **Motion** is loaded lazily through `LazyMotion`, and `MotionConfig reducedMotion="user"` plus a CSS fallback respect the OS "reduce motion" setting. Animations use only opacity and transforms to avoid layout shift.
- This project runs on a Next.js version with **Cache Components** enabled (see `next.config.mjs`). Anything that reads the clock or request data during render must be deferred (see `CurrentYear.jsx`).
