"use client";
import { useState, useEffect } from "react";

const STOCKS = [
  { sym: "ZOMATO",     sector: "Quick Commerce", score: 7.8, chg: "+3.4%", up: true,  bull: 68 },
  { sym: "DIXON TECH", sector: "Electronics",    score: 8.4, chg: "+1.2%", up: true,  bull: 82 },
  { sym: "POLYCAB",    sector: "Cables & Wire",  score: 7.9, chg: "+2.1%", up: true,  bull: 74 },
  { sym: "BHEL",       sector: "Capital Goods",  score: 6.5, chg: "+0.8%", up: true,  bull: 57 },
  { sym: "RELIANCE",   sector: "Conglomerate",   score: 6.9, chg: "-0.4%", up: false, bull: 61 },
  { sym: "TATA POWER", sector: "Renewables",     score: 7.3, chg: "+1.9%", up: true,  bull: 71 },
];

const SIGNALS = [
  { name: "Technical",   val: 78, color: "#C9A84C" },
  { name: "FII Flow",    val: 65, color: "#A87FD4" },
  { name: "Sentiment",   val: 82, color: "#22C55E" },
  { name: "Earnings",    val: 71, color: "#F0CC6E" },
  { name: "Insider",     val: 88, color: "#22C55E" },
  { name: "Volume",      val: 55, color: "#EF4444" },
  { name: "Smart$",      val: 67, color: "#C9A84C" },
  { name: "Macro",       val: 60, color: "#A87FD4" },
];

const HEAT = [
  { n: "Tech",   v: 82, c: "rgba(34,197,94,0.45)"  },
  { n: "Bank",   v: 48, c: "rgba(239,68,68,0.38)"  },
  { n: "FMCG",   v: 65, c: "rgba(201,168,76,0.35)" },
  { n: "Pharma", v: 71, c: "rgba(34,197,94,0.32)"  },
  { n: "Auto",   v: 38, c: "rgba(239,68,68,0.4)"   },
  { n: "Def",    v: 88, c: "rgba(34,197,94,0.55)"  },
  { n: "Realty", v: 55, c: "rgba(201,168,76,0.28)" },
  { n: "Metal",  v: 43, c: "rgba(239,68,68,0.3)"   },
  { n: "Power",  v: 77, c: "rgba(34,197,94,0.4)"   },
  { n: "IT",     v: 74, c: "rgba(34,197,94,0.38)"  },
  { n: "PSU",    v: 62, c: "rgba(201,168,76,0.32)" },
  { n: "Media",  v: 30, c: "rgba(239,68,68,0.28)"  },
];

// SVG radar points (6-axis, values normalised to polygon)
function radarPoly(vals: number[]) {
  const cx = 130, cy = 130, R = 90;
  return vals.map((v, i) => {
    const angle = (i * Math.PI * 2) / vals.length - Math.PI / 2;
    const r = (v / 100) * R;
    return `${cx + Math.cos(angle) * r},${cy + Math.sin(angle) * r}`;
  }).join(" ");
}

