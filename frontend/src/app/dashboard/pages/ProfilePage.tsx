"use client";
import { useState } from "react";

export default function ProfilePage() {
  const [editMode, setEditMode] = useState(false);

  const profile = {
    name:        "Rahul Sharma",
    email:       "rahul@example.com",
    phone:       "+91 98765 43210",
    type:        "Long-Term Investor",
    risk:        "Moderate-Aggressive",
    joined:      "January 2025",
    demat:       "CDSL · 1208XXXXXXXX",
    broker:      "Zerodha",
    panMasked:   "ABCPX••••F",
  };

  const stats = [
    { l: "Portfolio Value", v: "₹24.52L",   c: "#F0CC6E" },
    { l: "True XIRR",       v: "+24.7%",   c: "#22C55E" },
    { l: "Debates Run",     v: "47",        c: "#A87FD4" },
    { l: "Alerts Received", v: "182",       c: "#C9A84C" },
    { l: "Days Active",     v: "426",       c: "#C9A84C" },
    { l: "Signals Acted",   v: "23",        c: "#22C55E" },
  ];

  const badges = [
    { icon: "◈", name: "Alpha Hunter",       desc: "Ran 10+ debates",             c: "#C9A84C" },
    { icon: "◉", name: "Signal Seeker",      desc: "Caught 5+ radar alerts",      c: "#22C55E" },
    { icon: "◎", name: "Portfolio Pro",      desc: "XIRR beats Nifty by 10%+",    c: "#A87FD4" },
    { icon: "⬡", name: "Agent Whisperer",    desc: "Used 12+ AI agents",          c: "#F0CC6E" },
  ];

  return (
    <div className="db-page">
      <div className="mb-36">
        <div className="section-pill">👤 Investor Profile · Account & Preferences</div>
        <h1 className="db-page-title">
          Your <span className="db-cursive">Profile</span>
        </h1>
      </div>

      <div className="grid-1-2 mb-20">
        {/* Profile card */}
        <div className="gc gc-gold" style={{ padding: "32px 28px" }}>
          <div className="gc-glow" style={{ width: 200, height: 200, background: "#C9A84C", top: -60, right: -60 }} />
          {/* Avatar */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 28 }}>
            <div style={{
              width: 64, height: 64, borderRadius: "50%",
              background: "linear-gradient(135deg, rgba(201,168,76,0.25), rgba(123,94,167,0.2))",
              border: "2px solid rgba(201,168,76,0.4)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 28, fontWeight: 800, color: "#F0CC6E",
              flexShrink: 0, boxShadow: "0 0 28px rgba(201,168,76,0.2)",
            }}>
              R
            </div>
            <div>
              <div style={{ fontSize: 20, fontWeight: 700, color: "rgba(255,255,255,0.92)", fontFamily: "var(--font-playfair), serif" }}>{profile.name}</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", fontFamily: "var(--font-data), monospace", marginTop: 2 }}>{profile.type} · {profile.risk}</div>
              <div style={{ marginTop: 8, display: "flex", gap: 6 }}>
                <span className="badge badge-gold">Pro</span>
                <span className="badge badge-violet">ET Hackathon 2025</span>
              </div>
            </div>
          </div>

          {/* Info rows */}
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {[
              { l: "Email",    v: profile.email,    icon: "✉" },
              { l: "Phone",    v: profile.phone,    icon: "📱" },
              { l: "Broker",   v: profile.broker,   icon: "🏦" },
              { l: "Demat",    v: profile.demat,    icon: "📂" },
              { l: "PAN",      v: profile.panMasked,icon: "🔒" },
              { l: "Member Since", v: profile.joined, icon: "📅" },
            ].map((row, i, arr) => (
              <div key={row.l} style={{ display: "flex", alignItems: "center", gap: 14, padding: "13px 0", borderBottom: i < arr.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                <span style={{ fontSize: 14, width: 24, flexShrink: 0, textAlign: "center" }}>{row.icon}</span>
                <span style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-data), monospace", width: 80, flexShrink: 0 }}>{row.l}</span>
                <span style={{ fontSize: 12, color: "rgba(255,255,255,0.65)" }}>{row.v}</span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 24, display: "flex", gap: 10 }}>
            <button onClick={() => setEditMode(!editMode)} style={{
              flex: 1, padding: "12px", borderRadius: 12,
              background: editMode ? "linear-gradient(135deg,#C9A84C,#8B6E2A)" : "rgba(255,255,255,0.05)",
              border: editMode ? "none" : "1px solid rgba(255,255,255,0.1)",
              color: editMode ? "#080808" : "rgba(255,255,255,0.55)",
              fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase",
              cursor: "pointer", fontFamily: "var(--font-data), monospace", transition: "all 0.2s",
            }}>
              {editMode ? "Save Changes" : "Edit Profile"}
            </button>
          </div>
        </div>

        {/* Right column */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Stats */}
          <div className="gc" style={{ padding: "22px 24px" }}>
            <div className="gc-title mb-16">Platform Statistics</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
              {stats.map(s => (
                <div key={s.l} style={{ padding: "14px", background: "rgba(255,255,255,0.025)", borderRadius: 12, textAlign: "center" }}>
                  <div style={{ fontFamily: "var(--font-data), monospace", fontSize: 22, fontWeight: 800, color: s.c, marginBottom: 4 }}>{s.v}</div>
                  <div style={{ fontSize: 9, color: "rgba(255,255,255,0.25)", fontFamily: "var(--font-data), monospace", textTransform: "uppercase", letterSpacing: "0.08em" }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Investor Profile Settings */}
          <div className="gc gc-violet" style={{ padding: "22px 24px" }}>
            <div className="gc-glow" style={{ width: 150, height: 120, background: "#7B5EA7", top: -30, right: -30 }} />
            <div className="gc-title mb-16">Investor Configuration</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {[
                { l: "Investor Type",    v: profile.type,    t: "pill" },
                { l: "Risk Appetite",    v: profile.risk,    t: "pill" },
                { l: "Preferred Caps",  v: "Large + Mid Cap",t: "pill" },
                { l: "SEBI Disclaimer", v: "Accepted",       t: "check" },
                { l: "AI Memory",       v: "Enabled",        t: "toggle" },
                { l: "Daily Briefing",  v: "08:30 AM",       t: "text" },
              ].map((row, i, arr) => (
                <div key={row.l} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0", borderBottom: i < arr.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                  <span style={{ fontSize: 12, color: "rgba(255,255,255,0.45)" }}>{row.l}</span>
                  {row.t === "pill"   && <span className="badge badge-gold" style={{ fontSize: 9 }}>{row.v}</span>}
                  {row.t === "check"  && <span style={{ fontSize: 14 }}>✅</span>}
                  {row.t === "toggle" && (
                    <div style={{ width: 42, height: 22, borderRadius: 100, background: "rgba(201,168,76,0.3)", border: "1px solid rgba(201,168,76,0.5)", position: "relative" }}>
                      <div style={{ width: 16, height: 16, borderRadius: "50%", background: "#C9A84C", position: "absolute", right: 3, top: 2 }} />
                    </div>
                  )}
                  {row.t === "text"   && <span style={{ fontSize: 11, color: "#F0CC6E", fontFamily: "var(--font-data), monospace" }}>{row.v}</span>}
                </div>
              ))}
            </div>
          </div>

          {/* Badges */}
          <div className="gc" style={{ padding: "22px 24px" }}>
            <div className="gc-title mb-16">🏆 Badges Earned</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {badges.map(b => (
                <div key={b.name} style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px", background: `${b.c}08`, border: `1px solid ${b.c}20`, borderRadius: 12 }}>
                  <div style={{ fontSize: 20, width: 36, height: 36, borderRadius: 10, background: `${b.c}15`, border: `1px solid ${b.c}25`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: b.c }}>
                    {b.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 700, color: b.c, fontFamily: "var(--font-data), monospace" }}>{b.name}</div>
                    <div style={{ fontSize: 9, color: "rgba(255,255,255,0.3)", marginTop: 2 }}>{b.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div style={{ padding: "16px 20px", background: "rgba(239,68,68,0.04)", border: "1px solid rgba(239,68,68,0.12)", borderRadius: 12 }}>
        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.28)", lineHeight: 1.7, fontFamily: "var(--font-data), monospace" }}>
          ⚠ SEBI DISCLAIMER: ET Alpha is for educational purposes only. We are not a SEBI-registered investment advisor. All analysis ("conviction scores", "debates", "signals") represents algorithmic output and does not constitute investment advice. Past signal performance does not guarantee future results. Please consult a registered financial advisor before making investment decisions.
        </div>
      </div>
    </div>
  );
}
