import type { Metadata } from "next";
import { getCourseBySlug, courses } from "@/lib/courses-data";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  Clock,
  CheckCircle2,
  AlertCircle,
  Play,
  ChevronRight,
} from "lucide-react";

const siteUrl = "https://vibengoding.id";

// Generate static params for SSG
export function generateStaticParams() {
  return courses.map((course) => ({
    slug: course.slug,
  }));
}

// Dynamic metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourseBySlug(slug);

  if (!course) return { title: "Course Not Found" };

  return {
    title: `${course.title} — ${course.subtitle} | Course Gratis`,
    description: `${course.longDescription} ${course.lessons.length} lessons, ${course.totalDuration}. Gratis, bahasa Indonesia.`,
    alternates: {
      canonical: `${siteUrl}/courses/${slug}`,
    },
    openGraph: {
      title: `${course.title} — ${course.subtitle}`,
      description: course.description,
      url: `${siteUrl}/courses/${slug}`,
      type: "article",
    },
  };
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);

  if (!course) return notFound();

  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: `${course.title} — ${course.subtitle}`,
    description: course.longDescription,
    provider: { "@type": "Organization", name: "VIBENGODING.ID", url: siteUrl },
    url: `${siteUrl}/courses/${slug}`,
    isAccessibleForFree: true,
    inLanguage: "id",
    courseMode: "online",
    educationalLevel: course.level === "Pemula" ? "Beginner" : course.level === "Menengah" ? "Intermediate" : "AllLevels",
    numberOfLessons: course.lessons.length,
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "online",
      courseWorkload: course.totalDuration,
    },
    offers: { "@type": "Offer", price: "0", priceCurrency: "IDR", availability: "https://schema.org/InStock" },
    syllabusSections: course.lessons.map((l, i) => ({
      "@type": "Syllabus",
      name: `Lesson ${i + 1}: ${l.title}`,
      timeRequired: l.duration,
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: "Courses", item: `${siteUrl}/courses` },
      { "@type": "ListItem", position: 3, name: course.title, item: `${siteUrl}/courses/${slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
    <main className="min-h-screen">
      {/* Breadcrumb */}
      <div className="border-b border-[#1a1a1a]">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center gap-4 text-sm">
          <Link
            href="/"
            className="text-[#888] hover:text-white transition-colors"
          >
            Home
          </Link>
          <span className="text-[#333]">/</span>
          <Link
            href="/courses"
            className="text-[#888] hover:text-white transition-colors"
          >
            Courses
          </Link>
          <span className="text-[#333]">/</span>
          <span className="text-white font-medium">{course.title}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <span
                  className="text-xs px-3 py-1 rounded-full font-mono border"
                  style={{
                    backgroundColor: `${course.color}10`,
                    color: course.color,
                    borderColor: `${course.color}30`,
                  }}
                >
                  {course.level}
                </span>
                <span className="text-xs text-[#888] flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {course.totalDuration}
                </span>
                <span className="text-xs text-[#888] flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5" />
                  {course.lessons.length} lessons
                </span>
              </div>

              <h1
                className="text-3xl sm:text-4xl font-bold text-white mb-2"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                {course.title}
              </h1>
              <p className="text-sm font-mono" style={{ color: course.color }}>
                {course.subtitle}
              </p>
              <p className="text-[#888] mt-4 leading-relaxed text-lg">
                {course.longDescription}
              </p>
            </div>

            {/* What You'll Learn */}
            <div className="bg-[#111] rounded-2xl border border-[#1a1a1a] p-6 sm:p-8 mb-8">
              <h2
                className="text-xl font-bold text-white mb-6"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Yang Akan Kamu Pelajari
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {course.whatYoullLearn.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2
                      className="w-5 h-5 mt-0.5 flex-shrink-0"
                      style={{ color: course.color }}
                    />
                    <span className="text-sm text-[#ccc]">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Prerequisites */}
            <div className="bg-[#111] rounded-2xl border border-[#1a1a1a] p-6 sm:p-8 mb-8">
              <h2
                className="text-xl font-bold text-white mb-6"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Prerequisites
              </h2>
              <div className="space-y-3">
                {course.prerequisites.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0 text-[#888]" />
                    <span className="text-sm text-[#ccc]">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Lesson List */}
            <div>
              <h2
                className="text-xl font-bold text-white mb-6"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                Daftar Lesson ({course.lessons.length})
              </h2>
              <div className="space-y-2">
                {course.lessons.map((lesson, index) => (
                  <Link
                    key={lesson.id}
                    href={`/courses/${course.slug}/${lesson.id}`}
                    className="group flex items-center gap-4 p-4 bg-[#111] rounded-xl border border-[#1a1a1a] hover:border-[#333] hover:bg-[#151515] transition-all"
                  >
                    {/* Number */}
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0"
                      style={{
                        backgroundColor: `${course.color}10`,
                        color: course.color,
                      }}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-white group-hover:text-[#E50914] transition-colors truncate">
                        {lesson.title}
                      </h3>
                      <span className="text-xs text-[#666] flex items-center gap-1 mt-1">
                        <Clock className="w-3 h-3" />
                        {lesson.duration}
                      </span>
                    </div>

                    {/* Play icon */}
                    <Play
                      className="w-4 h-4 text-[#555] group-hover:text-white transition-colors flex-shrink-0"
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              {/* CTA Card */}
              <div
                className="rounded-2xl border overflow-hidden"
                style={{ borderColor: `${course.color}30` }}
              >
                <div
                  className="h-2 w-full"
                  style={{
                    background: `linear-gradient(90deg, ${course.color}, transparent)`,
                  }}
                />
                <div className="bg-[#111] p-6">
                  <div className="text-center mb-6">
                    <span
                      className="text-4xl font-bold"
                      style={{
                        fontFamily: "'Syne', sans-serif",
                        color: course.color,
                      }}
                    >
                      FREE
                    </span>
                    <p className="text-sm text-[#666] mt-1">
                      Gratis selamanya. No strings attached.
                    </p>
                  </div>

                  <Link
                    href={`/courses/${course.slug}/1`}
                    className="w-full flex items-center justify-center gap-2 px-6 py-4 font-bold rounded-full transition-all hover:scale-105"
                    style={{
                      backgroundColor: course.color,
                      color: "#000",
                    }}
                  >
                    <Play className="w-4 h-4" />
                    Mulai Belajar
                    <ChevronRight className="w-4 h-4" />
                  </Link>

                  <div className="mt-6 space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#888]">Lessons</span>
                      <span className="text-white font-medium">
                        {course.lessons.length}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#888]">Durasi Total</span>
                      <span className="text-white font-medium">
                        {course.totalDuration}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#888]">Level</span>
                      <span className="text-white font-medium">
                        {course.level}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#888]">Bahasa</span>
                      <span className="text-white font-medium">Indonesia</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-[#1a1a1a]">
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
                </div>
              </div>

              {/* Back link */}
              <Link
                href="/courses"
                className="mt-4 flex items-center gap-2 text-sm text-[#666] hover:text-white transition-colors justify-center"
              >
                <ArrowLeft className="w-4 h-4" />
                Lihat semua courses
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
    </>
  );
}
