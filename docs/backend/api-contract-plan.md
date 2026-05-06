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

## Rencana Endpoint Awal

### Auth
- `POST /auth/login` - Masuk sistem.
- `POST /auth/logout` - Keluar sistem.
- `GET /auth/me` - Ambil profil user yang sedang login.

### Users
- `GET /users` - List user (filter by role).
- `POST /users` - Tambah user baru (Admin only).
- `GET /users/:id` - Detail user.
- `PATCH /users/:id` - Update data user.
- `DELETE /users/:id` - Deaktivasi user (Soft delete).

### Projects
- `GET /projects` - List proyek (filter by user role).
- `POST /projects` - Inisialisasi proyek baru.
- `GET /projects/:id` - Detail proyek (Timeline, RAB, Progres).
- `PATCH /projects/:id` - Update informasi proyek.

### Reports
- `GET /projects/:id/reports` - List laporan harian/mingguan proyek.
- `POST /projects/:id/reports` - Input laporan harian baru.

### Approvals
- `GET /approvals` - List permintaan approval masuk.
- `POST /approvals` - Ajukan approval baru.
- `PATCH /approvals/:id/approve` - Menyetujui pengajuan.
- `PATCH /approvals/:id/reject` - Menolak pengajuan.

### Notifications
- `GET /notifications` - Ambil notifikasi user.
- `PATCH /notifications/:id/read` - Tandai sudah dibaca.

### Documents
- `POST /documents/upload` - Upload file ke cloud storage.
- `GET /documents/:id` - Ambil metadata/link file.

## Validasi Request
Setiap request yang masuk akan divalidasi menggunakan **validation middleware** dengan skema yang telah ditentukan (schema validation). Hal ini memastikan data yang masuk ke service layer adalah data yang valid dan aman.

> [!NOTE]
> Daftar endpoint dan skema data ini belum final. Detail akan disesuaikan kembali setelah struktur Mock Data dan UI pada sisi Frontend dianggap matang.
