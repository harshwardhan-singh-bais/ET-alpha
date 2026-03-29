"use client";
import { useEffect, useState } from "react";

const ALERTS = [
  { sym: "DIXON TECH",   type: "Insider Buy",  tc: "#22C55E", bc: "badge-green",  score: 8.4, desc: "Director bought ₹2.4Cr via open market — 3rd time in 60 days. High volume alongside sentiment shift.", time: "2m" },
  { sym: "POLYCAB",      type: "Vol Breakout", tc: "#C9A84C", bc: "badge-gold",   score: 7.9, desc: "60-day LSTM model flagged 3.4x volume spike. No regulatory news. Historical pattern: +8–12% in 3 weeks.", time: "14m" },
  { sym: "DEFENCE ETF",  type: "FII Flow",     tc: "#A87FD4", bc: "badge-violet", score: 7.2, desc: "₹1,240Cr FII net buying across defence basket over 6 consecutive sessions. Sector tailwind visible.", time: "22m" },
  { sym: "KAJARIA",      type: "Earnings Beat",tc: "#C9A84C", bc: "badge-gold",   score: 6.8, desc: "Q3 PAT beats consensus by +18%. Management guided 20% revenue growth. Cement volumes up 14%.", time: "1h" },
  { sym: "BHEL",         type: "Chart Setup",  tc: "#A87FD4", bc: "badge-violet", score: 6.5, desc: "Cup & Handle breakout forming on daily chart. Order book at ₹1.76L Cr. FII inflows accelerating.", time: "2h" },
  { sym: "TATA POWER",   type: "Bulk Deal",    tc: "#22C55E", bc: "badge-green",  score: 7.1, desc: "LIC bought 2.2% stake via open market at ₹398. Long-term institutional accumulation signal.", time: "3h" },
];

export default function RadarPage() {
  const [vis, setVis] = useState<number[]>([]);
  useEffect(() => {
    ALERTS.forEach((_, i) => setTimeout(() => setVis(v => [...v, i]), i * 120));
  }, []);

  return (
    <div className="db-page">
      <div className="mb-36">
        <div className="section-pill">◉ Opportunity Radar · NSE Universe Scan</div>
        <h1 className="db-page-title">
          Live <span className="db-cursive">Signals</span>
        </h1>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 8 }}>
          <span className="badge badge-green">
            <span className="sig-dot sig-dot-live" style={{ width: 5, height: 5, background: "#22C55E" }} />
            Scanning 500 Stocks
          </span>
          <span style={{ fontSize: 10, color: "rgba(255,255,255,0.2)", fontFamily: "var(--font-data), monospace" }}>NSE Universe · Every 15 min · 10 signal types</span>
        </div>
      </div>

      <div className="grid-2">
        {ALERTS.map((a, i) => (
          <div key={a.sym} className="alert-row"
            style={{
              borderLeft: `3px solid ${a.tc}18`,
              opacity: vis.includes(i) ? 1 : 0,
              transform: vis.includes(i) ? "translateY(0) scale(1)" : "translateY(16px) scale(0.97)",
              transition: "all 0.5s cubic-bezier(0.22,1,0.36,1)",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderLeftColor = `${a.tc}60`; }}
            onMouseLeave={e => { e.currentTarget.style.borderLeftColor = `${a.tc}18`; }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  <span className={`badge ${a.bc}`}>{a.type}</span>
                  <span style={{ fontSize: 9, color: "rgba(255,255,255,0.2)", fontFamily: "var(--font-data), monospace" }}>{a.time} ago</span>
                </div>
                <div style={{ fontSize: 15, fontWeight: 800, color: "rgba(255,255,255,0.85)", fontFamily: "var(--font-data), monospace", letterSpacing: "0.03em" }}>{a.sym}</div>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div style={{ fontSize: 8, color: "rgba(255,255,255,0.2)", fontFamily: "var(--font-data), monospace", marginBottom: 3, letterSpacing: "0.1em", textTransform: "uppercase" }}>Conviction</div>
                <div style={{ fontSize: 34, fontWeight: 800, color: "#F0CC6E", fontFamily: "var(--font-data), monospace", lineHeight: 1 }}>{a.score}</div>
              </div>
            </div>
            <p style={{ fontSize: 11, color: "rgba(255,255,255,0.38)", lineHeight: 1.7, marginBottom: 14 }}>{a.desc}</p>
            <div style={{ display: "flex", gap: 8 }}>
              <button style={{
                padding: "7px 14px", fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase",
                background: `${a.tc}12`, border: `1px solid ${a.tc}30`, borderRadius: 8,
                color: a.tc, cursor: "pointer", fontFamily: "var(--font-data), monospace",
                transition: "all 0.2s ease",
              }}
                onMouseEnter={e => { e.currentTarget.style.background = `${a.tc}25`; }}
                onMouseLeave={e => { e.currentTarget.style.background = `${a.tc}12`; }}
              >
                Open Debate →
              </button>
              <button style={{
                padding: "7px 14px", fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase",
                background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 8,
                color: "rgba(255,255,255,0.3)", cursor: "pointer", fontFamily: "var(--font-data), monospace",
              }}>
                Dismiss
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
