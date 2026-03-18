import { Lesson } from "./courses-data";

export const cursorCopilotLessons: Lesson[] = [
  { id: "1", title: "Cursor Setup & Configuration", duration: "15 menit", content: `# Cursor Setup & Configuration

## Download & Install

1. Buka [cursor.com](https://cursor.com)
2. Download untuk OS kamu
3. Install dan buka

Cursor adalah fork dari VS Code — semua extensions VS Code compatible!

## Recommended Settings

Buka Settings (Cmd+,) dan set:

\`\`\`json
{
  "editor.fontSize": 14,
  "editor.lineHeight": 1.8,
  "editor.fontFamily": "JetBrains Mono, Fira Code, monospace",
  "editor.fontLigatures": true,
  "editor.minimap.enabled": false,
  "editor.wordWrap": "on",
  "editor.formatOnSave": true,
  "editor.tabSize": 2,
  "workbench.colorTheme": "One Dark Pro",
  "terminal.integrated.fontSize": 13
}
\`\`\`

## Essential Extensions

| Extension | Fungsi |
|-----------|--------|
| Tailwind CSS IntelliSense | Autocomplete classes |
| Prettier | Auto format code |
| ESLint | Lint JavaScript/TypeScript |
| Error Lens | Show errors inline |
| Auto Rename Tag | Rename HTML tags berpasangan |
| GitLens | Git superpowers |

## AI Model Selection

Cursor Settings → Models:
- **Claude 3.5 Sonnet** — best untuk code generation ✅
- **GPT-4** — good alternative
- **Cursor Small** — fast, untuk autocomplete

## Pro Tips Setup

1. **Enable "Always search for codebase context"** — lebih akurat
2. **Set tab completion to "aggressive"** — more suggestions
3. **Configure .cursorrules** — project-specific AI behavior
4. **Sync settings** — login untuk sync across devices

Setup done! Let's learn the shortcuts 🎹` },
  { id: "2", title: "Essential Keyboard Shortcuts", duration: "12 menit", content: `# Essential Keyboard Shortcuts

## The Big 3 (Wajib Hafalkan!)

\`\`\`
Cmd+K          → Inline AI edit (MOST USED!)
Cmd+L          → Open AI chat panel
Cmd+I          → Open Composer (multi-file)
\`\`\`

## Navigation

\`\`\`
Cmd+P          → Quick open file (by name)
Cmd+Shift+P    → Command palette (semua command)
Cmd+B          → Toggle sidebar
Cmd+J          → Toggle terminal
Cmd+\\          → Split editor
Ctrl+Tab       → Switch between open files
Cmd+W          → Close current file
\`\`\`

## Editing

\`\`\`
Cmd+D          → Select next occurrence (multi-cursor!)
Cmd+Shift+L    → Select ALL occurrences
Alt+↑/↓        → Move line up/down
Cmd+Shift+K    → Delete entire line
Cmd+/          → Toggle comment
Alt+Shift+↓    → Duplicate line down
Cmd+Shift+F    → Search across files
\`\`\`

## AI-Specific

\`\`\`
Tab            → Accept AI suggestion
Escape         → Dismiss suggestion
Cmd+K          → Inline edit with AI
Cmd+L          → Chat with AI
Cmd+I          → Composer (multi-file edit)
Cmd+Shift+I    → Toggle AI panel
\`\`\`

## Terminal

\`\`\`
Cmd+J          → Toggle terminal
Cmd+Shift+backtick → New terminal
Cmd+C (saat select) → Copy
Ctrl+C         → Cancel running process
\`\`\`

## Latihan

Spend 10 menit practicing:
1. Cmd+P → buka 5 file berbeda
2. Cmd+D → select dan rename variable
3. Alt+↑↓ → reorder lines
4. Cmd+K → edit satu function dengan AI

Muscle memory = speed! ⚡` },
  { id: "3", title: "Cmd+K: Inline Generation Magic", duration: "18 menit", content: `# Cmd+K: Inline Generation Magic

## Apa Itu Cmd+K?

Cmd+K adalah fitur paling powerful di Cursor. Select kode → Cmd+K → describe perubahan → AI edit inline.

## Use Cases

### 1. Generate Kode Baru

Taruh cursor di baris kosong → Cmd+K:
\`\`\`
"Buatkan function untuk format harga ke Rupiah"
\`\`\`

Result:
\`\`\`typescript
function formatRupiah(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(amount);
}
\`\`\`

### 2. Refactor Existing Code

Select code → Cmd+K:
\`\`\`
"Refactor jadi pakai early return pattern"
"Tambahkan TypeScript types"
"Convert ke arrow function"
"Tambahkan error handling"
\`\`\`

### 3. Add Comments

Select function → Cmd+K:
\`\`\`
"Tambahkan JSDoc comments"
\`\`\`

### 4. Fix Bugs

Select buggy code → Cmd+K:
\`\`\`
"Fix: ini crash kalau array kosong"
"Handle null case"
"Fix off-by-one error"
\`\`\`

### 5. Convert & Transform

\`\`\`
"Convert CSS ke Tailwind classes"
"Convert to async/await dari .then()"
"Convert class component ke function component"
"Convert JavaScript ke TypeScript"
\`\`\`

## Tips

1. **Select specific code** — lebih focused = lebih akurat
2. **Be concise** — "add error handling" > "could you please add proper error handling with try catch"
3. **Review before accepting** — selalu baca perubahan
4. **Undo available** — Cmd+Z kalau hasil gak bagus
5. **Chain edits** — Cmd+K beberapa kali untuk iterasi

Cmd+K = surgical AI edits! 🎯` },
  { id: "4", title: "Chat Panel: Your AI Pair Programmer", duration: "20 menit", content: `# Chat Panel: Your AI Pair Programmer

## Buka Chat

\`\`\`
Cmd+L → Open chat panel
\`\`\`

## @ Mentions

Chat panel punya fitur powerful: **@ mentions** untuk kasih context.

\`\`\`
@file src/app/page.tsx
"Jelaskan apa yang dilakukan file ini"

@folder src/components
"List semua komponen di folder ini dan apa fungsinya"

@codebase
"Cari semua tempat yang menggunakan Prisma db.task.create"

@web
"Cari dokumentasi terbaru Next.js 14 tentang Server Actions"

@docs
"Carikan docs Prisma tentang relation queries"
\`\`\`

## Chat Workflow

### Brainstorming
\`\`\`
"Saya mau bikin fitur [X]. Gimana approach terbaiknya?
Tech stack: Next.js 14, Prisma, Tailwind.
Kasih pros/cons dari beberapa options."
\`\`\`

### Code Explanation
\`\`\`
@file src/lib/auth.ts
"Jelaskan step-by-step apa yang terjadi di file ini.
Fokus ke: gimana authentication flow-nya."
\`\`\`

### Architecture Discussion
\`\`\`
@codebase
"Review struktur project ini. 
Apa yang bisa diperbaiki dari segi:
1. File organization
2. Code reusability
3. Performance"
\`\`\`

### Code Review
\`\`\`
"Review code di bawah ini. Check:
- Security issues
- Performance problems  
- Best practices violations
- Potential bugs

[paste code or @file]"
\`\`\`

## Apply Code from Chat

Saat AI kasih kode di chat:
1. **Copy button** → copy code block
2. **Apply button** → langsung apply ke file
3. **"Apply to file X"** button → AI suggest where to put it

## Multi-Turn Conversation

Chat remembers context! Kamu bisa lanjut:
\`\`\`
Turn 1: "Buatkan komponen Button"
Turn 2: "Tambahkan loading state"
Turn 3: "Sekarang bikin variant outline"
Turn 4: "Tambahkan unit test"
\`\`\`

Chat = diskusi mendalam, Cmd+K = quick edit! 💬` },
  { id: "5", title: "Composer: Multi-File Editing", duration: "22 menit", content: `# Composer: Multi-File Editing

## Buka Composer

\`\`\`
Cmd+I → Open Composer
\`\`\`

## Apa Bedanya dengan Chat?

| Feature | Chat (Cmd+L) | Composer (Cmd+I) |
|---------|-------------|------------------|
| Edit files | Manual copy-paste | Direct file edits ✅ |
| Multi-file | One at a time | Multiple files ✅ |
| Create files | No | Yes ✅ |
| Preview diffs | No | Yes ✅ |

## Use Cases

### 1. Create Feature Across Files

\`\`\`
"Buatkan fitur task categories:

1. Prisma model Category (prisma/schema.prisma)
2. Server actions CRUD (src/actions/category-actions.ts)
3. Category form component (src/components/CategoryForm.tsx)
4. Category list component (src/components/CategoryList.tsx)
5. Category page (src/app/categories/page.tsx)

Tech: Next.js 14, TypeScript, Tailwind, Prisma"
\`\`\`

Composer akan:
- Membuat/edit semua file yang disebutkan
- Show diff preview untuk setiap file
- Kamu bisa Accept/Reject per-file

### 2. Refactor Across Codebase

\`\`\`
@codebase
"Refactor semua hardcoded color values (#BFFF00, #111, etc) 
menjadi CSS variables. Update:
- globals.css: define variables
- All components: use var(--color-name)"
\`\`\`

### 3. Add Feature to Existing Code

\`\`\`
@file src/app/tasks/page.tsx
@file src/components/TaskList.tsx
@file src/actions/task-actions.ts

"Tambahkan fitur drag & drop reorder pada task list.
- Install @hello-pangea/dnd
- Update TaskList dengan DragDropContext
- Add server action untuk update order
- Persist order di database"
\`\`\`

## Composer Workflow

\`\`\`
1. Cmd+I to open Composer
2. Describe what you want (reference @files)
3. Review each file diff
4. Accept ✅ or Reject ❌ per file
5. Test changes
6. Iterate if needed
\`\`\`

## Tips

1. **Reference existing files** — @file untuk context
2. **Be explicit about file paths** — "create src/components/X.tsx"
3. **Review diffs carefully** — Composer can make mistakes
4. **Iterate** — accept partial changes, then another Composer prompt

Composer = AI pair programmer yang bisa edit everything! 🎼` },
  { id: "6", title: "Codebase Context & @-mentions", duration: "18 menit", content: `# Codebase Context & @-mentions

## @ Mentions Deep Dive

### @file — Specific File
\`\`\`
@file src/app/layout.tsx
"Add metadata untuk SEO"
\`\`\`
AI reads the full file content.

### @folder — Directory
\`\`\`
@folder src/components
"Mana yang bisa di-refactor jadi reusable?"
\`\`\`
AI scans all files in folder.

### @codebase — Entire Project
\`\`\`
@codebase
"Find all API calls that don't have error handling"
\`\`\`
AI searches your whole codebase.

### @web — Internet Search
\`\`\`
@web "Next.js 14 server actions form validation best practices"
\`\`\`
AI searches the internet for latest info.

### @docs — Documentation
\`\`\`
@docs Prisma
"How to do nested create with relations?"
\`\`\`
AI searches official documentation.

## .cursorrules File

Buat file \`.cursorrules\` di root project:

\`\`\`markdown
# Project: VIBENGODING.ID

## Stack
- Next.js 14 App Router
- TypeScript strict
- Tailwind CSS v4
- Prisma + PostgreSQL

## Conventions
- Server Components by default
- Server Actions for mutations
- Zod for validation
- Mobile-first responsive design

## Style
- Dark theme: bg-[#050505], cards bg-[#111]
- Accent: #BFFF00 (lime green)
- Font: Space Grotesk (sans), JetBrains Mono (mono)
- Rounded corners: rounded-xl for cards

## Rules
- Always use TypeScript types (no any)
- Always add error handling
- Always validate user input with Zod
- Components: one per file, PascalCase naming
\`\`\`

Cursor reads ini **otomatis** untuk setiap prompt!

## Tips

1. **Update .cursorrules** seiring project berkembang
2. **@file paling effective** — specific context = better results
3. **Combine @mentions** — "@file X @file Y, refactor keduanya..."
4. **@codebase sparingly** — bisa slow untuk project besar

Context = AI yang lebih pintar tentang project kamu! 🧠` },
  { id: "7", title: "GitHub Copilot Deep Dive", duration: "20 menit", content: `# GitHub Copilot Deep Dive

## Setup Copilot

1. GitHub → Settings → Copilot → Enable
2. VS Code → Install "GitHub Copilot" extension
3. Sign in dengan GitHub

## Ghost Text (Tab Completion)

Copilot secara otomatis suggest kode saat kamu mengetik:

\`\`\`typescript
// Ketik:
function calculateTax(

// Copilot suggest (ghost text):
function calculateTax(amount: number, rate: number = 0.1): number {
  return amount * rate;
}
\`\`\`

Tekan **Tab** untuk accept, **Escape** untuk dismiss.

## Copilot Chat (VS Code)

\`\`\`
Ctrl+Shift+I  → Open Copilot Chat
\`\`\`

Similar to Cursor chat tapi integrated dengan GitHub ecosystem.

### Slash Commands

\`\`\`
/explain  → Explain selected code
/fix      → Fix bugs in selected code  
/tests    → Generate tests
/doc      → Generate documentation
\`\`\`

## Copilot in Terminal

\`\`\`bash
# Ctrl+I in terminal to ask
"How to find all .tsx files with more than 200 lines?"
→ find src -name "*.tsx" -exec awk 'END{if(NR>200)print FILENAME": "NR" lines"}' {} \\;
\`\`\`

## Copilot vs Cursor

| Feature | Copilot | Cursor |
|---------|---------|--------|
| Tab completion | ✅ Great | ✅ Great |
| Inline edit | ❌ Limited | ✅ Cmd+K |
| Multi-file edit | ❌ No | ✅ Composer |
| Codebase search | ✅ @workspace | ✅ @codebase |
| Price | $10/month | $20/month |
| Best for | VS Code users | AI-first workflow |

## Tips

1. **Write good comments** → Copilot generates better code
2. **Accept partial** → Cmd+→ to accept word by word
3. **Multiple suggestions** → Alt+] to cycle through options
4. **Context matters** → Keep related files open for better suggestions

Copilot = perfect for tab-completion speed boost! 🚁` },
  { id: "8", title: "Workflow: Building Features End-to-End", duration: "22 menit", content: `# Workflow: Building Features End-to-End

## Real-World AI Coding Workflow

Let's build a complete feature using the tools we've learned.

### Feature: "Quick Add Task with Natural Language"
User types "Meeting with team tomorrow 3pm high priority" → app parses it.

## Step 1: Plan (Chat — Cmd+L)

\`\`\`
"Saya mau bikin fitur quick-add dimana user bisa ketik natural language 
seperti 'Meeting besok jam 3 high priority' dan app otomatis parse jadi:
- title: Meeting
- dueDate: tomorrow 3pm
- priority: HIGH

@codebase

Gimana approach terbaiknya? Saya prefer tanpa external NLP library."
\`\`\`

AI suggests approach → discuss → agree on plan.

## Step 2: Generate Types (Cmd+K)

Buka file baru, Cmd+K:
\`\`\`
"Buatkan TypeScript interface untuk parsed task dari natural language input.
Include: title, dueDate, priority, tags. Semua optional kecuali title."
\`\`\`

## Step 3: Implement Parser (Composer — Cmd+I)

\`\`\`
"Buatkan natural language task parser:

1. src/lib/task-parser.ts — parsing logic
2. src/lib/task-parser.test.ts — unit tests

Rules:
- Detect priority keywords: urgent/high/medium/low
- Detect dates: today, tomorrow, specific dates
- Detect time: jam/at + number
- Everything else = title"
\`\`\`

## Step 4: Integrate (Cmd+K on existing code)

Select TaskForm → Cmd+K:
\`\`\`
"Tambahkan quick-add mode: single text input yang parse 
natural language pakai parseTaskInput() dari @file src/lib/task-parser.ts"
\`\`\`

## Step 5: Test & Debug (Chat)

\`\`\`
@file src/lib/task-parser.ts
"Test cases berikut gagal. Fix parser:
- 'review PR besok' → harusnya dueDate: tomorrow
- 'urgent fix bug login' → harusnya priority: URGENT
Jelaskan kenapa gagal dan fix."
\`\`\`

## Step 6: Polish (Cmd+K)

Select UI → Cmd+K:
\`\`\`
"Tambahkan preview: saat user ketik, tampilkan parsed result 
di bawah input (title, date, priority) real-time"
\`\`\`

## Summary Workflow

\`\`\`
Chat (Cmd+L)    → Plan & discuss
Cmd+K           → Quick inline edits
Composer (Cmd+I) → Multi-file generation
Chat (Cmd+L)    → Debug & review
Cmd+K           → Final polish
\`\`\`

This is the vibe coding workflow! 🎵` },
  { id: "9", title: "🏆 Final Project: Your Optimized Workflow", duration: "25 menit", content: `# 🏆 Final Project: Configure Your Perfect Setup

## Project: Build a Feature with AI Workflow

Gunakan semua yang sudah dipelajari untuk membangun satu fitur lengkap.

## Requirements

### 1. Setup (10 min)
- [ ] Install/configure Cursor dengan settings optimal
- [ ] Buat \`.cursorrules\` untuk project kamu
- [ ] Install essential extensions
- [ ] Set AI model preference

### 2. Build a Feature (30 min)

Pilih SATU fitur dari list ini dan build **end-to-end pakai AI**:

**Option A: Dashboard Analytics**
\`\`\`
- Stats cards (total, completed, pending tasks)
- Chart visualization (bar/line chart)
- Date range filter
- Responsive layout
\`\`\`

**Option B: Kanban Board**
\`\`\`
- Columns: To Do, In Progress, Done
- Drag & drop tasks between columns
- Add task inline per column
- Color-coded by priority
\`\`\`

**Option C: Notification System**
\`\`\`
- Bell icon with unread count
- Dropdown notification list
- Mark as read/unread
- Different notification types (info, warning, success)
\`\`\`

### 3. Document Your Workflow (10 min)

Tulis catatan tentang:
- [ ] Prompt mana yang paling efektif?
- [ ] Kapan pakai Chat vs Cmd+K vs Composer?
- [ ] Apa kesalahan yang kamu buat dan gimana fix-nya?
- [ ] Tips personal yang kamu temukan

## Customisasi

Tingkatkan workflow kamu:
- **Custom snippets** → sering dipakai? jadikan snippet
- **Keyboard shortcuts** → remap sesuai kebiasaan
- **AI rules** → expand .cursorrules
- **Templates** → buat template file untuk komponen baru

## 🎉 Course Complete!

Kamu sekarang master:
- ✅ Cursor setup & configuration
- ✅ Essential keyboard shortcuts
- ✅ Cmd+K inline magic
- ✅ Chat panel for discussion
- ✅ Composer for multi-file edits
- ✅ Codebase context & @mentions
- ✅ GitHub Copilot integration
- ✅ End-to-end AI workflow
- ✅ Personal optimized setup

**AI code editors are your superpower. Use them wisely.** ⚡🚀` },
];
