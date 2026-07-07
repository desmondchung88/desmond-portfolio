/**
 * ============================================================
 * FINTECH PORTFOLIO — Portfolio.jsx
 * ============================================================
 * Stack: React 18 + Framer Motion 11
 * Theme: Dark / Data-Terminal / Fintech Infrastructure
 *
 * QUICK-START REPLACEMENTS (search "REPLACE"):
 *   1. "YOUR NAME"    → your full name (Hero h1 + Footer)
 *   2. "YN.DEV"       → your initials (Nav logo)
 *   3. /resume.pdf    → your actual resume file path
 *   4. LinkedIn / GitHub / Email in the Contact links array
 *   5. GitHub repo URLs inside the PROJECTS array
 *   6. "Based in Singapore" → your city / location
 * ============================================================
 */

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useInView } from "framer-motion";

// ─── Design Tokens ───────────────────────────────────────────
const T = {
  bgPrimary:     "#020B18",
  bgCard:        "#061525",
  accent:        "#00CFFF",
  accentGreen:   "#00FF9D",
  accentAmber:   "#FFA040",
  textPrimary:   "#E4F4FF",
  textSecondary: "#5E90B0",
  textMuted:     "#2E5470",
  fontDisplay:   "'Orbitron', monospace",
  fontMono:      "'JetBrains Mono', monospace",
  fontBody:      "'DM Sans', sans-serif",
};

// ─── Skills Data ──────────────────────────────────────────────
// REPLACE: swap out any skills that don't match yours
const SKILLS = {
  "Backend & Systems": {
    color: T.accent,
    items: ["Python", "Java", "C++", "Node.js", "FastAPI", "WebSockets"],
  },
  "Data & Infrastructure": {
    color: T.accentAmber,
    items: ["PostgreSQL", "MySQL", "MongoDB", "Docker"],
  },
  "Frontend": {
    color: T.accentGreen,
    items: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Vue.js"],
  },
};

// ─── Projects Data ────────────────────────────────────────────
// REPLACE: update titles, descriptions, tags, and github links

const PROJECTS = [
  {
    id: 1,
    code: "01",
    title: "MacroSight",
    subtitle: "AI Macro Intelligence Dashboard",
    description:
      "Real-time AI platform for institutional asset managers — built in 48 hours. " +
      "Ingests, classifies, and sentiment-scores macro news across 6 themes automatically, " +
      "surfacing signals before they move markets. " +
      "Ranked 4th out of 170+ teams (Top 3%) at the FinTech Innovator's Hackathon 2026.",
    highlights: [
      "7-source concurrent ingestion — 350 articles processed in under 5 seconds",
      "FinBERT sentiment scoring — 36× faster via batch processing (9 min → 15 sec)",
      "Bollinger Band Z-score anomaly detection — adaptive HOT / COOL theme signals",
      "Pearson correlation network — 15 cross-theme relationships mapped in real time",
      "MAS-compliant RAG chatbot — 3-layer compliance gate, zero financial advice",
      "7-gate filter pipeline — 80% noise rejection, Levenshtein fuzzy deduplication",
    ],
    tags: ["Python", "FastAPI", "PostgreSQL", "Next.js", "React", "Docker", "FinBERT", "Groq Llama 3.1"],
    github: "https://github.com/desmondchung88/macro-tracker",
    accent: T.accent,
    accentRgb: "0,207,255",
    wide: true,
  }
  // {
  //   id: 2,
  //   code: "02",
  //   title: "ActiveAge",
  //   subtitle: "Senior Wellness & Health Platform",
  //   description:
  //     "A mobile-first wellness application connecting elderly users with personalised health tracking, medication management, and community features. Built on an offline-first architecture with WCAG 2.1 AAA compliance.",
  //   highlights: [
  //     "Offline-first sync with conflict resolution strategy",
  //     "Real-time BLE wearable device data integration",
  //     "WCAG 2.1 AAA full accessibility compliance",
  //   ],
  //   tags: ["React Native", "Node.js", "MongoDB", "Firebase", "REST API", "BLE"],
  //   github: "https://github.com/desmondchung88/active-ageing-fitness",
  //   accent: T.accentGreen,
  //   accentRgb: "0,255,157",
  //   wide: false,
  // },
];


// ─── Animation Variants ───────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

// ─── Hooks ────────────────────────────────────────────────────
const useTypewriter = (texts, speed = 78, pause = 2200) => {
  const [display, setDisplay] = useState("");
  const [idx, setIdx]         = useState(0);
  const [char, setChar]       = useState(0);
  const [del, setDel]         = useState(false);

  useEffect(() => {
    const cur = texts[idx];
    let t;
    if (!del && char < cur.length)        t = setTimeout(() => setChar(c => c + 1), speed);
    else if (!del && char === cur.length) t = setTimeout(() => setDel(true), pause);
    else if (del && char > 0)             t = setTimeout(() => setChar(c => c - 1), speed / 2);
    else if (del && char === 0)           { setDel(false); setIdx(i => (i + 1) % texts.length); }
    setDisplay(cur.slice(0, char));
    return () => clearTimeout(t);
  }, [char, del, idx, texts, speed, pause]);

  return display;
};

