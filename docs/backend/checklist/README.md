# Backend Checklist - Overview

Dokumen ini berisi turunan dari [Alur Bisnis](../../alur/README.md) menjadi kebutuhan teknis di sisi server (backend). Checklist ini berfungsi sebagai panduan implementasi sebelum kode mulai ditulis.

## Ketentuan Umum
- Checklist backend adalah turunan dari docs/alur.
- Checklist backend belum berarti fitur harus langsung dibuat.
- Checklist ini menjadi panduan saat implementasi server dimulai.
- Backend checklist harus menjawab:
  - **Entity / Model**: Data apa yang perlu disimpan di database (Prisma Schema).
  - **API / Service**: Endpoint atau logic server apa yang dibutuhkan.
  - **Status Flow**: Transisi status data yang harus dijaga.
  - **Business Rules**: Aturan logika yang wajib diterapkan di backend.
  - **Permission / Role Rules**: Siapa yang boleh melakukan aksi apa.
  - **Validation**: Validasi input dan kondisi data.
  - **Audit Trail**: Pencatatan riwayat perubahan data penting.
  - **Batas Fase**: Apa yang tidak dikerjakan di fase ini.

## Daftar Checklist
- [Project Progress](./project-progress.md)
- [Jurnal Mingguan Mandor](./jurnal-mingguan-mandor.md)
- [Laporan Mingguan Pengawas](./laporan-mingguan-pengawas.md)
- [Progress Proyek ke Konsumen](./progress-to-customer.md)
- [Payment Foreman](./payment-foreman.md)
- [Material Request](./material-request.md)
