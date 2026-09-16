/* ============================================================
   Landing page copy.

   Everything here describes what the console actually does - the stages in
   api/jobs.py, the skills in skills/, the sizing in api/ucp.py. Keeping the
   marketing text in one file makes it obvious when a claim outlives the
   feature that justified it.

   A .jsx file because the icons are inline SVG, not strings.
   ============================================================ */

export const NAV_SECTIONS = [
  { id: "what", label: "What it does" },
  { id: "how", label: "How it works" },
  { id: "problem", label: "Problem" },
  { id: "stages", label: "The stages" },
  { id: "why", label: "Why this" },
  { id: "faq", label: "FAQ" },
];

/** Stacks the analyser recognises today. Marquee only - recognising a stack is
 *  not the same as being able to boot it, which needs a compose file. */
export const STACKS = [
  { name: "Java · Spring", icon: "☕" },
  { name: "Python · Django", icon: "🐍" },
  { name: "Node · Express", icon: "⬢" },
  { name: "PHP · Laravel", icon: "🐘" },
  { name: ".NET · ASP.NET", icon: "🔷" },
  { name: "Flask / FastAPI", icon: "⚡" },
  { name: "React / Angular / Vue", icon: "⚛" },
  { name: "MySQL · PostgreSQL", icon: "🗄" },
  { name: "Oracle · SQL Server", icon: "🏛" },
  { name: "Docker Compose", icon: "🐳" },
];

export const PILLARS = [
  {
    title: "Evidence",
    stat: "Counted, not guessed",
    desc:
      "Every number comes from a static scan of the real tree — endpoints, entities, pages, integrations. The UCP arithmetic is shown in full, so a client can audit the estimate instead of trusting it.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Proof it runs",
    stat: "Booted, not assumed",
    desc:
      "Revive starts the ingested app in containers and crawls it. When the build breaks, the agent reads the failure, patches the Dockerfile or compose file, and retries — asking before it applies.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 4 23 10 17 10" />
        <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
      </svg>
    ),
  },
  {
    title: "Your infrastructure",
    stat: "Nothing leaves the box",
    desc:
      "The source tree, the containers and every artifact stay on the machine you run this on. Provider keys are stored server-side at 0600 and are never returned to the browser in full.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
  {
    title: "No black box",
    stat: "Every prompt is yours",
    desc:
      "Each agent is listed with its inputs, outputs and editable system prompt. Swap OpenAI, Bedrock or Anthropic — or run the whole pipeline on deterministic heuristics with no key at all.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v6m0 10v6M4.2 4.2l4.3 4.3m7 7 4.3 4.3M1 12h6m10 0h6M4.2 19.8l4.3-4.3m7-7 4.3-4.3" />
      </svg>
    ),
  },
];

export const HOW_STEPS = [
  {
    title: "Point at the code",
    desc: "A folder the server can read, or a public git URL. Nothing to install in the legacy environment.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    title: "Scan & analyse",
    desc: "Vendor directories skipped, stack detected, then a full static pass over the tree.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="7" />
        <path d="M21 21l-4.3-4.3" />
      </svg>
    ),
  },
  {
    title: "Size in UCP",
    desc: "Actors and use cases mapped, TCF and ECF applied, and an RFE band assigned.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18" />
        <rect x="7" y="12" width="3" height="6" />
        <rect x="12" y="8" width="3" height="10" />
        <rect x="17" y="5" width="3" height="13" />
      </svg>
    ),
  },
  {
    title: "Price the work",
    desc: "Your own rates, by band, turn the size into a work-order value you can quote.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    title: "Revive it",
    desc: "Boot the app in containers, self-heal the build, and crawl it to prove it responds.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 4 23 10 17 10" />
        <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
      </svg>
    ),
  },
  {
    title: "Rebuild it",
    desc: "Pixel-clone the UI, or rewrite the app on a modern stack against the live database.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2 2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
];

export const PROBLEMS = [
  {
    title: "Nobody knows how big it is",
    desc:
      "Modernisation bids are sized off a walkthrough and a guess. The number gets defended in a meeting rather than derived from the code, and it moves the moment someone actually opens the repository.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    title: "Nobody can run it",
    desc:
      "The build instructions left with the last team. Before a line can be rewritten, someone spends a fortnight guessing at environment variables and database versions.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
  {
    title: "The rewrite drifts",
    desc:
      "A rebuild that looks nothing like the original, or reads different numbers out of the database, gets rejected at UAT — after the budget is already spent.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 3v18h18" />
        <path d="M7 15l4-4 3 3 5-6" />
      </svg>
    ),
  },
];

export const FAQS = [
  {
    q: "What exactly does it need to get started?",
    a: "A path on the server, or a public git URL. The scan runs entirely from the source tree — it does not need the app running, database credentials, or an agent installed anywhere. Stage 2 (Revive and the two build skills) additionally needs Docker on the host and a signed-in user.",
  },
  {
    q: "How is the size calculated?",
    a: "Standard Use Case Points. The static scan counts actors and use cases from the real tree, giving UUCP = UAW + UUCW. That is adjusted by the Technical Complexity Factor (13 weighted factors) and the Environmental Complexity Factor (8 weighted factors) to give UCP = UUCP × TCF × ECF, and an RFE band of Small, Medium or Large. Every rating and weight is shown on the sizing screen, so the arithmetic can be checked line by line.",
  },
  {
    q: "Does my source code get sent to an AI provider?",
    a: "The tree itself is never uploaded. The LLM stages send targeted prompts — counts, structure summaries, and the specific build error being fixed — not a dump of the repository. If that is still too much, the mapping stage runs on deterministic heuristics with no provider configured at all, and the console states plainly which mode produced each number.",
  },
  {
    q: "What happens when the app will not boot?",
    a: "That is the normal case, and it is what the Revive agent is for. It reads the failing build output, proposes a fix to the Dockerfile or compose file, and asks before applying it. Each attempt is logged with its own lane status for the database, backend and frontend, so it is clear which layer is holding things up rather than just that something failed.",
  },
  {
    q: "What is the difference between Pixel-Clone and Legacy Transform?",
    a: "Pixel-Clone rebuilds the user interface: it captures the running app screen by screen and generates a React + Tailwind equivalent, looping until the screenshot diff is under your threshold. Legacy Transform rebuilds the application: it generates a modern stack running parallel to the legacy app on the same live database, with an optional data-parity gate that proves every page matches a raw SQL read.",
  },
  {
    q: "Can I use my own model provider?",
    a: "Yes. OpenAI, AWS Bedrock and Anthropic are all supported, and the active provider is chosen in Settings. Keys are written to a git-ignored file with 0600 permissions on the server and are never returned to the browser in full — a stored secret shows only its last four characters. When the console runs inside Agent Core, the project's own keys are used and cannot be edited from here.",
  },
];
