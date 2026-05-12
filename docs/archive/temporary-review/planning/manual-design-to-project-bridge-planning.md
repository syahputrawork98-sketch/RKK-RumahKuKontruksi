# Planning: Manual Design-to-Project Bridge

**Project:** RKK / RumahKu Konstruksi  
**Phase:** Local Development CRUD Integration  
**Task:** Manual Design-to-Project Bridge Planning  
**Status:** ✅ DONE / Implemented

## 1. Latar Belakang
Setelah alur **Design Tender / Peluang Desain** selesai, sistem kini memiliki data desain yang disetujui (`approved`). Untuk menghubungkan fase pra-proyek (desain) ke fase konstruksi (lapangan), diperlukan mekanisme "jembatan" (bridge) yang memungkinkan Admin membuat draft Proyek konstruksi berdasarkan data desain yang sudah ada secara manual.

## 2. Alur Bisnis Rekomendasi
1.  **Design Approval**: Arsitek menyelesaikan desain, dan Admin/Konsumen mengubah status `DesignRequest` menjadi `approved`.
2.  **Trigger Bridge**: Admin melihat tombol **"Buat Draft Project"** pada detail request yang sudah disetujui.
3.  **Konfirmasi & Preview**: Admin mengonfirmasi pembuatan proyek melalui modal yang menampilkan data mapping (Nama, Konsumen, Lokasi).
4.  **Draft Creation**: Sistem membuat entitas `Project` baru dengan status awal `planning` (atau `Persiapan`).
5.  **Linking**: Proyek baru mencatat `sourceDesignRequestId` dan DesignRequest mencatat `projectId` sebagai referensi silang.
6.  **Setup Lanjutan**: Admin diarahkan ke halaman **Project Setup** existing untuk menyusun RAB, Tahapan, dan penugasan tim lapangan.

## 3. Status Conversion
- ✅ **Boleh Konversi**: Hanya `DesignRequest` dengan status `approved`.
- ❌ **Dilarang Konversi**: Status `submitted`, `open` (tender), `assigned`, `in_review`, `rejected`, atau request yang sudah pernah dikonversi sebelumnya (anti-duplikasi).

## 4. Rekomendasi Relasi Schema
Berdasarkan audit `schema.prisma`, relasi sudah mendukung bridge minimal:
- **Project Model**: Memiliki field `sourceDesignRequestId` (String optional).
- **DesignRequest Model**: Memiliki field `projectId` (String optional) yang berelasi ke `Project`.
- **Constraint**: Relasi 1:1 direkomendasikan. Satu `DesignRequest` hanya boleh menghasilkan maksimal satu `Project`.

## 5. Field Mapping
| DesignRequest (Source) | Project (Target) | Catatan |
|---|---|---|
| `customerId` | `customerId` | **Wajib**. Menghubungkan kepemilikan proyek. |
| `title` | `name` | Menggunakan judul desain sebagai nama proyek awal. |
| `location` | `location` | Alamat pembangunan. |
| `estimatedBudget` | `budgetTotal` | Sebagai estimasi awal (RAB detail tetap manual). |
| `id` | `sourceDesignRequestId` | Referensi audit untuk melacak asal desain. |
| - | `status` | Set default ke `planning` (atau `Persiapan`). |
| - | `type` | Set default ke `Pembangunan` (atau sesuai konteks). |
| - | `projectCode` | Di-generate otomatis (Format: `PRJ-XXXXXX`). |

## 6. Rekomendasi Endpoint (Backend)
Diusulkan pembuatan endpoint baru di module `design-requests`:
- **POST** `/api/design-requests/:id/convert-to-project`
- **Logic**:
  1. Validasi eksistensi `DesignRequest`.
  2. Validasi status harus `approved`.
  3. Validasi apakah `projectId` sudah terisi (cegah duplikasi).
  4. Ambil `adminId` dari konteks persona aktif.
  5. `prisma.project.create(...)` dengan data mapping.
  6. `prisma.designRequest.update(...)` untuk mengisi `projectId`.
  7. Return data `Project` yang baru dibuat.

## 7. Rekomendasi UI Minimal (Admin)
- **Tombol**: "Buat Draft Project" (Warna Indigo/Blue) di `DesignRequestAdminPage.jsx`.
- **Visibility**: Tampil hanya jika `status === 'approved'` dan `!projectId`.
- **Modal**: "Konfirmasi Inisialisasi Proyek"
  - Menampilkan ringkasan data yang akan disalin.
  - Peringatan bahwa ini hanya membuat draft awal.
- **Post-Action**: Toast sukses dengan link "Buka Setup Proyek" yang mengarah ke `/admin/proyek/:projectId`.

## 8. Batasan Scope (Scope Guard)
⚠️ **Fitur Bridge ini TIDAK mencakup**:
- ❌ Pembuatan RAB otomatis (RAB tetap harus disusun manual di module RAB).
- ❌ Pembuatan Tahapan (Stages) otomatis.
- ❌ Penugasan Mandor/Pengawas otomatis.
- ❌ Aktivasi Proyek otomatis (status tetap Draft).
- ❌ Pemindahan file desain secara fisik (link referensi saja).
- ❌ Integrasi Payment/Invoice konstruksi.

## 9. Final Status & Implementation Summary
Alur jembatan (bridge) desain-ke-proyek telah diimplementasikan sepenuhnya:
- ✅ **Backend Endpoint**: `POST /api/design-requests/:id/convert-to-project` tersedia dengan Prisma Transaction.
- ✅ **One-to-One Guard**: Validasi ketat mencegah satu desain dikonversi menjadi lebih dari satu proyek.
- ✅ **UI Integration**: Tombol dan modal konversi tersedia di Dashboard Admin.
- ✅ **Flow Continuity**: Admin diarahkan otomatis ke halaman detail proyek untuk melanjutkan setup (RAB, Stages, Team).
- ✅ **Data Mapping**: Customer, Lokasi, dan Budget awal tersinkronisasi dengan benar.

Fitur ini tetap dalam fase **Local Development CRUD Integration**. Setup detail proyek (RAB, Stages, Assignment) tetap dilakukan secara manual oleh Admin melalui modul Project Setup existing.

---
**Konfirmasi Scope**: Implementasi tetap berada dalam fase **Local Development CRUD Integration**. Bridge ini hanya memindahkan data dasar antar tabel untuk efisiensi administrasi, tanpa menggantikan alur manajemen proyek yang sudah ada.
