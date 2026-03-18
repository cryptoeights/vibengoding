import { Lesson } from "./courses-data";

export const shipItLessons: Lesson[] = [
  { id: "1", title: "Deployment 101: Concepts & Options", duration: "12 menit", content: `# Deployment 101: Concepts & Options

## Apa Itu Deployment?

Deployment = memindahkan app dari laptop kamu ke **server yang bisa diakses semua orang** via internet.

Local (localhost:3000) → Deploy → Production (yourapp.com)

## Types of Hosting

### Static Hosting
File HTML/CSS/JS yang sudah jadi. Tidak butuh server.
- **Contoh:** Netlify, GitHub Pages, Cloudflare Pages
- **Cocok untuk:** Landing page, portfolio, docs
- **Harga:** Gratis

### Serverless
Kode berjalan saat ada request. Bayar per eksekusi.
- **Contoh:** Vercel, Netlify Functions, AWS Lambda
- **Cocok untuk:** Next.js apps, APIs, webhooks
- **Harga:** Gratis (dengan limit)

### Container/VPS
Server virtual yang kamu kontrol penuh.
- **Contoh:** Railway, Fly.io, DigitalOcean, AWS EC2
- **Cocok untuk:** Custom backends, databases, long-running processes
- **Harga:** $5-20/bulan

## Platform Comparison

| Platform | Type | Free Tier | Best For |
|----------|------|-----------|----------|
| Vercel | Serverless | 100GB bandwidth | Next.js |
| Netlify | Serverless | 100GB bandwidth | Static + Serverless |
| Railway | Container | $5 credit/month | Backends, databases |
| Fly.io | Container | 3 shared VMs | Global edge apps |
| Render | Container | 750 hrs/month | Full-stack |
| Cloudflare Pages | Edge | Unlimited | Static sites |

## Next.js Deployment Options

Next.js App
├── Vercel (recommended, zero-config)
├── Netlify (good alternative)
├── Docker → Railway/Fly.io (custom infra)
└── Self-hosted VPS (full control)

## Checklist Sebelum Deploy

- [ ] \`npm run build\` tanpa error
- [ ] Environment variables documented
- [ ] Images optimized
- [ ] SEO metadata set
- [ ] Error pages (404, 500) custom
- [ ] Responsive di semua device

Let's start deploying! 🚀` },
  { id: "2", title: "Deploy ke Vercel (The Easy Way)", duration: "18 menit", content: `# Deploy ke Vercel (The Easy Way)

## Kenapa Vercel?

- Dibuat oleh tim Next.js — **zero-config** deployment
- Free tier sangat generous
- Preview deployments untuk setiap PR
- HTTPS otomatis
- Edge functions built-in

## Step-by-Step Deploy

### 1. Push ke GitHub

[code-bash]
# Pastikan semua sudah committed
git add .
git commit -m "feat: ready for deployment"
git push origin main

### 2. Connect ke Vercel

1. Buka [vercel.com](https://vercel.com)
2. **Sign up** dengan GitHub
3. Click **"Add New" → "Project"**
4. **Import** repository kamu
5. Vercel auto-detect Next.js ✅
6. Click **"Deploy"**

### 3. Tunggu Build

Building...
✓ Linting and checking validity of types
✓ Collecting page data
✓ Generating static pages
✓ Finalizing page optimization

Route (app)                 Size
┌ ○ /                       5.2 kB
├ ○ /about                  1.1 kB
└ ○ /courses                3.4 kB

✅ Deploy successful!

### 4. Test Production

Vercel memberikan URL seperti: \`your-app.vercel.app\`

Buka dan test semua fitur!

## Environment Variables

Di Vercel Dashboard:
1. **Settings → Environment Variables**
2. Add key-value pairs
3. Pilih scope: Production / Preview / Development

[code-bash]
# Contoh env vars yang perlu di-set:
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=random-secret-string
NEXTAUTH_URL=https://your-app.vercel.app

## Auto Deployments

Setelah setup:
- **Push ke main** → auto deploy ke production
- **Push ke branch lain** → preview deployment
- Preview URL bisa di-share buat testing

## Vercel CLI (Alternative)

[code-bash]
npm i -g vercel
vercel          # deploy preview
vercel --prod   # deploy production
vercel env pull # download env vars

Deploy ke Vercel = literally 2 menit! ⚡` },
  { id: "3", title: "Custom Domains & SSL", duration: "15 menit", content: `# Custom Domains & SSL

## Beli Domain

Rekomendasi registrar:
- **Namecheap** — murah, UI bagus
- **Cloudflare** — harga wholesale
- **Google Domains** → Squarespace
- **Niagahoster** — untuk .id domain

## Setup Domain di Vercel

### 1. Add Domain

Vercel Dashboard → Project → Settings → Domains
Add: vibengoding.id

### 2. Configure DNS

Vercel akan kasih DNS records yang perlu kamu set:

Type    Name    Value
A       @       76.76.21.21
CNAME   www     cname.vercel-dns.com

### 3. Set di Registrar

Buka dashboard registrar (Namecheap/Cloudflare) → DNS Settings → Add records di atas.

### 4. Tunggu Propagasi

DNS propagation bisa 5 menit - 48 jam (biasanya < 1 jam).

[code-bash]
# Check propagation
dig vibengoding.id
nslookup vibengoding.id

## SSL Certificate

Vercel otomatis setup SSL (HTTPS) gratis via Let's Encrypt. Tidak perlu manual setup. ✅

## www vs non-www

vibengoding.id      ← primary (recommended)
www.vibengoding.id  ← redirect ke non-www

Vercel handle redirect ini otomatis.

## Subdomain

app.vibengoding.id    → production app
docs.vibengoding.id   → documentation
api.vibengoding.id    → API server

Custom domain = profesional & brandable! 🌐` },
  { id: "4", title: "Environment Variables & Secrets", duration: "18 menit", content: `# Environment Variables & Secrets

## Apa Itu Environment Variables?

Env vars = **konfigurasi yang berubah per environment** (dev, staging, prod). Contoh:
- Database URL
- API keys
- Auth secrets
- Feature flags

## .env Files (Local)

[code-bash]
# .env.local (JANGAN commit ke Git!)
DATABASE_URL="postgresql://localhost:5432/mydb"
NEXTAUTH_SECRET="dev-secret-key"
NEXTAUTH_URL="http://localhost:3000"
GITHUB_ID="dev-github-oauth-id"
GITHUB_SECRET="dev-github-oauth-secret"

## .gitignore

[code-bash]
# WAJIB ada di .gitignore
.env
.env.local
.env.production
.env*.local

## Akses di Kode

typescript
// Server-side (default in Next.js)
const dbUrl = process.env.DATABASE_URL;

// Client-side (prefix NEXT_PUBLIC_)
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

## Environment Variables di Vercel

[code-bash]
# Via CLI
vercel env add DATABASE_URL
vercel env add NEXTAUTH_SECRET

# Via Dashboard
# Settings → Environment Variables → Add

### Per-Environment Config

| Variable | Development | Preview | Production |
|----------|------------|---------|------------|
| DATABASE_URL | localhost | staging-db | prod-db |
| NEXTAUTH_URL | localhost:3000 | preview-url | domain.com |
| LOG_LEVEL | debug | info | error |

## Secrets Management Rules

1. **NEVER commit** secrets ke Git
2. **NEVER hardcode** secrets di kode
3. **Rotate** secrets secara berkala
4. **Different secrets** per environment
5. **Minimal access** — hanya kasih yang dibutuhkan

## Validate Env Vars

typescript
// src/lib/env.ts
import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  NEXTAUTH_SECRET: z.string().min(32),
  NEXTAUTH_URL: z.string().url(),
});

export const env = envSchema.parse(process.env);

Env vars management = professional deployment! 🔐` },
  { id: "5", title: "CI/CD dengan GitHub Actions", duration: "22 menit", content: `# CI/CD dengan GitHub Actions

## Apa Itu CI/CD?

CI (Continuous Integration):
  Code push → Auto build → Auto test → Report

CD (Continuous Deployment):
  Tests pass → Auto deploy → Production

## Basic GitHub Actions Workflow

yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build-and-test:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Lint
        run: npm run lint

      - name: Type check
        run: npx tsc --noEmit

      - name: Build
        run: npm run build
        env:
          DATABASE_URL: \${{ secrets.DATABASE_URL }}

## Tambah Test Step

yaml
      - name: Run tests
        run: npm test
        
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        if: always()

## PR Preview Deployment

Vercel otomatis buat preview untuk setiap PR. Tapi kamu bisa add comment:

yaml
# .github/workflows/preview-comment.yml
name: Preview URL Comment

on:
  pull_request:
    types: [opened, synchronize]

jobs:
  comment:
    runs-on: ubuntu-latest
    steps:
      - name: Wait for Vercel
        uses: patrickedqvist/wait-for-vercel-preview@v1.3.2
        with:
          token: \${{ secrets.GITHUB_TOKEN }}
          max_timeout: 300

## Secrets di GitHub

1. Repository → Settings → Secrets → Actions
2. Add: DATABASE_URL, NEXTAUTH_SECRET, etc.
3. Akses di workflow: \`\${{ secrets.SECRET_NAME }}\`

## Branch Protection

Settings → Branches → Branch protection rules:
- [x] Require status checks to pass
- [x] Require PR review
- [x] No direct push to main

CI/CD = quality gate yang otomatis! 🤖` },
  { id: "6", title: "Docker untuk Developer", duration: "20 menit", content: `# Docker untuk Developer

## Kenapa Docker?

Docker = **container** yang package app + semua dependencynya. "Works on my machine" problem → solved.

Tanpa Docker:
  "Eh, kok error? Di laptop gue jalan..."

Dengan Docker:
  "Container yang sama, di mana aja jalan."

## Dockerfile untuk Next.js

dockerfile
# Dockerfile
FROM node:20-alpine AS base

# Install dependencies
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Build
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]

## Docker Compose (Local Dev)

yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://postgres:password@db:5432/mydb
    depends_on:
      - db

  db:
    image: postgres:15
    environment:
      POSTGRES_PASSWORD: password
      POSTGRES_DB: mydb
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:

## Commands Dasar

[code-bash]
# Build image
docker build -t my-app .

# Run container
docker run -p 3000:3000 my-app

# Docker Compose
docker compose up -d      # start
docker compose down        # stop
docker compose logs -f     # lihat logs

# Masuk ke container
docker exec -it container-name sh

## Kapan Butuh Docker?

- ✅ Custom server requirements
- ✅ Multiple services (app + db + cache)
- ✅ Consistent dev environment across team
- ✅ Deploy ke Railway, Fly.io, AWS ECS
- ❌ Simple Next.js app → Vercel cukup

Docker = portable, reproducible environments! 🐳` },
  { id: "7", title: "🏆 Final Project: Deploy Your App", duration: "25 menit", content: `# 🏆 Final Project: Deploy Your App

Saatnya deploy project kamu ke production dan buat bisa diakses semua orang!

## Project: Deploy & Configure

### Requirements
- [ ] App yang sudah jadi (dari course sebelumnya atau project baru)
- [ ] Deployed di Vercel (atau platform pilihan)
- [ ] Custom domain (optional tapi recommended)
- [ ] CI/CD pipeline aktif
- [ ] Environment variables properly managed

## Step-by-Step

### Phase 1: Prepare (15 min)
[code-bash]
# 1. Pastikan build berhasil
npm run build

# 2. Test di production mode
npm start

# 3. Check .gitignore
cat .gitignore  # pastikan .env ada di sini

# 4. Commit everything
git add .
git commit -m "feat: production ready"
git push origin main

### Phase 2: Deploy (10 min)
1. Vercel → Import repo
2. Set environment variables
3. Deploy
4. Test semua fitur di production URL

### Phase 3: Configure (15 min)
1. Setup custom domain (jika punya)
2. Add CI/CD workflow (\`.github/workflows/ci.yml\`)
3. Setup branch protection
4. Add monitoring (Vercel Analytics)

### Phase 4: Document (10 min)
Update README.md:

[code-md]
# My App Name

[Live Demo](https://your-app.vercel.app)

## Tech Stack
- Next.js 14
- TypeScript
- Tailwind CSS
- Prisma + PostgreSQL

## Getting Started
git clone https://github.com/you/app.git
cd app
npm install
cp .env.example .env.local
# Fill in env vars
npm run dev

## Deploy
Connected to Vercel with auto-deploy on push to main.

## Customisasi

Setelah deploy, enhance:
- **Monitoring**: Vercel Analytics, Sentry error tracking
- **Performance**: Lighthouse audit > 90 score
- **SEO**: Proper meta tags, sitemap.xml, robots.txt
- **Security**: Rate limiting, CORS, CSP headers

## 🎉 Course Complete!

Kamu sekarang bisa:
- ✅ Deploy ke Vercel (zero-config)
- ✅ Setup custom domains + SSL
- ✅ Manage environment variables properly
- ✅ Setup CI/CD pipeline
- ✅ Dockerize Next.js apps
- ✅ Monitor & troubleshoot production apps

**Ship early, ship often!** 🚀` },
];
