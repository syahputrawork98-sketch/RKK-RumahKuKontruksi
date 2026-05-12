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
| **Admin** | `/admin` | Dashboard, Project List, RAB Builder, Material Request. | Stabilized |
| **Mandor** | `/mandor` | Weekly Journal, Material Request, Project Detail. | Stabilized |
| **Pengawas**| `/pengawas`| Progress Verification, Journal Review, Weekly Report. | Stabilized |
| **Konsumen**| `/konsumen`| Project Monitoring, Timeline, Stage Communication. | Stabilized |
| **Arsitek** | `/arsitek` | Design Tender, Workspace, Revision Tracker. | Stabilized |
| **Superadmin**| `/superadmin`| Persona Directory, Global Monitoring, Audit Logs. | Stabilized |

---
*Untuk kebijakan pengambilan data, silakan merujuk ke [Data Source Policy](./data-source-policy.md).*
