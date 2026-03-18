export interface Lesson {
  id: string;
  title: string;
  duration: string;
  content: string; // markdown-like content
  videoPlaceholder?: boolean;
}

export interface Course {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  lessons: Lesson[];
  totalDuration: string;
  level: string;
  color: string;
  tags: string[];
  prerequisites: string[];
  whatYoullLearn: string[];
}

import { fullStackVibesCourse } from "./course-fullstack";
import { promptEngineeringLessons } from "./course-prompt";
import { shipItLessons } from "./course-shipit";
import { cursorCopilotLessons } from "./course-cursor";

export const courses: Course[] = [
  // ===== COURSE 1: Vibe Coding 101 =====
  {
    id: 1,
    slug: "vibe-coding-101",
    title: "Vibe Coding 101",
    subtitle: "Dari Nol Sampai Deploy",
    description:
      "Belajar dasar-dasar vibe coding. Dari setup environment, prompt engineering, sampai deploy app pertamamu.",
    longDescription:
      "Course ini dirancang untuk kamu yang baru banget mau mulai vibe coding. Kita bakal bahas dari A-Z: apa itu vibe coding, kenapa ini game-changer, gimana setup tools-nya, dan cara bikin app pertama kamu tanpa harus jadi expert dulu. Semua pakai pendekatan AI-first yang bikin proses ngoding jadi jauh lebih cepat dan fun.",
    level: "Pemula",
    totalDuration: "3 jam",
    color: "#BFFF00",
    tags: ["AI", "Prompt", "Deploy"],
    prerequisites: ["Laptop/PC dengan internet", "Akun GitHub (gratis)", "Semangat belajar 🔥"],
    whatYoullLearn: [
      "Memahami konsep vibe coding dan kenapa ini penting",
      "Setup environment: VS Code, Cursor, Terminal",
      "Dasar prompt engineering untuk coding",
      "Membuat project pertama dengan AI assistance",
      "Version control dengan Git & GitHub",
      "Deploy app ke internet (Vercel)",
    ],
    lessons: [
      {
        id: "1",
        title: "Apa Itu Vibe Coding?",
        duration: "10 menit",
        content: `# Apa Itu Vibe Coding?

## Definisi

**Vibe coding** adalah pendekatan baru dalam software development di mana kamu berkolaborasi dengan AI untuk menulis kode. Istilah ini dipopulerkan oleh Andrej Karpathy (co-founder OpenAI) pada awal 2025.

> "There's a new kind of coding I call 'vibe coding', where you fully give in to the vibes, embrace exponentials, and forget that the code even exists." — Andrej Karpathy

## Kenapa Vibe Coding?

Bayangkan kamu punya asisten coding yang:
- ✅ Ngerti semua bahasa pemrograman
- ✅ Bisa generate kode dalam hitungan detik
- ✅ Selalu available 24/7
- ✅ Gak pernah capek atau bad mood

Itulah AI coding assistant. Dan vibe coding adalah **cara kamu bekerja bareng** asisten ini.

## Perbedaan dengan Traditional Coding

| Aspek | Traditional | Vibe Coding |
|-------|-----------|-------------|
| Menulis kode | Manual, line by line | Describe → Generate → Refine |
| Debugging | Baca error → cari Stack Overflow | Paste error → AI jelasin + fix |
| Learning | Belajar syntax dulu | Belajar konsep, AI handle syntax |
| Speed | Jam/hari untuk fitur | Menit/jam untuk fitur |

## Mindset yang Dibutuhkan

1. **Jangan takut salah** — AI bisa bantu fix
2. **Deskripsikan dengan jelas** — Prompt yang baik = hasil yang baik
3. **Iterasi cepat** — Generate, test, refine, repeat
4. **Pahami konsep, bukan syntax** — Fokus ke "apa" bukan "gimana"

## Tools yang Akan Kita Pakai

- **Cursor** — AI-powered code editor
- **Claude / ChatGPT** — AI assistant untuk brainstorming
- **Vercel** — Platform deploy
- **GitHub** — Version control

Di lesson selanjutnya, kita akan setup semua tools ini. Let's go! 🚀`,
      },
      {
        id: "2",
        title: "Setup Environment",
        duration: "15 menit",
        content: `# Setup Environment untuk Vibe Coding

## 1. Install Visual Studio Code / Cursor

### Option A: Cursor (Recommended untuk Vibe Coding)
Cursor adalah fork dari VS Code yang sudah built-in AI. Download di [cursor.com](https://cursor.com).

\`\`\`bash
# macOS (via Homebrew)
brew install --cask cursor

# Atau download langsung dari cursor.com
\`\`\`

### Option B: VS Code + Extensions
Kalau prefer VS Code biasa:

\`\`\`bash
# macOS
brew install --cask visual-studio-code

# Extensions yang wajib:
# - GitHub Copilot
# - Prettier
# - ESLint
# - Tailwind CSS IntelliSense
\`\`\`

## 2. Install Node.js

Node.js adalah runtime JavaScript yang kita butuhkan.

\`\`\`bash
# Pakai nvm (recommended)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Restart terminal, lalu:
nvm install --lts
nvm use --lts

# Verify
node --version  # v20.x.x atau lebih baru
npm --version   # 10.x.x
\`\`\`

## 3. Install Git

\`\`\`bash
# macOS (biasanya sudah ada)
git --version

# Kalau belum ada:
brew install git

# Setup identity
git config --global user.name "Nama Kamu"
git config --global user.email "email@kamu.com"
\`\`\`

## 4. Buat Akun yang Dibutuhkan

| Platform | Kegunaan | Link |
|----------|----------|------|
| GitHub | Version control & hosting kode | github.com |
| Vercel | Deploy website | vercel.com |
| Claude/ChatGPT | AI assistant | claude.ai / chat.openai.com |

## 5. Test Setup

Buka terminal dan jalankan:

\`\`\`bash
node -e "console.log('Setup berhasil! 🎉')"
\`\`\`

Kalau muncul "Setup berhasil! 🎉" berarti kamu siap! 💪`,
      },
      {
        id: "3",
        title: "Terminal & Command Line Basics",
        duration: "12 menit",
        content: `# Terminal & Command Line Basics

## Kenapa Perlu Terminal?

Terminal adalah cara kamu "ngobrol" langsung sama komputer. Dalam vibe coding, terminal dipakai untuk:
- Menjalankan project
- Install packages
- Deploy aplikasi
- Git operations

## Command Dasar yang Wajib Tau

### Navigasi

\`\`\`bash
# Lihat posisi sekarang
pwd
# Output: /Users/kamu/Desktop

# Pindah folder
cd Documents
cd ..          # naik satu level
cd ~           # ke home directory
cd ~/Desktop   # langsung ke Desktop

# Lihat isi folder
ls             # list biasa
ls -la         # list detail + hidden files
\`\`\`

### File Operations

\`\`\`bash
# Buat folder
mkdir project-pertama
mkdir -p folder/subfolder/lagi  # buat nested

# Buat file
touch index.html
touch style.css script.js  # buat beberapa sekaligus

# Hapus
rm file.txt          # hapus file
rm -rf folder-name   # hapus folder (hati-hati!)

# Copy & Move
cp file.txt backup.txt
mv file.txt folder/
\`\`\`

### Package Manager (npm)

\`\`\`bash
# Buat project baru
npm init -y

# Install package
npm install react next
npm install -D tailwindcss  # dev dependency

# Jalankan script
npm run dev
npm run build
\`\`\`

## Tips Terminal

1. **Tab completion** — Tekan Tab untuk auto-complete nama file/folder
2. **History** — Tekan ↑ untuk command sebelumnya
3. **Clear** — Ketik \`clear\` atau Ctrl+L untuk bersihkan layar
4. **Cancel** — Ctrl+C untuk stop proses yang sedang jalan

## Latihan

Coba buat folder project pertama:

\`\`\`bash
cd ~/Desktop
mkdir vibe-project
cd vibe-project
npm init -y
ls -la
\`\`\`

Kalau berhasil, kamu akan lihat file \`package.json\`. Congrats! 🎉`,
      },
      {
        id: "4",
        title: "Prompt Engineering Dasar",
        duration: "18 menit",
        content: `# Prompt Engineering Dasar

## Apa Itu Prompt Engineering?

Prompt engineering adalah **seni menulis instruksi yang jelas untuk AI**. Dalam vibe coding, ini adalah skill paling penting karena kualitas output AI bergantung pada kualitas prompt kamu.

## Anatomy of a Good Prompt

### Formula: Context + Task + Constraints + Format

\`\`\`
[CONTEXT]
Saya sedang membuat website portfolio menggunakan Next.js dan Tailwind CSS.

[TASK]
Buatkan komponen hero section dengan animasi typing effect.

[CONSTRAINTS]
- Gunakan TypeScript
- Mobile responsive
- Tanpa library tambahan, pure CSS animation
- Warna tema: dark mode dengan aksen hijau (#BFFF00)

[FORMAT]
Berikan kode lengkap dalam satu file komponen React.
\`\`\`

## ❌ Bad Prompts vs ✅ Good Prompts

### Contoh 1: Bikin Website

❌ **Bad:** "Buatkan website"

✅ **Good:** "Buatkan landing page untuk aplikasi task manager menggunakan Next.js 14, Tailwind CSS, dan Framer Motion. Fitur: hero section dengan CTA, section fitur (3 cards), testimonial, dan footer. Dark theme dengan aksen biru."

### Contoh 2: Fix Bug

❌ **Bad:** "Kode saya error"

✅ **Good:** "Saya mendapat error 'TypeError: Cannot read properties of undefined (reading map)' di React component ini: [paste kode]. Data diambil dari API endpoint /api/users. Bagaimana cara fix error ini dan tambahkan proper error handling?"

### Contoh 3: Optimasi

❌ **Bad:** "Bikin kode ini lebih bagus"

✅ **Good:** "Review kode React ini dari segi performance. Fokus pada: unnecessary re-renders, proper memoization, dan efficient state management. Berikan penjelasan untuk setiap perubahan."

## Teknik Prompting Lanjutan

### 1. Chain of Thought
Minta AI berpikir step by step:
\`\`\`
"Jelaskan langkah-langkahnya dulu sebelum menulis kode."
\`\`\`

### 2. Few-Shot Examples
Berikan contoh output yang kamu mau:
\`\`\`
"Contoh format yang saya inginkan:
- Nama: [string]
- Deskripsi: [1 paragraf]
- Kode: [code block]"
\`\`\`

### 3. Role Prompting
Tentukan "persona" AI:
\`\`\`
"Kamu adalah senior React developer dengan 10 tahun pengalaman.
Review kode ini dan berikan feedback seperti saat code review."
\`\`\`

## Latihan

Coba tulis prompt untuk:
1. Membuat form login dengan validasi
2. Menjelaskan konsep React hooks
3. Debugging sebuah error message

Ingat formula: **Context + Task + Constraints + Format** 📝`,
      },
      {
        id: "5",
        title: "Membuat Project Pertama dengan AI",
        duration: "20 menit",
        content: `# Membuat Project Pertama dengan AI

## Project: Personal Link-in-Bio Page

Kita akan buat halaman link-in-bio seperti Linktree, tapi custom dan lebih keren. Pakai Next.js + Tailwind CSS.

## Step 1: Create Project

Buka terminal dan jalankan:

\`\`\`bash
npx create-next-app@latest my-links --typescript --tailwind --app --src-dir
cd my-links
\`\`\`

## Step 2: Prompt ke AI

Buka Cursor atau ChatGPT, lalu kirim prompt ini:

\`\`\`
Saya sedang membuat halaman link-in-bio menggunakan Next.js 14 
dengan App Router dan Tailwind CSS.

Buatkan file src/app/page.tsx dengan spesifikasi:

1. Profile section:
   - Avatar (placeholder circle)
   - Nama: "Your Name"
   - Bio: "Vibe Coder ✨ | Building cool stuff with AI"

2. Links section (minimal 5 links):
   - Setiap link berupa card dengan icon, title, dan URL
   - Hover effect yang smooth
   - Links: Portfolio, GitHub, Twitter, YouTube, Email

3. Design requirements:
   - Dark theme (bg: #0a0a0a)
   - Accent color: #BFFF00 (lime green)
   - Mobile-first, max-width 480px centered
   - Font: system font stack
   - Smooth animations on load (stagger effect)

4. Tambahkan footer: "Made with 💚 and vibes"

Berikan kode lengkap yang bisa langsung dijalankan.
\`\`\`

## Step 3: Paste dan Test

1. Copy output dari AI
2. Replace isi \`src/app/page.tsx\`
3. Jalankan:

\`\`\`bash
npm run dev
\`\`\`

4. Buka \`http://localhost:3000\`

## Step 4: Iterasi

Sekarang kita refine. Kirim prompt follow-up:

\`\`\`
Bagus! Sekarang tambahkan:
1. Gradient background yang subtle (bukan solid color)
2. Hover effect: card sedikit scale up dan ada glow
3. Click animation: card sedikit "press down" saat diklik
4. Analytics badge: "🔥 100+ clicks" di bawah setiap link
\`\`\`

## Tips Workflow Vibe Coding

1. **Start simple** → minta AI buatkan versi basic dulu
2. **Test immediately** → jalankan dan lihat hasilnya
3. **Iterate** → kirim feedback spesifik ke AI
4. **Don't over-engineer** → kalau sudah bagus, ship it!

## Hasil Akhir

Dalam 20 menit, kamu sudah punya:
- ✅ Website personal yang bisa diakses
- ✅ Design yang keren tanpa perlu jadi designer
- ✅ Kode yang clean dan maintainable
- ✅ Pengalaman pertama vibe coding!

Next step: kita akan belajar Git untuk menyimpan progress kamu 💾`,
      },
      {
        id: "6",
        title: "Git & GitHub Basics",
        duration: "15 menit",
        content: `# Git & GitHub Basics

## Kenapa Perlu Git?

Git adalah **version control** — seperti "Save Game" untuk kode kamu. Dengan Git:
- 📸 Simpan snapshot kode di setiap tahap
- ↩️ Bisa balik ke versi sebelumnya kalau ada yang salah
- 👥 Kolaborasi dengan orang lain
- 🚀 Deploy otomatis ke Vercel

## Konsep Dasar Git

\`\`\`
Working Directory → Staging Area → Repository
  (file kamu)     (siap commit)   (tersimpan)
\`\`\`

## Command Git yang Wajib Tau

### Setup Repository

\`\`\`bash
# Inisialisasi Git di project
git init

# Atau clone project yang sudah ada
git clone https://github.com/username/repo.git
\`\`\`

### Workflow Harian

\`\`\`bash
# 1. Cek status
git status

# 2. Tambahkan file ke staging
git add .                    # semua file
git add src/app/page.tsx     # file tertentu

# 3. Commit (simpan snapshot)
git commit -m "feat: tambah hero section"

# 4. Push ke GitHub
git push origin main
\`\`\`

### Branching (Bonus)

\`\`\`bash
# Buat branch baru
git checkout -b fitur-baru

# Kerja di branch ini, lalu commit...
git add .
git commit -m "feat: fitur baru"

# Kembali ke main dan merge
git checkout main
git merge fitur-baru
\`\`\`

## Push ke GitHub

### 1. Buat Repository di GitHub
- Buka github.com → New Repository
- Nama: \`my-links\`
- Public → Create

### 2. Connect & Push

\`\`\`bash
git remote add origin https://github.com/USERNAME/my-links.git
git branch -M main
git push -u origin main
\`\`\`

## Commit Message Convention

Pakai format yang jelas:

\`\`\`
feat: tambah fitur baru
fix: perbaiki bug
style: perubahan tampilan
docs: update dokumentasi
refactor: restructure kode
\`\`\`

## Latihan

Push project link-in-bio kamu ke GitHub! 🚀`,
      },
      {
        id: "7",
        title: "HTML & CSS Crash Course",
        duration: "15 menit",
        content: `# HTML & CSS Crash Course

## Kenapa Perlu Tau HTML & CSS?

Meskipun AI bisa generate kode, kamu tetap perlu **memahami dasarnya** supaya bisa:
- Review output AI dengan benar
- Debug kalau ada yang salah
- Kasih feedback yang lebih spesifik ke AI

## HTML: Struktur

HTML = kerangka website. Bayangkan seperti tulang manusia.

\`\`\`html
<!DOCTYPE html>
<html>
  <head>
    <title>Judul Tab Browser</title>
  </head>
  <body>
    <!-- Konten website di sini -->
    <header>
      <nav>Menu navigasi</nav>
    </header>

    <main>
      <h1>Heading utama</h1>
      <p>Paragraf teks</p>
      <img src="foto.jpg" alt="Deskripsi foto" />
      <a href="https://google.com">Link</a>
      <button>Tombol</button>
    </main>

    <footer>
      <p>© 2025 My Website</p>
    </footer>
  </body>
</html>
\`\`\`

### Tag Penting

| Tag | Fungsi | Contoh |
|-----|--------|--------|
| \`<div>\` | Container/wrapper | Layout section |
| \`<h1>-<h6>\` | Heading | Judul |
| \`<p>\` | Paragraf | Teks body |
| \`<a>\` | Link | Navigasi |
| \`<img>\` | Gambar | Foto, icon |
| \`<button>\` | Tombol | CTA, submit |
| \`<input>\` | Form input | Text, email |
| \`<ul>/<li>\` | List | Menu items |

## CSS: Styling

CSS = penampilan website. Bayangkan seperti pakaian dan makeup.

\`\`\`css
/* Selector dasar */
h1 {
  color: #BFFF00;
  font-size: 48px;
  font-weight: bold;
}

/* Class selector */
.card {
  background: #111;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #222;
}

/* Hover effect */
.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
}

/* Flexbox (layout) */
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
}

/* Grid */
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

/* Responsive */
@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
\`\`\`

## Dengan Tailwind CSS

Tailwind CSS adalah **utility-first CSS framework**. Daripada nulis CSS terpisah, kamu langsung tulis di class HTML:

\`\`\`html
<!-- Tanpa Tailwind -->
<div class="card">...</div>
<style>.card { background: #111; padding: 24px; border-radius: 12px; }</style>

<!-- Dengan Tailwind ✨ -->
<div class="bg-[#111] p-6 rounded-xl">...</div>
\`\`\`

### Tailwind Cheat Sheet

\`\`\`
Spacing:  p-4 (padding), m-4 (margin), gap-4
Flex:     flex, items-center, justify-between
Grid:     grid, grid-cols-3, gap-6
Text:     text-xl, font-bold, text-white
Color:    bg-black, text-[#BFFF00], border-gray-800
Rounded:  rounded-lg, rounded-xl, rounded-full
Shadow:   shadow-lg, shadow-xl
Hover:    hover:bg-gray-800, hover:scale-105
Responsive: sm:, md:, lg: (prefix)
\`\`\`

Kamu gak perlu hafalin semua — AI juga bisa bantu Tailwind. Tapi tau dasarnya bikin kamu jauh lebih efektif! 🎨`,
      },
      {
        id: "8",
        title: "JavaScript Essentials",
        duration: "18 menit",
        content: `# JavaScript Essentials untuk Vibe Coding

## Kenapa JavaScript?

JavaScript adalah bahasa pemrograman web #1. Semua website modern pakai JavaScript (atau TypeScript). Dalam vibe coding, kamu perlu ngerti dasar JS supaya bisa **baca dan edit** kode yang di-generate AI.

## Variabel & Tipe Data

\`\`\`javascript
// Deklarasi variabel
const name = "Vibengoding";   // tidak bisa diubah
let count = 0;                 // bisa diubah
// var sudah jarang dipakai — pakai const/let

// Tipe data
const text = "Hello World";    // string
const number = 42;             // number
const isActive = true;         // boolean
const items = [1, 2, 3];      // array
const user = {                 // object
  name: "Budi",
  age: 25
};
\`\`\`

## Fungsi

\`\`\`javascript
// Arrow function (modern, paling sering dipakai)
const greet = (name) => {
  return \`Hello, \${name}!\`;
};

// Shorthand (kalau satu baris)
const double = (n) => n * 2;

// Async function (untuk fetch data)
const fetchData = async () => {
  const response = await fetch("/api/data");
  const data = await response.json();
  return data;
};
\`\`\`

## Array Methods (PENTING!)

Ini yang paling sering muncul di React:

\`\`\`javascript
const fruits = ["🍎", "🍌", "🍊", "🍇"];

// map — transform setiap item
const upper = fruits.map(f => f + " fruit");
// ["🍎 fruit", "🍌 fruit", "🍊 fruit", "🍇 fruit"]

// filter — ambil yang memenuhi kondisi
const numbers = [1, 2, 3, 4, 5];
const even = numbers.filter(n => n % 2 === 0);
// [2, 4]

// find — cari satu item
const found = numbers.find(n => n > 3);
// 4

// reduce — akumulasi
const sum = numbers.reduce((acc, n) => acc + n, 0);
// 15
\`\`\`

## Destructuring & Spread

\`\`\`javascript
// Object destructuring
const user = { name: "Budi", age: 25, city: "Jakarta" };
const { name, age } = user;

// Array destructuring
const [first, second] = ["A", "B", "C"];

// Spread operator
const newUser = { ...user, age: 26 };  // copy + update
const allItems = [...items, "new"];     // copy + add
\`\`\`

## Template Literals

\`\`\`javascript
const name = "World";
const greeting = \`Hello, \${name}! Today is \${new Date().toLocaleDateString()}\`;
\`\`\`

## Conditional

\`\`\`javascript
// If-else
if (score > 90) {
  console.log("A");
} else if (score > 80) {
  console.log("B");
} else {
  console.log("C");
}

// Ternary (sering dipakai di React)
const status = isActive ? "Online" : "Offline";

// Optional chaining (safe access)
const city = user?.address?.city ?? "Unknown";
\`\`\`

## Latihan

Coba jalankan di browser console (F12 → Console):

\`\`\`javascript
const courses = ["React", "Next.js", "Tailwind", "TypeScript"];
const formatted = courses.map((c, i) => \`\${i + 1}. \${c}\`);
console.log(formatted.join("\\n"));
\`\`\`

Selamat belajar! Kamu gak perlu master semua — cukup ngerti flow-nya. AI akan bantu sisanya 💪`,
      },
      {
        id: "9",
        title: "React Fundamentals",
        duration: "20 menit",
        content: `# React Fundamentals

## Apa Itu React?

React adalah **library JavaScript** untuk membuat user interface. Dibuat oleh Meta (Facebook) dan dipakai oleh hampir semua website modern.

Kenapa React penting untuk vibe coding?
- Next.js (framework yang kita pakai) dibangun di atas React
- AI tools sangat bagus dalam generate kode React
- Ekosistem terbesar di web development

## Komponen (Components)

React = **kumpulan komponen**. Setiap bagian UI adalah komponen.

\`\`\`tsx
// Komponen sederhana
function Welcome() {
  return <h1>Hello, Vibengoding!</h1>;
}

// Komponen dengan props
function CourseCard({ title, level }: { title: string; level: string }) {
  return (
    <div className="p-6 bg-[#111] rounded-xl">
      <h3 className="text-xl font-bold">{title}</h3>
      <span className="text-sm text-gray-500">{level}</span>
    </div>
  );
}

// Cara pakai
function App() {
  return (
    <div>
      <Welcome />
      <CourseCard title="Vibe Coding 101" level="Pemula" />
      <CourseCard title="React Mastery" level="Menengah" />
    </div>
  );
}
\`\`\`

## JSX

JSX = HTML di dalam JavaScript. Ada beberapa perbedaan:

\`\`\`tsx
// class → className
<div className="container">

// style pakai object
<div style={{ color: "red", fontSize: "20px" }}>

// Event handlers pakai camelCase
<button onClick={() => alert("Clicked!")}>

// Conditional rendering
{isLoggedIn ? <Dashboard /> : <Login />}
{showBanner && <Banner />}

// Render list
{items.map((item) => (
  <li key={item.id}>{item.name}</li>
))}
\`\`\`

## State (useState)

State = data yang bisa berubah dan bikin UI re-render.

\`\`\`tsx
"use client"; // wajib untuk komponen interaktif di Next.js

import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}
\`\`\`

## Effect (useEffect)

useEffect = jalankan kode saat komponen mount atau state berubah.

\`\`\`tsx
import { useState, useEffect } from "react";

function UserProfile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Dijalankan saat komponen pertama kali muncul
    fetch("/api/user")
      .then(res => res.json())
      .then(data => setUser(data));
  }, []); // [] = jalankan sekali saja

  if (!user) return <p>Loading...</p>;

  return <h1>Hello, {user.name}!</h1>;
}
\`\`\`

## Quick Tips

1. **"use client"** — tambahkan di atas file kalau pakai useState/useEffect di Next.js
2. **key prop** — selalu kasih key unik saat render list
3. **Immutability** — jangan mutate state langsung, buat copy baru
4. **Composition** — pecah UI jadi komponen kecil yang reusable

Sekarang kamu sudah ngerti dasar React! Di lesson selanjutnya kita akan belajar Next.js 🚀`,
      },
      {
        id: "10",
        title: "Next.js App Router",
        duration: "18 menit",
        content: `# Next.js App Router

## Kenapa Next.js?

Next.js adalah **React framework** yang menambahkan fitur-fitur penting:
- 📁 **File-based routing** — folder = URL
- ⚡ **Server-side rendering** — halaman cepat & SEO friendly
- 🖼️ **Image optimization** — gambar otomatis dioptimasi
- 🚀 **Easy deployment** — deploy ke Vercel dalam hitungan detik

## Struktur App Router

\`\`\`
src/app/
├── layout.tsx      ← Layout utama (shared di semua halaman)
├── page.tsx        ← Halaman homepage (/)
├── globals.css     ← CSS global
├── about/
│   └── page.tsx    ← Halaman /about
├── blog/
│   ├── page.tsx    ← Halaman /blog
│   └── [slug]/
│       └── page.tsx ← Halaman /blog/[slug] (dynamic)
└── api/
    └── hello/
        └── route.ts ← API endpoint /api/hello
\`\`\`

## Routing

### Static Routes
\`\`\`
app/page.tsx          → /
app/about/page.tsx    → /about
app/contact/page.tsx  → /contact
\`\`\`

### Dynamic Routes
\`\`\`
app/blog/[slug]/page.tsx     → /blog/any-slug
app/users/[id]/page.tsx      → /users/123
\`\`\`

\`\`\`tsx
// app/blog/[slug]/page.tsx
export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
  return <h1>Blog Post: {slug}</h1>;
}
\`\`\`

## Layout & Page

\`\`\`tsx
// app/layout.tsx — wraps semua halaman
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>
        <nav>Navigation</nav>
        {children}  {/* ← Konten halaman masuk di sini */}
        <footer>Footer</footer>
      </body>
    </html>
  );
}
\`\`\`

## Server vs Client Components

\`\`\`tsx
// Server Component (default) — berjalan di server
// ✅ Bisa fetch data langsung
// ✅ Lebih cepat, lebih kecil
// ❌ Tidak bisa pakai useState, onClick, dll

export default async function Page() {
  const data = await fetch("https://api.example.com/data");
  return <div>{/* render data */}</div>;
}

// Client Component — berjalan di browser
// ✅ Bisa pakai hooks, event handlers
// ❌ Bundle lebih besar
"use client";

import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
\`\`\`

## Metadata & SEO

\`\`\`tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Website",
  description: "Built with vibe coding",
  openGraph: {
    title: "My Website",
    description: "Built with vibe coding",
  },
};
\`\`\`

Next.js adalah fondasi dari hampir semua project vibe coding modern. Sekarang mari kita deploy! 🚀`,
      },
      {
        id: "11",
        title: "Tailwind CSS Mastery",
        duration: "15 menit",
        content: `# Tailwind CSS Mastery

## Kenapa Tailwind?

Tailwind CSS adalah **utility-first CSS framework**. Alasan kenapa ini perfect untuk vibe coding:
- 🚀 Styling langsung di HTML/JSX — gak perlu bolak-balik file CSS
- 🤖 AI sangat bagus generate Tailwind classes
- 📱 Responsive design sangat mudah
- 🎨 Konsisten — design system built-in

## Cheat Sheet: Layout

\`\`\`tsx
// Flexbox
<div className="flex items-center justify-between gap-4">
  <div>Left</div>
  <div>Right</div>
</div>

// Center everything
<div className="flex items-center justify-center min-h-screen">
  <p>Centered!</p>
</div>

// Grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <div>Card 1</div>
  <div>Card 2</div>
  <div>Card 3</div>
</div>

// Stack (vertical)
<div className="flex flex-col gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
</div>
\`\`\`

## Cheat Sheet: Spacing & Sizing

\`\`\`
p-4    = padding 16px (semua sisi)
px-6   = padding horizontal 24px
py-3   = padding vertical 12px
m-4    = margin 16px
mt-8   = margin top 32px
gap-4  = gap 16px

w-full   = width 100%
w-64     = width 256px
max-w-lg = max-width 32rem
h-screen = height 100vh
\`\`\`

## Responsive Design

Prefix: \`sm:\` (640px), \`md:\` (768px), \`lg:\` (1024px), \`xl:\` (1280px)

\`\`\`tsx
// Mobile first!
<div className="
  p-4 text-sm          // mobile (default)
  sm:p-6 sm:text-base  // tablet kecil
  md:p-8 md:text-lg    // tablet
  lg:p-12 lg:text-xl   // desktop
">
  Responsive content
</div>

// Grid responsive
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* 1 kolom di mobile, 2 di tablet, 3 di desktop */}
</div>
\`\`\`

## Animations & Effects

\`\`\`tsx
// Hover effects
<button className="
  bg-[#BFFF00] text-black px-6 py-3 rounded-full
  hover:bg-[#d4ff4d] hover:scale-105
  transition-all duration-300
">
  Hover me!
</button>

// Custom value (arbitrary)
<div className="bg-[#111] text-[#BFFF00] border-[1px] rounded-[20px]">
  Custom values
</div>

// Gradient
<div className="bg-gradient-to-r from-[#BFFF00] to-[#00ff88]">
  Gradient
</div>
\`\`\`

## Tips

1. **Install Tailwind IntelliSense** di VS Code — autocomplete classes
2. Pakai **arbitrary values** \`[#BFFF00]\` untuk warna custom
3. **Mobile first** — mulai styling untuk mobile, tambahkan responsive prefix
4. Minta AI generate Tailwind — tapi tetap review hasilnya!

Tailwind + AI = combo yang unbeatable untuk rapid development 🎨⚡`,
      },
      {
        id: "12",
        title: "Deploy ke Vercel",
        duration: "12 menit",
        content: `# Deploy ke Vercel 🚀

## Kenapa Vercel?

- Dibuat oleh tim yang sama dengan Next.js
- **Deploy gratis** untuk project personal
- HTTPS otomatis
- Preview deployments untuk setiap push
- Analytics built-in

## Method 1: Via GitHub (Recommended)

### Step 1: Push ke GitHub

\`\`\`bash
# Pastikan semua sudah di-commit
git add .
git commit -m "feat: initial version"
git push origin main
\`\`\`

### Step 2: Connect ke Vercel

1. Buka [vercel.com](https://vercel.com) dan login dengan GitHub
2. Klik **"Add New" → "Project"**
3. Pilih repository kamu
4. Vercel auto-detect Next.js → klik **Deploy**
5. Tunggu 1-2 menit... ✅ Done!

### Step 3: Custom Domain (Optional)

1. Di Vercel dashboard → Settings → Domains
2. Tambahkan domain kamu (misal: vibengoding.id)
3. Update DNS records sesuai instruksi Vercel

## Method 2: Via CLI

\`\`\`bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Jawab pertanyaan:
# Set up and deploy? Y
# Which scope? (pilih akun kamu)
# Link to existing project? N
# What's your project's name? my-links
# In which directory is your code located? ./
# Want to override settings? N

# Deploy ke production
vercel --prod
\`\`\`

## Auto Deploy

Setelah connect GitHub + Vercel:
- Setiap \`git push\` ke \`main\` → auto deploy ke production
- Setiap push ke branch lain → preview deployment
- Preview URL bisa di-share untuk review

## Environment Variables

Kalau project kamu butuh env vars:

1. Vercel Dashboard → Settings → Environment Variables
2. Tambahkan key-value pairs
3. Pilih environment: Production / Preview / Development

\`\`\`bash
# Atau via CLI
vercel env add DATABASE_URL
\`\`\`

## Checklist Sebelum Deploy

- [ ] \`npm run build\` berhasil tanpa error
- [ ] Semua link dan gambar bekerja
- [ ] Responsive di mobile
- [ ] Metadata (title, description) sudah di-set
- [ ] Environment variables sudah ditambahkan

## 🎉 Selamat!

Kamu sudah berhasil menyelesaikan course **Vibe Coding 101**! 

Recap yang sudah kamu pelajari:
1. ✅ Konsep vibe coding
2. ✅ Setup environment
3. ✅ Terminal basics
4. ✅ Prompt engineering
5. ✅ Membuat project dengan AI
6. ✅ Git & GitHub
7. ✅ HTML, CSS, & Tailwind
8. ✅ JavaScript essentials
9. ✅ React fundamentals
10. ✅ Next.js App Router
11. ✅ Tailwind CSS mastery
12. ✅ Deploy ke Vercel

**Next course:** AI-Powered Frontend — bikin UI yang stunning! 🎨`,
      },
    ],
  },
  // ===== COURSE 2: AI-Powered Frontend =====
  {
    id: 2,
    slug: "ai-powered-frontend",
    title: "AI-Powered Frontend",
    subtitle: "Build UI dengan AI",
    description:
      "Cara bikin UI yang stunning pakai AI tools. Dari wireframe sampai production-ready components.",
    longDescription:
      "Di course ini kamu akan belajar bagaimana memanfaatkan AI secara maksimal untuk membuat frontend yang profesional. Mulai dari merancang wireframe dengan AI, generate komponen UI, sampai polishing final dengan animasi dan micro-interactions. Setiap lesson berisi teknik praktikal yang bisa langsung kamu terapkan.",
    level: "Menengah",
    totalDuration: "2.5 jam",
    color: "#00D4FF",
    tags: ["React", "Tailwind", "AI"],
    prerequisites: [
      "Sudah selesai Vibe Coding 101 (atau setara)",
      "Familiar dengan React & Tailwind CSS",
      "Akun Cursor / ChatGPT",
    ],
    whatYoullLearn: [
      "Merancang UI dengan AI (wireframe → code)",
      "Component-driven development",
      "Responsive design patterns",
      "Animasi & micro-interactions dengan Motion",
      "Dark mode implementation",
      "Design system & consistency",
    ],
    lessons: [
      {
        id: "1",
        title: "UI Design Principles untuk Developer",
        duration: "15 menit",
        content: `# UI Design Principles untuk Developer

## Kamu Gak Perlu Jadi Designer

Sebagai developer yang pakai AI, kamu perlu tau **prinsip dasar** design supaya bisa:
- Mengarahkan AI dengan prompt yang tepat
- Menilai apakah output AI sudah bagus
- Melakukan refinement yang meaningful

## 4 Prinsip Utama

### 1. Visual Hierarchy 👁️

Mata orang membaca dalam pola tertentu. Elemen penting harus paling menonjol.

\`\`\`
Hierarchy tools:
- SIZE: Heading besar, body text kecil
- WEIGHT: Bold untuk penting, regular untuk supporting
- COLOR: Accent color untuk CTA, muted untuk secondary
- SPACING: Lebih banyak space = lebih penting
\`\`\`

\`\`\`tsx
{/* Good hierarchy */}
<div>
  <h1 className="text-5xl font-bold text-white">Main Message</h1>
  <p className="text-lg text-gray-400 mt-4">Supporting description</p>
  <button className="mt-8 px-8 py-4 bg-[#BFFF00] text-black font-bold text-lg rounded-full">
    Primary CTA
  </button>
  <button className="mt-4 text-gray-500 text-sm underline">
    Secondary action
  </button>
</div>
\`\`\`

### 2. Consistency 🎯

Gunakan design tokens yang konsisten:

\`\`\`css
/* Spacing scale */
--space-1: 4px;   /* gap kecil */
--space-2: 8px;   /* padding internal */
--space-4: 16px;  /* padding card */
--space-6: 24px;  /* gap antar section */
--space-8: 32px;  /* gap besar */

/* Border radius */
--radius-sm: 8px;
--radius-md: 12px;
--radius-lg: 16px;
--radius-full: 9999px;
\`\`\`

### 3. Whitespace (Negative Space) 🫧

Jangan takut dengan ruang kosong. Whitespace membuat design:
- Lebih mudah dibaca
- Terasa premium/clean
- Konten lebih fokus

### 4. Color Psychology 🎨

\`\`\`
🟢 Green/Lime  → Growth, energy, success
🔵 Blue        → Trust, professional, calm
🔴 Red         → Urgency, error, passion
🟡 Yellow      → Attention, warning, warmth
🟣 Purple      → Creative, luxury, unique
⚫ Dark        → Modern, sophisticated, techy
\`\`\`

## Prompt Template untuk UI Design

\`\`\`
Saya ingin membuat [KOMPONEN] untuk [KONTEKS].

Design requirements:
- Visual hierarchy: [apa yang paling penting]
- Color scheme: [warna utama dan aksen]
- Mood: [modern/playful/minimal/corporate]
- Responsive: [breakpoints yang perlu]
- Interactions: [hover/click/scroll effects]
\`\`\`

Prinsip ini akan kita pakai di semua lesson selanjutnya! 🎨`,
      },
      {
        id: "2",
        title: "AI Wireframing: Dari Ide ke Mockup",
        duration: "18 menit",
        content: `# AI Wireframing: Dari Ide ke Mockup

## Flow: Idea → Wireframe → Code

Dalam vibe coding, kamu bisa skip tools design seperti Figma dan langsung ke kode. Tapi tetap perlu **structure** dulu.

## Step 1: Deskripsikan Halaman

Sebelum minta AI generate kode, tulis dulu **outline** halaman:

\`\`\`markdown
# Landing Page — Task Manager App

## Sections:
1. **Navbar** - Logo, links (Features, Pricing, About), CTA button
2. **Hero** - Headline, subtitle, CTA, hero image/screenshot
3. **Features** - 3 cards (Organize, Collaborate, Track)
4. **How it works** - 3 steps with illustrations
5. **Testimonials** - 3 testimonial cards
6. **CTA Section** - Final call to action
7. **Footer** - Links, social icons, copyright
\`\`\`

## Step 2: AI Wireframe Prompt

\`\`\`
Berdasarkan outline berikut, buatkan wireframe dalam bentuk 
kode HTML+Tailwind CSS. Gunakan placeholder text dan gray 
boxes untuk gambar. Focus pada LAYOUT dan STRUCTURE, 
bukan styling final.

[paste outline]

Requirements:
- Mobile responsive (grid yang berubah)
- Semantic HTML (section, nav, main, footer)
- Placeholder: gunakan bg-gray-800 rounded boxes untuk gambar
- Text: gunakan Lorem Ipsum pendek
\`\`\`

## Step 3: Iterasi ke High-Fidelity

Setelah wireframe jadi, iterasi ke versi final:

\`\`\`
Sekarang upgrade wireframe ini ke high-fidelity design:

1. Color scheme: Dark (#0a0a0a) dengan aksen cyan (#00D4FF)
2. Typography: 
   - Headings: bold, large
   - Body: regular, lighter color
3. Cards: bg-[#111] dengan border subtle dan hover effect
4. CTA buttons: gradient atau solid accent color
5. Tambahkan spacing yang generous
6. Hover states untuk semua interactive elements
\`\`\`

## Real Example

\`\`\`tsx
// Wireframe version
<section className="py-20 px-6">
  <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
    {[1, 2, 3].map(i => (
      <div key={i} className="bg-gray-800 rounded-xl p-6 h-64" />
    ))}
  </div>
</section>

// High-fidelity version
<section className="py-24 px-6">
  <div className="text-center mb-16">
    <span className="text-cyan-400 text-sm font-mono">FEATURES</span>
    <h2 className="text-4xl font-bold text-white mt-2">
      Everything you need
    </h2>
    <p className="text-gray-500 mt-4 max-w-lg mx-auto">
      Powerful features to help you manage tasks efficiently.
    </p>
  </div>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
    {features.map(f => (
      <div key={f.id} 
        className="bg-[#111] rounded-2xl p-8 border border-gray-800 
        hover:border-cyan-500/30 transition-all group">
        <div className="w-12 h-12 rounded-xl bg-cyan-500/10 
          text-cyan-400 flex items-center justify-center mb-4
          group-hover:scale-110 transition-transform">
          {f.icon}
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{f.title}</h3>
        <p className="text-gray-500">{f.description}</p>
      </div>
    ))}
  </div>
</section>
\`\`\`

Dari wireframe ke high-fidelity dalam 2 prompt. That's the power of vibe coding! 🚀`,
      },
      {
        id: "3",
        title: "Component-Driven Development",
        duration: "20 menit",
        content: `# Component-Driven Development

## Think in Components

Setiap UI bisa dipecah jadi komponen kecil yang reusable. Ini membuat:
- Kode lebih mudah di-maintain
- AI bisa generate per-komponen (lebih focused)
- Testing lebih gampang

## Anatomy of a Good Component

\`\`\`tsx
// ✅ Good: Focused, reusable, typed
interface ButtonProps {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

function Button({ 
  variant = "primary", 
  size = "md", 
  children, 
  onClick, 
  disabled 
}: ButtonProps) {
  const baseStyles = "font-semibold rounded-full transition-all inline-flex items-center gap-2";
  
  const variants = {
    primary: "bg-[#BFFF00] text-black hover:bg-[#d4ff4d] hover:scale-105",
    secondary: "border border-gray-700 text-white hover:border-[#BFFF00]/50",
    ghost: "text-gray-400 hover:text-white",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={\`\${baseStyles} \${variants[variant]} \${sizes[size]} 
        \${disabled ? "opacity-50 cursor-not-allowed" : ""}\`}
    >
      {children}
    </button>
  );
}
\`\`\`

## Component Library Pattern

Buat folder \`components/ui/\`:

\`\`\`
src/components/
├── ui/
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Badge.tsx
│   ├── Input.tsx
│   └── index.ts      ← barrel export
├── layout/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── Container.tsx
└── sections/
    ├── Hero.tsx
    ├── Features.tsx
    └── CTA.tsx
\`\`\`

## AI Prompt untuk Generate Components

\`\`\`
Buatkan React component [NAMA] dengan TypeScript.

Interface props:
- [prop1]: [type] — [deskripsi]
- [prop2]: [type] — [deskripsi]

Styling: Tailwind CSS, dark theme
Variants: [list variants]
States: default, hover, active, disabled

Berikan kode lengkap dengan TypeScript types.
\`\`\`

## Composition Over Complexity

\`\`\`tsx
// ❌ Bad: satu komponen raksasa
function DashboardPage() {
  return (
    <div>
      {/* 500 lines of JSX */}
    </div>
  );
}

// ✅ Good: komposisi komponen kecil
function DashboardPage() {
  return (
    <div>
      <DashboardHeader />
      <StatsGrid />
      <RecentActivity />
      <QuickActions />
    </div>
  );
}
\`\`\`

Component-driven = lebih maintainable, lebih scalable, dan AI lebih mudah membantu per-komponen! 🧩`,
      },
      {
        id: "4",
        title: "Responsive Design Patterns",
        duration: "18 menit",
        content: `# Responsive Design Patterns

## Mobile First Approach

Selalu mulai dari mobile, lalu tambahkan style untuk layar lebih besar.

\`\`\`tsx
// Mobile first with Tailwind
<div className="
  px-4                // mobile: padding kecil
  sm:px-6             // tablet kecil
  md:px-8             // tablet
  lg:px-12            // desktop
  xl:max-w-7xl xl:mx-auto  // wide desktop
">
  {children}
</div>
\`\`\`

## Common Responsive Patterns

### 1. Stack to Grid
\`\`\`tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <Card />
  <Card />
  <Card />
</div>
\`\`\`

### 2. Hide/Show Elements
\`\`\`tsx
{/* Hamburger: show on mobile, hide on desktop */}
<button className="md:hidden">☰</button>

{/* Desktop nav: hide on mobile, show on desktop */}
<nav className="hidden md:flex gap-6">
  <a href="#">Link 1</a>
  <a href="#">Link 2</a>
</nav>
\`\`\`

### 3. Text Scaling
\`\`\`tsx
<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
  Responsive Heading
</h1>
\`\`\`

### 4. Container Queries (Modern)
\`\`\`tsx
<div className="@container">
  <div className="@md:flex @md:gap-6">
    <img className="@md:w-1/3" />
    <div className="@md:w-2/3">Content</div>
  </div>
</div>
\`\`\`

## AI Prompt untuk Responsive

\`\`\`
Review komponen ini dan pastikan responsive di semua breakpoint:
- Mobile (320-480px): stack layout, text lebih kecil
- Tablet (768px): 2 columns untuk grid
- Desktop (1024px+): full layout, max-width container

[paste kode komponen]
\`\`\`

## Testing Responsive

1. **Browser DevTools** — F12 → Toggle device toolbar
2. **Vercel Preview** — test di HP asli via preview URL
3. **Viewport presets** — 375px (iPhone), 768px (iPad), 1280px (Desktop)

Mobile users are 60%+ of traffic — jangan skip responsive! 📱`,
      },
      {
        id: "5",
        title: "Animasi dengan Motion (Framer Motion)",
        duration: "20 menit",
        content: `# Animasi dengan Motion (Framer Motion)

## Kenapa Animasi?

Animasi yang tepat membuat UI:
- Terasa **alive** dan **polished**
- Memberikan **feedback** ke user
- **Guide attention** ke elemen penting
- Meningkatkan **perceived performance**

## Setup Motion

\`\`\`bash
npm install motion
\`\`\`

## Basic Animations

\`\`\`tsx
"use client";
import { motion } from "motion/react";

// Fade in
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  Fade in from below
</motion.div>

// Stagger children
<motion.div
  initial="hidden"
  animate="visible"
  variants={{
    visible: { transition: { staggerChildren: 0.1 } }
  }}
>
  {items.map(item => (
    <motion.div
      key={item.id}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
    >
      {item.content}
    </motion.div>
  ))}
</motion.div>
\`\`\`

## Scroll Animations

\`\`\`tsx
// Animate saat masuk viewport
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5 }}
>
  I appear on scroll!
</motion.div>
\`\`\`

## Hover & Tap

\`\`\`tsx
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  className="px-6 py-3 bg-[#BFFF00] text-black rounded-full font-bold"
>
  Click me!
</motion.button>
\`\`\`

## Page Transitions

\`\`\`tsx
import { AnimatePresence } from "motion/react";

<AnimatePresence mode="wait">
  <motion.div
    key={pathname}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    {children}
  </motion.div>
</AnimatePresence>
\`\`\`

## Rules of Animation

1. **Keep it subtle** — 200-500ms duration, easing yang smooth
2. **Purpose** — setiap animasi harus punya alasan
3. **Performance** — animate transform dan opacity (GPU-accelerated)
4. **Consistency** — gunakan timing dan easing yang sama

Animasi adalah polish yang membedakan website biasa dari website yang memorable! ✨`,
      },
      {
        id: "6",
        title: "Dark Mode Implementation",
        duration: "15 menit",
        content: `# Dark Mode Implementation

## Kenapa Dark Mode?

- 🌙 Lebih nyaman di mata (terutama malam)
- 🔋 Hemat baterai di OLED screens
- 😎 Terlihat lebih modern dan "techy"
- 📊 70%+ developer prefer dark mode

## Method 1: CSS Variables (Simple)

\`\`\`css
:root {
  --bg: #ffffff;
  --text: #111111;
  --card: #f5f5f5;
  --border: #e5e5e5;
  --accent: #BFFF00;
}

.dark {
  --bg: #050505;
  --text: #fafafa;
  --card: #111111;
  --border: #1a1a1a;
  --accent: #BFFF00;
}

body {
  background: var(--bg);
  color: var(--text);
}
\`\`\`

## Method 2: Tailwind Dark Mode

\`\`\`tsx
// tailwind.config.ts
export default {
  darkMode: 'class', // atau 'media' untuk system preference
}

// Komponen
<div className="bg-white dark:bg-[#111] text-black dark:text-white">
  <h1 className="text-gray-900 dark:text-gray-100">Hello</h1>
  <p className="text-gray-600 dark:text-gray-400">Description</p>
</div>
\`\`\`

## Toggle Component

\`\`\`tsx
"use client";
import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";

function ThemeToggle() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) setDark(saved === "dark");
  }, []);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800"
    >
      {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
    </button>
  );
}
\`\`\`

## Dark Mode Color Tips

\`\`\`
Background layers:
- Page bg:    #050505 (darkest)
- Card bg:    #111111
- Hover bg:   #1a1a1a
- Border:     #222222

Text hierarchy:
- Primary:    #fafafa (almost white)
- Secondary:  #888888 (gray)
- Muted:      #555555 (dimmed)

Accents stay bright:
- CTA:        #BFFF00 (lime)
- Links:      #00D4FF (cyan)
- Error:      #ff4444
- Success:    #00cc66
\`\`\`

Dark mode done right membuat website terasa premium dan modern 🌙`,
      },
      {
        id: "7",
        title: "Building a Complete Landing Page",
        duration: "25 menit",
        content: `# Building a Complete Landing Page

## Project: SaaS Landing Page

Sekarang kita gabungkan semua yang sudah dipelajari untuk membuat landing page lengkap.

## Struktur

\`\`\`
sections/
├── Navbar.tsx
├── Hero.tsx
├── Features.tsx
├── HowItWorks.tsx
├── Testimonials.tsx
├── Pricing.tsx
├── CTA.tsx
└── Footer.tsx
\`\`\`

## AI Workflow untuk Full Page

### Step 1: Generate Navbar
\`\`\`
Buatkan Navbar component untuk SaaS landing page.
- Logo di kiri, links di tengah, CTA button di kanan
- Mobile: hamburger menu
- Scroll effect: background blur saat scroll down
- Dark theme, Tailwind CSS, TypeScript
\`\`\`

### Step 2: Generate Hero
\`\`\`
Buatkan Hero section:
- Badge: "✨ Now in Beta"
- Headline besar (2 baris)
- Subtitle paragraph
- 2 CTA buttons: primary + secondary
- Stats row: 3 metrics
- Dark bg dengan subtle grid pattern
\`\`\`

### Step 3: Generate Features (repeat pattern)

Setiap section ikuti pattern yang sama:
1. **Describe** apa yang kamu mau
2. **Generate** dengan AI
3. **Review** & test di browser
4. **Iterate** kalau perlu adjustment

## Composition

\`\`\`tsx
// app/page.tsx
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { HowItWorks } from "@/components/HowItWorks";
import { Testimonials } from "@/components/Testimonials";
import { CTA } from "@/components/CTA";
import { Footer } from "@/components/Footer";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Testimonials />
      <CTA />
      <Footer />
    </>
  );
}
\`\`\`

## Polish Checklist

- [ ] Scroll animations (Motion whileInView)
- [ ] Hover effects pada semua interactive elements
- [ ] Responsive di 3 breakpoints (mobile/tablet/desktop)
- [ ] Consistent spacing dan color scheme
- [ ] Proper heading hierarchy (h1 → h2 → h3)
- [ ] Accessible: proper alt text, focus states
- [ ] Performance: optimize images, lazy load

Full landing page dalam satu sesi vibe coding. That's the power! 🚀`,
      },
      {
        id: "8",
        title: "Design System & Polishing",
        duration: "18 menit",
        content: `# Design System & Polishing

## Apa Itu Design System?

Design system = **set of rules** yang memastikan UI kamu konsisten. Ini termasuk:
- Colors
- Typography scale
- Spacing scale
- Component patterns
- Animation timing

## Membuat Design Tokens

\`\`\`tsx
// lib/design-tokens.ts
export const theme = {
  colors: {
    bg: { primary: "#050505", secondary: "#111", tertiary: "#1a1a1a" },
    text: { primary: "#fafafa", secondary: "#888", muted: "#555" },
    accent: { lime: "#BFFF00", cyan: "#00D4FF", red: "#ff4444" },
    border: { default: "#1a1a1a", hover: "#333" },
  },
  spacing: { xs: "4px", sm: "8px", md: "16px", lg: "24px", xl: "32px", "2xl": "48px" },
  radius: { sm: "8px", md: "12px", lg: "16px", xl: "24px", full: "9999px" },
  transition: { fast: "150ms", normal: "300ms", slow: "500ms" },
} as const;
\`\`\`

## Micro-interactions

Detail kecil yang bikin beda:

\`\`\`tsx
// Link dengan animated underline
<a className="relative group">
  Link Text
  <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#BFFF00] 
    group-hover:w-full transition-all duration-300" />
</a>

// Card dengan gradient border on hover
<div className="relative p-[1px] rounded-xl bg-gradient-to-r 
  from-transparent via-transparent to-transparent
  hover:from-[#BFFF00]/30 hover:to-[#00D4FF]/30 
  transition-all duration-500">
  <div className="bg-[#111] rounded-xl p-6">
    Content
  </div>
</div>

// Button with glow effect
<button className="px-8 py-4 bg-[#BFFF00] text-black font-bold rounded-full
  hover:shadow-[0_0_40px_rgba(191,255,0,0.3)]
  transition-all duration-300">
  Glowing Button
</button>
\`\`\`

## Final Polish Checklist

- [ ] Consistent spacing (gunakan Tailwind scale)
- [ ] Smooth transitions pada SEMUA hover states
- [ ] Loading states untuk async content
- [ ] Error states yang user-friendly
- [ ] Focus ring styles untuk keyboard navigation
- [ ] Smooth scroll antar sections
- [ ] Favicon dan metadata complete
- [ ] Open Graph image untuk social sharing

Congratulations! Kamu sudah bisa bikin frontend profesional dengan AI! 🎨✨`,
      },
    ],
  },
  // ===== COURSE 3: Full-Stack Vibes =====
  {
    id: 3,
    slug: "full-stack-vibes",
    title: "Full-Stack Vibes",
    subtitle: "Backend + Frontend + AI",
    description:
      "Gabungin semua skill. Build full-stack app dari nol pakai vibe coding methodology.",
    longDescription:
      "Course ini adalah level up dari frontend. Kamu akan belajar membangun aplikasi full-stack lengkap: database, API, authentication, dan deployment. Semua dengan pendekatan vibe coding yang memanfaatkan AI secara maksimal. Di akhir course, kamu akan punya app production-ready.",
    level: "Menengah",
    totalDuration: "5 jam",
    color: "#FF6B6B",
    tags: ["Next.js", "Database", "API"],
    prerequisites: [
      "Selesai course 1 & 2",
      "Familiar dengan React & Next.js",
      "Basic JavaScript/TypeScript",
    ],
    whatYoullLearn: [
      "Next.js API Routes & Server Actions",
      "Database dengan Prisma + PostgreSQL",
      "Authentication (NextAuth.js)",
      "CRUD operations lengkap",
      "Error handling & validation",
      "Production deployment",
    ],
    lessons: fullStackVibesCourse.lessons,
  },
  // ===== COURSE 4: Prompt Engineering Pro =====
  {
    id: 4,
    slug: "prompt-engineering-pro",
    title: "Prompt Engineering Pro",
    subtitle: "Master the Art of Prompting",
    description:
      "Deep dive ke prompt engineering. Bikin prompt yang efektif untuk coding, debugging, dan arsitektur.",
    longDescription:
      "Prompt engineering adalah skill #1 dalam vibe coding. Di course ini kamu akan mendalami teknik-teknik advanced prompting yang akan drastically improve kualitas output AI. Dari basic patterns sampai advanced techniques seperti chain-of-thought, few-shot learning, dan system prompts.",
    level: "Semua Level",
    totalDuration: "3.5 jam",
    color: "#C084FC",
    tags: ["GPT", "Claude", "Prompts"],
    prerequisites: ["Basic coding knowledge", "Akun Claude / ChatGPT", "Rasa penasaran tinggi 🧐"],
    whatYoullLearn: [
      "Anatomy of effective prompts",
      "Chain-of-thought reasoning",
      "Few-shot & zero-shot techniques",
      "Prompting untuk berbagai use cases",
      "System prompts & personas",
      "Debugging dengan AI",
    ],
    lessons: promptEngineeringLessons,
  },
  // ===== COURSE 5: Ship It! Deploy Guide =====
  {
    id: 5,
    slug: "ship-it-deploy-guide",
    title: "Ship It! Deploy Guide",
    subtitle: "Dari Local ke Production",
    description:
      "Panduan lengkap deploy aplikasi. Vercel, Railway, Docker, CI/CD — semua dibahas.",
    longDescription:
      "Bikin app itu gampang. Deploy dan maintain di production? Itu yang challenging. Course ini membahas semua yang perlu kamu tau tentang deployment: dari platform gratis seperti Vercel, sampai custom deployment dengan Docker dan CI/CD pipelines.",
    level: "Pemula",
    totalDuration: "2 jam",
    color: "#FFA726",
    tags: ["Vercel", "Docker", "CI/CD"],
    prerequisites: ["Project yang siap di-deploy", "Akun GitHub", "Akun Vercel (gratis)"],
    whatYoullLearn: [
      "Deploy ke Vercel (step by step)",
      "Custom domains & SSL",
      "Environment variables management",
      "CI/CD dengan GitHub Actions",
      "Docker basics",
      "Monitoring & troubleshooting",
    ],
    lessons: shipItLessons,
  },
  // ===== COURSE 6: Cursor & Copilot Mastery =====
  {
    id: 6,
    slug: "cursor-copilot-mastery",
    title: "Cursor & Copilot Mastery",
    subtitle: "AI Code Editor Pro Tips",
    description:
      "Tips dan tricks pakai Cursor, GitHub Copilot, dan AI code editors lainnya biar produktif.",
    longDescription:
      "AI code editors seperti Cursor dan GitHub Copilot bisa multiply produktivitas kamu 5-10x kalau dipakai dengan benar. Course ini berisi tips, tricks, dan workflows yang akan transform cara kamu ngoding. Dari shortcuts sampai advanced features yang jarang diketahui.",
    level: "Semua Level",
    totalDuration: "2.5 jam",
    color: "#4ECDC4",
    tags: ["Cursor", "Copilot", "VSCode"],
    prerequisites: ["Cursor atau VS Code terinstall", "Basic coding experience", "Akun Cursor/Copilot"],
    whatYoullLearn: [
      "Cursor setup & configuration optimal",
      "Keyboard shortcuts yang wajib tau",
      "Cmd+K: inline code generation",
      "Chat & Composer workflow",
      "Multi-file editing",
      "GitHub Copilot tips & tricks",
    ],
    lessons: cursorCopilotLessons,
  },
];

export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find((c) => c.slug === slug);
}

export function getLessonById(course: Course, lessonId: string): Lesson | undefined {
  return course.lessons.find((l) => l.id === lessonId);
}
