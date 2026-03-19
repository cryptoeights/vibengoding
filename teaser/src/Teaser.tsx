import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Sequence,
} from "remotion";

/* ─── Helpers ────────────────────────────────────────── */
const FONT_SYNE = "'Syne', sans-serif";
const FONT_SPACE = "'Space Grotesk', sans-serif";
const FONT_MONO = "'JetBrains Mono', monospace";
const RED = "#E50914";
const BG = "#050505";

const fontLink =
  "https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Space+Grotesk:wght@400;500;600;700&family=Syne:wght@600;700;800&display=swap";

/* ─── Scene 1: Logo Reveal (0–90 frames = 0–3s) ─────── */
const SceneLogo: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({ fps, frame: frame - 10, config: { damping: 12, stiffness: 120 } });
  const textOpacity = interpolate(frame, [40, 60], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const textY = interpolate(frame, [40, 60], [30, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const tagOpacity = interpolate(frame, [60, 80], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Glow pulse
  const glowOpacity = interpolate(frame, [20, 50, 80], [0, 0.6, 0.3], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: BG, justifyContent: "center", alignItems: "center" }}>
      {/* Red glow behind logo */}
      <div
        style={{
          position: "absolute",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: RED,
          filter: "blur(120px)",
          opacity: glowOpacity,
        }}
      />

      {/* Logo V */}
      <div
        style={{
          width: 140,
          height: 140,
          borderRadius: 32,
          backgroundColor: RED,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transform: `scale(${logoScale})`,
          boxShadow: `0 0 80px ${RED}66`,
        }}
      >
        <span
          style={{
            color: "white",
            fontSize: 80,
            fontWeight: 800,
            fontFamily: FONT_SYNE,
            lineHeight: 1,
          }}
        >
          V
        </span>
      </div>

      {/* Brand name */}
      <div
        style={{
          position: "absolute",
          bottom: "32%",
          opacity: textOpacity,
          transform: `translateY(${textY}px)`,
          textAlign: "center",
        }}
      >
        <span
          style={{
            fontSize: 52,
            fontWeight: 700,
            fontFamily: FONT_SYNE,
            color: "white",
            letterSpacing: 3,
          }}
        >
          VIBENGODING
        </span>
        <span
          style={{
            fontSize: 52,
            fontWeight: 700,
            fontFamily: FONT_SYNE,
            color: RED,
            letterSpacing: 3,
          }}
        >
          .ID
        </span>
      </div>

      {/* Tagline */}
      <div
        style={{
          position: "absolute",
          bottom: "25%",
          opacity: tagOpacity,
          fontSize: 24,
          fontFamily: FONT_SPACE,
          color: "#888",
          letterSpacing: 1,
        }}
      >
        Belajar Vibe Coding Gratis untuk Developer Indonesia
      </div>
    </AbsoluteFill>
  );
};

/* ─── Scene 2: "What is Vibe Coding?" (90–180 = 3–6s) ── */
const SceneWhatIs: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleScale = spring({ fps, frame: frame - 5, config: { damping: 14 } });
  const descOpacity = interpolate(frame, [25, 45], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const descY = interpolate(frame, [25, 45], [20, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Terminal typing effect
  const termText = "→ ~ npx vibengoding";
  const visibleChars = Math.min(termText.length, Math.floor(interpolate(frame, [40, 75], [0, termText.length], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })));
  const cursor = frame % 16 < 8 ? "█" : "";

  return (
    <AbsoluteFill style={{ backgroundColor: BG, justifyContent: "center", alignItems: "center" }}>
      {/* Glow */}
      <div style={{ position: "absolute", width: 500, height: 300, borderRadius: "50%", background: RED, filter: "blur(200px)", opacity: 0.08 }} />

      <div style={{ textAlign: "center" }}>
        <div style={{ transform: `scale(${titleScale})`, marginBottom: 20 }}>
          <span style={{ fontSize: 64, fontWeight: 800, fontFamily: FONT_SYNE, color: "white" }}>Apa Itu </span>
          <span style={{ fontSize: 64, fontWeight: 800, fontFamily: FONT_SYNE, color: RED, fontStyle: "italic" }}>Vibe Coding</span>
          <span style={{ fontSize: 64, fontWeight: 800, fontFamily: FONT_SYNE, color: "white" }}>?</span>
        </div>

        <div style={{ opacity: descOpacity, transform: `translateY(${descY}px)`, fontSize: 28, fontFamily: FONT_SPACE, color: "#aaa", maxWidth: 800, lineHeight: 1.6 }}>
          Lu ngobrol sama AI. AI yang ngetik kode-nya.
        </div>

        {/* Terminal mock */}
        <div
          style={{
            marginTop: 50,
            background: "#111",
            borderRadius: 16,
            border: "1px solid #222",
            padding: "20px 30px",
            display: "inline-block",
            opacity: interpolate(frame, [35, 50], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" }),
          }}
        >
          <span style={{ fontFamily: FONT_MONO, fontSize: 22, color: RED }}>{termText.slice(0, visibleChars)}</span>
          <span style={{ fontFamily: FONT_MONO, fontSize: 22, color: RED }}>{cursor}</span>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* ─── Scene 3: Course List (180–300 = 6–10s) ─────────── */
const courses = [
  { emoji: "🚀", name: "Vibe Coding 101", sub: "Dari Nol Sampai Deploy" },
  { emoji: "🎨", name: "AI-Powered Frontend", sub: "Build UI dengan AI" },
  { emoji: "⚡", name: "Full-Stack Vibes", sub: "Backend + Frontend + AI" },
  { emoji: "🧠", name: "Prompt Engineering Pro", sub: "Master Prompting" },
  { emoji: "📦", name: "Ship It! Deploy Guide", sub: "Local ke Production" },
  { emoji: "🤖", name: "Cursor & Copilot Mastery", sub: "AI Editor Pro Tips" },
];

const SceneCourses: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleOp = interpolate(frame, [0, 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: BG, justifyContent: "center", alignItems: "center" }}>
      <div style={{ position: "absolute", width: 600, height: 400, borderRadius: "50%", background: RED, filter: "blur(250px)", opacity: 0.06 }} />

      <div style={{ textAlign: "center", width: "100%" }}>
        <div style={{ opacity: titleOp, marginBottom: 50 }}>
          <span style={{ fontSize: 52, fontWeight: 800, fontFamily: FONT_SYNE, color: "white" }}>6 Courses. </span>
          <span style={{ fontSize: 52, fontWeight: 800, fontFamily: FONT_SYNE, color: RED }}>100% Gratis.</span>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 20, padding: "0 100px" }}>
          {courses.map((c, i) => {
            const delay = 15 + i * 10;
            const itemScale = spring({ fps, frame: frame - delay, config: { damping: 14, stiffness: 100 } });
            const itemOp = interpolate(frame, [delay, delay + 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

            return (
              <div
                key={i}
                style={{
                  background: "#111",
                  border: "1px solid #1a1a1a",
                  borderRadius: 16,
                  padding: "20px 28px",
                  width: 480,
                  textAlign: "left",
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  transform: `scale(${itemScale})`,
                  opacity: itemOp,
                }}
              >
                <span style={{ fontSize: 32 }}>{c.emoji}</span>
                <div>
                  <div style={{ fontSize: 22, fontWeight: 700, fontFamily: FONT_SYNE, color: "white" }}>{c.name}</div>
                  <div style={{ fontSize: 16, fontFamily: FONT_SPACE, color: "#666", marginTop: 2 }}>{c.sub}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* ─── Scene 4: Features (300–380 = 10–12.7s) ────────── */
const features = [
  "60+ Lessons Bahasa Indonesia",
  "Gratis Selamanya — No Paywall",
  "Dari Setup sampe Deploy",
  "Prompt Engineering → Full-Stack",
];

const SceneFeatures: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ backgroundColor: BG, justifyContent: "center", alignItems: "center" }}>
      <div style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", background: RED, filter: "blur(200px)", opacity: 0.07 }} />

      <div style={{ textAlign: "left", padding: "0 200px" }}>
        {features.map((f, i) => {
          const delay = 5 + i * 15;
          const s = spring({ fps, frame: frame - delay, config: { damping: 14 } });
          const op = interpolate(frame, [delay, delay + 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
          const x = interpolate(frame, [delay, delay + 15], [-40, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

          return (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 20,
                marginBottom: 30,
                opacity: op,
                transform: `translateX(${x}px) scale(${s})`,
              }}
            >
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  backgroundColor: RED,
                  boxShadow: `0 0 20px ${RED}`,
                  flexShrink: 0,
                }}
              />
              <span style={{ fontSize: 38, fontWeight: 600, fontFamily: FONT_SPACE, color: "white" }}>{f}</span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

/* ─── Scene 5: CTA (380–450 = 12.7–15s) ─────────────── */
const SceneCTA: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({ fps, frame: frame - 5, config: { damping: 10, stiffness: 80 } });
  const urlScale = spring({ fps, frame: frame - 20, config: { damping: 12 } });
  const ctaOp = interpolate(frame, [35, 50], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Pulsing glow
  const pulse = interpolate(frame % 30, [0, 15, 30], [0.15, 0.35, 0.15]);

  return (
    <AbsoluteFill style={{ backgroundColor: BG, justifyContent: "center", alignItems: "center" }}>
      {/* Big pulsing glow */}
      <div style={{ position: "absolute", width: 600, height: 600, borderRadius: "50%", background: RED, filter: "blur(200px)", opacity: pulse }} />

      <div style={{ textAlign: "center" }}>
        {/* Logo */}
        <div
          style={{
            width: 120,
            height: 120,
            borderRadius: 28,
            backgroundColor: RED,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            transform: `scale(${logoScale})`,
            margin: "0 auto 40px",
            boxShadow: `0 0 100px ${RED}88`,
          }}
        >
          <span style={{ color: "white", fontSize: 70, fontWeight: 800, fontFamily: FONT_SYNE }}>V</span>
        </div>

        {/* URL */}
        <div style={{ transform: `scale(${urlScale})`, marginBottom: 24 }}>
          <span style={{ fontSize: 72, fontWeight: 800, fontFamily: FONT_SYNE, color: "white", letterSpacing: 2 }}>vibengoding</span>
          <span style={{ fontSize: 72, fontWeight: 800, fontFamily: FONT_SYNE, color: RED, letterSpacing: 2 }}>.id</span>
        </div>

        {/* CTA */}
        <div style={{ opacity: ctaOp }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              padding: "18px 48px",
              backgroundColor: RED,
              borderRadius: 999,
              boxShadow: `0 0 60px ${RED}66`,
            }}
          >
            <span style={{ fontSize: 28, fontWeight: 700, fontFamily: FONT_SPACE, color: "white" }}>Mulai Belajar — GRATIS</span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

/* ─── Main Composition ───────────────────────────────── */
export const VibengodingTeaser: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: BG }}>
      <link href={fontLink} rel="stylesheet" />

      {/* Scene 1: Logo Reveal (0-3s) */}
      <Sequence durationInFrames={90}>
        <SceneLogo />
      </Sequence>

      {/* Scene 2: What is Vibe Coding? (3-6s) */}
      <Sequence from={90} durationInFrames={90}>
        <SceneWhatIs />
      </Sequence>

      {/* Scene 3: 6 Courses (6-10s) */}
      <Sequence from={180} durationInFrames={120}>
        <SceneCourses />
      </Sequence>

      {/* Scene 4: Features (10-12.7s) */}
      <Sequence from={300} durationInFrames={80}>
        <SceneFeatures />
      </Sequence>

      {/* Scene 5: CTA (12.7-15s) */}
      <Sequence from={380} durationInFrames={70}>
        <SceneCTA />
      </Sequence>
    </AbsoluteFill>
  );
};
