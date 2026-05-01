import { useEffect, useRef, useState, lazy, Suspense } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useInView } from "framer-motion";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import {
  Mail, Phone, Download,
  ExternalLink, Code2, Database, Server, Layers, Brain,
  ChevronDown, Menu, X, Star, Trophy, Zap, Send
} from "lucide-react";

const GithubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
);

const LinkedinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <circle cx="12" cy="12" r="4"/>
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
  </svg>
);
// ─── GLOBAL STYLES ───────────────────────────────────────────────────────────
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=JetBrains+Mono:wght@300;400;500&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --bg: #050508;
      --surface: #0d0d14;
      --surface2: #13131e;
      --border: rgba(255,255,255,0.07);
      --accent: #7c3aed;
      --accent2: #06b6d4;
      --accent3: #f59e0b;
      --text: #e8e8f0;
      --muted: #6b6b8a;
      --glow: rgba(124,58,237,0.4);
      --glow2: rgba(6,182,212,0.3);
    }

    html { scroll-behavior: smooth; }

    body {
      background: var(--bg);
      color: var(--text);
      font-family: 'Syne', sans-serif;
      overflow-x: hidden;
      cursor: none;
    }

    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: var(--bg); }
    ::-webkit-scrollbar-thumb { background: var(--accent); border-radius: 2px; }

    .mono { font-family: 'JetBrains Mono', monospace; }

    .glow-text {
      text-shadow: 0 0 40px rgba(124,58,237,0.8), 0 0 80px rgba(124,58,237,0.4);
    }

    .glow-border {
      box-shadow: 0 0 0 1px rgba(124,58,237,0.4), 0 0 30px rgba(124,58,237,0.15);
    }

    .glass {
      background: rgba(13,13,20,0.6);
      backdrop-filter: blur(20px);
      border: 1px solid var(--border);
    }

    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      33% { transform: translateY(-12px) rotate(2deg); }
      66% { transform: translateY(-6px) rotate(-1deg); }
    }

    @keyframes pulse-glow {
      0%, 100% { box-shadow: 0 0 20px rgba(124,58,237,0.4); }
      50% { box-shadow: 0 0 60px rgba(124,58,237,0.8), 0 0 100px rgba(124,58,237,0.3); }
    }

    @keyframes scan {
      0% { transform: translateY(-100%); }
      100% { transform: translateY(100vh); }
    }

    @keyframes gradient-shift {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }

    .btn-primary {
      background: linear-gradient(135deg, var(--accent), #9333ea);
      border: none;
      color: white;
      padding: 14px 32px;
      border-radius: 8px;
      font-family: 'Syne', sans-serif;
      font-weight: 600;
      font-size: 14px;
      letter-spacing: 0.05em;
      cursor: none;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
    }

    .btn-primary::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, #9333ea, var(--accent2));
      opacity: 0;
      transition: opacity 0.3s;
    }

    .btn-primary:hover::before { opacity: 1; }
    .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 10px 40px rgba(124,58,237,0.5); }

    .btn-outline {
      background: transparent;
      border: 1px solid rgba(124,58,237,0.5);
      color: var(--text);
      padding: 13px 32px;
      border-radius: 8px;
      font-family: 'Syne', sans-serif;
      font-weight: 600;
      font-size: 14px;
      letter-spacing: 0.05em;
      cursor: none;
      transition: all 0.3s ease;
    }

    .btn-outline:hover {
      border-color: var(--accent);
      background: rgba(124,58,237,0.1);
      transform: translateY(-2px);
      box-shadow: 0 0 30px rgba(124,58,237,0.3);
    }

    .section-label {
      font-family: 'JetBrains Mono', monospace;
      font-size: 11px;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: var(--accent2);
    }

    input, textarea {
      background: var(--surface2);
      border: 1px solid var(--border);
      color: var(--text);
      font-family: 'Syne', sans-serif;
      font-size: 14px;
      padding: 14px 18px;
      border-radius: 8px;
      width: 100%;
      outline: none;
      transition: border-color 0.3s, box-shadow 0.3s;
    }

    input:focus, textarea:focus {
      border-color: var(--accent);
      box-shadow: 0 0 0 3px rgba(124,58,237,0.15);
    }

    input::placeholder, textarea::placeholder { color: var(--muted); }
  `}</style>
);

// ─── CUSTOM CURSOR ────────────────────────────────────────────────────────────
const CustomCursor = () => {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e) => {
      target.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + "px";
        dotRef.current.style.top = e.clientY + "px";
      }
    };
    const animate = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.12;
      pos.current.y += (target.current.y - pos.current.y) * 0.12;
      if (cursorRef.current) {
        cursorRef.current.style.left = pos.current.x + "px";
        cursorRef.current.style.top = pos.current.y + "px";
      }
      requestAnimationFrame(animate);
    };
    window.addEventListener("mousemove", move);
    animate();
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
      <div ref={cursorRef} style={{
        position: "fixed", width: 32, height: 32, borderRadius: "50%",
        border: "1.5px solid rgba(124,58,237,0.7)", pointerEvents: "none",
        zIndex: 9999, transform: "translate(-50%,-50%)", transition: "width 0.2s, height 0.2s",
        mixBlendMode: "difference"
      }} />
      <div ref={dotRef} style={{
        position: "fixed", width: 5, height: 5, borderRadius: "50%",
        background: "var(--accent2)", pointerEvents: "none", zIndex: 9999,
        transform: "translate(-50%,-50%)"
      }} />
    </>
  );
};

// ─── PARTICLES BACKGROUND ─────────────────────────────────────────────────────
const ParticlesBg = () => {
  const [init, setInit] = useState(false);
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setInit(true));
  }, []);

  if (!init) return null;

  return (
    <Particles
      options={{
        fpsLimit: 60,
        interactivity: {
          events: { onHover: { enable: true, mode: "repulse" }, resize: true },
          modes: { repulse: { distance: 100, duration: 0.4 } }
        },
        particles: {
          color: { value: ["#7c3aed", "#06b6d4", "#f59e0b"] },
          links: { color: "#7c3aed", distance: 130, enable: true, opacity: 0.15, width: 1 },
          move: { direction: "none", enable: true, outModes: "bounce", speed: 0.6, random: true },
          number: { density: { enable: true, area: 900 }, value: 60 },
          opacity: { value: { min: 0.1, max: 0.4 } },
          shape: { type: "circle" },
          size: { value: { min: 1, max: 3 } }
        },
        detectRetina: true
      }}
      style={{ position: "absolute", inset: 0, zIndex: 0 }}
    />
  );
};

// ─── FLOATING 3D ELEMENT (CSS-based, no Three.js dependency issue) ────────────
const FloatingOrb = () => (
  <div style={{
    position: "absolute", right: "8%", top: "50%", transform: "translateY(-50%)",
    width: 280, height: 280, zIndex: 1,
    animation: "float 6s ease-in-out infinite"
  }}>
    <div style={{
      width: "100%", height: "100%", borderRadius: "50%",
      background: "radial-gradient(circle at 35% 35%, rgba(124,58,237,0.6), rgba(6,182,212,0.2), transparent 70%)",
      boxShadow: "0 0 80px rgba(124,58,237,0.4), 0 0 160px rgba(124,58,237,0.15), inset 0 0 60px rgba(6,182,212,0.1)",
      border: "1px solid rgba(124,58,237,0.3)",
      backdropFilter: "blur(10px)",
    }}>
      <div style={{
        position: "absolute", inset: 20, borderRadius: "50%",
        border: "1px solid rgba(6,182,212,0.2)",
        background: "radial-gradient(circle at 60% 40%, rgba(6,182,212,0.15), transparent)"
      }} />
      <div style={{
        position: "absolute", inset: 50, borderRadius: "50%",
        border: "1px solid rgba(245,158,11,0.15)",
      }} />
      <div style={{
        position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)",
        fontSize: 64, opacity: 0.9, filter: "drop-shadow(0 0 20px rgba(124,58,237,0.8))"
      }}>⬡</div>
    </div>
    {/* Orbiting rings */}
    {[0, 60, 120].map((deg, i) => (
      <div key={i} style={{
        position: "absolute", inset: -30 - i * 15, borderRadius: "50%",
        border: `1px solid rgba(124,58,237,${0.1 - i * 0.02})`,
        animation: `float ${8 + i * 2}s ease-in-out infinite reverse`
      }} />
    ))}
  </div>
);

// ─── NAV ──────────────────────────────────────────────────────────────────────
const navItems = ["Home", "About", "Projects", "Skills", "Resume", "Contact", "Profiles"];

const Nav = ({ active, setActive }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        padding: "0 32px",
        background: scrolled ? "rgba(5,5,8,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "none",
        transition: "all 0.4s ease",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: 72
      }}
    >
      <div className="mono" style={{ color: "var(--accent)", fontSize: 18, fontWeight: 500 }}>
        RK<span style={{ color: "var(--accent2)" }}>.</span>
      </div>

      {/* Desktop */}
      <div style={{ display: "flex", gap: 8, alignItems: "center" }} className="desktop-nav">
        {navItems.map((item) => (
          <button key={item} onClick={() => scrollTo(item.toLowerCase())}
            style={{
              background: "none", border: "none", color: active === item.toLowerCase() ? "var(--accent2)" : "var(--muted)",
              fontFamily: "'Syne', sans-serif", fontSize: 13, fontWeight: 600,
              letterSpacing: "0.05em", cursor: "none", padding: "8px 14px",
              borderRadius: 6, transition: "all 0.2s",
              textTransform: "uppercase"
            }}
            onMouseEnter={e => { if (active !== item.toLowerCase()) e.target.style.color = "var(--text)"; }}
            onMouseLeave={e => { if (active !== item.toLowerCase()) e.target.style.color = "var(--muted)"; }}
          >{item}</button>
        ))}
      </div>

      {/* Mobile hamburger */}
      <button onClick={() => setMenuOpen(!menuOpen)}
        style={{ display: "none", background: "none", border: "none", color: "var(--text)", cursor: "none" }}
        className="mobile-menu-btn"
      >
        {menuOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            style={{
              position: "fixed", top: 72, left: 0, right: 0,
              background: "rgba(5,5,8,0.98)", backdropFilter: "blur(20px)",
              borderBottom: "1px solid var(--border)", padding: "20px 32px",
              display: "flex", flexDirection: "column", gap: 4
            }}
          >
            {navItems.map((item) => (
              <button key={item} onClick={() => scrollTo(item.toLowerCase())}
                style={{
                  background: "none", border: "none", color: "var(--text)",
                  fontFamily: "'Syne', sans-serif", fontSize: 16, fontWeight: 600,
                  padding: "12px 0", textAlign: "left", cursor: "none",
                  borderBottom: "1px solid var(--border)"
                }}
              >{item}</button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </motion.nav>
  );
};

// ─── SECTION WRAPPER ──────────────────────────────────────────────────────────
const Section = ({ id, children, style = {} }) => {
  const ref = useRef(null);
  return (
    <section id={id} ref={ref} style={{
      minHeight: "100vh", position: "relative", overflow: "hidden",
      ...style
    }}>
      {children}
    </section>
  );
};

// ─── ANIMATED HEADING ─────────────────────────────────────────────────────────
const AnimHeading = ({ children, style = {}, delay = 0 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
      style={style}
    >{children}</motion.div>
  );
};

// ─── 1. HERO SECTION ──────────────────────────────────────────────────────────
const Hero = () => {
  const words = ["Full-Stack", "Java", "React.js", "Spring Boot"];
  const [wordIdx, setWordIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setWordIdx(i => (i + 1) % words.length), 2500);
    return () => clearInterval(t);
  }, []);

  return (
    <Section id="hero" style={{ display: "flex", alignItems: "center", paddingTop: 72 }}>
      {/* Gradient blobs */}
      <div style={{
        position: "absolute", top: "20%", left: "10%", width: 400, height: 400,
        background: "radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)",
        borderRadius: "50%", filter: "blur(60px)", animation: "float 8s ease-in-out infinite"
      }} />
      <div style={{
        position: "absolute", bottom: "15%", right: "20%", width: 300, height: 300,
        background: "radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%)",
        borderRadius: "50%", filter: "blur(60px)", animation: "float 10s ease-in-out infinite reverse"
      }} />

      <ParticlesBg />
      <FloatingOrb />

      {/* Scan line effect */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden", opacity: 0.03
      }}>
        <div style={{
          position: "absolute", left: 0, right: 0, height: 2,
          background: "linear-gradient(90deg, transparent, var(--accent2), transparent)",
          animation: "scan 4s linear infinite"
        }} />
      </div>

      <div style={{ position: "relative", zIndex: 2, padding: "0 8%", maxWidth: 700 }}>
        <motion.div
          initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ marginBottom: 20 }}
        >
          <span className="section-label">👋 Hello, World</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{ fontSize: "clamp(48px, 7vw, 88px)", fontWeight: 800, lineHeight: 1.05, marginBottom: 16 }}
        >
          Ram
          <span style={{
            background: "linear-gradient(135deg, var(--accent), var(--accent2))",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            backgroundClip: "text"
          }}> Karthick</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24, height: 40 }}
        >
          <span className="mono" style={{ color: "var(--muted)", fontSize: 16 }}>I build with</span>
          <AnimatePresence mode="wait">
            <motion.span key={wordIdx}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="mono"
              style={{
                color: "var(--accent2)", fontSize: 18, fontWeight: 500,
                background: "rgba(6,182,212,0.1)", padding: "4px 12px", borderRadius: 6,
                border: "1px solid rgba(6,182,212,0.2)"
              }}
            >{words[wordIdx]}</motion.span>
          </AnimatePresence>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          style={{ color: "var(--muted)", fontSize: 17, lineHeight: 1.7, marginBottom: 48, maxWidth: 520 }}
        >
          Final-year CS undergrad building full-stack systems that solve real problems —
          from AI-powered fintech to smart attendance platforms.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          style={{ display: "flex", gap: 16, flexWrap: "wrap" }}
        >
          <button className="btn-primary" onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}>
            <span style={{ position: "relative", zIndex: 1 }}>View Projects →</span>
          </button>
          <a href="/resume.pdf" download>
            <button className="btn-outline">
              <Download size={15} style={{ display: "inline", marginRight: 8 }} />
              Download Resume
            </button>
          </a>
          <button className="btn-outline" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
            Contact Me
          </button>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          style={{ display: "flex", gap: 20, marginTop: 56, alignItems: "center" }}
        >
          {[
            { icon: GithubIcon, href: "https://github.com/ramkarthick125", label: "GitHub" },
            { icon: LinkedinIcon, href: "https://linkedin.com/in/ramkarthick125", label: "LinkedIn" },
            { icon: Mail, href: "mailto:ramkarthick125@gmail.com", label: "Email" },
          ].map(({ icon: Icon, href, label }) => (
            <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.2, rotate: 5 }}
              style={{
                width: 42, height: 42, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center",
                background: "var(--surface2)", border: "1px solid var(--border)",
                color: "var(--muted)", transition: "color 0.2s"
              }}
              onMouseEnter={e => e.currentTarget.style.color = "var(--accent2)"}
              onMouseLeave={e => e.currentTarget.style.color = "var(--muted)"}
            >
              <Icon size={17} />
            </motion.a>
          ))}
          <div style={{ width: 1, height: 32, background: "var(--border)", margin: "0 4px" }} />
          <span className="mono" style={{ color: "var(--muted)", fontSize: 12 }}>+91-8248257581</span>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
        style={{
          position: "absolute", bottom: 36, left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 8, zIndex: 2
        }}
      >
        <span className="mono" style={{ fontSize: 10, color: "var(--muted)", letterSpacing: "0.2em" }}>SCROLL</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
          <ChevronDown size={18} style={{ color: "var(--muted)" }} />
        </motion.div>
      </motion.div>
    </Section>
  );
};

// ─── 2. ABOUT SECTION ─────────────────────────────────────────────────────────
const About = () => {
  const certs = [
    "MongoDB — ICT Academy",
    "Programming Using Java — Infosys SpringBoard",
    "Introduction to Networks — Cisco",
    "Networking Essentials — Cisco"
  ];

  const stats = [
    { label: "LeetCode Rating", value: "1600+", icon: "⚡" },
    { label: "Problems Solved", value: "310+", icon: "🧩" },
    { label: "CodeChef Rating", value: "1100+", icon: "🏆" },
    { label: "CGPA", value: "8.5", icon: "🎓" },
  ];

  return (
    <Section id="about" style={{ padding: "120px 8%" }}>
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 1,
        background: "linear-gradient(90deg, transparent, var(--accent), transparent)"
      }} />

      <AnimHeading>
        <span className="section-label">01 — About Me</span>
        <h2 style={{ fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 800, marginTop: 12, marginBottom: 48 }}>
          The person behind<br />
          <span style={{ color: "var(--accent)" }}>the code</span>
        </h2>
      </AnimHeading>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "start" }}>
        {/* Left */}
        <div>
          <AnimHeading delay={0.1}>
            <div className="glass" style={{ padding: 28, borderRadius: 16, marginBottom: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                <div>
                  <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 4 }}>Chennai Institute of Technology</div>
                  <div style={{ color: "var(--muted)", fontSize: 14 }}>B.E. in Computer Science & Engineering</div>
                </div>
                <span className="mono" style={{ color: "var(--accent2)", fontSize: 13, whiteSpace: "nowrap" }}>2023 – Present</span>
              </div>
              <div style={{
                marginTop: 16, padding: "8px 16px", borderRadius: 8,
                background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.2)",
                display: "inline-flex", alignItems: "center", gap: 8
              }}>
                <Star size={14} style={{ color: "var(--accent3)" }} />
                <span className="mono" style={{ fontSize: 13, color: "var(--accent3)" }}>CGPA: 8.5 / 10.0</span>
              </div>
            </div>
          </AnimHeading>

          <AnimHeading delay={0.2}>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: "var(--accent2)" }}>Certifications</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {certs.map((cert, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  viewport={{ once: true }}
                  style={{
                    display: "flex", alignItems: "center", gap: 12,
                    padding: "12px 16px", borderRadius: 10,
                    background: "var(--surface2)", border: "1px solid var(--border)"
                  }}
                >
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)", flexShrink: 0 }} />
                  <span style={{ fontSize: 14, color: "var(--text)" }}>{cert}</span>
                </motion.div>
              ))}
            </div>
          </AnimHeading>
        </div>

        {/* Right: Stats + Hackathons */}
        <div>
          <AnimHeading delay={0.15}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 32 }}>
              {stats.map((s, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.03 }}
                  style={{
                    padding: "24px 20px", borderRadius: 14, textAlign: "center",
                    background: "var(--surface2)", border: "1px solid var(--border)",
                    cursor: "default"
                  }}
                >
                  <div style={{ fontSize: 28, marginBottom: 6 }}>{s.icon}</div>
                  <div style={{ fontSize: 28, fontWeight: 800, color: "var(--accent)" }}>{s.value}</div>
                  <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 4 }}>{s.label}</div>
                </motion.div>
              ))}
            </div>
          </AnimHeading>

          <AnimHeading delay={0.3}>
            <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16, color: "var(--accent2)" }}>Hackathon Achievements</h3>
            {[
              { name: "Manipal MIT-M# Hackathon", detail: "Top 10 of 870+ teams • 4100+ participants", place: "Udipi, Karnataka", date: "Oct 2025" },
              { name: "Delhi Open Stack Hackathon", detail: "Top 35 of 300+ nationwide applications", place: "Online", date: "Feb 2025" },
              { name: "Intel OneAPI Hackathon", detail: "Driver Monitoring System presentation", place: "Coimbatore, TN", date: "Oct 2024" },
            ].map((h, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }} viewport={{ once: true }}
                style={{
                  padding: "16px 20px", borderRadius: 12, marginBottom: 12,
                  background: "var(--surface2)", border: "1px solid var(--border)",
                  borderLeft: "3px solid var(--accent)"
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontWeight: 700, fontSize: 14 }}>{h.name}</span>
                  <span className="mono" style={{ fontSize: 11, color: "var(--accent3)" }}>{h.date}</span>
                </div>
                <div style={{ fontSize: 13, color: "var(--muted)" }}>{h.detail}</div>
              </motion.div>
            ))}
          </AnimHeading>
        </div>
      </div>

      <style>{`@media(max-width:768px){ #about > div:last-child { grid-template-columns: 1fr !important; } }`}</style>
    </Section>
  );
};

