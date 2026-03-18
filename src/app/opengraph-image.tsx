import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "VIBENGODING.ID — Belajar Vibe Coding Gratis";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#050505",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Grid pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(191,255,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(191,255,0,0.05) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Glow */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            height: 600,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(191,255,0,0.08), transparent 70%)",
          }}
        />

        {/* Badge */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 24,
          }}
        >
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 12,
              background: "#E50914",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span style={{ color: "white", fontSize: 32, fontWeight: 800 }}>V</span>
          </div>
          <div
            style={{
              padding: "8px 20px",
              borderRadius: 100,
              background: "rgba(191,255,0,0.1)",
              border: "1px solid rgba(191,255,0,0.2)",
            }}
          >
            <span
              style={{
                color: "#BFFF00",
                fontSize: 18,
                fontWeight: 600,
              }}
            >
              100% FREE — BAHASA INDONESIA
            </span>
          </div>
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            color: "white",
            textAlign: "center",
            lineHeight: 1,
            marginBottom: 8,
          }}
        >
          Belajar
        </div>
        <div
          style={{
            fontSize: 82,
            fontWeight: 900,
            color: "#BFFF00",
            textAlign: "center",
            lineHeight: 1,
            marginBottom: 16,
            textShadow: "0 0 40px rgba(191,255,0,0.4)",
          }}
        >
          Vibe Coding
        </div>
        <div
          style={{
            fontSize: 32,
            color: "#888",
            textAlign: "center",
            lineHeight: 1.4,
            marginBottom: 32,
          }}
        >
          Gratis. Selamanya.
        </div>

        {/* Stats */}
        <div
          style={{
            display: "flex",
            gap: 48,
          }}
        >
          {[
            { val: "6", label: "Courses" },
            { val: "60+", label: "Lessons" },
            { val: "FREE", label: "Selamanya" },
          ].map((s) => (
            <div
              key={s.label}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontSize: 36,
                  fontWeight: 800,
                  color: "#BFFF00",
                }}
              >
                {s.val}
              </span>
              <span style={{ fontSize: 16, color: "#666" }}>{s.label}</span>
            </div>
          ))}
        </div>

        {/* URL */}
        <div
          style={{
            position: "absolute",
            bottom: 32,
            color: "#444",
            fontSize: 20,
            fontWeight: 600,
          }}
        >
          vibengoding.id
        </div>
      </div>
    ),
    { ...size }
  );
}
