/* ============================================================
   Differentiator illustrations.

   Inline SVG so every stroke reads from the same theme tokens as the rest of
   the page (see the dv-* rules in landing.css). Each one draws the actual
   mechanism it is captioned with rather than decorating the text.
   ============================================================ */

const VB = "0 0 470 230";

/** 1 - many source languages, one analyser. */
export function VisualSources() {
  const langs = ["Java", "COBOL", ".NET", "PHP", "Python", "Node"];
  return (
    <svg viewBox={VB} role="img" aria-label="Six legacy stacks feeding one analyser">
      {langs.map((l, i) => {
        const y = 22 + i * 32;
        return (
          <g key={l} className="dv-enter" style={{ "--i": i }}>
            <rect x="8" y={y} width="86" height="24" rx="7" className="dv-node-plain" />
            <text x="51" y={y + 16} textAnchor="middle" className="dv-label-sm">
              {l}
            </text>
            <path d={`M96 ${y + 12} C 140 ${y + 12}, 150 115, 186 115`} className="dv-conn" />
          </g>
        );
      })}
      <circle cx="235" cy="115" r="48" className="dv-node" />
      <circle cx="235" cy="115" r="48" className="dv-ring" />
      <text x="235" y="110" textAnchor="middle" className="dv-label">
        Static
      </text>
      <text x="235" y="126" textAnchor="middle" className="dv-label">
        analysis
      </text>
      <path d="M285 115 H 344" className="dv-conn-strong" />
      <path d="M344 115 l -9 -5 v 10 z" className="dv-arrow" />
      <rect x="350" y="72" width="112" height="86" rx="12" className="dv-node-strong" />
      <text x="406" y="104" textAnchor="middle" className="dv-label-strong">
        One
      </text>
      <text x="406" y="122" textAnchor="middle" className="dv-label-strong">
        artifact
      </text>
      <text x="406" y="140" textAnchor="middle" className="dv-label-strong">
        model
      </text>
      <circle r="4" className="dv-dot">
        <animateMotion dur="2.6s" repeatCount="indefinite" path="M96 34 C 140 34, 150 115, 186 115" />
      </circle>
      <circle r="4" className="dv-dot-bright">
        <animateMotion dur="2.6s" begin="1.1s" repeatCount="indefinite" path="M96 162 C 140 162, 150 115, 186 115" />
      </circle>
    </svg>
  );
}

/** 2 - counted evidence, not a guessed number. */
export function VisualEvidence() {
  const counts = [
    ["Endpoints", "37"],
    ["Entities", "21"],
    ["Pages", "44"],
    ["Integrations", "6"],
  ];
  return (
    <svg viewBox={VB} role="img" aria-label="Counted facts feeding the UCP formula">
      {counts.map(([k, v], i) => {
        const y = 18 + i * 44;
        return (
          <g key={k} className="dv-enter" style={{ "--i": i }}>
            <rect x="8" y={y} width="132" height="34" rx="9" className="dv-node" />
            <text x="20" y={y + 22} className="dv-label-sm">
              {k}
            </text>
            <text x="128" y={y + 22} textAnchor="end" className="dv-cap">
              {v}
            </text>
            <path d={`M142 ${y + 17} H 174`} className="dv-conn" />
          </g>
        );
      })}
      <rect x="178" y="58" width="128" height="114" rx="12" className="dv-node-plain" />
      <text x="242" y="86" textAnchor="middle" className="dv-label-sm">
        UUCP = UAW + UUCW
      </text>
      <text x="242" y="112" textAnchor="middle" className="dv-label">
        × TCF × ECF
      </text>
      <text x="242" y="142" textAnchor="middle" className="dv-cap">
        auditable
      </text>
      <path d="M310 115 H 356" className="dv-conn-strong" />
      <path d="M356 115 l -9 -5 v 10 z" className="dv-arrow" />
      <rect x="362" y="80" width="100" height="70" rx="12" className="dv-node-strong" />
      <text x="412" y="110" textAnchor="middle" className="dv-label-strong">
        1,284
      </text>
      <text x="412" y="130" textAnchor="middle" className="dv-label-strong">
        UCP
      </text>
    </svg>
  );
}

