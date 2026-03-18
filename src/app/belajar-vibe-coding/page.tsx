import type { Metadata } from "next";
import Link from "next/link";
import {
  Zap,
  BookOpen,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Code2,
  Terminal,
  Globe,
  Bot,
  Palette,
  MousePointer2,
  Layers,
  ChevronDown,
  Play,
  Clock,
  Users,
  Star,
} from "lucide-react";

const siteUrl = "https://vibengoding.id";

export const metadata: Metadata = {
  title: "Belajar Vibe Coding Gratis — Panduan Lengkap untuk Pemula 2026",
  description:
    "Panduan lengkap belajar vibe coding dari nol untuk pemula. Apa itu vibe coding, cara mulai, tools yang dibutuhkan, dan cara membuat website pertama dengan AI. 100% gratis, bahasa Indonesia.",
  keywords: [
    "belajar vibe coding",
    "apa itu vibe coding",
    "vibe coding untuk pemula",
    "cara belajar vibe coding",
    "tutorial vibe coding bahasa indonesia",
    "belajar coding dengan AI",
    "cara bikin website pakai AI",
    "bikin website tanpa coding",
    "kursus vibe coding gratis",
    "belajar programming gratis",
    "vibe coding 2026",
    "AI coding indonesia",
    "belajar web development gratis",
    "prompt engineering untuk coding",
    "cursor tutorial indonesia",
    "cara deploy website gratis",
  ],
  alternates: {
    canonical: `${siteUrl}/belajar-vibe-coding`,
  },
  openGraph: {
    title: "Belajar Vibe Coding Gratis — Panduan Lengkap 2026",
    description:
      "Panduan lengkap belajar vibe coding dari nol. Apa itu vibe coding, cara mulai, tools, dan cara bikin website pertama dengan AI. Gratis, bahasa Indonesia.",
    url: `${siteUrl}/belajar-vibe-coding`,
    type: "article",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
};

// FAQ data for schema + UI
const faqs = [
  {
    q: "Apa itu vibe coding?",
    a: "Vibe coding adalah paradigma pemrograman baru di mana kamu mendeskripsikan apa yang ingin dibuat dalam bahasa sehari-hari, lalu AI yang menuliskan kodenya. Istilah ini dipopulerkan oleh Andrej Karpathy (co-founder OpenAI) pada awal 2025. Intinya: kamu fokus ke ide dan 'vibes', AI yang handle kode teknis.",
  },
  {
    q: "Apakah vibe coding cocok untuk pemula yang belum pernah coding?",
    a: "Sangat cocok! Justru vibe coding membuat coding lebih accessible untuk pemula. Kamu bisa langsung membuat website atau aplikasi tanpa perlu belajar syntax dari nol. Tapi tetap disarankan belajar dasar HTML, CSS, dan JavaScript supaya bisa review dan refine output AI.",
  },
  {
    q: "Tools apa saja yang dibutuhkan untuk vibe coding?",
    a: "Tools utama: Cursor (AI code editor), ChatGPT atau Claude (untuk prompt engineering), Next.js + Tailwind CSS (framework), dan Vercel (untuk deploy gratis). Semua tools ini gratis atau punya tier gratis yang cukup.",
  },
  {
    q: "Berapa lama belajar vibe coding sampai bisa bikin website?",
    a: "Dengan panduan yang tepat, kamu bisa membuat dan deploy website pertamamu dalam 1 hari! Course Vibe Coding 101 kami dirancang supaya kamu bisa ship project pertama dalam waktu singkat. Untuk jadi proficient, biasanya 2-4 minggu belajar konsisten.",
  },
  {
    q: "Apakah semua course di VIBENGODING.ID benar-benar gratis?",
    a: "Ya, 100% gratis selamanya. Tidak ada paywall, tidak ada tier berbayar, tidak ada hidden cost. Semua 6 courses dan 60+ lessons bisa diakses siapa saja tanpa signup sekalipun.",
  },
  {
    q: "Apa bedanya vibe coding dengan coding biasa?",
    a: "Coding biasa: kamu tulis kode manual baris per baris. Vibe coding: kamu deskripsikan apa yang mau dibuat pakai bahasa manusia, AI generate kodenya, kamu test dan refine. Produktivitas bisa meningkat 5-10x, terutama untuk prototyping dan MVP.",
  },
  {
    q: "Apakah vibe coding bisa dipakai untuk production / project serius?",
    a: "Bisa, tapi dengan catatan. Vibe coding sangat bagus untuk prototyping, MVP, dan project personal. Untuk production skala besar, kamu tetap perlu review kode AI, testing yang proper, dan pemahaman arsitektur. Di course kami, kami ajarkan 'vibe then verify' — vibe dulu, tapi selalu review.",
  },
  {
    q: "Bahasa pemrograman apa yang dipakai di vibe coding?",
    a: "Di VIBENGODING.ID kami fokus ke stack modern: TypeScript/JavaScript dengan React dan Next.js untuk frontend, Tailwind CSS untuk styling, dan berbagai backend tools. Ini adalah stack paling populer dan paling well-supported oleh AI tools.",
  },
];

// Steps data
const steps = [
  {
    num: "01",
    title: "Setup Environment",
    desc: "Install Node.js, Cursor (AI code editor), dan buat akun ChatGPT/Claude. 15 menit setup dan kamu siap mulai.",
    color: "#BFFF00",
  },
  {
    num: "02",
    title: "Pelajari Prompt Engineering",
    desc: "Belajar cara menulis prompt yang efektif untuk AI. Formula: Context + Task + Constraints + Format. Ini skill #1 di vibe coding.",
    color: "#00D4FF",
  },
  {
    num: "03",
    title: "Bangun Project Pertama",
    desc: "Buat website atau app pertamamu pakai AI. Dari nol sampai jadi, bisa dalam hitungan jam. Langsung praktek, bukan teori.",
    color: "#C084FC",
  },
  {
    num: "04",
    title: "Deploy & Share ke Dunia",
    desc: "Push ke GitHub, deploy ke Vercel gratis, dan share hasilnya. Dalam satu hari, kamu sudah punya website live di internet.",
    color: "#FF6B6B",
  },
];

// Course summary
const courseSummaries = [
  {
    slug: "vibe-coding-101",
    title: "Vibe Coding 101",
    desc: "Dari nol sampai deploy. Setup, prompt engineering, HTML/CSS/JS dasar, React, Next.js, deploy ke Vercel.",
    lessons: 12,
    duration: "3 jam",
    level: "Pemula",
    icon: <Sparkles className="w-5 h-5" />,
    color: "#BFFF00",
  },
  {
    slug: "ai-powered-frontend",
    title: "AI-Powered Frontend",
    desc: "Bikin UI stunning pakai AI. Wireframing, responsive design, animasi, dark mode, landing page lengkap.",
    lessons: 8,
    duration: "2.5 jam",
    level: "Menengah",
    icon: <Palette className="w-5 h-5" />,
    color: "#00D4FF",
  },
  {
    slug: "full-stack-vibes",
    title: "Full-Stack Vibes",
    desc: "Backend + Frontend + AI. Database, API, auth, CRUD operations, production deployment.",
    lessons: 15,
    duration: "5 jam",
    level: "Menengah",
    icon: <Layers className="w-5 h-5" />,
    color: "#FF6B6B",
  },
  {
    slug: "prompt-engineering-pro",
    title: "Prompt Engineering Pro",
    desc: "Master prompting. Chain-of-thought, few-shot, system prompts, debugging, arsitektur.",
    lessons: 10,
    duration: "3.5 jam",
    level: "Semua Level",
    icon: <Bot className="w-5 h-5" />,
    color: "#C084FC",
  },
  {
    slug: "ship-it-deploy-guide",
    title: "Ship It! Deploy Guide",
    desc: "Dari local ke production. Vercel, Docker, CI/CD, custom domain, monitoring.",
    lessons: 7,
    duration: "2 jam",
    level: "Pemula",
    icon: <Globe className="w-5 h-5" />,
    color: "#FFA726",
  },
  {
    slug: "cursor-copilot-mastery",
    title: "Cursor & Copilot Mastery",
    desc: "AI code editor pro tips. Shortcuts, Cmd+K, Chat, multi-file editing, Copilot tricks.",
    lessons: 9,
    duration: "2.5 jam",
    level: "Semua Level",
    icon: <MousePointer2 className="w-5 h-5" />,
    color: "#4ECDC4",
  },
];

function FaqSection() {
  return (
    <section className="py-20">
      <div className="text-center mb-12">
        <h2
          className="text-3xl sm:text-4xl font-bold text-white mb-4"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          Pertanyaan yang Sering Ditanyakan
        </h2>
        <p className="text-[#888] max-w-lg mx-auto">
          Jawaban untuk pertanyaan umum tentang vibe coding dan belajar di VIBENGODING.ID
        </p>
      </div>
      <div className="max-w-3xl mx-auto space-y-3">
        {faqs.map((faq, i) => (
          <details
            key={i}
            className="group bg-[#111] rounded-xl border border-[#1a1a1a] overflow-hidden"
          >
            <summary className="flex items-center justify-between cursor-pointer px-6 py-5 text-white font-medium hover:bg-[#151515] transition-colors list-none">
              <span className="pr-4">{faq.q}</span>
              <ChevronDown className="w-5 h-5 text-[#666] flex-shrink-0 transition-transform group-open:rotate-180" />
            </summary>
            <div className="px-6 pb-5 text-[#aaa] text-sm leading-relaxed border-t border-[#1a1a1a] pt-4">
              {faq.a}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}

export default function BelajarVibeCodingPage() {
  // FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Belajar Vibe Coding Gratis — Panduan Lengkap untuk Pemula 2026",
    description:
      "Panduan lengkap belajar vibe coding dari nol untuk pemula. Apa itu vibe coding, cara mulai, tools yang dibutuhkan, dan cara membuat website pertama dengan AI.",
    author: { "@type": "Organization", name: "VIBENGODING.ID", url: siteUrl },
    publisher: {
      "@type": "Organization",
      name: "VIBENGODING.ID",
      url: siteUrl,
      logo: { "@type": "ImageObject", url: `${siteUrl}/icon-512.png` },
    },
    datePublished: "2025-12-01",
    dateModified: new Date().toISOString().split("T")[0],
    mainEntityOfPage: { "@type": "WebPage", "@id": `${siteUrl}/belajar-vibe-coding` },
    inLanguage: "id-ID",
    isAccessibleForFree: true,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Belajar Vibe Coding", item: `${siteUrl}/belajar-vibe-coding` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <main className="min-h-screen">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="border-b border-[#1a1a1a]">
          <div className="max-w-5xl mx-auto px-6 py-4 flex items-center gap-2 text-sm">
            <Link href="/" className="text-[#888] hover:text-white transition-colors">Home</Link>
            <span className="text-[#333]">/</span>
            <span className="text-[#BFFF00] font-medium">Belajar Vibe Coding</span>
          </div>
        </nav>

        {/* Hero */}
        <header className="relative py-16 sm:py-24 overflow-hidden">
          <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#BFFF00]/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-[#00D4FF]/5 rounded-full blur-[100px]" />

          <div className="relative z-10 max-w-5xl mx-auto px-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#BFFF00]/10 border border-[#BFFF00]/20 text-[#BFFF00] text-xs font-mono mb-6">
              <BookOpen className="w-3.5 h-3.5" />
              PANDUAN LENGKAP 2026
            </div>
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Belajar{" "}
              <span className="text-[#BFFF00] glow-text">Vibe Coding</span>
              <br />
              <span className="text-[#888] text-3xl sm:text-4xl lg:text-5xl">Gratis, dari Nol, Bahasa Indonesia</span>
            </h1>
            <p className="text-lg sm:text-xl text-[#aaa] max-w-3xl leading-relaxed mb-8">
              Panduan paling lengkap untuk belajar <strong className="text-white">vibe coding</strong> — 
              cara baru membuat website dan aplikasi menggunakan AI. Cocok untuk pemula yang belum pernah coding 
              sampai developer yang mau meningkatkan produktivitas 5-10x.
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
              <div className="flex items-center gap-2 text-sm text-[#aaa]">
                <Clock className="w-4 h-4 text-[#BFFF00]" />
                <span>18.5 jam total konten</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#aaa]">
                <BookOpen className="w-4 h-4 text-[#BFFF00]" />
                <span>60+ lessons</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#aaa]">
                <Users className="w-4 h-4 text-[#BFFF00]" />
                <span>Bahasa Indonesia</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#aaa]">
                <Star className="w-4 h-4 text-[#BFFF00]" />
                <span>100% Gratis</span>
              </div>
            </div>

            <Link
              href="/courses/vibe-coding-101"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#BFFF00] text-black font-bold rounded-full hover:bg-[#d4ff4d] transition-all hover:scale-105 hover:shadow-[0_0_40px_rgba(191,255,0,0.3)]"
            >
              <Play className="w-4 h-4" />
              Mulai Belajar Sekarang
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </header>

        <div className="max-w-5xl mx-auto px-6">
          {/* Section: Apa Itu Vibe Coding */}
          <article className="py-16 border-t border-[#1a1a1a]">
            <h2
              className="text-3xl sm:text-4xl font-bold text-white mb-6"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Apa Itu <span className="text-[#BFFF00]">Vibe Coding</span>?
            </h2>
            <div className="prose-custom space-y-4 text-[#ccc] leading-relaxed">
              <p className="text-lg">
                <strong className="text-white">Vibe coding</strong> adalah paradigma pemrograman baru 
                di mana kamu mendeskripsikan apa yang ingin dibuat dalam bahasa sehari-hari, 
                lalu <strong className="text-white">AI yang menuliskan kodenya</strong>. Kamu fokus ke ide 
                dan visi, AI handle implementasi teknis.
              </p>
              <p>
                Istilah ini dipopulerkan oleh <strong className="text-white">Andrej Karpathy</strong> — 
                mantan pemimpin AI di Tesla dan co-founder OpenAI — pada awal 2025. 
                Ia menggambarkan vibe coding sebagai &ldquo;fully giving in to the vibes&rdquo;, 
                di mana developer melupakan detail syntax dan fokus ke esensi ide.
              </p>
              <p>
                Prosesnya sederhana: <strong className="text-white">Describe → Generate → Test → Refine</strong>. 
                Kamu tulis instruksi (&ldquo;prompt&rdquo;) ke AI, AI generate kode, kamu test hasilnya, 
                lalu refine sampai sesuai keinginan. Loop ini terus berulang sampai project selesai.
              </p>

              {/* Comparison box */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
                <div className="bg-[#111] rounded-xl border border-[#1a1a1a] p-6">
                  <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                    <Code2 className="w-5 h-5 text-[#888]" />
                    Coding Tradisional
                  </h3>
                  <ul className="space-y-2 text-sm text-[#888]">
                    <li>✍️ Tulis kode manual baris per baris</li>
                    <li>📚 Perlu hafal syntax dan API</li>
                    <li>🐛 Debug manual yang memakan waktu</li>
                    <li>⏰ Berminggu-minggu untuk MVP</li>
                  </ul>
                </div>
                <div className="bg-[#111] rounded-xl border border-[#BFFF00]/20 p-6">
                  <h3 className="text-[#BFFF00] font-bold mb-3 flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    Vibe Coding
                  </h3>
                  <ul className="space-y-2 text-sm text-[#ccc]">
                    <li>💬 Deskripsikan ide dalam bahasa manusia</li>
                    <li>🤖 AI generate kode yang ready-to-run</li>
                    <li>⚡ AI bantu debug dan optimasi</li>
                    <li>🚀 MVP dalam hitungan jam</li>
                  </ul>
                </div>
              </div>

              <p>
                Di tahun 2026, vibe coding sudah menjadi standar untuk prototyping di banyak startup. 
                Survei terbaru menunjukkan lebih dari 70% developer menggunakan AI coding tools setiap hari. 
                Ini bukan tren sesaat — ini adalah cara baru ngoding yang akan terus berkembang.
              </p>
            </div>
          </article>

          {/* Section: Kenapa Belajar Vibe Coding */}
          <section className="py-16 border-t border-[#1a1a1a]">
            <h2
              className="text-3xl sm:text-4xl font-bold text-white mb-6"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Kenapa Harus Belajar <span className="text-[#BFFF00]">Vibe Coding</span> Sekarang?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  icon: <Zap className="w-5 h-5" />,
                  title: "Produktivitas 5-10x Lipat",
                  desc: "AI handle boilerplate code. Kamu fokus ke logic dan kreativitas. Dari berminggu-minggu jadi berjam-jam.",
                },
                {
                  icon: <Users className="w-5 h-5" />,
                  title: "Accessible untuk Semua",
                  desc: "Pemula tanpa background coding bisa bangun MVP. Non-developer jadi bisa bikin tools sendiri.",
                },
                {
                  icon: <Globe className="w-5 h-5" />,
                  title: "Skill Masa Depan",
                  desc: "Prediksi 70% developer pakai vibe coding di 2027. Belajar sekarang = headstart karir kamu.",
                },
                {
                  icon: <Terminal className="w-5 h-5" />,
                  title: "Portfolio Cepat",
                  desc: "Bikin portfolio impresif dengan cepat. Website, app, tools — semua bisa dibuat pakai AI.",
                },
                {
                  icon: <Star className="w-5 h-5" />,
                  title: "Gratis & Bahasa Indonesia",
                  desc: "Semua resource di VIBENGODING.ID gratis. Penjelasan dalam bahasa Indonesia yang mudah dipahami.",
                },
                {
                  icon: <Sparkles className="w-5 h-5" />,
                  title: "Fun & Engaging",
                  desc: "Vibe coding itu seru! Langsung lihat hasil, instant gratification. Coding jadi hobby, bukan beban.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-[#111] rounded-xl border border-[#1a1a1a] p-6 hover:border-[#333] transition-all"
                >
                  <div className="w-10 h-10 rounded-lg bg-[#BFFF00]/10 text-[#BFFF00] flex items-center justify-center mb-4">
                    {item.icon}
                  </div>
                  <h3 className="text-white font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-[#888] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section: 4 Steps */}
          <section className="py-16 border-t border-[#1a1a1a]">
            <h2
              className="text-3xl sm:text-4xl font-bold text-white mb-4"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Cara Mulai Belajar Vibe Coding
            </h2>
            <p className="text-[#888] text-lg mb-10 max-w-2xl">
              4 langkah dari nol sampai deploy website pertamamu. Ikuti step by step, selesai dalam satu hari.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {steps.map((step) => (
                <div
                  key={step.num}
                  className="relative bg-[#111] rounded-xl border border-[#1a1a1a] p-6 hover:border-[#333] transition-all"
                >
                  <span
                    className="text-4xl font-extrabold absolute top-4 right-4 opacity-10"
                    style={{ fontFamily: "'Syne', sans-serif", color: step.color }}
                  >
                    {step.num}
                  </span>
                  <span
                    className="text-xs font-mono font-bold"
                    style={{ color: step.color }}
                  >
                    STEP {step.num}
                  </span>
                  <h3 className="text-xl font-bold text-white mt-2 mb-3" style={{ fontFamily: "'Syne', sans-serif" }}>
                    {step.title}
                  </h3>
                  <p className="text-sm text-[#888] leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Tools */}
          <section className="py-16 border-t border-[#1a1a1a]">
            <h2
              className="text-3xl sm:text-4xl font-bold text-white mb-4"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Tools yang Dibutuhkan
            </h2>
            <p className="text-[#888] text-lg mb-10 max-w-2xl">
              Semua tools ini gratis atau punya free tier yang cukup untuk belajar dan bikin project.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#111] text-left">
                    <th className="px-4 py-3 text-[#BFFF00] font-mono font-medium border-b border-[#1a1a1a]">Tool</th>
                    <th className="px-4 py-3 text-[#BFFF00] font-mono font-medium border-b border-[#1a1a1a]">Fungsi</th>
                    <th className="px-4 py-3 text-[#BFFF00] font-mono font-medium border-b border-[#1a1a1a]">Harga</th>
                  </tr>
                </thead>
                <tbody className="text-[#ccc]">
                  {[
                    ["Cursor", "AI Code Editor — tulis kode dengan bantuan AI", "Free tier tersedia"],
                    ["Claude / ChatGPT", "AI Assistant untuk prompt engineering", "Free tier tersedia"],
                    ["Node.js", "JavaScript runtime (wajib untuk Next.js)", "Gratis & Open Source"],
                    ["Next.js", "React framework untuk full-stack web", "Gratis & Open Source"],
                    ["Tailwind CSS", "Utility-first CSS framework", "Gratis & Open Source"],
                    ["Vercel", "Platform deploy website", "Gratis untuk personal"],
                    ["GitHub", "Version control & kolaborasi", "Gratis"],
                    ["VS Code", "Alternatif code editor", "Gratis & Open Source"],
                  ].map(([tool, fungsi, harga], i) => (
                    <tr key={i} className="border-b border-[#0d0d0d] hover:bg-[#111]/50">
                      <td className="px-4 py-3 text-white font-medium">{tool}</td>
                      <td className="px-4 py-3">{fungsi}</td>
                      <td className="px-4 py-3">
                        <span className="text-xs px-2 py-1 rounded-full bg-[#BFFF00]/10 text-[#BFFF00]">
                          {harga}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Section: Learning Path / Courses */}
          <section className="py-16 border-t border-[#1a1a1a]">
            <h2
              className="text-3xl sm:text-4xl font-bold text-white mb-4"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Learning Path: <span className="text-[#BFFF00]">6 Courses Gratis</span>
            </h2>
            <p className="text-[#888] text-lg mb-10 max-w-2xl">
              Ikuti urutan ini untuk hasil terbaik. Setiap course bisa diakses langsung tanpa signup.
            </p>

            <div className="space-y-4">
              {courseSummaries.map((course, i) => (
                <Link
                  key={course.slug}
                  href={`/courses/${course.slug}`}
                  className="group flex items-center gap-5 bg-[#111] rounded-xl border border-[#1a1a1a] p-5 hover:border-[#333] hover:bg-[#151515] transition-all"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${course.color}15`, color: course.color }}
                  >
                    {course.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-xs font-mono text-[#555]">#{i + 1}</span>
                      <h3 className="text-white font-bold truncate" style={{ fontFamily: "'Syne', sans-serif" }}>
                        {course.title}
                      </h3>
                      <span className="hidden sm:inline text-xs px-2 py-0.5 rounded-full bg-[#1a1a1a] text-[#888]">
                        {course.level}
                      </span>
                    </div>
                    <p className="text-sm text-[#888] truncate">{course.desc}</p>
                  </div>
                  <div className="hidden md:flex items-center gap-4 text-xs text-[#666] flex-shrink-0">
                    <span>{course.lessons} lessons</span>
                    <span>{course.duration}</span>
                  </div>
                  <ArrowRight
                    className="w-4 h-4 text-[#555] group-hover:text-white group-hover:translate-x-1 transition-all flex-shrink-0"
                  />
                </Link>
              ))}
            </div>
          </section>

          {/* Section: What You'll Learn */}
          <section className="py-16 border-t border-[#1a1a1a]">
            <h2
              className="text-3xl sm:text-4xl font-bold text-white mb-8"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Yang Akan Kamu Kuasai
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "Setup development environment lengkap",
                "Prompt engineering untuk coding yang efektif",
                "HTML, CSS, JavaScript, dan TypeScript dasar",
                "React dan Next.js App Router",
                "Tailwind CSS untuk styling modern",
                "Membuat website responsive dari nol",
                "Animasi UI dengan Motion / Framer Motion",
                "Database dan API dengan Prisma",
                "Authentication (login/register)",
                "Full-stack CRUD operations",
                "Deploy ke Vercel dan custom domain",
                "Git, GitHub, dan version control",
                "Cursor dan GitHub Copilot pro tips",
                "CI/CD dan Docker basics",
                "Design system dan UI polishing",
                "Best practices vibe coding production",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#BFFF00] flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-[#ccc]">{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ Section */}
          <div className="border-t border-[#1a1a1a]">
            <FaqSection />
          </div>

          {/* Final CTA */}
          <section className="py-20 border-t border-[#1a1a1a] text-center">
            <h2
              className="text-3xl sm:text-5xl font-bold text-white mb-6"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Siap Mulai <span className="text-[#BFFF00] glow-text">Vibe Coding</span>?
            </h2>
            <p className="text-[#888] text-lg mb-10 max-w-lg mx-auto">
              Gratis selamanya, bahasa Indonesia, langsung praktek. Course pertama bisa selesai dalam 3 jam.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/courses/vibe-coding-101"
                className="inline-flex items-center gap-2 px-10 py-5 bg-[#BFFF00] text-black font-bold text-lg rounded-full hover:bg-[#d4ff4d] transition-all hover:scale-105 hover:shadow-[0_0_60px_rgba(191,255,0,0.3)]"
              >
                <Zap className="w-5 h-5" />
                Mulai Course Pertama
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/courses"
                className="inline-flex items-center gap-2 px-8 py-4 border border-[#333] text-white font-medium rounded-full hover:border-[#BFFF00]/50 hover:bg-[#BFFF00]/5 transition-all"
              >
                Lihat Semua Courses
              </Link>
            </div>
          </section>
        </div>

        {/* Footer mini */}
        <footer className="border-t border-[#1a1a1a] py-8">
          <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#444]">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-[#BFFF00] flex items-center justify-center">
                <Zap className="w-3 h-3 text-black" />
              </div>
              <span className="font-bold" style={{ fontFamily: "'Syne', sans-serif" }}>
                VIBENGODING<span className="text-[#BFFF00]">.ID</span>
              </span>
            </div>
            <p>© {new Date().getFullYear()} VIBENGODING.ID — Semua courses gratis selamanya.</p>
          </div>
        </footer>
      </main>
    </>
  );
}
