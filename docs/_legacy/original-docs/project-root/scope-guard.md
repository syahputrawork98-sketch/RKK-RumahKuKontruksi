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

## 📊 Status Label Definitions
| Label | Definisi |
| :--- | :--- |
| **DB-Backed v1** | Terhubung ke database rill melalui API lokal dan digunakan oleh UI/role terkait. |
| **Local CRUD** | Endpoint CRUD lokal tersedia, tetapi workflow bisnis final belum tentu lengkap. |
| **Partial** | Sebagian data/UI rill, sebagian masih shell/mock/placeholder. |
| **Shell / Static** | UI atau struktur sudah ada, tetapi belum memakai data dinamis rill. |
| **Backend Pending** | UI/alur sudah ada, namun menunggu implementasi backend operasional. |
| **Postponed** | Modul sengaja ditunda dan tidak boleh dibangun pada fase ini. |

## 🏗️ Prinsip Implementasi
- **Alur Bisnis Utama**: Semua implementasi teknis wajib merujuk ke dokumentasi alur bisnis.
- **Authority Boundary**: Progres resmi hanya dari Pengawas; Jurnal Mandor adalah klaim/bukti aktivitas.
- **Finance vs Progress**: Pembayaran tidak menciptakan atau mengubah progres fisik secara otomatis.
- **Workflow Priority**: Implementasi mendahulukan inti operasional (Progress -> Journal -> Report -> Material).

---
## 🛡️ Prinsip Keamanan
Seluruh data dan akses saat ini bersifat terbuka di `localhost`. Jangan menyimpan data sensitif rill ke dalam database pengembangan.
