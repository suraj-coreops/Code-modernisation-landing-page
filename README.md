# Code Intelligence — Landing Page

A standalone marketing page for Code Intelligence. Every button on it points at
the console, which is deployed separately.

This repository has **no backend and no dependency on the console's codebase**.
It builds to plain HTML, CSS and JavaScript, and can be deployed anywhere that
serves static files.

```
   ┌───────────────────────┐        ┌──────────────────────────┐
   │   THIS repo           │        │  code_console (separate) │
   │   landing page        │  ───►  │  the actual console      │
   │   static files only   │  link  │  Django + its own UI     │
   └───────────────────────┘        └──────────────────────────┘
```

---

## Point it at your console

One setting decides where every link goes.

```bash
cp .env.example .env
```

Then edit `.env`:

```ini
VITE_CONSOLE_URL=https://code-console.your-domain.com
```

**This is read when the site is built, not when it runs.** Vite writes the value
directly into the JavaScript, so changing it means building again. Every deploy
recipe below sets it before `npm run build` for that reason.

---

## Run it

```bash
npm install
npm run dev        # http://localhost:5174
```

```bash
npm run build      # writes dist/
npm run preview    # serves dist/ locally, to check before deploying
```

`dist/` is the whole site — three files and an index. Nothing else is needed at
runtime.

---

## Deploy it

### Any static host (Netlify, Vercel, S3, GitHub Pages, Cloudflare Pages)

| Setting | Value |
| --- | --- |
| Build command | `npm run build` |
| Publish directory | `dist` |
| Environment variable | `VITE_CONSOLE_URL` = your console's URL |

### Docker

```bash
docker build --build-arg VITE_CONSOLE_URL=https://code-console.your-domain.com -t ci-landing .
docker run -p 8080:80 ci-landing
```

The image is nginx serving the built files. No Node, no source, ~50 MB.

### A plain web server

Run `npm run build` and copy `dist/` to whatever serves your static files. Point
the document root at it. `nginx.conf` in this repo is a working example.

---

## What's in here

```
index.html              page shell, title, social preview tags
src/
  main.jsx              entry point — mounts the page, loads the stylesheets
  LandingPage.jsx       the entire page, top to bottom
  data/landing.jsx      the words — pillars, steps, problems, FAQ
  components/
    ScrollFx.jsx        fade-in-on-scroll and the tilting hero
    LaptopFrame.jsx     the laptop mockup shell
    ConsoleScreens.jsx  the four fake console screens shown inside it
    DiffVisuals.jsx     the six diagrams in the "Why this" section
  context/
    ThemeContext.jsx    light / dark toggle, remembered per visitor
  styles/
    tokens.css          every colour, size and spacing value
    landing.css         the page's layout and components
Dockerfile              build + nginx, for container deploys
nginx.conf              caching and single-page fallback rules
```

---

## Making changes

**Change the wording.** Pillars, how-it-works steps, problem cards and FAQ
entries live in `src/data/landing.jsx` as plain lists. The hero, the four
stage sections and the six "why this" panels are in `src/LandingPage.jsx`.

**Change the colours.** Everything is a variable in `src/styles/tokens.css`.
The brand colour is one line:

```css
:root { --primary: 221 83% 53%; }   /* #2563eb */
```

Light values sit in `:root`; the dark overrides are further down in the same
file. Don't write a colour anywhere else — that's how themes drift apart.

**Change where the buttons go.** `VITE_CONSOLE_URL` sets the host. The page
also deep-links to a few console pages (Ingest, Jobs, Revive…), and those paths
are listed in one table, `CONSOLE_PATHS`, at the top of `src/LandingPage.jsx`.
They match the console's own routes — if a route is renamed there, update it
there too.

---

## Notes

**The rollup override in `package.json`** pins rollup to its WebAssembly build.
Rollup normally loads a native binary that Windows Application Control blocks on
some machines, failing the build with `ERR_DLOPEN_FAILED`. The WASM build
produces identical output. Remove it if you only build on Linux CI.

**No analytics, cookies or tracking** are included. The only thing stored in a
visitor's browser is their light/dark preference.
