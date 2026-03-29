"use client";

const SECTIONS = [
  {
    title: "Intelligence Engine",
    items: [
      { l: "Primary LLM",     v: "Gemini 1.5 Pro",    t: "select" },
      { l: "Fallback LLM",    v: "Claude 3.5 Sonnet", t: "select" },
      { l: "Scan Interval",   v: "15 minutes",         t: "select" },
      { l: "Agent Count",     v: "12 Active",          t: "badge-gold" },
    ],
  },
  {
    title: "Alert Preferences",
    items: [
      { l: "Conviction Threshold", v: "Score ≥ 6.5",  t: "select"     },
      { l: "Insider Buy Alerts",   v: "on",            t: "toggle"     },
      { l: "Volume Anomaly",       v: "on",            t: "toggle"     },
      { l: "Email Digest",         v: "off",           t: "toggle"     },
    ],
  },
  {
    title: "Portfolio Settings",
    items: [
      { l: "Currency",        v: "INR (₹)",                t: "select"  },
      { l: "Tax Bracket",     v: "30% (LTCG)",             t: "select"  },
      { l: "Benchmark",       v: "Nifty 50",               t: "select"  },
      { l: "Risk Profile",    v: "Moderate-Aggressive",    t: "badge-violet" },
    ],
  },
];

export default function SettingsPage() {
  return (
    <div className="db-page">
      <div className="mb-36">
        <div className="section-pill">⚙ Settings · System Configuration</div>
        <h1 className="db-page-title">
          System <span className="db-cursive">Config</span>
        </h1>
      </div>

      <div style={{ maxWidth: 780, display: "flex", flexDirection: "column", gap: 20 }}>
        {SECTIONS.map(sec => (
          <div key={sec.title} className="gc" style={{ padding: "24px 28px", overflow: "visible" }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.6)", marginBottom: 20, letterSpacing: "0.06em", textTransform: "uppercase", fontFamily: "var(--font-data), monospace" }}>
              {sec.title}
            </div>
            {sec.items.map((item, i) => (
              <div key={item.l} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "13px 0",
                borderBottom: i < sec.items.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
              }}>
                <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>{item.l}</span>
                {item.t === "toggle" && (
                  <button className={`toggle ${item.v === "on" ? "toggle-on" : "toggle-off"}`}>
                    <div className={`toggle-knob ${item.v === "on" ? "toggle-knob-on" : "toggle-knob-off"}`} />
                  </button>
                )}
                {item.t === "select" && (
                  <span style={{ fontSize: 12, color: "#F0CC6E", fontFamily: "var(--font-data), monospace", cursor: "pointer" }}>
                    {item.v} ↓
                  </span>
                )}
                {item.t === "badge-gold" && <span className="badge badge-gold">{item.v}</span>}
                {item.t === "badge-violet" && <span className="badge badge-violet">{item.v}</span>}
              </div>
            ))}
          </div>
        ))}

        <div style={{ display: "flex", gap: 12 }}>
          <button style={{
            padding: "14px 36px",
            background: "linear-gradient(135deg, #C9A84C, #8B6E2A)",
            border: "none", borderRadius: 12,
            color: "#080808", fontSize: 11, fontWeight: 700,
            letterSpacing: "0.1em", textTransform: "uppercase",
            cursor: "pointer", fontFamily: "var(--font-data), monospace",
            boxShadow: "0 8px 32px rgba(201,168,76,0.25)",
            transition: "box-shadow 0.2s ease",
          }}
            onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 12px 48px rgba(201,168,76,0.4)")}
            onMouseLeave={e => (e.currentTarget.style.boxShadow = "0 8px 32px rgba(201,168,76,0.25)")}
          >
            Save Changes
          </button>
          <button style={{
            padding: "14px 36px",
            background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12,
            color: "rgba(255,255,255,0.4)", fontSize: 11, cursor: "pointer", fontFamily: "var(--font-data), monospace",
            letterSpacing: "0.05em",
          }}>
            Reset Defaults
          </button>
        </div>
      </div>
    </div>
  );
}
