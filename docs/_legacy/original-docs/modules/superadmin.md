# Module: Superadmin - RKK RumahKu Konstruksi

Role Superadmin berfungsi sebagai pengawas sistem global dan pengelola direktori persona lokal.

## 🏗️ Fitur Utama (Hardened)
- **Persona Directory**: Manajemen entitas persona dengan visualisasi status (active/inactive/deleted) yang konsisten (Batch 98).
- **Global Operational Monitoring**: Oversight progres proyek global dan agregasi log operasional harian (Batch 93).
- **Audit Center**: Monitoring aktivitas sensitif lokal dengan visual highlighting pada aksi kritis (Batch 98).

## 🛡️ Batasan
- **Bukan Operator**: Superadmin tidak menjalankan workflow harian (seperti assign arsitek atau update progress).
- **No Production Auth**: Pengelolaan user tetap dalam konteks persona lokal tanpa sistem autentikasi rill.
- **Governance Only**: Fokus pada monitoring dan persetujuan administratif, bukan eksekusi teknis.

## 📊 Technical Context
- **Services**: `superadminService`, `adminService`, `supervisorService`, `foremanService`, `customerService`, `architectService`, `projectService`, `designRequestService`, `designTenderService`.
- **Audit Center**: Pusat pemantauan `ActivityLog` database dan antrian `ProfileChangeRequest`.

---
*Status: Hardened — Superadmin Batch 76 & 77 (Local Governance & Audit).*
