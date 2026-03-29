"use client";
import { useState } from "react";

const PRE = {
  date: "Monday, 29 March 2026",
  time: "Generated at 08:30 AM IST",
  global: [
    { item: "US Futures (S&P 500)", val: "+0.3%",  note: "Trading higher on Fed pause hopes",              c: "#22C55E" },
    { item: "Nikkei 225",          val: "+1.1%",  note: "Yen weakened — export stocks surge",             c: "#22C55E" },
    { item: "Hang Seng",           val: "-0.8%",  note: "China property drag continues",                  c: "#EF4444" },
    { item: "Crude Oil (Brent)",   val: "$81.2",  note: "OPEC+ cut rumours; slight inflation risk",       c: "#F0CC6E" },
    { item: "Gold",                val: "$2,280", note: "Safe haven demand ahead of US CPI data",         c: "#F0CC6E" },
    { item: "Dollar Index (DXY)",  val: "103.8",  note: "Slightly weaker — positive for EMs incl India", c: "#22C55E" },
  ],
  india: [
    "FII net buyers ₹4,840Cr yesterday — 6th consecutive session. Strong positive signal for today's open.",
    "RBI MPC minutes release today at 2 PM — potential market mover. Watch for hawkish vs dovish tone.",
    "Q4 earnings season begins: Infosys, TCS, HDFC Bank results this week. Markets may be range-bound.",
    "Rupee at 83.2/$: Stable. DXY weakness may support INR further today.",
  ],
  events: [
    { time: "09:15", event: "NSE/BSE Market Open",                 type: "Market",     c: "#C9A84C" },
    { time: "10:00", event: "India PMI Manufacturing (March Est)",  type: "Macro",      c: "#A87FD4" },
    { time: "14:00", event: "RBI MPC Minutes Release",             type: "RBI",        c: "#EF4444" },
    { time: "15:30", event: "F&O Expiry Settlement",               type: "FnO",        c: "#F0CC6E" },
    { time: "16:30", event: "NSE Closing Price Fix",               type: "Market",     c: "#C9A84C" },
  ],
  portfolio: [
    { sym: "HDFC BANK", news: "HSBC upgrades to 'Overweight' with TP ₹1,890. +2% pre-market signal.", positive: true  },
    { sym: "ZOMATO",    news: "Blinkit orders hit new record. UBS raises target to ₹285.",             positive: true  },
    { sym: "RELIANCE",  news: "O2C margins under pressure. Reuters report on delayed project.",         positive: false },
  ],
  radar: [
    "HAL — FII accumulation + DoD contract worth ₹8,200Cr. Score: 9.1",
    "SUN PHARMA — FDA approval for key US generic + bullish chart. Score: 8.6",
    "BHEL — Energy Ministry order pipeline at 5-year high. Score: 7.8",
  ],
};

