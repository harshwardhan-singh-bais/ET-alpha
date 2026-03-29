"use client";
import { useState, useRef, useEffect } from "react";

type Msg = { role: "user" | "ai"; text: string; charts?: boolean; stocks?: string[] };

const SUGGESTIONS = [
  "Should I add to my Zomato position at ₹238?",
  "What happened to HDFC Bank today?",
  "Explain the cup & handle on Polycab",
  "What's the conviction score for HAL right now?",
  "Stress test my portfolio if markets fall 20%",
  "Is the defence sector bull run sustainable?",
];

const DEMO_REPLIES: Record<string, Msg> = {
  default: {
    role: "ai",
    text: "I've analyzed your query using the 8-signal confluence engine, portfolio context, and current market data.\n\n◆ HDFC Bank is showing **strong institutional accumulation** (FII +₹1,240Cr today).\n◆ Technical pattern: Double Bottom at ₹1,580 — 92% complete.\n◆ Smart Money Score: 64/100 — Moderate-positive.\n◆ You currently hold 16% of your portfolio in HDFC Bank.\n\n⚠ Risk: Banking sector correlation remains high (91% with Kotak). Consider your overall exposure.\n\n*Disclaimer: This is for educational purposes only. Not SEBI-registered investment advice.*",
    stocks: ["HDFC BANK", "KOTAK BANK"],
  },
};

function TypingDots() {
  return (
    <div style={{ display: "flex", gap: 4, alignItems: "center", padding: "0 4px" }}>
      {[0, 1, 2].map(i => (
        <div key={i} style={{
          width: 6, height: 6, borderRadius: "50%",
          background: "#A87FD4",
          animation: `sigBlink 1.4s ease-in-out ${i * 0.2}s infinite`,
        }} />
      ))}
    </div>
  );
}

