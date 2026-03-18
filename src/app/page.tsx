"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import {
  Menu,
  X,
  Zap,
  BookOpen,
  Wrench,
  ArrowRight,
  Play,
  Star,
  Users,
  Clock,
  ChevronRight,
  Terminal,
  Code2,
  Sparkles,
  ExternalLink,
  Github,
  Twitter,
  Heart,
  Coffee,
  Layers,
  Cpu,
  Globe,
  MousePointer2,
  Bot,
  Palette,
  Film,
  Camera,
} from "lucide-react";

// ========== DATA ==========
const courses = [
  {
    id: 1,
    slug: "vibe-coding-101",
    title: "Vibe Coding 101",
    subtitle: "Dari Nol Sampai Deploy",
    description: "Belajar dasar-dasar vibe coding. Dari setup environment, prompt engineering, sampai deploy app pertamamu.",
    lessons: 12,
    duration: "3 jam",
    level: "Pemula",
    icon: <Sparkles className="w-5 h-5" />,
    color: "#E50914",
    tags: ["AI", "Prompt", "Deploy"],
  },
  {
    id: 2,
    slug: "ai-powered-frontend",
    title: "AI-Powered Frontend",
    subtitle: "Build UI dengan AI",
    description: "Cara bikin UI yang stunning pakai AI tools. Dari wireframe sampai production-ready components.",
    lessons: 8,
    duration: "2.5 jam",
    level: "Menengah",
    icon: <Palette className="w-5 h-5" />,
    color: "#00D4FF",
    tags: ["React", "Tailwind", "AI"],
  },
  {
    id: 3,
    slug: "full-stack-vibes",
    title: "Full-Stack Vibes",
    subtitle: "Backend + Frontend + AI",
    description: "Gabungin semua skill. Build full-stack app dari nol pakai vibe coding methodology.",
    lessons: 15,
    duration: "5 jam",
    level: "Menengah",
    icon: <Layers className="w-5 h-5" />,
    color: "#FF6B6B",
    tags: ["Next.js", "Database", "API"],
  },
  {
    id: 4,
    slug: "prompt-engineering-pro",
    title: "Prompt Engineering Pro",
    subtitle: "Master the Art of Prompting",
    description: "Deep dive ke prompt engineering. Bikin prompt yang efektif untuk coding, debugging, dan arsitektur.",
    lessons: 10,
    duration: "3.5 jam",
    level: "Semua Level",
    icon: <Bot className="w-5 h-5" />,
    color: "#C084FC",
    tags: ["GPT", "Claude", "Prompts"],
  },
  {
    id: 5,
    slug: "ship-it-deploy-guide",
    title: "Ship It! Deploy Guide",
    subtitle: "Dari Local ke Production",
    description: "Panduan lengkap deploy aplikasi. Vercel, Railway, Docker, CI/CD — semua dibahas.",
    lessons: 7,
    duration: "2 jam",
    level: "Pemula",
    icon: <Globe className="w-5 h-5" />,
    color: "#FFA726",
    tags: ["Vercel", "Docker", "CI/CD"],
  },
  {
    id: 6,
    slug: "cursor-copilot-mastery",
    title: "Cursor & Copilot Mastery",
    subtitle: "AI Code Editor Pro Tips",
    description: "Tips dan tricks pakai Cursor, GitHub Copilot, dan AI code editors lainnya biar produktif.",
    lessons: 9,
    duration: "2.5 jam",
    level: "Semua Level",
    icon: <MousePointer2 className="w-5 h-5" />,
    color: "#4ECDC4",
    tags: ["Cursor", "Copilot", "VSCode"],
  },
];

const tools = [
  {
    id: 1,
    name: "VibeGen CLI",
    description: "CLI tool untuk generate project boilerplate dengan AI. Setup Next.js, database, auth — satu command.",
    category: "CLI",
    status: "Stable",
    icon: <Terminal className="w-6 h-6" />,
    link: "#",
  },
  {
    id: 2,
    name: "PromptKit",
    description: "Pembuat prompt video AI untuk Higgsfield. Pilih gaya, kamera, cahaya — langsung generate prompt profesional.",
    category: "AI Video Prompts",
    status: "New",
    icon: <Sparkles className="w-6 h-6" />,
    link: "/promptkit/",
  },
  {
    id: 3,
    name: "VibeUI Components",
    description: "Komponen UI siap pakai yang di-generate pakai AI. Copy paste langsung jalan.",
    category: "Components",
    status: "Beta",
    icon: <Code2 className="w-6 h-6" />,
    link: "#",
  },
  {
    id: 4,
    name: "DeployBot",
    description: "Automasi deploy ke berbagai platform. Connect repo, pilih platform, deploy!",
    category: "DevOps",
    status: "Coming Soon",
    icon: <Cpu className="w-6 h-6" />,
    link: "#",
  },
];

