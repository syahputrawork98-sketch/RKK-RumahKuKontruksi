# Technical: Frontend - RKK RumahKu Konstruksi

Frontend RKK menggunakan **Vite + React** dengan fokus pada pengalaman pengguna yang premium dan responsif.

## 🏗️ Arsitektur
- **Framework**: React (Vite).
- **Styling**: Tailwind CSS v4.
- **Components**: Modular components dengan pemisahan antara `shared` atoms dan `role-specific` panels.
- **State Management**: React Hooks (Context API untuk Persona).

## 🛡️ Batasan Frontend
- **Developer Persona Switcher**: Menggunakan `PersonaContext` untuk mensimulasikan identitas pengguna tanpa sistem login rill.
- **Standard States**: Menggunakan komponen `RoleDataState` untuk menangani Loading, Error, dan Empty states secara konsisten.

## 🗺️ Key Route Map
| Role | Base Path | Key Features | Status |
| :--- | :--- | :--- | :--- |
| **Admin** | `/admin` | `/dashboard`, `/proyek`, `/rab`, `/request-material`, `/laporan-mingguan-pengawas`. | Stabilized |
| **Mandor** | `/mandor` | `/proyek-aktif`, `/jurnal-mingguan`, `/request-material`. | Stabilized |
| **Pengawas**| `/pengawas`| `/proyek`, `/verifikasi-progres`, `/jurnal-mandor`, `/laporan-mingguan`. | Stabilized |
| **Konsumen**| `/konsumen`| `/proyek`, `/timeline-proyek`, `/permintaan-desain`, `/dokumen`. | Stabilized |
| **Arsitek** | `/arsitek` | `/peluang-desain`, `/desain-aktif`, `/riwayat`. | Stabilized |
| **Superadmin**| `/superadmin`| `/dashboard`, `/data-*` (Persona), `/proyek`, `/log-aktivitas`. | Stabilized |

## 🚧 Known Shell/Hold Routes
Beberapa route berikut sudah terdaftar namun masih bersifat shell atau menunggu implementasi backend lanjut:
- **Mandor**: `/tugas-harian`, `/laporan-harian`, `/kendala-lapangan` (Shell).
- **Arsitek**: `/tahapan/*` (Konsep, Denah, 3D) masih bersifat placeholder visual.
- **Finance**: `/pembayaran` (Admin/Konsumen) saat ini hanya simulasi pencatatan lokal.
- **Production-Related**: Seluruh route yang berkaitan dengan payment gateway, legal rill, dan deployment masih dalam status **Hold**.

---
*Untuk kebijakan pengambilan data, silakan merujuk ke [Data Source Policy](./data-source-policy.md).*