// ─── 3. PROJECTS SECTION ──────────────────────────────────────────────────────
const projects = [
  {
    title: "Driver Monitoring System",
    year: "2024",
    tag: "AI / Computer Vision",
    color: "#f59e0b",
    tech: ["OpenVINO", "PyTorch", "Python", "OpenCV"],
    desc: "Real-time in-vehicle driver behavior monitoring system using Intel OpenVINO. Detects drowsiness, phone usage, and distracted driving with a score-based performance tracker.",
    bullets: ["Facial landmark detection & gaze estimation", "Score-based driver performance tracking", "External camera integration for live capture", "Alert mechanisms for unsafe behavior"],
    emoji: "🚗"
  },
  {
    title: "NeuroWealth",
    year: "2025",
    tag: "AI FinTech • Full-Stack",
    color: "#7c3aed",
    tech: ["React.js", "Spring Boot", "AI/ML", "REST APIs"],
    desc: "AI-powered inclusive fintech platform tailored for neurodivergent users. Features adaptive UI, automatic SMS-based expense extraction, and intelligent categorization.",
    bullets: ["Adaptive UI based on user behavior patterns", "Automatic bank SMS transaction extraction", "Intelligent expense categorization & insights", "Budget tracking with irregular income support"],
    emoji: "🧠"
  },
  {
    title: "Geo-Based Attendance System",
    year: "2026",
    tag: "Mobile • Full-Stack",
    color: "#06b6d4",
    tech: ["React Native", "Spring Boot", "ArcFace", "MySQL", "GPS"],
    desc: "Location-validated attendance platform combining GPS geofencing with ArcFace biometric authentication. Prevents proxy attendance with multi-layer verification.",
    bullets: ["GPS geofencing for location validation", "ArcFace AI face recognition integration", "JWT-secured REST API backend", "Time-based + location + face triple validation"],
    emoji: "📍"
  }
];

