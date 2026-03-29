"use client";
import { useState } from "react";

const PATTERNS = [
  { sym: "POLYCAB",    pattern: "Cup & Handle",       dir: "Bullish",  complete: 88, entry: 5820, target: 6480, stop: 5540, occurs: 4, success: 3, avgGain: "+8.2%", avgDays: 23, c: "#22C55E" },
  { sym: "HAL",        pattern: "Ascending Triangle",  dir: "Bullish",  complete: 74, entry: 3920, target: 4480, stop: 3680, occurs: 3, success: 2, avgGain: "+12.4%",avgDays: 31, c: "#22C55E" },
  { sym: "HDFC BANK",  pattern: "Double Bottom",       dir: "Bullish",  complete: 92, entry: 1620, target: 1860, stop: 1510, occurs: 5, success: 4, avgGain: "+9.7%", avgDays: 18, c: "#22C55E" },
  { sym: "IT SECTOR",  pattern: "Head & Shoulders",    dir: "Bearish",  complete: 65, entry: 1780, target: 1540, stop: 1880, occurs: 2, success: 2, avgGain: "-11.2%",avgDays: 28, c: "#EF4444" },
  { sym: "TATA STEEL", pattern: "Bull Flag",           dir: "Bullish",  complete: 81, entry:  162, target:  188, stop:  154, occurs: 6, success: 4, avgGain: "+7.8%", avgDays: 14, c: "#22C55E" },
  { sym: "NYKAA",      pattern: "Descending Wedge",    dir: "Bearish",  complete: 55, entry:  176, target:  154, stop:  190, occurs: 2, success: 1, avgGain: "-6.3%", avgDays: 21, c: "#EF4444" },
];

function MiniChart({ pattern, dir, complete }: { pattern: string; dir: string; complete: number }) {
  const isBull = dir === "Bullish";
  const pts = isBull
    ? "20,80 40,70 60,50 80,55 100,40 120,42 140,25 160,20"
    : "20,20 40,25 60,22 80,40 100,60 120,55 140,70 160,75";
  return (
    <svg viewBox="0 0 180 100" width="100%" height="70" style={{ display: "block" }}>
      <defs>
        <linearGradient id={`cg${pattern}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={isBull ? "#22C55E" : "#EF4444"} stopOpacity="0.25" />
          <stop offset="100%" stopColor={isBull ? "#22C55E" : "#EF4444"} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={`20,100 ${pts} 160,100`} fill={`url(#cg${pattern})`} />
      <polyline points={pts} fill="none" stroke={isBull ? "#22C55E" : "#EF4444"} strokeWidth="1.5" strokeLinecap="round" />
      {/* Completion zone */}
      <rect x={160 * complete / 100 - 2} y="0" width="2" height="100" fill={isBull ? "#22C55E" : "#EF4444"} opacity="0.4" strokeDasharray="4,4" />
    </svg>
  );
}

export default function PatternPage() {
  const [sel, setSel] = useState(0);
  const p = PATTERNS[sel];

  return (
    <div className="db-page">
      <div className="mb-36">
        <div className="section-pill">📈 Chart Pattern Intelligence · AI Pattern Scanner</div>
        <h1 className="db-page-title">
          Pattern <span className="db-cursive">Intelligence</span>
        </h1>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.28)", marginTop: 8 }}>
          Rule-based + ML hybrid detection · Stock-specific backtests · NSE universe scan
        </p>
      </div>

      <div className="grid-1-2 mb-20">
        {/* Pattern list */}
        <div className="gc" style={{ overflow: "hidden" }}>
          <div className="gc-header">
            <div><div className="gc-title">Detected Today</div><div className="gc-sub">Across NSE 500 universe</div></div>
            <span className="badge badge-gold">{PATTERNS.length} Patterns</span>
          </div>
          {PATTERNS.map((pat, i) => (
            <div key={pat.sym}
              onClick={() => setSel(i)}
              style={{
                display: "flex", alignItems: "center", gap: 14,
                padding: "14px 24px",
                borderBottom: i < PATTERNS.length - 1 ? "1px solid rgba(255,255,255,0.03)" : "none",
                cursor: "pointer",
                background: sel === i ? "rgba(255,255,255,0.03)" : "transparent",
                borderLeft: sel === i ? `2px solid ${pat.c}` : "2px solid transparent",
                transition: "all 0.2s",
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.82)", fontFamily: "var(--font-data), monospace" }}>{pat.sym}</div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", marginTop: 1 }}>{pat.pattern}</div>
              </div>
              <span className={`badge ${pat.dir === "Bullish" ? "badge-green" : "badge-red"}`}>{pat.dir}</span>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.2)", fontFamily: "var(--font-data), monospace" }}>Complete</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: pat.c, fontFamily: "var(--font-data), monospace" }}>{pat.complete}%</div>
              </div>
            </div>
          ))}
        </div>

        {/* Pattern detail */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Chart preview */}
          <div className="gc" style={{ padding: "24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: "rgba(255,255,255,0.88)" }}>{p.sym}</div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", marginTop: 2, fontFamily: "var(--font-data), monospace" }}>{p.pattern} · {p.complete}% complete</div>
              </div>
              <span className={`badge ${p.dir === "Bullish" ? "badge-green" : "badge-red"}`}>{p.dir}</span>
            </div>
            <MiniChart pattern={p.pattern} dir={p.dir} complete={p.complete} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginTop: 16 }}>
              {[["Entry", `₹${p.entry}`], ["Target", `₹${p.target}`], ["Stop Loss", `₹${p.stop}`]].map(([k, v]) => (
                <div key={k as string} style={{ textAlign: "center", padding: "12px", background: "rgba(255,255,255,0.025)", borderRadius: 10 }}>
                  <div style={{ fontSize: 8, color: "rgba(255,255,255,0.25)", fontFamily: "var(--font-data), monospace", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>{k}</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: k === "Stop Loss" ? "#EF4444" : k === "Target" ? "#22C55E" : "#F0CC6E", fontFamily: "var(--font-data), monospace" }}>{v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Stock-specific backtest — unique feature */}
          <div className="gc gc-gold" style={{ padding: "22px 24px" }}>
            <div className="gc-glow" style={{ width: 150, height: 150, background: "#C9A84C", top: -30, right: -30 }} />
            <div style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.8)", marginBottom: 4 }}>
              📊 Stock-Specific Backtest
            </div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", marginBottom: 16, fontFamily: "var(--font-data), monospace" }}>
              {p.pattern} on {p.sym} · Last 5 years
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
              {[
                { l: "Occurrences",   v: `${p.occurs} times` },
                { l: "Success Rate",  v: `${p.success}/${p.occurs} (${Math.round(p.success/p.occurs*100)}%)` },
                { l: "Avg Gain",      v: p.avgGain },
                { l: "Avg to Target", v: `${p.avgDays} days` },
              ].map(k => (
                <div key={k.l} style={{ padding: "12px", background: "rgba(255,255,255,0.025)", borderRadius: 10 }}>
                  <div style={{ fontSize: 8, color: "rgba(255,255,255,0.25)", fontFamily: "var(--font-data), monospace", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 4 }}>{k.l}</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: "#F0CC6E", fontFamily: "var(--font-data), monospace" }}>{k.v}</div>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", lineHeight: 1.7 }}>
              &ldquo;{p.pattern} on {p.sym}: {p.occurs} occurrences. Worked {p.success}/{p.occurs} times. Avg gain: {p.avgGain}. Avg time: {p.avgDays} days.&rdquo;
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