/** 3 - the boot/self-heal retry loop. */
export function VisualSelfHeal() {
  return (
    <svg viewBox={VB} role="img" aria-label="Build, fail, LLM fix, retry, healthy">
      {[
        ["Build", 14],
        ["Boot", 128],
        ["Probe", 242],
      ].map(([label, x], i) => (
        <g key={label} className="dv-enter" style={{ "--i": i }}>
          <rect x={x} y="76" width="92" height="46" rx="11" className="dv-node" />
          <text x={x + 46} y="104" textAnchor="middle" className="dv-label">
            {label}
          </text>
          {i < 2 && (
            <>
              <path d={`M${x + 92} 99 H ${x + 122}`} className="dv-conn-strong" />
              <path d={`M${x + 122} 99 l -9 -5 v 10 z`} className="dv-arrow" />
            </>
          )}
        </g>
      ))}
      <path d="M334 99 H 364" className="dv-conn-strong" />
      <path d="M364 99 l -9 -5 v 10 z" className="dv-arrow" />
      <rect x="370" y="76" width="92" height="46" rx="11" className="dv-node-strong" />
      <text x="416" y="104" textAnchor="middle" className="dv-label-strong">
        Healthy
      </text>
      <text x="288" y="66" textAnchor="middle" className="dv-x dv-pulse">
        ✕ fails
      </text>
      <path d="M288 128 C 288 186, 60 186, 60 128" className="dv-dashed dv-march" />
      <rect x="128" y="160" width="128" height="32" rx="9" className="dv-node" />
      <text x="192" y="181" textAnchor="middle" className="dv-label-sm">
        LLM patches compose
      </text>
      <text x="60" y="206" textAnchor="middle" className="dv-cap">
        retry
      </text>
      <circle r="4" className="dv-dot">
        <animateMotion dur="3.4s" repeatCount="indefinite" path="M288 128 C 288 186, 60 186, 60 128" />
      </circle>
    </svg>
  );
}

/** 4 - capture, generate, diff until it matches. */
export function VisualPixelProof() {
  return (
    <svg viewBox={VB} role="img" aria-label="Capture the running app, generate a clone, diff until under threshold">
      <rect x="14" y="52" width="120" height="126" rx="11" className="dv-node-plain" />
      <text x="74" y="40" textAnchor="middle" className="dv-cap">
        Running app
      </text>
      <rect x="28" y="70" width="92" height="9" rx="4" className="dv-node-strong" />
      {[92, 108, 124].map((y, i) => (
        <rect key={y} x="28" y={y} width={i === 2 ? 60 : 92} height="7" rx="3" className="dv-node" />
      ))}
      <rect x="28" y="146" width="48" height="16" rx="5" className="dv-node-strong" />

      <path d="M140 115 H 176" className="dv-conn-strong" />
      <path d="M176 115 l -9 -5 v 10 z" className="dv-arrow" />
      <text x="158" y="104" textAnchor="middle" className="dv-label-sm">
        capture
      </text>

      <rect x="182" y="52" width="106" height="126" rx="11" className="dv-node" />
      <text x="235" y="40" textAnchor="middle" className="dv-cap">
        Generate
      </text>
      <text x="235" y="112" textAnchor="middle" className="dv-label-sm">
        React
      </text>
      <text x="235" y="130" textAnchor="middle" className="dv-label-sm">
        + Tailwind
      </text>

      <path d="M294 115 H 330" className="dv-conn-strong" />
      <path d="M330 115 l -9 -5 v 10 z" className="dv-arrow" />
      <text x="312" y="104" textAnchor="middle" className="dv-label-sm">
        diff
      </text>

      <rect x="336" y="52" width="120" height="126" rx="11" className="dv-node-plain" />
      <text x="396" y="40" textAnchor="middle" className="dv-cap">
        Clone
      </text>
      <rect x="350" y="70" width="92" height="9" rx="4" className="dv-node-strong" />
      {[92, 108, 124].map((y, i) => (
        <rect key={y} x="350" y={y} width={i === 2 ? 60 : 92} height="7" rx="3" className="dv-node" />
      ))}
      <rect x="350" y="146" width="48" height="16" rx="5" className="dv-node-strong" />
      <circle cx="396" cy="115" r="60" className="dv-ring" />

      <path d="M396 186 C 396 212, 235 212, 235 186" className="dv-dashed dv-march" />
      <text x="235" y="224" textAnchor="middle" className="dv-cap">
        loop until &lt; 0.5%
      </text>
    </svg>
  );
}

