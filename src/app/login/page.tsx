"use client"

import { signIn } from "next-auth/react"
import { useSearchParams } from "next/navigation"
import { motion } from "motion/react"
import { Lock, BookOpen, Wrench, Sparkles } from "lucide-react"
import { Suspense } from "react"

function LoginForm() {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get("callbackUrl") || "/"

  return (
    <div className="min-h-screen flex items-center justify-center grid-pattern relative overflow-hidden">
      {/* Ambient blobs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#E50914]/10 rounded-full blur-[120px] animate-float" />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-[#E50914]/5 rounded-full blur-[100px] animate-float" style={{ animationDelay: "3s" }} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        <div className="bg-[#111] rounded-2xl border border-[#1a1a1a] p-8 sm:p-10">
          {/* Logo */}
          <div className="flex flex-col items-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-[#E50914] flex items-center justify-center mb-4">
              <span className="text-white font-extrabold text-2xl" style={{ fontFamily: "'Syne', sans-serif" }}>V</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight" style={{ fontFamily: "'Syne', sans-serif" }}>
              VIBENGODING<span className="text-[#E50914]">.ID</span>
            </h1>
            <p className="text-[#888] text-sm mt-2 text-center">
              Login dulu untuk akses courses dan tools
            </p>
          </div>

          {/* Benefits */}
          <div className="bg-[#0a0a0a] rounded-xl border border-[#1a1a1a] p-4 mb-6 space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <BookOpen className="w-4 h-4 text-[#E50914] shrink-0" />
              <span className="text-[#aaa]">Akses <strong className="text-white">7 courses</strong> lengkap gratis</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Wrench className="w-4 h-4 text-[#E50914] shrink-0" />
              <span className="text-[#aaa]">Gunakan <strong className="text-white">developer tools</strong> siap pakai</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Sparkles className="w-4 h-4 text-[#E50914] shrink-0" />
              <span className="text-[#aaa]">Track <strong className="text-white">progress belajar</strong> kamu</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Lock className="w-4 h-4 text-[#E50914] shrink-0" />
              <span className="text-[#aaa]">100% <strong className="text-white">gratis selamanya</strong>, no paywall</span>
            </div>
          </div>

          {/* Google Sign In */}
          <button
            onClick={() => signIn("google", { callbackUrl })}
            className="w-full flex items-center justify-center gap-3 px-6 py-3.5 bg-white text-black font-semibold rounded-xl hover:bg-gray-100 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Masuk dengan Google
          </button>

          <p className="text-[10px] text-[#444] text-center mt-6 leading-relaxed">
            Dengan masuk, kamu setuju dengan ketentuan layanan kami.
            <br />Semua courses tetap gratis selamanya. 🎉
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#050505]">
        <div className="w-8 h-8 border-2 border-[#E50914] border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <LoginForm />
    </Suspense>
  )
}
