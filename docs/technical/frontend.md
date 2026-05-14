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
  - `RoleDataState`: Menangani Loading, Error, dan Empty states secara konsisten. Distabilkan di seluruh persona pada Batch 99.
  - `StatusBadge`: Komponen tunggal (SSOT) untuk visualisasi status. Dibuat lebih robust untuk variasi status lintas-modul pada Batch 98.
  - `RolePersonaEmptyState`: Komponen khusus untuk state "Persona Belum Dipilih", diselaraskan estetikanya dengan `RoleDataState` pada Batch 99.

## 🗺️ Key Route Map
| Role | Base Path | Key Features | Status |
| :--- | :--- | :--- | :--- |
| **Admin** | `/admin` | `/dashboard` (Analytics v1), `/proyek`, `/permintaan-desain` (Bridge). | Stabilized (Batch 100) |
| **Mandor** | `/mandor` | `/proyek-aktif`, `/tugas-harian`, `/laporan-harian` (Polished). | Hardened (Batch 92) |
| **Pengawas**| `/pengawas`| `/proyek`, `/verifikasi-progres` (SOT SSOT). | Hardened (Batch 94) |
| **Konsumen**| `/konsumen`| `/timeline-proyek` (Design vs Construction), `/dokumen`. | Hardened (Batch 97) |
| **Arsitek** | `/arsitek` | `/permintaan-desain` (Progress update & bridge visibility). | Hardened (Batch 96) |
| **Superadmin**| `/superadmin`| `/persona-directory` (Status Visibility), `/audit-center`. | Hardened (Batch 98) |

## 🚧 Known Shell/Hold Routes
Beberapa route berikut sudah terdaftar namun masih bersifat shell atau menunggu implementasi backend lanjut:
- **Finance**: `/pembayaran` (Admin/Mandor) saat ini hanya simulasi pencatatan lokal.
- **Production-Related**: Seluruh route yang berkaitan dengan payment gateway, legal rill, dan deployment masih dalam status **Hold**.
- **Supervisor-to-Customer**: Publikasi langsung laporan mingguan ke timeline konsumen tetap **Hold**.
- **Real-time Chat**: Komunikasi instan dua arah tetap menggunakan simulasi HTTP CRUD.

---
*Untuk kebijakan pengambilan data, silakan merujuk ke [Data Source Policy](./data-source-policy.md).*
*Terakhir diperbarui: Batch 100.*
