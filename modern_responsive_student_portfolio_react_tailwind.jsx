import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Menu, X, Sun, Moon, Github, Linkedin, Mail, ArrowUpRight, FileDown } from "lucide-react";

const sections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" },
];

export default function PortfolioApp() {
  const [theme, setTheme] = useState("dark");
  const [menuOpen, setMenuOpen] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const roles = useMemo(() => [
    "Analog IC Designer",
    "VLSI & Embedded Enthusiast",
    "PLL • VCO • PFD Focus",
    "LNA / RF Curious",
  ], []);

  useEffect(() => {
    let char = 0;
    let forward = true;
    let interval = setInterval(() => {
      const target = roles[roleIndex % roles.length];
      if (forward) {
        setTypedText(target.slice(0, char + 1));
        char++;
        if (char === target.length) {
          forward = false;
        }
      } else {
        setTypedText(target.slice(0, char - 1));
        char--;
        if (char === 0) {
          forward = true;
          setRoleIndex((i) => (i + 1) % roles.length);
        }
      }
    }, 100);
    return () => clearInterval(interval);
  }, [roleIndex, roles]);

  useEffect(() => {
    const saved = localStorage.getItem("portfolio-theme");
    if (saved) setTheme(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  const refs = useMemo(
    () => Object.fromEntries(sections.map((s) => [s.id, React.createRef()])),
    []
  );

  const scrollTo = (id) => {
    setMenuOpen(false);
    refs[id]?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const downloadCV = () => {
    const link = document.createElement("a");
    link.href = "/CV_SOUMYAJIT_MANDAL.pdf";
    link.download = "CV_SOUMYAJIT_MANDAL.pdf";
    link.click();
  };

  const tokens = theme === "dark"
    ? {
        bg: "bg-[#2C2C2C]",
        bgSoft: "bg-[#522546]",
        text: "text-white",
        subtext: "text-gray-300",
        accent: "#F7374F",
        accentBg: "bg-[#F7374F]",
        border: "border-[#88304E]",
        card: "bg-[#522546]",
      }
    : {
        bg: "bg-[#FFFBEB]",
        bgSoft: "bg-[#251749]",
        text: "text-[#1f1f1f]",
        subtext: "text-[#3f3f3f]",
        accent: "#495579",
        accentBg: "bg-[#495579]",
        border: "border-[#263159]",
        card: "bg-[#fffaf0]",
      };

  const AnimatedCard = ({ title, description }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`rounded-xl p-6 ${tokens.card} border ${tokens.border} shadow-md hover:shadow-xl transition`}
    >
      <h3 className="text-xl font-semibold" style={{ color: tokens.accent }}>{title}</h3>
      <p className={`mt-2 ${tokens.subtext}`}>{description}</p>
    </motion.div>
  );

  return (
    <div ref={containerRef} className={`min-h-screen ${tokens.bg} ${tokens.text} transition-colors duration-500`}>
      <motion.div style={{ scaleX }} className="fixed left-0 right-0 top-0 h-1 origin-left" />

      {/* Navbar */}
      <nav className={`sticky top-0 z-50 ${tokens.bgSoft} border-b ${tokens.border}`}>
        <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
          <div className="text-xl font-bold" style={{ color: tokens.accent }}>SM.</div>
          <div className="hidden md:flex items-center gap-8">
            {sections.map((s) => (
              <button key={s.id} onClick={() => scrollTo(s.id)}>{s.label}</button>
            ))}
            <button onClick={toggleTheme} className="rounded-full p-2 border" style={{ borderColor: tokens.accent }}>
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>
          <button className="md:hidden p-2" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section ref={refs.home} className="px-4 py-20 max-w-7xl mx-auto text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-extrabold">Hi, I’m <span style={{ color: tokens.accent }}>Soumyajit Mandal</span></h1>
        <p className={`mt-4 text-lg md:text-xl ${tokens.subtext}`}>{typedText}<span className="animate-pulse">|</span></p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          <button onClick={() => scrollTo('projects')} className={`${tokens.accentBg} px-6 py-3 rounded-full`} style={{ color: '#fff' }}>View My Work</button>
          <button onClick={() => scrollTo('contact')} className={`border ${tokens.border} px-6 py-3 rounded-full`} style={{ color: tokens.accent }}>Contact Me</button>
        </div>
      </section>

      {/* About */}
      <section ref={refs.about} className="px-4 py-20 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold">About Me</h2>
        <p className={`mt-4 ${tokens.subtext}`}>Pursuing a career in VLSI design with focus on Analog Integrated Circuits. Proficient in Cadence Virtuoso, hands-on experience with high-performance analog circuits.</p>
        <button onClick={downloadCV} className={`${tokens.accentBg} px-6 py-3 rounded-full mt-6`} style={{ color: '#fff' }}><FileDown className="inline mr-2" /> Download CV</button>
      </section>

      {/* Education */}
      <section ref={refs.education} className="px-4 py-20 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold">Education</h2>
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatedCard title="M.Tech, DIAT (DU), DRDO" description="VLSI & Embedded Systems (2024–2026)" />
          <AnimatedCard title="B.Tech, Cooch Behar Govt. Engg. College" description="Electronics and Communication Engineering (2020–2024) — CGPA: 8.23" />
          <AnimatedCard title="Higher Secondary, Malda Zilla School" description="Science (PCMB) (2018–2020) — 80%" />
        </div>
      </section>

      {/* Skills */}
      <section ref={refs.skills} className="px-4 py-20 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold">Skills</h2>
        <p className={`mt-2 ${tokens.subtext}`}>Cadence Virtuoso, PLL/VCO/PFD Design, Layout Basics, MATLAB/Python, Embedded C</p>
      </section>

      {/* Projects */}
      <section ref={refs.projects} className="px-4 py-20 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold">Projects</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatedCard title="Design of High-Performance PFDs & VCOs for PLL Applications" description="Optimizing PLL performance with precision frequency synthesis." />
          <AnimatedCard title="Vehicle Horn Blow Detection, Recording and Reporting System" description="Detection and reporting using SMTP server." />
          <AnimatedCard title="Basic Analog IC Design Using Cadence Virtuoso Platform" description="Hands-on analog design training." />
        </div>
      </section>

      {/* Certifications */}
      <section ref={refs.certifications} className="px-4 py-20 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold">Certifications</h2>
        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatedCard title="Coder’s Python" description="06/2021" />
          <AnimatedCard title="Artificial Intelligence by Remarkskill & IITKGP" description="01/2023" />
          <AnimatedCard title="Basic Analog IC Design Using Cadence Virtuoso Platform" description="08/2023" />
          <AnimatedCard title="Advanced Entrepreneurship-Cum-Skill Development Programme" description="Nano Scale VLSI Design for MSME sectors (03/2024)" />
        </div>
      </section>

      {/* Contact */}
      <section ref={refs.contact} className="px-4 py-20 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold">Contact</h2>
        <p className={`mt-2 ${tokens.subtext}`}>Email: contact.isoumyajitmandal@gmail.com | Phone: +91 6297338422</p>
        <div className="mt-4 flex flex-wrap gap-4">
          <a href="https://www.linkedin.com/in/soumyajit-m-95295a20a/" className={`border ${tokens.border} px-4 py-2 rounded-full`} style={{ color: tokens.accent }}>LinkedIn</a>
          <a href="https://github.com/" className={`border ${tokens.border} px-4 py-2 rounded-full`} style={{ color: tokens.accent }}>GitHub</a>
          <a href="https://www.researchgate.net/profile/Soumyajit-Mandal-5" className={`border ${tokens.border} px-4 py-2 rounded-full`} style={{ color: tokens.accent }}>ResearchGate</a>
        </div>
      </section>

      <footer className={`border-t ${tokens.border} px-4 py-6 text-center`}>
        <p className={tokens.subtext}>© {new Date().getFullYear()} Soumyajit Mandal. All rights reserved.</p>
      </footer>
    </div>
  );
}
