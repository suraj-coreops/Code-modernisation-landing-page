import { useEffect, useState } from "react";
import { Reveal, TiltOnScroll } from "./components/ScrollFx";
import LaptopFrame from "./components/LaptopFrame";
import { IngestScreen, SizingScreen, ReviveScreen, CloneScreen } from "./components/ConsoleScreens";
import {
  VisualSources,
  VisualEvidence,
  VisualSelfHeal,
  VisualPixelProof,
  VisualBoundary,
  VisualAgents,
} from "./components/DiffVisuals";
import { NAV_SECTIONS, STACKS, PILLARS, HOW_STEPS, PROBLEMS, FAQS } from "./data/landing";
import { useTheme } from "./context/ThemeContext";

/** Where the Code Intelligence console is deployed.
 *
 *  Set VITE_CONSOLE_URL at build time (see .env.example). The fallback is the
 *  local development server, so a fresh clone with no configuration still runs
 *  and the button still goes somewhere sensible rather than nowhere.
 */
const CONSOLE_URL = (import.meta.env.VITE_CONSOLE_URL || "http://localhost:8765").replace(/[/]+$/, "");

/** The console's own route names.
 *
 *  This page links to a handful of deep pages, and the console spells three of
 *  them differently from the labels used here (UCP & Pricing, and the two build
 *  skills, which live under /build/). Keeping the translation in one table means
 *  a route rename is a one-line fix rather than a hunt through the markup.
 *
 *  Source of truth: VIEW_PATH in code_console/frontend/index.html.
 */
const CONSOLE_PATHS = {
  "/": "/",
  "/ingest": "/ingest",
  "/jobs": "/jobs",
  "/artifacts": "/artifacts",
  "/pricing": "/ucp-pricing",
  // Below this line: reachable, but NOT linked from this page on purpose. The
  // three build skills require a signed-in user, and Settings and LLM Agents are
  // hidden entirely in demo deployments. Kept here so the table stays a complete
  // record of the console's routes for whoever adds a link next.
  "/revive": "/build/revive",
  "/pixel-clone": "/build/pixel-clone",
  "/legacy-transform": "/build/legacy-transform",
  "/agents": "/agents",
  "/settings": "/settings",
};

/** A page inside the console, resolved against CONSOLE_URL. An unknown name
 *  falls back to the console's home rather than building a dead link. */
const consoleHref = (path) => CONSOLE_URL + (CONSOLE_PATHS[path || "/"] || "/");

const ArrowRight = (props) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" {...props}>
    <path d="M5 12h14" />
    <path d="M12 5l7 7-7 7" />
  </svg>
);

const Check = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

/** The four stages, each shown as a real console screen in a device frame. */
const SHOWCASE = [
  {
    eyebrow: "Stage 1 · Ingest",
    title: "Watch the analysis happen",
    desc:
      "Connect a folder or a repository and the job starts immediately. Six stages run in order — connect, scan, detect, analyse, map, size — and the process log streams every line as it happens, so a run that stalls tells you exactly where.",
    points: [
      "Vendor and build directories skipped before anything is counted",
      "Stack and frameworks detected from the tree, not declared by hand",
      "Every log line is kept with the job and downloadable as a bundle",
    ],
    Screen: IngestScreen,
  },
  {
    eyebrow: "Stage 1 · Size & price",
    title: "An estimate you can defend line by line",
    desc:
      "The sizing screen shows the whole calculation: every actor weight, every use-case weight, all 13 technical factors and all 8 environmental factors, with the rating applied to each. Set your rates once and each job is priced against the band it actually landed in.",
    points: [
      "UCP = UUCP × TCF × ECF, with every input visible",
      "RFE bands — Small, Medium, Large — assigned from the computed size",
      "Rates by band, plus a per-TB rate for data migration",
    ],
    Screen: SizingScreen,
  },
  {
    eyebrow: "Stage 2 · Revive",
    title: "Prove the legacy app still runs",
    desc:
      "Revive boots the ingested application in containers and crawls it for a live URL. When a build fails, the agent reads the error, proposes a patch to the Dockerfile or compose file, and retries — with a per-lane status for the database, backend and frontend so progress is legible rather than a wall of output.",
    points: [
      "Self-healing retry loop, with every fix logged and approved",
      "Lane-by-lane status: database, backend, frontend",
      "Token usage and attempt count reported per run",
    ],
    Screen: ReviveScreen,
  },
  {
    eyebrow: "Stage 2 · Rebuild",
    title: "A rebuild that has to match",
    desc:
      "Pixel-Clone captures the running app and generates a React + Tailwind rebuild, looping until the screenshot diff falls under the threshold you set. Legacy Transform goes further: a modern stack running parallel on the same live database, with a parity gate that proves every page matches a raw SQL read.",
    points: [
      "Screenshot-diff stop line, from pixel-perfect to visual-approximate",
      "Generated clone served on this origin — open it and click through it",
      "Optional data-parity gate against the live legacy database",
    ],
    Screen: CloneScreen,
  },
];