export default function IntelligencePage() {
  const [anim, setAnim] = useState(false);
  useEffect(() => { const t = setTimeout(() => setAnim(true), 300); return () => clearTimeout(t); }, []);

  const radarVals = [78, 65, 82, 71, 88, 55, 67, 60]; // 8 signals mapped to 6 axes (avg last 2)

  return (
    <div className="db-page">
      {/* ── HEADER ── */}
      <div className="mb-36">
        <div className="section-pill">◈ Intelligence Overview · ZOMATO.NS Selected</div>
        <h1 className="db-page-title">
          Total <span className="db-cursive">Conviction</span>
        </h1>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.3)", letterSpacing: "0.03em", marginTop: 8, maxWidth: 520 }}>
          12 AI Agents · 500 NSE Stocks · 8-Signal Confluence · Live Since Market Open
        </p>
      </div>

      {/* ── KPI STRIP ── */}
      <div className="kpi-grid mb-28">
        {[
          { l: "True XIRR",       v: "+24.7%",   c: "#22C55E",  g: "#22C55E"  },
          { l: "Net Worth",       v: "₹24.52L",  c: "#F0CC6E",  g: "#C9A84C"  },
          { l: "Avg Conviction",  v: "7.8/10",   c: "#C9A84C",  g: "#C9A84C"  },
          { l: "Active Debates",  v: "4 Live",   c: "#A87FD4",  g: "#7B5EA7"  },
        ].map(k => (
          <div key={k.l} className="kpi-card">
            <div className="kpi-glow" style={{ background: k.g }} />
            <div className="kpi-label">{k.l}</div>
            <div className="kpi-value" style={{ color: k.c }}>{k.v}</div>
            <div className="kpi-sub">Updated 2 min ago</div>
          </div>
        ))}
      </div>

      {/* ── ROW 1: Watchlist + Radar ── */}
      <div className="grid-2-1 mb-20">

        {/* Watchlist */}
        <div className="gc gc-gold" style={{ overflow: "hidden" }}>
          <div className="gc-glow" style={{ width: 220, height: 220, background: "#C9A84C", top: -60, right: -40 }} />
          <div className="gc-header">
            <div>
              <div className="gc-title">Watchlist Conviction</div>
              <div className="gc-sub">NSE Watch · 6 active positions</div>
            </div>
            <span className="badge badge-green">
              <span className="sig-dot sig-dot-live" style={{ width: 5, height: 5, background: "#22C55E" }} />
              Live
            </span>
          </div>
          {STOCKS.map((s, i) => (
            <div key={s.sym}
              style={{
                display: "flex", alignItems: "center", gap: 14,
                padding: "13px 26px",
                borderBottom: i < STOCKS.length - 1 ? "1px solid rgba(255,255,255,0.035)" : "none",
                transition: "background 0.2s", cursor: "pointer",
              }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.02)")}
              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
            >
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.18)", fontFamily: "var(--font-data), monospace", width: 20 }}>
                {String(i+1).padStart(2,"0")}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.82)", fontFamily: "var(--font-data), monospace" }}>{s.sym}</div>
                <div style={{ fontSize: 9, color: "rgba(255,255,255,0.25)", marginTop: 1, fontFamily: "var(--font-data), monospace" }}>{s.sector}</div>
              </div>
              {/* Bar */}
              <div style={{ width: 90 }}>
                <div style={{ fontSize: 8, color: "rgba(255,255,255,0.2)", marginBottom: 4, fontFamily: "var(--font-data), monospace" }}>
                  Bull {s.bull}%
                </div>
                <div className="bar-track">
                  <div className="bar-fill" style={{ width: anim ? `${s.bull}%` : "0%", background: `linear-gradient(90deg,#EF4444,#C9A84C ${s.bull}%,#22C55E)` }} />
                </div>
              </div>
              <div style={{ width: 52, textAlign: "right", fontFamily: "var(--font-data), monospace", fontSize: 11, color: s.up ? "#22C55E" : "#EF4444" }}>{s.chg}</div>
              <div style={{ width: 38, textAlign: "right", fontFamily: "var(--font-data), monospace", fontSize: 20, fontWeight: 700, color: "#F0CC6E" }}>{s.score}</div>
            </div>
          ))}
        </div>

        {/* 8-Signal Radar */}
        <div className="gc gc-violet" style={{ padding: "24px" }}>
          <div className="gc-glow" style={{ width: 180, height: 180, background: "#7B5EA7", top: -40, right: -40 }} />
          <div className="gc-title mb-4">Signal Confluence</div>
          <div className="gc-sub mb-16">ZOMATO.NS · 8 layers fused</div>

          {/* SVG Radar */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
            <svg viewBox="0 0 260 260" width="200" height="200">
              <defs>
                <radialGradient id="rg1" cx="50%" cy="50%">
                  <stop offset="0%"   stopColor="#C9A84C" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#7B5EA7" stopOpacity="0.06" />
                </radialGradient>
              </defs>
              {/* Grid rings */}
              {[1,2,3].map(r => (
                <polygon key={r}
                  points={[0,1,2,3,4,5].map(i => {
                    const a = (i*Math.PI*2)/6 - Math.PI/2;
                    const dist = r * 30;
                    return `${130+Math.cos(a)*dist},${130+Math.sin(a)*dist}`;
                  }).join(" ")}
                  fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1"
                />
              ))}
              {/* Axes */}
              {[0,1,2,3,4,5].map(i => {
                const a = (i*Math.PI*2)/6 - Math.PI/2;
                return <line key={i} x1="130" y1="130" x2={130+Math.cos(a)*90} y2={130+Math.sin(a)*90} stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>;
              })}
              {/* Data polygon */}
              <polygon points={radarPoly([78,82,88,65,67,60])} fill="url(#rg1)" stroke="#C9A84C" strokeWidth="1.5" opacity="0.9"/>
              {/* Labels */}
              {["Technical","Sentiment","Insider","FII","Smart$","Macro"].map((l,i) => {
                const a = (i*Math.PI*2)/6 - Math.PI/2;
                return <text key={l} x={130+Math.cos(a)*108} y={130+Math.sin(a)*108+4} textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="8.5" fontFamily="monospace">{l}</text>;
              })}
              {/* Centre */}
              <text x="130" y="124" textAnchor="middle" fill="#F0CC6E" fontSize="26" fontWeight="700" fontFamily="monospace">7.8</text>
              <text x="130" y="140" textAnchor="middle" fill="rgba(255,255,255,0.22)" fontSize="8" fontFamily="monospace">Conviction Score</text>
            </svg>
          </div>

          {/* Signal bars */}
          <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
            {SIGNALS.map(s => (
              <div key={s.name} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 62, fontSize: 9, color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-data), monospace", flexShrink: 0 }}>{s.name}</div>
                <div className="bar-track flex-1">
                  <div className="bar-fill" style={{ width: anim ? `${s.val}%` : "0%", background: s.color, transitionDelay: "0.15s" }} />
                </div>
                <div style={{ width: 26, textAlign: "right", fontSize: 9, color: s.color, fontFamily: "var(--font-data), monospace", flexShrink: 0 }}>{s.val}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── ROW 2: Agent Flow + Heat Map + System ── */}
      <div className="grid-3 mb-20">

        {/* LangGraph Pipeline */}
        <div className="gc" style={{ padding: "24px" }}>
          <div className="gc-title mb-4">Agent Pipeline</div>
          <div className="gc-sub mb-20">LangGraph · 12 agents</div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
            {[
              { t: "User Query",      c: "fn-gold",   extra: "" },
              null,
              { t: "Orchestrator 🧠", c: "fn-gold",   extra: "" },
              null,
              "SPLIT",
              null,
              { t: "Signal Engine",   c: "fn-violet", extra: "" },
              null,
              { t: "Arbitrator ⚖",   c: "fn-gold",   extra: "" },
              null,
              { t: "◆ Conviction",    c: "fn-gold",   extra: "" },
            ].map((item, i) => {
              if (item === null) return <div key={i} className="fn-arr">↓</div>;
              if (item === "SPLIT") return (
                <div key={i} style={{ display: "flex", gap: 6, width: "100%" }}>
                  <div className="fn fn-bull" style={{ flex: 1, fontSize: 10 }}>🐂 Bull</div>
                  <div className="fn fn-arr">+</div>
                  <div className="fn" style={{ flex: 1, fontSize: 10, background: "rgba(239,68,68,0.08)", borderColor: "rgba(239,68,68,0.25)", color: "#EF4444" }}>🐻 Bear</div>
                </div>
              );
              return <div key={i} className={`fn ${item.c}`} style={{ width: "100%", fontSize: 11 }}>{item.t}</div>;
            })}
          </div>
        </div>

        {/* Sector Heat Map */}
        <div className="gc" style={{ padding: "24px" }}>
          <div className="gc-title mb-4">Sector Heat Map</div>
          <div className="gc-sub mb-16">NSE · Conviction Score per sector</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 4 }}>
            {HEAT.map(h => (
              <div key={h.n} className="heat" style={{ background: h.c }}>
                <div style={{ fontSize: 8, color: "rgba(255,255,255,0.65)", fontFamily: "var(--font-data), monospace" }}>{h.n}</div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "rgba(255,255,255,0.9)", fontFamily: "var(--font-data), monospace", marginTop: 2 }}>{h.v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* System Health */}
        <div className="gc" style={{ padding: "24px" }}>
          <div className="gc-title mb-4">System Health</div>
          <div className="gc-sub mb-20">Real-time agent status</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[
              { name: "Signal Engine",  status: "Active",     color: "#22C55E", load: 74 },
              { name: "Debate Agents",  status: "4 Running",  color: "#22C55E", load: 45 },
              { name: "Vector Memory",  status: "Synced",     color: "#22C55E", load: 30 },
              { name: "NSE Feed",       status: "Live",       color: "#C9A84C", load: 88 },
              { name: "FinBERT NLP",    status: "Processing", color: "#A87FD4", load: 61 },
              { name: "Radar Agent",    status: "Scanning",   color: "#22C55E", load: 92 },
            ].map(s => (
              <div key={s.name}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                    <span className="sig-dot sig-dot-live" style={{ width: 5, height: 5, background: s.color }} />
                    <span style={{ fontSize: 10, color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-data), monospace" }}>{s.name}</span>
                  </div>
                  <span style={{ fontSize: 9, color: s.color, fontFamily: "var(--font-data), monospace" }}>{s.status}</span>
                </div>
                <div className="bar-track">
                  <div className="bar-fill" style={{ width: anim ? `${s.load}%` : "0%", background: s.color, opacity: 0.55, transitionDelay: "0.3s" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── ROW 3: Feature Highlights from Landing ── */}
      <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.15)", marginBottom: 16, fontFamily: "var(--font-data), monospace" }}>
          Platform Capabilities
        </div>
      </div>
      <div className="grid-4">
        {[
          { icon: "⚔", title: "Bull vs Bear Debate", desc: "Two AI agents argue every stock. Arbitrator scores conviction.", color: "#C9A84C" },
          { icon: "◉", title: "Opportunity Radar",   desc: "Background agent scans 500 NSE stocks every 15 minutes.", color: "#A87FD4" },
          { icon: "◎", title: "Portfolio X-Ray",     desc: "True XIRR, correlation matrix, concentration & stress tests.", color: "#22C55E" },
          { icon: "⬡", title: "12 AI Agents",        desc: "LangGraph orchestration. Groq + Gemini. Qdrant memory.", color: "#F0CC6E" },
        ].map(f => (
          <div key={f.title} className="gc" style={{ padding: "22px", cursor: "default" }}>
            <div className="gc-glow" style={{ width: 120, height: 120, background: f.color, top: -30, right: -30 }} />
            <div style={{
              width: 40, height: 40, borderRadius: 12,
              background: `${f.color}18`, border: `1px solid ${f.color}30`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 18, marginBottom: 14, color: f.color,
            }}>
              {f.icon}
            </div>
            <div style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.82)", marginBottom: 8, letterSpacing: "0.01em" }}>{f.title}</div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", lineHeight: 1.6 }}>{f.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
