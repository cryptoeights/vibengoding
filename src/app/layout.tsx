import type { Metadata } from "next";
import "./globals.css";
import { SessionProvider } from "@/components/session-provider";

export const metadata: Metadata = {
  title: "VIBENGODING.ID — Free Vibe Coding Courses & Tools",
  description:
    "Belajar vibe coding gratis. Courses, tools, dan komunitas untuk developer Indonesia yang suka ngoding sambil vibing.",
  keywords: ["vibe coding", "free courses", "developer tools", "belajar coding", "indonesia"],
  openGraph: {
    title: "VIBENGODING.ID",
    description: "Free Vibe Coding Courses & Developer Tools",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&family=Syne:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