const DIFFERENTIATORS = [
  {
    title: "Any legacy stack, one analysis model",
    tagline: "Java, COBOL-era PHP, .NET, Python, Node — the same scan, the same output.",
    summary:
      "The analyser does not care which decade the code is from. It walks the tree, skips what is vendored, detects the frameworks in play, and produces one artifact model — endpoints, entities, pages, integrations, dependencies, schema — regardless of the source language.",
    points: [
      "Local folders and public git repositories, cloned shallow and sandboxed to the allowed roots",
      "Frameworks detected from the tree rather than declared in a form",
      "A single artifact shape, so a Java estimate is comparable to a PHP one",
    ],
    Visual: VisualSources,
  },
  {
    title: "Estimates built from counted facts",
    tagline: "Every figure traces back to something the scanner actually found.",
    summary:
      "UCP is not a feel. Actor and use-case counts come from the endpoints and entities in the repository, the complexity factors are listed with their weights and ratings, and the whole calculation is rendered on the sizing screen. A client can disagree with a rating — which is the point — rather than with a total.",
    points: [
      "Discovered metrics shown next to the sizing: LOC, files, entities, endpoints, pages",
      "All 21 complexity factors visible, each with its weight and applied rating",
      "The mapping mode is labelled, so an AI-assisted number never passes as a deterministic one",
    ],
    Visual: VisualEvidence,
  },
  {
    title: "A boot agent that fixes what it breaks on",
    tagline: "Failure is the expected path, so failure is where the agent works.",
    summary:
      "Most legacy apps do not build on the first try. Revive treats that as the normal case: it captures the failing output, asks the model for a specific patch to the Dockerfile or compose file, shows you the change, and retries. Attempts, elapsed time and token spend are all reported.",
    points: [
      "Per-lane status for database, backend and frontend rather than one opaque spinner",
      "Each proposed fix is shown before it is applied",
      "Bounded attempts, with the reason surfaced when it gives up",
    ],
    Visual: VisualSelfHeal,
  },
  {
    title: "A UI rebuild that is proven, not asserted",
    tagline: "Screenshot diffing is the acceptance test, and you set the threshold.",
    summary:
      "Pixel-Clone captures the running application at real viewports, generates a React + Tailwind rebuild from what it captured, and keeps going until the measured difference per page is under your stop line. The result is served from this console, so the clone can be opened and clicked through.",
    points: [
      "Crawl every route, or name the handful that matter",
      "Mask dynamic regions, seed fixed data, or capture behind a login",
      "Point it at a generated data service and the clone fetches real rows",
    ],
    Visual: VisualPixelProof,
  },
  {
    title: "It runs where your code already is",
    tagline: "No upload, no hosted copy of the repository, no shared tenancy.",
    summary:
      "This is a service you run. The source tree, the containers it boots, the captured screenshots and the generated code all stay on your machine. Model prompts carry summaries and specific errors; provider credentials live in a 0600 file on the server and are never returned to the browser in full.",
    points: [
      "Source paths sandboxed to explicitly allowed roots",
      "Stage 2 endpoints gated by a real server-side session, not a hidden button",
      "Stored secrets shown only as their last four characters",
    ],
    Visual: VisualBoundary,
  },
  {
    title: "Named agents with editable prompts",
    tagline: "Open any agent, read what it does, and change how it asks.",
    summary:
      "The LLM Agents screen lists every agent in the pipeline with its inputs, outputs, and the system prompt it runs. Edit a prompt, reset it to the default, or drop the provider entirely and let the deterministic path do the work — the console always says which mode produced a result.",
    points: [
      "Inputs and outputs documented per agent, not buried in code",
      "Prompts editable and resettable from the UI",
      "OpenAI, AWS Bedrock, Anthropic, or heuristics with no key at all",
    ],
    Visual: VisualAgents,
  },
];

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function LandingPage() {
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [activeDiff, setActiveDiff] = useState(0);
  const [openFaq, setOpenFaq] = useState({});

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const active = DIFFERENTIATORS[activeDiff];
  const ActiveVisual = active.Visual;

  return (
    <div className="lp enter">
      <header className={"lp-nav" + (scrolled ? " scrolled" : "")}>
        <a href="#top" className="lp-brand" aria-label="Code Intelligence home">
          <span className="lp-brand-mark">CI</span>
          <span className="lp-brand-text">
            <b>Code Intelligence</b>
            <span>by CoreOps.AI</span>
          </span>
        </a>

        <nav className="lp-navlinks" aria-label="Page sections">
          {NAV_SECTIONS.map((s) => (
            <button key={s.id} type="button" className="lp-navlink" onClick={() => scrollToSection(s.id)}>
              {s.label}
            </button>
          ))}
        </nav>

        <div className="lp-navactions">
          <button type="button" className="iconbtn" onClick={toggle} title="Toggle light / dark">
            {theme === "light" ? "☀" : "☾"}
          </button>
          <a href={consoleHref("/")} className="lp-btn sm">
            Open console
          </a>
        </div>
      </header>

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="lp-hero">
        <div className="lp-hero-bg" aria-hidden="true">
          <span className="lp-orb a" />
          <span className="lp-orb b" />
          <span className="lp-orb c" />
          <div className="lp-hero-grid" />
        </div>

        <div className="lp-hero-inner">
          <Reveal variant="up">
            <span className="lp-badge">
              <span className="lp-badge-dot" aria-hidden="true" />
              Powered by CoreOps.AI
            </span>
          </Reveal>

          <Reveal variant="up" delay={80}>
            <h1 className="lp-title">
              Legacy code in.
              <br />
              <span className="lp-title-accent">Sized, running, rebuilt out.</span>
            </h1>
          </Reveal>

          <Reveal variant="up" delay={160}>
            <p className="lp-sub">
              Point Code Intelligence at a codebase nobody can size and nobody can run. It scans the tree, prices the
              work in Use Case Points, boots the app in containers, and rebuilds it on a modern stack — with the
              evidence for every step on screen.
            </p>
          </Reveal>

          <Reveal variant="up" delay={240}>
            <div className="lp-hero-actions">
              <a href={consoleHref("/ingest")} className="lp-btn">
                Start an ingest
                <ArrowRight />
              </a>
              <button type="button" className="lp-btn2" onClick={() => scrollToSection("stages")}>
                See the stages
              </button>
            </div>
          </Reveal>

          <div className="lp-stage">
            <TiltOnScroll maxTilt={20}>
              <LaptopFrame>
                <IngestScreen />
              </LaptopFrame>
            </TiltOnScroll>

            <div className="lp-float a">
              <div className="lp-floatcard">
                <b>6 stages</b>
                <span>connect → size</span>
              </div>
            </div>
            <div className="lp-float b">
              <div className="lp-floatcard">
                <b>✓ Self-healing</b>
                <span>boot, fix, retry</span>
              </div>
            </div>
            <div className="lp-float c">
              <div className="lp-floatcard">
                <b>&lt; 0.5% diff</b>
                <span>pixel-proven rebuild</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stack marquee ────────────────────────────────────── */}
      <section className="lp-marquee" aria-label="Recognised stacks">
        <p className="lp-marquee-cap">Reads the stacks your estate is actually built on</p>
        <div className="lp-marquee-wrap">
          <div className="lp-marquee-track">
            {[...STACKS, ...STACKS].map((s, i) => (
              <span className="lp-marquee-item" key={s.name + i} aria-hidden={i >= STACKS.length}>
                <i>{s.icon}</i>
                {s.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pillars ──────────────────────────────────────────── */}
      <section className="lp-pillars" aria-label="What this console is for">
        <div className="lp-pillars-inner">
          {PILLARS.map((p, i) => (
            <Reveal key={p.title} variant="up" delay={i * 90}>
              <article className="lp-pillar">
                <div className="lp-pillar-head">
                  <span className="lp-pillar-icon">{p.icon}</span>
                  <h3>{p.title}</h3>
                </div>
                <p className="lp-pillar-stat">{p.stat}</p>
                <p>{p.desc}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── What it does ─────────────────────────────────────── */}
      <section id="what" className="lp-section">
        <div className="lp-section-inner lp-center">
          <Reveal variant="up">
            <h2 className="lp-h2">
              Your estate. Your estimate. <span className="accent-text">Your proof it runs.</span>
            </h2>
          </Reveal>
          <Reveal variant="up" delay={100}>
            <p className="lp-lead">
              Code Intelligence is a modernisation console you run on your own infrastructure. It turns a codebase
              nobody wants to open into a defensible work order: a full static inventory, a Use Case Points size with
              every factor shown, a price in your own rates, and — once you finalise it — a booted, crawled application
              ready to be rebuilt.
            </p>
          </Reveal>
          <Reveal variant="up" delay={180}>
            <p className="lp-lead">
              The pipeline is a named set of agents, each with its inputs, outputs and an editable system prompt. Point
              it at OpenAI, AWS Bedrock or Anthropic, or run the deterministic path with no provider at all — the
              console always tells you which mode produced the number you are looking at.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────────── */}
      <section id="how" className="lp-section">
        <div className="lp-section-inner">
          <Reveal variant="up">
            <h2 className="lp-h2">Six steps, end to end</h2>
            <p className="lp-lead">
              Stage 1 — through pricing — is open to anyone who can reach the console. Stage 2 boots real containers on
              the host, so it needs a signed-in user.
            </p>
          </Reveal>

          <div className="lp-steps">
            {HOW_STEPS.map((step, i) => (
              <div key={step.title} style={{ display: "contents" }}>
                {i > 0 && (
                  <span className="lp-step-arrow" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14" />
                      <path d="M13 6l6 6-6 6" />
                    </svg>
                  </span>
                )}
                <Reveal variant="up" delay={i * 90} className="lp-step-wrap">
                  <article className="lp-step">
                    <span className="lp-step-icon">{step.icon}</span>
                    <span className="lp-step-n">Step {i + 1}</span>
                    <h3>{step.title}</h3>
                    <p>{step.desc}</p>
                  </article>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Problem ──────────────────────────────────────────── */}
      <section id="problem" className="lp-section lp-band">
        <div className="lp-section-inner">
          <Reveal variant="up">
            <h2 className="lp-h2">Three things sink a modernisation before it starts</h2>
            <p className="lp-lead">
              None of them are technology problems. All three are consequences of nobody having a reliable picture of
              what the existing system actually is.
            </p>
          </Reveal>
          <div className="lp-cards3">
            {PROBLEMS.map((p, i) => (
              <Reveal key={p.title} variant="up" delay={i * 110}>
                <article className="lp-card">
                  <div className="lp-card-icon">{p.icon}</div>
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stage showcase ───────────────────────────────────── */}
      <section id="stages" className="lp-section">
        <div className="lp-section-inner">
          <Reveal variant="up">
            <h2 className="lp-h2">The four screens the work actually happens on</h2>
            <p className="lp-lead">
              This is the console your team works in, from the first scan through to a running rebuild.
            </p>
          </Reveal>

          {SHOWCASE.map((row, i) => {
            const Screen = row.Screen;
            const flip = i % 2 === 1;
            return (
              <div key={row.title} className={"lp-showcase-row" + (flip ? " flip" : "")}>
                <Reveal variant={flip ? "right" : "left"} className="lp-showcase-copy">
                  <span className="lp-tag">{row.eyebrow}</span>
                  <h3>{row.title}</h3>
                  <p>{row.desc}</p>
                  <ul className="lp-checklist">
                    {row.points.map((pt) => (
                      <li key={pt}>
                        <Check />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
                <Reveal variant={flip ? "left" : "right"} delay={120} className="lp-showcase-device">
                  <LaptopFrame>
                    <Screen />
                  </LaptopFrame>
                </Reveal>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Differentiator explorer ──────────────────────────── */}
      <section id="why" className="lp-section lp-band">
        <div className="lp-section-inner">
          <Reveal variant="up">
            <h2 className="lp-h2">Six things a generic code assistant will not do</h2>
            <p className="lp-lead">Select any one to see how it works.</p>
          </Reveal>

          <Reveal variant="up" delay={140}>
            <div className="lp-explorer">
              <ul className="lp-explorer-nav" role="tablist" aria-label="Capabilities">
                {DIFFERENTIATORS.map((item, i) => (
                  <li key={item.title}>
                    <button
                      type="button"
                      role="tab"
                      aria-selected={i === activeDiff}
                      className={"lp-explorer-item" + (i === activeDiff ? " on" : "")}
                      onClick={() => setActiveDiff(i)}
                    >
                      <span className="lp-explorer-n">{String(i + 1).padStart(2, "0")}</span>
                      <span className="lp-explorer-t">{item.title}</span>
                      <svg className="lp-explorer-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <polyline points="9 18 15 12 9 6" />
                      </svg>
                    </button>
                  </li>
                ))}
              </ul>

              <div className="lp-detail" role="tabpanel">
                <div className="lp-detail-visual">
                  {/* Keyed on the index so switching tabs replays the SVG's
                      entrance animation instead of swapping a static frame. */}
                  <ActiveVisual key={activeDiff} />
                </div>
                <div className="lp-detail-body">
                  <div className="lp-detail-n">{String(activeDiff + 1).padStart(2, "0")}</div>
                  <h3>{active.title}</h3>
                  <p className="lp-detail-tag">{active.tagline}</p>
                  <p className="lp-detail-sum">{active.summary}</p>
                  <ul className="lp-checklist">
                    {active.points.map((pt) => (
                      <li key={pt}>
                        <Check />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="lp-cta">
        <span className="lp-cta-orb" aria-hidden="true" />
        <Reveal variant="zoom" className="lp-cta-inner">
          <h2>Size your first codebase today</h2>
          <p>
            Point it at a repository, watch the scan, and read the estimate with every factor on screen. Stage 1 needs
            nothing but a path — no Docker, no sign-in, no keys.
          </p>
          <a href={consoleHref("/ingest")} className="lp-btn lg">
            {"Open the console"}
            <ArrowRight />
          </a>
        </Reveal>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section id="faq" className="lp-section">
        <div className="lp-section-inner">
          <Reveal variant="up">
            <h2 className="lp-h2">Frequently asked questions</h2>
          </Reveal>
          <div className="lp-faq">
            {FAQS.map((item, i) => {
              const open = !!openFaq[i];
              return (
                <Reveal key={item.q} variant="up" delay={i * 60}>
                  <div className={"lp-faq-item" + (open ? " open" : "")}>
                    <button
                      type="button"
                      className="lp-faq-q"
                      aria-expanded={open}
                      onClick={() => setOpenFaq((prev) => ({ ...prev, [i]: !prev[i] }))}
                    >
                      <span>{item.q}</span>
                      <svg className="lp-faq-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </button>
                    <div className="lp-faq-a">
                      <div className="lp-faq-a-in">
                        <p>{item.a}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────── */}
      <footer className="lp-footer">
        <div className="lp-footer-inner">
          <div className="lp-footer-grid">
            <div className="lp-footer-brand">
              <a href="#top" className="lp-brand">
                <span className="lp-brand-mark">CI</span>
                <span className="lp-brand-text">
                  <b>Code Intelligence</b>
                  <span>by CoreOps.AI</span>
                </span>
              </a>
              <p>Ingest, size, revive and rebuild legacy applications — on your own infrastructure.</p>
            </div>

            <div className="lp-footer-col">
              <h4>Explore</h4>
              <ul>
                {NAV_SECTIONS.map((sec) => (
                  <li key={sec.id}>
                    <button type="button" onClick={() => scrollToSection(sec.id)}>
                      {sec.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Only pages an anonymous visitor can actually use. The build
                skills (Revive, Pixel-Clone, Legacy Transform) sit behind a
                sign-in, and Settings and LLM Agents are hidden outright in demo
                deployments -- linking a marketing page straight at any of those
                sends a first-time reader to a login wall or an empty screen. */}
            <div className="lp-footer-col">
              <h4>Console</h4>
              <ul>
                <li>
                  <a href={consoleHref("/")}>Open console</a>
                </li>
                <li>
                  <a href={consoleHref("/ingest")}>Start an ingest</a>
                </li>
                <li>
                  <a href={consoleHref("/artifacts")}>Artifacts</a>
                </li>
                <li>
                  <a href={consoleHref("/pricing")}>UCP &amp; Pricing</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="lp-footer-bottom">
            <span>© {new Date().getFullYear()} CoreOps.AI. All rights reserved.</span>
            <span>Runs on your infrastructure · Stage 2 requires Docker and a signed-in user</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