const ProjectCard = ({ project, index }) => {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -8, scale: 1.01 }}
      style={{
        borderRadius: 20, overflow: "hidden", position: "relative",
        background: "var(--surface)", border: "1px solid var(--border)",
        cursor: "default",
        boxShadow: hovered ? `0 20px 60px ${project.color}22, 0 0 0 1px ${project.color}33` : "none",
        transition: "box-shadow 0.4s ease"
      }}
    >
      {/* Top accent line */}
      <div style={{ height: 3, background: `linear-gradient(90deg, ${project.color}, transparent)` }} />

      {/* Header */}
      <div style={{ padding: "28px 28px 0", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ fontSize: 44 }}>{project.emoji}</div>
        <div style={{ textAlign: "right" }}>
          <span className="mono" style={{ fontSize: 12, color: "var(--muted)" }}>{project.year}</span>
          <div style={{
            marginTop: 4, padding: "4px 10px", borderRadius: 20, fontSize: 11,
            background: `${project.color}18`, color: project.color,
            border: `1px solid ${project.color}30`
          }}>{project.tag}</div>
        </div>
      </div>

      <div style={{ padding: "20px 28px 28px" }}>
        <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 12 }}>{project.title}</h3>
        <p style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>{project.desc}</p>

        {/* Bullets */}
        <div style={{ marginBottom: 24 }}>
          {project.bullets.map((b, i) => (
            <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 8 }}>
              <div style={{ width: 5, height: 5, borderRadius: "50%", background: project.color, marginTop: 6, flexShrink: 0 }} />
              <span style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.5 }}>{b}</span>
            </div>
          ))}
        </div>

        {/* Tech stack */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {project.tech.map((t) => (
            <span key={t} className="mono" style={{
              fontSize: 11, padding: "5px 10px", borderRadius: 6,
              background: "var(--surface2)", border: "1px solid var(--border)", color: "var(--muted)"
            }}>{t}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => (
  <Section id="projects" style={{ padding: "120px 8%" }}>
    <div style={{
      position: "absolute", top: 0, right: "20%", width: 400, height: 400,
      background: "radial-gradient(circle, rgba(124,58,237,0.08) 0%, transparent 70%)",
      borderRadius: "50%", filter: "blur(80px)"
    }} />

    <AnimHeading>
      <span className="section-label">02 — Key Projects</span>
      <h2 style={{ fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 800, marginTop: 12, marginBottom: 60 }}>
        Things I've <span style={{ color: "var(--accent)" }}>built</span>
      </h2>
    </AnimHeading>

    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 28 }}>
      {projects.map((p, i) => <ProjectCard key={i} project={p} index={i} />)}
    </div>
  </Section>
);

// ─── 4. SKILLS SECTION ────────────────────────────────────────────────────────
const skillGroups = [
  {
    label: "Languages", icon: <Code2 size={18} />, color: "#7c3aed",
    skills: [
      { name: "Java", level: 80 }, { name: "Python", level: 70 },
      { name: "JavaScript", level: 80 }, { name: "SQL", level: 80 }
    ]
  },
  {
    label: "Frontend", icon: <Layers size={18} />, color: "#06b6d4",
    skills: [
      { name: "React.js", level: 88 }, { name: "HTML/CSS", level: 92 },
      { name: "React Native", level: 75 }
    ]
  },
  {
    label: "Backend", icon: <Server size={18} />, color: "#f59e0b",
    skills: [
      { name: "Spring Boot", level: 85 }, { name: "REST APIs", level: 88 },
      { name: "JWT Auth", level: 70 }
    ]
  },
  {
    label: "Database", icon: <Database size={18} />, color: "#10b981",
    skills: [
      { name: "MySQL", level: 85 }, { name: "MongoDB", level: 78 }
    ]
  },
  {
    label: "Concepts", icon: <Brain size={18} />, color: "#ec4899",
    skills: [
      { name: "DSA", level: 70 }, { name: "DBMS", level: 80 },
     { name: "API Design", level: 70 }
    ]
  }
];

const SkillBar = ({ name, level, color, delay }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} style={{ marginBottom: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <span style={{ fontSize: 13, fontWeight: 600 }}>{name}</span>
        <span className="mono" style={{ fontSize: 12, color: "var(--muted)" }}>{level}%</span>
      </div>
      <div style={{ height: 5, borderRadius: 3, background: "var(--surface2)", overflow: "hidden" }}>
        <motion.div
          initial={{ width: 0 }} animate={inView ? { width: `${level}%` } : {}}
          transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
          style={{ height: "100%", borderRadius: 3, background: `linear-gradient(90deg, ${color}, ${color}88)` }}
        />
      </div>
    </div>
  );
};

const Skills = () => (
  <Section id="skills" style={{ padding: "120px 8%" }}>
    <div style={{
      position: "absolute", bottom: 0, left: "10%", width: 500, height: 500,
      background: "radial-gradient(circle, rgba(6,182,212,0.07) 0%, transparent 70%)",
      borderRadius: "50%", filter: "blur(80px)"
    }} />

    <AnimHeading>
      <span className="section-label">03 — Skills</span>
      <h2 style={{ fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 800, marginTop: 12, marginBottom: 60 }}>
        My <span style={{ color: "var(--accent)" }}>toolkit</span>
      </h2>
    </AnimHeading>

    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
      {skillGroups.map((group, gi) => (
        <motion.div key={gi}
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: gi * 0.1 }} viewport={{ once: true }}
          className="glass"
          style={{ padding: 28, borderRadius: 16, borderTop: `2px solid ${group.color}` }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10, display: "flex", alignItems: "center",
              justifyContent: "center", background: `${group.color}18`, color: group.color
            }}>{group.icon}</div>
            <h3 style={{ fontWeight: 700, fontSize: 15 }}>{group.label}</h3>
          </div>
          {group.skills.map((s, si) => (
            <SkillBar key={si} {...s} color={group.color} delay={si * 0.1 + gi * 0.05} />
          ))}
        </motion.div>
      ))}
    </div>
  </Section>
);