function ChatBubble({ msg }: { msg: Msg }) {
  const isAI = msg.role === "ai";
  return (
    <div style={{
      display: "flex",
      flexDirection: isAI ? "row" : "row-reverse",
      gap: 12,
      marginBottom: 20,
    }}>
      {/* Avatar */}
      <div style={{
        width: 32, height: 32, borderRadius: "50%", flexShrink: 0,
        background: isAI ? "rgba(123,94,167,0.2)" : "rgba(201,168,76,0.15)",
        border: isAI ? "1px solid rgba(123,94,167,0.35)" : "1px solid rgba(201,168,76,0.3)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 14, marginTop: 2,
      }}>
        {isAI ? "◈" : "R"}
      </div>

      <div style={{ maxWidth: "75%", display: "flex", flexDirection: "column", gap: 8 }}>
        {/* Bubble */}
        <div style={{
          padding: "14px 18px",
          borderRadius: isAI ? "4px 18px 18px 18px" : "18px 4px 18px 18px",
          background: isAI ? "rgba(123,94,167,0.1)" : "rgba(201,168,76,0.08)",
          border: isAI ? "1px solid rgba(123,94,167,0.18)" : "1px solid rgba(201,168,76,0.18)",
          fontSize: 12.5,
          color: "rgba(255,255,255,0.72)",
          lineHeight: 1.75,
          whiteSpace: "pre-line",
        }}>
          {msg.text}
        </div>

        {/* Referenced stocks */}
        {msg.stocks && (
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", paddingLeft: 4 }}>
            {msg.stocks.map(s => (
              <span key={s} className="badge badge-gold" style={{ fontSize: 8 }}>{s}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: "ai",
      text: "Hello Rahul! 👋 I can see your portfolio — ₹24.52L across 6 holdings with +24.7% XIRR.\n\nYou hold HDFC Bank (+16%), Reliance (+26%), Infosys (+13%), and more. What would you like to analyse today?\n\nI can: debate any stock, stress-test your portfolio, explain any signal, or answer questions about today's market.",
      stocks: ["HDFC BANK", "RELIANCE", "INFOSYS", "ZOMATO"],
    },
  ]);
  const [input, setInput]     = useState("");
  const [thinking, setThinking] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, thinking]);

  function send(text: string) {
    if (!text.trim()) return;
    setMessages(prev => [...prev, { role: "user", text }]);
    setInput("");
    setThinking(true);
    setTimeout(() => {
      setThinking(false);
      setMessages(prev => [...prev, {
        ...DEMO_REPLIES.default,
        text: `I've analysed your query: *"${text}"*\n\n${DEMO_REPLIES.default.text}`,
      }]);
    }, 2200);
  }

  return (
    <div className="db-page" style={{ height: "calc(100vh - 60px)", display: "flex", flexDirection: "column" }}>
      {/* Header */}
      <div style={{ marginBottom: 20, flexShrink: 0 }}>
        <div className="section-pill">💬 Portfolio-Aware AI Chat · Powered by Groq + Gemini</div>
        <h1 className="db-page-title" style={{ fontSize: "clamp(32px, 4vw, 52px)" }}>
          Ask Your <span className="db-cursive">AI Analyst</span>
        </h1>
      </div>

      <div style={{ display: "flex", gap: 20, flex: 1, minHeight: 0 }}>
        {/* Chat panel */}
        <div style={{ flex: 1.5, display: "flex", flexDirection: "column", minHeight: 0 }}>
          <div className="gc" style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", padding: 0 }}>
            {/* Messages */}
            <div style={{ flex: 1, overflowY: "auto", padding: "24px 24px 16px" }} className="db-scroll">
              {messages.map((msg, i) => <ChatBubble key={i} msg={msg} />)}
              {thinking && (
                <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
                  <div style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(123,94,167,0.2)", border: "1px solid rgba(123,94,167,0.35)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0 }}>◈</div>
                  <div style={{ padding: "14px 18px", borderRadius: "4px 18px 18px 18px", background: "rgba(123,94,167,0.1)", border: "1px solid rgba(123,94,167,0.18)" }}>
                    <TypingDots />
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div style={{ padding: "16px 20px", borderTop: "1px solid rgba(255,255,255,0.04)", display: "flex", gap: 10, flexShrink: 0 }}>
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && send(input)}
                placeholder="Ask about any stock, your portfolio, or today's market..."
                style={{
                  flex: 1, padding: "12px 18px",
                  background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12,
                  color: "rgba(255,255,255,0.8)", fontSize: 13,
                  outline: "none", fontFamily: "var(--font-inter), sans-serif",
                }}
                onFocus={e => (e.target.style.borderColor = "rgba(201,168,76,0.3)")}
                onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
              />
              {/* Voice */}
              <button title="Voice Input" style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(123,94,167,0.1)", border: "1px solid rgba(123,94,167,0.25)", color: "#A87FD4", cursor: "pointer", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                🎙
              </button>
              <button onClick={() => send(input)} style={{ height: 44, padding: "0 20px", borderRadius: 12, background: "linear-gradient(135deg,#C9A84C,#8B6E2A)", border: "none", color: "#080808", fontWeight: 700, fontSize: 12, cursor: "pointer", letterSpacing: "0.06em", fontFamily: "var(--font-data), monospace", flexShrink: 0 }}>
                SEND →
              </button>
            </div>
          </div>
        </div>

        {/* Context panel */}
        <div style={{ width: 280, display: "flex", flexDirection: "column", gap: 14, flexShrink: 0 }}>
          {/* Suggested questions */}
          <div className="gc" style={{ padding: "20px" }}>
            <div className="gc-title mb-4">💡 Suggested</div>
            <div className="gc-sub mb-14">Based on your portfolio</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {SUGGESTIONS.map(s => (
                <button key={s} onClick={() => send(s)} style={{
                  padding: "10px 14px", textAlign: "left",
                  background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10,
                  color: "rgba(255,255,255,0.5)", fontSize: 11, cursor: "pointer", lineHeight: 1.5,
                  transition: "all 0.2s ease",
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(201,168,76,0.06)"; e.currentTarget.style.borderColor = "rgba(201,168,76,0.15)"; e.currentTarget.style.color = "rgba(255,255,255,0.75)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.025)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "rgba(255,255,255,0.5)"; }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Portfolio context */}
          <div className="gc" style={{ padding: "20px" }}>
            <div className="gc-title mb-14">📂 Active Context</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                { label: "Portfolio", val: "₹24.52L · 6 stocks" },
                { label: "XIRR",     val: "+24.7% vs Nifty +14.2%" },
                { label: "Watchlist",val: "8 stocks tracking" },
                { label: "Alerts",   val: "3 new today" },
              ].map(c => (
                <div key={c.label} style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                  <span style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-data), monospace" }}>{c.label}</span>
                  <span style={{ fontSize: 10, color: "rgba(255,255,255,0.6)", fontFamily: "var(--font-data), monospace" }}>{c.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
