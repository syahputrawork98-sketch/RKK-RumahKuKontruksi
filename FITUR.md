# FITUR — RKK RumahKu Konstruksi

Ringkasan fungsionalitas dan status pengembangan aplikasi **RKK RumahKu Konstruksi**, sebuah platform terpadu untuk menghubungkan konsumen, pengawas, mandor, admin, dan arsitek dalam satu ekosistem konstruksi digital.

## 📊 Status Umum Project
- **Phase**: Local Development Feature Completion (Localhost)
- **Production Ready**: **No**
- **Last Completed Batch**: F01D.3 (Dokumentasi & Migrasi)
- **Source of Truth (SOT)**: `Project.verifiedProgress` (Progress lapangan yang dikelola oleh Pengawas).

## 🗂 Target Struktur Repository
- **`client/`**: React, Vite, Tailwind CSS (Frontend)
- **`server/`**: Node.js, Express, Prisma (Backend)
- **`docs/`**: Pusat dokumentasi teknis & manajemen (Dokumentasi Aktif)
- **`database`**: Supabase PostgreSQL

## 🧑‍🤝‍🧑 Ringkasan Role
- **Publik**: Melihat informasi umum layanan dan portofolio RKK.
- **Konsumen**: Melacak timeline progres desain & konstruksi, menyetujui RAB, serta melihat riwayat pembayaran.
- **Admin**: Memproses *Design Request*, menerbitkan RAB, melakukan verifikasi kesiapan konstruksi, serta mengaudit *Material Request*.
- **Superadmin**: Governance, audit log, manajemen user dan kontrol akses sistem secara keseluruhan.
- **Pengawas**: Menyetujui pekerjaan lapangan (Mandor), menyetujui pengajuan *Material Request* lokal, dan mengunci SOT *Verified Progress*.
- **Mandor**: Melakukan input jurnal lapangan, mengajukan kebutuhan material, dan melaporkan isu (Field Issue) dari site.
- **Arsitek**: Menangani *Design Request* sebelum diteruskan ke Admin untuk dibuatkan RAB.

## ⚙️ Status Teknis
- **Frontend**: Vite + React sudah terkonfigurasi. (Status: *Existing*)
- **Backend**: Express REST API dengan struktur modular. (Status: *Existing*)
- **Database**: Skema menggunakan Prisma + Supabase. (Status: *Needs Verification*)
- **Auth**: Mekanisme otentikasi riil belum diverifikasi / disimulasikan lokal. (Status: *Hold / Not Verified*)
- **Deployment**: Belum dikonfigurasi untuk environment produksi. (Status: *Not Started*)

## ⚠️ Needs Verification / Partial / Hold
1. **Production Infrastructure (Hold)**: Auth riil (JWT/Password), Cloud Storage asli, dan Payment Gateway riil belum berjalan.
2. **Global Billing (Hold)**: Fitur pembayaran tagihan sistem secara global.
3. **Database & API (Needs Verification)**: Banyak rute API yang masih dalam tahap integrasi dengan SOT lapangan.

---
## 🔗 Tautan Penting
- [Dashboard Status Proyek (`CURRENT_STATUS.md`)](docs/project/history/CURRENT_STATUS.md)
- [Riwayat Indeks Fitur (`FEATURE_HISTORY.md`)](docs/project/history/FEATURE_HISTORY.md)
- [Arsitektur Frontend](docs/frontend/README.md)
- [Arsitektur Backend](docs/backend/README.md)
- [Arsitektur Database](docs/database/README.md)