// ─── 5. RESUME SECTION ────────────────────────────────────────────────────────
const Resume = () => (
  <Section id="resume" style={{ padding: "120px 8%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", minHeight: "60vh" }}>
    <AnimHeading>
      <span className="section-label">04 — Resume</span>
      <h2 style={{ fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 800, marginTop: 12, marginBottom: 20 }}>
        Download my <span style={{ color: "var(--accent)" }}>resume</span>
      </h2>
      <p style={{ color: "var(--muted)", fontSize: 16, marginBottom: 48, maxWidth: 480, margin: "0 auto 48px" }}>
        Get a copy of my full resume with all projects, certifications, and experience details.
      </p>
    </AnimHeading>

    <motion.div
      initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }} transition={{ duration: 0.6 }}
    >
      <div className="glass" style={{
        borderRadius: 24, padding: 60, maxWidth: 480, margin: "0 auto",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 24,
        animation: "pulse-glow 3s ease-in-out infinite"
      }}>
        <div style={{ fontSize: 72 }}>📄</div>
        <div>
          <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 6 }}>S Ram Karthick — Resume</div>
          <div style={{ color: "var(--muted)", fontSize: 14 }}>Full-Stack Developer • Java / React.js / Spring Boot</div>
        </div>
        <a href="/resume.pdf" download style={{ width: "100%" }}>
          <motion.button
            className="btn-primary" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
            style={{ width: "100%", fontSize: 16, padding: "18px 32px" }}
          >
            <Download size={18} style={{ display: "inline", marginRight: 10, verticalAlign: "middle" }} />
            Download PDF
          </motion.button>
        </a>
      </div>
    </motion.div>
  </Section>
);