export default function BriefingPage() {
  const [tab, setTab] = useState<"pre" | "post">("pre");

  return (
    <div className="db-page">
      <div className="mb-36">
        <div className="section-pill">📰 Pre/Post Market Briefing · Daily Intelligence</div>
        <h1 className="db-page-title">
          Your Daily <span className="db-cursive">Briefing</span>
        </h1>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.28)", marginTop: 8 }}>
          Auto-generated at 8:30 AM (Pre) and 4:30 PM (Post) · Portfolio-aware · AI analysed
        </p>
      </div>

      {/* Tab switch */}
      <div style={{ display: "flex", gap: 8, marginBottom: 28 }}>
        {(["pre", "post"] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            padding: "10px 28px", borderRadius: 100, fontSize: 11,
            letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "var(--font-data), monospace",
            background: tab === t ? "linear-gradient(135deg,#C9A84C,#8B6E2A)" : "rgba(255,255,255,0.04)",
            border: tab === t ? "none" : "1px solid rgba(255,255,255,0.1)",
            color: tab === t ? "#080808" : "rgba(255,255,255,0.45)",
            cursor: "pointer", fontWeight: tab === t ? 700 : 400,
            transition: "all 0.2s ease",
          }}>
            {t === "pre" ? "☀ Pre-Market (8:30 AM)" : "🌙 Post-Market (4:30 PM)"}
          </button>
        ))}
        <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
          <button style={{ padding: "10px 20px", borderRadius: 100, fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "var(--font-data), monospace", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.4)", cursor: "pointer" }}>
            Share ↗
          </button>
        </div>
      </div>

      {tab === "pre" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {/* Date header */}
          <div style={{ padding: "16px 24px", background: "rgba(201,168,76,0.06)", border: "1px solid rgba(201,168,76,0.15)", borderRadius: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 16, fontWeight: 700, color: "rgba(255,255,255,0.85)", fontFamily: "var(--font-playfair), serif" }}>{PRE.date}</div>
              <div style={{ fontSize: 10, color: "rgba(201,168,76,0.6)", fontFamily: "var(--font-data), monospace", marginTop: 2 }}>{PRE.time}</div>
            </div>
            <span className="badge badge-gold">Pre-Market</span>
          </div>

          <div className="grid-2">
            {/* Global Cues */}
            <div className="gc" style={{ padding: "22px 26px" }}>
              <div className="gc-title mb-4">🌐 Global Overnight Cues</div>
              <div className="gc-sub mb-16">Key markets & macro indicators</div>
              {PRE.global.map(g => (
                <div key={g.item} style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.035)", gap: 12 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.7)", fontFamily: "var(--font-data), monospace" }}>{g.item}</div>
                    <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", marginTop: 2 }}>{g.note}</div>
                  </div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: g.c, fontFamily: "var(--font-data), monospace", flexShrink: 0 }}>{g.val}</div>
                </div>
              ))}
            </div>

            {/* Today's Events */}
            <div className="gc" style={{ padding: "22px 26px" }}>
              <div className="gc-title mb-4">📅 Today&apos;s Key Events</div>
              <div className="gc-sub mb-16">Results · Macro · F&O</div>
              {PRE.events.map(e => (
                <div key={e.event} style={{ display: "flex", alignItems: "center", gap: 14, padding: "10px 0", borderBottom: "1px solid rgba(255,255,255,0.035)" }}>
                  <div style={{ fontFamily: "var(--font-data), monospace", fontSize: 11, color: "rgba(255,255,255,0.3)", flexShrink: 0, width: 42 }}>{e.time}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.7)" }}>{e.event}</div>
                  </div>
                  <span className="badge badge-gold" style={{ fontSize: 8 }}>{e.type}</span>
                </div>
              ))}
            </div>
          </div>

          {/* India Impact */}
          <div className="gc gc-gold" style={{ padding: "22px 26px" }}>
            <div className="gc-glow" style={{ width: 200, height: 150, background: "#C9A84C", top: -40, right: -40 }} />
            <div className="gc-title mb-16">🇮🇳 India Impact Analysis</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {PRE.india.map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 12, padding: "12px 14px", background: "rgba(255,255,255,0.02)", borderRadius: 10 }}>
                  <span style={{ color: "#C9A84C", flexShrink: 0, marginTop: 1 }}>◆</span>
                  <span style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", lineHeight: 1.65 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid-2">
            {/* Portfolio Overnight */}
            <div className="gc" style={{ padding: "22px 26px" }}>
              <div className="gc-title mb-16">📂 Your Portfolio — Overnight News</div>
              {PRE.portfolio.map(p => (
                <div key={p.sym} style={{ padding: "14px", marginBottom: 8, background: `${p.positive ? "rgba(34,197,94" : "rgba(239,68,68"},0.04)`, border: `1px solid ${p.positive ? "rgba(34,197,94" : "rgba(239,68,68"},0.1)`, borderRadius: 12 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.78)", fontFamily: "var(--font-data), monospace", marginBottom: 5 }}>{p.sym}</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.42)", lineHeight: 1.6 }}>{p.news}</div>
                </div>
              ))}
            </div>

            {/* Radar picks */}
            <div className="gc gc-violet" style={{ padding: "22px 26px" }}>
              <div className="gc-glow" style={{ width: 150, height: 150, background: "#7B5EA7", top: -30, right: -30 }} />
              <div className="gc-title mb-4">◉ Radar&apos;s Top 3 Opportunities</div>
              <div className="gc-sub mb-16">Signals detected overnight</div>
              {PRE.radar.map((r, i) => (
                <div key={i} style={{ padding: "12px 14px", marginBottom: 8, background: "rgba(255,255,255,0.025)", borderRadius: 10, display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <span style={{ color: "#A87FD4", flexShrink: 0, marginTop: 1, fontSize: 12 }}>{i + 1}.</span>
                  <span style={{ fontSize: 11, color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>{r}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === "post" && (
        <div className="gc" style={{ padding: "48px", textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🌙</div>
          <div style={{ fontSize: 18, fontWeight: 600, color: "rgba(255,255,255,0.6)", marginBottom: 8 }}>Post-Market Briefing</div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.3)" }}>Generated daily at 4:30 PM IST after market close. Check back after market closes.</div>
        </div>
      )}
    </div>
  );
}
