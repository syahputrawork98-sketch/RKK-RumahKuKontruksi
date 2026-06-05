# Analisis Migrasi RumahKu Kontruksi

Dokumen ini berisi analisis awal terhadap dua repositori sumber untuk migrasi ke repositori utama **RKK-RumahKuKontruksi**.

## 1. Repositori Sumber

### A. rumahkukontruksi-frontend
- **Teknologi Utama**: Next.js 16 (React 19), TypeScript, Tailwind CSS 4.
- **Arsitektur**: Boilerplate Next.js modern dengan folder `app` yang terstruktur.
- **Fitur Utama**: 
  - Dashboard Admin & Client.
  - Manajemen Proyek, Kontrak, & Supplier.
  - Estimasi & Marketplace.
  - Integrasi OpenAPI untuk tipe API.
- **Status**: Frontend murni yang sangat terstruktur.

### B. RKK-RumahKuKontruksi
- **Teknologi Utama**:
  - **Client**: Vite, React 18, Tailwind CSS 4, DaisyUI, Supabase JS.
  - **Server**: Node.js, Express 5, Supabase.
- **Arsitektur**: Monorepo sederhana (client/server).
- **Fitur Utama**:
  - Dashboard dengan Recharts.
  - Integrasi langsung dengan Supabase (Auth & Database).
  - Export PDF (jspdf).
- **Status**: Implementasi full-stack yang mungkin memiliki logika bisnis dan integrasi database yang sudah matang.

## 2. Rencana Migrasi (Draft)

Tujuan migrasi adalah menyatukan keunggulan struktur frontend dari `rumahkukontruksi-frontend` dengan logika backend/database dari `RKK-RumahKuKontruksi`.

### Strategi:
1. **Basis Utama**: Menggunakan struktur `rumahkukontruksi-frontend` (Next.js 16) sebagai pondasi utama repositori ini.
2. **Integrasi Data**: Memindahkan konfigurasi Supabase dan logika layanan dari `RKK-RumahKuKontruksi/server` ke dalam Next.js API Routes atau Server Actions di repositori baru.
3. **Komponen UI**: Mengadopsi visual dan dashboard dari `RKK-RumahKuKontruksi/client` ke dalam komponen Next.js yang sudah ada.
4. **Sinkronisasi Tipe**: Memastikan tipe data dari OpenAPI selaras dengan skema database Supabase.

---
*Dibuat oleh Antigravity AI Coding Assistant*
