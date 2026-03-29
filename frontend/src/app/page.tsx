"use client";

import React, { useEffect } from 'react';
import './landing.css';

export default function LandingPage() {
  useEffect(() => {

    // Ensure this script only runs once per mount
    if ((window as any).landingScriptInitialized) return;
    (window as any).landingScriptInitialized = true;

    
// ─── CUSTOM CURSOR ───
const cursor = document.getElementById('cursor');
const trail = document.getElementById('cursor-trail');
let mx = 0, my = 0, tx = 0, ty = 0;
document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  if (cursor) {
    cursor.style.left = mx - 6 + 'px';
    cursor.style.top = my - 6 + 'px';
  }
});
function animateTrail() {
  tx += (mx - tx) * 0.12;
  ty += (my - ty) * 0.12;
  if (trail) {
    trail.style.left = tx - 18 + 'px';
    trail.style.top = ty - 18 + 'px';
  }
  (window as any).trailRaf = requestAnimationFrame(animateTrail);
}
animateTrail();

// ─── HERO PARTICLE CANVAS ───
const hCanvas = document.getElementById('hero-canvas') as HTMLCanvasElement;
const hCtx = hCanvas?.getContext('2d');
let W: number, H: number, particles: any[] = [];

function resizeHero() {
  if (!hCanvas) return;
  W = hCanvas.width = hCanvas.offsetWidth;
  H = hCanvas.height = hCanvas.offsetHeight;
}
resizeHero();
window.addEventListener('resize', resizeHero);

class Particle {
  x!: number;
  y!: number;
  vx!: number;
  vy!: number;
  r!: number;
  color!: string;
  life!: number;
  maxLife!: number;
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * W;
    this.y = Math.random() * H;
    this.vx = (Math.random() - 0.5) * 0.3;
    this.vy = (Math.random() - 0.5) * 0.3;
    this.r = Math.random() * 1.5 + 0.3;
    const t = Math.random();
    this.color = t < 0.5 
      ? `rgba(201,168,76,${Math.random() * 0.5 + 0.1})`
      : `rgba(123,94,167,${Math.random() * 0.4 + 0.1})`;
    this.life = 0;
    this.maxLife = 300 + Math.random() * 400;
  }
  update() {
    this.x += this.vx; this.y += this.vy;
    this.life++;
    if (this.life > this.maxLife || this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
  }
  draw() {
    if (!hCtx) return;
    const alpha = Math.min(this.life / 60, 1) * Math.min((this.maxLife - this.life) / 60, 1);
    hCtx.globalAlpha = alpha;
    hCtx.fillStyle = this.color;
    hCtx.beginPath();
    hCtx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    hCtx.fill();
  }
}

for (let i = 0; i < 180; i++) particles.push(new Particle());

// Connection lines
function drawConnections() {
  if (!hCtx) return;
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist < 80) {
        hCtx.globalAlpha = (1 - dist/80) * 0.06;
        hCtx.strokeStyle = '#C9A84C';
        hCtx.lineWidth = 0.5;
        hCtx.beginPath();
        hCtx.moveTo(particles[i].x, particles[i].y);
        hCtx.lineTo(particles[j].x, particles[j].y);
        hCtx.stroke();
      }
    }
  }
}

function heroLoop() {
  if (!hCtx) return;
  hCtx.clearRect(0, 0, W, H);
  // Radial glow
  const grd = hCtx.createRadialGradient(W/2, H/2, 0, W/2, H/2, H * 0.6);
  grd.addColorStop(0, 'rgba(201,168,76,0.02)');
  grd.addColorStop(1, 'transparent');
  hCtx.globalAlpha = 1;
  hCtx.fillStyle = grd;
  hCtx.fillRect(0, 0, W, H);
  drawConnections();
  particles.forEach(p => { p.update(); p.draw(); });
  hCtx.globalAlpha = 1;
  (window as any).heroRaf = requestAnimationFrame(heroLoop);
}
heroLoop();

// ─── COIN CANVAS ───
const cCanvas = document.getElementById('coin-canvas') as HTMLCanvasElement;
const cCtx = cCanvas?.getContext('2d');
if (cCanvas) {
  cCanvas.width = 500; cCanvas.height = 500;
}
let coinAngle = 0;
let instruments: any[] = [];
const INST_SYMBOLS = ['₹', '%', '↑', '↓', '◆', '∑', '★', '⬡'];
for (let i = 0; i < 8; i++) {
  instruments.push({
    symbol: INST_SYMBOLS[i],
    angle: (i / 8) * Math.PI * 2,
    r: 180,
    flipAngle: Math.random() * Math.PI * 2,
    flipSpeed: (Math.random() - 0.5) * 0.04 + 0.03,
    floatOffset: Math.random() * Math.PI * 2,
    color: i % 2 === 0 ? '#C9A84C' : '#7B5EA7'
  });
}

