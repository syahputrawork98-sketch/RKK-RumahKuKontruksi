# Technical: Frontend - RKK RumahKu Konstruksi

Frontend RKK menggunakan **Vite + React** dengan fokus pada pengalaman pengguna yang premium dan responsif.

## 🏗️ Arsitektur
- **Framework**: React (Vite).
- **Styling**: Tailwind CSS v4.
- **Components**: Modular components dengan pemisahan antara `shared` atoms dan `role-specific` panels.
- **State Management**: React Hooks (Context API untuk Persona).

## 🛡️ Batasan Frontend
- **Developer Persona Switcher**: Menggunakan `PersonaContext` untuk mensimulasikan identitas pengguna tanpa sistem login rill.
- **Standard Components**:
  - `RoleDataState`: Menangani Loading, Error, dan Empty states secara konsisten.
  - `StatusBadge`: Komponen tunggal (SSOT) untuk visualisasi status (Project, Design, Material, Stage, Issue). Diharmonisasi pada Batch 89.

## 🗺️ Key Route Map
| Role | Base Path | Key Features | Status |
| :--- | :--- | :--- | :--- |
| **Admin** | `/admin` | `/dashboard`, `/proyek`, `/rab`, `/request-material`, `/laporan-mingguan-pengawas`. | Stabilized (Batch 89) |
| **Mandor** | `/mandor` | `/proyek-aktif`, `/tugas-harian`, `/laporan-harian`, `/kendala-lapangan`. | Hardened (Batch 86) |
| **Pengawas**| `/pengawas`| `/proyek`, `/verifikasi-progres`, `/teknis/*` (Read-only panels). | Hardened (Batch 86) |
| **Konsumen**| `/konsumen`| `/proyek`, `/timeline-proyek`, `/permintaan-desain`, `/dokumen`. | Hardened (Batch 83, 84) |
| **Arsitek** | `/arsitek` | `/peluang-desain`, `/desain-aktif`, `/permintaan-desain`. | Hardened (Batch 84) |
| **Superadmin**| `/superadmin`| `/dashboard`, `/persona-directory`, `/audit-center`. | Hardened (Batch 85) |

## 🚧 Known Shell/Hold Routes
Beberapa route berikut sudah terdaftar namun masih bersifat shell atau menunggu implementasi backend lanjut:
- **Finance**: `/pembayaran` (Admin/Konsumen) saat ini hanya simulasi pencatatan lokal.
- **Production-Related**: Seluruh route yang berkaitan dengan payment gateway, legal rill, dan deployment masih dalam status **Hold**.
- **Supervisor-to-Customer**: Publikasi langsung laporan mingguan ke timeline konsumen tetap **Hold**.

---
*Untuk kebijakan pengambilan data, silakan merujuk ke [Data Source Policy](./data-source-policy.md).*
*Terakhir diperbarui: Batch 90.*
