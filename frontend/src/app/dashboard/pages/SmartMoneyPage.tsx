"use client";
import { useState, useEffect } from "react";

const SECTORS = [
  { n: "Banking",      fii:  +2840, dii:  -420, net: +2420, stocks: ["HDFC Bank","ICICI","Kotak"],    c: "#22C55E", intensity: 0.80 },
  { n: "IT",           fii:  +1260, dii:  +380, net: +1640, stocks: ["Infosys","HCL","Wipro"],        c: "#22C55E", intensity: 0.55 },
  { n: "Auto",         fii:   -840, dii:  +220, net:  -620, stocks: ["Tata Motors","M&M","Maruti"],   c: "#EF4444", intensity: 0.40 },
  { n: "FMCG",         fii:   -320, dii:  +640, net:  +320, stocks: ["HUL","ITC","Nestle"],           c: "#22C55E", intensity: 0.22 },
  { n: "Pharma",       fii:  +1820, dii:  +180, net: +2000, stocks: ["Sun Pharma","Cipla","Dr Reddy"],c: "#22C55E", intensity: 0.70 },
  { n: "Defence",      fii:   +640, dii:  +980, net: +1620, stocks: ["HAL","BEL","Bharat Forge"],     c: "#22C55E", intensity: 0.72 },
  { n: "Realty",       fii:   -280, dii:   -60, net:  -340, stocks: ["DLF","Godrej Prop","Sobha"],    c: "#EF4444", intensity: 0.30 },
  { n: "Power",        fii:   +580, dii:  +420, net: +1000, stocks: ["Adani Power","NTPC","Tata Pwr"],c: "#22C55E", intensity: 0.48 },
];

const TOP_STOCKS = [
  { sym: "HDFC BANK",   fii: "+₹1,240Cr", dii: "-₹120Cr", ins: "+0.2%", score: 64, trend: "accumulate" },
  { sym: "SUN PHARMA",  fii: "+₹980Cr",   dii: "+₹280Cr", ins: "+0.5%", score: 88, trend: "strong buy"  },
  { sym: "HAL",         fii: "+₹640Cr",   dii: "+₹320Cr", ins: "+1.1%", score: 92, trend: "strong buy"  },
  { sym: "TATA MOTORS", fii: "-₹420Cr",   dii: "+₹180Cr", ins: "-0.3%", score: 38, trend: "distribute"  },
  { sym: "DLF",         fii: "-₹280Cr",   dii: "-₹60Cr",  ins: "-0.1%", score: 29, trend: "exit"        },
];

