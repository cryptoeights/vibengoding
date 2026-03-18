"use client"

import { useSession } from "next-auth/react"
import { usePathname } from "next/navigation"
import { useEffect, useRef } from "react"

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void
  }
}

export function AnalyticsTracker() {
  const { data: session, status } = useSession()
  const pathname = usePathname()
  const hasTrackedLogin = useRef(false)

  // Set user_id when logged in
  useEffect(() => {
    if (status === "authenticated" && session?.user && typeof window.gtag === "function") {
      // Set user_id for GA4 (hashed email for privacy)
      const userId = session.user.id || session.user.email || ""
      window.gtag("config", "G-2JJHH40G92", {
        user_id: userId,
      })

      // Set user properties
      window.gtag("set", "user_properties", {
        user_name: session.user.name || "",
        user_email: session.user.email || "",
        login_provider: "google",
      })

      // Track login event (only once per session)
      if (!hasTrackedLogin.current) {
        window.gtag("event", "login", {
          method: "google",
          user_name: session.user.name || "",
        })
        hasTrackedLogin.current = true
      }
    }
  }, [session, status])

  // Track page views on route changes
  useEffect(() => {
    if (typeof window.gtag === "function") {
      window.gtag("event", "page_view", {
        page_path: pathname,
        page_title: document.title,
        logged_in: status === "authenticated" ? "yes" : "no",
      })
    }
  }, [pathname, status])

  return null
}
