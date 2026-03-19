"use client"

import { useState, useCallback, use } from "react"
import { motion, AnimatePresence } from "motion/react"
import Link from "next/link"
import {
  ArrowLeft, Copy, Check, ExternalLink, Github, Calendar,
  Layers, Sparkles, ChevronRight, ChevronDown, Tag, Cpu,
  BookOpen, Lightbulb, Filter, Code2, Wrench, Palette,
  Bug, Rocket, Zap, Terminal, Hash, Wand2, Play
} from "lucide-react"
import { getProjectBySlug, getAllProjects, type ProjectPrompt, type ProjectStep } from "@/lib/projects"
import { notFound } from "next/navigation"

// ─── Category icon mapping ───
const categoryIcons: Record<string, React.ReactNode> = {
  setup: <Terminal className="w-3.5 h-3.5" />,
  component: <Layers className="w-3.5 h-3.5" />,
  logic: <Code2 className="w-3.5 h-3.5" />,
  styling: <Palette className="w-3.5 h-3.5" />,
  debug: <Bug className="w-3.5 h-3.5" />,
  deploy: <Rocket className="w-3.5 h-3.5" />,
}

const categoryColors: Record<string, string> = {
  setup: "text-green-400 bg-green-400/10 border-green-400/20",
  component: "text-blue-400 bg-blue-400/10 border-blue-400/20",
  logic: "text-purple-400 bg-purple-400/10 border-purple-400/20",
  styling: "text-pink-400 bg-pink-400/10 border-pink-400/20",
  debug: "text-orange-400 bg-orange-400/10 border-orange-400/20",
  deploy: "text-cyan-400 bg-cyan-400/10 border-cyan-400/20",
}