function drawCoin() {
  if (!cCtx) return;
  const cx = 250, cy = 250;
  cCtx.clearRect(0, 0, 500, 500);
  
  // Shadow/glow
  const shadowGrd = cCtx.createRadialGradient(cx, cy+60, 10, cx, cy+60, 100);
  shadowGrd.addColorStop(0, 'rgba(201,168,76,0.15)');
  shadowGrd.addColorStop(1, 'transparent');
  cCtx.fillStyle = shadowGrd;
  cCtx.fillRect(0, 0, 500, 500);
  
  // Coin spin — squish horizontally
  const squish = Math.abs(Math.cos(coinAngle));
  const rx = 80 * squish + 2;
  const ry = 80;
  
  // Coin edge
  cCtx.beginPath();
  cCtx.ellipse(cx, cy + 8, rx + 2, ry + 2, 0, 0, Math.PI * 2);
  cCtx.fillStyle = '#7A5E1A';
  cCtx.fill();
  
  // Coin face
  const faceGrd = cCtx.createRadialGradient(cx - rx*0.3, cy - ry*0.3, 2, cx, cy, rx * 1.5);
  if (Math.cos(coinAngle) >= 0) {
    faceGrd.addColorStop(0, '#F5D876');
    faceGrd.addColorStop(0.4, '#C9A84C');
    faceGrd.addColorStop(1, '#7A5E1A');
  } else {
    faceGrd.addColorStop(0, '#D4A0C8');
    faceGrd.addColorStop(0.4, '#7B5EA7');
    faceGrd.addColorStop(1, '#3D2B5C');
  }
  cCtx.beginPath();
  cCtx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
  cCtx.fillStyle = faceGrd;
  cCtx.fill();
  
  // Coin text
  if (squish > 0.15) {
    cCtx.save();
    cCtx.scale(squish, 1);
    cCtx.fillStyle = Math.cos(coinAngle) >= 0 ? 'rgba(120,80,10,0.8)' : 'rgba(200,180,220,0.8)';
    cCtx.font = 'bold 28px Playfair Display, serif';
    cCtx.textAlign = 'center';
    cCtx.fillText(Math.cos(coinAngle) >= 0 ? 'ET' : 'α', cx / squish, cy + 10);
    cCtx.restore();
  }
  
  // Instruments orbiting
  instruments.forEach(inst => {
    inst.angle += 0.008;
    inst.flipAngle += inst.flipSpeed;
    
    const ix = cx + Math.cos(inst.angle) * inst.r;
    const iy = cy + Math.sin(inst.angle) * inst.r * 0.45 + Math.sin(inst.floatOffset + Date.now()*0.001) * 6;
    
    const squishI = Math.abs(Math.cos(inst.flipAngle)) * 0.7 + 0.3;
    
    // instrument card bg
    cCtx.save();
    cCtx.translate(ix, iy);
    cCtx.scale(squishI, 1);
    
    cCtx.beginPath();
    cCtx.roundRect(-16, -16, 32, 32, 4);
    cCtx.fillStyle = inst.color === '#C9A84C' ? 'rgba(201,168,76,0.12)' : 'rgba(123,94,167,0.12)';
    cCtx.fill();
    cCtx.strokeStyle = inst.color + '55';
    cCtx.lineWidth = 1;
    cCtx.stroke();
    
    cCtx.fillStyle = inst.color;
    cCtx.font = '16px DM Mono, monospace';
    cCtx.textAlign = 'center';
    cCtx.textBaseline = 'middle';
    cCtx.fillText(inst.symbol, 0, 0);
    cCtx.restore();
  });
  
  coinAngle += 0.025;
}

function coinLoop() { drawCoin(); (window as any).coinRaf = requestAnimationFrame(coinLoop); }
coinLoop();

// ─── COUNT-UP NUMBERS ───
function countUp(el: any, target: number, duration = 1500) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) { el.textContent = target + (el.dataset.suffix || ''); clearInterval(timer); return; }
    el.textContent = Math.floor(start) + (el.dataset.suffix || '');
  }, 16);
}

// ─── INTERSECTION OBSERVER ───
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible', 'vis');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .problem-card, .alert-card').forEach(el => io.observe(el));

// Count up stats
const statNums = document.querySelectorAll('.stat-num[data-count]');
const statIO = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      countUp(entry.target, parseInt((entry.target as HTMLElement).dataset.count || '0'));
      statIO.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
statNums.forEach(el => statIO.observe(el));

// Alert cards staggered
document.querySelectorAll('.alert-card').forEach((card: any, i) => {
  card.style.transitionDelay = i * 0.1 + 's';
});

// ─── SCROLL PARALLAX ON HERO TITLE ───
window.addEventListener('scroll', () => {
  const sy = window.scrollY;
  const heroContent = document.querySelector('.hero-content') as HTMLElement;
  if (heroContent) {
    heroContent.style.transform = `translateY(${sy * 0.3}px)`;
    heroContent.style.opacity = (1 - sy / 600).toString();
  }
});

