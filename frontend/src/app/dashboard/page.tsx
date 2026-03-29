"use client";

import { useState } from "react";
import Link from "next/link";
import "./dashboard.css";

import IntelligencePage from "./pages/IntelligencePage";
import DebatePage       from "./pages/DebatePage";
import PortfolioPage    from "./pages/PortfolioPage";
import AgentsPage       from "./pages/AgentsPage";
import RadarPage        from "./pages/RadarPage";
import SmartMoneyPage   from "./pages/SmartMoneyPage";
import PatternPage      from "./pages/PatternPage";
import BriefingPage     from "./pages/BriefingPage";
import ChatPage         from "./pages/ChatPage";
import StressTestPage   from "./pages/StressTestPage";
import SettingsPage     from "./pages/SettingsPage";
import ProfilePage      from "./pages/ProfilePage";

/* ── NAV CONFIG ────────────────────────────────────────────────
   Left sidebar  = Core product features
   Right sidebar = Intelligence tools + live streams
   ZERO overlap between the two.
──────────────────────────────────────────────────────────────── */
const LEFT_NAV = [
  { id: "intelligence", label: "Intelligence",    sub: "Conviction Hub",     icon: "◈", color: "#C9A84C" },
  { id: "debate",       label: "Debate Arena",    sub: "Bull vs Bear AI",    icon: "⚔", color: "#C9A84C" },
  { id: "portfolio",    label: "Portfolio X-Ray", sub: "XIRR & DNA",         icon: "◎", color: "#C9A84C" },
  { id: "agents",       label: "AI Agents",       sub: "12 Running",         icon: "⬡", color: "#C9A84C" },
  { id: "stress",       label: "Stress Test",     sub: "Portfolio Risk",     icon: "⚡", color: "#F0CC6E" },
];

const RIGHT_NAV = [
  { id: "radar",       label: "Opportunity Radar", sub: "Live Signal Feed",      icon: "◉", color: "#22C55E" },
  { id: "smartmoney",  label: "Smart Money",        sub: "FII/DII Flows",         icon: "💹", color: "#A87FD4" },
  { id: "patterns",    label: "Chart Patterns",     sub: "AI Pattern Scanner",    icon: "📈", color: "#F0CC6E" },
  { id: "briefing",    label: "Briefing",           sub: "Pre/Post Market",       icon: "📰", color: "#C9A84C" },
  { id: "chat",        label: "AI Chat",            sub: "Portfolio-Aware LLM",   icon: "💬", color: "#A87FD4" },
];

const PAGES: Record<string, React.ComponentType> = {
  intelligence: IntelligencePage,
  debate:       DebatePage,
  portfolio:    PortfolioPage,
  agents:       AgentsPage,
  stress:       StressTestPage,
  radar:        RadarPage,
  smartmoney:   SmartMoneyPage,
  patterns:     PatternPage,
  briefing:     BriefingPage,
  chat:         ChatPage,
  settings:     SettingsPage,
  profile:      ProfilePage,
};

const TICKS = [
  { s: "NIFTY 50",    p: "22,461", c: "+0.34%", up: true  },
  { s: "SENSEX",      p: "73,847", c: "+0.28%", up: true  },
  { s: "RELIANCE",    p: "2,847",  c: "+1.2%",  up: true  },
  { s: "HDFC BANK",   p: "1,624",  c: "-0.8%",  up: false },
  { s: "INFOSYS",     p: "1,782",  c: "+2.1%",  up: true  },
  { s: "TATA MOTORS", p: "924",    c: "-1.5%",  up: false },
  { s: "ZOMATO",      p: "238",    c: "+3.4%",  up: true  },
  { s: "BANK NIFTY",  p: "48,230", c: "-0.15%", up: false },
  { s: "DIXONINFY",   p: "16,420", c: "+1.9%",  up: true  },
  { s: "VIX",         p: "14.82",  c: "-2.1%",  up: false },
];

