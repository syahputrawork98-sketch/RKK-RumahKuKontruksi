# Migration Plan - RumahKu Kontruksi

## Deskripsi
Rencana migrasi dari berbagai sumber pengembangan ke struktur repository final.

## Perubahan Arah Strategis (2026-05-06)
- **Ditinggalkan**: Repository `rumahkukontruksi-frontend` (Next.js) tidak lagi digunakan sebagai referensi frontend karena alasan performa dan kemudahan pengembangan saat ini.
- **Dipilih**: Repository `RumahKuKontruksi-Dev/client` (Vite React) dipilih sebagai basis frontend final.

## Tahapan Migrasi

### Tahap 1: Restrukturisasi & Reset (DONE)
- [x] Inisialisasi struktur repository final (client/, server/, docs/).
- [x] Penghapusan frontend Next.js lama.
- [x] Migrasi frontend Vite React dari `RumahKuKontruksi-Dev`.
- [x] Verifikasi running dev server.

### Tahap 2: Stabilisasi Frontend (ONGOING)
- [ ] Reorganisasi dokumentasi dan inventarisasi route/komponen.
- [ ] Audit UI/UX menyeluruh.
- [ ] Implementasi mock data terpusat di `client/src/data/mock/`.
- [ ] Perbaikan isu-isu UI minor (Navbar, Responsive).

### Tahap 3: Migrasi & Baseline Backend (DONE/ONGOING)
- [x] Inisialisasi Express API & Prisma Data Service (Node.js).
- [x] Baseline Migration & Re-seed dari Mock Data Frontend.
- [x] Implementasi Customer CRUD & Project Read Endpoints.
- [ ] Stabilisasi & CRUD untuk modul Proyek/RAB.

### Tahap 4: Integrasi & Deployment (CURRENT)
- [ ] Sinkronisasi API service dengan Frontend (Penggantian Mock Service).
- [ ] Production build dan deployment.
