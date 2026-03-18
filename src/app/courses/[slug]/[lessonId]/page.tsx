"use client";

import { getCourseBySlug, getLessonById } from "@/lib/courses-data";
import { notFound, useParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Clock,
  ChevronRight,
  List,
  X,
  CheckCircle2,
  Home,
} from "lucide-react";

/* ---- Simple Markdown-ish renderer ---- */
function MarkdownContent({ content }: { content: string }) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;
  let key = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Code blocks
    if (line.startsWith("```")) {
      const lang = line.slice(3).trim().split(" ")[0];
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // skip closing ```
      elements.push(
        <div key={key++} className="my-4 rounded-xl overflow-hidden border border-[#1a1a1a]">
          {lang && (
            <div className="px-4 py-2 bg-[#0a0a0a] text-xs text-[#666] font-mono border-b border-[#1a1a1a]">
              {lang}
            </div>
          )}
          <pre className="bg-[#0d0d0d] p-4 overflow-x-auto">
            <code className="text-sm font-mono text-[#ccc] leading-relaxed">
              {codeLines.join("\n")}
            </code>
          </pre>
        </div>
      );
      continue;
    }

    // Headings
    if (line.startsWith("# ")) {
      elements.push(
        <h1 key={key++} className="text-3xl sm:text-4xl font-bold text-white mt-8 mb-4" style={{ fontFamily: "'Syne', sans-serif" }}>
          {line.slice(2)}
        </h1>
      );
      i++;
      continue;
    }
    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={key++} className="text-2xl font-bold text-white mt-10 mb-4" style={{ fontFamily: "'Syne', sans-serif" }}>
          {line.slice(3)}
        </h2>
      );
      i++;
      continue;
    }
    if (line.startsWith("### ")) {
      elements.push(
        <h3 key={key++} className="text-xl font-bold text-white mt-8 mb-3" style={{ fontFamily: "'Syne', sans-serif" }}>
          {line.slice(4)}
        </h3>
      );
      i++;
      continue;
    }

    // Blockquote
    if (line.startsWith("> ")) {
      const quoteLines: string[] = [];
      while (i < lines.length && (lines[i].startsWith("> ") || lines[i].startsWith(">"))) {
        quoteLines.push(lines[i].replace(/^>\s?/, ""));
        i++;
      }
      elements.push(
        <blockquote
          key={key++}
          className="my-4 pl-4 border-l-2 border-[#BFFF00]/50 text-[#aaa] italic"
        >
          {quoteLines.map((ql, qi) => (
            <p key={qi} className="mb-1">
              {renderInline(ql)}
            </p>
          ))}
        </blockquote>
      );
      continue;
    }

    // Table
    if (line.includes("|") && lines[i + 1]?.includes("---")) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].includes("|")) {
        tableLines.push(lines[i]);
        i++;
      }
      const headers = tableLines[0]
        .split("|")
        .filter(Boolean)
        .map((h) => h.trim());
      const rows = tableLines.slice(2).map((row) =>
        row
          .split("|")
          .filter(Boolean)
          .map((c) => c.trim())
      );
      elements.push(
        <div key={key++} className="my-6 overflow-x-auto rounded-xl border border-[#1a1a1a]">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#111]">
                {headers.map((h, hi) => (
                  <th
                    key={hi}
                    className="text-left px-4 py-3 text-[#BFFF00] font-mono font-medium border-b border-[#1a1a1a]"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, ri) => (
                <tr key={ri} className="border-b border-[#0d0d0d] hover:bg-[#111]/50">
                  {row.map((cell, ci) => (
                    <td key={ci} className="px-4 py-3 text-[#ccc]">
                      {renderInline(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      continue;
    }

    // Unordered list
    if (line.startsWith("- ")) {
      const listItems: string[] = [];
      while (i < lines.length && lines[i].startsWith("- ")) {
        listItems.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <ul key={key++} className="my-3 space-y-2">
          {listItems.map((li, liIdx) => (
            <li key={liIdx} className="flex items-start gap-2 text-[#ccc] text-sm leading-relaxed">
              <span className="text-[#BFFF00] mt-1.5 text-xs">●</span>
              <span>{renderInline(li)}</span>
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // Ordered list
    if (/^\d+\.\s/.test(line)) {
      const listItems: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        listItems.push(lines[i].replace(/^\d+\.\s/, ""));
        i++;
      }
      elements.push(
        <ol key={key++} className="my-3 space-y-2">
          {listItems.map((li, liIdx) => (
            <li key={liIdx} className="flex items-start gap-3 text-[#ccc] text-sm leading-relaxed">
              <span className="text-[#BFFF00] font-mono font-bold text-xs mt-0.5 w-5 flex-shrink-0">
                {liIdx + 1}.
              </span>
              <span>{renderInline(li)}</span>
            </li>
          ))}
        </ol>
      );
      continue;
    }

    // Empty line
    if (line.trim() === "") {
      i++;
      continue;
    }

    // Paragraph
    elements.push(
      <p key={key++} className="text-[#ccc] text-sm sm:text-base leading-relaxed my-3">
        {renderInline(line)}
      </p>
    );
    i++;
  }

  return <div className="prose-custom">{elements}</div>;
}

function renderInline(text: string): React.ReactNode {
  // Process inline formatting: bold, code, italic, links
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let idx = 0;

  while (remaining.length > 0) {
    // Bold **text**
    const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
    // Inline code `text`
    const codeMatch = remaining.match(/`([^`]+)`/);
    // Links [text](url)
    const linkMatch = remaining.match(/\[([^\]]+)\]\(([^)]+)\)/);

    const matches = [
      boldMatch ? { type: "bold", match: boldMatch, index: boldMatch.index! } : null,
      codeMatch ? { type: "code", match: codeMatch, index: codeMatch.index! } : null,
      linkMatch ? { type: "link", match: linkMatch, index: linkMatch.index! } : null,
    ]
      .filter(Boolean)
      .sort((a, b) => a!.index - b!.index);

    if (matches.length === 0) {
      parts.push(remaining);
      break;
    }

    const first = matches[0]!;

    // Add text before match
    if (first.index > 0) {
      parts.push(remaining.slice(0, first.index));
    }

    if (first.type === "bold") {
      parts.push(
        <strong key={idx++} className="text-white font-semibold">
          {first.match![1]}
        </strong>
      );
      remaining = remaining.slice(first.index + first.match![0].length);
    } else if (first.type === "code") {
      parts.push(
        <code
          key={idx++}
          className="px-1.5 py-0.5 bg-[#1a1a1a] rounded text-[#BFFF00] text-xs font-mono"
        >
          {first.match![1]}
        </code>
      );
      remaining = remaining.slice(first.index + first.match![0].length);
    } else if (first.type === "link") {
      parts.push(
        <a
          key={idx++}
          href={first.match![2]}
          className="text-[#BFFF00] underline underline-offset-2 hover:text-[#d4ff4d] transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          {first.match![1]}
        </a>
      );
      remaining = remaining.slice(first.index + first.match![0].length);
    }
  }

  return <>{parts}</>;
}

/* ---- Main Component ---- */
export default function LessonPage() {
  const p = useParams();
  const slug = p.slug as string;
  const lessonId = p.lessonId as string;

  const course = getCourseBySlug(slug);
  if (!course) return notFound();

  const lesson = getLessonById(course, lessonId);
  if (!lesson) return notFound();

  const currentIndex = course.lessons.findIndex((l) => l.id === lessonId);
  const prevLesson = currentIndex > 0 ? course.lessons[currentIndex - 1] : null;
  const nextLesson =
    currentIndex < course.lessons.length - 1
      ? course.lessons[currentIndex + 1]
      : null;

  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Close sidebar on route change
  useEffect(() => {
    setSidebarOpen(false);
  }, [lessonId]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Bar */}
      <header className="sticky top-0 z-50 bg-[#050505]/90 backdrop-blur-xl border-b border-[#1a1a1a]">
        <div className="max-w-full mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 text-[#888] hover:text-white transition-colors"
            >
              <List className="w-5 h-5" />
            </button>
            <Link
              href={`/courses/${course.slug}`}
              className="flex items-center gap-2 text-sm text-[#888] hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">{course.title}</span>
            </Link>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#666]">
            <span className="hidden sm:inline">Lesson</span>
            <span className="font-mono text-white">
              {currentIndex + 1}/{course.lessons.length}
            </span>
            {/* Progress bar */}
            <div className="w-24 sm:w-32 h-1.5 bg-[#1a1a1a] rounded-full overflow-hidden ml-2">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${((currentIndex + 1) / course.lessons.length) * 100}%`,
                  backgroundColor: course.color,
                }}
              />
            </div>
          </div>

          <Link href="/" className="p-2 text-[#888] hover:text-white transition-colors">
            <Home className="w-4 h-4" />
          </Link>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar Overlay (mobile) */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/60 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`fixed lg:sticky top-[57px] left-0 z-40 h-[calc(100vh-57px)] w-72 bg-[#0a0a0a] border-r border-[#1a1a1a] overflow-y-auto transition-transform duration-300 
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
        >
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3
                className="text-sm font-bold text-white truncate"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                {course.title}
              </h3>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-1 text-[#888] hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-1">
              {course.lessons.map((l, idx) => {
                const isCurrent = l.id === lessonId;
                return (
                  <Link
                    key={l.id}
                    href={`/courses/${course.slug}/${l.id}`}
                    className={`flex items-start gap-3 px-3 py-2.5 rounded-lg text-xs transition-all ${
                      isCurrent
                        ? "bg-[#BFFF00]/10 text-[#BFFF00]"
                        : "text-[#888] hover:text-white hover:bg-[#111]"
                    }`}
                  >
                    <span
                      className={`font-mono font-bold mt-0.5 w-5 flex-shrink-0 ${
                        isCurrent ? "text-[#BFFF00]" : "text-[#555]"
                      }`}
                    >
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="leading-relaxed">{l.title}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          <article className="max-w-3xl mx-auto px-4 sm:px-8 py-8 sm:py-12">
            {/* Lesson Header */}
            <div className="mb-8 pb-8 border-b border-[#1a1a1a]">
              <span
                className="text-xs font-mono font-bold"
                style={{ color: course.color }}
              >
                LESSON {String(currentIndex + 1).padStart(2, "0")}
              </span>
              <h1
                className="text-2xl sm:text-3xl font-bold text-white mt-2"
                style={{ fontFamily: "'Syne', sans-serif" }}
              >
                {lesson.title}
              </h1>
              <div className="flex items-center gap-4 mt-3 text-xs text-[#666]">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {lesson.duration}
                </span>
                <span className="flex items-center gap-1">
                  <BookOpen className="w-3.5 h-3.5" />
                  {course.title}
                </span>
              </div>
            </div>

            {/* Content */}
            <MarkdownContent content={lesson.content} />

            {/* Navigation */}
            <div className="mt-16 pt-8 border-t border-[#1a1a1a] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              {prevLesson ? (
                <Link
                  href={`/courses/${course.slug}/${prevLesson.id}`}
                  className="group flex items-center gap-3 px-5 py-4 bg-[#111] rounded-xl border border-[#1a1a1a] hover:border-[#333] transition-all flex-1"
                >
                  <ArrowLeft className="w-4 h-4 text-[#888] group-hover:text-white transition-colors flex-shrink-0" />
                  <div className="min-w-0">
                    <span className="text-xs text-[#666]">Sebelumnya</span>
                    <p className="text-sm text-white font-medium truncate">
                      {prevLesson.title}
                    </p>
                  </div>
                </Link>
              ) : (
                <div />
              )}

              {nextLesson ? (
                <Link
                  href={`/courses/${course.slug}/${nextLesson.id}`}
                  className="group flex items-center justify-end gap-3 px-5 py-4 bg-[#111] rounded-xl border border-[#1a1a1a] hover:border-[#333] transition-all flex-1"
                >
                  <div className="min-w-0 text-right">
                    <span className="text-xs text-[#666]">Selanjutnya</span>
                    <p className="text-sm text-white font-medium truncate">
                      {nextLesson.title}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#888] group-hover:text-white transition-colors flex-shrink-0" />
                </Link>
              ) : (
                <Link
                  href="/courses"
                  className="group flex items-center justify-end gap-3 px-5 py-4 rounded-xl border transition-all flex-1"
                  style={{
                    backgroundColor: `${course.color}10`,
                    borderColor: `${course.color}30`,
                  }}
                >
                  <div className="min-w-0 text-right">
                    <span className="text-xs text-[#888]">🎉 Course selesai!</span>
                    <p
                      className="text-sm font-medium"
                      style={{ color: course.color }}
                    >
                      Lihat course lainnya
                    </p>
                  </div>
                  <CheckCircle2
                    className="w-5 h-5 flex-shrink-0"
                    style={{ color: course.color }}
                  />
                </Link>
              )}
            </div>
          </article>
        </main>
      </div>
    </div>
  );
}