// ─── Prompt Card Component ───
function PromptCard({ prompt, projectColor }: { prompt: ProjectPrompt; projectColor: string }) {
  const [copied, setCopied] = useState(false)
  const [expanded, setExpanded] = useState(false)

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(prompt.prompt)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [prompt.prompt])

  const catConfig = categoryColors[prompt.category] || "text-[#888] bg-[#888]/10 border-[#888]/20"
  const catIcon = categoryIcons[prompt.category] || <Sparkles className="w-3.5 h-3.5" />

  return (
    <div className="bg-[#0f0f0f] rounded-xl border border-[#1a1a1a] overflow-hidden hover:border-[#2a2a2a] transition-colors">
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-4 text-left cursor-pointer group"
      >
        <div className="flex items-center gap-3 min-w-0">
          <span className={`shrink-0 flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full border font-mono ${catConfig}`}>
            {catIcon}
            {prompt.category}
          </span>
          <div className="min-w-0">
            <h4 className="text-sm font-semibold text-white truncate">{prompt.title}</h4>
            <p className="text-xs text-[#666] truncate">{prompt.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0 ml-3">
          <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#1a1a1a] text-[#888] font-mono">
            {prompt.tool}
          </span>
          <ChevronDown
            className={`w-4 h-4 text-[#555] transition-transform ${expanded ? "rotate-180" : ""}`}
          />
        </div>
      </button>

      {/* Expandable content */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-3">
              {/* Prompt text */}
              <div className="relative group/prompt">
                <div className="bg-[#0a0a0a] rounded-lg p-4 border border-[#1a1a1a] font-mono text-xs text-[#ccc] leading-relaxed whitespace-pre-wrap max-h-[300px] overflow-y-auto">
                  {prompt.prompt}
                </div>
                <button
                  onClick={handleCopy}
                  className="absolute top-2.5 right-2.5 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer border"
                  style={{
                    backgroundColor: copied ? "rgba(34, 197, 94, 0.1)" : `${projectColor}10`,
                    borderColor: copied ? "rgba(34, 197, 94, 0.3)" : `${projectColor}30`,
                    color: copied ? "#22c55e" : projectColor,
                  }}
                >
                  {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  {copied ? "Tersalin!" : "Salin Prompt"}
                </button>
              </div>

              {/* Result (if any) */}
              {prompt.result && (
                <div>
                  <p className="text-[10px] font-bold text-[#555] uppercase tracking-wider mb-1.5">💡 Hasil / Output</p>
                  <div className="bg-[#0a0a0a] rounded-lg p-3 border border-[#1a1a1a] text-xs text-[#999] leading-relaxed whitespace-pre-wrap">
                    {prompt.result}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Step Section ───
function StepSection({ step, projectColor }: { step: ProjectStep; projectColor: string }) {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      className="relative"
    >
      {/* Step card */}
      <div className="bg-[#111] rounded-2xl border border-[#1a1a1a] overflow-hidden">
        {/* Step header */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center gap-4 p-5 sm:p-6 text-left cursor-pointer group hover:bg-[#151515] transition-colors"
        >
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold shrink-0"
            style={{ backgroundColor: `${projectColor}15`, color: projectColor }}
          >
            {step.step}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-white" style={{ fontFamily: "'Syne', sans-serif" }}>
              {step.title}
            </h3>
            <p className="text-sm text-[#888] mt-0.5 line-clamp-1">{step.description}</p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs text-[#555] font-mono">{step.prompts.length} prompt{step.prompts.length !== 1 ? "s" : ""}</span>
            <ChevronDown
              className={`w-5 h-5 text-[#555] transition-transform ${isOpen ? "rotate-180" : ""}`}
            />
          </div>
        </button>

        {/* Prompts */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="px-5 sm:px-6 pb-5 sm:pb-6 space-y-3 border-t border-[#1a1a1a] pt-4">
                <p className="text-sm text-[#999] leading-relaxed">{step.description}</p>
                {step.prompts.map((prompt, i) => (
                  <PromptCard key={i} prompt={prompt} projectColor={projectColor} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

// ─── Master Prompt Card ───
function MasterPromptCard({ prompt, projectColor, projectTitle }: { prompt: string; projectColor: string; projectTitle: string }) {
  const [copied, setCopied] = useState(false)
  const [expanded, setExpanded] = useState(false)

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(prompt)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }, [prompt])

  const lineCount = prompt.split("\n").length
  const wordCount = prompt.split(/\s+/).length

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="mb-10 relative"
    >
      {/* Glow behind */}
      <div
        className="absolute -inset-1 rounded-2xl opacity-20 blur-xl pointer-events-none"
        style={{ background: `linear-gradient(135deg, ${projectColor}, transparent, ${projectColor}40)` }}
      />

      <div className="relative rounded-2xl overflow-hidden border" style={{ borderColor: `${projectColor}30` }}>
        {/* Gradient top bar */}
        <div className="h-[3px] w-full" style={{ background: `linear-gradient(90deg, ${projectColor}, ${projectColor}80, ${projectColor})` }} />

        {/* Header */}
        <div className="p-6 sm:p-8" style={{ backgroundColor: `${projectColor}08` }}>
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center"
                style={{ background: `linear-gradient(135deg, ${projectColor}, ${projectColor}80)` }}
              >
                <Wand2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2
                  className="text-xl font-bold text-white flex items-center gap-2"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  Master Prompt
                  <span
                    className="text-[10px] font-mono px-2 py-0.5 rounded-full border"
                    style={{ color: projectColor, borderColor: `${projectColor}40`, backgroundColor: `${projectColor}15` }}
                  >
                    1 PROMPT = ALL
                  </span>
                </h2>
                <p className="text-sm text-[#888] mt-0.5">
                  Satu prompt yang langsung build seluruh {projectTitle}
                </p>
              </div>
            </div>
          </div>

          <p className="text-sm text-[#999] leading-relaxed mb-5">
            Copy prompt ini ke <span className="text-white font-medium">Claude Code / Cursor / ChatGPT</span> dan 
            dia akan langsung eksekusi semua plan — dari setup project, bikin semua komponen, sampai fitur lengkap. 
            Gak perlu step-by-step, langsung jadi.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-[#111] border border-[#1a1a1a] text-[#888]">
              <Code2 className="w-3.5 h-3.5" />
              {lineCount} baris
            </span>
            <span className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-[#111] border border-[#1a1a1a] text-[#888]">
              <Hash className="w-3.5 h-3.5" />
              {wordCount.toLocaleString()} kata
            </span>
            <span className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-[#111] border border-[#1a1a1a] text-[#888]">
              <Wand2 className="w-3.5 h-3.5" />
              Eksekusi langsung
            </span>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer border"
              style={{
                backgroundColor: copied ? "rgba(34, 197, 94, 0.15)" : projectColor,
                borderColor: copied ? "rgba(34, 197, 94, 0.4)" : projectColor,
                color: copied ? "#22c55e" : "#fff",
              }}
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? "Tersalin ke Clipboard!" : "Salin Master Prompt"}
            </button>
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer border border-[#333] text-[#aaa] hover:border-[#555] hover:text-white bg-[#111]"
            >
              <Play className={`w-3.5 h-3.5 transition-transform ${expanded ? "rotate-90" : ""}`} />
              {expanded ? "Tutup Preview" : "Lihat Isi Prompt"}
            </button>
          </div>
        </div>

        {/* Expandable prompt content */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="border-t border-[#1a1a1a]">
                {/* Copy button inside */}
                <div className="flex items-center justify-between px-5 py-3 bg-[#0a0a0a] border-b border-[#1a1a1a]">
                  <span className="text-[10px] font-mono text-[#555] uppercase tracking-wider">master-prompt.md</span>
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 text-xs font-medium transition-colors cursor-pointer"
                    style={{ color: copied ? "#22c55e" : projectColor }}
                  >
                    {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    {copied ? "Tersalin!" : "Salin"}
                  </button>
                </div>
                <div className="p-5 bg-[#0a0a0a] max-h-[500px] overflow-y-auto font-mono text-xs text-[#ccc] leading-relaxed whitespace-pre-wrap">
                  {prompt}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

// ─── Main Page ───
export default function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const project = getProjectBySlug(slug)

  const [activeFilter, setActiveFilter] = useState<string | null>(null)

  if (!project) notFound()

  const totalPrompts = project.steps.reduce((sum, s) => sum + s.prompts.length, 0)

  // Get all unique prompt categories
  const allCategories = [...new Set(project.steps.flatMap((s) => s.prompts.map((p) => p.category)))]

  // Filter steps based on active category
  const filteredSteps = activeFilter
    ? project.steps
        .map((s) => ({
          ...s,
          prompts: s.prompts.filter((p) => p.category === activeFilter),
        }))
        .filter((s) => s.prompts.length > 0)
    : project.steps

  // Copy ALL prompts
  const [allCopied, setAllCopied] = useState(false)
  const handleCopyAll = useCallback(() => {
    const allText = project.steps
      .flatMap((s) =>
        s.prompts.map(
          (p) => `## ${s.title} — ${p.title}\n\nTool: ${p.tool}\nKategori: ${p.category}\n\n${p.prompt}`
        )
      )
      .join("\n\n---\n\n")
    navigator.clipboard.writeText(allText)
    setAllCopied(true)
    setTimeout(() => setAllCopied(false), 2000)
  }, [project.steps])

  return (
    <main className="relative min-h-screen">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#050505]/80 backdrop-blur-xl border-b border-[#1a1a1a]">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/projects" className="flex items-center gap-1.5 text-sm text-[#888] hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Semua Project
          </Link>
          <div className="flex items-center gap-3">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-[#888] hover:text-white transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Demo
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-[#888] hover:text-white transition-colors"
              >
                <Github className="w-3.5 h-3.5" />
                Code
              </a>
            )}
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-20 max-w-5xl mx-auto px-6">
        {/* Hero */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <div className="flex items-center gap-4 mb-4">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
              style={{ backgroundColor: `${project.color}15` }}
            >
              {project.icon}
            </div>
            <div>
              <h1
                className="text-3xl sm:text-4xl font-bold text-white"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                {project.title}
              </h1>
              <p className="text-[#888] mt-1">{project.subtitle}</p>
            </div>
          </div>

          <p className="text-[#aaa] leading-relaxed mb-6 max-w-3xl">{project.description}</p>

          {/* Meta info */}
          <div className="flex flex-wrap gap-3 mb-6">
            <span className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-[#111] border border-[#1a1a1a] text-[#888]">
              <Calendar className="w-3.5 h-3.5" />
              {new Date(project.date).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
            </span>
            <span className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-[#111] border border-[#1a1a1a] text-[#888]">
              <Layers className="w-3.5 h-3.5" />
              {project.steps.length} steps
            </span>
            <span className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-[#111] border border-[#1a1a1a] text-[#888]">
              <Sparkles className="w-3.5 h-3.5" />
              {totalPrompts} prompts
            </span>
            <span className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-[#111] border border-[#1a1a1a] text-[#888]">
              <Cpu className="w-3.5 h-3.5" />
              {project.aiTools.join(", ")}
            </span>
          </div>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="text-xs px-2.5 py-1 rounded-md font-mono"
                style={{ backgroundColor: `${project.color}10`, color: project.color }}
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-10 p-6 bg-[#111] rounded-2xl border border-[#1a1a1a]"
        >
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2" style={{ fontFamily: "'Syne', sans-serif" }}>
            <Zap className="w-5 h-5" style={{ color: project.color }} />
            Fitur Utama
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {project.features.map((f, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-[#aaa]">
                <span style={{ color: project.color }} className="shrink-0 mt-0.5">✦</span>
                {f}
              </div>
            ))}
          </div>
        </motion.div>

        {/* ═══ MASTER PROMPT — Satu Prompt Eksekusi Semua ═══ */}
        {project.masterPrompt && (
          <MasterPromptCard prompt={project.masterPrompt} projectColor={project.color} projectTitle={project.title} />
        )}

        {/* Steps & Prompts Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {/* Section header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h2
              className="text-2xl font-bold text-white flex items-center gap-2"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              <BookOpen className="w-6 h-6" style={{ color: project.color }} />
              Step-by-Step + Prompts
            </h2>
            <div className="flex items-center gap-2">
              {/* Copy all button */}
              <button
                onClick={handleCopyAll}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium transition-all border cursor-pointer"
                style={{
                  backgroundColor: allCopied ? "rgba(34, 197, 94, 0.1)" : `${project.color}10`,
                  borderColor: allCopied ? "rgba(34, 197, 94, 0.3)" : `${project.color}30`,
                  color: allCopied ? "#22c55e" : project.color,
                }}
              >
                {allCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {allCopied ? "Tersalin!" : "Salin Semua Prompt"}
              </button>
            </div>
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap gap-2 mb-6">
            <button
              onClick={() => setActiveFilter(null)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border cursor-pointer ${
                !activeFilter
                  ? "bg-[#E50914]/10 border-[#E50914]/30 text-[#E50914]"
                  : "bg-[#111] border-[#1a1a1a] text-[#888] hover:border-[#333]"
              }`}
            >
              <Filter className="w-3 h-3 inline mr-1" />
              Semua ({totalPrompts})
            </button>
            {allCategories.map((cat) => {
              const count = project.steps.reduce((sum, s) => sum + s.prompts.filter((p) => p.category === cat).length, 0)
              const catConfig = categoryColors[cat] || ""
              return (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat === activeFilter ? null : cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border cursor-pointer ${
                    activeFilter === cat ? catConfig : "bg-[#111] border-[#1a1a1a] text-[#888] hover:border-[#333]"
                  }`}
                >
                  {categoryIcons[cat]} {cat} ({count})
                </button>
              )
            })}
          </div>

          {/* Steps */}
          <div className="space-y-5">
            {filteredSteps.map((step) => (
              <StepSection key={step.step} step={step} projectColor={project.color} />
            ))}
          </div>
        </motion.div>

        {/* Lessons Learned */}
        {project.lessons.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 p-6 bg-[#111] rounded-2xl border border-[#1a1a1a]"
          >
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2" style={{ fontFamily: "'Syne', sans-serif" }}>
              <Lightbulb className="w-5 h-5 text-yellow-400" />
              Pelajaran & Tips
            </h2>
            <div className="space-y-3">
              {project.lessons.map((lesson, i) => (
                <div key={i} className="flex items-start gap-3 text-sm text-[#aaa]">
                  <span className="text-yellow-400 shrink-0 mt-0.5">💡</span>
                  {lesson}
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Tags */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 flex flex-wrap items-center gap-2"
        >
          <Hash className="w-4 h-4 text-[#555]" />
          {project.tags.map((tag) => (
            <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-[#111] border border-[#1a1a1a] text-[#666] font-mono">
              {tag}
            </span>
          ))}
        </motion.div>

        {/* Back link */}
        <div className="mt-12 pt-8 border-t border-[#1a1a1a] flex items-center justify-between">
          <Link
            href="/projects"
            className="flex items-center gap-2 text-sm text-[#888] hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Semua Project
          </Link>
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-[#888] hover:text-white transition-colors"
          >
            Beranda
            <ArrowLeft className="w-4 h-4 rotate-180" />
          </Link>
        </div>
      </div>
    </main>
  )
}
