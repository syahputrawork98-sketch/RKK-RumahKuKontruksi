# Technical: API Map - RKK RumahKu Konstruksi

**Base URL**: `http://localhost:4000/api`

## 📂 Endpoint Summary

### 🏗️ Projects
- `GET /projects`: List proyek (Supports filters for roles).
- `GET /projects/:id`: Detail proyek lengkap.
- `PATCH /projects/:id/activate`: Aktivasi proyek (Admin).
- `PATCH /projects/:id/verify-progress`: Update progress resmi (Pengawas).

### 📝 Operational
- `GET/POST /weekly-journals`: Jurnal mingguan Mandor.
- `GET/POST /weekly-reports`: Laporan mingguan Pengawas.
- `GET/POST /material-requests`: Permintaan material lapangan.

### 🎨 Design
- `GET/POST /design-requests`: Pengajuan desain Konsumen.
- `POST /design-requests/:id/convert`: Konversi ke draf proyek (Admin).

### 👥 Personas
- `GET /admins`, `/supervisors`, `/foremen`, `/customers`, `/architects`.
- `POST /superadmins/personas`: CRUD persona oleh Superadmin.

---
*Catatan: Seluruh endpoint saat ini tidak memerlukan token autentikasi (Local Development Mode).*
