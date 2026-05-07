# API Contract Plan

Rencana kontrak komunikasi antara Frontend dan Backend.

## Standar Response

### Success Response
```json
{
  "success": true,
  "message": "OK",
  "data": {},
  "meta": {}
}
```

### Error Response
```json
{
  "success": false,
  "message": "Validation error",
  "errors": [],
  "code": "VALIDATION_ERROR"
}
```

### List Response (Pagination)
```json
{
  "success": true,
  "message": "OK",
  "data": [],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 100
  }
}
```

## Implemented API v0 (Core Data Service)
Daftar endpoint yang sudah diimplementasikan dan diverifikasi:

### System
- `GET /api/health` - Cek status server.

### Customers (Full CRUD)
- `GET /api/customers` - Ambil daftar pelanggan.
- `GET /api/customers/:id` - Ambil detail pelanggan.
- `POST /api/customers` - Tambah pelanggan baru.
- `PATCH /api/customers/:id` - Update data pelanggan.
- `DELETE /api/customers/:id` - Hapus pelanggan (hanya jika tidak ada proyek).

### Projects (Read Only)
- `GET /api/projects` - Ambil daftar proyek.
- `GET /api/projects/:id` - Detail proyek (termasuk stages & RAB).
- `GET /api/projects/:id/stages` - Ambil tahapan proyek.
- `GET /api/projects/:id/rab` - Ambil RAB aktif proyek.

## Rencana Endpoint Berikutnya (Planned)
Daftar endpoint di bawah ini adalah rencana pengembangan tahap berikutnya untuk mendukung role Admin, Pengawas, dan Mandor.

### Admin Dashboard & Management
- `GET /api/admin/dashboard-summary` - Agregasi statistik global (Planned).
- `GET /api/admin/projects` - Daftar proyek dengan filter administratif (Planned).
- `POST /api/projects` - Buat proyek baru (Planned).
- `PATCH /api/projects/:id/status` - Update status workflow proyek (Planned).
- `PATCH /api/projects/:id/assignment` - Penugasan Pengawas & Mandor (Planned).

### Estimation & Payments
- `POST /api/projects/:id/rab/items` - Tambah item pekerjaan ke RAB (Planned).
- `PATCH /api/rab/items/:id` - Update harga/volume item RAB (Planned).
- `GET /api/payments` - Daftar pengajuan pembayaran & invoice (Planned).
- `PATCH /api/payments/:id/approval` - Approval termin pembayaran (Planned).

### User & Auth
- `POST /api/auth/login` - Otentikasi pengguna (Planned).
- `GET /api/auth/me` - Ambil profil user login (Planned).

> [!IMPORTANT]
> Endpoint dalam kategori **Planned** belum diimplementasikan di server. Dokumentasi ini berfungsi sebagai draf kontrak untuk pengembangan Frontend Role Admin secara *mock-first*.

> [!NOTE]
> Seluruh response menggunakan format JSON standar: `{ success: boolean, data?: any, message?: string }`.
> Validasi dasar telah diterapkan pada modul Customers (Conflict 409 untuk email duplikat, 404 untuk data tidak ditemukan).
