import type { Metadata } from "next";
import { courses } from "@/lib/courses-data";
import Link from "next/link";
import {
  BookOpen,
  Clock,
  ChevronRight,
  ArrowLeft,
  Sparkles,
  Palette,
  Layers,
  Bot,
  Globe,
  MousePointer2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Semua Course Vibe Coding Gratis — 6 Courses, 60+ Lessons",
  description:
    "Daftar semua course vibe coding gratis di VIBENGODING.ID. Dari pemula sampai advanced: Vibe Coding 101, AI-Powered Frontend, Full-Stack, Prompt Engineering, Deploy Guide, Cursor & Copilot. Bahasa Indonesia.",
  alternates: {
    canonical: "https://vibengoding.id/courses",
  },
  openGraph: {
    title: "Semua Course Vibe Coding Gratis — VIBENGODING.ID",
    description: "6 courses, 60+ lessons vibe coding gratis bahasa Indonesia. Dari nol sampai deploy.",
    url: "https://vibengoding.id/courses",
  },
};

const iconMap: Record<number, React.ReactNode> = {
  1: <Sparkles className="w-5 h-5" />,
  2: <Palette className="w-5 h-5" />,
  3: <Layers className="w-5 h-5" />,
  4: <Bot className="w-5 h-5" />,
  5: <Globe className="w-5 h-5" />,
  6: <MousePointer2 className="w-5 h-5" />,
};

export default function CoursesPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://vibengoding.id" },
      { "@type": "ListItem", position: 2, name: "Courses", item: "https://vibengoding.id/courses" },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <main className="min-h-screen">
        {/* Header */}
        <div className="border-b border-[#1a1a1a]">
          <div className="max-w-7xl mx-auto px-6 py-6 flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm text-[#888] hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Home
            </Link>
            <span className="text-[#333]">/</span>
            <span className="text-white text-sm font-medium">Courses</span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-16">
          {/* Title */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#BFFF00]/10 border border-[#BFFF00]/20 text-[#BFFF00] text-xs font-mono mb-4">
              <BookOpen className="w-3.5 h-3.5" />
              {courses.length} COURSES AVAILABLE
            </div>
            <h1
              className="text-4xl sm:text-5xl font-bold text-white mb-4"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Semua Course Vibe Coding
            </h1>
            <p className="text-[#888] text-lg max-w-xl mx-auto">
              Pilih course yang sesuai dengan level kamu. Semuanya gratis, tanpa
              batas waktu, bahasa Indonesia.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <Link
                key={course.id}
                href={`/courses/${course.slug}`}
                className="group relative bg-[#111] rounded-2xl border border-[#1a1a1a] overflow-hidden hover:border-[#333] transition-all duration-500 hover:-translate-y-1"
              >
                {/* Top accent */}
                <div
                  className="h-[2px] w-full"
                  style={{
                    background: `linear-gradient(90deg, ${course.color}, transparent)`,
                  }}
                />

                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{
                        backgroundColor: `${course.color}15`,
                        color: course.color,
                      }}
                    >
                      {iconMap[course.id]}
                    </div>
                    <span className="text-xs px-3 py-1 rounded-full bg-[#1a1a1a] text-[#888] border border-[#222]">
                      {course.level}
                    </span>
                  </div>

                  <h2
                    className="text-lg font-bold text-white mb-1"
                    style={{ fontFamily: "'Syne', sans-serif" }}
                  >
                    {course.title}
                  </h2>
                  <p className="text-xs text-[#666] mb-3 font-mono">
                    {course.subtitle}
                  </p>
                  <p className="text-sm text-[#888] leading-relaxed mb-4">
                    {course.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {course.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 rounded-md font-mono"
                        style={{
                          backgroundColor: `${course.color}10`,
                          color: course.color,
                        }}
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
                        {course.lessons.length} lessons
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {course.totalDuration}
                      </span>
                    </div>
                    <span
                      className="flex items-center gap-1 text-sm font-semibold group-hover:gap-2 transition-all"
                      style={{ color: course.color }}
                    >
                      Mulai
                      <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
