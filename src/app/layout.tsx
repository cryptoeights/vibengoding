import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SessionProvider } from "@/components/session-provider";

const siteUrl = "https://vibengoding.id";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050505",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "VIBENGODING.ID — Belajar Vibe Coding Gratis untuk Developer Indonesia",
    template: "%s | VIBENGODING.ID",
  },
  description:
    "Platform belajar vibe coding gratis bahasa Indonesia. 6 courses lengkap, 60+ lessons, tools developer, dan panduan membuat website dengan AI. Dari nol sampai deploy — selamanya gratis.",
  keywords: [
    "vibe coding",
    "belajar vibe coding",
    "vibe coding indonesia",
    "belajar coding gratis",
    "belajar bikin website",
    "coding dengan AI",
    "belajar programming",
    "kursus coding gratis",
    "bikin website pakai AI",
    "prompt engineering",
    "belajar Next.js",
    "belajar React",
    "Tailwind CSS tutorial",
    "deploy website gratis",
    "developer tools indonesia",
    "AI coding tools",
    "cursor tutorial",
    "github copilot",
    "belajar web development",
    "coding untuk pemula",
  ],
  authors: [{ name: "VIBENGODING.ID", url: siteUrl }],
  creator: "VIBENGODING.ID",
  publisher: "VIBENGODING.ID",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: siteUrl,
    siteName: "VIBENGODING.ID",
    title: "VIBENGODING.ID — Belajar Vibe Coding Gratis",
    description:
      "Platform belajar vibe coding gratis untuk developer Indonesia. 6 courses, 60+ lessons, tools siap pakai. Dari nol sampai deploy.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "VIBENGODING.ID — Belajar Vibe Coding Gratis untuk Developer Indonesia",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VIBENGODING.ID — Belajar Vibe Coding Gratis",
    description:
      "Platform belajar vibe coding gratis untuk developer Indonesia. 6 courses, 60+ lessons. Dari nol sampai deploy.",
    images: ["/og-image.png"],
    creator: "@vibengoding",
  },
  verification: {
    // Verified via DNS TXT record
  },
  category: "education",
};

// JSON-LD Structured Data
function JsonLd() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "VIBENGODING.ID",
    url: siteUrl,
    logo: `${siteUrl}/icon-512.png`,
    description:
      "Platform belajar vibe coding gratis untuk developer Indonesia. Courses lengkap, tools siap pakai, dan komunitas.",
    sameAs: [
      "https://github.com/vibengoding",
      "https://twitter.com/vibengoding",
    ],
    foundingDate: "2025",
    areaServed: {
      "@type": "Country",
      name: "Indonesia",
    },
    knowsLanguage: "id",
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "VIBENGODING.ID",
    url: siteUrl,
    description: "Platform belajar vibe coding gratis bahasa Indonesia",
    inLanguage: "id-ID",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/courses?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  const courseListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Courses Vibe Coding Gratis",
    description: "Daftar semua course vibe coding gratis di VIBENGODING.ID",
    numberOfItems: 6,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@type": "Course",
          name: "Vibe Coding 101 — Dari Nol Sampai Deploy",
          description:
            "Belajar dasar-dasar vibe coding. Dari setup environment, prompt engineering, sampai deploy app pertamamu.",
          provider: { "@type": "Organization", name: "VIBENGODING.ID", url: siteUrl },
          url: `${siteUrl}/courses/vibe-coding-101`,
          isAccessibleForFree: true,
          inLanguage: "id",
          courseMode: "online",
          educationalLevel: "Beginner",
          numberOfLessons: 12,
          hasCourseInstance: {
            "@type": "CourseInstance",
            courseMode: "online",
            courseWorkload: "PT3H",
          },
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "IDR",
            availability: "https://schema.org/InStock",
            category: "Free",
          },
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        item: {
          "@type": "Course",
          name: "AI-Powered Frontend — Build UI dengan AI",
          description: "Cara bikin UI yang stunning pakai AI tools. Dari wireframe sampai production-ready components.",
          provider: { "@type": "Organization", name: "VIBENGODING.ID", url: siteUrl },
          url: `${siteUrl}/courses/ai-powered-frontend`,
          isAccessibleForFree: true,
          inLanguage: "id",
          courseMode: "online",
          educationalLevel: "Intermediate",
        },
      },
      {
        "@type": "ListItem",
        position: 3,
        item: {
          "@type": "Course",
          name: "Full-Stack Vibes — Backend + Frontend + AI",
          description: "Gabungin semua skill. Build full-stack app dari nol pakai vibe coding methodology.",
          provider: { "@type": "Organization", name: "VIBENGODING.ID", url: siteUrl },
          url: `${siteUrl}/courses/full-stack-vibes`,
          isAccessibleForFree: true,
          inLanguage: "id",
          courseMode: "online",
          educationalLevel: "Intermediate",
        },
      },
      {
        "@type": "ListItem",
        position: 4,
        item: {
          "@type": "Course",
          name: "Prompt Engineering Pro — Master the Art of Prompting",
          description: "Deep dive ke prompt engineering untuk coding, debugging, dan arsitektur.",
          provider: { "@type": "Organization", name: "VIBENGODING.ID", url: siteUrl },
          url: `${siteUrl}/courses/prompt-engineering-pro`,
          isAccessibleForFree: true,
          inLanguage: "id",
          courseMode: "online",
        },
      },
      {
        "@type": "ListItem",
        position: 5,
        item: {
          "@type": "Course",
          name: "Ship It! Deploy Guide — Dari Local ke Production",
          description: "Panduan lengkap deploy aplikasi. Vercel, Railway, Docker, CI/CD.",
          provider: { "@type": "Organization", name: "VIBENGODING.ID", url: siteUrl },
          url: `${siteUrl}/courses/ship-it-deploy-guide`,
          isAccessibleForFree: true,
          inLanguage: "id",
          courseMode: "online",
          educationalLevel: "Beginner",
        },
      },
      {
        "@type": "ListItem",
        position: 6,
        item: {
          "@type": "Course",
          name: "Cursor & Copilot Mastery — AI Code Editor Pro Tips",
          description: "Tips dan tricks pakai Cursor, GitHub Copilot, dan AI code editors.",
          provider: { "@type": "Organization", name: "VIBENGODING.ID", url: siteUrl },
          url: `${siteUrl}/courses/cursor-copilot-mastery`,
          isAccessibleForFree: true,
          inLanguage: "id",
          courseMode: "online",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseListSchema) }}
      />
    </>
  );
}

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
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <JsonLd />
        {/* Google Analytics 4 */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-2JJHH40G92" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-2JJHH40G92');
            `,
          }}
        />
      </head>
      <body className="antialiased">
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
