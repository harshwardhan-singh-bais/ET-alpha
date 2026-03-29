"use client";
import { useState, useEffect } from "react";

const BULL = [
  "FII net buying ₹847Cr — 6th consecutive session of accumulation",
  "Cup & Handle breakout confirmed on daily OHLCV chart pattern",
  "Q3 earnings beat +22% vs Bloomberg consensus estimate",
  "Government quick commerce policy tailwind — Blinkit unit economics turning positive",
  "Insider promoter group increased stake for 3rd consecutive quarter",
];
const BEAR = [
  "P/E at 180x vs sector median 65x — dangerously richly valued",
  "Promoter sold 1.2% stake via block deal — dilution signal",
  "Competitive intensity: Swiggy adding 12 dark stores per week",
  "Regulatory overhang on food delivery commission caps (ONDC)",
  "Gross margin pressure from rising logistics & rider costs",
];

export default function DebatePage() {
  const [vis, setVis] = useState<number[]>([]);
  const [score] = useState(62);

  useEffect(() => {
    BULL.forEach((_, i) => setTimeout(() => setVis(v => [...v, i]), 300 + i * 280));
  }, []);

  return (
    <div className="db-page">
      {/* Header */}
      <div className="mb-36">
        <div className="section-pill">⚔ Debate Arena · Live AI Deliberation</div>
        <h1 className="db-page-title">
          Bull <span className="db-cursive">vs</span> Bear
        </h1>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 8 }}>
          <span style={{ fontSize: 13, color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-data), monospace" }}>ZOMATO.NS · ₹238.45</span>
          <span className="badge badge-green">
            <span className="sig-dot sig-dot-live" style={{ width: 5, height: 5, background: "#22C55E" }} />
            Debate Live
          </span>
          <span className="badge badge-gold">Gemini 1.5 Pro + Claude 3.5</span>
        </div>
      </div>

      {/* Bull vs Bear */}
      <div className="grid-2 mb-20">

        {/* BULL */}
        <div className="gc gc-bull" style={{ padding: "28px" }}>
          <div className="gc-glow" style={{ width: 200, height: 200, background: "#22C55E", top: -60, right: -60 }} />
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
            <div style={{ width: 44, height: 44, borderRadius: "50%", background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>🐂</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#22C55E" }}>Bull Case</div>
              <div style={{ fontSize: 9, color: "rgba(255,255,255,0.28)", fontFamily: "var(--font-data), monospace", marginTop: 1 }}>Gemini 1.5 Pro · Confidence 68%</div>
            </div>
            <div style={{ fontFamily: "var(--font-data), monospace", fontSize: 36, fontWeight: 800, color: "#22C55E", lineHeight: 1 }}>+6.8</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {BULL.map((arg, i) => (
              <div key={i} className="arg-card" style={{
                background: "rgba(34,197,94,0.05)",
                border: "1px solid rgba(34,197,94,0.08)",
                borderRadius: 12,
                opacity: vis.includes(i) ? 1 : 0,
                transform: vis.includes(i) ? "translateY(0)" : "translateY(10px)",
                transition: "all 0.45s cubic-bezier(0.22,1,0.36,1)",
              }}>
                <span style={{ color: "#22C55E", flexShrink: 0 }}>◆</span>
                <span>{arg}</span>
              </div>
            ))}
          </div>
        </div>

        {/* BEAR */}
        <div className="gc gc-bear" style={{ padding: "28px" }}>
          <div className="gc-glow" style={{ width: 200, height: 200, background: "#EF4444", top: -60, right: -60 }} />
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
            <div style={{ width: 44, height: 44, borderRadius: "50%", background: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>🐻</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#EF4444" }}>Bear Case</div>
              <div style={{ fontSize: 9, color: "rgba(255,255,255,0.28)", fontFamily: "var(--font-data), monospace", marginTop: 1 }}>Claude 3.5 Sonnet · Confidence 32%</div>
            </div>
            <div style={{ fontFamily: "var(--font-data), monospace", fontSize: 36, fontWeight: 800, color: "#EF4444", lineHeight: 1 }}>-3.2</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {BEAR.map((arg, i) => (
              <div key={i} className="arg-card" style={{
                background: "rgba(239,68,68,0.05)",
                border: "1px solid rgba(239,68,68,0.08)",
                borderRadius: 12,
                opacity: vis.includes(i) ? 1 : 0,
                transform: vis.includes(i) ? "translateY(0)" : "translateY(10px)",
                transition: `all 0.45s cubic-bezier(0.22,1,0.36,1) ${i * 0.07}s`,
              }}>
                <span style={{ color: "#EF4444", flexShrink: 0 }}>◇</span>
                <span>{arg}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* VERDICT */}
      <div className="gc gc-gold" style={{ padding: "32px 36px" }}>
        <div className="gc-glow" style={{ width: 300, height: 200, background: "#C9A84C", bottom: -60, left: "40%" }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: "rgba(255,255,255,0.85)", marginBottom: 6 }}>Arbitrator Verdict</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.28)", fontFamily: "var(--font-data), monospace", maxWidth: 420 }}>
              Weighing 8 signal layers with historical accuracy scores and macro context. Bull case carries stronger signal confluence.
            </div>
          </div>
          <div style={{ textAlign: "right", flexShrink: 0, marginLeft: 24 }}>
            <div style={{ fontFamily: "var(--font-data), monospace", fontSize: 56, fontWeight: 800, color: "#F0CC6E", lineHeight: 1 }}>6.2</div>
            <div style={{ fontSize: 9, color: "rgba(255,255,255,0.25)", letterSpacing: "0.15em", textTransform: "uppercase", marginTop: 4, fontFamily: "var(--font-data), monospace" }}>
              Conviction Score
            </div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span style={{ fontSize: 10, color: "#EF4444", fontFamily: "var(--font-data), monospace", flexShrink: 0, fontWeight: 700 }}>BEAR</span>
          <div className="debate-track flex-1">
            <div className="debate-fill" style={{ width: `${score}%` }} />
          </div>
          <span style={{ fontSize: 10, color: "#22C55E", fontFamily: "var(--font-data), monospace", flexShrink: 0, fontWeight: 700 }}>BULL</span>
        </div>
        <div style={{ textAlign: "center", marginTop: 10, fontSize: 10, color: "#C9A84C", fontFamily: "var(--font-data), monospace", letterSpacing: "0.08em" }}>
          Moderately Bullish — 62/100 · Recommended Action: <span style={{ color: "#F0CC6E" }}>ACCUMULATE on dips</span>
        </div>
      </div>
    </div>
  );
}
