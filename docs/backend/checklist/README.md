# Backend Checklist (Reference)

> [!NOTE]
> **Dokumen ini bersifat reference.**
> Checklist ini berfungsi sebagai blueprint awal. Untuk status implementasi aktual, silakan merujuk ke [**docs/backend/api-status.md**](../api-status.md).

Checklist backend adalah turunan dari [docs/alur](../../alur/README.md) ke kebutuhan implementasi server.

Checklist ini belum berarti semua fitur harus langsung dibuat. Checklist ini menjadi blueprint saat implementasi backend dimulai.

## Tanggung Jawab Checklist
Setiap checklist harus menjawab:
- **Entity/Model**: Data apa yang dibutuhkan.
- **API/Service**: Endpoint apa yang dibutuhkan.
- **Status Flow**: Perpindahan status objek data.
- **Business Rules**: Aturan logika bisnis yang harus dijaga.
- **Permission/Role Rules**: Siapa yang boleh melakukan apa.
- **Validation**: Aturan validasi input data.
- **Audit Trail**: Pencatatan riwayat perubahan.
- **Integrasi**: Hubungan dengan alur/modul lain.

## Standar Checklist Atomik

Setiap checklist backend sebaiknya tidak hanya menjawab kebutuhan umum, tetapi juga menurunkan workflow menjadi kontrak implementasi yang lebih detail.

Tambahkan bagian berikut secara bertahap pada setiap checklist workflow:

### Database Contract
Menjelaskan kebutuhan model/tabel, field, enum, relasi, index, dan audit.

### API Contract
Menjelaskan endpoint, method, request body, response body, error response, dan permission rule.

### Status Transition Matrix
Menjelaskan perubahan status yang sah berdasarkan actor dan action.

### Allowed Action Matrix
Menjelaskan action apa yang boleh dilakukan role tertentu pada status tertentu.

### Validation & Error Rules
Menjelaskan validasi input dan error yang harus dikembalikan.

### Acceptance Criteria
Menjelaskan kondisi minimal agar implementasi dianggap selesai.

## Template Backend Checklist Atomik

### Database Contract
| Model/Table | Purpose | Required Fields | Optional Fields | Relations | Notes |
|---|---|---|---|---|---|

### Enum / Status
| Enum | Values | Notes |
|---|---|---|

### API Contract
| Method | Endpoint | Actor | Purpose | Request | Response | Error |
|---|---|---|---|---|---|---|

### Status Transition Matrix
| From | Action | Actor | To | Rule |
|---|---|---|---|---|

### Allowed Action Matrix
| Role | Status/Condition | Allowed Actions | Forbidden Actions |
|---|---|---|---|

### Validation & Error Rules
| Rule | Error Message / Code | Notes |
|---|---|---|

### Acceptance Criteria
- [ ] ...

## Urutan Baca
1. [**Business Workflow**](../../alur/README.md)
2. [**Backend Roles Documentation**](../roles/README.md)
3. [**Backend Checklist (Pilih Workflow)**](./README.md)
4. [**API Status & Endpoint List**](../api-status.md)

## Daftar Checklist Workflow
- [Verifikasi Progres Proyek](./project-progress.md)
- [Jurnal Mingguan Mandor](./jurnal-mingguan-mandor.md)
- [Laporan Mingguan Pengawas](./laporan-mingguan-pengawas.md)
- [Pengajuan Material Mandor](./material-request.md)
- [Pengajuan Pembayaran Mandor](./payment-foreman.md)
- [Publikasi Progres ke Konsumen](./progress-to-customer.md)
