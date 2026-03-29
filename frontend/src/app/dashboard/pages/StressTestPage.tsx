"use client";
import { useState, useEffect } from "react";

const SC = [
  { name: "COVID Crash (Mar 2020)",    port: -34, nifty: -38, desc: "Global pandemic panic sell-off. Markets fell 38% in 6 weeks. FII outflows ₹62,000Cr.", c: "#EF4444" },
  { name: "2008 Global Crisis",        port: -48, nifty: -60, desc: "Lehman collapse. Nifty fell 60% from peak. FII outflows ₹52,000Cr over 12 months.", c: "#EF4444" },
  { name: "Taper Tantrum 2013",        port: -18, nifty: -24, desc: "Fed signals bond tapering. EM selloff. Rupee hit 68. FII outflows for 3 months.", c: "#F0CC6E" },
  { name: "Rate Hike Cycle 2022",      port: -12, nifty: -16, desc: "RBI hikes 250bps. Growth stocks bleed. IT sector down 35% from peak.", c: "#F0CC6E" },
  { name: "Russia–Ukraine Feb 2022",   port:  -9, nifty: -13, desc: "Commodity shock. Brent at $120. FII net sellers for 8 consecutive months.", c: "#F0CC6E" },
];

export default function StressTestPage() {
  const [active, setActive] = useState(0);
  const [anim, setAnim] = useState(false);
  useEffect(() => { const t = setTimeout(() => setAnim(true), 300); return () => clearTimeout(t); }, [active]);

  const s = SC[active];
  const outperf = Math.abs(s.nifty) - Math.abs(s.port);

  function goto(i: number) { setAnim(false); setActive(i); setTimeout(() => setAnim(true), 60); }

  return (
    <div className="db-page">
      <div className="mb-36">
        <div className="section-pill">⚡ Portfolio Stress Test · Historical Scenarios</div>
        <h1 className="db-page-title">
          Worst <span className="db-cursive">Case</span> Scenarios
        </h1>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.28)", marginTop: 8 }}>Historical black swan simulations on your current holdings</p>
      </div>

      <div className="grid-1-2">
        {/* Scenario selector */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {SC.map((sc, i) => (
            <div key={sc.name} onClick={() => goto(i)}
              style={{
                padding: "18px 22px",
                background: active === i ? `${sc.c}0A` : "var(--bg-3)",
                border: `1px solid ${active === i ? `${sc.c}35` : "var(--border)"}`,
                borderRadius: 14,
                cursor: "pointer",
                transition: "all 0.3s ease",
                display: "flex", justifyContent: "space-between", alignItems: "center",
              }}
              onMouseEnter={e => { if (active !== i) e.currentTarget.style.background = "rgba(255,255,255,0.02)"; }}
              onMouseLeave={e => { if (active !== i) e.currentTarget.style.background = "var(--bg-3)"; }}
            >
              <div style={{ fontSize: 12, fontWeight: 600, color: active === i ? "rgba(255,255,255,0.88)" : "rgba(255,255,255,0.45)" }}>
                {sc.name}
              </div>
              <div style={{ fontFamily: "var(--font-data), monospace", fontSize: 18, fontWeight: 700, color: sc.c, flexShrink: 0 }}>
                {sc.port}%
              </div>
            </div>
          ))}
        </div>

        {/* Detail panel */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div className="gc gc-violet" style={{ padding: "28px 32px" }}>
            <div className="gc-glow" style={{ width: 200, height: 200, background: "#7B5EA7", top: -50, right: -50 }} />
            <div className="gc-title mb-8">{s.name}</div>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", lineHeight: 1.8, marginBottom: 24 }}>{s.desc}</p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 24 }}>
              {[
                { l: "Your Portfolio", v: `${s.port}%`, c: s.c },
                { l: "Nifty 50",       v: `${s.nifty}%`, c: "#EF4444" },
                { l: "Outperformed",   v: `+${outperf}%`, c: "#22C55E" },
              ].map(k => (
                <div key={k.l} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 8, color: "rgba(255,255,255,0.28)", fontFamily: "var(--font-data), monospace", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>{k.l}</div>
                  <div style={{ fontSize: 28, fontFamily: "var(--font-data), monospace", fontWeight: 800, color: k.c }}>{k.v}</div>
                </div>
              ))}
            </div>

            {([["Your Portfolio", Math.abs(s.port), s.c], ["Nifty Benchmark", Math.abs(s.nifty), "#EF4444"]] as [string, number, string][]).map(([n, v, c]) => (
              <div key={n} style={{ marginBottom: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                  <span style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-data), monospace" }}>{n}</span>
                  <span style={{ fontSize: 10, color: c, fontFamily: "var(--font-data), monospace", fontWeight: 700 }}>{v as number}%</span>
                </div>
                <div className="bar-track" style={{ height: 8 }}>
                  <div className="bar-fill" style={{ width: anim ? `${(v as number) * 1.5}%` : "0%", background: c as string, height: "100%" }} />
                </div>
              </div>
            ))}
          </div>

          <div className="gc" style={{ padding: "22px 26px" }}>
            <div className="gc-title mb-14">🧠 AI Hedging Suggestions</div>
            {[
              "Add 5% Gold ETF — negatively correlated to equity downturns, natural hedge",
              "Reduce banking exposure from 24% → 12% to limit correlated concentration risk",
              "Keep 10% liquid fund buffer for opportunistic re-entry after drawdown",
            ].map((tip, i) => (
              <div key={i} style={{ display: "flex", gap: 10, marginBottom: 12 }}>
                <span style={{ color: "#A87FD4", flexShrink: 0, marginTop: 1 }}>→</span>
                <span style={{ fontSize: 11, color: "rgba(255,255,255,0.42)", lineHeight: 1.65 }}>{tip}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