// ─── 6. CONTACT SECTION ───────────────────────────────────────────────────────
const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = "Valid email required";
    if (form.message.trim().length < 10) e.message = "Message must be at least 10 characters";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    setSubmitted(true);
  };

  return (
    <Section id="contact" style={{ padding: "120px 8%" }}>
      <div style={{
        position: "absolute", top: "30%", right: "5%", width: 300, height: 300,
        background: "radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%)",
        borderRadius: "50%", filter: "blur(60px)"
      }} />

      <AnimHeading>
        <span className="section-label">05 — Contact</span>
        <h2 style={{ fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 800, marginTop: 12, marginBottom: 60 }}>
          Let's <span style={{ color: "var(--accent)" }}>connect</span>
        </h2>
      </AnimHeading>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, maxWidth: 900 }}>
        {/* Left */}
        <div>
          <p style={{ color: "var(--muted)", fontSize: 16, lineHeight: 1.8, marginBottom: 40 }}>
            I'm open to full-time roles, internships, and collaboration. Whether it's a project idea or just a tech chat — reach out.
          </p>
          {[
            { icon: Mail, label: "Email", value: "ramkarthick125@gmail.com", href: "mailto:ramkarthick125@gmail.com" },
            { icon: Phone, label: "Phone", value: "+91 8248257581", href: "tel:+918248257581" },
            { icon: LinkedinIcon, label: "LinkedIn", value: "linkedin.com/in/ramkarthick125", href: "https://linkedin.com/in/ramkarthick125" },
          ].map(({ icon: Icon, label, value, href }) => (
            <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer"
              whileHover={{ x: 6 }}
              style={{
                display: "flex", alignItems: "center", gap: 16, marginBottom: 20,
                textDecoration: "none", color: "var(--text)"
              }}
            >
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.2)",
                display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent)"
              }}><Icon size={18} /></div>
              <div>
                <div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 2 }}>{label}</div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{value}</div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Right: Form */}
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div key="success"
              initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
              style={{
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                textAlign: "center", gap: 16
              }}
            >
              <div style={{ fontSize: 64 }}>✅</div>
              <h3 style={{ fontSize: 24, fontWeight: 700 }}>Message sent!</h3>
              <p style={{ color: "var(--muted)" }}>Thanks for reaching out. I'll get back to you soon.</p>
              <button className="btn-outline" onClick={() => { setSubmitted(false); setForm({ name: "", email: "", message: "" }); }}>
                Send another
              </button>
            </motion.div>
          ) : (
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div>
                  <input placeholder="Your Name" value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    style={{ borderColor: errors.name ? "#ef4444" : undefined }}
                  />
                  {errors.name && <div style={{ color: "#ef4444", fontSize: 12, marginTop: 4 }}>{errors.name}</div>}
                </div>
                <div>
                  <input placeholder="Your Email" value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    style={{ borderColor: errors.email ? "#ef4444" : undefined }}
                  />
                  {errors.email && <div style={{ color: "#ef4444", fontSize: 12, marginTop: 4 }}>{errors.email}</div>}
                </div>
                <div>
                  <textarea placeholder="Your Message" rows={5} value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    style={{ resize: "vertical", borderColor: errors.message ? "#ef4444" : undefined }}
                  />
                  {errors.message && <div style={{ color: "#ef4444", fontSize: 12, marginTop: 4 }}>{errors.message}</div>}
                </div>
                <motion.button className="btn-primary" onClick={handleSubmit}
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}
                >
                  <Send size={16} /> Send Message
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style>{`@media(max-width:768px){ #contact > div:last-child { grid-template-columns: 1fr !important; } }`}</style>
    </Section>
  );
};

