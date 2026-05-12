# Scope Guard - RKK RumahKu Konstruksi

Dokumen ini mendefinisikan batasan ketat pengembangan proyek RKK untuk menjaga fokus pada **Local Development Feature Completion**.

## 🛑 Out-of-Scope (Hold)
Fitur-fitur berikut **TIDAK** dikembangkan pada fase ini:
- **Production Auth**: Tidak ada sistem login rill, register, atau manajemen password.
- **JWT & Session Management**: Keamanan berbasis token/session production ditunda.
- **Production RBAC**: Role-Based Access Control tingkat server untuk keamanan rill ditunda.
- **Production Deployment**: Tidak ada konfigurasi cloud deployment atau hardening server.
- **Payment & Legal Production**: Tidak ada integrasi payment gateway, invoice legal resmi, atau BAST legal rill.
- **Marketplace**: Fitur pencarian mitra rill atau transaksi terbuka ditunda.
- **Real-time Chat / WebSocket**: Komunikasi menggunakan HTTP CRUD standar (Non-realtime).
- **Upload Besar/Cloud**: Dokumentasi menggunakan storage lokal (`uploads/`), bukan S3/Cloud Storage.

## 🟢 In-Scope (Local Development)
- **Production-Minded Quality**: Fitur dibangun dengan logika bisnis, skema database, dan UI yang rapi (layak produksi), namun tetap berjalan di lingkungan lokal.
- **Developer Persona Switcher**: Menggunakan selector role/persona sebagai pengganti sistem login untuk simulasi alur kerja.
- **Database-Backed Logic**: Seluruh alur kerja Mandor, Pengawas, Admin, dan Konsumen harus terhubung ke database lokal (Express + Prisma).

---
## 🛡️ Prinsip Keamanan
Seluruh data dan akses saat ini bersifat terbuka di `localhost`. Jangan menyimpan data sensitif rill ke dalam database pengembangan.
