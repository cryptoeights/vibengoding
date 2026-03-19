#!/usr/bin/env node

/**
 * 🔧 Project Recap Generator
 * 
 * Scan project folder → generate JSON recap untuk VIBENGODING.ID showcase.
 * 
 * Usage:
 *   node scripts/recap-project.mjs /path/to/your/project
 *   node scripts/recap-project.mjs ~/Desktop/Projects/my-app
 * 
 * Output: src/content/projects/{slug}.json
 */

import fs from "fs"
import path from "path"
import readline from "readline"

const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
const ask = (q) => new Promise((resolve) => rl.question(q, resolve))

// ─── Detect Tech Stack ───
function detectTechStack(projectPath) {
  const stack = []
  const files = {}

  try {
    const items = fs.readdirSync(projectPath)
    items.forEach((item) => {
      files[item] = true
    })
  } catch {
    return stack
  }

  if (files["package.json"]) {
    try {
      const pkg = JSON.parse(fs.readFileSync(path.join(projectPath, "package.json"), "utf-8"))
      const allDeps = { ...pkg.dependencies, ...pkg.devDependencies }

      if (allDeps["next"]) stack.push(`Next.js ${allDeps["next"].replace("^", "")}`)
      if (allDeps["react"]) stack.push("React")
      if (allDeps["vue"]) stack.push("Vue.js")
      if (allDeps["svelte"]) stack.push("Svelte")
      if (allDeps["astro"]) stack.push("Astro")
      if (allDeps["express"]) stack.push("Express")
      if (allDeps["hono"]) stack.push("Hono")
      if (allDeps["tailwindcss"]) stack.push("Tailwind CSS")
      if (allDeps["framer-motion"] || allDeps["motion"]) stack.push("Framer Motion")
      if (allDeps["zustand"]) stack.push("Zustand")
      if (allDeps["prisma"] || allDeps["@prisma/client"]) stack.push("Prisma")
      if (allDeps["drizzle-orm"]) stack.push("Drizzle ORM")
      if (allDeps["next-auth"]) stack.push("NextAuth")
      if (allDeps["openai"]) stack.push("OpenAI SDK")
      if (allDeps["@supabase/supabase-js"]) stack.push("Supabase")
    } catch {}
  }

  if (files["tsconfig.json"]) stack.push("TypeScript")
  if (files["vite.config.ts"] || files["vite.config.js"]) stack.push("Vite")
  if (files["Dockerfile"]) stack.push("Docker")
  if (files["requirements.txt"] || files["pyproject.toml"]) stack.push("Python")
  if (files["go.mod"]) stack.push("Go")
  if (files["Cargo.toml"]) stack.push("Rust")

  return [...new Set(stack)]
}

function countFiles(dir, ext) {
  let count = 0
  try {
    const items = fs.readdirSync(dir, { withFileTypes: true })
    for (const item of items) {
      if (["node_modules", ".git", ".next", "dist"].includes(item.name)) continue
      const full = path.join(dir, item.name)
      if (item.isDirectory()) count += countFiles(full, ext)
      else if (item.name.endsWith(ext)) count++
    }
  } catch {}
  return count
}

async function main() {
  const projectPath = process.argv[2]

  if (!projectPath) {
    console.log("❌ Usage: node scripts/recap-project.mjs /path/to/project")
    process.exit(1)
  }

  const absPath = path.resolve(projectPath)
  if (!fs.existsSync(absPath)) {
    console.log(`❌ Folder tidak ditemukan: ${absPath}`)
    process.exit(1)
  }

  console.log(`\n🔍 Scanning project: ${absPath}\n`)

  const detectedStack = detectTechStack(absPath)
  const tsxCount = countFiles(absPath, ".tsx")
  const tsCount = countFiles(absPath, ".ts")

  console.log(`📦 Tech stack terdeteksi: ${detectedStack.join(", ") || "(tidak terdeteksi)"}`)
  console.log(`📄 Files: ${tsxCount} .tsx, ${tsCount} .ts\n`)

  const slug = await ask("🏷️  Slug (url-friendly): ")
  const title = await ask("📌 Judul project: ")
  const subtitle = await ask("📝 Subtitle singkat: ")
  const description = await ask("📖 Deskripsi:\n   ")
  const icon = (await ask("😀 Emoji icon (default 🚀): ")) || "🚀"
  const color = (await ask("🎨 Warna hex (default #E50914): ")) || "#E50914"
  const category = (await ask("📂 Kategori (web/mobile/cli/library, default web): ")) || "web"
  const status = (await ask("📊 Status (completed/in-progress/planned, default completed): ")) || "completed"
  const demoUrl = await ask("🌐 URL demo (opsional): ")
  const githubUrl = await ask("🐙 URL GitHub (opsional): ")
  const aiToolsInput = (await ask("🤖 AI tools (comma separated, default: Claude Code): ")) || "Claude Code"
  const tagsInput = await ask("🏷️  Tags (comma separated): ")

  const stackInput = await ask(`📦 Tech stack (Enter = pakai detected: ${detectedStack.join(", ")}): `)
  const techStack = stackInput ? stackInput.split(",").map(s => s.trim()) : detectedStack

  const project = {
    slug,
    title,
    subtitle,
    description,
    date: new Date().toISOString().split("T")[0],
    status,
    techStack,
    aiTools: aiToolsInput.split(",").map(s => s.trim()),
    category,
    ...(demoUrl && { demoUrl }),
    ...(githubUrl && { githubUrl }),
    localPath: absPath,
    icon,
    color,
    features: ["TODO: Tambahkan fitur utama"],
    steps: [{
      step: 1,
      title: "Setup & Inisialisasi",
      description: "TODO: Deskripsikan langkah pertama",
      prompts: [{
        title: "TODO: Judul prompt",
        description: "TODO: Kapan/kenapa pakai prompt ini",
        tool: "Claude Code",
        prompt: "// TODO: Paste prompt kamu di sini",
        category: "setup"
      }]
    }],
    lessons: ["TODO: Tambahkan pelajaran dari project ini"],
    tags: tagsInput.split(",").map(s => s.trim().toLowerCase()).filter(Boolean)
  }

  const outputDir = path.join(process.cwd(), "src/content/projects")
  fs.mkdirSync(outputDir, { recursive: true })

  const outputPath = path.join(outputDir, `${slug}.json`)
  fs.writeFileSync(outputPath, JSON.stringify(project, null, 2))

  console.log(`\n✅ Recap dibuat: ${outputPath}`)
  console.log(`\n📝 Selanjutnya:`)
  console.log(`   1. Edit JSON → tambahkan steps & prompts`)
  console.log(`   2. Import di src/lib/projects.ts`)
  console.log(`   3. Buka /projects/${slug}\n`)

  rl.close()
}

main().catch(console.error)
