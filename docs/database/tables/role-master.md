# Role Master Tables

Status: Draft / Generated from Prisma schema

## Tujuan Domain
Pusat data master aktor/persona yang terlibat dalam ekosistem RKK.

## Model/Tabel

### Admin / `admins`
**Tujuan**: Profil Admin internal RKK yang mengelola operasional proyek.
**Dipakai oleh workflow**: Penugasan proyek, Review laporan pengawas.

### Superadmin / `superadmins`
**Tujuan**: Profil pengelola sistem global dengan akses tertinggi.

### Supervisor / `supervisors`
**Tujuan**: Profil mitra Pengawas lapangan.
**Relasi Utama**: Has many `SupervisorCertificate`, `SupervisorExperience`, `Project`, `WeeklyJournal` (as reviewer).
**Catatan penting**: Memiliki `max_project_capacity` untuk kontrol beban kerja (Default: 3).

### Foreman / `foremen`
**Tujuan**: Profil mitra Mandor lapangan.
**Relasi Utama**: Has many `ForemanCertificate`, `ForemanExperience`, `Project`, `WeeklyJournal` (as author).
**Catatan penting**: Memiliki `max_project_capacity` (Default: 2).

### Architect / `architects`
**Tujuan**: Profil mitra Arsitek (fase desain).
**Relasi Utama**: Has many `ArchitectCertificate`, `ArchitectExperience`.

### Certificates & Experiences
- `supervisor_certificates` / `supervisor_experiences`
- `foreman_certificates` / `foreman_experiences`
- `architect_certificates` / `architect_experiences`
**Tujuan**: Menyimpan data legalitas (sertifikat) dan portofolio proyek terdahulu dari mitra.

---
**Catatan Teknis Persona**:
Tabel-tabel ini bukan merupakan tabel autentikasi (Auth) production utama, melainkan profil data master (Persona). Status `active` menentukan apakah akun tersebut dapat ditugaskan pada proyek baru atau tidak.
