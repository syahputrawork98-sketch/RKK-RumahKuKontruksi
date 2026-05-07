# Migration Plan - RumahKu Konstruksi

## Deskripsi
Rencana strategis migrasi pengembangan dari *Mock-First UI* menuju *Database-Backed System* dengan fokus pada stabilitas lokal terlebih dahulu.

## Perubahan Arah Strategis (Mei 2026)
- **Local Development First**: Mengutamakan penyelesaian CRUD database lokal dan integrasi fungsional role sebelum masuk ke tahap produksi/deployment.
- **Role-Based Migration**: Migrasi dilakukan per role, dimulai dari role operasional lapangan (Pengawas & Mandor).
- **No Mock Fallback Policy**: Untuk role yang sudah memiliki backend, dilarang keras menggunakan mock data sebagai fallback utama guna menjamin integritas data sistem.

## Tahapan Migrasi

### Tahap 1: Restrukturisasi & Reset (DONE)
- [x] Inisialisasi struktur repository final (client/, server/, docs/).
- [x] Migrasi frontend Vite React pilihan ke folder `client/`.
- [x] Verifikasi running dev server frontend & backend.

### Tahap 2: Stabilisasi Frontend (DONE/ONGOING)
- [x] Implementasi mock data terpusat untuk referensi pengembangan.
- [x] Perbaikan navigasi dan tema dashboard (Superadmin/Admin).
- [ ] Refinement UI/UX untuk role lainnya.

### Tahap 3: Backend Core Data Service (DONE/ONGOING)
- [x] Inisialisasi Express API & Prisma Data Service.
- [x] Implementasi modul CRUD dasar:
    - Customers
    - Projects (Read/Filter)
    - Supervisors (Profile, Certs, Exp)
    - Foremen (Profile, Certs, Exp)
- [ ] Stabilisasi relasi antar model (Projects, Stages, RAB).

### Tahap 4: Local Role Integration (CURRENT)
- [x] Migrasi Role **Pengawas** ke Database-Backed v1.
- [x] Migrasi Role **Mandor** ke Database-Backed v1.
- [x] Implementasi Persona Selector (Dev Mode) untuk simulasi login lokal.
- [ ] Penghapusan bertahap dependensi mock data pada komponen inti role.

### Tahap 5: Operational CRUD Integration (NEXT)
- [ ] Implementasi modul operasional lapangan:
    - Daily Reports (Laporan Harian)
    - Material Requests (Permintaan Material)
    - Field Issues (Kendala Lapangan)
    - Task Management (Tugas Harian)
- [ ] Integrasi upload dokumentasi foto/file.

### Tahap 6: Auth & Production Hardening (POSTPONED)
- [ ] Implementasi sistem autentikasi asli (Login, JWT, Session).
- [ ] Server-side Role Guard & Permission.
- [ ] Production Build optimization.
- [ ] Deployment ke environment staging/production.
