import { Course } from "./courses-data";

export const fullStackVibesCourse: Omit<Course, "id" | "slug" | "title" | "subtitle" | "description" | "longDescription" | "totalDuration" | "level" | "color" | "tags" | "prerequisites" | "whatYoullLearn"> = {
  lessons: [
    {
      id: "1",
      title: "Full-Stack Architecture Overview",
      duration: "15 menit",
      content: `# Full-Stack Architecture Overview

## Apa Itu Full-Stack?

Full-stack development berarti kamu menangani **semua layer** aplikasi:

\`\`\`
┌─────────────────┐
│   FRONTEND      │  ← UI yang user lihat (React/Next.js)
├─────────────────┤
│   API LAYER     │  ← Jembatan frontend ↔ database
├─────────────────┤
│   BACKEND       │  ← Business logic & auth
├─────────────────┤
│   DATABASE      │  ← Tempat data disimpan
└─────────────────┘
\`\`\`

## Modern Full-Stack dengan Next.js

Next.js adalah framework full-stack. Satu project bisa handle semuanya:

\`\`\`
app/
├── page.tsx              ← Frontend (React)
├── api/
│   └── users/
│       └── route.ts      ← API endpoints
├── actions/
│   └── user-actions.ts   ← Server Actions
└── lib/
    └── db.ts             ← Database connection
\`\`\`

## Kapan Pakai API Routes vs Server Actions?

| Use Case | API Routes | Server Actions |
|----------|-----------|----------------|
| Form submissions | ❌ Overkill | ✅ Perfect |
| External API calls | ✅ Yes | ❌ No |
| Webhook endpoints | ✅ Yes | ❌ No |
| CRUD dari UI | ❌ Bisa tapi verbose | ✅ Lebih clean |
| Third-party integration | ✅ Yes | ❌ No |

## Tech Stack yang Akan Kita Pakai

- **Next.js 14+** — Full-stack React framework
- **Prisma** — ORM (Object-Relational Mapping)
- **PostgreSQL** (via Supabase) — Database
- **Zod** — Validation
- **NextAuth.js** — Authentication
- **Tailwind CSS** — Styling

## Project: Task Manager App

Di akhir course ini, kamu akan membuat **full task manager** dengan fitur:
- ✅ User authentication (login/register)
- ✅ CRUD tasks (create, read, update, delete)
- ✅ Categories & labels
- ✅ Search & filter
- ✅ Responsive UI
- ✅ Production deployment

Mari mulai! 🚀`,
    },
    {
      id: "2",
      title: "Setup Project & Database (Prisma + Supabase)",
      duration: "20 menit",
      content: `# Setup Project & Database

## Step 1: Create Next.js Project

\`\`\`bash
npx create-next-app@latest task-manager --typescript --tailwind --app --src-dir
cd task-manager
\`\`\`

## Step 2: Install Dependencies

\`\`\`bash
npm install prisma @prisma/client zod
npm install -D prisma
npx prisma init
\`\`\`

## Step 3: Setup Supabase

1. Buka [supabase.com](https://supabase.com) → New Project
2. Pilih region terdekat (Singapore)
3. Copy connection string dari Settings → Database

## Step 4: Configure Prisma

Edit \`.env\`:

\`\`\`bash
DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[REF].supabase.co:5432/postgres"
\`\`\`

Edit \`prisma/schema.prisma\`:

\`\`\`prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Task {
  id          String   @id @default(cuid())
  title       String
  description String?
  completed   Boolean  @default(false)
  priority    String   @default("medium") // low, medium, high
  category    String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
\`\`\`

## Step 5: Push Schema ke Database

\`\`\`bash
npx prisma db push
npx prisma generate
\`\`\`

## Step 6: Buat Database Client

\`\`\`typescript
// src/lib/db.ts
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = db;
}
\`\`\`

## Step 7: Test Connection

\`\`\`bash
npx prisma studio
\`\`\`

Ini akan membuka browser dengan UI database. Kalau terbuka tanpa error, setup berhasil! ✅

## Prisma Workflow

\`\`\`
1. Edit schema.prisma → define/update models
2. npx prisma db push  → sync ke database
3. npx prisma generate → update TypeScript types
4. Import db dari lib/db.ts → pakai di server code
\`\`\`

Setup selesai! Sekarang kita design schema yang lebih lengkap 💾`,
    },
    {
      id: "3",
      title: "Database Schema Design",
      duration: "18 menit",
      content: `# Database Schema Design

## Prinsip Schema Design

1. **Normalize** — Pisahkan data ke tabel yang tepat
2. **Relations** — Gunakan foreign keys untuk hubungkan data
3. **Indexes** — Tambahkan index di kolom yang sering di-query
4. **Defaults** — Selalu set default values yang masuk akal

## Schema Lengkap Task Manager

\`\`\`prisma
// prisma/schema.prisma

model User {
  id        String   @id @default(cuid())
  name      String
  email     String   @unique
  image     String?
  tasks     Task[]
  createdAt DateTime @default(now())
}

model Task {
  id          String    @id @default(cuid())
  title       String
  description String?
  completed   Boolean   @default(false)
  priority    Priority  @default(MEDIUM)
  dueDate     DateTime?
  
  category    Category? @relation(fields: [categoryId], references: [id])
  categoryId  String?
  
  user        User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  userId      String
  
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  @@index([userId])
  @@index([categoryId])
  @@index([completed])
}

model Category {
  id    String @id @default(cuid())
  name  String
  color String @default("#888888")
  tasks Task[]
  
  userId String
  
  @@unique([name, userId])
}

enum Priority {
  LOW
  MEDIUM
  HIGH
  URGENT
}
\`\`\`

## Relations Explained

\`\`\`
User (1) ──── (Many) Task
  │
  └── Satu user punya banyak tasks

Category (1) ──── (Many) Task  
  │
  └── Satu category punya banyak tasks

Task (Many) ──── (1) User
Task (Many) ──── (1) Category (optional)
\`\`\`

## Prisma Query Cheat Sheet

\`\`\`typescript
// Create
const task = await db.task.create({
  data: { title: "Belajar Prisma", userId: "user123" }
});

// Read (with relations)
const tasks = await db.task.findMany({
  where: { userId: "user123" },
  include: { category: true },
  orderBy: { createdAt: "desc" }
});

// Update
await db.task.update({
  where: { id: "task123" },
  data: { completed: true }
});

// Delete
await db.task.delete({
  where: { id: "task123" }
});

// Count
const count = await db.task.count({
  where: { userId: "user123", completed: false }
});
\`\`\`

Push perubahan:

\`\`\`bash
npx prisma db push
npx prisma generate
\`\`\`

Schema siap! Sekarang kita bikin API-nya 🔌`,
    },
    {
      id: "4",
      title: "API Routes di Next.js",
      duration: "20 menit",
      content: `# API Routes di Next.js

## Apa Itu Route Handlers?

Route Handlers adalah cara bikin API endpoints di Next.js App Router. File \`route.ts\` di dalam folder \`app/api/\` otomatis jadi API endpoint.

## Struktur

\`\`\`
app/api/
├── tasks/
│   ├── route.ts          → GET /api/tasks, POST /api/tasks
│   └── [id]/
│       └── route.ts      → GET/PUT/DELETE /api/tasks/:id
└── categories/
    └── route.ts          → GET/POST /api/categories
\`\`\`

## GET — Ambil Semua Tasks

\`\`\`typescript
// app/api/tasks/route.ts
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const completed = searchParams.get("completed");
  const search = searchParams.get("search");
  
  const tasks = await db.task.findMany({
    where: {
      ...(completed !== null && { completed: completed === "true" }),
      ...(search && {
        OR: [
          { title: { contains: search, mode: "insensitive" } },
          { description: { contains: search, mode: "insensitive" } },
        ],
      }),
    },
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(tasks);
}
\`\`\`

## POST — Buat Task Baru

\`\`\`typescript
// Masih di app/api/tasks/route.ts
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const task = await db.task.create({
      data: {
        title: body.title,
        description: body.description,
        priority: body.priority || "MEDIUM",
        categoryId: body.categoryId,
        userId: body.userId, // nanti dari auth session
      },
    });

    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create task" },
      { status: 500 }
    );
  }
}
\`\`\`

## PUT & DELETE — Single Task

\`\`\`typescript
// app/api/tasks/[id]/route.ts
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();

  const task = await db.task.update({
    where: { id },
    data: body,
  });

  return NextResponse.json(task);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  
  await db.task.delete({ where: { id } });
  
  return NextResponse.json({ success: true });
}
\`\`\`

## Testing API

\`\`\`bash
# GET tasks
curl http://localhost:3000/api/tasks

# POST task baru
curl -X POST http://localhost:3000/api/tasks \\
  -H "Content-Type: application/json" \\
  -d '{"title":"Test task","userId":"user123"}'
  
# Atau pakai Prisma Studio untuk cek data
npx prisma studio
\`\`\`

## Error Handling Pattern

\`\`\`typescript
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate
    if (!body.title) {
      return NextResponse.json(
        { error: "Title is required" },
        { status: 400 }
      );
    }
    
    // Execute
    const result = await db.task.create({ data: body });
    return NextResponse.json(result, { status: 201 });
    
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
\`\`\`

API routes siap! Tapi ada cara yang lebih modern... Server Actions! 🚀`,
    },
    {
      id: "5",
      title: "Server Actions: The Modern Way",
      duration: "22 menit",
      content: `# Server Actions: The Modern Way

## Apa Itu Server Actions?

Server Actions memungkinkan kamu menjalankan kode server **langsung dari komponen React** — tanpa perlu bikin API endpoint terpisah.

\`\`\`typescript
// Ini berjalan di SERVER, bukan di browser!
"use server";

export async function createTask(formData: FormData) {
  const title = formData.get("title") as string;
  await db.task.create({ data: { title, userId: "..." } });
}
\`\`\`

## Setup: Task Actions

\`\`\`typescript
// src/actions/task-actions.ts
"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

// Validation schema
const TaskSchema = z.object({
  title: z.string().min(1, "Title wajib diisi").max(200),
  description: z.string().optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]).default("MEDIUM"),
  categoryId: z.string().optional(),
});

// CREATE
export async function createTask(formData: FormData) {
  const validated = TaskSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    priority: formData.get("priority"),
    categoryId: formData.get("categoryId") || undefined,
  });

  if (!validated.success) {
    return { error: validated.error.flatten().fieldErrors };
  }

  await db.task.create({
    data: {
      ...validated.data,
      userId: "temp-user", // nanti dari auth
    },
  });

  revalidatePath("/tasks");
  return { success: true };
}

// UPDATE
export async function updateTask(id: string, data: Partial<z.infer<typeof TaskSchema>>) {
  await db.task.update({ where: { id }, data });
  revalidatePath("/tasks");
}

// TOGGLE COMPLETE
export async function toggleTask(id: string) {
  const task = await db.task.findUnique({ where: { id } });
  if (!task) return;
  
  await db.task.update({
    where: { id },
    data: { completed: !task.completed },
  });
  
  revalidatePath("/tasks");
}

// DELETE
export async function deleteTask(id: string) {
  await db.task.delete({ where: { id } });
  revalidatePath("/tasks");
}
\`\`\`

## Pakai di Form Component

\`\`\`tsx
// src/components/TaskForm.tsx
"use client";

import { createTask } from "@/actions/task-actions";
import { useRef } from "react";

export function TaskForm() {
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(formData: FormData) {
    const result = await createTask(formData);
    if (result.success) {
      formRef.current?.reset();
    }
  }

  return (
    <form ref={formRef} action={handleSubmit} className="space-y-4">
      <input
        name="title"
        placeholder="Apa yang mau kamu kerjakan?"
        className="w-full px-4 py-3 bg-[#111] border border-[#222] rounded-xl 
          text-white placeholder-gray-600 focus:border-[#BFFF00] focus:outline-none"
        required
      />
      
      <textarea
        name="description"
        placeholder="Deskripsi (opsional)"
        className="w-full px-4 py-3 bg-[#111] border border-[#222] rounded-xl
          text-white placeholder-gray-600 focus:border-[#BFFF00] focus:outline-none"
        rows={3}
      />
      
      <select
        name="priority"
        className="px-4 py-2 bg-[#111] border border-[#222] rounded-lg text-white"
      >
        <option value="LOW">Low</option>
        <option value="MEDIUM" selected>Medium</option>
        <option value="HIGH">High</option>
        <option value="URGENT">Urgent</option>
      </select>

      <button
        type="submit"
        className="px-6 py-3 bg-[#BFFF00] text-black font-bold rounded-xl hover:bg-[#d4ff4d]"
      >
        Tambah Task
      </button>
    </form>
  );
}
\`\`\`

## Key Takeaways

1. **"use server"** — tandai file/function sebagai server action
2. **revalidatePath** — refresh data di halaman setelah mutasi
3. **Zod validation** — selalu validasi input dari user
4. **Progressive enhancement** — form bisa work tanpa JavaScript

Server Actions = lebih clean, lebih aman, lebih modern! ⚡`,
    },
    {
      id: "6",
      title: "CRUD: Create & Read",
      duration: "25 menit",
      content: `# CRUD: Create & Read

## Halaman Task List

\`\`\`tsx
// src/app/tasks/page.tsx
import { db } from "@/lib/db";
import { TaskForm } from "@/components/TaskForm";
import { TaskList } from "@/components/TaskList";

export default async function TasksPage() {
  const tasks = await db.task.findMany({
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });

  const stats = {
    total: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    pending: tasks.filter(t => !t.completed).length,
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold text-white mb-2">My Tasks</h1>
      <p className="text-gray-500 mb-8">
        {stats.completed}/{stats.total} selesai
      </p>

      {/* Progress bar */}
      <div className="w-full h-2 bg-[#1a1a1a] rounded-full mb-8">
        <div
          className="h-full bg-[#BFFF00] rounded-full transition-all"
          style={{ width: stats.total > 0
            ? \`\${(stats.completed / stats.total) * 100}%\`
            : "0%" }}
        />
      </div>

      {/* Form */}
      <div className="mb-8">
        <TaskForm />
      </div>

      {/* List */}
      <TaskList tasks={tasks} />
    </div>
  );
}
\`\`\`

## Task List Component

\`\`\`tsx
// src/components/TaskList.tsx
"use client";

import { toggleTask, deleteTask } from "@/actions/task-actions";
import { Check, Trash2, Clock } from "lucide-react";

interface Task {
  id: string;
  title: string;
  description: string | null;
  completed: boolean;
  priority: string;
  createdAt: Date;
  category: { name: string; color: string } | null;
}

export function TaskList({ tasks }: { tasks: Task[] }) {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-12 text-gray-600">
        <p className="text-lg">Belum ada task 📝</p>
        <p className="text-sm mt-2">Tambahkan task pertamamu di atas!</p>
      </div>
    );
  }

  const priorityColors: Record<string, string> = {
    LOW: "#4ade80",
    MEDIUM: "#fbbf24",
    HIGH: "#f97316",
    URGENT: "#ef4444",
  };

  return (
    <div className="space-y-2">
      {tasks.map(task => (
        <div
          key={task.id}
          className={\`group flex items-start gap-3 p-4 bg-[#111] rounded-xl 
            border border-[#1a1a1a] hover:border-[#333] transition-all
            \${task.completed ? "opacity-60" : ""}\`}
        >
          {/* Toggle */}
          <button
            onClick={() => toggleTask(task.id)}
            className={\`w-6 h-6 rounded-full border-2 flex items-center justify-center 
              flex-shrink-0 mt-0.5 transition-all
              \${task.completed
                ? "bg-[#BFFF00] border-[#BFFF00]"
                : "border-gray-600 hover:border-[#BFFF00]"}\`}
          >
            {task.completed && <Check className="w-3.5 h-3.5 text-black" />}
          </button>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <p className={\`font-medium \${task.completed 
              ? "line-through text-gray-600" 
              : "text-white"}\`}>
              {task.title}
            </p>
            {task.description && (
              <p className="text-sm text-gray-500 mt-1">{task.description}</p>
            )}
            <div className="flex items-center gap-3 mt-2">
              <span
                className="text-xs px-2 py-0.5 rounded"
                style={{
                  backgroundColor: priorityColors[task.priority] + "15",
                  color: priorityColors[task.priority],
                }}
              >
                {task.priority}
              </span>
              {task.category && (
                <span
                  className="text-xs px-2 py-0.5 rounded"
                  style={{
                    backgroundColor: task.category.color + "15",
                    color: task.category.color,
                  }}
                >
                  {task.category.name}
                </span>
              )}
            </div>
          </div>

          {/* Delete */}
          <button
            onClick={() => deleteTask(task.id)}
            className="opacity-0 group-hover:opacity-100 p-1.5 text-gray-600 
              hover:text-red-400 transition-all"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
\`\`\`

## Latihan

Jalankan app dan coba:
1. Tambah beberapa tasks
2. Toggle complete/incomplete
3. Delete task
4. Cek data di Prisma Studio (\`npx prisma studio\`)

CRUD Create & Read done! ✅`,
    },
    {
      id: "7",
      title: "CRUD: Update & Delete",
      duration: "20 menit",
      content: `# CRUD: Update & Delete

## Edit Task Modal

\`\`\`tsx
// src/components/EditTaskModal.tsx
"use client";

import { useState } from "react";
import { updateTask } from "@/actions/task-actions";
import { X } from "lucide-react";

interface EditTaskModalProps {
  task: {
    id: string;
    title: string;
    description: string | null;
    priority: string;
  };
  onClose: () => void;
}

export function EditTaskModal({ task, onClose }: EditTaskModalProps) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || "");
  const [priority, setPriority] = useState(task.priority);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await updateTask(task.id, { title, description, priority: priority as any });
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="w-full max-w-md bg-[#111] rounded-2xl border border-[#222] p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-white">Edit Task</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#222] rounded-xl text-white"
          />
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            className="w-full px-4 py-3 bg-[#0a0a0a] border border-[#222] rounded-xl text-white"
            rows={3}
          />
          <select
            value={priority}
            onChange={e => setPriority(e.target.value)}
            className="px-4 py-2 bg-[#0a0a0a] border border-[#222] rounded-lg text-white"
          >
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
            <option value="URGENT">Urgent</option>
          </select>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose}
              className="flex-1 px-4 py-3 border border-[#333] rounded-xl text-gray-400">
              Batal
            </button>
            <button type="submit"
              className="flex-1 px-4 py-3 bg-[#BFFF00] text-black font-bold rounded-xl">
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
\`\`\`

## Delete dengan Confirmation

\`\`\`tsx
function DeleteConfirm({ taskId, onClose }: { taskId: string; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-[#111] rounded-2xl border border-[#222] p-6 max-w-sm">
        <h3 className="text-lg font-bold text-white mb-2">Hapus Task?</h3>
        <p className="text-gray-500 text-sm mb-6">
          Task yang sudah dihapus tidak bisa dikembalikan.
        </p>
        <div className="flex gap-3">
          <button onClick={onClose}
            className="flex-1 px-4 py-2 border border-[#333] rounded-xl text-gray-400">
            Batal
          </button>
          <button onClick={async () => { await deleteTask(taskId); onClose(); }}
            className="flex-1 px-4 py-2 bg-red-500 text-white font-bold rounded-xl">
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
}
\`\`\`

## Soft Delete Pattern (Optional)

Daripada menghapus permanen, tambahkan flag \`deletedAt\`:

\`\`\`prisma
model Task {
  // ... existing fields
  deletedAt DateTime?  // null = active, filled = soft deleted
}
\`\`\`

\`\`\`typescript
// Soft delete
await db.task.update({
  where: { id },
  data: { deletedAt: new Date() }
});

// Query hanya active tasks
const tasks = await db.task.findMany({
  where: { deletedAt: null }
});
\`\`\`

CRUD lengkap! Next: form validation yang proper ✅`,
    },
    {
      id: "8",
      title: "Form Handling & Validation (Zod)",
      duration: "22 menit",
      content: `# Form Handling & Validation (Zod)

## Kenapa Validasi?

**Never trust user input.** Validasi di client = UX. Validasi di server = security.

\`\`\`
Client validation → fast feedback, good UX
Server validation → security, data integrity
Pakai keduanya! ✅
\`\`\`

## Zod: Type-safe Validation

\`\`\`bash
npm install zod
\`\`\`

\`\`\`typescript
// src/lib/validations.ts
import { z } from "zod";

export const TaskSchema = z.object({
  title: z
    .string()
    .min(1, "Title wajib diisi")
    .max(200, "Title maksimal 200 karakter"),
  description: z
    .string()
    .max(1000, "Deskripsi maksimal 1000 karakter")
    .optional()
    .or(z.literal("")),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]).default("MEDIUM"),
  categoryId: z.string().cuid().optional().or(z.literal("")),
  dueDate: z.string().datetime().optional().or(z.literal("")),
});

export type TaskInput = z.infer<typeof TaskSchema>;

// Reusable validation helper
export function validateInput<T>(schema: z.ZodSchema<T>, data: unknown) {
  const result = schema.safeParse(data);
  if (!result.success) {
    return { 
      success: false as const, 
      errors: result.error.flatten().fieldErrors 
    };
  }
  return { success: true as const, data: result.data };
}
\`\`\`

## Server Action with Validation

\`\`\`typescript
// src/actions/task-actions.ts
"use server";

import { db } from "@/lib/db";
import { TaskSchema, validateInput } from "@/lib/validations";
import { revalidatePath } from "next/cache";

export async function createTask(prevState: any, formData: FormData) {
  const rawData = {
    title: formData.get("title"),
    description: formData.get("description"),
    priority: formData.get("priority"),
    categoryId: formData.get("categoryId"),
  };

  const validation = validateInput(TaskSchema, rawData);
  
  if (!validation.success) {
    return { errors: validation.errors, success: false };
  }

  try {
    await db.task.create({
      data: {
        ...validation.data,
        userId: "temp-user",
        categoryId: validation.data.categoryId || null,
      },
    });
    
    revalidatePath("/tasks");
    return { success: true, errors: null };
  } catch (error) {
    return { success: false, errors: { _form: ["Gagal menyimpan task"] } };
  }
}
\`\`\`

## Form with Error Display

\`\`\`tsx
"use client";
import { useActionState } from "react";
import { createTask } from "@/actions/task-actions";

export function TaskForm() {
  const [state, action, pending] = useActionState(createTask, { 
    errors: null, 
    success: false 
  });

  return (
    <form action={action} className="space-y-4">
      <div>
        <input
          name="title"
          placeholder="Apa yang mau dikerjakan?"
          className="w-full px-4 py-3 bg-[#111] border border-[#222] rounded-xl text-white"
        />
        {state.errors?.title && (
          <p className="text-red-400 text-sm mt-1">{state.errors.title[0]}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={pending}
        className="px-6 py-3 bg-[#BFFF00] text-black font-bold rounded-xl 
          disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {pending ? "Menyimpan..." : "Tambah Task"}
      </button>

      {state.success && (
        <p className="text-green-400 text-sm">✅ Task berhasil ditambahkan!</p>
      )}
    </form>
  );
}
\`\`\`

Validasi solid = app yang reliable! 🛡️`,
    },
    {
      id: "9",
      title: "Authentication dengan NextAuth.js",
      duration: "25 menit",
      content: `# Authentication dengan NextAuth.js

## Setup NextAuth.js v5

\`\`\`bash
npm install next-auth@beta @auth/prisma-adapter
\`\`\`

## Konfigurasi Auth

\`\`\`typescript
// src/auth.ts
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    Google({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    session({ session, user }) {
      session.user.id = user.id;
      return session;
    },
  },
});
\`\`\`

## Auth API Route

\`\`\`typescript
// src/app/api/auth/[...nextauth]/route.ts
import { handlers } from "@/auth";
export const { GET, POST } = handlers;
\`\`\`

## Tambah Auth Schema ke Prisma

\`\`\`prisma
model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String?
  access_token      String?
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String?
  user              User    @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}
\`\`\`

## Login Page

\`\`\`tsx
// src/app/login/page.tsx
import { signIn } from "@/auth";
import { Github } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-[#111] rounded-2xl border border-[#1a1a1a] p-8 max-w-sm w-full">
        <h1 className="text-2xl font-bold text-white text-center mb-6">
          Login ke Task Manager
        </h1>

        <form action={async () => {
          "use server";
          await signIn("github");
        }}>
          <button type="submit"
            className="w-full flex items-center justify-center gap-2 px-6 py-3 
              bg-white text-black font-semibold rounded-xl hover:bg-gray-100">
            <Github className="w-5 h-5" />
            Login dengan GitHub
          </button>
        </form>
      </div>
    </div>
  );
}
\`\`\`

## Menggunakan Session

\`\`\`tsx
// Di Server Component
import { auth } from "@/auth";

export default async function Page() {
  const session = await auth();
  
  if (!session) {
    redirect("/login");
  }

  return <h1>Hello, {session.user.name}!</h1>;
}
\`\`\`

Auth ready! Sekarang user bisa login dan punya data masing-masing 🔐`,
    },
    {
      id: "10",
      title: "Protected Routes & Middleware",
      duration: "18 menit",
      content: `# Protected Routes & Middleware

## Next.js Middleware

Middleware berjalan **sebelum** request sampai ke halaman. Perfect untuk auth check.

\`\`\`typescript
// src/middleware.ts
import { auth } from "./auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isAuthPage = req.nextUrl.pathname.startsWith("/login");
  const isProtected = req.nextUrl.pathname.startsWith("/tasks") ||
                      req.nextUrl.pathname.startsWith("/dashboard");

  // Redirect logged-in users away from login page
  if (isAuthPage && isLoggedIn) {
    return NextResponse.redirect(new URL("/tasks", req.url));
  }

  // Redirect unauthenticated users to login
  if (isProtected && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/tasks/:path*", "/dashboard/:path*", "/login"],
};
\`\`\`

## Server-Side Auth Check

\`\`\`typescript
// Di Server Actions, selalu check auth!
"use server";

import { auth } from "@/auth";

export async function createTask(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }

  // Sekarang pakai session.user.id
  await db.task.create({
    data: {
      title: formData.get("title") as string,
      userId: session.user.id, // ← dari session!
    },
  });
}
\`\`\`

## API Route Protection

\`\`\`typescript
// app/api/tasks/route.ts
import { auth } from "@/auth";

export async function GET() {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const tasks = await db.task.findMany({
    where: { userId: session.user.id },
  });

  return NextResponse.json(tasks);
}
\`\`\`

## Auth Helper

\`\`\`typescript
// src/lib/auth-helpers.ts
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export async function requireAuth() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  return session.user;
}

// Usage di Server Component:
export default async function ProtectedPage() {
  const user = await requireAuth();
  return <h1>Hello {user.name}</h1>;
}
\`\`\`

Routes terlindungi! Hanya user yang login bisa akses data mereka 🛡️`,
    },
    {
      id: "11",
      title: "File Upload & Storage",
      duration: "20 menit",
      content: `# File Upload & Storage

## Options untuk Storage

| Service | Gratis | Best For |
|---------|--------|----------|
| Vercel Blob | 256MB | Simple files |
| Supabase Storage | 1GB | Already using Supabase |
| Cloudinary | 25GB | Images & video |
| UploadThing | 2GB | Next.js native |

## Method: Supabase Storage

\`\`\`bash
npm install @supabase/supabase-js
\`\`\`

\`\`\`typescript
// src/lib/storage.ts
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
);

export async function uploadFile(file: File, path: string) {
  const { data, error } = await supabase.storage
    .from("attachments")
    .upload(path, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) throw error;

  const { data: urlData } = supabase.storage
    .from("attachments")
    .getPublicUrl(data.path);

  return urlData.publicUrl;
}

export async function deleteFile(path: string) {
  await supabase.storage.from("attachments").remove([path]);
}
\`\`\`

## Upload API Route

\`\`\`typescript
// app/api/upload/route.ts
import { auth } from "@/auth";
import { uploadFile } from "@/lib/storage";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const formData = await request.formData();
  const file = formData.get("file") as File;

  if (!file) return NextResponse.json({ error: "No file" }, { status: 400 });

  // Validate file
  const MAX_SIZE = 5 * 1024 * 1024; // 5MB
  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: "File too large (max 5MB)" }, { status: 400 });
  }

  const path = \`\${session.user.id}/\${Date.now()}-\${file.name}\`;
  const url = await uploadFile(file, path);

  return NextResponse.json({ url });
}
\`\`\`

## File Upload Component

\`\`\`tsx
"use client";
import { useState } from "react";
import { Upload, X } from "lucide-react";

export function FileUpload({ onUpload }: { onUpload: (url: string) => void }) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setPreview(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", { method: "POST", body: formData });
    const data = await res.json();

    if (data.url) onUpload(data.url);
    setUploading(false);
  }

  return (
    <label className="flex items-center gap-2 px-4 py-2 border border-dashed 
      border-gray-700 rounded-xl cursor-pointer hover:border-[#BFFF00] transition-all">
      <Upload className="w-4 h-4 text-gray-500" />
      <span className="text-sm text-gray-500">
        {uploading ? "Uploading..." : "Attach file"}
      </span>
      <input type="file" className="hidden" onChange={handleChange} accept="image/*,.pdf" />
    </label>
  );
}
\`\`\`

File upload done! User bisa attach file ke tasks 📎`,
    },
    {
      id: "12",
      title: "Search, Filter, & Pagination",
      duration: "22 menit",
      content: `# Search, Filter, & Pagination

## URL-Based State

Gunakan URL search params supaya bisa di-share dan di-bookmark.

\`\`\`
/tasks?search=deploy&priority=HIGH&page=2
\`\`\`

## Server-Side Filtering

\`\`\`typescript
// src/app/tasks/page.tsx
import { db } from "@/lib/db";

interface PageProps {
  searchParams: Promise<{
    search?: string;
    priority?: string;
    completed?: string;
    page?: string;
  }>;
}

export default async function TasksPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const perPage = 10;

  const where = {
    userId: "current-user-id",
    ...(params.search && {
      OR: [
        { title: { contains: params.search, mode: "insensitive" as const } },
        { description: { contains: params.search, mode: "insensitive" as const } },
      ],
    }),
    ...(params.priority && { priority: params.priority as any }),
    ...(params.completed !== undefined && { completed: params.completed === "true" }),
  };

  const [tasks, total] = await Promise.all([
    db.task.findMany({
      where,
      include: { category: true },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * perPage,
      take: perPage,
    }),
    db.task.count({ where }),
  ]);

  const totalPages = Math.ceil(total / perPage);

  return (
    <div>
      <SearchBar defaultValue={params.search} />
      <FilterBar priority={params.priority} completed={params.completed} />
      <TaskList tasks={tasks} />
      <Pagination currentPage={page} totalPages={totalPages} />
    </div>
  );
}
\`\`\`

## Search Component with Debounce

\`\`\`tsx
"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Search } from "lucide-react";

export function SearchBar({ defaultValue }: { defaultValue?: string }) {
  const [query, setQuery] = useState(defaultValue || "");
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      if (query) {
        params.set("search", query);
      } else {
        params.delete("search");
      }
      params.delete("page"); // reset page on new search
      router.push(\`/tasks?\${params.toString()}\`);
    }, 300); // 300ms debounce

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Cari task..."
        className="w-full pl-10 pr-4 py-3 bg-[#111] border border-[#222] rounded-xl text-white"
      />
    </div>
  );
}
\`\`\`

## Pagination Component

\`\`\`tsx
"use client";
import { useRouter, useSearchParams } from "next/navigation";

export function Pagination({ currentPage, totalPages }: { currentPage: number; totalPages: number }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function goToPage(page: number) {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(page));
    router.push(\`/tasks?\${params.toString()}\`);
  }

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage <= 1}
        className="px-3 py-2 rounded-lg bg-[#111] border border-[#222] text-gray-400 
          disabled:opacity-30"
      >
        ←
      </button>
      <span className="text-sm text-gray-500">
        {currentPage} / {totalPages}
      </span>
      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="px-3 py-2 rounded-lg bg-[#111] border border-[#222] text-gray-400
          disabled:opacity-30"
      >
        →
      </button>
    </div>
  );
}
\`\`\`

Search, filter, pagination — data navigation lengkap! 🔍`,
    },
    {
      id: "13",
      title: "Error Handling & Loading States",
      duration: "18 menit",
      content: `# Error Handling & Loading States

## Loading States

### Suspense + Loading UI

\`\`\`tsx
// src/app/tasks/loading.tsx
export default function Loading() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      {/* Skeleton header */}
      <div className="h-8 w-48 bg-[#1a1a1a] rounded-lg animate-pulse mb-4" />
      <div className="h-4 w-32 bg-[#1a1a1a] rounded mb-8 animate-pulse" />
      
      {/* Skeleton cards */}
      {[1, 2, 3, 4, 5].map(i => (
        <div key={i} className="p-4 bg-[#111] rounded-xl border border-[#1a1a1a] mb-2">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-[#1a1a1a] animate-pulse" />
            <div className="flex-1">
              <div className="h-4 w-3/4 bg-[#1a1a1a] rounded animate-pulse" />
              <div className="h-3 w-1/2 bg-[#1a1a1a] rounded animate-pulse mt-2" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
\`\`\`

### Button Loading State

\`\`\`tsx
function SubmitButton() {
  const { pending } = useFormStatus();
  
  return (
    <button
      type="submit"
      disabled={pending}
      className="px-6 py-3 bg-[#BFFF00] text-black font-bold rounded-xl
        disabled:opacity-50 transition-all flex items-center gap-2"
    >
      {pending ? (
        <>
          <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
          Menyimpan...
        </>
      ) : (
        "Simpan"
      )}
    </button>
  );
}
\`\`\`

## Error Boundaries

\`\`\`tsx
// src/app/tasks/error.tsx
"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="max-w-md mx-auto px-6 py-24 text-center">
      <div className="text-4xl mb-4">😵</div>
      <h2 className="text-xl font-bold text-white mb-2">Oops! Ada yang salah</h2>
      <p className="text-gray-500 mb-6">{error.message}</p>
      <button
        onClick={reset}
        className="px-6 py-3 bg-[#BFFF00] text-black font-bold rounded-xl"
      >
        Coba Lagi
      </button>
    </div>
  );
}
\`\`\`

## Toast Notifications

\`\`\`tsx
"use client";
import { useState, useEffect } from "react";
import { CheckCircle, XCircle, X } from "lucide-react";

interface Toast {
  id: string;
  message: string;
  type: "success" | "error";
}

export function ToastContainer() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Listen for custom events
  useEffect(() => {
    function handler(e: CustomEvent<Toast>) {
      setToasts(prev => [...prev, e.detail]);
      setTimeout(() => {
        setToasts(prev => prev.filter(t => t.id !== e.detail.id));
      }, 3000);
    }
    window.addEventListener("toast" as any, handler);
    return () => window.removeEventListener("toast" as any, handler);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 space-y-2">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className="flex items-center gap-2 px-4 py-3 bg-[#111] border 
            border-[#222] rounded-xl shadow-lg text-sm animate-slide-up"
        >
          {toast.type === "success"
            ? <CheckCircle className="w-4 h-4 text-green-400" />
            : <XCircle className="w-4 h-4 text-red-400" />}
          <span className="text-white">{toast.message}</span>
        </div>
      ))}
    </div>
  );
}
\`\`\`

Error handling yang solid = user experience yang baik! 🛡️`,
    },
    {
      id: "14",
      title: "Testing & Debugging",
      duration: "20 menit",
      content: `# Testing & Debugging

## Console Debugging

\`\`\`typescript
// Di Server Component / Server Action
console.log("📌 Debug:", { userId, taskId, data });

// Di Client Component
console.log("🎯 State:", { tasks, loading, error });

// Conditional logging
if (process.env.NODE_ENV === "development") {
  console.log("Debug info:", data);
}
\`\`\`

## React DevTools

Install React DevTools browser extension:
1. Inspect component tree
2. Check props dan state
3. Profile performance

## Prisma Debugging

\`\`\`typescript
// Lihat semua SQL queries
const db = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});

// Prisma Studio — visual database browser
// npx prisma studio
\`\`\`

## Network Tab Debugging

Browser DevTools → Network tab:
1. Filter by **Fetch/XHR** untuk lihat API calls
2. Check **Request payload** — data yang dikirim
3. Check **Response** — data yang diterima
4. Check **Status codes** — 200, 400, 401, 500

## Common Bugs & Fixes

### 1. "Cannot read properties of undefined"
\`\`\`typescript
// ❌ Bug
const name = user.name;  // user bisa undefined!

// ✅ Fix
const name = user?.name ?? "Anonymous";
\`\`\`

### 2. "Hydration mismatch"
\`\`\`typescript
// ❌ Bug — server/client render berbeda
const time = new Date().toLocaleTimeString();

// ✅ Fix — pakai useEffect untuk client-only
const [time, setTime] = useState("");
useEffect(() => setTime(new Date().toLocaleTimeString()), []);
\`\`\`

### 3. "Server Action error not showing"
\`\`\`typescript
// ✅ Selalu return error state
export async function action() {
  try {
    // ... logic
    return { success: true };
  } catch (error) {
    return { success: false, error: String(error) };
  }
}
\`\`\`

### 4. Stale data after mutation
\`\`\`typescript
// ✅ Revalidate setelah mutasi
import { revalidatePath } from "next/cache";

export async function updateTask() {
  await db.task.update({ ... });
  revalidatePath("/tasks"); // ← jangan lupa!
}
\`\`\`

## Testing Checklist

- [ ] Semua CRUD operations berfungsi
- [ ] Validasi form menampilkan error yang benar
- [ ] Auth redirect bekerja (protected routes)
- [ ] Loading states muncul saat fetch
- [ ] Error states muncul saat gagal
- [ ] Mobile responsive
- [ ] Edge cases: empty state, long text, special characters

Debug like a pro! 🐛`,
    },
    {
      id: "15",
      title: "🏆 Final Project: Deploy Task Manager",
      duration: "25 menit",
      content: `# 🏆 Final Project: Deploy Task Manager

Selamat! Kamu sudah belajar semua fundamental full-stack development. Sekarang waktunya **deploy ke production** dan bikin versi kamu sendiri.

## Project Requirements

Build dan deploy task manager dengan fitur minimal:

### Core Features
- [ ] User authentication (GitHub/Google login)
- [ ] Create, read, update, delete tasks
- [ ] Toggle task complete/incomplete
- [ ] Priority levels (Low, Medium, High, Urgent)
- [ ] Categories/labels

### Bonus Features (Customisasi!)
- [ ] Due dates dengan calendar picker
- [ ] Drag & drop reorder
- [ ] Dark/light theme toggle
- [ ] Task notes/comments
- [ ] File attachments
- [ ] Analytics dashboard
- [ ] Notification/reminders
- [ ] Share task lists
- [ ] Keyboard shortcuts

## Deploy Checklist

### 1. Environment Variables

\`\`\`bash
# .env.production
DATABASE_URL="postgresql://..."
NEXTAUTH_URL="https://yourdomain.com"
NEXTAUTH_SECRET="generate-random-secret"
GITHUB_ID="your-github-oauth-id"
GITHUB_SECRET="your-github-oauth-secret"
\`\`\`

### 2. Build & Test Locally

\`\`\`bash
npm run build
npm start
# Test semua fitur di localhost:3000
\`\`\`

### 3. Push ke GitHub

\`\`\`bash
git add .
git commit -m "feat: task manager complete"
git push origin main
\`\`\`

### 4. Deploy ke Vercel

1. **Vercel.com** → New Project → Import repo
2. **Add environment variables** dari .env
3. **Deploy** → tunggu build selesai
4. **Test** di production URL

### 5. Setup Database Production

1. Buka Supabase → pastikan production database ready
2. Run migrations: \`npx prisma db push\`
3. Test CRUD di production

## Customisasi Ideas

Bikin app ini **milik kamu** dengan customize:

### UI Themes
\`\`\`
- 🌊 Ocean: blue gradient, calm vibes
- 🔥 Fire: red/orange, energetic
- 🌿 Forest: green tones, nature
- 🌙 Midnight: deep purple, premium
- ☀️ Light: clean white, minimal
\`\`\`

### Feature Ideas
\`\`\`
- Pomodoro timer per task
- AI-generated task suggestions
- Calendar view (weekly/monthly)
- Team collaboration
- Mobile PWA support
- Import/export (CSV, JSON)
- Recurring tasks
- Task templates
\`\`\`

## Share Your Project!

Setelah deploy:
1. **Screenshot** app kamu
2. **Share** ke komunitas VIBENGODING.ID
3. **Tag** #vibengoding di social media
4. **Feedback** dari teman dan iterate!

## 🎉 Course Complete!

Kamu sudah belajar:
- ✅ Full-stack architecture
- ✅ Database design & Prisma
- ✅ API Routes & Server Actions
- ✅ CRUD operations
- ✅ Form validation (Zod)
- ✅ Authentication (NextAuth)
- ✅ Protected routes
- ✅ File upload
- ✅ Search, filter, pagination
- ✅ Error handling & loading states
- ✅ Testing & debugging
- ✅ Production deployment

**Next course:** Prompt Engineering Pro — master the art of prompting! 🧠`,
    },
  ],
};