const useWindowWidth = () => {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  useEffect(() => {
    const fn = () => setW(window.innerWidth);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return w;
};

// ─── Global Styles ────────────────────────────────────────────
const GlobalStyles = () => {
  useEffect(() => {
    // Fonts are loaded from index.html so they're ready on first paint.
    const style = document.createElement("style");
    style.textContent = `
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      html { scroll-behavior: smooth; }
      body {
        font-family: 'DM Sans', sans-serif;
        background: #020B18;
        color: #E4F4FF;
        overflow-x: hidden;
        -webkit-font-smoothing: antialiased;
      }
      ::-webkit-scrollbar { width: 3px; }
      ::-webkit-scrollbar-track { background: transparent; }
      ::-webkit-scrollbar-thumb { background: rgba(0,207,255,0.28); border-radius: 2px; }

      @keyframes blink {
        0%, 100% { opacity: 1; }
        50%       { opacity: 0; }
      }
      @keyframes scanDrop {
        0%   { opacity: 1; transform: scaleY(0); transform-origin: top; }
        100% { opacity: 0; transform: scaleY(1); transform-origin: top; }
      }

      /* Keyboard navigation: visible focus ring on links & buttons */
      a:focus-visible, button:focus-visible {
        outline: 2px solid rgba(0,207,255,0.65);
        outline-offset: 3px;
        border-radius: 6px;
      }

      /* Respect users who turn off motion */
      @media (prefers-reduced-motion: reduce) {
        html { scroll-behavior: auto; }
        *, *::before, *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      try {
        document.head.removeChild(style);
      } catch (_) {}
    };
  }, []);
  return null;
};

// ─── Node Canvas (Hero BG) ────────────────────────────────────
const NodeCanvas = () => {
  const ref   = useRef(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const nodes = useRef([]);
  const raf   = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let W, H;
    const resize = () => {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width  = W * dpr;
      canvas.height = H * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();

    nodes.current = Array.from({ length: 68 }, () => ({
      x:  Math.random() * W,
      y:  Math.random() * H,
      vx: (Math.random() - 0.5) * 0.38,
      vy: (Math.random() - 0.5) * 0.38,
      r:  Math.random() * 1.5 + 0.5,
    }));

    const tick = () => {
      ctx.clearRect(0, 0, W, H);
      const ns = nodes.current;
      const mx = mouse.current.x;
      const my = mouse.current.y;

      ns.forEach(n => {
        const dx = mx - n.x, dy = my - n.y;
        const d  = Math.hypot(dx, dy);
        if (d < 210 && d > 0) {
          const f = ((210 - d) / 210) * 0.022;
          n.vx += (dx / d) * f;
          n.vy += (dy / d) * f;
        }
        const spd = Math.hypot(n.vx, n.vy);
        if (spd > 1.05) { n.vx = (n.vx / spd) * 1.05; n.vy = (n.vy / spd) * 1.05; }
        n.x += n.vx; n.y += n.vy;
        if (n.x <= 0 || n.x >= W) { n.vx *= -1; n.x = Math.max(0, Math.min(W, n.x)); }
        if (n.y <= 0 || n.y >= H) { n.vy *= -1; n.y = Math.max(0, Math.min(H, n.y)); }
      });

      for (let i = 0; i < ns.length; i++) {
        for (let j = i + 1; j < ns.length; j++) {
          const d = Math.hypot(ns[i].x - ns[j].x, ns[i].y - ns[j].y);
          if (d < 155) {
            ctx.beginPath();
            ctx.moveTo(ns[i].x, ns[i].y);
            ctx.lineTo(ns[j].x, ns[j].y);
            ctx.strokeStyle = `rgba(0,207,255,${(1 - d / 155) * 0.17})`;
            ctx.lineWidth   = 0.55;
            ctx.stroke();
          }
        }
        const dm   = Math.hypot(ns[i].x - mx, ns[i].y - my);
        const near = dm < 160;
        ctx.beginPath();
        ctx.arc(ns[i].x, ns[i].y, near ? ns[i].r * 2.6 : ns[i].r, 0, Math.PI * 2);
        ctx.fillStyle = near ? "rgba(0,207,255,0.92)" : "rgba(0,207,255,0.3)";
        ctx.fill();
      }

      raf.current = requestAnimationFrame(tick);
    };

    // Reduced motion: render a single static frame instead of animating.
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      const ns = nodes.current;
      for (let i = 0; i < ns.length; i++) {
        for (let j = i + 1; j < ns.length; j++) {
          const d = Math.hypot(ns[i].x - ns[j].x, ns[i].y - ns[j].y);
          if (d < 155) {
            ctx.beginPath();
            ctx.moveTo(ns[i].x, ns[i].y);
            ctx.lineTo(ns[j].x, ns[j].y);
            ctx.strokeStyle = `rgba(0,207,255,${(1 - d / 155) * 0.17})`;
            ctx.lineWidth = 0.55;
            ctx.stroke();
          }
        }
        ctx.beginPath();
        ctx.arc(ns[i].x, ns[i].y, ns[i].r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0,207,255,0.3)";
        ctx.fill();
      }
    } else {
      tick();
    }

    const onResize = () => {
      resize();
      nodes.current.forEach(n => { n.x = Math.min(n.x, W); n.y = Math.min(n.y, H); });
    };
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(raf.current); window.removeEventListener("resize", onResize); };
  }, []);

  const onMove = useCallback(e => {
    const r = ref.current?.getBoundingClientRect();
    if (r) mouse.current = { x: e.clientX - r.left, y: e.clientY - r.top };
  }, []);

  return (
    <canvas
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => { mouse.current = { x: -9999, y: -9999 }; }}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
    />
  );
};

// ─── Navbar ───────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "Stack",    href: "#skills"   },
  { label: "Projects", href: "#projects" },
  { label: "Contact",  href: "#contact"  },
];

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const width    = useWindowWidth();
  const isMobile = width < 768;

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Close the mobile menu if the viewport grows past the breakpoint.
  useEffect(() => {
    if (!isMobile) setMenuOpen(false);
  }, [isMobile]);

  return (
    <nav style={{
      position:       "fixed",
      top: 0, left: 0, right: 0,
      zIndex:         999,
      height:         72,
      display:        "flex",
      alignItems:     "center",
      justifyContent: "space-between",
      padding:        "0 clamp(1.2rem, 5vw, 3rem)",
      background:     scrolled ? "rgba(2,11,24,0.92)" : "rgba(2,11,24,0.6)",
      backdropFilter: "blur(24px)",
      borderBottom:   `1px solid ${scrolled ? "rgba(0,207,255,0.1)" : "rgba(0,207,255,0.05)"}`,
      transition:     "all 0.4s ease",
    }}>

      {/* Left — Logo */}
      <a href="#home" style={{
        fontFamily:     T.fontDisplay,
        fontSize:       15,
        fontWeight:     700,
        color:          T.accent,
        letterSpacing:  "0.22em",
        textDecoration: "none",
        flexShrink:     0,
      }}>
        DC<span style={{ color: T.accentGreen }}>.</span>DEV
      </a>

      {/* Centre — Nav links */}
      {!isMobile && (
        <div style={{
          position:       "absolute",
          left:           "50%",
          transform:      "translateX(-50%)",
          display:        "flex",
          alignItems:     "center",
          gap:            6,
          background:     "rgba(0,207,255,0.04)",
          border:         "1px solid rgba(0,207,255,0.1)",
          borderRadius:   50,
          padding:        "6px 8px",
        }}>
          {NAV_LINKS.map(l => <NavPill key={l.label} href={l.href} label={l.label} />)}
        </div>
      )}

      {/* Right — Resume button + mobile menu toggle */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
        <motion.a
          href="/myresume.docx"
          download
          whileHover={{
            boxShadow: "0 0 22px rgba(0,207,255,0.4)",
            background: "rgba(0,207,255,0.18)",
            y: -1,
          }}
          style={{
            fontFamily:     T.fontMono,
            fontSize:       12,
            fontWeight:     600,
            color:          T.accent,
            textDecoration: "none",
            border:         "1px solid rgba(0,207,255,0.35)",
            background:     "rgba(0,207,255,0.07)",
            padding:        "9px 22px",
            borderRadius:   6,
            letterSpacing:  "0.1em",
            display:        "inline-block",
          }}
        >
          Resume ↓
        </motion.a>

        {isMobile && (
          <button
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            style={{
              background:   "rgba(0,207,255,0.05)",
              border:       "1px solid rgba(0,207,255,0.18)",
              borderRadius: 6,
              width:        38,
              height:       38,
              display:      "flex",
              flexDirection: "column",
              alignItems:   "center",
              justifyContent: "center",
              gap:          4.5,
              cursor:       "pointer",
              padding:      0,
            }}
          >
            <span style={{ width: 16, height: 1.5, background: T.accent, borderRadius: 1, transition: "transform 0.25s, opacity 0.25s", transform: menuOpen ? "translateY(6px) rotate(45deg)" : "none" }} />
            <span style={{ width: 16, height: 1.5, background: T.accent, borderRadius: 1, transition: "opacity 0.2s", opacity: menuOpen ? 0 : 1 }} />
            <span style={{ width: 16, height: 1.5, background: T.accent, borderRadius: 1, transition: "transform 0.25s", transform: menuOpen ? "translateY(-6px) rotate(-45deg)" : "none" }} />
          </button>
        )}
      </div>

      {/* Mobile dropdown menu */}
      {isMobile && menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22 }}
          style={{
            position:      "absolute",
            top:           72,
            left:          0,
            right:         0,
            background:    "rgba(2,11,24,0.97)",
            backdropFilter: "blur(24px)",
            borderBottom:  "1px solid rgba(0,207,255,0.12)",
            display:       "flex",
            flexDirection: "column",
            padding:       "10px clamp(1.2rem, 5vw, 3rem) 18px",
          }}
        >
          {NAV_LINKS.map(l => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              style={{
                fontFamily:     T.fontMono,
                fontSize:       13,
                fontWeight:     500,
                color:          T.textSecondary,
                textDecoration: "none",
                letterSpacing:  "0.12em",
                padding:        "14px 4px",
                borderBottom:   "1px solid rgba(0,207,255,0.06)",
              }}
            >
              {l.label.toUpperCase()}
            </a>
          ))}
        </motion.div>
      )}
    </nav>
  );
};

// Pill-style nav link for the centred cluster
const NavPill = ({ href, label }) => {
  const [hov, setHov] = useState(false);
  const [active, setActive] = useState(false);

  return (
    <a
      href={href}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      style={{
        fontFamily:     T.fontMono,
        fontSize:       12,
        fontWeight:     500,
        color:          hov ? T.accent : T.textSecondary,
        textDecoration: "none",
        letterSpacing:  "0.1em",
        padding:        "8px 20px",
        borderRadius:   50,
        background:     hov ? "rgba(0,207,255,0.1)" : "transparent",
        border:         hov ? "1px solid rgba(0,207,255,0.2)" : "1px solid transparent",
        transition:     "all 0.2s ease",
        transform:      active ? "scale(0.97)" : "scale(1)",
        whiteSpace:     "nowrap",
      }}
    >
      {label}
    </a>
  );
};


// ─── Hero Section ─────────────────────────────────────────────
const Hero = () => {
  const role = useTypewriter(
    ["Full-Stack Engineer", "Fintech Enthusiast", "Capital Markets Technologist"],
    76, 2100
  );
  const width = useWindowWidth();
  const showScrollHint = width >= 768;

  return (
    <section id="home" style={{
      position:       "relative",
      minHeight:      "100vh",
      display:        "flex",
      alignItems:     "center",
      justifyContent: "center",
      overflow:       "hidden",
      padding:        "96px clamp(1rem, 6vw, 3rem) 72px",
    }}>
      <NodeCanvas />

      {/* Dot grid overlay */}
      <div style={{
        position:        "absolute",
        inset:           0,
        pointerEvents:   "none",
        backgroundImage: `
          linear-gradient(rgba(0,207,255,0.032) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,207,255,0.032) 1px, transparent 1px)
        `,
        backgroundSize: "74px 74px",
      }} />

      {/* Radial centre glow */}
      <div style={{
        position:    "absolute",
        top: "50%", left: "50%",
        transform:   "translate(-50%,-50%)",
        width:       "80vw",
        height:      "80vh",
        background:  "radial-gradient(ellipse, rgba(0,207,255,0.048) 0%, transparent 64%)",
        pointerEvents: "none",
      }} />

      {/* Bottom fade into next section */}
      <div style={{
        position:    "absolute",
        bottom: 0, left: 0, right: 0,
        height:      "22%",
        background:  "linear-gradient(to bottom, transparent, #020B18)",
        pointerEvents: "none",
      }} />

{/* Main content */}
<div style={{ position: "relative", zIndex: 10, textAlign: "center", maxWidth: 920, width: "100%" }}>

  {/* ── Profile Picture ── */}
  <motion.div
    initial={{ opacity: 0, scale: 0.85 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: 0.2, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
    style={{ marginBottom: 28 }}
  >
<img
  src="/profile.jpg"
  alt="Desmond Chung"
  width={320}
  height={320}
  style={{
    width:        "clamp(128px, 18vw, 176px)",
    height:       "clamp(128px, 18vw, 176px)",
    borderRadius: "50%",
    objectFit:    "cover",
    objectPosition: "center top",
    border:       "2px solid rgba(0,207,255,0.4)",
    boxShadow:    "0 0 32px rgba(0,207,255,0.25), 0 0 0 6px rgba(0,207,255,0.06)",
    display:      "block",
    margin:       "0 auto",
  }}
/>
  </motion.div>

  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.3, duration: 0.9 }}
          style={{
            fontFamily:    T.fontMono,
            fontSize:      11,
            color:         T.accent,
            letterSpacing: "0.32em",
            marginBottom:  22,
            display:       "inline-flex",
            alignItems:    "center",
            gap:           8,
          }}
        >
          <span style={{
            width: 7, height: 7, borderRadius: "50%",
            background: T.accentGreen,
            boxShadow: `0 0 8px ${T.accentGreen}`,
            display: "inline-block",
          }} />
          OPEN TO OPPORTUNITIES
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            fontFamily:    T.fontDisplay,
            fontSize:      "clamp(2.4rem, 7.5vw, 5rem)",
            fontWeight:    900,
            lineHeight:    1.08,
            letterSpacing: "0.01em",
            color:         T.textPrimary,
            marginBottom:  10,
          }}
        >
          Desmond Chung {/* REPLACE: e.g. "Joel Kong" */}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.7 }}
          style={{
            fontFamily:    T.fontDisplay,
            fontSize:      "clamp(0.95rem, 2.6vw, 1.65rem)",
            fontWeight:    600,
            color:         T.accent,
            marginBottom:  22,
            minHeight:     38,
          }}
        >
          {role}
          <span style={{ animation: "blink 0.95s step-end infinite", marginLeft: 2 }}>|</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          style={{
            fontFamily:   T.fontBody,
            fontSize:     "clamp(0.9rem, 1.4vw, 1.05rem)",
            color:        "#8BB8D4",
            lineHeight:   1.82,
            maxWidth:     560,
            margin:       "0 auto 42px",
            fontWeight:   400,
          }}
        >
          Building production-grade financial systems, real-time data pipelines,
          and scalable backends. 
          Based in Singapore. 
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.7 }}
          style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}
        >
          <HeroButton href="#projects" primary text="View Projects →" />
          <HeroButton href="/myresume.docx" download text="↓ Download Resume" />
          {/* Resume lives in /public. Swap to /resume.pdf once you export a PDF. */}
        </motion.div>
      </div>

      {/* Scroll indicator (desktop only — overlaps CTAs on small screens) */}
      {showScrollHint && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        style={{
          position:      "absolute",
          bottom: 38, left: "50%",
          transform:     "translateX(-50%)",
          display:       "flex",
          flexDirection: "column",
          alignItems:    "center",
          gap:           8,
        }}
      >
        <span style={{ fontFamily: T.fontMono, fontSize: 9, color: T.textMuted, letterSpacing: "0.28em" }}>
          SCROLL
        </span>
        <div style={{
          width:      1,
          height:     46,
          background: `linear-gradient(to bottom, ${T.accent}, transparent)`,
          animation:  "scanDrop 1.9s ease-in-out infinite",
        }} />
      </motion.div>
      )}
    </section>
  );
};

const HeroButton = ({ href, text, primary, download }) => {
  const [hov, setHov] = useState(false);

  const style = primary
    ? {
        color:      T.accent,
        border:     "1px solid rgba(0,207,255,0.38)",
        background: hov ? "rgba(0,207,255,0.16)" : "rgba(0,207,255,0.07)",
        boxShadow:  hov ? "0 0 36px rgba(0,207,255,0.42)" : "0 0 18px rgba(0,207,255,0.1)",
        transform:  hov ? "translateY(-3px)" : "none",
      }
    : {
        color:      T.textPrimary,
        border:     hov ? "1px solid rgba(255,255,255,0.3)" : "1px solid rgba(255,255,255,0.13)",
        background: hov ? "rgba(255,255,255,0.05)" : "transparent",
        transform:  hov ? "translateY(-3px)" : "none",
      };

  return (
    <a
      href={href}
      {...(download ? { download: true } : {})}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        fontFamily:     T.fontMono,
        fontSize:       13,
        fontWeight:     500,
        textDecoration: "none",
        padding:        "15px 30px",
        borderRadius:   6,
        letterSpacing:  "0.06em",
        display:        "inline-block",
        transition:     "all 0.25s ease",
        ...style,
      }}
    >
      {text}
    </a>
  );
};

// ─── Skills Section ───────────────────────────────────────────
const Skills = () => {
  const titleRef = useRef(null);
  const inView   = useInView(titleRef, { once: true });

  return (
    <section id="skills" style={{
      padding:  "clamp(5rem, 11vw, 9rem) clamp(1rem, 5vw, 3rem)",
      maxWidth: 1240,
      margin:   "0 auto",
    }}>
      <motion.div
        ref={titleRef}
        variants={fadeUp}
        custom={0}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        style={{ marginBottom: 56 }}
      >
        <div style={{ fontFamily: T.fontMono, fontSize: 11, color: T.accent, letterSpacing: "0.3em", marginBottom: 14 }}>
          // 01 — TECH STACK
        </div>
        <h2 style={{ fontFamily: T.fontDisplay, fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 700, color: T.textPrimary, letterSpacing: "-0.01em" }}>
          Skills & Infrastructure
        </h2>
      </motion.div>

      <div style={{
        display:             "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(min(310px, 100%), 1fr))",
        gap:                 "clamp(1rem, 2vw, 1.4rem)",
      }}>
        {Object.entries(SKILLS).map(([title, data], i) => (
          <SkillCategory key={title} title={title} data={data} index={i} />
        ))}
      </div>
    </section>
  );
};

const SkillCategory = ({ title, data, index }) => {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      custom={index * 0.13}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      style={{
        background:   "rgba(6,21,37,0.85)",
        border:       "1px solid rgba(0,207,255,0.09)",
        borderRadius: 14,
        padding:      "clamp(1.4rem, 3vw, 2rem)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
        <div style={{
          width:        3,
          height:       22,
          background:   data.color,
          borderRadius: 2,
          boxShadow:    `0 0 8px ${data.color}70`,
        }} />
        <h3 style={{
          fontFamily:    T.fontMono,
          fontSize:      10,
          fontWeight:    500,
          color:         data.color,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
        }}>
          {title}
        </h3>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 9 }}>
        {data.items.map(name => (
          <SkillChip key={name} name={name} color={data.color} />
        ))}
      </div>
    </motion.div>
  );
};

const SkillChip = ({ name, color }) => (
  <motion.div
    whileHover={{ scale: 1.06, y: -2, boxShadow: `0 0 16px ${color}28`, borderColor: `${color}45` }}
    transition={{ type: "spring", stiffness: 420, damping: 22 }}
    style={{
      display:     "flex",
      alignItems:  "center",
      gap:         9,
      background:  "rgba(0,207,255,0.028)",
      border:      "1px solid rgba(0,207,255,0.08)",
      borderRadius: 8,
      padding:     "9px 13px",
      cursor:      "default",
    }}
  >
    <div style={{
      width:        4,
      height:       4,
      borderRadius: "50%",
      background:   color,
      boxShadow:    `0 0 5px ${color}`,
      flexShrink:   0,
    }} />
    <span style={{ fontFamily: T.fontBody, fontSize: 13, color: T.textPrimary, fontWeight: 400 }}>
      {name}
    </span>
  </motion.div>
);

// ─── Projects Section (Bento Grid) ────────────────────────────
const Projects = () => {
  const titleRef  = useRef(null);
  const inView    = useInView(titleRef, { once: true });
  const width     = useWindowWidth();
  const isDesktop = width >= 1024;
  const isTablet  = width >= 640 && width < 1024;
  const gridCols  = isDesktop ? "repeat(3, 1fr)" : isTablet ? "repeat(2, 1fr)" : "1fr";
  const spanOf    = (p) => (!isDesktop && !isTablet) ? 1 : (p.wide ? 2 : 1);

  return (
    <section id="projects" style={{
      padding:  "clamp(3rem, 8vw, 7rem) clamp(1rem, 5vw, 3rem)",
      maxWidth: 1240,
      margin:   "0 auto",
    }}>
      <motion.div
        ref={titleRef}
        variants={fadeUp}
        custom={0}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        style={{ marginBottom: 56 }}
      >
        <div style={{ fontFamily: T.fontMono, fontSize: 11, color: T.accent, letterSpacing: "0.3em", marginBottom: 14 }}>
          // 02 — FEATURED WORK
        </div>
        <h2 style={{ fontFamily: T.fontDisplay, fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 700, color: T.textPrimary, letterSpacing: "-0.01em" }}>
        Projects
        </h2>
      </motion.div>

      <div style={{ display: "grid", gridTemplateColumns: gridCols, gap: "clamp(1rem, 2vw, 1.4rem)" }}>
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} span={spanOf(p)} />
        ))}
        <ComingSoon index={PROJECTS.length} />
      </div>
    </section>
  );
};

const ProjectCard = ({ project, index, span }) => {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [hov, setHov] = useState(false);

  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      custom={index * 0.14}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      whileHover={{ y: -6 }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        gridColumn:   `span ${span}`,
        background:   hov ? "rgba(10,26,46,0.97)" : "rgba(6,21,37,0.85)",
        border:       `1px solid ${hov ? `rgba(${project.accentRgb},0.23)` : "rgba(0,207,255,0.09)"}`,
        borderRadius: 16,
        padding:      "clamp(1.5rem, 3vw, 2.4rem)",
        position:     "relative",
        overflow:     "hidden",
        cursor:       "default",
        transition:   "background 0.3s, border-color 0.3s, box-shadow 0.3s",
        boxShadow:    hov ? `0 26px 70px rgba(${project.accentRgb},0.09)` : "none",
      }}
    >
      {/* Top accent bar */}
      <div style={{
        position:   "absolute",
        top: 0, left: 0, right: 0,
        height:     2,
        background: `linear-gradient(90deg, ${project.accent}, transparent 72%)`,
        opacity:    hov ? 1 : 0.3,
        transition: "opacity 0.3s",
      }} />

      {/* Corner glow */}
      {hov && (
        <div style={{
          position:     "absolute",
          top: -70, right: -70,
          width:        180,
          height:       180,
          background:   `radial-gradient(circle, rgba(${project.accentRgb},0.055), transparent 70%)`,
          pointerEvents: "none",
        }} />
      )}

      <div style={{ fontFamily: T.fontMono, fontSize: 10, color: project.accent, letterSpacing: "0.22em", marginBottom: 14, opacity: 0.6 }}>
        PROJECT_{project.code}
      </div>

      <h3 style={{ fontFamily: T.fontDisplay, fontSize: "clamp(1.25rem, 2.4vw, 1.85rem)", fontWeight: 700, color: T.textPrimary, marginBottom: 6, letterSpacing: "-0.01em" }}>
        {project.title}
      </h3>

      <div style={{ fontFamily: T.fontMono, fontSize: 11, color: project.accent, letterSpacing: "0.06em", marginBottom: 18, opacity: 0.82 }}>
        {project.subtitle}
      </div>

      <p style={{ fontSize: 14, color: T.textSecondary, lineHeight: 1.8, marginBottom: 22, fontWeight: 300, maxWidth: span > 1 ? 580 : "100%" }}>
        {project.description}
      </p>

      {/* Architecture highlights */}
      <div style={{ marginBottom: 22 }}>
        <div style={{ fontFamily: T.fontMono, fontSize: 9, color: project.accent, letterSpacing: "0.24em", marginBottom: 12, opacity: 0.5 }}>
          ARCH_HIGHLIGHTS
        </div>
        {project.highlights.map((h, i) => (
          <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 9, marginBottom: 7 }}>
            <span style={{ color: project.accent, fontSize: 11, marginTop: 2, flexShrink: 0 }}>▸</span>
            <span style={{ fontFamily: T.fontMono, fontSize: 12, color: T.textSecondary, lineHeight: 1.65 }}>
              {h}
            </span>
          </div>
        ))}
      </div>

      {/* Tech tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 22 }}>
        {project.tags.map(tag => (
          <TagChip key={tag} label={tag} accentRgb={project.accentRgb} accent={project.accent} />
        ))}
      </div>

      <GithubLink href={project.github} color={project.accent} />
    </motion.div>
  );
};

const TagChip = ({ label, accentRgb, accent }) => {
  const [hov, setHov] = useState(false);
  return (
    <span
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        fontFamily:    T.fontMono,
        fontSize:      10,
        color:         hov ? accent : T.textMuted,
        background:    hov ? `rgba(${accentRgb},0.1)` : `rgba(${accentRgb},0.04)`,
        border:        `1px solid rgba(${accentRgb},${hov ? "0.22" : "0.09"})`,
        padding:       "4px 10px",
        borderRadius:  4,
        letterSpacing: "0.05em",
        cursor:        "default",
        transition:    "all 0.2s ease",
      }}
    >
      {label}
    </span>
  );
};

const GithubLink = ({ href, color }) => {
  const [hov, setHov] = useState(false);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display:        "inline-flex",
        alignItems:     "center",
        gap:            8,
        fontFamily:     T.fontMono,
        fontSize:       11,
        color:          hov ? color : T.textSecondary,
        textDecoration: "none",
        letterSpacing:  hov ? "0.14em" : "0.1em",
        transition:     "all 0.22s ease",
        opacity:        hov ? 1 : 0.75,
      }}
    >
      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.79-.26.79-.58v-2.23c-3.34.73-4.03-1.42-4.03-1.42-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.49 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02.005 2.05.14 3 .4 2.28-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.19.69.8.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
      VIEW_REPOSITORY →
    </a>
  );
};

const ComingSoon = ({ index }) => {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 0.38, y: 0 } : { opacity: 0, y: 28 }}
      transition={{ duration: 0.7, delay: index * 0.14, ease: [0.25, 0.1, 0.25, 1] }}
      style={{
        background:     "rgba(6,21,37,0.3)",
        border:         "1px dashed rgba(0,207,255,0.1)",
        borderRadius:   16,
        display:        "flex",
        flexDirection:  "column",
        alignItems:     "center",
        justifyContent: "center",
        minHeight:      220,
        cursor:         "default",
      }}
    >
      <div style={{ fontFamily: T.fontMono, fontSize: 11, color: T.textMuted, letterSpacing: "0.22em", textAlign: "center", lineHeight: 2 }}>
        NEXT_PROJECT<br />
        <span style={{ fontSize: 9, opacity: 0.55 }}>// IN DEVELOPMENT</span>
      </div>
    </motion.div>
  );
};

// ─── Contact / Footer ─────────────────────────────────────────

// EmailChip — outside Contact, at module level ✅
const EmailChip = ({ email }) => {
  const [hov,    setHov]    = useState(false);
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.button
      onClick={copy}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      whileHover={{ y: -3, boxShadow: "0 0 18px rgba(0,207,255,0.18)" }}
      style={{
        display:        "inline-flex",
        alignItems:     "center",
        gap:            8,
        fontFamily:     "'JetBrains Mono', monospace",
        fontSize:       12,
        fontWeight:     500,
        color:          copied ? "#00FF9D" : hov ? "#00CFFF" : "#5E90B0",
        border:         `1px solid ${copied ? "rgba(0,255,157,0.4)" : hov ? "rgba(0,207,255,0.32)" : "rgba(0,207,255,0.11)"}`,
        background:     copied ? "rgba(0,255,157,0.06)" : hov ? "rgba(0,207,255,0.05)" : "transparent",
        padding:        "12px 26px",
        borderRadius:   6,
        letterSpacing:  "0.1em",
        cursor:         "pointer",
        transition:     "color 0.22s, border-color 0.22s, background 0.22s",
      }}
    >
      {copied ? "✓ Copied!" : email}
    </motion.button>
  );
};

// ContactButton — outside Contact, at module level ✅
const ContactButton = ({ href, label }) => {
  const [hov, setHov] = useState(false);

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      whileHover={{ y: -3, boxShadow: "0 0 18px rgba(0,207,255,0.18)" }}
      style={{
        display:        "inline-flex",
        alignItems:     "center",
        gap:            8,
        fontFamily:     "'JetBrains Mono', monospace",
        fontSize:       12,
        fontWeight:     500,
        color:          hov ? "#00CFFF" : "#5E90B0",
        textDecoration: "none",
        border:         `1px solid ${hov ? "rgba(0,207,255,0.32)" : "rgba(0,207,255,0.11)"}`,
        background:     hov ? "rgba(0,207,255,0.05)" : "transparent",
        padding:        "12px 26px",
        borderRadius:   6,
        letterSpacing:  "0.1em",
        transition:     "color 0.22s, border-color 0.22s, background 0.22s",
      }}
    >
      {label} ↗
    </motion.a>
  );
};

// Contact section — clean, no nested components ✅
const Contact = () => {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="contact" style={{
      borderTop: "1px solid rgba(0,207,255,0.07)",
      padding:   "clamp(4rem, 9vw, 7rem) clamp(1rem, 5vw, 3rem)",
      textAlign: "center",
    }}>
      <motion.div
        ref={ref}
        variants={fadeUp}
        custom={0}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        style={{ maxWidth: 580, margin: "0 auto" }}
      >
        <div style={{ fontFamily: T.fontMono, fontSize: 11, color: T.accent, letterSpacing: "0.3em", marginBottom: 16 }}>
          // 03 — CONTACT
        </div>

        <h2 style={{ fontFamily: T.fontDisplay, fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 700, color: T.textPrimary, marginBottom: 16, letterSpacing: "-0.01em" }}>
          Let's Build Something
        </h2>

        <p style={{ fontSize: 15, color: T.textSecondary, lineHeight: 1.82, marginBottom: 44, fontWeight: 300 }}>
          Open to internships and contract work in fintech, capital markets,
          and data systems. Based in Singapore, remote-friendly.
        </p>

        <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginBottom: 54 }}>
          <ContactButton label="LinkedIn" href="https://www.linkedin.com/in/desmondchung8/" />
          <ContactButton label="GitHub"   href="https://github.com/desmondchung88" />
          <EmailChip email="2502081@sit.singaporetech.edu.sg" />
        </div>

        <div style={{ fontFamily: T.fontMono, fontSize: 10, color: T.textMuted, letterSpacing: "0.18em" }}>
          © 2026 Desmond Chung — Built with React & Framer Motion
        </div>
      </motion.div>
    </section>
  );
};

// ─── Root Export ──────────────────────────────────────────────
export default function Portfolio() {
  return (
    <div style={{ background: T.bgPrimary, minHeight: "100vh" }}>
      <GlobalStyles />
      <Nav />
      <Hero />
      <Skills />
      <Projects />
      <Contact />
    </div>
  );
}
