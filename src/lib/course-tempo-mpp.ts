import { Lesson } from "./courses-data";

export const tempoMppLessons: Lesson[] = [
  {
    id: "1",
    title: "Apa Itu Tempo & Machine Payments Protocol?",
    duration: "12 menit",
    content: `# Apa Itu Tempo & Machine Payments Protocol?

## Tempo: Blockchain untuk Payments

**Tempo** adalah blockchain yang didesain khusus untuk pembayaran (payments). Bukan blockchain umum — tapi blockchain yang dioptimalkan supaya:

- ⚡ **Cepat** — transaksi selesai dalam ~500ms
- 💰 **Murah** — biaya transaksi di bawah 1 sen
- 🤖 **AI-friendly** — didesain untuk agent dan mesin

> Bayangkan kalau AI agent kamu bisa bayar sendiri untuk layanan yang dia butuhkan. Itulah yang dimungkinkan Tempo.

## MPP: Machine Payments Protocol

**MPP (Machine Payments Protocol)** adalah protokol terbuka untuk pembayaran mesin-ke-mesin. Didesain oleh **Tempo × Stripe** dan diajukan sebagai standar internet ke **IETF**.

### Cara Kerja MPP (Simplified)

\`\`\`
1. 🤖 Agent minta data ke API      → GET /api/generate-image
2. 💳 Server bilang "bayar dulu"    → 402 Payment Required  
3. 💸 Agent bayar otomatis          → Sign transaction
4. 🔄 Agent kirim ulang + bukti     → GET /api/generate-image + Payment proof
5. ✅ Server verifikasi & kirim data → 200 OK + image result
\`\`\`

Semua terjadi dalam **satu HTTP request**. User atau developer tidak perlu setup billing, API keys, atau akun.

## Kenapa Ini Game-Changer?

| Cara Lama | Dengan MPP |
|-----------|-----------|
| Daftar akun dulu | Langsung bayar & pakai |
| Setup API key | Tidak perlu API key |
| Billing bulanan | Bayar per-request |
| Manual integration | Otomatis via protocol |
| Manusia yang bayar | Agent bisa bayar sendiri |

## Use Cases yang Menarik

- **🎨 AI Image Generation** — Agent bayar per-gambar ke fal.ai
- **🔍 Web Search** — Agent bayar per-query untuk search
- **🤖 LLM API** — Bayar per-token tanpa subscription
- **🔧 MCP Tools** — Monetisasi tool calls di Model Context Protocol
- **📰 Digital Content** — Bayar per-artikel, bukan langganan

## Apa yang Akan Kita Bangun?

Di course ini, kamu akan:
1. **Setup Tempo Wallet** — biar agent punya "dompet"
2. **Buat Agent** yang bisa bayar sendiri ke service
3. **Bangun Server** yang terima pembayaran MPP
4. **Deploy** semuanya ke production

Gak perlu pengalaman blockchain. Gak perlu ngerti crypto. Kita mulai dari nol! 🚀`,
  },
  {
    id: "2",
    title: "Konsep Dasar: HTTP 402 & Payment Flow",
    duration: "10 menit",
    content: `# Konsep Dasar: HTTP 402 & Payment Flow

## HTTP Status Code 402: Payment Required

Kamu pasti tau status code ini:
- \`200\` — OK (sukses)
- \`404\` — Not Found (halaman tidak ada)
- \`500\` — Server Error

Nah, ada satu yang jarang dipakai sampai sekarang:
- \`402\` — **Payment Required** 💸

Status code ini sudah ada sejak HTTP dibuat, tapi belum pernah punya standar implementasi. **MPP mengisi kekosongan itu.**

## Payment Flow Lengkap

### Step 1: Request Biasa

\`\`\`bash
# Agent atau app kirim request biasa
GET /api/premium-data HTTP/1.1
Host: api.example.com
\`\`\`

### Step 2: Server Response 402

\`\`\`http
HTTP/1.1 402 Payment Required
WWW-Authenticate: Payment
  type="tempo"
  amount="0.01"
  currency="0x20c0...0000"
  recipient="0xa726...aCF8"
\`\`\`

Server bilang: *"Hei, ini konten berbayar. Bayar $0.01 ke alamat ini."*

### Step 3: Client Bayar & Retry

\`\`\`bash
# Client bayar di blockchain, lalu kirim ulang dengan bukti
GET /api/premium-data HTTP/1.1
Host: api.example.com
Authorization: Payment credential="0xSIGNED_TRANSACTION..."
\`\`\`

### Step 4: Server Verifikasi & Deliver

\`\`\`http
HTTP/1.1 200 OK
Payment-Receipt: status="success" reference="0xTX_HASH..."
Content-Type: application/json

{ "data": "premium content here..." }
\`\`\`

## Dua Jenis Payment Intent

MPP punya 2 cara bayar:

### 1. Charge (One-time)
- Bayar sekali per request
- Latency ~500ms (nunggu konfirmasi blockchain)
- Cocok untuk: single API calls, beli konten

\`\`\`
Client → Pay $0.10 → Get response
Client → Pay $0.10 → Get response  (bayar lagi)
\`\`\`

### 2. Session (Pay-as-you-go)
- Buka "tab" pembayaran, bayar seiring pemakaian
- Latency near-zero (off-chain vouchers)
- Cocok untuk: streaming, LLM APIs, metered services

\`\`\`
Client → Open session (deposit $5.00)
Client → Request 1 → -$0.01 → Response
Client → Request 2 → -$0.01 → Response
Client → Request 3 → -$0.01 → Response
... (lanjut sampai saldo habis)
\`\`\`

## Kenapa Tempo Cocok untuk MPP?

| Fitur Tempo | Manfaat untuk MPP |
|---|---|
| ~500ms finality | Cukup cepat untuk synchronous HTTP |
| Sub-cent fees | Micropayments jadi feasible |
| Fee sponsorship | Server bisa bayar gas untuk client |
| 2D nonces | Payment tidak blocking aktivitas lain |
| High throughput | Bisa handle banyak payment sekaligus |

## Istilah Penting

- **Challenge** — Respons 402 dari server yang berisi detail pembayaran
- **Credential** — Bukti pembayaran dari client
- **Receipt** — Konfirmasi pembayaran dari server
- **Charge** — Pembayaran satu kali
- **Session** — Pembayaran berkelanjutan

Sekarang kamu sudah paham flow-nya. Di lesson selanjutnya kita mulai setup! 🛠️`,
  },
  {
    id: "3",
    title: "Install Tempo CLI & Buat Wallet",
    duration: "15 menit",
    content: `# Install Tempo CLI & Buat Wallet

## Apa yang Kita Butuhkan?

Sebelum mulai, pastikan kamu punya:
- ✅ Terminal (Terminal di Mac, CMD/PowerShell di Windows)
- ✅ Node.js v18+ terinstall
- ✅ Internet connection

## Step 1: Install Tempo CLI

Buka terminal dan jalankan:

\`\`\`bash
curl -fsSL https://tempo.xyz/install | bash
\`\`\`

Ini akan download dan install \`tempo\` CLI secara otomatis.

### Verifikasi Instalasi

\`\`\`bash
tempo --version
\`\`\`

Kalau muncul version number, berarti berhasil! ✅

## Step 2: Login & Buat Wallet

\`\`\`bash
# Login (akan buka browser untuk autentikasi)
tempo wallet login
\`\`\`

Ini akan:
1. Buka browser
2. Minta kamu login/daftar
3. Buat wallet otomatis
4. Connect wallet ke CLI

### Cek Status Wallet

\`\`\`bash
# Lihat info wallet kamu
tempo wallet whoami
\`\`\`

Output akan menunjukkan:
\`\`\`
Address: 0x1234...5678
Network: Tempo Mainnet (Chain ID: 4217)
Balance: 0.00 USD
\`\`\`

## Step 3: Fund Wallet (Testnet)

Untuk belajar, kita pakai **testnet** dulu (uang palsu, gratis):

\`\`\`bash
# Minta testnet tokens
tempo wallet fund
\`\`\`

Ini akan:
1. Switch ke testnet (Moderato)
2. Kirim testnet USDC ke wallet kamu
3. Kamu siap untuk bereksperimen!

### Cek Balance

\`\`\`bash
tempo wallet whoami
\`\`\`

Sekarang balance kamu harusnya sudah terisi testnet USDC.

## Step 4: Explore Service Directory

Tempo punya **service directory** — daftar semua layanan yang bisa dibayar:

\`\`\`bash
# Lihat semua services
tempo wallet services

# Cari services AI
tempo wallet services --search ai

# Detail service tertentu
tempo wallet services <SERVICE_ID>
\`\`\`

Output menunjukkan:
- Endpoint URL
- HTTP method
- Harga per-request
- Request schema

## Network Details (Referensi)

### Mainnet
| Property | Value |
|----------|-------|
| Network | Tempo Mainnet |
| Chain ID | 4217 |
| RPC | https://rpc.tempo.xyz |
| Explorer | https://explore.tempo.xyz |

### Testnet (Moderato)
| Property | Value |
|----------|-------|
| Network | Tempo Testnet |
| Chain ID | 42431 |
| RPC | https://rpc.moderato.tempo.xyz |
| Explorer | https://explore.testnet.tempo.xyz |

## Troubleshooting

### CLI tidak terinstall?
\`\`\`bash
# Coba dengan npm
npm install -g @tempo-xyz/cli
\`\`\`

### Permission denied?
\`\`\`bash
# Pakai sudo di Mac/Linux
sudo curl -fsSL https://tempo.xyz/install | bash
\`\`\`

### Wallet tidak ke-fund?
- Pastikan kamu di testnet
- Coba ulang \`tempo wallet fund\`
- Cek di explorer: https://explore.testnet.tempo.xyz

Wallet sudah siap! Selanjutnya kita buat request pertama 🚀`,
  },
  {
    id: "4",
    title: "Request Pertama: Bayar API dengan CLI",
    duration: "15 menit",
    content: `# Request Pertama: Bayar API dengan CLI

## Yuk Coba Bayar API!

Sekarang wallet sudah siap, saatnya buat **paid request pertama**. Kita akan pakai CLI untuk membayar API tanpa perlu nulis kode.

## Step 1: Preview Cost (Dry Run)

Sebelum bayar beneran, cek dulu harganya:

\`\`\`bash
tempo request --dry-run -X POST \\
  --json '{"prompt":"a sunset over the ocean"}' \\
  https://fal.mpp.tempo.xyz/fal-ai/flux/dev
\`\`\`

Output:
\`\`\`
Dry run — no payment will be made

Endpoint:  POST https://fal.mpp.tempo.xyz/fal-ai/flux/dev
Amount:    $0.04
Currency:  PathUSD
Recipient: 0xa726...aCF8

Your balance: $10.00 (testnet)
After payment: $9.96
\`\`\`

Flag \`--dry-run\` memastikan kamu **tidak bayar** — hanya lihat berapa biayanya.

## Step 2: Kirim Paid Request

Sekarang kirim beneran:

\`\`\`bash
tempo request -X POST \\
  --json '{"prompt":"a sunset over the ocean"}' \\
  https://fal.mpp.tempo.xyz/fal-ai/flux/dev
\`\`\`

### Apa yang Terjadi di Belakang?

\`\`\`
1. CLI kirim request ke API
2. API response: "402 Payment Required — bayar $0.04"
3. CLI otomatis sign & kirim payment transaction
4. CLI retry request dengan bukti pembayaran
5. API verifikasi payment & return hasil
6. CLI tampilkan hasilnya ke kamu
\`\`\`

Semua terjadi otomatis. Kamu tinggal jalankan satu command!

## Step 3: Contoh Request Lainnya

### GET Request (Sederhana)

\`\`\`bash
# Fetch paid content
tempo request https://api.example.com/premium-article/123
\`\`\`

### POST dengan Data

\`\`\`bash
# Generate image
tempo request -X POST \\
  --json '{"prompt":"futuristic city, neon lights"}' \\
  https://fal.mpp.tempo.xyz/fal-ai/flux/dev
\`\`\`

### Dengan Headers Custom

\`\`\`bash
tempo request -X POST \\
  -H "Content-Type: application/json" \\
  --json '{"query":"latest AI news"}' \\
  https://search.mpp.tempo.xyz/api/search
\`\`\`

## Step 4: Cek Riwayat & Balance

\`\`\`bash
# Cek sisa balance
tempo wallet whoami

# Lihat transaksi di explorer
# Buka: https://explore.testnet.tempo.xyz/address/YOUR_ADDRESS
\`\`\`

## Ringkasan Command CLI

| Command | Fungsi |
|---------|--------|
| \`tempo wallet login\` | Login & buat wallet |
| \`tempo wallet whoami\` | Lihat info & balance |
| \`tempo wallet fund\` | Minta testnet tokens |
| \`tempo wallet services\` | Browse available services |
| \`tempo request --dry-run\` | Preview cost |
| \`tempo request\` | Kirim paid request |

## Tips

1. **Selalu dry-run dulu** sebelum bayar beneran
2. **Cek balance** secara berkala
3. **Pakai testnet** untuk eksperimen
4. Kalau response aneh, tambah \`--verbose\` untuk debug

\`\`\`bash
tempo request --verbose -X POST \\
  --json '{"prompt":"test"}' \\
  https://fal.mpp.tempo.xyz/fal-ai/flux/dev
\`\`\`

Selamat! Kamu sudah berhasil bayar API pakai blockchain. Selanjutnya kita buat ini dari kode! 🎉`,
  },
  {
    id: "5",
    title: "Setup Agent dengan Tempo Wallet (AI Agent)",
    duration: "18 menit",
    content: `# Setup Agent dengan Tempo Wallet (AI Agent)

## Kasih Agent Kamu Kemampuan Bayar

Ini bagian paling exciting — kita akan setup **AI agent yang bisa bayar sendiri** untuk layanan yang dia butuhkan.

## Method 1: Skill-Based Setup (Paling Mudah)

Kalau kamu pakai AI coding agent (Claude Code, Cursor, Codex, Amp), tinggal paste ini:

### Claude Code
\`\`\`bash
claude -p "Read https://tempo.xyz/SKILL.md and set up Tempo Wallet"
\`\`\`

### Cursor / Amp
\`\`\`bash
amp --execute "Read https://tempo.xyz/SKILL.md and set up Tempo Wallet"
\`\`\`

### Codex CLI
\`\`\`bash
codex exec "Read https://tempo.xyz/SKILL.md and set up Tempo Wallet"
\`\`\`

Agent akan otomatis:
1. Install Tempo CLI
2. Setup wallet
3. Configure spending limits
4. Siap bayar services on demand

## Method 2: Manual Setup (Lebih Kontrol)

### Step 1: Install Tempo CLI di Environment Agent

\`\`\`bash
curl -fsSL https://tempo.xyz/install | bash
\`\`\`

### Step 2: Login

\`\`\`bash
tempo wallet login
\`\`\`

### Step 3: Fund Wallet

\`\`\`bash
# Testnet
tempo wallet fund

# Atau mainnet — transfer USDC ke alamat wallet
\`\`\`

### Step 4: Test Agent Capabilities

\`\`\`bash
# Discover apa yang bisa dibayar
tempo wallet services --search ai

# Preview cost
tempo request --dry-run -X POST \\
  --json '{"prompt":"hello world"}' \\
  https://fal.mpp.tempo.xyz/fal-ai/flux/dev

# Make actual request
tempo request -X POST \\
  --json '{"prompt":"cyberpunk cat"}' \\
  https://fal.mpp.tempo.xyz/fal-ai/flux/dev
\`\`\`

## Method 3: MCP Server Integration

Kalau kamu pakai **Model Context Protocol**, tambahkan Tempo sebagai MCP server:

### Claude Code
\`\`\`bash
claude mcp add --transport http tempo https://docs.tempo.xyz/api/mcp
\`\`\`

### Codex CLI
\`\`\`bash
codex mcp add tempo --url https://docs.tempo.xyz/api/mcp
\`\`\`

### Manual Config (untuk tool lain)
\`\`\`json
{
  "mcpServers": {
    "tempo-docs": {
      "url": "https://docs.tempo.xyz/api/mcp"
    }
  }
}
\`\`\`

### Install Tempo Docs Skill
\`\`\`bash
npx skills add tempoxyz/docs
\`\`\`

Sekarang agent kamu bisa akses dokumentasi Tempo langsung!

## Spending Controls

Penting untuk set batas pengeluaran agent:

\`\`\`bash
# Set spending limit (contoh: max $5 per session)
tempo wallet config set spending-limit 5.00

# Set per-request limit (contoh: max $1 per request)
tempo wallet config set per-request-limit 1.00
\`\`\`

## Workflow Agent

Begini flow agent yang sudah setup:

\`\`\`
1. Agent terima task: "Buatkan gambar sunset"
2. Agent discover service: tempo wallet services --search image
3. Agent preview cost: tempo request --dry-run ...
4. Agent cek: cost $0.04 < spending limit $5.00 ✅
5. Agent kirim request & bayar otomatis
6. Agent dapat result & lanjut kerja
\`\`\`

## Best Practices

1. **Selalu set spending limits** — jangan biarkan agent belanja tanpa batas
2. **Pakai testnet dulu** untuk development
3. **Monitor transactions** di explorer
4. **Log semua requests** untuk audit trail

Agent kamu sekarang punya "dompet" sendiri! 💰🤖`,
  },
  {
    id: "6",
    title: "Client SDK: TypeScript Integration",
    duration: "20 menit",
    content: `# Client SDK: TypeScript Integration

## Dari CLI ke Kode

Sekarang kita akan integrate MPP langsung ke kode TypeScript. Ini yang kamu butuhkan kalau mau bangun **app atau agent custom** yang bisa bayar API.

## Step 1: Setup Project

\`\`\`bash
# Buat project baru
mkdir mpp-client-demo
cd mpp-client-demo
npm init -y

# Install dependencies
npm install mppx viem
npm install -D typescript @types/node tsx
\`\`\`

### Setup TypeScript

\`\`\`bash
npx tsc --init
\`\`\`

Edit \`tsconfig.json\`:
\`\`\`json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "esModuleInterop": true,
    "strict": true,
    "outDir": "./dist"
  },
  "include": ["src/**/*"]
}
\`\`\`

## Step 2: Polyfill Fetch (Cara Paling Mudah)

Buat file \`src/basic.ts\`:

\`\`\`typescript
import { privateKeyToAccount } from 'viem/accounts'
import { Mppx, tempo } from 'mppx/client'

// 1. Buat account dari private key
const account = privateKeyToAccount('0xYOUR_PRIVATE_KEY_HERE')

// 2. Setup MPP — ini "polyfill" fetch global
Mppx.create({
  methods: [tempo({ account })],
})

// 3. Pakai fetch biasa — payment terjadi otomatis!
async function main() {
  console.log('Fetching paid resource...')
  
  const response = await fetch('https://api.example.com/premium-data')
  const data = await response.json()
  
  console.log('Result:', data)
}

main()
\`\`\`

**Apa yang terjadi?**
- \`Mppx.create\` mengubah \`fetch\` global
- Setiap kali server response \`402\`, \`mppx\` otomatis bayar & retry
- Kode kamu **tidak perlu diubah** — fetch biasa langsung support payment!

### Jalankan:
\`\`\`bash
npx tsx src/basic.ts
\`\`\`

## Step 3: Non-Polyfill Mode (Lebih Aman)

Kalau tidak mau mengubah fetch global:

\`\`\`typescript
import { privateKeyToAccount } from 'viem/accounts'
import { Mppx, tempo } from 'mppx/client'

const account = privateKeyToAccount('0xYOUR_PRIVATE_KEY_HERE')

// Buat instance tanpa polyfill
const mppx = Mppx.create({
  polyfill: false,
  methods: [tempo({ account })],
})

async function main() {
  // Pakai mppx.fetch — bukan global fetch
  const response = await mppx.fetch(
    'https://fal.mpp.tempo.xyz/fal-ai/flux/dev',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt: 'a beautiful sunset over the ocean'
      })
    }
  )

  const data = await response.json()
  console.log('Generated image:', data)
}

main()
\`\`\`

## Step 4: Manual Payment Handling

Untuk kontrol penuh — misal mau tampilkan UI konfirmasi sebelum bayar:

\`\`\`typescript
import { Mppx, tempo } from 'mppx/client'
import { privateKeyToAccount } from 'viem/accounts'

const mppx = Mppx.create({
  polyfill: false,
  methods: [tempo()],
})

async function manualPayment(url: string) {
  // 1. Kirim request awal
  const response = await fetch(url)

  // 2. Cek apakah perlu bayar
  if (response.status === 402) {
    console.log('Payment required!')
    
    // 3. Buat credential (tanda tangan pembayaran)
    const credential = await mppx.createCredential(response, {
      account: privateKeyToAccount('0x...'),
    })

    // 4. Retry dengan credential
    const paidResponse = await fetch(url, {
      headers: { Authorization: credential },
    })

    return paidResponse.json()
  }

  return response.json()
}
\`\`\`

## Step 5: Cek Payment Receipt

Setelah bayar, selalu verifikasi receipt:

\`\`\`typescript
import { Receipt } from 'mppx'

const response = await mppx.fetch('https://api.example.com/resource')
const receipt = Receipt.fromResponse(response)

console.log('Payment status:', receipt.status)     // "success"
console.log('Transaction:', receipt.reference)       // "0xtx789abc..."
\`\`\`

## Environment Variables

**Jangan hardcode private key!** Pakai env vars:

\`\`\`bash
# .env
TEMPO_PRIVATE_KEY=0xYOUR_KEY_HERE
\`\`\`

\`\`\`typescript
import 'dotenv/config'
import { privateKeyToAccount } from 'viem/accounts'

const account = privateKeyToAccount(
  process.env.TEMPO_PRIVATE_KEY as \`0x\${string}\`
)
\`\`\`

## SDKs Lain

| Bahasa | Package | Install |
|--------|---------|---------|
| TypeScript | \`mppx\` | \`npm install mppx viem\` |
| Python | \`pympp\` | \`pip install pympp\` |
| Rust | \`mpp-rs\` | \`cargo add mpp\` |

Sekarang kamu bisa bayar API dari kode! Selanjutnya kita bikin server sendiri 🔥`,
  },
  {
    id: "7",
    title: "Client SDK: Python Integration",
    duration: "15 menit",
    content: `# Client SDK: Python Integration

## MPP untuk Python Developer

Kalau kamu lebih nyaman pakai Python (misalnya untuk AI/ML projects), ada \`pympp\` — SDK resmi MPP untuk Python.

## Step 1: Setup

\`\`\`bash
# Buat virtual environment
python -m venv venv
source venv/bin/activate  # Mac/Linux
# venv\\Scripts\\activate   # Windows

# Install
pip install pympp
\`\`\`

## Step 2: Basic Usage

Buat file \`client.py\`:

\`\`\`python
from pympp import Mppx, tempo
from pympp.accounts import PrivateKeyAccount

# 1. Setup account
account = PrivateKeyAccount("0xYOUR_PRIVATE_KEY_HERE")

# 2. Create MPP client
client = Mppx(
    methods=[tempo(account=account)]
)

# 3. Make paid request
response = client.get("https://api.example.com/premium-data")
print("Status:", response.status_code)
print("Data:", response.json())
\`\`\`

### Jalankan:
\`\`\`bash
python client.py
\`\`\`

## Step 3: POST Request (Contoh AI Image)

\`\`\`python
from pympp import Mppx, tempo
from pympp.accounts import PrivateKeyAccount

account = PrivateKeyAccount("0xYOUR_PRIVATE_KEY_HERE")
client = Mppx(methods=[tempo(account=account)])

# Generate image via paid API
response = client.post(
    "https://fal.mpp.tempo.xyz/fal-ai/flux/dev",
    json={
        "prompt": "a cyberpunk city at night, neon lights"
    }
)

result = response.json()
print("Image URL:", result.get("url"))
\`\`\`

## Step 4: Dengan Environment Variables

\`\`\`python
import os
from dotenv import load_dotenv
from pympp import Mppx, tempo
from pympp.accounts import PrivateKeyAccount

load_dotenv()

account = PrivateKeyAccount(os.getenv("TEMPO_PRIVATE_KEY"))
client = Mppx(methods=[tempo(account=account)])

# Dry run — cek harga tanpa bayar
challenge = client.preview("https://api.example.com/resource")
print(f"Cost: {challenge.amount}")
print(f"Currency: {challenge.currency}")

# Kalau OK, bayar beneran
response = client.get("https://api.example.com/resource")
\`\`\`

## Step 5: Error Handling

\`\`\`python
from pympp import Mppx, tempo, PaymentError, InsufficientFunds
from pympp.accounts import PrivateKeyAccount

client = Mppx(methods=[tempo(account=account)])

try:
    response = client.get("https://api.example.com/resource")
    data = response.json()
    print("Success:", data)

except InsufficientFunds as e:
    print(f"Saldo tidak cukup! Butuh: {e.required}, Saldo: {e.balance}")

except PaymentError as e:
    print(f"Payment gagal: {e.message}")

except Exception as e:
    print(f"Error: {e}")
\`\`\`

## Use Case: AI Agent Python

\`\`\`python
from pympp import Mppx, tempo
from pympp.accounts import PrivateKeyAccount

class AIAgent:
    def __init__(self, private_key: str):
        account = PrivateKeyAccount(private_key)
        self.client = Mppx(methods=[tempo(account=account)])
    
    def generate_image(self, prompt: str) -> dict:
        """Generate image via paid API"""
        response = self.client.post(
            "https://fal.mpp.tempo.xyz/fal-ai/flux/dev",
            json={"prompt": prompt}
        )
        return response.json()
    
    def search_web(self, query: str) -> dict:
        """Search web via paid API"""
        response = self.client.post(
            "https://search.mpp.tempo.xyz/api/search",
            json={"query": query}
        )
        return response.json()

# Pakai agent
agent = AIAgent("0xYOUR_KEY")
image = agent.generate_image("sunset over mountains")
results = agent.search_web("latest AI news 2026")
\`\`\`

## Quick Comparison: TypeScript vs Python

| | TypeScript (\`mppx\`) | Python (\`pympp\`) |
|---|---|---|
| Install | \`npm install mppx viem\` | \`pip install pympp\` |
| Polyfill fetch | ✅ Yes | ❌ Pakai client |
| Async | \`async/await\` | Sync by default |
| Best for | Web apps, Node.js | AI/ML, scripts |

Pilih yang sesuai kebutuhan kamu! 🐍`,
  },
  {
    id: "8",
    title: "Bangun Server MPP: Accept Payments",
    duration: "25 menit",
    content: `# Bangun Server MPP: Accept Payments

## Saatnya Terima Pembayaran!

Setelah belajar jadi **client** (yang bayar), sekarang kita belajar jadi **server** (yang dibayar). Kita akan bikin API yang menerima pembayaran MPP.

## Konsep

Server MPP bekerja seperti ini:
\`\`\`
1. Client request → Server cek "ada payment credential?"
2. Belum → Kirim 402 + Challenge (berapa harganya)
3. Sudah → Verifikasi payment → Kirim response + Receipt
\`\`\`

## Option A: Next.js (Recommended)

### Step 1: Setup Project

\`\`\`bash
npx create-next-app@latest mpp-server --typescript --tailwind --app --src-dir
cd mpp-server
npm install mppx viem
\`\`\`

### Step 2: Buat API Route dengan Payment

Buat file \`src/app/api/premium/route.ts\`:

\`\`\`typescript
import { Mppx, tempo } from 'mppx/nextjs'

// Setup MPP
const mppx = Mppx.create({
  methods: [tempo({
    // PathUSD token address di Tempo
    currency: '0x20c0000000000000000000000000000000000000',
    // Alamat wallet kamu (yang akan terima pembayaran)
    recipient: '0xYOUR_WALLET_ADDRESS_HERE',
  })],
})

// API route yang dilindungi payment
// Charge $0.01 per request
export const GET = 
  mppx.charge({ amount: '0.01' })
  (() => {
    return Response.json({
      message: 'Welcome to premium content!',
      data: {
        title: 'Secret Recipe: Nasi Goreng Spesial',
        ingredients: ['nasi', 'kecap', 'telur', 'bawang'],
        tip: 'Pakai api besar biar wok hei-nya dapet 🔥'
      },
      timestamp: new Date().toISOString()
    })
  })
\`\`\`

**Itu saja!** Dalam ~15 baris kode, kamu sudah punya API berbayar.

### Step 3: Buat Beberapa Endpoint

Buat \`src/app/api/joke/route.ts\` (bayar $0.005 per joke):

\`\`\`typescript
import { Mppx, tempo } from 'mppx/nextjs'

const mppx = Mppx.create({
  methods: [tempo({
    currency: '0x20c0000000000000000000000000000000000000',
    recipient: '0xYOUR_WALLET_ADDRESS_HERE',
  })],
})

const jokes = [
  "Kenapa programmer suka gelap? Karena light mode bikin bug-nya keliatan 😂",
  "Ada 10 jenis orang di dunia: yang ngerti binary dan yang tidak.",
  "!false — it's funny because it's true.",
  "Debugging: being the detective in a crime movie where you are also the murderer.",
]

export const GET =
  mppx.charge({ amount: '0.005' })
  (() => {
    const randomJoke = jokes[Math.floor(Math.random() * jokes.length)]
    return Response.json({ joke: randomJoke })
  })
\`\`\`

### Step 4: Jalankan & Test

\`\`\`bash
# Jalankan server
npm run dev

# Test dari terminal lain
tempo request http://localhost:3000/api/premium
tempo request http://localhost:3000/api/joke
\`\`\`

## Option B: Express.js

\`\`\`bash
mkdir mpp-express
cd mpp-express
npm init -y
npm install express mppx viem
npm install -D typescript @types/express tsx
\`\`\`

Buat \`src/server.ts\`:

\`\`\`typescript
import express from 'express'
import { Mppx, tempo } from 'mppx/express'

const app = express()

const mppx = Mppx.create({
  methods: [tempo({
    currency: '0x20c0000000000000000000000000000000000000',
    recipient: '0xYOUR_WALLET_ADDRESS_HERE',
  })],
})

// Endpoint gratis
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome! Try our paid endpoints:',
    endpoints: [
      { path: '/api/premium', price: '$0.01', method: 'GET' },
      { path: '/api/generate', price: '$0.05', method: 'POST' },
    ]
  })
})

// Endpoint berbayar ($0.01)
app.get('/api/premium',
  mppx.charge({ amount: '0.01' }),
  (req, res) => {
    res.json({ 
      data: 'This is premium content!',
      secret: '42 is the answer to everything' 
    })
  }
)

// Endpoint berbayar ($0.05) dengan POST
app.post('/api/generate',
  express.json(),
  mppx.charge({ amount: '0.05' }),
  (req, res) => {
    const { prompt } = req.body
    res.json({
      result: \`Generated from: "\${prompt}"\`,
      mockData: 'Ini bisa diganti dengan real AI generation'
    })
  }
)

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000')
})
\`\`\`

Jalankan:
\`\`\`bash
npx tsx src/server.ts
\`\`\`

## Option C: Hono (Ringan & Cepat)

\`\`\`typescript
import { Hono } from 'hono'
import { Mppx, tempo } from 'mppx/hono'

const app = new Hono()

const mppx = Mppx.create({
  methods: [tempo({
    currency: '0x20c0000000000000000000000000000000000000',
    recipient: '0xYOUR_WALLET_ADDRESS_HERE',
  })],
})

app.get('/api/data',
  mppx.charge({ amount: '0.01' }),
  (c) => c.json({ data: 'Paid content!' })
)

export default app
\`\`\`

## Test dengan mppx CLI

\`\`\`bash
# Buat test account
npx mppx account create

# Test endpoint
npx mppx http://localhost:3000/api/premium

# Inspect challenge tanpa bayar
npx mppx --inspect http://localhost:3000/api/premium
\`\`\`

Sekarang kamu punya API berbayar sendiri! 💰`,
  },
  {
    id: "9",
    title: "Fee Sponsorship & Push/Pull Mode",
    duration: "15 menit",
    content: `# Fee Sponsorship & Push/Pull Mode

## Masalah: Client Harus Bayar Gas

Di blockchain biasa, setiap transaksi butuh "gas fee". Ini bisa membingungkan user yang bukan crypto-native.

Solusi Tempo: **Fee Sponsorship** — server yang bayar gas, client cukup punya stablecoin.

## Cara Kerja Fee Sponsorship

\`\`\`
TANPA Sponsorship:
Client butuh: Stablecoin ($0.01) + Gas fee ($0.001)

DENGAN Sponsorship:
Client butuh: Stablecoin ($0.01) saja ✅
Server bayar: Gas fee ($0.001) → dianggap cost of doing business
\`\`\`

## Implementasi Fee Sponsorship

\`\`\`typescript
import { Mppx, tempo } from 'mppx/server'
import { privateKeyToAccount } from 'viem/accounts'

const mppx = Mppx.create({
  methods: [tempo({
    currency: '0x20c0000000000000000000000000000000000000',
    recipient: '0xYOUR_RECIPIENT_ADDRESS',
    
    // 👇 Tambahkan feePayer — server sponsor gas fee
    feePayer: privateKeyToAccount('0xSERVER_PRIVATE_KEY'),
  })],
})
\`\`\`

Sekarang client tidak perlu punya gas token — mereka hanya perlu stablecoin untuk pembayaran.

## Push vs Pull Mode

MPP support dua cara pembayaran:

### Pull Mode (Default)

\`\`\`
1. Client sign transaksi
2. Client kirim transaksi yang sudah di-sign ke server
3. Server broadcast ke blockchain
4. Server bisa sponsor gas fee
\`\`\`

\`\`\`typescript
// Client (pull mode — default)
const response = await mppx.fetch('https://api.example.com/resource')
// mppx otomatis kirim signed transaction ke server
\`\`\`

**Kelebihan:**
- ✅ Server bisa sponsor gas fee
- ✅ Client tidak perlu gas token
- ✅ UX lebih baik untuk non-crypto users

### Push Mode

\`\`\`
1. Client sign & broadcast transaksi sendiri
2. Client kirim transaction hash ke server
3. Server verifikasi hash di blockchain
\`\`\`

\`\`\`typescript
// Client (push mode — contoh browser wallet)
// Client broadcast sendiri via wallet (MetaMask, etc.)
// Lalu kirim hash ke server sebagai credential
\`\`\`

**Kelebihan:**
- ✅ Client lebih independen
- ✅ Cocok untuk browser wallet (MetaMask, dll)
- ❌ Client harus punya gas token sendiri

## Server Handle Kedua Mode Otomatis

Yang keren: **server kamu tidak perlu konfigurasi khusus** — keduanya ditangani otomatis!

\`\`\`typescript
const mppx = Mppx.create({
  methods: [tempo({
    currency: '0x20c0...',
    recipient: '0xYOUR_ADDRESS',
    feePayer: privateKeyToAccount('0x...'), // untuk pull mode
  })],
})

// Server inspect credential type otomatis:
// - Pull: credential berisi "transaction" → server broadcast
// - Push: credential berisi "hash" → server verify on-chain
\`\`\`

## Override Per-Endpoint

Beda endpoint bisa punya konfigurasi berbeda:

\`\`\`typescript
// Endpoint A: murah, server sponsor gas
app.get('/api/basic',
  mppx.charge({ amount: '0.001' }),
  handler
)

// Endpoint B: mahal, beda recipient
app.get('/api/premium',
  mppx.charge({ 
    amount: '1.00',
    currency: '0xOTHER_TOKEN...',
    recipient: '0xOTHER_WALLET...',
  }),
  handler
)
\`\`\`

## Best Practice

1. **Selalu sponsori gas fee** untuk UX terbaik
2. **Jangan expose server private key** — pakai env vars
3. **Set per-request limit** di feePayer wallet
4. **Monitor gas spending** — pastikan server wallet punya cukup saldo

\`\`\`bash
# .env
MPP_CURRENCY=0x20c0000000000000000000000000000000000000
MPP_RECIPIENT=0xYOUR_RECIPIENT_ADDRESS
MPP_FEE_PAYER_KEY=0xYOUR_SERVER_KEY
\`\`\`

\`\`\`typescript
import 'dotenv/config'

const mppx = Mppx.create({
  methods: [tempo({
    currency: process.env.MPP_CURRENCY as \`0x\${string}\`,
    recipient: process.env.MPP_RECIPIENT as \`0x\${string}\`,
    feePayer: privateKeyToAccount(
      process.env.MPP_FEE_PAYER_KEY as \`0x\${string}\`
    ),
  })],
})
\`\`\`

Fee sponsorship = UX game changer! 🎮`,
  },
  {
    id: "10",
    title: "Build: Paid AI Image API (Full Project)",
    duration: "25 menit",
    content: `# Build: Paid AI Image API (Full Project)

## Project: API Berbayar untuk Generate Image

Kita akan bangun **API berbayar lengkap** yang menerima prompt text dan return AI-generated image. Ini menggabungkan semua yang sudah dipelajari.

## Struktur Project

\`\`\`
paid-image-api/
├── src/
│   └── app/
│       ├── layout.tsx
│       ├── page.tsx            ← Landing page
│       ├── api/
│       │   ├── health/
│       │   │   └── route.ts    ← Health check (gratis)
│       │   ├── generate/
│       │   │   └── route.ts    ← Generate image (berbayar)
│       │   └── gallery/
│       │       └── route.ts    ← Recent images (berbayar)
│       └── docs/
│           └── page.tsx        ← API documentation
├── .env.local
├── package.json
└── README.md
\`\`\`

## Step 1: Setup

\`\`\`bash
npx create-next-app@latest paid-image-api --typescript --tailwind --app --src-dir
cd paid-image-api
npm install mppx viem
\`\`\`

## Step 2: Environment Variables

Buat \`.env.local\`:
\`\`\`bash
# Alamat wallet yang terima pembayaran
MPP_RECIPIENT=0xYOUR_WALLET_ADDRESS

# PathUSD token di Tempo
MPP_CURRENCY=0x20c0000000000000000000000000000000000000

# (Optional) Fee payer private key untuk sponsor gas
MPP_FEE_PAYER_KEY=0xYOUR_SERVER_KEY
\`\`\`

## Step 3: MPP Config (Shared)

Buat \`src/lib/mpp.ts\`:

\`\`\`typescript
import { Mppx, tempo } from 'mppx/nextjs'
import { privateKeyToAccount } from 'viem/accounts'

export const mppx = Mppx.create({
  methods: [tempo({
    currency: process.env.MPP_CURRENCY as \`0x\${string}\`,
    recipient: process.env.MPP_RECIPIENT as \`0x\${string}\`,
    ...(process.env.MPP_FEE_PAYER_KEY && {
      feePayer: privateKeyToAccount(
        process.env.MPP_FEE_PAYER_KEY as \`0x\${string}\`
      ),
    }),
  })],
})
\`\`\`

## Step 4: Health Check (Gratis)

Buat \`src/app/api/health/route.ts\`:

\`\`\`typescript
export function GET() {
  return Response.json({
    status: 'ok',
    service: 'Paid Image API',
    version: '1.0.0',
    endpoints: [
      { path: '/api/generate', method: 'POST', price: '$0.05' },
      { path: '/api/gallery', method: 'GET', price: '$0.01' },
    ]
  })
}
\`\`\`

## Step 5: Generate Image (Berbayar — $0.05)

Buat \`src/app/api/generate/route.ts\`:

\`\`\`typescript
import { mppx } from '@/lib/mpp'

export const POST =
  mppx.charge({ amount: '0.05' })
  (async (request: Request) => {
    const body = await request.json()
    const { prompt } = body

    if (!prompt) {
      return Response.json(
        { error: 'Missing "prompt" in request body' },
        { status: 400 }
      )
    }

    // Simulasi AI image generation
    // Di production, ganti dengan call ke real AI service
    const mockImage = {
      id: crypto.randomUUID(),
      prompt,
      url: \`https://picsum.photos/seed/\${encodeURIComponent(prompt)}/800/600\`,
      model: 'flux-dev',
      created_at: new Date().toISOString(),
    }

    return Response.json({
      success: true,
      image: mockImage,
    })
  })
\`\`\`

## Step 6: Gallery (Berbayar — $0.01)

Buat \`src/app/api/gallery/route.ts\`:

\`\`\`typescript
import { mppx } from '@/lib/mpp'

// Mock gallery data
const gallery = [
  { id: '1', prompt: 'sunset over mountains', url: 'https://picsum.photos/seed/sunset/400/300' },
  { id: '2', prompt: 'cyberpunk city', url: 'https://picsum.photos/seed/cyberpunk/400/300' },
  { id: '3', prompt: 'cute cat astronaut', url: 'https://picsum.photos/seed/catastro/400/300' },
  { id: '4', prompt: 'underwater coral reef', url: 'https://picsum.photos/seed/coral/400/300' },
]

export const GET =
  mppx.charge({ amount: '0.01' })
  (() => {
    return Response.json({
      success: true,
      count: gallery.length,
      images: gallery,
    })
  })
\`\`\`

## Step 7: Test!

\`\`\`bash
# Jalankan server
npm run dev

# Terminal baru — test endpoints:

# Health check (gratis)
curl http://localhost:3000/api/health

# Generate image (bayar $0.05)
tempo request -X POST \\
  --json '{"prompt":"futuristic tokyo at night"}' \\
  http://localhost:3000/api/generate

# Gallery (bayar $0.01)
tempo request http://localhost:3000/api/gallery

# Inspect tanpa bayar
npx mppx --inspect http://localhost:3000/api/generate
\`\`\`

## Step 8: Test dengan mppx CLI

\`\`\`bash
# Buat test account (otomatis funded di testnet)
npx mppx account create

# Test paid request
npx mppx -X POST \\
  --json '{"prompt":"hello world"}' \\
  http://localhost:3000/api/generate
\`\`\`

Kamu sekarang punya **Paid API** yang siap dipakai! 🎉

Di lesson selanjutnya, kita bikin landing page untuk API ini dan deploy ke production.`,
  },
  {
    id: "11",
    title: "Wagmi Integration: Browser Wallet Payments",
    duration: "15 menit",
    content: `# Wagmi Integration: Browser Wallet Payments

## Bayar dari Browser Wallet

Selain pakai private key, user juga bisa bayar langsung dari **browser wallet** seperti MetaMask, Rainbow, atau Passkey wallet. Untuk ini kita pakai **Wagmi**.

## Apa Itu Wagmi?

Wagmi adalah React hooks library untuk berinteraksi dengan Ethereum wallets. Dengan Wagmi + mppx, user bisa:
- Connect wallet via MetaMask/Rainbow/etc
- Approve payment dengan satu klik
- Bayar langsung dari browser

## Setup

\`\`\`bash
npm install mppx viem wagmi @tanstack/react-query
\`\`\`

## Step 1: Wagmi Config

Buat \`src/lib/wagmi-config.ts\`:

\`\`\`typescript
import { createConfig, http } from 'wagmi'
import { tempoModerato } from 'viem/chains'
import { webAuthn } from 'wagmi/tempo'

export const config = createConfig({
  connectors: [webAuthn()],  // Passkey wallet!
  chains: [tempoModerato],    // Tempo testnet
  transports: {
    [tempoModerato.id]: http(),
  },
})
\`\`\`

## Step 2: MPP + Wagmi Setup

Buat \`src/lib/mpp-browser.ts\`:

\`\`\`typescript
import { Mppx, tempo } from 'mppx/client'
import { getConnectorClient } from 'wagmi/actions'
import { config } from './wagmi-config'

// Setup MPP dengan Wagmi connector
Mppx.create({
  methods: [tempo({
    getClient: (parameters) => getConnectorClient(config, parameters),
  })],
})
\`\`\`

## Step 3: React Component

\`\`\`tsx
"use client"

import { useState } from 'react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'

export function PaymentButton() {
  const { address, isConnected } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string | null>(null)

  async function handlePay() {
    setLoading(true)
    try {
      // fetch otomatis handle 402 payment via Wagmi wallet
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: 'beautiful landscape' })
      })
      
      const data = await response.json()
      setResult(JSON.stringify(data, null, 2))
    } catch (err) {
      setResult('Payment failed: ' + (err as Error).message)
    }
    setLoading(false)
  }

  if (!isConnected) {
    return (
      <div className="space-y-3">
        <p className="text-sm text-gray-400">Connect wallet untuk bayar</p>
        {connectors.map((connector) => (
          <button
            key={connector.id}
            onClick={() => connect({ connector })}
            className="px-6 py-3 bg-[#E50914] text-white rounded-xl 
              hover:bg-[#FF2D3B] transition-all font-medium"
          >
            Connect {connector.name}
          </button>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-2 h-2 bg-green-500 rounded-full" />
        <span className="text-sm text-gray-400 font-mono">
          {address?.slice(0, 6)}...{address?.slice(-4)}
        </span>
        <button 
          onClick={() => disconnect()}
          className="text-xs text-red-400 hover:text-red-300"
        >
          Disconnect
        </button>
      </div>

      <button
        onClick={handlePay}
        disabled={loading}
        className="px-6 py-3 bg-[#E50914] text-white rounded-xl 
          hover:bg-[#FF2D3B] transition-all font-medium
          disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Processing payment...' : 'Generate Image ($0.05)'}
      </button>

      {result && (
        <pre className="p-4 bg-[#111] rounded-xl text-xs text-green-400 
          overflow-x-auto border border-[#1a1a1a]">
          {result}
        </pre>
      )}
    </div>
  )
}
\`\`\`

## Per-Request Accounts

Untuk advanced use case — pakai wallet berbeda per request:

\`\`\`typescript
const mppx = Mppx.create({
  polyfill: false,
  methods: [tempo()]
})

const response = await mppx.fetch('https://api.example.com/resource', {
  context: {
    account: privateKeyToAccount('0xSPECIFIC_KEY'),
  }
})
\`\`\`

## Kapan Pakai Apa?

| Method | Cocok Untuk |
|--------|------------|
| Private Key | Agent, backend, scripts |
| Wagmi + Wallet | Frontend web app |
| Tempo CLI | Development & testing |

Browser wallet integration membuka MPP untuk **end users**, bukan cuma developer! 🌐`,
  },
  {
    id: "12",
    title: "Deploy & Production Checklist",
    duration: "12 menit",
    content: `# Deploy & Production Checklist

## Deploy Server MPP ke Vercel

### Step 1: Pastikan Build Berhasil

\`\`\`bash
npm run build
\`\`\`

Kalau ada error, fix dulu sebelum deploy.

### Step 2: Push ke GitHub

\`\`\`bash
git init
git add .
git commit -m "feat: paid image API with MPP"
git remote add origin https://github.com/USERNAME/paid-image-api.git
git push -u origin main
\`\`\`

### Step 3: Deploy ke Vercel

\`\`\`bash
# Atau via CLI
npx vercel

# Deploy ke production
npx vercel --prod
\`\`\`

### Step 4: Set Environment Variables

Di Vercel Dashboard → Settings → Environment Variables:

\`\`\`
MPP_RECIPIENT=0xYOUR_WALLET_ADDRESS
MPP_CURRENCY=0x20c0000000000000000000000000000000000000
MPP_FEE_PAYER_KEY=0xYOUR_SERVER_KEY
\`\`\`

⚠️ **PENTING**: \`MPP_FEE_PAYER_KEY\` hanya di server environment, jangan expose ke client!

## Production Checklist

### Security ✅

- [ ] Private keys di environment variables (BUKAN di kode)
- [ ] \`.env.local\` sudah ada di \`.gitignore\`
- [ ] Fee payer wallet punya balance minimal
- [ ] Set spending limits di fee payer wallet
- [ ] HTTPS enabled (otomatis di Vercel)
- [ ] Rate limiting (optional tapi recommended)

### Testing ✅

- [ ] Test di testnet dulu
- [ ] Test semua endpoint dengan \`tempo request\`
- [ ] Test error cases (no prompt, invalid body)
- [ ] Test dari browser (kalau pakai Wagmi)
- [ ] Verify payment receipts

### Monitoring ✅

- [ ] Cek transaksi di [Tempo Explorer](https://explore.tempo.xyz)
- [ ] Monitor fee payer balance
- [ ] Setup alerts kalau balance rendah
- [ ] Log semua payment events

### Documentation ✅

- [ ] API documentation page
- [ ] Pricing information
- [ ] Example requests
- [ ] Error codes & messages

## Test Production Endpoint

\`\`\`bash
# Test health
curl https://your-api.vercel.app/api/health

# Test paid endpoint
tempo request -X POST \\
  --json '{"prompt":"production test"}' \\
  https://your-api.vercel.app/api/generate
\`\`\`

## Mainnet vs Testnet

| | Testnet | Mainnet |
|---|---|---|
| Chain ID | 42431 | 4217 |
| RPC | rpc.moderato.tempo.xyz | rpc.tempo.xyz |
| Explorer | explore.testnet.tempo.xyz | explore.tempo.xyz |
| Uang | Palsu (gratis) | Real USD |
| Pakai untuk | Development, testing | Production |

### Switch ke Mainnet

Saat siap production:
1. Buat wallet baru di mainnet
2. Transfer USDC ke wallet
3. Update environment variables
4. Deploy ulang

## Recap: Apa yang Sudah Kamu Bangun

\`\`\`
✅ Install Tempo CLI & setup wallet
✅ Buat paid request pertama via CLI
✅ Setup AI agent dengan Tempo Wallet
✅ Client SDK (TypeScript & Python)
✅ Server MPP (Next.js / Express / Hono)
✅ Fee sponsorship
✅ Full project: Paid Image API
✅ Browser wallet integration
✅ Deploy ke production
\`\`\`

## Resources

| Resource | URL |
|----------|-----|
| Tempo Docs | https://docs.tempo.xyz |
| MPP Protocol | https://mpp.dev |
| IETF Specs | https://paymentauth.org |
| GitHub | https://github.com/tempoxyz |
| SDK Docs | https://mpp.dev/sdk |
| Tempo Explorer | https://explore.tempo.xyz |

## Selamat! 🎉

Kamu sudah bisa:
1. **Membuat agent** yang bayar sendiri untuk services
2. **Membangun server** yang terima pembayaran dari agent/app
3. **Deploy** semuanya ke production

Welcome to the future of machine payments! 🤖💰🚀`,
  },
  {
    id: "13",
    title: "Deploy ke Mainnet: Go Live dengan Uang Asli",
    duration: "20 menit",
    content: `# Deploy ke Mainnet: Go Live dengan Uang Asli

## Dari Testnet ke Mainnet

Sampai sini, semua yang kita lakukan masih di **testnet** (uang palsu). Sekarang saatnya go live dengan **uang asli di Tempo Mainnet**.

> ⚠️ **Penting**: Di mainnet, semua transaksi menggunakan uang sungguhan. Pastikan kamu sudah test semuanya di testnet sebelum switch.

## Perbedaan Testnet vs Mainnet

| | Testnet (Moderato) | Mainnet |
|---|---|---|
| Chain ID | \`42431\` | \`4217\` |
| RPC URL | \`https://rpc.moderato.tempo.xyz\` | \`https://rpc.tempo.xyz\` |
| WebSocket | \`wss://rpc.moderato.tempo.xyz\` | \`wss://rpc.tempo.xyz\` |
| Explorer | \`https://explore.testnet.tempo.xyz\` | \`https://explore.tempo.xyz\` |
| Uang | Palsu (gratis dari faucet) | Real USD stablecoins |
| Fungsi | Development & testing | Production |

## Step 1: Buat Wallet Mainnet

### Via Tempo Wallet (Web — Paling Mudah)

1. Buka [wallet.tempo.xyz](https://wallet.tempo.xyz/)
2. Daftar atau login dengan **passkey** (sidik jari / Face ID)
3. Wallet mainnet otomatis dibuat
4. Catat alamat wallet kamu (format: \`0x...\`)

### Via CLI

\`\`\`bash
# Pastikan CLI terinstall
tempo --version

# Login — otomatis ke mainnet
tempo wallet login

# Cek alamat dan balance
tempo wallet whoami
\`\`\`

Output:
\`\`\`
Address:  0x1234...5678
Network:  Tempo Mainnet (Chain ID: 4217)
Balance:  0.00 USD
\`\`\`

## Step 2: Isi Saldo (Fund Wallet)

Ada beberapa cara untuk mendapat stablecoin di Tempo Mainnet:

### Option A: Beli Langsung (Onramp)

1. Buka [wallet.tempo.xyz](https://wallet.tempo.xyz/)
2. Klik **"Add funds"**
3. Pilih metode pembayaran (kartu kredit, bank transfer, dll)
4. Beli stablecoin (PathUSD) langsung ke wallet kamu

### Option B: Bridge dari Chain Lain

Kalau kamu sudah punya USDC di Ethereum, Base, atau chain lain, bridge ke Tempo:

| Bridge | URL | Keterangan |
|--------|-----|------------|
| LayerZero (Stargate) | [stargate.finance](https://stargate.finance/) | Bridge popular, banyak chain |
| Squid Router | [app.squidrouter.com](https://app.squidrouter.com/) | Swap + bridge dalam satu langkah |
| Relay | [relay.link](https://relay.link/) | Fee rendah |
| Across | [app.across.to](https://app.across.to/) | Cepat, fee kompetitif |
| Bungee | [bungee.exchange](https://www.bungee.exchange/) | Aggregator bridge |

### Option C: Via CLI

\`\`\`bash
# Fund wallet via CLI (akan redirect ke web untuk payment)
tempo wallet fund
\`\`\`

### Verifikasi Saldo

\`\`\`bash
tempo wallet whoami
\`\`\`

\`\`\`
Address:  0x1234...5678
Network:  Tempo Mainnet (Chain ID: 4217)
Balance:  50.00 PathUSD
\`\`\`

## Step 3: Siapkan 2 Wallet

Untuk production, kamu butuh **2 wallet terpisah**:

### Wallet 1: Recipient (Terima Pembayaran)
- Ini wallet yang terima bayaran dari customer/agent
- Alamat ini yang dipakai di \`MPP_RECIPIENT\`

### Wallet 2: Fee Payer (Sponsor Gas)
- Wallet khusus untuk bayar gas fee client
- Private key-nya dipakai di \`MPP_FEE_PAYER_KEY\`
- Isi saldo secukupnya untuk gas (~$5-10 untuk mulai)

\`\`\`
Recipient Wallet:  0xAAAA...1111  ← terima pembayaran
Fee Payer Wallet:  0xBBBB...2222  ← sponsor gas fee
\`\`\`

> Jangan pakai satu wallet untuk keduanya. Pisahkan supaya lebih aman dan mudah di-audit.

## Step 4: Update Environment Variables

### Lokal (.env.local)

\`\`\`bash
# SEBELUM (Testnet)
# MPP_RECIPIENT=0xTESTNET_ADDRESS
# MPP_CURRENCY=0x20c0000000000000000000000000000000000000
# MPP_FEE_PAYER_KEY=0xTESTNET_KEY

# SESUDAH (Mainnet)
MPP_RECIPIENT=0xYOUR_MAINNET_RECIPIENT_ADDRESS
MPP_CURRENCY=0x20c0000000000000000000000000000000000000
MPP_FEE_PAYER_KEY=0xYOUR_MAINNET_FEE_PAYER_KEY
\`\`\`

> Catatan: Currency address PathUSD (\`0x20c0...\`) **sama** di testnet dan mainnet.

### Vercel / Production

\`\`\`bash
# Set via Vercel CLI
vercel env add MPP_RECIPIENT production
# Paste: 0xYOUR_MAINNET_RECIPIENT_ADDRESS

vercel env add MPP_CURRENCY production
# Paste: 0x20c0000000000000000000000000000000000000

vercel env add MPP_FEE_PAYER_KEY production
# Paste: 0xYOUR_MAINNET_FEE_PAYER_KEY
\`\`\`

Atau via Vercel Dashboard:
1. Buka project di [vercel.com](https://vercel.com)
2. Settings → Environment Variables
3. Tambah/update ketiga variabel
4. Pastikan environment: **Production**

## Step 5: Update Kode (Kalau Perlu)

Kalau kamu hardcode chain config, update ke mainnet:

\`\`\`typescript
// src/lib/wagmi-config.ts
import { createConfig, http } from 'wagmi'
import { tempo } from 'viem/chains'  // mainnet chain
// import { tempoModerato } from 'viem/chains'  // testnet (hapus)

export const config = createConfig({
  chains: [tempo],  // ganti ke mainnet
  transports: {
    [tempo.id]: http(),  // otomatis pakai https://rpc.tempo.xyz
  },
})
\`\`\`

**Kalau pakai mppx server**, biasanya **tidak perlu ubah kode** — \`mppx\` otomatis detect chain dari currency address.

## Step 6: Deploy Ulang

\`\`\`bash
# Build & test lokal dulu
npm run build
npm run start  # test production build lokal

# Kalau OK, deploy
vercel --prod
\`\`\`

## Step 7: Test Mainnet

### Test 1: Inspect Challenge (Gratis, Tidak Bayar)

\`\`\`bash
# Inspect payment challenge tanpa bayar
npx mppx --inspect https://your-api.vercel.app/api/premium
\`\`\`

Output seharusnya menunjukkan:
\`\`\`
Payment Challenge:
  Amount:    0.01
  Currency:  PathUSD (0x20c0...)
  Recipient: 0xAAAA...1111 (mainnet address kamu)
  Network:   Tempo Mainnet (4217)
\`\`\`

Pastikan:
- Recipient address benar (mainnet, bukan testnet)
- Amount sesuai
- Network: Tempo Mainnet

### Test 2: Paid Request (Bayar Beneran)

\`\`\`bash
# Pakai Tempo CLI
tempo request https://your-api.vercel.app/api/premium

# Atau pakai mppx CLI
npx mppx https://your-api.vercel.app/api/premium
\`\`\`

### Test 3: Cek Transaksi di Explorer

1. Buka [explore.tempo.xyz](https://explore.tempo.xyz)
2. Search alamat recipient kamu
3. Lihat transaksi masuk — payment dari test tadi harus muncul

### Test 4: Cek Balance

\`\`\`bash
tempo wallet whoami
\`\`\`

Balance recipient harus bertambah sesuai amount yang di-charge.

## Step 8: Setup Agent di Mainnet

\`\`\`bash
# Login agent ke mainnet wallet
tempo wallet login

# Fund wallet agent
tempo wallet fund

# Set spending limits!
tempo wallet config set spending-limit 10.00
tempo wallet config set per-request-limit 1.00

# Test discover & request
tempo wallet services --search ai
tempo request --dry-run https://your-api.vercel.app/api/premium
tempo request https://your-api.vercel.app/api/premium
\`\`\`

## Monitoring & Maintenance

### Monitor Balance Fee Payer

Fee payer wallet harus selalu punya saldo untuk gas. Set reminder:

\`\`\`bash
# Cek balance fee payer
cast balance 0xFEE_PAYER_ADDRESS --rpc-url https://rpc.tempo.xyz
\`\`\`

### Monitor Revenue

\`\`\`bash
# Cek balance recipient (revenue kamu)
cast balance 0xRECIPIENT_ADDRESS --rpc-url https://rpc.tempo.xyz

# Atau di explorer
# https://explore.tempo.xyz/address/0xRECIPIENT_ADDRESS
\`\`\`

### Withdraw Revenue

Kamu bisa withdraw revenue ke wallet lain atau bridge ke chain lain:

\`\`\`bash
# Transfer ke wallet lain di Tempo
tempo wallet send 0xDEST_ADDRESS 25.00

# Atau bridge ke Ethereum/Base via bridge apps
# Buka salah satu bridge: stargate.finance, relay.link, app.across.to
\`\`\`

## Production Checklist Final

### Security
- [ ] Private keys HANYA di environment variables
- [ ] Fee payer wallet terpisah dari recipient
- [ ] \`.env.local\` ada di \`.gitignore\`
- [ ] Spending limits di-set di semua agent wallets
- [ ] HTTPS enabled (otomatis di Vercel)

### Testing
- [ ] Semua endpoint tested di testnet
- [ ] \`--inspect\` menunjukkan mainnet config yang benar
- [ ] Minimal 1 real paid request berhasil
- [ ] Receipt terverifikasi di explorer
- [ ] Error handling tested (insufficient funds, invalid request)

### Monitoring
- [ ] Bookmark explorer page untuk recipient address
- [ ] Set reminder cek fee payer balance mingguan
- [ ] Log semua payment events di server
- [ ] Setup uptime monitoring untuk API endpoints

### Business
- [ ] Pricing sudah final dan masuk akal
- [ ] API documentation published
- [ ] Health check endpoint tersedia (gratis)
- [ ] Terms of service kalau perlu

## Pricing Tips

| Tipe Service | Harga Wajar | Contoh |
|---|---|---|
| Simple data/content | 0.001 - 0.01 USD | Jokes, quotes, articles |
| API calls | 0.01 - 0.10 USD | Search, translation |
| AI generation | 0.05 - 1.00 USD | Image gen, LLM calls |
| Premium content | 0.10 - 5.00 USD | Reports, analysis |

> Start murah, naikkan pelan-pelan berdasarkan demand.

## Troubleshooting

### "Payment verification failed"
- Cek apakah recipient address benar (mainnet, bukan testnet)
- Pastikan fee payer punya saldo gas

### "Insufficient funds" di client
- Client perlu top up wallet mereka
- Atau kurangi charge amount

### Transaksi tidak muncul di explorer
- Tunggu ~5 detik (finality ~500ms, tapi explorer bisa delay)
- Cek di RPC langsung: \`cast tx TX_HASH --rpc-url https://rpc.tempo.xyz\`

### Fee payer balance habis
- Top up segera: transfer stablecoin ke fee payer address
- Set alert kalau balance di bawah 1 USD

## Selamat — Kamu Sudah Live di Mainnet!

Kamu sekarang punya:
- **API berbayar** yang menerima real USD payments
- **Agent** yang bisa bayar otomatis di mainnet
- **Fee sponsorship** untuk UX yang smooth
- **Monitoring** untuk track revenue

Welcome to production. Kamu sekarang bagian dari ecosystem machine payments! 🤖💰🌍`,
  },
];