// ─── 7. CODING PROFILES SECTION ───────────────────────────────────────────────
const Profiles = () => {
  const profiles = [
    {
      name: "GitHub",
      handle: "@ramkarthick125",
      href: "https://github.com/ramkarthick125",
      icon: <GithubIcon size={32} />,
      color: "#e2e8f0",
      bg: "#161b22",
      stats: [{ label: "Repos", value: "10+" }, { label: "Language", value: "Java/JS" }],
      desc: "Open source projects and personal portfolio repos."
    },
    {
      name: "LeetCode",
      handle: "ramkarthick125",
      href: "https://leetcode.com/Ram_Karthick",
      icon: <span style={{ fontSize: 30 }}>⚡</span>,
      color: "#ffa116",
      bg: "#1a1a1a",
      stats: [{ label: "Rating", value: "1600+" }, { label: "Solved", value: "310+" }],
      desc: "Algorithms and data structures — consistently improving."
    },
    {
      name: "CodeChef",
      handle: "ramkarthick125",
      href: "https://codechef.com/users/ramkarthick20",
      icon: <span style={{ fontSize: 30 }}>🍴</span>,
      color: "#5b4638",
      bg: "#1e1610",
      stats: [{ label: "Rating", value: "1100+" }, { label: "Solved", value: "120+" }],
      desc: "Competitive programming and monthly contests."
    }
  ];

  return (
    <Section id="profiles" style={{ padding: "120px 8%" }}>
      <AnimHeading>
        <span className="section-label">06 — Coding Profiles</span>
        <h2 style={{ fontSize: "clamp(36px, 5vw, 60px)", fontWeight: 800, marginTop: 12, marginBottom: 60 }}>
          Find me <span style={{ color: "var(--accent)" }}>online</span>
        </h2>
      </AnimHeading>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 28, maxWidth: 960 }}>
        {profiles.map((p, i) => (
          <motion.a key={i} href={p.href} target="_blank" rel="noopener noreferrer"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.12 }}
            viewport={{ once: true }}
            whileHover={{ y: -8, scale: 1.02 }}
            style={{
              textDecoration: "none", color: "var(--text)",
              borderRadius: 20, overflow: "hidden",
              background: "var(--surface)", border: "1px solid var(--border)",
              display: "block"
            }}
          >
            <div style={{
              padding: "32px 28px",
              background: `linear-gradient(135deg, ${p.bg}, var(--surface))`
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
                <div style={{
                  width: 60, height: 60, borderRadius: 16,
                  background: `${p.color}15`, border: `1px solid ${p.color}30`,
                  display: "flex", alignItems: "center", justifyContent: "center", color: p.color
                }}>{p.icon}</div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 18 }}>{p.name}</div>
                  <div className="mono" style={{ color: "var(--muted)", fontSize: 12 }}>{p.handle}</div>
                </div>
              </div>

              <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.6, marginBottom: 20 }}>{p.desc}</p>

              <div style={{ display: "flex", gap: 12 }}>
                {p.stats.map((s, si) => (
                  <div key={si} style={{
                    flex: 1, padding: "12px 16px", borderRadius: 10,
                    background: "rgba(255,255,255,0.04)", border: "1px solid var(--border)", textAlign: "center"
                  }}>
                    <div style={{ fontWeight: 800, fontSize: 18, color: p.color }}>{s.value}</div>
                    <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 2 }}>{s.label}</div>
                  </div>
                ))}
              </div>

              <div style={{
                marginTop: 20, display: "flex", alignItems: "center", gap: 8,
                color: p.color, fontSize: 13, fontWeight: 600
              }}>
                <ExternalLink size={14} /> View Profile
              </div>
            </div>
          </motion.a>
        ))}
      </div>

      {/* Social Links */}
      <AnimHeading delay={0.3} style={{ marginTop: 80 }}>
        <span className="section-label">Also find me on</span>
        <div style={{ display: "flex", gap: 20, marginTop: 24, flexWrap: "wrap" }}>
          {[
            { icon: GithubIcon, href: "https://github.com/ramkarthick125", label: "GitHub" },
            { icon: LinkedinIcon, href: "https://linkedin.com/in/ramkarthick125", label: "LinkedIn" },
            { icon: Mail, href: "mailto:ramkarthick125@gmail.com", label: "Email" },
          ].map(({ icon: Icon, href, label }) => (
            <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.15, rotate: 8 }}
              style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "12px 20px", borderRadius: 12,
                background: "var(--surface2)", border: "1px solid var(--border)",
                color: "var(--muted)", textDecoration: "none",
                fontSize: 14, fontWeight: 600,
                transition: "color 0.2s, border-color 0.2s"
              }}
              onMouseEnter={e => { e.currentTarget.style.color = "var(--accent2)"; e.currentTarget.style.borderColor = "rgba(6,182,212,0.4)"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "var(--muted)"; e.currentTarget.style.borderColor = "var(--border)"; }}
            >
              <Icon size={18} /> {label}
            </motion.a>
          ))}
        </div>
      </AnimHeading>
    </Section>
  );
};

