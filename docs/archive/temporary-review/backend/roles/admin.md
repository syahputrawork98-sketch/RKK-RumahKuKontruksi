# Backend Role - Admin

## Status
**DB-Backed v1 / Local CRUD**. Core data manajemen proyek dan tim sudah tersedia melalui API.

## Data Scope
- [x] Boleh membaca dan mengelola seluruh data Proyek, Pelanggan, dan RAB.
- [x] Boleh mengelola data tim (Pengawas, Mandor, Arsitek).
- [x] Boleh melihat data permintaan material.
- [ ] Boleh memvalidasi keputusan administratif dan finansial.
- [ ] Tidak boleh menjadi sumber tunggal progres lapangan (harus melalui verifikasi Pengawas).

## Entity / Model Terkait
- `Project`, `Customer`, `Supervisor`, `Foreman`, `Architect`, `Admin`, `RabPlan`, `MaterialRequest`.

## Endpoint Terkait
- `/api/projects`
- `/api/customers`
- `/api/supervisors`
- `/api/foremen`
- `/api/architects`
- `/api/admins`
- `/api/material-requests` (Experimental)

## Allowed Actions
- [x] Create, Read, Update, Delete data Master (Proyek, Tim, Pelanggan).
- [x] Melakukan penugasan (Assign) Pengawas dan Mandor ke proyek.
- [x] Melihat detail RAB proyek.
- [ ] Melakukan publikasi progres ke dashboard Konsumen (Planned).
- [ ] Menyetujui pengajuan pembayaran Mandor (Planned).

## Forbidden Actions
- [ ] Mengubah progres resmi proyek secara langsung tanpa verifikasi Pengawas.
- [ ] Menyetujui pengajuan material tanpa melalui alur verifikasi teknis.
- [ ] Bypass alur persetujuan Change Order.

## Workflow Terkait
- Manajemen Proyek & Tim.
- Publikasi Progres ke Konsumen.
- Approval Finansial (Pembayaran & Material).

## Belum Final / Backend Pending
- Alur Pembayaran Final.
- Laporan Progres Resmi Final.
* Workflow Approval bertingkat.

## Catatan Sinkronisasi
Status saat ini fokus pada pengelolaan data dasar (CRUD). Aturan bisnis operasional yang lebih dalam masih dalam tahap perancangan alur.