// ─── MOUSE PARALLAX ON CARDS ───
document.addEventListener('mousemove', e => {
  const cards = document.querySelectorAll('.debate-visual, .portfolio-visual, .arch-grid-cell');
  cards.forEach((card: any) => {
    const rect = card.getBoundingClientRect();
    const cx = rect.left + rect.width/2;
    const cy = rect.top + rect.height/2;
    const dx = (e.clientX - cx) / rect.width * 8;
    const dy = (e.clientY - cy) / rect.height * 4;
    card.style.transform = `perspective(1000px) rotateY(${dx}deg) rotateX(${-dy}deg)`;
  });
});

    
    return () => {
        (window as any).landingScriptInitialized = false;
        // Basic cleanup
        if ((window as any).heroRaf) cancelAnimationFrame((window as any).heroRaf);
        if ((window as any).coinRaf) cancelAnimationFrame((window as any).coinRaf);
        if ((window as any).trailRaf) cancelAnimationFrame((window as any).trailRaf);
        document.body.style.cursor = 'auto';
    };

  }, []);

  return (
    <div className="landing-body">
      

{/* CURSOR */}
<div className="cursor" id="cursor"></div>
<div className="cursor-trail" id="cursor-trail"></div>

{/* NAV */}
<nav>
  <div className="nav-logo">ET Alpha</div>
  <div className="nav-links">
    <a href="#">Features</a>
    <a href="#">How it works</a>
    <a href="#">Intelligence</a>
    <a href="/dashboard" className="nav-cta">Launch App →</a>
  </div>
</nav>

{/* LIVE TICKER */}
<div className="ticker-section" style={{marginTop: '0', position: 'fixed', top: '72px', zIndex: '99', width: '100%', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)'}}>
  <div className="ticker-track" id="ticker">
    <div className="ticker-item"><span className="t-symbol">NIFTY 50</span><span className="t-price">22,461.05</span><span className="t-change t-up">▲ +0.34%</span></div>
    <div className="ticker-item"><span className="t-symbol">RELIANCE</span><span className="t-price">2,847.30</span><span className="t-change t-up">▲ +1.2%</span></div>
    <div className="ticker-item"><span className="t-symbol">HDFC BANK</span><span className="t-price">1,624.55</span><span className="t-change t-down">▼ -0.8%</span></div>
    <div className="ticker-item"><span className="t-symbol">INFOSYS</span><span className="t-price">1,782.90</span><span className="t-change t-up">▲ +2.1%</span></div>
    <div className="ticker-item"><span className="t-symbol">ZOMATO</span><span className="t-price">238.45</span><span className="t-change t-up">▲ +3.4%</span></div>
    <div className="ticker-item"><span className="t-symbol">TATA MOTORS</span><span className="t-price">924.80</span><span className="t-change t-down">▼ -1.5%</span></div>
    <div className="ticker-item"><span className="t-symbol">SENSEX</span><span className="t-price">73,847.16</span><span className="t-change t-up">▲ +0.28%</span></div>
    <div className="ticker-item"><span className="t-symbol">BANK NIFTY</span><span className="t-price">48,230.10</span><span className="t-change t-down">▼ -0.15%</span></div>
    <div className="ticker-item"><span className="t-symbol">VIX</span><span className="t-price">14.82</span><span className="t-change t-down">▼ -2.1%</span></div>
    {/* duplicate for seamless scroll */}
    <div className="ticker-item"><span className="t-symbol">NIFTY 50</span><span className="t-price">22,461.05</span><span className="t-change t-up">▲ +0.34%</span></div>
    <div className="ticker-item"><span className="t-symbol">RELIANCE</span><span className="t-price">2,847.30</span><span className="t-change t-up">▲ +1.2%</span></div>
    <div className="ticker-item"><span className="t-symbol">HDFC BANK</span><span className="t-price">1,624.55</span><span className="t-change t-down">▼ -0.8%</span></div>
    <div className="ticker-item"><span className="t-symbol">INFOSYS</span><span className="t-price">1,782.90</span><span className="t-change t-up">▲ +2.1%</span></div>
    <div className="ticker-item"><span className="t-symbol">ZOMATO</span><span className="t-price">238.45</span><span className="t-change t-up">▲ +3.4%</span></div>
    <div className="ticker-item"><span className="t-symbol">TATA MOTORS</span><span className="t-price">924.80</span><span className="t-change t-down">▼ -1.5%</span></div>
    <div className="ticker-item"><span className="t-symbol">SENSEX</span><span className="t-price">73,847.16</span><span className="t-change t-up">▲ +0.28%</span></div>
    <div className="ticker-item"><span className="t-symbol">BANK NIFTY</span><span className="t-price">48,230.10</span><span className="t-change t-down">▼ -0.15%</span></div>
    <div className="ticker-item"><span className="t-symbol">VIX</span><span className="t-price">14.82</span><span className="t-change t-down">▼ -2.1%</span></div>
  </div>
</div>

{/* HERO */}
<section className="hero" style={{paddingTop: '200px'}}>
  <canvas id="hero-canvas"></canvas>
  <div className="hero-content">
    <div className="hero-eyebrow">
      <span className="eyebrow-dot"></span>
      Now live — ET AI Hackathon 2025
    </div>
    <h1 className="hero-title">
      <span className="line-1">The Conviction</span>
      <span className="line-2"><span className="cursive-accent" style={{ fontSize: '1.4em', letterSpacing: '0', textTransform: 'capitalize', fontWeight: 'normal' }}>Engine</span></span>
    </h1>
    <p className="hero-sub">AI-powered stock market intelligence for 14 crore Indian retail investors. Stop reacting. Start deciding.</p>
    <div className="hero-actions">
      <a href="#" className="btn-primary"><span>Start Your Alpha Journey</span></a>
      <a href="#" className="btn-ghost">
        Watch Demo
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </a>
    </div>
  </div>
  <div className="hero-stats">
    <div className="hero-stat">
      <span className="stat-num" data-count="14">0</span>
      <span className="stat-label">Crore Demat Accounts</span>
    </div>
    <div className="hero-stat">
      <span className="stat-num" data-count="500">0</span>
      <span className="stat-label">NSE Stocks Monitored</span>
    </div>
    <div className="hero-stat">
      <span className="stat-num" data-count="12">0</span>
      <span className="stat-label">AI Agents Running</span>
    </div>
  </div>
</section>

{/* PROBLEM SECTION */}
<section style={{padding: '120px 48px', background: 'var(--surface)'}}>
  <div style={{maxWidth: '1200px', margin: '0 auto'}}>
    <div className="section-label reveal">The Problem</div>
    <div className="problem-grid">
      <div className="reveal-left">
        <h2 className="problem-title">Retail investors are <em className="cursive-accent">flying blind.</em></h2>
        <div className="divider"></div>
        <p style={{color: 'var(--gray-light)', fontSize: '16px', lineHeight: '1.8', maxWidth: '420px', marginTop: '20px'}}>
          You have access to the same data as hedge funds. You don't have the intelligence layer to interpret it.
        </p>
        <div style={{marginTop: '36px', padding: '24px', background: 'rgba(201,168,76,0.04)', border: '1px solid rgba(201,168,76,0.12)', borderRadius: '4px'}}>
          <div style={{fontFamily: "'DM Mono', monospace", fontSize: '32px', color: 'var(--gold-light)'}}>₹7,600</div>
          <div style={{fontSize: '13px', color: 'var(--gray-light)', marginTop: '6px'}}>lost per retail investor annually vs Nifty<br/><span style={{fontSize: '11px', color: 'var(--gray)'}}>Source: SEBI study on retail investor returns</span></div>
        </div>
      </div>
      <div className="problem-cards">
        <div className="problem-card" style={{transitionDelay: '0s'}}>
          <h4>Reacting to tips, not intelligence</h4>
          <p>WhatsApp groups and TV anchors drive 73% of retail buy decisions. Zero signal quality.</p>
        </div>
        <div className="problem-card" style={{transitionDelay: '0.12s'}}>
          <h4>Missing critical filings in real time</h4>
          <p>Insider buys, bulk deals, and management changes move stocks 5–8% before retail notices.</p>
        </div>
        <div className="problem-card" style={{transitionDelay: '0.24s'}}>
          <h4>Gut-feel portfolio management</h4>
          <p>Most investors don't know their real XIRR, actual sector concentration, or correlation risk.</p>
        </div>
        <div className="problem-card" style={{transitionDelay: '0.36s'}}>
          <h4>No AI layer for Indian markets</h4>
          <p>Global tools built for NASDAQ. Zero context for NSE dynamics, FII flows, or SEBI filings.</p>
        </div>
      </div>
    </div>
  </div>
</section>

{/* COIN / INTRO SECTION */}
<section className="coin-section">
  <div style={{position: 'absolute', inset: '0', background: 'radial-gradient(ellipse 60% 80% at 50% 50%, rgba(201,168,76,0.04), transparent)', pointerEvents: 'none'}}></div>
  <div className="coin-section-inner">
    <canvas id="coin-canvas"></canvas>
    <div className="reveal" style={{maxWidth: '600px', margin: '0 auto', padding: '0 24px'}}>
      <div className="section-label" style={{justifyContent: 'center'}}>The Solution</div>
      <h2 className="coin-label">From noise to <em className="cursive-accent" style={{color: 'var(--gold)'}}>signal</em> to decision</h2>
      <p className="coin-sub">ET Alpha fuses 8 independent signal layers, 12 AI agents, and real-time market intelligence into a single conviction score that tells you what to think — and why.</p>
    </div>
  </div>
</section>

{/* FEATURES ─ SCROLLYTELLING */}

{/* FEATURE 1: DEBATE */}
<section className="feature-step">
  <div className="feature-text reveal-left">
    <span className="feature-num">01</span>
    <div className="feature-tag">Bull vs Bear Debate</div>
    <h2 className="feature-h">Every stock argues its own case</h2>
    <p className="feature-p">Two AI agents — one trained to find the bull case, one to find the bear — debate every stock simultaneously. An arbitrator weighs historical signal accuracy and delivers a conviction score.</p>
    <div className="feature-bullets">
      <div className="feature-bullet"><div className="bullet-icon"></div>Streams both arguments in parallel, live</div>
      <div className="feature-bullet"><div className="bullet-icon"></div>8 signal types: technicals, FII flow, insider trades, sentiment</div>
      <div className="feature-bullet"><div className="bullet-icon"></div>Every claim cites its data source</div>
      <div className="feature-bullet"><div className="bullet-icon"></div>Final score updates your portfolio risk in real time</div>
    </div>
  </div>
  <div className="feature-visual reveal-right">
    <div className="debate-visual">
      <div className="debate-header">
        <div>
          <div className="dh-stock">ZOMATO.NS</div>
          <div style={{marginTop: '2px', fontSize: '11px', color: 'var(--gray)'}}>Quick Commerce · NSE</div>
        </div>
        <div style={{textAlign: 'right'}}>
          <div className="dh-price" style={{fontFamily: "'DM Mono', monospace", fontSize: '20px'}}>₹238.45</div>
          <div className="dh-change">▲ +3.4% today</div>
        </div>
      </div>
      <div className="debate-cols">
        <div className="debate-col bull-col">
          <div className="col-label bull-label">◆ Bull Case</div>
          <div className="col-args">
            <div className="arg-item"><div className="arg-dot bull-dot"></div>FII net buying ₹847Cr this week</div>
            <div className="arg-item"><div className="arg-dot bull-dot"></div>Cup & handle breakout confirmed</div>
            <div className="arg-item"><div className="arg-dot bull-dot"></div>Earnings beat +22% vs estimate</div>
            <div className="arg-item"><div className="arg-dot bull-dot"></div>GOV quick commerce tailwind</div>
          </div>
        </div>
        <div className="debate-col bear-col">
          <div className="col-label bear-label">◇ Bear Case</div>
          <div className="col-args">
            <div className="arg-item"><div className="arg-dot bear-dot"></div>P/E at 180x — richly valued</div>
            <div className="arg-item"><div className="arg-dot bear-dot"></div>Promoter sold 1.2% stake</div>
            <div className="arg-item"><div className="arg-dot bear-dot"></div>Blinkit margin pressure</div>
            <div className="arg-item"><div className="arg-dot bear-dot"></div>Rising competitive intensity</div>
          </div>
        </div>
      </div>
      <div className="score-bar">
        <div className="score-label">Conviction</div>
        <div className="score-track"><div className="score-fill"></div></div>
        <div className="score-val">6.2</div>
      </div>
    </div>
  </div>
</section>

{/* FEATURE 2: CONFLUENCE SCORE */}
<section className="feature-step" style={{background: 'var(--surface)'}}>
  <div className="feature-visual reveal-left">
    <div style={{padding: '40px', display: 'flex', flexDirection: 'column', gap: '12px'}}>
      {/* Radar visualization using SVG */}
      <div style={{position: 'relative', display: 'flex', justifyContent: 'center'}}>
        <svg viewBox="0 0 320 320" width="320" height="320">
          <defs>
            <radialGradient id="rg" cx="50%" cy="50%">
              <stop offset="0%" stopColor="#C9A84C" stopOpacity="0.15"/>
              <stop offset="100%" stopColor="#7B5EA7" stopOpacity="0.05"/>
            </radialGradient>
          </defs>
          {/* Grid rings */}
          <polygon points="160,40 236,88 236,232 160,280 84,232 84,88" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
          <polygon points="160,80 212,112 212,208 160,240 108,208 108,112" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
          <polygon points="160,120 188,136 188,184 160,200 132,184 132,136" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1"/>
          {/* Data polygon - filled */}
          <polygon points="160,55 228,105 218,220 160,270 102,210 95,100" fill="url(#rg)" stroke="#C9A84C" strokeWidth="1.5" opacity="0.8"/>
          {/* Labels */}
          <text x="160" y="30" textAnchor="middle" fill="#8A8A8A" fontSize="10" fontFamily="DM Mono">Technical</text>
          <text x="255" y="95" textAnchor="start" fill="#8A8A8A" fontSize="10" fontFamily="DM Mono">Volume</text>
          <text x="248" y="240" textAnchor="start" fill="#8A8A8A" fontSize="10" fontFamily="DM Mono">Sentiment</text>
          <text x="160" y="298" textAnchor="middle" fill="#8A8A8A" fontSize="10" fontFamily="DM Mono">Earnings</text>
          <text x="52" y="240" textAnchor="end" fill="#8A8A8A" fontSize="10" fontFamily="DM Mono">Smart$</text>
          <text x="60" y="95" textAnchor="end" fill="#8A8A8A" fontSize="10" fontFamily="DM Mono">FII Flow</text>
          {/* Center score */}
          <text x="160" y="155" textAnchor="middle" fill="#F0CC6E" fontSize="32" fontFamily="DM Mono" fontWeight="500">7.8</text>
          <text x="160" y="175" textAnchor="middle" fill="#5A5A5A" fontSize="11" fontFamily="DM Sans">Conviction Score</text>
          {/* Dot markers */}
          <circle cx="160" cy="55" r="3" fill="#C9A84C"/>
          <circle cx="228" cy="105" r="3" fill="#C9A84C"/>
          <circle cx="218" cy="220" r="3" fill="#C9A84C"/>
          <circle cx="160" cy="270" r="3" fill="#C9A84C"/>
          <circle cx="102" cy="210" r="3" fill="#7B5EA7"/>
          <circle cx="95" cy="100" r="3" fill="#7B5EA7"/>
        </svg>
      </div>
      <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px'}}>
        <div style={{padding: '12px 14px', background: 'rgba(201,168,76,0.05)', border: '1px solid rgba(201,168,76,0.12)', borderRadius: '3px'}}>
          <div style={{fontSize: '10px', color: 'var(--gray)', marginBottom: '4px'}}>Update Frequency</div>
          <div style={{fontFamily: "'DM Mono', monospace", fontSize: '14px', color: 'var(--gold-light)'}}>15 min</div>
        </div>
        <div style={{padding: '12px 14px', background: 'rgba(34,197,94,0.05)', border: '1px solid rgba(34,197,94,0.12)', borderRadius: '3px'}}>
          <div style={{fontSize: '10px', color: 'var(--gray)', marginBottom: '4px'}}>Signal Accuracy</div>
          <div style={{fontFamily: "'DM Mono', monospace", fontSize: '14px', color: 'var(--bull)'}}>68.4%</div>
        </div>
      </div>
    </div>
  </div>
  <div className="feature-text reveal-right">
    <span className="feature-num">02</span>
    <div className="feature-tag">Confluence Score Engine</div>
    <h2 className="feature-h">Eight signals. One radar. Zero noise.</h2>
    <p className="feature-p">Every stock scored across 8 independent signal layers simultaneously. Technical, fundamental, sentiment, and smart money — all fused into a single 1–10 score. Updated every 15 minutes.</p>
    <div className="feature-bullets">
      <div className="feature-bullet"><div className="bullet-icon"></div>Technical pattern detection via OHLCV analysis</div>
      <div className="feature-bullet"><div className="bullet-icon"></div>FII/DII net flow direction</div>
      <div className="feature-bullet"><div className="bullet-icon"></div>Volume anomaly & momentum shift</div>
      <div className="feature-bullet"><div className="bullet-icon"></div>Earnings surprise + management sentiment delta</div>
    </div>
  </div>
</section>

{/* FEATURE 3: RADAR / ALERTS */}
<section className="feature-step">
  <div className="feature-text reveal-left">
    <span className="feature-num">03</span>
    <div className="feature-tag">Opportunity Radar</div>
    <h2 className="feature-h">See it before <em className="cursive-accent" style={{color: 'var(--gold)'}}>Twitter does.</em></h2>
    <p className="feature-p">A background agent monitors the entire NSE universe every 15 minutes. Insider buys, block deals, breakouts, FII accumulation — surfaced as actionable signals, not summaries.</p>
    <div className="feature-bullets">
      <div className="feature-bullet"><div className="bullet-icon"></div>10 signal types monitored continuously</div>
      <div className="feature-bullet"><div className="bullet-icon"></div>Natural language alert descriptions</div>
      <div className="feature-bullet"><div className="bullet-icon"></div>Instant confluence score on every alert</div>
      <div className="feature-bullet"><div className="bullet-icon"></div>One-click to open Bull/Bear debate</div>
    </div>
  </div>
  <div className="feature-visual reveal-right">
    <div className="alerts-visual" id="alerts-container">
      <div className="alert-card">
        <div className="alert-type at-insider">Insider Buy</div>
        <div className="alert-body">
          <strong>DIXON TECH</strong>
          <span>Director bought ₹2.4Cr — 3rd time in 60 days</span>
        </div>
        <div className="alert-score">8.4</div>
        <div className="alert-new">New</div>
      </div>
      <div className="alert-card">
        <div className="alert-type at-break">Breakout</div>
        <div className="alert-body">
          <strong>POLYCAB INDIA</strong>
          <span>52-week high breakout with 3.2x avg volume</span>
        </div>
        <div className="alert-score">7.9</div>
        <div className="alert-new">New</div>
      </div>
      <div className="alert-card">
        <div className="alert-type at-fii">FII Flow</div>
        <div className="alert-body">
          <strong>DEFENCE SECTOR</strong>
          <span>FII net buying for 6 consecutive sessions</span>
        </div>
        <div className="alert-score">7.2</div>
      </div>
      <div className="alert-card">
        <div className="alert-type at-earn">Earnings Beat</div>
        <div className="alert-body">
          <strong>KAJARIA CERAM</strong>
          <span>Earnings beat +18% vs consensus estimate</span>
        </div>
        <div className="alert-score">6.8</div>
      </div>
    </div>
  </div>
</section>

{/* FEATURE 4: PORTFOLIO */}
<section className="feature-step" style={{background: 'var(--surface)'}}>
  <div className="feature-visual reveal-left">
    <div className="portfolio-visual">
      <div className="pv-header">
        <div className="pv-title">Portfolio X-Ray</div>
        <div className="pv-xirr">
          +24.7%<span className="pv-xirr-label">XIRR (True Return)</span>
        </div>
        <div style={{fontSize: '11px', color: 'var(--gray)', marginTop: '4px'}}>vs Nifty 50: +14.2% — Outperforming ✓</div>
      </div>
      <div className="treemap">
        <div className="tm-cell tm-c1">
          <span className="tm-name">RELIANCE</span>
          <span className="tm-change t-up">+1.2%</span>
        </div>
        <div className="tm-cell tm-c2">
          <span className="tm-name">HDFC BANK</span>
          <span className="tm-change t-down">-0.8%</span>
        </div>
        <div className="tm-cell tm-c3">
          <span className="tm-name">INFOSYS</span>
          <span className="tm-change t-up">+2.1%</span>
        </div>
        <div className="tm-cell tm-c4">
          <span className="tm-name">TATA MOTORS</span>
          <span className="tm-change t-down">-1.5%</span>
        </div>
        <div className="tm-cell tm-c5">
          <span className="tm-name">ZOMATO</span>
          <span className="tm-change t-up">+3.4%</span>
        </div>
      </div>
      <div style={{marginTop: '16px', padding: '12px 14px', background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.12)', borderRadius: '3px', display: 'flex', gap: '10px', alignItems: 'flex-start'}}>
        <span style={{color: 'var(--bear)', fontSize: '14px'}}>⚠</span>
        <div style={{fontSize: '11px', color: 'var(--gray-light)'}}>HDFC Bank + Kotak Bank are 91% correlated — your "diversification" may be illusory</div>
      </div>
    </div>
  </div>
  <div className="feature-text reveal-right">
    <span className="feature-num">04</span>
    <div className="feature-tag">Portfolio X-Ray</div>
    <h2 className="feature-h">Know your portfolio's true DNA</h2>
    <p className="feature-p">Upload your holdings and get instant XIRR, concentration risk, correlation matrix, and stress test results. Find the hidden risks your broker never shows you.</p>
    <div className="feature-bullets">
      <div className="feature-bullet"><div className="bullet-icon"></div>True XIRR — not point-to-point returns</div>
      <div className="feature-bullet"><div className="bullet-icon"></div>Correlation matrix: see which stocks move together</div>
      <div className="feature-bullet"><div className="bullet-icon"></div>Stress test against COVID crash, 2008, taper tantrum</div>
      <div className="feature-bullet"><div className="bullet-icon"></div>AI rebalancing suggestions with tax impact</div>
    </div>
  </div>
</section>

{/* ARCHITECTURE SECTION */}
<section className="arch-section">
  <div className="section-label reveal" style={{justifyContent: 'center'}}>Under the Hood</div>
  <h2 className="arch-title reveal">12 agents. One decision.</h2>
  <p className="arch-sub reveal">A LangGraph multi-agent system where every agent feeds every other agent. Memory persists. The system gets smarter with every query.</p>
  
  <div className="arch-flow reveal">
    <div className="arch-node">
      <div className="arch-node-icon">⌨</div>
      <div className="arch-node-label">User Input</div>
      <div className="arch-node-type">Trigger</div>
    </div>
    <div className="arch-arrow">→</div>
    <div className="arch-node arch-center">
      <div className="arch-node-icon">🧠</div>
      <div className="arch-node-label">Orchestrator</div>
      <div className="arch-node-type">LangGraph</div>
    </div>
    <div className="arch-arrow">→</div>
    <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
      <div className="arch-node" style={{minWidth: '90px', padding: '10px 14px'}}>
        <div className="arch-node-icon" style={{fontSize: '14px'}}>📊</div>
        <div className="arch-node-label" style={{fontSize: '10px'}}>Signal</div>
      </div>
      <div className="arch-node" style={{minWidth: '90px', padding: '10px 14px'}}>
        <div className="arch-node-icon" style={{fontSize: '14px'}}>🐂</div>
        <div className="arch-node-label" style={{fontSize: '10px'}}>Bull</div>
      </div>
      <div className="arch-node" style={{minWidth: '90px', padding: '10px 14px'}}>
        <div className="arch-node-icon" style={{fontSize: '14px'}}>🐻</div>
        <div className="arch-node-label" style={{fontSize: '10px'}}>Bear</div>
      </div>
    </div>
    <div className="arch-arrow">→</div>
    <div className="arch-node">
      <div className="arch-node-icon">⚖</div>
      <div className="arch-node-label">Arbitrator</div>
      <div className="arch-node-type">Scorer</div>
    </div>
    <div className="arch-arrow">→</div>
    <div className="arch-node">
      <div className="arch-node-icon">💡</div>
      <div className="arch-node-label">Response</div>
      <div className="arch-node-type">Streamed</div>
    </div>
  </div>

  <div className="arch-grid reveal">
    <div className="arch-grid-cell">
      <div className="agc-icon">⚡</div>
      <div className="agc-title">Groq + Claude</div>
      <div className="agc-desc">Llama 3.3-70b for fast inference, Claude as fallback. Sub-2s response times for all agents.</div>
    </div>
    <div className="arch-grid-cell">
      <div className="agc-icon">🧬</div>
      <div className="agc-title">FinBERT Sentiment</div>
      <div className="agc-desc">HuggingFace pretrained model tracks management commentary sentiment delta quarter-over-quarter.</div>
    </div>
    <div className="arch-grid-cell">
      <div className="agc-icon">🗄</div>
      <div className="agc-title">Qdrant Vector DB</div>
      <div className="agc-desc">Persistent memory across sessions. Retrieves relevant past debates and alerts automatically.</div>
    </div>
    <div className="arch-grid-cell">
      <div className="agc-icon">📡</div>
      <div className="agc-title">Real-time Streaming</div>
      <div className="agc-desc">FastAPI + WebSockets. Every agent streams token-by-token to the frontend for live reasoning.</div>
    </div>
    <div className="arch-grid-cell">
      <div className="agc-icon">🔗</div>
      <div className="agc-title">NSE/BSE APIs</div>
      <div className="agc-desc">Live feeds for FII/DII flows, bulk deals, insider trades, and corporate filings cached in Redis.</div>
    </div>
    <div className="arch-grid-cell">
      <div className="agc-icon">🛡</div>
      <div className="agc-title">SEBI Compliant</div>
      <div className="agc-desc">Zero buy/sell signals. Conviction scores and signal analysis only. Built for educational use.</div>
    </div>
  </div>
</section>

{/* CTA */}
<section className="cta-section">
  <div className="cta-bg"></div>
  <div style={{position: 'relative', zIndex: '1'}}>
    <div className="cta-eyebrow reveal">Built for the ET AI Hackathon</div>
    <h2 className="cta-title reveal">Your edge starts <span>today.</span></h2>
    <p className="cta-sub reveal">Stop leaving ₹7,600 on the table every year. Join thousands of Indian investors who see the signal through the noise.</p>
    <div className="cta-actions reveal">
      <a href="#" className="btn-primary" style={{padding: '18px 52px', fontSize: '14px'}}><span>Launch ET Alpha Free →</span></a>
    </div>
    <div style={{marginTop: '60px', display: 'flex', justifyContent: 'center', gap: '60px'}} className="reveal">
      <div style={{textAlign: 'center'}}>
        <div style={{fontFamily: "'DM Mono', monospace", fontSize: '36px', color: 'var(--gold-light)'}}>14Cr+</div>
        <div style={{fontSize: '11px', color: 'var(--gray)', marginTop: '4px', letterSpacing: '1px', textTransform: 'uppercase'}}>Demat accounts</div>
      </div>
      <div style={{textAlign: 'center'}}>
        <div style={{fontFamily: "'DM Mono', monospace", fontSize: '36px', color: 'var(--gold-light)'}}>₹0</div>
        <div style={{fontSize: '11px', color: 'var(--gray)', marginTop: '4px', letterSpacing: '1px', textTransform: 'uppercase'}}>Cost to start</div>
      </div>
      <div style={{textAlign: 'center'}}>
        <div style={{fontFamily: "'DM Mono', monospace", fontSize: '36px', color: 'var(--gold-light)'}}>12</div>
        <div style={{fontSize: '11px', color: 'var(--gray)', marginTop: '4px', letterSpacing: '1px', textTransform: 'uppercase'}}>AI agents</div>
      </div>
    </div>
    <p className="disclaimer reveal">⚠ ET Alpha is for educational and informational purposes only. Not SEBI-registered investment advice. All conviction scores are AI-generated signals, not financial recommendations. Invest responsibly.</p>
  </div>
</section>

{/* FOOTER */}
<footer>
  <div className="footer-brand">
    <div className="footer-logo">ET Alpha</div>
    <div className="footer-tagline">The Conviction Engine for Indian Retail Investors</div>
  </div>
  <div className="footer-links">
    <a href="#">Features</a>
    <a href="#">Architecture</a>
    <a href="#">Disclaimer</a>
    <a href="#">GitHub</a>
  </div>
  <div className="footer-copy">
    © 2025 ET Alpha — Built for ET AI Hackathon · For educational purposes only · Not investment advice
  </div>
</footer>


    </div>
  );
}