// ─── CTA BANNER ───────────────────────────────────────────────────────────────
const CTABanner = () => (
  <Section id="cta" style={{
    minHeight: "50vh", display: "flex", alignItems: "center", justifyContent: "center",
    textAlign: "center", padding: "80px 8%"
  }}>
    <div style={{
      position: "absolute", inset: 0,
      background: "radial-gradient(ellipse at 50% 50%, rgba(124,58,237,0.15) 0%, transparent 70%)"
    }} />
    <div style={{ position: "relative", zIndex: 1 }}>
      <motion.div
        initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }} viewport={{ once: true }}
      >
        <div className="section-label" style={{ marginBottom: 16 }}>Available for opportunities</div>
        <h2 style={{
          fontSize: "clamp(40px, 6vw, 80px)", fontWeight: 800, marginBottom: 24,
          background: "linear-gradient(135deg, var(--text), var(--accent), var(--accent2))",
          backgroundSize: "200% 200%", animation: "gradient-shift 4s ease infinite",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text"
        }}>
          Let's build something<br />remarkable together.
        </h2>
        <p style={{ color: "var(--muted)", fontSize: 18, marginBottom: 40 }}>
          Open to full-time roles, internships & freelance projects.
        </p>
        <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
          <motion.button className="btn-primary"
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            style={{ fontSize: 16, padding: "16px 40px" }}
          >
            <Zap size={16} style={{ display: "inline", marginRight: 8 }} />
            Hire Me
          </motion.button>
          <motion.a href="mailto:ramkarthick125@gmail.com"
            whileHover={{ scale: 1.05 }}
            style={{ display: "inline-block" }}
          >
            <button className="btn-outline" style={{ fontSize: 16, padding: "16px 40px" }}>
              Get In Touch
            </button>
          </motion.a>
        </div>
      </motion.div>
    </div>
  </Section>
);

// ─── FOOTER ───────────────────────────────────────────────────────────────────
const Footer = () => (
  <footer style={{
    padding: "40px 8%", borderTop: "1px solid var(--border)",
    display: "flex", justifyContent: "space-between", alignItems: "center",
    flexWrap: "wrap", gap: 16
  }}>
    <div className="mono" style={{ color: "var(--muted)", fontSize: 12 }}>
      © 2025 S Ram Karthick — Built with React & Framer Motion
    </div>
    <div className="mono" style={{ color: "var(--muted)", fontSize: 12, display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981", animation: "pulse-glow 2s infinite" }} />
      Open to opportunities
    </div>
  </footer>
);

// ─── ROOT APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const sections = navItems.map(n => document.getElementById(n.toLowerCase()));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { threshold: 0.3 }
    );
    sections.forEach(s => s && observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <GlobalStyles />
      <CustomCursor />
      <Nav active={active} setActive={setActive} />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Resume />
        <Contact />
        <Profiles />
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}