/** 5 - the code never leaves the boundary; keys stay server-side. */
export function VisualBoundary() {
  return (
    <svg viewBox={VB} role="img" aria-label="Source and containers stay inside your boundary">
      <rect x="10" y="20" width="304" height="192" rx="16" className="dv-boundary dv-march" />
      <text x="26" y="42" className="dv-cap">
        Your infrastructure
      </text>

      {[
        ["Source tree", 56],
        ["Containers", 106],
        ["Artifacts", 156],
      ].map(([label, y], i) => (
        <g key={label} className="dv-enter" style={{ "--i": i }}>
          <rect x="30" y={y} width="122" height="38" rx="10" className="dv-node" />
          <text x="91" y={y + 24} textAnchor="middle" className="dv-label-sm">
            {label}
          </text>
        </g>
      ))}

      <rect x="176" y="86" width="118" height="78" rx="12" className="dv-node-strong" />
      <text x="235" y="118" textAnchor="middle" className="dv-label-strong">
        Console
      </text>
      <text x="235" y="138" textAnchor="middle" className="dv-label-strong">
        process
      </text>
      {[75, 125, 175].map((y) => (
        <path key={y} d={`M152 ${y} H 176`} className="dv-conn" />
      ))}

      <rect x="356" y="86" width="104" height="78" rx="12" className="dv-node-plain" />
      <text x="408" y="118" textAnchor="middle" className="dv-label-sm">
        LLM
      </text>
      <text x="408" y="136" textAnchor="middle" className="dv-label-sm">
        provider
      </text>
      <path d="M314 125 H 356" className="dv-dashed" />
      <text x="335" y="114" textAnchor="middle" className="dv-label-sm">
        prompts
      </text>
      <text x="335" y="152" textAnchor="middle" className="dv-x">
        no source dump
      </text>
    </svg>
  );
}

/** 6 - the four named agents, in order. */
export function VisualAgents() {
  const stages = ["Scan", "Map", "Size", "Revive"];
  return (
    <svg viewBox={VB} role="img" aria-label="Scan, map, size and revive agents in a pipeline">
      {stages.map((s, i) => {
        const x = 12 + i * 116;
        return (
          <g key={s} className="dv-enter" style={{ "--i": i }}>
            <rect x={x} y="72" width="98" height="58" rx="12" className={i === 3 ? "dv-node-strong" : "dv-node"} />
            <text x={x + 49} y="99" textAnchor="middle" className={i === 3 ? "dv-label-strong" : "dv-label"}>
              {s}
            </text>
            <text x={x + 49} y="116" textAnchor="middle" className={i === 3 ? "dv-label-strong" : "dv-label-sm"}>
              agent
            </text>
            {i < 3 && (
              <>
                <path d={`M${x + 98} 101 H ${x + 110}`} className="dv-conn-strong" />
                <path d={`M${x + 112} 101 l -8 -5 v 10 z`} className="dv-arrow" />
              </>
            )}
            <text x={x + 49} y="58" textAnchor="middle" className="dv-cap">
              {String(i + 1).padStart(2, "0")}
            </text>
          </g>
        );
      })}
      <rect x="12" y="152" width="446" height="34" rx="10" className="dv-node-plain" />
      <text x="235" y="174" textAnchor="middle" className="dv-label-sm">
        every prompt is editable in LLM Agents — nothing here is a black box
      </text>
      <circle r="4.5" className="dv-dot">
        <animateMotion dur="4s" repeatCount="indefinite" path="M61 101 H 409" />
      </circle>
    </svg>
  );
}
