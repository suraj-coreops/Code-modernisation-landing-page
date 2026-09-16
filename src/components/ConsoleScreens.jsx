/* ============================================================
   Miniature console screens shown inside the laptop frames.

   Deliberately hand-built rather than screenshots: they inherit the live theme
   tokens, so the marketing page never shows a light-mode screenshot to a
   dark-mode reader, and they stay correct when the palette moves.
   ============================================================ */

function Chrome({ title, active = 0, children }) {
  return (
    <div className="ps">
      <div className="ps-bar">
        <span className="ps-dots">
          <i />
          <i />
          <i />
        </span>
        <span className="ps-title">{title}</span>
      </div>
      <div className="ps-body">
        <div className="ps-rail">
          <span className="ps-rail-logo" />
          {[0, 1, 2, 3, 4].map((i) => (
            <span key={i} className={"ps-rail-i" + (i === active ? " on" : "")} />
          ))}
        </div>
        <div className="ps-main">{children}</div>
      </div>
    </div>
  );
}

/** Stage 1 running: the live process log. */
export function IngestScreen() {
  return (
    <Chrome title="Code Intelligence · Job console" active={1}>
      <div>
        <div className="ps-h">Job 041 · scanning</div>
        <div className="ps-sub">spring-petclinic → React + Django (DRF)</div>
      </div>
      <div className="ps-rows" style={{ flex: "0 0 auto" }}>
        <div className="ps-row">
          <span className="ps-mark">✓</span>
          <span className="nm">Detect stack</span>
          <span className="ps-chip ok">done</span>
        </div>
        <div className="ps-row">
          <span className="ps-mark busy" />
          <span className="nm">Static analysis</span>
          <span className="ps-chip">running</span>
        </div>
      </div>
      <div className="ps-term">
        <div>
          <span className="t">[10:24:02]</span> <span className="in">scan</span> 1,284 files · skipping vendor
        </div>
        <div>
          <span className="t">[10:24:06]</span> <span className="ok">ok</span> 37 endpoints · 21 entities
        </div>
        <div>
          <span className="t">[10:24:09]</span> <span className="in">ai</span> mapping actors and use cases
          <span className="ps-caret" />
        </div>
      </div>
    </Chrome>
  );
}

/** Stage 1 result: the sizing screen. */
export function SizingScreen() {
  const bars = [
    { h: "44%", label: "UAW" },
    { h: "78%", label: "UUCW" },
    { h: "62%", label: "TCF" },
    { h: "96%", label: "UCP", on: true },
  ];
  return (
    <Chrome title="Code Intelligence · UCP & Pricing" active={3}>
      <div>
        <div className="ps-h">
          1,284 UCP · <span style={{ color: "var(--cs-color-brand)" }}>Large</span>
        </div>
        <div className="ps-sub">UUCP × TCF × ECF, computed from the scan</div>
      </div>
      <div className="ps-kpis">
        <div className="ps-kpi">
          <div className="l">UUCP</div>
          <div className="v">1,140</div>
        </div>
        <div className="ps-kpi">
          <div className="l">TCF</div>
          <div className="v">1.09</div>
        </div>
        <div className="ps-kpi">
          <div className="l">ECF</div>
          <div className="v">1.03</div>
        </div>
        <div className="ps-kpi">
          <div className="l">UCP</div>
          <div className="v brand">1,284</div>
        </div>
      </div>
      <div className="ps-bars">
        {bars.map((b, i) => (
          <div className="ps-bar-col" key={b.label}>
            <span className={"ps-bar" + (b.on ? " on" : "")} style={{ "--h": b.h, "--i": i }} />
            <span className="ps-bar-lbl">{b.label}</span>
          </div>
        ))}
      </div>
    </Chrome>
  );
}

/** Stage 2: the app booted in containers, lane by lane. */
export function ReviveScreen() {
  const lanes = [
    { name: "Database", detail: "mysql:8 · port 3307", state: "healthy" },
    { name: "Backend", detail: "spring-boot · port 8101", state: "healthy" },
    { name: "Frontend", detail: "bundled · server-rendered", state: "built" },
  ];
  return (
    <Chrome title="Code Intelligence · Revive" active={2}>
      <div>
        <div className="ps-h">App is live</div>
        <div className="ps-sub">3 containers · 2 self-healed fixes · 84s</div>
      </div>
      <div className="ps-rows">
        {lanes.map((l) => (
          <div className="ps-row" key={l.name}>
            <span className={"ps-mark" + (l.state === "healthy" ? "" : " idle")}>
              {l.state === "healthy" ? "✓" : "◐"}
            </span>
            <span>
              <span className="nm">{l.name}</span>
              <br />
              <span className="dt">{l.detail}</span>
            </span>
            <span className={"ps-chip" + (l.state === "healthy" ? " ok" : "")}>{l.state}</span>
          </div>
        ))}
      </div>
      <div className="ps-row" style={{ gridTemplateColumns: "1fr auto" }}>
        <span className="dt">http://localhost:8101/</span>
        <span className="ps-chip ok">open ↗</span>
      </div>
    </Chrome>
  );
}

/** Stage 2: the pixel-clone diff. */
export function CloneScreen() {
  return (
    <Chrome title="Code Intelligence · UI Pixel-Clone" active={4}>
      <div>
        <div className="ps-h">Clone running · 0.34% diff</div>
        <div className="ps-sub">React + Tailwind, rebuilt from 9 captured screens</div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.7em", flex: 1, minHeight: 0 }}>
        {["Original", "Generated clone"].map((cap, idx) => (
          <div
            key={cap}
            style={{
              display: "flex",
              flexDirection: "column",
              border: "1px solid var(--cs-border-subtle)",
              borderRadius: "0.6em",
              overflow: "hidden",
              background: "var(--cs-surface-card)",
            }}
          >
            <div style={{ height: "1.5em", background: "var(--cs-surface-muted)", borderBottom: "1px solid var(--cs-border-subtle)" }} />
            <div style={{ flex: 1, padding: "0.6em", display: "flex", flexDirection: "column", gap: "0.35em" }}>
              <span style={{ height: "0.55em", width: "62%", borderRadius: 3, background: idx ? "hsl(var(--primary) / 0.5)" : "var(--cs-border)" }} />
              <span style={{ height: "0.4em", width: "88%", borderRadius: 3, background: "var(--cs-border)" }} />
              <span style={{ height: "0.4em", width: "74%", borderRadius: 3, background: "var(--cs-border)" }} />
              <span style={{ marginTop: "auto", height: "1.1em", width: "44%", borderRadius: "0.35em", background: idx ? "var(--cs-color-brand)" : "var(--cs-border)" }} />
            </div>
            <div className="dt" style={{ padding: "0.35em 0.6em", borderTop: "1px solid var(--cs-border-subtle)" }}>
              {cap}
            </div>
          </div>
        ))}
      </div>
    </Chrome>
  );
}
