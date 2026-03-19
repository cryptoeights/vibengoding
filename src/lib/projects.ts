// ─── Project Showcase Types & Loader ───

export interface ProjectPrompt {
  /** Judul prompt, misal "Setup Awal Project" */
  title: string
  /** Deskripsi singkat kapan/kenapa pakai prompt ini */
  description: string
  /** Tool/AI yang dipakai: Claude, ChatGPT, Cursor, dll */
  tool: string
  /** Prompt teksnya */
  prompt: string
  /** Hasil/output dari prompt (opsional) */
  result?: string
  /** Tag kategori: setup, component, logic, styling, debug, deploy, dll */
  category: string
}

export interface ProjectStep {
  /** Nomor urut langkah */
  step: number
  /** Judul langkah */
  title: string
  /** Deskripsi detail apa yang dilakukan */
  description: string
  /** Prompt-prompt yang dipakai di langkah ini */
  prompts: ProjectPrompt[]
}

export interface ProjectShowcase {
  /** URL slug (auto dari nama file) */
  slug: string
  /** Judul project */
  title: string
  /** Subtitle singkat */
  subtitle: string
  /** Deskripsi panjang project */
  description: string
  /** Tanggal dibuat (ISO string) */
  date: string
  /** Status project: completed | in-progress | planned */
  status: "completed" | "in-progress" | "planned"
  /** Tech stack yang dipakai */
  techStack: string[]
  /** Tools AI yang dipakai */
  aiTools: string[]
  /** Kategori: web | mobile | cli | library | video | design */
  category: string
  /** URL demo (kalau ada) */
  demoUrl?: string
  /** URL GitHub (kalau ada) */
  githubUrl?: string
  /** Path folder project di local (untuk referensi) */
  localPath?: string
  /** Emoji icon */
  icon: string
  /** Warna tema (hex) */
  color: string
  /** Fitur-fitur utama */
  features: string[]
  /** Satu mega prompt yang eksekusi seluruh plan sekaligus (opsional) */
  masterPrompt?: string
  /** Langkah-langkah build beserta prompt */
  steps: ProjectStep[]
  /** Lessons learned / tips */
  lessons: string[]
  /** Screenshot URLs (relatif ke /public) */
  screenshots?: string[]
  /** Tags untuk filter */
  tags: string[]
}

// ─── Load Projects dari content folder ───

import promptkitProject from "@/content/projects/promptkit.json"
import vibengodingProject from "@/content/projects/vibengoding.json"

const allProjects: ProjectShowcase[] = [
  promptkitProject as ProjectShowcase,
  vibengodingProject as ProjectShowcase,
]

export function getAllProjects(): ProjectShowcase[] {
  return allProjects.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getProjectBySlug(slug: string): ProjectShowcase | undefined {
  return allProjects.find((p) => p.slug === slug)
}

export function getProjectsByCategory(category: string): ProjectShowcase[] {
  return allProjects.filter((p) => p.category === category)
}

export function getAllCategories(): string[] {
  return [...new Set(allProjects.map((p) => p.category))]
}

export function getAllTags(): string[] {
  return [...new Set(allProjects.flatMap((p) => p.tags))]
}