export default function DashboardPage() {
  const [page, setPage] = useState("intelligence");
  const PageComp = PAGES[page] || IntelligencePage;
  const allNav   = [...LEFT_NAV, ...RIGHT_NAV,
    { id: "settings", label: "Settings", sub: "", icon: "⚙", color: "#C9A84C" },
    { id: "profile",  label: "Profile",  sub: "", icon: "👤", color: "#C9A84C" },
  ];
  const current = allNav.find(n => n.id === page);

  function go(id: string) { setPage(id); }

  /* ── SHARED NAV ITEM RENDERER ─────────────────────────────── */
  function NavItem({ item, active }: { item: typeof LEFT_NAV[0]; active: boolean }) {
    return (
      <button
        className={`db-nav-item${active ? " active" : ""}`}
        onClick={() => go(item.id)}
        style={{ width: "100%", background: "none", border: "none", textAlign: "left", cursor: "pointer" }}
      >
        <div className="db-nav-icon" style={active ? { color: item.color } : {}}>
          {item.icon}
        </div>
        <div className="db-nav-text">
          <span className="db-nav-title">{item.label}</span>
          <span className="db-nav-sub">{item.sub}</span>
        </div>
      </button>
    );
  }

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh", color: "#F5F5F0", fontFamily: "var(--font-inter), sans-serif", position: "relative", overflow: "hidden" }}>

      {/* AMBIENT PARTICLES */}
      {Array.from({ length: 14 }).map((_, i) => (
        <div key={i} className="particle" style={{
          left: `${5 + i * 6.8}%`, top: `${8 + ((i * 13) % 75)}%`,
          background: i % 3 === 0 ? "#C9A84C" : i % 3 === 1 ? "#7B5EA7" : "rgba(255,255,255,0.25)",
          animationDuration: `${6 + (i % 5) * 1.8}s`, animationDelay: `${i * 0.55}s`,
        }} />
      ))}

      {/* ═══════════════ HEADER ═══════════════ */}
      <header className="db-header">
        {/* Logo + breadcrumb */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, flexShrink: 0 }}>
          <Link href="/" style={{ textDecoration: "none" }}>
            <span style={{ fontFamily: "var(--font-cursive), cursive", fontSize: 22, background: "linear-gradient(135deg,#FFD97A,#C9A84C)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent", lineHeight: 1, display: "block" }}>
              ET Alpha
            </span>
          </Link>
          <div style={{ width: 1, height: 18, background: "rgba(255,255,255,0.08)" }} />
          <span style={{ fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)", fontFamily: "var(--font-data), monospace" }}>Command Center</span>
          <span style={{ color: "rgba(255,255,255,0.1)", fontSize: 12 }}>›</span>
          <span style={{ fontSize: 10, color: "rgba(201,168,76,0.65)", fontFamily: "var(--font-data), monospace" }}>{current?.label}</span>
        </div>

        {/* Scrolling ticker */}
        <div style={{ flex: 1, overflow: "hidden", margin: "0 24px", mask: "linear-gradient(90deg,transparent,black 8%,black 92%,transparent)", WebkitMask: "linear-gradient(90deg,transparent,black 8%,black 92%,transparent)" }}>
          <div style={{ display: "flex", gap: 32, width: "max-content", animation: "tickerScroll 30s linear infinite" }}>
            {[...TICKS, ...TICKS].map((t, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, whiteSpace: "nowrap" }}>
                <span style={{ fontSize: 9, color: "rgba(255,255,255,0.28)", fontFamily: "var(--font-data), monospace", letterSpacing: "0.06em" }}>{t.s}</span>
                <span style={{ fontSize: 11, color: "rgba(255,255,255,0.65)", fontFamily: "var(--font-data), monospace" }}>{t.p}</span>
                <span style={{ fontSize: 9, color: t.up ? "#22C55E" : "#EF4444", fontFamily: "var(--font-data), monospace" }}>{t.up ? "▲" : "▼"} {t.c}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right controls */}
        <div style={{ display: "flex", alignItems: "center", gap: 14, flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span className="sig-dot sig-dot-live" style={{ width: 7, height: 7, background: "#22C55E", boxShadow: "0 0 8px #22C55E" }} />
            <span style={{ fontSize: 9, color: "#22C55E", fontFamily: "var(--font-data), monospace", letterSpacing: "0.08em", textTransform: "uppercase" }}>12 Agents</span>
          </div>
          <div style={{ width: 1, height: 16, background: "rgba(255,255,255,0.07)" }} />
          <span style={{ fontSize: 10, color: "rgba(255,255,255,0.22)", fontFamily: "var(--font-data), monospace" }}>NSE · 15:29:44</span>
          <div style={{ width: 1, height: 16, background: "rgba(255,255,255,0.07)" }} />
          {/* Settings */}
          <button onClick={() => go("settings")} title="Settings" style={{ width: 34, height: 34, borderRadius: "50%", background: page === "settings" ? "rgba(201,168,76,0.15)" : "rgba(255,255,255,0.05)", border: `1px solid ${page === "settings" ? "rgba(201,168,76,0.35)" : "rgba(255,255,255,0.1)"}`, color: page === "settings" ? "#C9A84C" : "rgba(255,255,255,0.4)", cursor: "pointer", fontSize: 15, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}>
            ⚙
          </button>
          {/* Profile */}
          <button onClick={() => go("profile")} title="Profile" style={{ width: 34, height: 34, borderRadius: "50%", background: page === "profile" ? "rgba(201,168,76,0.15)" : "linear-gradient(135deg,rgba(201,168,76,0.2),rgba(123,94,167,0.15))", border: `1px solid ${page === "profile" ? "rgba(201,168,76,0.5)" : "rgba(201,168,76,0.25)"}`, color: "#F0CC6E", cursor: "pointer", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, transition: "all 0.2s", boxShadow: page === "profile" ? "0 0 16px rgba(201,168,76,0.25)" : "none" }}>
            R
          </button>
        </div>
      </header>

      {/* ═══════════════ LEFT SIDEBAR ═══════════════ */}
      <nav className="db-left">
        {/* Logo strip — identical structure to nav-item */}
        <div className="db-sidebar-logo">
          <div className="db-sidebar-logo-icon">◈</div>
          <div className="db-nav-text">
            <span style={{ fontFamily: "var(--font-cursive), cursive", fontSize: 18, background: "linear-gradient(135deg,#FFD97A,#C9A84C)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent", lineHeight: 1, display: "block" }}>ET Alpha</span>
            <span style={{ fontSize: 8, letterSpacing: "0.2em", color: "rgba(255,255,255,0.2)", marginTop: 3, fontFamily: "var(--font-data), monospace", textTransform: "uppercase", display: "block" }}>v2 · Intelligence</span>
          </div>
        </div>

        {/* Core nav */}
        <div className="db-nav-section" style={{ flex: 1, overflowY: "auto", overflowX: "hidden" }}>
          <div className="db-nav-label">Core Features</div>
          {LEFT_NAV.map(item => <NavItem key={item.id} item={item} active={page === item.id} />)}

          <div className="db-sep" />

          {/* Back to landing */}
          <div className="db-nav-label">Navigation</div>
          <Link href="/" style={{ textDecoration: "none", display: "block" }}>
            <div className="db-nav-item" style={{ cursor: "pointer" }}>
              <div className="db-nav-icon">↩</div>
              <div className="db-nav-text">
                <span className="db-nav-title">Landing Page</span>
                <span className="db-nav-sub">Back to home</span>
              </div>
            </div>
          </Link>
        </div>

        {/* Status strip */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
          <div className="db-nav-item" style={{ cursor: "default", opacity: 0.7 }}>
            <div className="db-nav-icon" style={{ background: "rgba(34,197,94,0.08)", borderColor: "rgba(34,197,94,0.2)" }}>
              <span className="sig-dot sig-dot-live" style={{ width: 8, height: 8, background: "#22C55E", boxShadow: "0 0 8px #22C55E" }} />
            </div>
            <div className="db-nav-text">
              <span className="db-nav-title" style={{ color: "#22C55E" }}>All Systems Live</span>
              <span className="db-nav-sub">12 agents · 0 errors</span>
            </div>
          </div>
        </div>
      </nav>

      {/* ═══════════════ RIGHT SIDEBAR ═══════════════ */}
      <aside className="db-right">
        {/* Logo strip — matches nav-item structure */}
        <div className="db-sidebar-logo" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
          <div className="db-sidebar-logo-icon-r">◉</div>
          <div className="db-nav-text">
            <span style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.6)", display: "block", lineHeight: 1 }}>Intelligence</span>
            <span style={{ fontSize: 8, color: "rgba(123,94,167,0.6)", marginTop: 3, fontFamily: "var(--font-data), monospace", display: "block", textTransform: "uppercase", letterSpacing: "0.2em" }}>Live Tools</span>
          </div>
        </div>

        {/* Tools nav — entirely different from left sidebar */}
        <div className="db-nav-section" style={{ flex: 1, overflowY: "auto", overflowX: "hidden" }}>
          <div className="db-nav-label">Intelligence Tools</div>
          {RIGHT_NAV.map(item => (
            <button
              key={item.id}
              className={`db-nav-item${page === item.id ? " active" : ""}`}
              onClick={() => go(item.id)}
              style={{ width: "100%", background: "none", border: "none", textAlign: "left", cursor: "pointer" }}
            >
              <div className="db-nav-icon" style={page === item.id ? { color: item.color } : { color: item.color, opacity: 0.6 }}>
                {item.icon}
              </div>
              <div className="db-nav-text">
                <span className="db-nav-title">{item.label}</span>
                <span className="db-nav-sub">{item.sub}</span>
              </div>
            </button>
          ))}

          <div className="db-sep" />

          {/* Live mini-alerts — right sidebar exclusive */}
          <div className="db-nav-label">Latest Alerts</div>
          {[
            { sym: "DIXON",   type: "Insider",   score: "8.4", c: "#22C55E" },
            { sym: "POLYCAB", type: "Breakout",  score: "7.9", c: "#C9A84C" },
            { sym: "BHEL",    type: "FII Flow",  score: "7.2", c: "#A87FD4" },
            { sym: "ZOMATO",  type: "Momentum",  score: "6.8", c: "#C9A84C" },
          ].map(a => (
            <button key={a.sym} onClick={() => go("radar")} style={{ display: "flex", width: "100%", background: "none", border: "none", padding: "8px 16px", cursor: "pointer", gap: 14, alignItems: "center", whiteSpace: "nowrap", overflow: "hidden", transition: "background 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.03)")}
              onMouseLeave={e => (e.currentTarget.style.background = "none")}
            >
              <div className="db-nav-icon" style={{ background: `${a.c}12`, borderColor: `${a.c}30`, fontSize: 10, color: a.c, flexShrink: 0 }}>
                <span className="sig-dot sig-dot-live" style={{ width: 7, height: 7, background: a.c, display: "block" }} />
              </div>
              <div className="db-nav-text">
                <span className="db-nav-title" style={{ color: "rgba(255,255,255,0.7)", fontFamily: "var(--font-data), monospace" }}>{a.sym}</span>
                <span className="db-nav-sub" style={{ color: a.c }}>{a.type} · {a.score}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Bottom: market time */}
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
          <div className="db-nav-item" style={{ cursor: "default", opacity: 0.6 }}>
            <div className="db-nav-icon" style={{ background: "rgba(123,94,167,0.08)", borderColor: "rgba(123,94,167,0.2)", fontSize: 14, color: "#A87FD4" }}>🕐</div>
            <div className="db-nav-text">
              <span className="db-nav-title" style={{ fontFamily: "var(--font-data), monospace", fontSize: 11 }}>Market Open</span>
              <span className="db-nav-sub">NSE · 09:15 – 15:30 IST</span>
            </div>
          </div>
        </div>
      </aside>

      {/* ═══════════════ MAIN CONTENT ═══════════════ */}
      <div className="db-main">
        <div key={page} className="db-page-enter">
          <PageComp />
        </div>
      </div>

    </div>
  );
}
