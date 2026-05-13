# Module: Superadmin - RKK RumahKu Konstruksi

Role Superadmin berfungsi sebagai pengawas sistem global dan pengelola direktori persona lokal.

## 🏗️ Fitur Utama (Hardened)
- **Persona Directory**: CRUD entitas persona lintas role (Admin, Mandor, Pengawas, Arsitek, Konsumen) (Batch 76).
- **Global Monitoring**: Memantau statistik proyek secara global dan log aktivitas database.
- **Audit Center**: Melihat antrian persetujuan profil dan aktivitas sensitif lainnya (Batch 77).

## 🛡️ Batasan
- **Bukan Operator**: Superadmin tidak menjalankan workflow harian (seperti assign arsitek atau update progress).
- **No Production Auth**: Pengelolaan user tetap dalam konteks persona lokal tanpa sistem autentikasi rill.
- **Governance Only**: Fokus pada monitoring dan persetujuan administratif, bukan eksekusi teknis.

## 📊 Technical Context
- **Services**: `superadminService`, `adminService`, `supervisorService`, `foremanService`, `customerService`, `architectService`, `projectService`, `designRequestService`, `designTenderService`.
- **Audit Center**: Pusat pemantauan `ActivityLog` database dan antrian `ProfileChangeRequest`.

---
*Status: Hardened — Superadmin Batch 76 & 77 (Local Governance & Audit).*
