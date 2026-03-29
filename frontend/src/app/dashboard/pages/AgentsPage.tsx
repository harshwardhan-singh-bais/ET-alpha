"use client";

const AGENTS = [
  { name: "Orchestrator",   role: "LangGraph Supervisor",    status: "Active",      icon: "🧠", c: "#C9A84C", tasks: 12,   uptime: "99.8%" },
  { name: "Bull Agent",     role: "Optimistic Signal Finder", status: "Debating",   icon: "🐂", c: "#22C55E", tasks: 4,    uptime: "100%"  },
  { name: "Bear Agent",     role: "Risk Surface Scanner",    status: "Debating",    icon: "🐻", c: "#EF4444", tasks: 4,    uptime: "100%"  },
  { name: "FinBERT NLP",    role: "Sentiment Analyser",      status: "Processing",  icon: "🧬", c: "#A87FD4", tasks: 89,   uptime: "97.2%" },
  { name: "Signal Engine",  role: "8-Layer Fusion Model",    status: "Active",      icon: "📊", c: "#C9A84C", tasks: 500,  uptime: "99.5%" },
  { name: "Radar Agent",    role: "NSE Universe Monitor",    status: "Scanning",    icon: "📡", c: "#22C55E", tasks: 1240, uptime: "98.9%" },
  { name: "Arbitrator",     role: "Conviction Scorer",       status: "Active",      icon: "⚖",  c: "#F0CC6E", tasks: 18,   uptime: "100%"  },
  { name: "Memory Agent",   role: "Qdrant Vector Store",     status: "Synced",      icon: "🗄", c: "#A87FD4", tasks: 2048, uptime: "99.1%" },
  { name: "Portfolio AI",   role: "XIRR & Risk Engine",      status: "Active",      icon: "💼", c: "#C9A84C", tasks: 7,    uptime: "99.7%" },
  { name: "Groq Inference", role: "Llama 3.3-70b Runtime",   status: "Active",      icon: "⚡", c: "#F0CC6E", tasks: 143,  uptime: "99.9%" },
  { name: "SEBI Watcher",   role: "Regulatory Filing Feed",  status: "Monitoring",  icon: "🛡", c: "#22C55E", tasks: 382,  uptime: "100%"  },
  { name: "Alert Dispatcher",role: "WebSocket Push Engine",  status: "Active",      icon: "🔔", c: "#C9A84C", tasks: 621,  uptime: "99.6%" },
];

export default function AgentsPage() {
  return (
    <div className="db-page">
      <div className="mb-36">
        <div className="section-pill">⬡ AI Agent Network · LangGraph Multi-Agent</div>
        <h1 className="db-page-title">
          <span className="db-cursive">12</span> Agents. One Decision.
        </h1>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,0.28)", marginTop: 8 }}>
          Groq + Gemini inference · Qdrant memory · Sub-2s response · SEBI compliant
        </p>
      </div>

      {/* Flow */}
      <div className="gc mb-20" style={{ padding: "28px 32px" }}>
        <div className="gc-title mb-20">LangGraph Orchestration Flow</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, flexWrap: "wrap" }}>
          {([
            ["User Query", "fn-gold"],
            "→",
            ["Orchestrator 🧠", "fn-gold"],
            "→",
            ["Signal Engine 📊", "fn-violet"],
            "+",
            ["🐂 Bull Agent", "fn-bull"],
            "+",
            ["🐻 Bear Agent", "fn-bear"],
            "→",
            ["Arbitrator ⚖", "fn-gold"],
            "→",
            ["◆ Conviction Score", "fn-gold"],
            "→",
            ["Streamed Response 💡", ""],
          ] as (string | string[])[]).map((item, i) => {
            if (typeof item === "string") return <div key={i} className="fn-arr" style={{ margin: "0 2px" }}>{item}</div>;
            return (
              <div key={i} className={`fn ${item[1]}`} style={{ fontSize: 10, margin: 2 }}>
                {item[0]}
              </div>
            );
          })}
        </div>
      </div>

      {/* Agent grid */}
      <div className="grid-3">
        {AGENTS.map(a => (
          <div key={a.name} className="agent-card"
            onMouseEnter={e => { e.currentTarget.style.borderColor = `${a.c}30`; e.currentTarget.style.boxShadow = `0 20px 60px rgba(0,0,0,0.55), 0 0 40px ${a.c}08`; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.boxShadow = "none"; }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
              <div style={{
                width: 42, height: 42, borderRadius: "50%",
                background: `${a.c}12`, border: `1px solid ${a.c}28`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 20, flexShrink: 0,
              }}>
                {a.icon}
              </div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.82)" }}>{a.name}</div>
                <div style={{ fontSize: 9, color: "rgba(255,255,255,0.28)", marginTop: 1, fontFamily: "var(--font-data), monospace" }}>{a.role}</div>
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 9, letterSpacing: "0.06em", textTransform: "uppercase", color: a.c, fontFamily: "var(--font-data), monospace" }}>
                <span className="sig-dot sig-dot-live" style={{ width: 5, height: 5, background: a.c }} />
                {a.status}
              </span>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 8, color: "rgba(255,255,255,0.18)", fontFamily: "var(--font-data), monospace" }}>Tasks: {a.tasks.toLocaleString()}</div>
                <div style={{ fontSize: 8, color: "rgba(255,255,255,0.18)", fontFamily: "var(--font-data), monospace" }}>Up: {a.uptime}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
