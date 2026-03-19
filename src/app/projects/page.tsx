"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import Link from "next/link"
import {
  ArrowLeft, ArrowRight, Folder, Calendar, Tag, Layers,
  Sparkles, ExternalLink, Clock, Filter, Search, ChevronRight
} from "lucide-react"
import { getAllProjects, getAllCategories, type ProjectShowcase } from "@/lib/projects"

const statusConfig: Record<string, { label: string; color: string; bg: string }> = {
  completed: { label: "Selesai", color: "text-green-400", bg: "bg-green-400/10 border-green-400/20" },
  "in-progress": { label: "Dalam Proses", color: "text-yellow-400", bg: "bg-yellow-400/10 border-yellow-400/20" },
  planned: { label: "Direncanakan", color: "text-blue-400", bg: "bg-blue-400/10 border-blue-400/20" },
}

const categoryLabels: Record<string, string> = {
  web: "🌐 Web",
  mobile: "📱 Mobile",
  cli: "⌨️ CLI",
  library: "📦 Library",
  video: "🎬 Video",
  design: "🎨 Design",
}

function ProjectCard({ project, index }: { project: ProjectShowcase; index: number }) {
  const status = statusConfig[project.status]
  const totalPrompts = project.steps.reduce((sum, s) => sum + s.prompts.length, 0)

  return (
    <Link href={`/projects/${project.slug}`}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="group relative bg-[#111] rounded-2xl border border-[#1a1a1a] overflow-hidden hover:border-[#333] transition-all duration-500 hover:-translate-y-1 h-full"
      >
        {/* Top accent */}
        <div className="h-[2px] w-full" style={{ background: `linear-gradient(90deg, ${project.color}, transparent)` }} />

        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
              style={{ backgroundColor: `${project.color}15` }}
            >
              {project.icon}
            </div>
            <span className={`text-xs px-2.5 py-1 rounded-full border ${status.bg} ${status.color}`}>
              {status.label}
            </span>
          </div>

          {/* Title */}
          <h3
            className="text-xl font-bold text-white mb-1"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            {project.title}
          </h3>
          <p className="text-xs text-[#666] mb-3 font-mono">{project.subtitle}</p>

          {/* Description */}
          <p className="text-sm text-[#888] leading-relaxed mb-4 line-clamp-2">
            {project.description}
          </p>

          {/* Tech stack pills */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.techStack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="text-[10px] px-2 py-0.5 rounded-md font-mono"
                style={{ backgroundColor: `${project.color}10`, color: project.color }}
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 4 && (
              <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#1a1a1a] text-[#666]">
                +{project.techStack.length - 4}
              </span>
            )}
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4 pt-4 border-t border-[#1a1a1a] text-xs text-[#666]">
            <span className="flex items-center gap-1">
              <Layers className="w-3.5 h-3.5" />
              {project.steps.length} steps
            </span>
            <span className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              {totalPrompts} prompts
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {new Date(project.date).toLocaleDateString("id-ID", { month: "short", year: "numeric" })}
            </span>
            <button
              className="ml-auto flex items-center gap-1 text-sm font-semibold group-hover:gap-2 transition-all"
              style={{ color: project.color }}
            >
              Lihat
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </Link>
  )
}

export default function ProjectsPage() {
  const projects = getAllProjects()
  const categories = getAllCategories()

  const [search, setSearch] = useState("")
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const filtered = projects.filter((p) => {
    const matchSearch =
      !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase())) ||
      p.techStack.some((t) => t.toLowerCase().includes(search.toLowerCase()))
    const matchCategory = !activeCategory || p.category === activeCategory
    return matchSearch && matchCategory
  })

  return (
    <main className="relative min-h-screen">
      {/* Navbar minimal */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#050505]/80 backdrop-blur-xl border-b border-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-[#E50914] flex items-center justify-center group-hover:scale-110 transition-transform">
              <span className="text-white font-extrabold text-sm" style={{ fontFamily: "'Syne', sans-serif" }}>V</span>
            </div>
            <span className="font-bold text-lg tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
              VIBENGODING<span className="text-[#E50914]">.ID</span>
            </span>
          </Link>
          <Link href="/" className="flex items-center gap-1.5 text-sm text-[#888] hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Kembali
          </Link>
        </div>
      </nav>

      <div className="pt-24 pb-20 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E50914]/10 border border-[#E50914]/20 text-[#E50914] text-xs font-mono mb-4">
            <Folder className="w-3.5 h-3.5" />
            PROJECT SHOWCASE
          </div>
          <h1
            className="text-4xl sm:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Project yang <span className="text-[#E50914]">Gue Bangun</span>
          </h1>
          <p className="text-[#888] text-lg max-w-2xl mx-auto">
            Setiap project lengkap dengan recap, tech stack, dan{" "}
            <span className="text-white font-medium">prompt-prompt AI yang dipake</span> — 
            bisa langsung kamu copy dan modifikasi.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center gap-4 mb-10"
        >
          {/* Search */}
          <div className="relative flex-1 max-w-md w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#555]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari project, tech stack, atau tag..."
              className="w-full bg-[#111] border border-[#1a1a1a] rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder:text-[#555] focus:border-[#E50914]/50 focus:outline-none transition-colors"
            />
          </div>

          {/* Category filters */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <button
              onClick={() => setActiveCategory(null)}
              className={`shrink-0 px-3.5 py-2 rounded-lg text-xs font-medium transition-all border cursor-pointer ${
                !activeCategory
                  ? "bg-[#E50914]/10 border-[#E50914]/30 text-[#E50914]"
                  : "bg-[#111] border-[#1a1a1a] text-[#888] hover:border-[#333]"
              }`}
            >
              Semua
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat === activeCategory ? null : cat)}
                className={`shrink-0 px-3.5 py-2 rounded-lg text-xs font-medium transition-all border cursor-pointer ${
                  activeCategory === cat
                    ? "bg-[#E50914]/10 border-[#E50914]/30 text-[#E50914]"
                    : "bg-[#111] border-[#1a1a1a] text-[#888] hover:border-[#333]"
                }`}
              >
                {categoryLabels[cat] || cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Projects grid */}
        <AnimatePresence mode="wait">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((project, i) => (
                <ProjectCard key={project.slug} project={project} index={i} />
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="text-4xl mb-4">🔍</div>
              <p className="text-[#888] text-lg">Gak ada project yang cocok</p>
              <p className="text-[#555] text-sm mt-1">Coba kata kunci lain atau hapus filter</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Info box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 p-6 sm:p-8 bg-[#111] rounded-2xl border border-[#1a1a1a]"
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#E50914]/10 text-[#E50914] flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-2" style={{ fontFamily: "'Syne', sans-serif" }}>
                Cara Pakai Project Showcase
              </h3>
              <div className="text-sm text-[#888] space-y-2">
                <p>
                  Setiap project di sini dilengkapi <span className="text-white">step-by-step guide</span> dan{" "}
                  <span className="text-[#E50914]">prompt-prompt AI</span> yang bisa kamu copy-paste langsung.
                </p>
                <p>Klik project → baca recap → copy prompt → paste ke AI tool kamu → sesuaikan → profit! 🚀</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