// ========== COMPONENTS ==========

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const links = [
    { href: "#courses", label: "Courses", isExternal: false },
    { href: "/promptkit/", label: "PromptKit", isExternal: true },
    { href: "#tools", label: "Tools", isExternal: false },
    { href: "#about", label: "About", isExternal: false },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#050505]/80 backdrop-blur-xl border-b border-[#1a1a1a]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-[#E50914] flex items-center justify-center group-hover:scale-110 transition-transform">
            <span className="text-white font-extrabold text-sm" style={{ fontFamily: "'Syne', sans-serif" }}>V</span>
          </div>
          <span className="font-bold text-lg tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
            VIBENGODING<span className="text-[#E50914]">.ID</span>
          </span>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target={link.isExternal ? "_blank" : undefined}
              rel={link.isExternal ? "noopener noreferrer" : undefined}
              className="text-sm text-[#888] hover:text-white transition-colors relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#E50914] group-hover:w-full transition-all duration-300" />
            </a>
          ))}
          {session?.user ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                {session.user.image && (
                  <img
                    src={session.user.image}
                    alt={session.user.name || ""}
                    className="w-8 h-8 rounded-full border-2 border-[#E50914]/50"
                  />
                )}
                <span className="text-sm text-white font-medium hidden lg:block max-w-[120px] truncate">
                  {session.user.name?.split(" ")[0]}
                </span>
              </div>
              <button
                onClick={() => signOut()}
                className="px-4 py-2 text-xs text-[#888] border border-[#333] rounded-full hover:border-red-500/50 hover:text-red-400 transition-all cursor-pointer"
              >
                Keluar
              </button>
            </div>
          ) : (
            <button
              onClick={() => signIn("google")}
              className="px-5 py-2 bg-[#E50914] text-black text-sm font-semibold rounded-full hover:bg-[#FF2D3B] transition-all hover:scale-105 cursor-pointer"
            >
              Masuk
            </button>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0A0A0A] border-b border-[#1a1a1a]"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target={link.isExternal ? "_blank" : undefined}
                  rel={link.isExternal ? "noopener noreferrer" : undefined}
                  onClick={() => setIsOpen(false)}
                  className="text-[#888] hover:text-white transition-colors py-2"
                >
                  {link.label}
                </a>
              ))}
              {session?.user ? (
                <div className="flex items-center justify-between pt-2 border-t border-[#1a1a1a]">
                  <div className="flex items-center gap-2">
                    {session.user.image && (
                      <img src={session.user.image} alt="" className="w-8 h-8 rounded-full" />
                    )}
                    <span className="text-sm text-white">{session.user.name}</span>
                  </div>
                  <button
                    onClick={() => { signOut(); setIsOpen(false); }}
                    className="text-xs text-red-400 cursor-pointer"
                  >
                    Keluar
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => { signIn("google"); setIsOpen(false); }}
                  className="px-5 py-3 bg-[#E50914] text-black text-sm font-semibold rounded-full text-center hover:bg-[#FF2D3B] transition-all cursor-pointer"
                >
                  Masuk dengan Google
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

function HeroSection() {
  const [typedText, setTypedText] = useState("");
  const fullText = "npx vibengoding init --vibe 🔥";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i <= fullText.length) {
        setTypedText(fullText.slice(0, i));
        i++;
      } else {
        clearInterval(interval);
      }
    }, 60);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center grid-pattern overflow-hidden">
      {/* Ambient blobs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#E50914]/10 rounded-full blur-[120px] animate-float" />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-[#E50914]/5 rounded-full blur-[100px] animate-float" style={{ animationDelay: "3s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#E50914]/[0.02] rounded-full blur-[80px]" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#E50914]/10 border border-[#E50914]/20 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-[#E50914] animate-pulse" />
          <span className="text-[#E50914] text-sm font-medium">100% Free — No BS, No Paywall</span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl sm:text-7xl lg:text-8xl font-extrabold leading-[0.95] tracking-tight mb-6"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          <span className="text-white">Belajar</span>
          <br />
          <span className="text-[#E50914] glow-text">Vibe Coding</span>
          <br />
          <span className="text-[#888] text-4xl sm:text-5xl lg:text-6xl font-bold">
            Gratis. Selamanya.
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-[#888] text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Courses lengkap, tools siap pakai, dan komunitas developer Indonesia
          yang suka ngoding sambil vibing. ✨
        </motion.p>

        {/* Terminal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="max-w-lg mx-auto mb-10"
        >
          <div className="bg-[#111] rounded-xl border border-[#1a1a1a] overflow-hidden glow-lime">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-[#1a1a1a]">
              <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
              <div className="w-3 h-3 rounded-full bg-[#28c840]" />
              <span className="text-xs text-[#555] ml-2 font-mono">terminal</span>
            </div>
            <div className="px-4 py-4 font-mono text-sm">
              <span className="text-[#E50914]">→</span>{" "}
              <span className="text-[#888]">~</span>{" "}
              <span className="text-white">{typedText}</span>
              <span className="cursor-blink text-[#E50914] ml-0.5">▌</span>
            </div>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#courses"
            className="group flex items-center gap-2 px-8 py-4 bg-[#E50914] text-black font-bold rounded-full hover:bg-[#FF2D3B] transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(229,9,20,0.3)]"
          >
            <Play className="w-4 h-4" />
            Mulai Belajar
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#tools"
            className="flex items-center gap-2 px-8 py-4 border border-[#333] text-white font-medium rounded-full hover:border-[#E50914]/50 hover:bg-[#E50914]/5 transition-all"
          >
            <Wrench className="w-4 h-4" />
            Lihat Tools
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-16 flex items-center justify-center gap-8 sm:gap-16 text-center"
        >
          {[
            { value: "6+", label: "Courses" },
            { value: "60+", label: "Lessons" },
            { value: "FREE", label: "Selamanya" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-2xl sm:text-3xl font-bold text-[#E50914]" style={{ fontFamily: "'Syne', sans-serif" }}>
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-[#555] mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050505] to-transparent" />
    </section>
  );
}

function CourseCard({ course, index }: { course: typeof courses[0]; index: number }) {
  return (
    <Link href={`/courses/${course.slug}`}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="group relative bg-[#111] rounded-2xl border border-[#1a1a1a] overflow-hidden hover:border-[#333] transition-all duration-500 hover:-translate-y-1 h-full"
      >
      {/* Top accent line */}
      <div className="h-[2px] w-full" style={{ background: `linear-gradient(90deg, ${course.color}, transparent)` }} />

      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: `${course.color}15`, color: course.color }}
          >
            {course.icon}
          </div>
          <span className="text-xs px-3 py-1 rounded-full bg-[#1a1a1a] text-[#888] border border-[#222]">
            {course.level}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-white mb-1" style={{ fontFamily: "'Syne', sans-serif" }}>
          {course.title}
        </h3>
        <p className="text-xs text-[#666] mb-3 font-mono">{course.subtitle}</p>

        {/* Description */}
        <p className="text-sm text-[#888] leading-relaxed mb-4">{course.description}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-5">
          {course.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 rounded-md font-mono"
              style={{ backgroundColor: `${course.color}10`, color: course.color }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-[#1a1a1a]">
          <div className="flex items-center gap-4 text-xs text-[#666]">
            <span className="flex items-center gap-1">
              <BookOpen className="w-3.5 h-3.5" />
              {course.lessons} lessons
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {course.duration}
            </span>
          </div>
          <button
            className="flex items-center gap-1 text-sm font-semibold group-hover:gap-2 transition-all"
            style={{ color: course.color }}
          >
            Mulai
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
    </Link>
  );
}

function CoursesSection() {
  return (
    <section id="courses" className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E50914]/10 border border-[#E50914]/20 text-[#E50914] text-xs font-mono mb-4">
            <BookOpen className="w-3.5 h-3.5" />
            FREE COURSES
          </div>
          <h2
            className="text-4xl sm:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Semua Course,{" "}
            <span className="text-[#E50914]">Gratis.</span>
          </h2>
          <p className="text-[#888] text-lg max-w-xl mx-auto">
            Gak ada paywall, gak ada tier. Semua materi bisa kamu akses sekarang juga.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, i) => (
            <CourseCard key={course.id} course={course} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PromptKitSection() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      {/* Divider glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
      
      {/* Ambient blobs */}
      <div className="absolute top-1/4 -right-32 w-80 h-80 bg-purple-500/10 rounded-full blur-[120px] animate-float" />
      <div className="absolute bottom-1/4 -left-32 w-72 h-72 bg-fuchsia-500/8 rounded-full blur-[100px] animate-float" style={{ animationDelay: "2s" }} />

      <div className="max-w-7xl mx-auto px-6">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-mono mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            NEW TOOL — FEATURED
          </div>
          <h2
            className="text-4xl sm:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Prompt<span className="text-purple-400">Kit</span>
          </h2>
          <p className="text-[#888] text-lg max-w-xl mx-auto">
            Pembuat prompt video AI untuk Higgsfield. Bikin prompt sinematik dalam hitungan detik.
          </p>
        </motion.div>

        {/* Main Feature Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <a
            href="/promptkit/"
            className="group block relative bg-[#111] rounded-2xl border border-purple-500/20 overflow-hidden hover:border-purple-500/40 transition-all duration-500"
          >
            {/* Gradient top bar */}
            <div className="h-[2px] w-full bg-gradient-to-r from-purple-500 via-fuchsia-500 to-purple-500" />

            <div className="p-8 sm:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                {/* Left - Info */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-fuchsia-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xs px-3 py-1 rounded-full bg-purple-500/15 text-purple-400 border border-purple-500/25 font-semibold">
                      ✨ Baru Rilis
                    </span>
                  </div>

                  <h3
                    className="text-2xl sm:text-3xl font-bold text-white mb-3"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    Bikin Prompt Video AI
                    <br />
                    <span className="text-purple-400">Kayak Pro.</span>
                  </h3>

                  <p className="text-[#999] leading-relaxed mb-6">
                    PromptKit bantu kamu buat prompt video profesional untuk Higgsfield AI.
                    Pilih gaya sinematik, atur kamera, pencahayaan, gerakan — lalu generate
                    prompt yang optimized untuk model Sora 2, WAN, Kling, Veo, dan Minimax.
                  </p>

                  <div className="flex flex-wrap gap-3 mb-8">
                    {[
                      { icon: <Film className="w-3.5 h-3.5" />, label: "6 Model AI" },
                      { icon: <Camera className="w-3.5 h-3.5" />, label: "Shot & Kamera" },
                      { icon: <Zap className="w-3.5 h-3.5" />, label: "Preset Cepat" },
                      { icon: <Code2 className="w-3.5 h-3.5" />, label: "DeepSeek V3.2" },
                    ].map((f) => (
                      <span
                        key={f.label}
                        className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-[#1a1a1a] text-[#aaa] border border-[#222]"
                      >
                        {f.icon}
                        {f.label}
                      </span>
                    ))}
                  </div>

                  <div className="inline-flex items-center gap-2 px-6 py-3 bg-purple-500 text-white font-bold rounded-full group-hover:bg-purple-400 transition-all group-hover:scale-105 group-hover:shadow-[0_0_40px_rgba(168,85,247,0.3)]">
                    <Play className="w-4 h-4" />
                    Coba PromptKit
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

                {/* Right - Preview mockup */}
                <div className="relative">
                  <div className="bg-[#0a0a0f] rounded-xl border border-purple-500/15 overflow-hidden shadow-[0_0_60px_rgba(168,85,247,0.08)]">
                    {/* Browser chrome */}
                    <div className="flex items-center gap-2 px-4 py-3 border-b border-[#1a1a2a] bg-[#111118]">
                      <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                      <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                      <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                      <div className="flex-1 ml-3">
                        <div className="bg-[#1a1a24] rounded-md px-3 py-1 text-[10px] text-[#555568] font-mono max-w-[200px]">
                          promptkit.vibengoding.id
                        </div>
                      </div>
                    </div>

                    {/* App preview */}
                    <div className="p-6 space-y-4">
                      {/* Header */}
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-500 to-fuchsia-500 flex items-center justify-center">
                          <Sparkles className="w-3.5 h-3.5 text-white" />
                        </div>
                        <span className="text-sm font-bold text-white" style={{ fontFamily: "'Syne', sans-serif" }}>
                          Prompt<span className="text-purple-400">Kit</span>
                        </span>
                      </div>

                      {/* Step indicators */}
                      <div className="flex gap-1.5">
                        {["Subjek", "Gaya", "Kamera", "Cahaya", "Gerakan", "Model"].map((s, i) => (
                          <div
                            key={s}
                            className={`px-2.5 py-1 rounded-md text-[10px] font-medium ${
                              i === 0
                                ? "bg-purple-500/15 text-purple-400 border border-purple-500/30"
                                : "bg-[#1a1a24] text-[#555568] border border-[#2a2a3a]"
                            }`}
                          >
                            {s}
                          </div>
                        ))}
                      </div>

                      {/* Fake form */}
                      <div className="space-y-3">
                        <div>
                          <div className="text-[10px] text-[#8888a0] mb-1">Subjek Utama</div>
                          <div className="bg-[#111118] border border-[#2a2a3a] rounded-md px-3 py-2 text-xs text-[#e8e8f0]">
                            Seorang astronaut di planet asing ✨
                          </div>
                        </div>
                        <div>
                          <div className="text-[10px] text-[#8888a0] mb-1">Lokasi</div>
                          <div className="bg-[#111118] border border-[#2a2a3a] rounded-md px-3 py-2 text-xs text-[#555568]">
                            Gurun kristal berwarna ungu...
                          </div>
                        </div>
                      </div>

                      {/* Fake prompt output */}
                      <div className="bg-[#111118] rounded-md border border-[#2a2a3a] p-3">
                        <div className="text-[10px] text-purple-400 font-bold mb-1.5">🎬 PROMPT VIDEO</div>
                        <div className="text-[10px] text-[#8888a0] font-mono leading-relaxed line-clamp-2">
                          Cinematic 8K, slow dolly in on an astronaut standing alone on alien terrain, crystalline purple landscape...
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating accent */}
                  <div className="absolute -top-3 -right-3 w-20 h-20 bg-purple-500/20 rounded-full blur-xl" />
                  <div className="absolute -bottom-3 -left-3 w-16 h-16 bg-fuchsia-500/15 rounded-full blur-xl" />
                </div>
              </div>
            </div>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function ToolCard({ tool, index }: { tool: typeof tools[0]; index: number }) {
  const statusColors: Record<string, string> = {
    Stable: "text-green-400 bg-green-400/10 border-green-400/20",
    Beta: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
    New: "text-[#E50914] bg-[#E50914]/10 border-[#E50914]/20",
    "Coming Soon": "text-[#888] bg-[#888]/10 border-[#888]/20",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative gradient-border bg-[#111] rounded-2xl p-6 hover:bg-[#151515] transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 rounded-xl bg-[#E50914]/10 text-[#E50914] flex items-center justify-center group-hover:scale-110 transition-transform">
          {tool.icon}
        </div>
        <span className={`text-xs px-2.5 py-1 rounded-full border ${statusColors[tool.status]}`}>
          {tool.status}
        </span>
      </div>

      <h3 className="text-lg font-bold text-white mb-1" style={{ fontFamily: "'Syne', sans-serif" }}>
        {tool.name}
      </h3>
      <p className="text-xs text-[#555] font-mono mb-3">{tool.category}</p>
      <p className="text-sm text-[#888] leading-relaxed mb-5">{tool.description}</p>

      <a
        href={tool.link}
        target={tool.link.startsWith('/') ? '_blank' : undefined}
        rel={tool.link.startsWith('/') ? 'noopener noreferrer' : undefined}
        className="inline-flex items-center gap-2 text-sm font-semibold text-[#E50914] hover:gap-3 transition-all"
      >
        {tool.status === "Coming Soon" ? "Notify Me" : "Coba Sekarang"}
        <ExternalLink className="w-3.5 h-3.5" />
      </a>
    </motion.div>
  );
}

function ToolsSection() {
  return (
    <section id="tools" className="relative py-24 sm:py-32">
      {/* Divider glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-[#E50914]/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E50914]/10 border border-[#E50914]/20 text-[#E50914] text-xs font-mono mb-4">
            <Wrench className="w-3.5 h-3.5" />
            DEVELOPER TOOLS
          </div>
          <h2
            className="text-4xl sm:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Tools yang Gue Bikin,{" "}
            <br className="hidden sm:block" />
            <span className="text-[#E50914]">Buat Lo Semua.</span>
          </h2>
          <p className="text-[#888] text-lg max-w-xl mx-auto">
            Open-source tools buat nge-boost produktivitas vibe coding kamu. Pakai, modif, kontribusi.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {tools.map((tool, i) => (
            <ToolCard key={tool.id} tool={tool} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-[#E50914]/20 to-transparent" />

      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E50914]/10 border border-[#E50914]/20 text-[#E50914] text-xs font-mono mb-4">
            <Heart className="w-3.5 h-3.5" />
            ABOUT
          </div>
          <h2
            className="text-4xl sm:text-5xl font-bold text-white mb-6"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Kenapa{" "}
            <span className="text-[#E50914]">VIBENGODING</span>?
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="bg-[#111] rounded-2xl border border-[#1a1a1a] p-8 sm:p-12 mt-8"
        >
          <div className="space-y-6 text-[#aaa] leading-relaxed">
            <p className="text-lg">
              <span className="text-white font-semibold">Vibe coding itu bukan cuma trend.</span>{" "}
              Ini adalah cara baru ngoding yang lebih produktif, lebih kreatif, dan honestly — lebih fun.
            </p>
            <p>
              Gue bikin VIBENGODING.ID karena percaya semua orang berhak akses ke
              edukasi berkualitas tanpa harus bayar mahal. Semua course dan tools di sini{" "}
              <span className="text-[#E50914] font-semibold">gratis selamanya</span>.
            </p>
            <p>
              Misi kita simpel: bantu developer Indonesia jadi lebih jago, lebih cepat,
              dan lebih confident dengan AI-powered development.
            </p>
          </div>

          {/* Values */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10 pt-10 border-t border-[#1a1a1a]">
            {[
              { icon: <Coffee className="w-5 h-5" />, title: "No BS", desc: "Langsung praktek, gak banyak teori." },
              { icon: <Users className="w-5 h-5" />, title: "Community First", desc: "Dibangun bareng komunitas." },
              { icon: <Star className="w-5 h-5" />, title: "Always Free", desc: "Gratis selamanya, no strings attached." },
            ].map((val) => (
              <div key={val.title} className="text-center">
                <div className="w-10 h-10 rounded-xl bg-[#E50914]/10 text-[#E50914] flex items-center justify-center mx-auto mb-3">
                  {val.icon}
                </div>
                <h4 className="font-bold text-white text-sm mb-1">{val.title}</h4>
                <p className="text-xs text-[#666]">{val.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-50" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#E50914]/5 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2
            className="text-4xl sm:text-6xl font-bold text-white mb-6"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Ready to{" "}
            <span className="text-[#E50914] glow-text">Vibe</span>?
          </h2>
          <p className="text-[#888] text-lg mb-10 max-w-lg mx-auto">
            Mulai perjalanan vibe coding kamu sekarang. Gratis, tanpa signup, langsung gas.
          </p>
          <a
            href="#courses"
            className="inline-flex items-center gap-2 px-10 py-5 bg-[#E50914] text-black font-bold text-lg rounded-full hover:bg-[#FF2D3B] transition-all hover:scale-105 hover:shadow-[0_0_60px_rgba(229,9,20,0.3)]"
          >
            <Play className="w-5 h-5" />
            Gas Belajar Sekarang
            <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[#1a1a1a] py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#E50914] flex items-center justify-center">
              <span className="text-white font-extrabold text-xs" style={{ fontFamily: "'Syne', sans-serif" }}>V</span>
            </div>
            <span className="font-bold text-sm tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
              VIBENGODING<span className="text-[#E50914]">.ID</span>
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm text-[#666]">
            <a href="#courses" className="hover:text-white transition-colors">Courses</a>
            <Link href="/belajar-vibe-coding" className="hover:text-white transition-colors">Panduan</Link>
            <a href="/promptkit/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">PromptKit</a>
            <a href="#tools" className="hover:text-white transition-colors">Tools</a>
            <a href="#about" className="hover:text-white transition-colors">About</a>
          </div>

          {/* Socials */}
          <div className="flex items-center gap-4">
            <a href="#" className="text-[#666] hover:text-[#E50914] transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href="#" className="text-[#666] hover:text-[#E50914] transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-[#1a1a1a] text-center">
          <p className="text-xs text-[#444]">
            Built with <Heart className="w-3 h-3 inline text-[#E50914]" /> and vibes.
            © {new Date().getFullYear()} VIBENGODING.ID — All courses are free forever.
          </p>
        </div>
      </div>
    </footer>
  );
}

// ========== MAIN PAGE ==========
export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <HeroSection />
      <CoursesSection />
      <PromptKitSection />
      <ToolsSection />
      <AboutSection />
      <CTASection />
      <Footer />
    </main>
  );
}
