import { auth } from "@/auth"
import { NextResponse } from "next/server"

const protectedRoutes = ["/courses", "/tools", "/promptkit"]
const authRoutes = ["/login"]

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth
  const pathname = nextUrl.pathname

  // If logged in user tries to access login page, redirect to home
  if (isLoggedIn && authRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/", nextUrl))
  }

  // If not logged in and trying to access protected routes, redirect to login
  if (!isLoggedIn && protectedRoutes.some(route => pathname.startsWith(route))) {
    const callbackUrl = encodeURIComponent(pathname + nextUrl.search)
    return NextResponse.redirect(new URL(`/login?callbackUrl=${callbackUrl}`, nextUrl))
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon\\.ico|icon\\.svg|apple-touch-icon\\.png|icon-192\\.png|icon-512\\.png|favicon-32\\.png|manifest\\.webmanifest|robots\\.txt|sitemap\\.xml|opengraph-image|og-image).*)",
  ],
}
