# Alur Peran (Role Workflow)

Dokumen ini menjelaskan tanggung jawab dan alur kerja untuk setiap peran di sistem RumahKu Kontruksi (RKK).

## Prinsip Pengembangan Lokal (Local Development First)
- Sistem ini dikembangkan dengan pendekatan **local-development-first**.
- Belum ada sistem autentikasi (Login/JWT/Session) yang diimplementasikan.
- Pemilihan identitas (persona) dilakukan melalui **Switcher** di Topbar.
- Identitas yang dipilih bersifat persisten secara lokal (menggunakan `localStorage`).

## Status Fitur
Setiap alur kerja ditandai dengan status berikut:
- **Implemented**: Fitur sudah dapat digunakan dengan data dari database lokal.
- **Partial**: Fitur sudah memiliki UI namun integrasi data belum lengkap.
- **Planned**: Fitur sudah direncanakan namun belum mulai dibangun.
- **Postponed**: Fitur ditunda untuk sementara.
- **Do Not Build Yet**: Fitur tidak boleh dibangun pada fase ini.

## Daftar Peran
- [**Admin**](./admin.md) (DB-Backed v1 / Stabilized)
- [**Superadmin**](./superadmin.md) (Partial / Directory API Exists)
- [**Konsumen**](./konsumen.md) (DB-Backed v1 / Stabilized)
- [**Arsitek**](./arsitek.md) (DB-Backed v2 / Design Workflow Stabilized)
- [**Mandor**](./mandor.md) (DB-Backed v1 / Weekly Journal & MR Stabilized)
- [**Pengawas**](./pengawas.md) (DB-Backed v1 / Weekly Report & Verification Stabilized)
- [**PIC**](./pic.md) (Planned)

## Alur Turunan / Workflow Operasional
Dokumen di bawah ini menjelaskan proses bisnis spesifik yang melibatkan satu atau lebih peran.

- [**Pembayaran Konsumen / Termin**](./payment-customer.md) (Planned)
- [**Pengajuan Material Mandor**](./material-request.md) (Implemented / Local Workflow)
- [**Pengajuan Pembayaran Mandor**](./payment-foreman.md) (Implemented / Simulation)
- [**Jurnal Mingguan Mandor**](./jurnal-mingguan-mandor.md) (Implemented / DB-Backed)
- [**Laporan Mingguan Pengawas**](./alur-laporan-mingguan-pengawas.md) (Implemented / DB-Backed)
- [**Progress Proyek ke Konsumen**](./alur-progress-proyek-ke-konsumen.md) (Implemented / Official Progress SOT)
- [**Alur Change Order / Perubahan RAB**](./alur-change-order-perubahan-rab-pekerjaan-tambahan.md) (Planned)
- [**Alur Notifikasi Sistem**](./notification-system.md) (Planned)
- [**Approval, Rejection, Revisi**](./07-alur-approval-rejection-revisi.md) (Implemented / Design Revision Limit)
- [**Dokumen & Foto Proyek**](./dokumen-foto-proyek.md) (Implemented / Local Evidence Thread)
