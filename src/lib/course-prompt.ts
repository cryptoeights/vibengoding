import { Lesson } from "./courses-data";

export const promptEngineeringLessons: Lesson[] = [
  {
    id: "1",
    title: "The Prompting Mindset",
    duration: "15 menit",
    content: `# The Prompting Mindset

## AI Bukan Search Engine

Kesalahan paling umum: memperlakukan AI seperti Google. AI adalah **collaborative partner** — bukan mesin pencari.

❌ Google mindset: "react useEffect"
✅ AI mindset: "Jelaskan cara pakai useEffect di React untuk 
   fetch data dari API saat component mount. Berikan contoh 
   dengan TypeScript dan error handling."

## 3 Prinsip Prompting

### 1. Be Specific, Not Vague

❌ "Buatkan website"
✅ "Buatkan landing page SaaS untuk project management tool.
   Tech: Next.js 14, Tailwind CSS, TypeScript.
   Sections: hero, features (3), pricing (3 tiers), CTA.
   Style: dark theme, accent color #E50914."

### 2. Iterate, Don't One-Shot

Jarang prompt pertama langsung perfect. Workflow yang benar:

Prompt 1 → Generate basic version
Review  → "Bagus, tapi heading terlalu kecil"
Prompt 2 → Refine specific issues
Review  → "Tambahin hover effects"
Prompt 3 → Polish & finalize

### 3. Provide Context

AI tidak tau project kamu kecuali kamu kasih tau:

"Saya sedang membangun [APP] menggunakan [TECH STACK].
File yang sedang saya kerjakan adalah [FILE].
Problem yang saya hadapi: [PROBLEM].
Yang sudah saya coba: [ATTEMPTS].
Tolong bantu [SPECIFIC REQUEST]."

## When to Be Vague vs Specific

| Situation | Approach |
|-----------|----------|
| Brainstorming ideas | Vague — "Kasih 10 ide fitur untuk..." |
| Code generation | Specific — include tech stack, constraints |
| Debugging | Very specific — include error, code, context |
| Architecture | Medium — describe goals, let AI suggest |

## Latihan

Tulis 3 prompt berbeda untuk tugas yang sama: "buat form login". Bandingkan hasilnya — mana yang paling bagus dan kenapa? 🤔`,
  },
  {
    id: "2",
    title: "Anatomy of a Perfect Prompt",
    duration: "20 menit",
    content: `# Anatomy of a Perfect Prompt

## The CCTF Formula

Setiap prompt yang bagus punya 4 elemen:

C — Context    : Siapa kamu, apa projectnya
C — Command    : Apa yang harus dilakukan
T — Tone/Tech  : Batasan teknis & gaya
F — Format     : Bentuk output yang diinginkan

## Template Universal

[code-md]
## Context
Saya seorang [ROLE] yang sedang mengerjakan [PROJECT].
Tech stack: [TECHNOLOGIES].
[ADDITIONAL CONTEXT about current state]

## Task
[CLEAR DESCRIPTION of what you need]

## Constraints
- [CONSTRAINT 1: e.g., use TypeScript]
- [CONSTRAINT 2: e.g., mobile responsive]
- [CONSTRAINT 3: e.g., no external dependencies]
- [CONSTRAINT 4: e.g., follow existing pattern]

## Expected Output
[DESCRIBE the format: code file, explanation, list, etc.]
[GIVE EXAMPLE if possible]

## Real Examples

### Generating a Component

Context: Saya membuat e-commerce dengan Next.js 14, Tailwind CSS, 
dan TypeScript. Design system menggunakan dark theme dengan accent 
color #E50914.

Task: Buatkan komponen ProductCard yang menampilkan gambar produk,
nama, harga, rating (bintang), dan tombol "Add to Cart".

Constraints:
- TypeScript dengan interface Props yang proper
- Responsive: 1 kolom di mobile, side-by-side di md
- Hover effect: scale up sedikit + shadow
- Image menggunakan next/image dengan placeholder blur
- Harga format Rupiah (Rp 150.000)

Output: Satu file React component lengkap.

### Debugging

Context: Next.js 14 App Router, TypeScript, Prisma + PostgreSQL.

Problem: Error saat submit form di production:
"Error: PrismaClientKnownRequestError: Unique constraint 
violation on field: email"

Relevant code:
[paste kode server action dan schema]

Task: 
1. Jelaskan kenapa error ini terjadi
2. Berikan solusi yang handle duplicate email gracefully
3. Tambahkan proper error message ke user

Output: Kode yang sudah di-fix dengan penjelasan.

## Anti-Patterns

❌ "Buatkan yang bagus" — subjektif, undefined
❌ "Gunakan best practices" — terlalu generic
❌ "Seperti Instagram" — terlalu broad
❌ Prompt 500 kata tanpa struktur — AI bingung

✅ Specific & structured wins every time

Prompt yang baik = output yang baik. Always. ✍️`,
  },
  {
    id: "3",
    title: "Context & Constraints",
    duration: "18 menit",
    content: `# Context & Constraints

## Context = Foundation

Tanpa context, AI harus menebak. Tebakan = hasil yang random.

### Types of Context

1. PROJECT CONTEXT
   "Saya membangun platform e-learning dengan Next.js 14"

2. FILE CONTEXT  
   "Ini adalah file src/components/CourseCard.tsx"
   [paste existing code]

3. CONVENTION CONTEXT
   "Project ini menggunakan pattern:
    - Server Actions untuk mutasi
    - Tailwind untuk styling
    - Zod untuk validasi"

4. USER CONTEXT
   "Target user: developer pemula Indonesia"

## Constraints = Guard Rails

Constraints mencegah AI keluar jalur:

TECHNICAL CONSTRAINTS:
- "Gunakan TypeScript strict mode"
- "Tanpa library tambahan, hanya React hooks"
- "Compatible dengan React 19"
- "File size maksimal 200 lines"

STYLE CONSTRAINTS:
- "Ikuti Airbnb style guide"
- "Nama variabel dalam bahasa Inggris"
- "Gunakan arrow functions"

DESIGN CONSTRAINTS:
- "Mobile-first responsive"
- "Dark theme with #050505 background"
- "Aksesibel (WCAG AA)"

## Negative Prompting

Kadang bilang apa yang TIDAK kamu mau sama pentingnya:

"JANGAN:
- Jangan pakai class components
- Jangan pakai any type di TypeScript
- Jangan tambah library baru
- Jangan ubah file lain selain yang diminta
- Jangan pakai inline styles, pakai Tailwind"

## Providing File Context

"File yang terkait:

// src/lib/db.ts
[paste isi file]

// src/types/index.ts
[paste isi file]

Berdasarkan file di atas, buatkan [TASK]."

## Latihan

Tulis prompt dengan context lengkap untuk: "Buatkan fitur search di task manager app". Include semua 4 tipe context. 📝`,
  },
  {
    id: "4",
    title: "Chain-of-Thought Prompting",
    duration: "22 menit",
    content: `# Chain-of-Thought Prompting

## Apa Itu Chain-of-Thought?

Chain-of-Thought (CoT) = minta AI **berpikir step-by-step** sebelum menjawab. Ini menghasilkan jawaban yang lebih akurat dan terstruktur.

## Basic CoT

"Sebelum menulis kode, jelaskan dulu:
1. Approach yang akan kamu gunakan
2. Komponen/file apa saja yang dibutuhkan
3. Data flow dari user action sampai database
4. Edge cases yang perlu dihandle

Baru setelah itu, tulis kodenya."

## CoT untuk Architecture

"Saya ingin menambahkan fitur real-time notifications di Next.js app.

Think through this step by step:
1. Apa saja technical options yang tersedia?
2. Pros dan cons masing-masing option?
3. Mana yang paling cocok untuk app skala kecil-menengah?
4. Apa saja yang perlu di-setup?
5. Berikan implementation plan."

## CoT untuk Debugging

"Error: 'TypeError: Cannot read properties of null (reading map)'

Analyze step by step:
1. Apa arti error ini secara literal?
2. Variabel mana yang kemungkinan null?
3. Kapan/kenapa bisa null? (race condition, API response, dll)
4. Apa solusi terbaik? (defensive coding, loading state, dll)
5. Berikan fixed code."

## Planning Prompt

"Saya ingin membuat fitur [X]. Sebelum coding:

Phase 1 — PLAN:
- Jelaskan arsitekturnya
- List semua file yang perlu dibuat/dimodifikasi
- Definisikan data model/types
- Tentukan API contract

Phase 2 — IMPLEMENT:
- Tulis kode untuk setiap file
- Mulai dari data layer → API → UI

Phase 3 — VERIFY:
- List potential bugs
- Suggest test cases
- Identify edge cases"

## Kapan Pakai CoT?

| Situation | CoT? |
|-----------|------|
| Simple one-liner | ❌ Overkill |
| Generate component | ✅ Plan structure first |
| Debug complex error | ✅ Analyze step by step |
| Architecture decision | ✅ Compare options |
| Code review | ✅ Check systematically |

CoT = fewer bugs, better architecture, more reliable output 🧠`,
  },
  {
    id: "5",
    title: "Few-Shot Learning",
    duration: "20 menit",
    content: `# Few-Shot Learning

## Konsep

Few-shot learning = memberi AI **contoh** output yang kamu mau sebelum minta dia generate.

Zero-shot: "Buatkan nama variabel"  (tanpa contoh)
One-shot:  "Contoh: userProfile" → "Buatkan 5 lagi"
Few-shot:  "Contoh: userProfile, taskList, authSession" → "Buatkan dengan pola yang sama"

## Few-Shot untuk Code Style

"Contoh komponen yang saya inginkan:

interface CardProps {
  title: string;
  description: string;
}

export function Card({ title, description }: CardProps) {
  return (
    <div className="p-6 bg-[#111] rounded-xl border border-[#1a1a1a]">
      <h3 className="text-lg font-bold text-white">{title}</h3>
      <p className="text-sm text-gray-500 mt-2">{description}</p>
    </div>
  );
}

Ikuti pattern yang SAMA PERSIS (naming, styling, structure) 
dan buatkan komponen: Badge, Alert, Tooltip"

## Few-Shot untuk Data

"Saya butuh mock data untuk testing. Format contoh:

{
  id: "clx1abc",
  title: "Setup database Prisma",
  completed: false,
  priority: "HIGH",
  category: "backend",
  createdAt: "2025-01-15"
}

Generate 10 item lagi dengan variasi realistis. 
Mix antara completed true/false, berbagai priority, dan kategori berbeda."

## Few-Shot untuk API Responses

"Contoh format API response yang saya gunakan:

Success: { success: true, data: [...], meta: { total: 50, page: 1 } }
Error: { success: false, error: { code: "VALIDATION", message: "...", fields: {...} } }

Buatkan handler yang return format ini untuk endpoint GET /api/tasks"

## Kapan Few-Shot Paling Berguna?

- Menjaga **consistency** di seluruh project
- Generate **repetitive patterns** (CRUD, forms, tests)
- Membuat AI ikuti **custom conventions** kamu
- Generate **mock data** yang realistis

Few-shot = AI yang konsisten dan predictable 🎯`,
  },
  {
    id: "6",
    title: "Prompting untuk Code Generation",
    duration: "25 menit",
    content: `# Prompting untuk Code Generation

## The Code Generation Workflow

1. DESCRIBE what you want (plain English/Indonesian)
2. SPECIFY technical requirements
3. GENERATE first version
4. REVIEW and iterate
5. REFINE specific parts

## Template: Full Page

"Buatkan halaman [NAME] untuk [APP] dengan spesifikasi:

Layout:
- [Section 1: description]
- [Section 2: description]
- [Section 3: description]

Tech: Next.js 14 App Router, TypeScript, Tailwind CSS
Data: [describe data sources]
Interactivity: [list interactive elements]
Responsive: mobile → tablet → desktop

Berikan kode lengkap dalam satu file (app/[path]/page.tsx)."

## Template: Component

"Buatkan React component [NAME]:

Props:
- [prop]: [type] — [description]
- [prop]: [type] — [description]

Behavior:
- [behavior 1]
- [behavior 2]

Variants: [list variants if any]
States: default, hover, active, disabled, loading

Style: Tailwind CSS, dark theme
File: single TSX file with types"

## Template: API Endpoint

"Buatkan API route handler (Next.js App Router):

Endpoint: [METHOD] /api/[path]
Input: [describe request body/params]
Output: [describe response shape]
Validation: Zod schema
Auth: check session
Error handling: proper HTTP status codes

Tech: Prisma for DB, NextAuth for auth"

## Template: Database Operations

"Berdasarkan Prisma schema ini:
[paste schema]

Buatkan:
1. Server actions untuk CRUD [model]
2. Zod validation schema
3. Proper error handling
4. revalidatePath setelah mutasi"

## Pro Tips

1. **Start simple** — minta versi basic dulu, lalu tambahkan kompleksitas
2. **One thing at a time** — jangan minta terlalu banyak dalam satu prompt
3. **Reference existing code** — paste file yang sudah ada sebagai context
4. **Specify imports** — "gunakan lucide-react untuk icons, tidak react-icons"

Master code generation = 10x development speed ⚡`,
  },
  {
    id: "7",
    title: "Prompting untuk Debugging",
    duration: "22 menit",
    content: `# Prompting untuk Debugging

## The Debug Prompt Framework

1. ERROR — Apa error messagenya (exact text)
2. CODE  — Kode yang relevant (paste langsung)
3. CONTEXT — Kapan error terjadi (trigger)
4. TRIED — Apa yang sudah dicoba
5. EXPECT — Apa behavior yang diinginkan

## Template Debug

"## Error
[PASTE EXACT ERROR MESSAGE]

## Relevant Code
[PASTE THE CODE]

## Context
- Error terjadi saat [TRIGGER: e.g., submit form]
- Environment: [dev/prod/both]
- Browser: [if frontend issue]
- Baru terjadi setelah [recent change]

## Already Tried
- [Attempt 1]
- [Attempt 2]

## Expected Behavior
[What should happen instead]

Please:
1. Explain WHY this error occurs
2. Provide the FIX
3. Explain how to PREVENT it in the future"

## Common Debug Prompts

### Type Error
"TypeScript error di line 42:
'Type string is not assignable to type Priority'

Kode: [paste relevant section]
Schema Prisma: [paste enum definition]

Fix tanpa menggunakan type assertion (as)."

### Build Error
"Build gagal dengan error:
[paste build error output]

package.json: [paste dependencies]

Ini blocking deployment. Fix dengan perubahan minimal."

### Performance Issue
"Halaman ini slow (3+ detik load time):
[paste component code]

Likely causes:
- [your hypothesis 1]
- [your hypothesis 2]

Optimize tanpa mengubah functionality."

## Rubber Duck + AI

Menulis debug prompt yang baik sering kali membantu kamu **menemukan bug sendiri** — karena kamu harus berpikir jernih tentang problemnya.

Ini disebut **rubber duck debugging**, dan AI adalah rubber duck paling pintar yang pernah ada! 🦆`,
  },
  {
    id: "8",
    title: "Prompting untuk Architecture",
    duration: "20 menit",
    content: `# Prompting untuk Architecture

## Architecture Discussion Prompt

"Saya sedang merencanakan [APP/FEATURE].

## Requirements
- [Functional requirement 1]
- [Functional requirement 2]
- [Non-functional: scale, performance, etc.]

## Current Tech Stack
[List existing technologies]

## Constraints
- Budget: [free tier only / paid OK]
- Team: [solo / team size]
- Timeline: [deadline]
- Scale: [expected users/data]

## Questions
1. Apa arsitektur yang recommended?
2. Tools/services apa yang dibutuhkan?
3. Apa trade-offs dari approach ini?
4. Berikan diagram sederhana (text-based)"

## Technology Selection Prompt

"Saya perlu memilih [CATEGORY: e.g., database, auth, hosting].

Requirement saya:
- [req 1]
- [req 2]
- [req 3]

Compare opsi berikut:
1. [Option A]
2. [Option B]  
3. [Option C]

Untuk setiap opsi, jelaskan:
- Pros & Cons
- Pricing (free tier)
- Learning curve
- Community/docs quality
- Best for (use case)

Berikan rekomendasi final dengan alasan."

## Scaling Discussion

"Current architecture:
[describe current setup]

Expected growth:
- Users: 100 → 10,000 dalam 6 bulan
- Data: [expected volume]
- Traffic: [expected pattern]

Questions:
1. Bottleneck apa yang akan muncul duluan?
2. Perubahan apa yang perlu dilakukan?
3. Prioritaskan berdasarkan impact."

AI sangat bagus sebagai **architecture discussion partner** — dia punya knowledge tentang semua technology stack! 🏗️`,
  },
  {
    id: "9",
    title: "System Prompts & Personas",
    duration: "18 menit",
    content: `# System Prompts & Personas

## Apa Itu System Prompt?

System prompt = instruksi yang membentuk "kepribadian" dan capability AI. Di Cursor, ini disimpan di \`.cursorrules\`.

## Template .cursorrules

[code-md]
# Project: [App Name]

## Tech Stack
- Next.js 14 (App Router)
- TypeScript (strict)
- Tailwind CSS
- Prisma + PostgreSQL
- NextAuth.js

## Coding Conventions
- Use arrow functions for components
- Prefer Server Components, use "use client" only when needed
- Use Zod for ALL user input validation
- Naming: camelCase for variables, PascalCase for components
- File structure: feature-based (not type-based)

## Design System
- Theme: dark mode (#050505 bg, #E50914 accent)
- Font: Space Grotesk (sans), JetBrains Mono (mono)
- Radius: rounded-xl for cards, rounded-full for buttons
- Shadows: subtle, dark mode appropriate

## Patterns
- Server Actions for form mutations
- Prisma for all database operations
- revalidatePath after mutations
- Error handling: try-catch with typed returns

## DON'Ts
- Don't use any type
- Don't use class components
- Don't use inline styles (use Tailwind)
- Don't add new dependencies without asking

## Role Prompting

"Kamu adalah senior full-stack engineer dengan keahlian di:
- Next.js, React, TypeScript
- System design & architecture
- Performance optimization
- Security best practices

Saat mereview kode saya:
- Prioritaskan security vulnerabilities
- Identifikasi performance bottlenecks
- Suggest proper error handling
- Berikan reasoning untuk setiap suggestion"

## Expert Personas

🎨 UI/UX Expert:
"Review komponen ini dari segi UX. Focus: accessibility,
visual hierarchy, interaction patterns, mobile usability."

🔒 Security Expert:
"Audit kode ini dari segi security. Check: XSS, CSRF,
injection, auth bypass, data exposure."

⚡ Performance Expert:
"Analyze kode ini dari segi performance. Check: unnecessary
renders, bundle size, DB queries, caching opportunities."

System prompts = consistent, high-quality AI output across your whole project! ⚙️`,
  },
  {
    id: "10",
    title: "🏆 Final Project: Build Your Prompt Library",
    duration: "20 menit",
    content: `# 🏆 Final Project: Build Your Prompt Library

## Project: Personal Prompt Collection

Saatnya membuat **prompt library** yang bisa kamu pakai sehari-hari dan share ke orang lain!

## Requirements

Buat collection minimal **15 prompts** di kategori berikut:

### Kategori Wajib

**1. Code Generation (4 prompts)**
- [ ] Generate React component
- [ ] Generate API endpoint
- [ ] Generate database schema
- [ ] Generate full page

**2. Debugging (3 prompts)**
- [ ] Fix runtime error
- [ ] Fix TypeScript error
- [ ] Fix performance issue

**3. Architecture (3 prompts)**
- [ ] Technology selection
- [ ] Feature planning
- [ ] Code review

**4. Productivity (3 prompts)**
- [ ] Git commit messages
- [ ] Documentation generation
- [ ] Test case generation

**5. Custom (2+ prompts)**
- [ ] Prompts spesifik untuk project kamu
- [ ] Prompts untuk niche/domain kamu

## Format untuk Setiap Prompt

[code-md]
### [Nama Prompt]

**Category:** [Code Gen / Debug / Architecture / etc]
**When to use:** [Situasi kapan prompt ini berguna]

**Template:**
[Tulis template prompt di sini]
[Pakai [PLACEHOLDER] untuk bagian yang berubah]

**Example:**
[Contoh prompt yang sudah diisi]

**Tips:** [Tips penggunaan]

## Simpan di Mana?

Option 1: **GitHub Gist** — bisa public/private, easy to share
Option 2: **Notion page** — searchable, organized
Option 3: **.cursorrules** — auto-applied di project
Option 4: **Markdown file** di project — version controlled

## Customisasi

Bikin prompt library ini **unique** buat kamu:
- Tambahkan prompts untuk domain spesifik kamu
- Include contoh-contoh dari project nyata
- Buat variations untuk different AI models (Claude vs GPT)
- Share dan iterate dengan komunitas

## 🎉 Course Complete!

Kamu sekarang punya:
- ✅ Prompting mindset yang benar
- ✅ Formula prompt yang reliable (CCTF)
- ✅ Chain-of-thought techniques
- ✅ Few-shot learning skills
- ✅ Templates untuk code gen, debugging, architecture
- ✅ System prompts untuk project consistency
- ✅ Personal prompt library

**Prompt engineering adalah skill #1 dalam vibe coding.** Master ini dan semua tool AI jadi 10x lebih powerful. 🧠⚡`,
  },
];
