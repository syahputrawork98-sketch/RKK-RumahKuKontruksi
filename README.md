# RKK - RumahKu Konstruksi (Local Development Feature Completion)

Repository utama untuk proyek **RumahKu Konstruksi**. Platform ini dirancang untuk menghubungkan Konsumen, Arsitek, Admin, Pengawas, dan Mandor dalam satu ekosistem pembangunan rumah yang transparan.

## 📊 Status Proyek
- **Current Checkpoint**: Batch 111 — Docs Sync + Payment Flow Checkpoint (Post-Batch 101–110).
- **Status**: Local Development Feature Completion.
- **Payment Flow**: Sekarang **Local DB/API-backed** (PaymentRecord, CustomerPaymentPlan, ForemanWeeklyPaymentEligibility).
- **Boundaries**: Tidak ada payment gateway nyata, webhook bank, legal invoice PDF, atau production auth/JWT. Progress SOT tetap `Project.verifiedProgress`.

---

## 🛠 Tech Stack

- **Frontend**: Vite + React + Tailwind CSS 4 + Framer Motion.
- **Backend**: Express.js (Node.js) dengan arsitektur modular.
- **Database**: PostgreSQL dengan Prisma ORM.
- **Documentation**: Markdown-based docs dalam direktori `docs/`.

---

## 📂 Struktur Project

```text
RKK-RumahKuKontruksi/
├── client/         # Frontend React App (Vite)
├── server/         # Backend API Service (Express + Prisma)
├── docs/           # Dokumentasi teknis & status proyek
├── README.md       # Panduan teknis setup (Dokumen ini)
└── FITUR.md        # Daftar fitur, status, & roadmap operasional
```

---

## 🚀 Cara Menjalankan Project

### 1. Persiapan Environment
Pastikan Anda memiliki **Node.js** (v18+) dan **PostgreSQL** yang berjalan secara lokal.

### 2. Backend (Server)
```bash
# Pindah ke direktori server
cd server

# Install dependencies
npm install

# Setup environment variables
# Copy .env.example ke .env dan sesuaikan DATABASE_URL
# Contoh: DATABASE_URL="postgresql://user:password@localhost:5432/rkk_db?schema=public"

# Sinkronisasi database
npx prisma generate
npx prisma db push

# Reset & Seed data testing
# Perhatian: Ini akan menghapus data lama dan mengisi skenario demo lengkap via Lean Orchestrator
# Module: Personas, Customers, Projects, RAB, Stages, Material Requests, Field Issues, Operations, Documents, Payments, Notifications, Design Flow.
npm run db:seed

# Jalankan server
npm run dev
```
*Server akan berjalan di `http://localhost:4000`.*

### 3. Frontend (Client)
```bash
# Pindah ke direktori client
cd client

# Install dependencies
npm install

# Jalankan frontend
npm run dev
```
*Aplikasi akan berjalan di `http://localhost:5173`.*

---

## 📌 Catatan Teknis Penting

- **API Base URL**: Frontend dikonfigurasi untuk mengakses API di `http://localhost:4000/api`. Pastikan backend dalam keadaan hidup (`running`) untuk menghindari error `net::ERR_CONNECTION_REFUSED`.
- **Persona Selector**: Sistem menggunakan **Dev Persona Switcher** untuk mensimulasikan role secara lokal. Belum menggunakan production auth/JWT/session/password.
- **Progress SOT**: `Project.verifiedProgress` tetap menjadi Source of Truth progres resmi proyek. Perubahan pada jurnal atau item pekerjaan tidak mengubah progress utama secara otomatis.
- **Roadmap Payment**: Alur pembayaran lokal (Proof upload, Admin verify, Foreman eligibility) sudah **DB-backed**. Integrasi Payment Gateway rill, Bank Webhook, dan Legal PDF export tetap berstatus **Hold**.

---

## 📖 Dokumentasi Detail

- 🛡️ [**Daftar Fitur & Roadmap (FITUR.md)**](FITUR.md)
- 📊 [**Current Status**](docs/project/current-status.md)
- 📜 [**Batch History**](docs/project/batch-history.md)
- 🔄 [**Design to Construction Flow**](docs/architecture/design-to-construction-flow.md)
- 🧩 [**Component Map**](docs/architecture/component-map.md)
- 🔗 [**Route Inventory**](docs/frontend/route-inventory.md)
- 🔌 [**API Status**](docs/backend/api-status.md)
- 👥 [**Role Data Source**](docs/frontend/role-data-source-status.md)

---
*© 2026 RumahKu Konstruksi - Local Development Feature Completion Mode.*