export default function SmartMoneyPage() {
  const [active, setActive] = useState(0);
  const [anim,   setAnim]   = useState(false);
  useEffect(() => { const t = setTimeout(() => setAnim(true), 300); return () => clearTimeout(t); }, []);

  return (
    <div className="db-page">
      <div className="mb-36">
        <div className="section-pill">💹 Smart Money Intelligence · FII/DII Flows</div>
        <h1 className="db-page-title">
          Where Is the <span className="db-cursive">Smart Money</span> Going?
        </h1>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.28)", marginTop: 8 }}>
          FII + DII + Insider + Mutual Fund flows · Updated every 15 min · NSE + BSE
        </p>
      </div>

      {/* FII/DII Day Summary */}
      <div className="kpi-grid mb-28">
        {[
          { l: "FII Net Today",  v: "+₹4,840Cr", c: "#22C55E", g: "#22C55E" },
          { l: "DII Net Today",  v: "+₹2,120Cr", c: "#22C55E", g: "#C9A84C" },
          { l: "Net Combined",   v: "+₹6,960Cr", c: "#F0CC6E", g: "#C9A84C" },
          { l: "Consecutive FII Buy", v: "6 Days", c: "#A87FD4", g: "#7B5EA7" },
        ].map(k => (
          <div key={k.l} className="kpi-card">
            <div className="kpi-glow" style={{ background: k.g }} />
            <div className="kpi-label">{k.l}</div>
            <div className="kpi-value" style={{ color: k.c }}>{k.v}</div>
            <div className="kpi-sub">As of 15:30 IST · 29 Mar 2026</div>
          </div>
        ))}
      </div>

      <div className="grid-2-1 mb-20">
        {/* Sector Heatmap */}
        <div className="gc gc-gold" style={{ padding: "24px" }}>
          <div className="gc-glow" style={{ width: 200, height: 200, background: "#C9A84C", top: -60, right: -60 }} />
          <div className="gc-title mb-4">Sector Flow Heatmap</div>
          <div className="gc-sub mb-20">FII net flow · Green = buying · Red = selling</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8 }}>
            {SECTORS.map(s => (
              <div key={s.n}
                onClick={() => setActive(SECTORS.indexOf(s))}
                style={{
                  padding: "16px 12px",
                  borderRadius: 12,
                  background: `${s.c}${Math.round(s.intensity * 40).toString(16).padStart(2,"0")}`,
                  border: `1px solid ${s.c}22`,
                  cursor: "pointer",
                  textAlign: "center",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.06)")}
                onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
              >
                <div style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,255,255,0.75)", marginBottom: 4, fontFamily: "var(--font-data), monospace" }}>{s.n}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: s.c, fontFamily: "var(--font-data), monospace" }}>
                  {s.net > 0 ? "+" : ""}{(s.net/100).toFixed(1)}Cr
                </div>
              </div>
            ))}
          </div>

          {/* Selected sector detail */}
          <div style={{ marginTop: 20, padding: "16px", background: "rgba(255,255,255,0.025)", borderRadius: 12, border: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.8)", marginBottom: 10 }}>
              {SECTORS[active].n} — Top Stocks Being {SECTORS[active].net > 0 ? "Bought" : "Sold"}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              {SECTORS[active].stocks.map(s => (
                <span key={s} className="badge badge-gold" style={{ fontSize: 9 }}>{s}</span>
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 12 }}>
              {[["FII", SECTORS[active].fii], ["DII", SECTORS[active].dii]].map(([t, v]) => (
                <div key={t as string}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                    <span style={{ fontSize: 9, color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-data), monospace" }}>{t}</span>
                    <span style={{ fontSize: 9, color: (v as number) > 0 ? "#22C55E" : "#EF4444", fontFamily: "var(--font-data), monospace", fontWeight: 700 }}>
                      {(v as number) > 0 ? "+" : ""}{v}Cr
                    </span>
                  </div>
                  <div className="bar-track">
                    <div className="bar-fill" style={{ width: anim ? `${Math.min(Math.abs(v as number) / 40, 100)}%` : "0%", background: (v as number) > 0 ? "#22C55E" : "#EF4444" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Smart Money Scores */}
        <div className="gc gc-violet" style={{ padding: "22px", overflow: "hidden" }}>
          <div className="gc-glow" style={{ width: 160, height: 160, background: "#7B5EA7", top: -40, right: -40 }} />
          <div className="gc-title mb-4">Smart Money Score</div>
          <div className="gc-sub mb-16">FII + MF + Insider composite score</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {TOP_STOCKS.map(s => (
              <div key={s.sym} style={{ padding: "14px 16px", background: "rgba(255,255,255,0.025)", borderRadius: 12, border: "1px solid rgba(255,255,255,0.05)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.82)", fontFamily: "var(--font-data), monospace" }}>{s.sym}</div>
                    <div style={{ fontSize: 9, color: s.score > 60 ? "#22C55E" : "#EF4444", fontFamily: "var(--font-data), monospace", marginTop: 2, textTransform: "uppercase", letterSpacing: "0.06em" }}>
                      {s.trend}
                    </div>
                  </div>
                  <div style={{ fontFamily: "var(--font-data), monospace", fontSize: 24, fontWeight: 800, color: s.score > 60 ? "#22C55E" : "#EF4444" }}>{s.score}</div>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  {[["FII", s.fii], ["DII", s.dii], ["Ins", s.ins]].map(([t, v]) => (
                    <div key={t as string} style={{ flex: 1, fontSize: 8, fontFamily: "var(--font-data), monospace", textAlign: "center" }}>
                      <div style={{ color: "rgba(255,255,255,0.2)", marginBottom: 2 }}>{t}</div>
                      <div style={{ color: (v as string).startsWith("+") ? "#22C55E" : "#EF4444", fontWeight: 700 }}>{v}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* You vs Smart Money */}
      <div className="gc" style={{ padding: "28px 32px" }}>
        <div className="gc-glow" style={{ width: 300, height: 200, background: "#C9A84C", bottom: -60, right: "30%" }} />
        <div className="gc-title mb-4">🔥 Smart Money vs You  <span style={{ fontSize: 10, color: "#C9A84C", fontFamily: "var(--font-data), monospace", fontWeight: 400, marginLeft: 8 }}>USP Feature</span></div>
        <div className="gc-sub mb-20">Where retail is overweight vs where institutions are accumulating</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {[
            { label: "Retail FOMO Zone",      stocks: "ZOMATO, PAYTM, NYKAA",  desc: "High retail holding, low FII interest",    c: "#EF4444", icon: "⚠" },
            { label: "Smart Money Alpha",     stocks: "HAL, SUN PHARMA, BEL",   desc: "FII accumulating, low retail awareness",   c: "#22C55E", icon: "◆" },
            { label: "Convergence Zone",      stocks: "HDFC BANK, INFOSYS",     desc: "Both retail & FII aligned — high signal",  c: "#C9A84C", icon: "◎" },
          ].map(z => (
            <div key={z.label} style={{ padding: "20px", background: `${z.c}08`, border: `1px solid ${z.c}20`, borderRadius: 14 }}>
              <div style={{ fontSize: 16, marginBottom: 8 }}>{z.icon}</div>
              <div style={{ fontSize: 11, fontWeight: 700, color: z.c, marginBottom: 6, letterSpacing: "0.03em" }}>{z.label}</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.55)", fontFamily: "var(--font-data), monospace", marginBottom: 8 }}>{z.stocks}</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", lineHeight: 1.6 }}>{z.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
