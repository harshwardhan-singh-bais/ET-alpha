"use client";
import { useState, useEffect } from "react";

const H = [
  { sym: "RELIANCE",   sector: "Conglomerate", val: 642000, wt: 26, xirr: 18.4, c: "#EF4444", color: "rgba(34,197,94,0.4)" },
  { sym: "HDFC BANK",  sector: "Banking",      val: 389000, wt: 16, xirr: 11.2, c: "#EF4444", color: "rgba(239,68,68,0.32)" },
  { sym: "INFOSYS",    sector: "IT",           val: 318000, wt: 13, xirr: 22.1, c: "#22C55E", color: "rgba(201,168,76,0.32)" },
  { sym: "TATA MOTORS",sector: "Auto",         val: 276000, wt: 11, xirr: 31.4, c: "#22C55E", color: "rgba(123,94,167,0.32)" },
  { sym: "ZOMATO",     sector: "Quick Comm",   val: 220000, wt:  9, xirr: 44.7, c: "#22C55E", color: "rgba(34,197,94,0.24)" },
  { sym: "KOTAK BANK", sector: "Banking",      val: 195000, wt:  8, xirr:  9.8, c: "#EF4444", color: "rgba(239,68,68,0.22)" },
];

export default function PortfolioPage() {
  const [anim, setAnim] = useState(false);
  useEffect(() => { const t = setTimeout(() => setAnim(true), 300); return () => clearTimeout(t); }, []);

  return (
    <div className="db-page">
      <div className="mb-36">
        <div className="section-pill">◎ Portfolio X-Ray · True DNA Analysis</div>
        <h1 className="db-page-title">
          Your Portfolio&apos;s <span className="db-cursive">DNA</span>
        </h1>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.28)", marginTop: 8 }}>Holdings analysis · Correlation matrix · Stress test · AI rebalancing</p>
      </div>

      {/* KPI */}
      <div className="kpi-grid mb-28">
        {[
          { l: "Net Worth",    v: "₹24.52L", c: "#F0CC6E", g: "#C9A84C" },
          { l: "True XIRR",   v: "+24.7%",  c: "#22C55E", g: "#22C55E" },
          { l: "vs Nifty",    v: "+10.5%",  c: "#22C55E", g: "#22C55E" },
          { l: "Sharpe",      v: "1.84",    c: "#A87FD4", g: "#7B5EA7" },
        ].map(k => (
          <div key={k.l} className="kpi-card">
            <div className="kpi-glow" style={{ background: k.g }} />
            <div className="kpi-label">{k.l}</div>
            <div className="kpi-value" style={{ color: k.c }}>{k.v}</div>
            <div className="kpi-sub">Calculated on true cash flows</div>
          </div>
        ))}
      </div>

      <div className="grid-1-2 mb-20">
        {/* Left: Holdings table */}
        <div className="gc gc-gold" style={{ overflow: "hidden" }}>
          <div className="gc-glow" style={{ width: 200, height: 200, background: "#C9A84C", top: -50, right: -50 }} />
          <div className="gc-header">
            <div><div className="gc-title">Holdings</div><div className="gc-sub">6 positions · ₹24.52L</div></div>
            <span className="badge badge-gold">6 Active</span>
          </div>
          {H.map((h, i) => (
            <div key={h.sym} style={{
              display: "flex", alignItems: "center", gap: 12,
              padding: "13px 26px",
              borderBottom: i < H.length - 1 ? "1px solid rgba(255,255,255,0.035)" : "none",
              cursor: "pointer", transition: "background 0.2s",
            }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.02)")}
              onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
            >
              <div style={{ width: 10, height: 10, borderRadius: 3, background: h.color, flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.78)", fontFamily: "var(--font-data), monospace" }}>{h.sym}</div>
                <div style={{ fontSize: 9, color: "rgba(255,255,255,0.22)", fontFamily: "var(--font-data), monospace" }}>{h.sector}</div>
              </div>
              <div style={{ width: 70 }}>
                <div className="bar-track">
                  <div className="bar-fill" style={{ width: anim ? `${h.wt * 3.5}%` : "0%", background: "#C9A84C", opacity: 0.65 }} />
                </div>
              </div>
              <div style={{ width: 28, fontSize: 10, color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-data), monospace", textAlign: "right" }}>{h.wt}%</div>
              <div style={{ width: 48, textAlign: "right", fontSize: 11, fontWeight: 700, color: h.xirr > 15 ? "#22C55E" : h.xirr > 0 ? "#F0CC6E" : "#EF4444", fontFamily: "var(--font-data), monospace" }}>
                +{h.xirr}%
              </div>
            </div>
          ))}
        </div>

        {/* Right column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Treemap allocation */}
          <div className="gc" style={{ padding: "22px 26px", overflow: "hidden" }}>
            <div className="gc-title mb-4">Allocation Map</div>
            <div className="gc-sub mb-16">By market value</div>
            <div className="treemap">
              {H.map(h => (
                <div key={h.sym} className="tm" style={{ background: h.color }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.85)", fontFamily: "var(--font-data), monospace" }}>{h.sym}</div>
                  <div style={{ fontSize: 9, color: "rgba(255,255,255,0.5)", fontFamily: "var(--font-data), monospace" }}>
                    {h.xirr > 0 ? "+" : ""}{h.xirr}%
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Correlation warning */}
          <div className="gc gc-bear" style={{ padding: "22px 26px" }}>
            <div className="gc-glow" style={{ width: 160, height: 130, background: "#EF4444", top: -30, right: -30 }} />
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <span style={{ fontSize: 16 }}>⚠</span>
              <div className="gc-title" style={{ color: "#EF4444" }}>Correlation Risk</div>
            </div>
            <p style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", lineHeight: 1.75, marginBottom: 14 }}>
              HDFC Bank & Kotak Bank share a <strong style={{ color: "#EF4444" }}>91% correlation</strong>. Your 24% banking exposure behaves as a single position.
            </p>
            {[["HDFC BANK", 91], ["KOTAK BANK", 91]].map(([n, v]) => (
              <div key={n as string} style={{ marginBottom: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: 9, color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-data), monospace" }}>{n}</span>
                  <span style={{ fontSize: 9, color: "#EF4444", fontFamily: "var(--font-data), monospace", fontWeight: 700 }}>{v}%</span>
                </div>
                <div className="bar-track">
                  <div className="bar-fill" style={{ width: anim ? `${v as number}%` : "0%", background: "#EF4444" }} />
                </div>
              </div>
            ))}
            <div style={{ fontSize: 10, color: "#C9A84C", marginTop: 10 }}>→ Replace Kotak with AXIS (Corr: 0.68)</div>
          </div>
        </div>
      </div>
    </div>
  );
}
