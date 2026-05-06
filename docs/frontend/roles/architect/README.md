# Role: Arsitek

## Status Umum
Role Arsitek ditambahkan untuk menangani fase pra-proyek/desain sebelum RAB dan implementasi lapangan dimulai.

## Fungsi Utama
- Menerima design request dari konsumen melalui Admin/RKK.
- Membuat konsep desain dan gambar kerja.
- Upload file desain.
- Mengelola komentar desain.
- Mengelola revisi desain.
- Mengirim desain final untuk approval.

## Timeline Terkait
**Timeline 1: Design Timeline**
`Konsumen ↔ RKK/Admin ↔ Arsitek`

## Mock Data Terkait
- `architects.js`: Profil arsitek dan kapasitas.
- `designRequests.js`: Permintaan desain dari konsumen.
- `designFiles.js`: Berkas gambar (denah, 3D, dll).
- `designRevisions.js`: Riwayat revisi (Max 3 gratis).
- `designComments.js`: Diskusi fase desain.
- `users.js` & `roles.js`: Autentikasi dan izin akses.

## Aturan Revisi
- Konsumen mendapat **3 revisi gratis**.
- Revisi ke-4 dan seterusnya dikenakan biaya tambahan (Charge).
- Besar biaya disimpan di `designRevisions.chargeAmount`.

## Aturan Kapasitas
- Arsitek maksimal menangani **2 design request/gambar aktif**.
- Kapasitas disimpan di `architects.maxDesignCapacity`.
- Arsitek tidak memakai `maxProjectCapacity` karena Arsitek bekerja di fase desain, bukan fase konstruksi lapangan.

## Active Assignment vs History
`architects.assignedDesignRequestIds` hanya menyimpan design request aktif yang masih menjadi beban kerja Arsitek.

Design request yang sudah selesai, dibatalkan, atau sudah dikonversi menjadi project tidak dihitung sebagai beban aktif. Riwayat pekerjaan Arsitek dapat dihitung secara dinamis dari `designRequests.assignedArchitectId`.

**Rencana UI:**
- **Tab Aktif**: Membaca dari `architects.assignedDesignRequestIds`.
- **Tab History**: Membaca dari `designRequests` yang difilter berdasarkan `assignedArchitectId`.

## Design Request Status Flow
| Status | Makna | Dihitung Aktif? |
|---|---|---|
| `new` | Request baru dari konsumen. | Ya |
| `reviewed` | Sudah dicek Admin/RKK. | Ya |
| `assigned` | Sudah ditugaskan ke Arsitek. | Ya |
| `in_design` | Arsitek sedang mengerjakan desain. | Ya |
| `waiting_customer_review` | Menunggu review konsumen. | Ya |
| `revision_requested` | Konsumen meminta revisi. | Ya |
| `approved_waiting_period` | Desain disetujui, masa tunggu/finalisasi. | Ya |
| `ready_to_convert` | Masa tunggu selesai, siap RAB/Project. | Tidak |
| `converted_to_project` | Sudah menjadi proyek konstruksi. | Tidak |
| `cancelled` | Request dibatalkan. | Tidak |

> [!IMPORTANT]
> Status `approved` (legacy) digantikan oleh `approved_waiting_period` dan `ready_to_convert` untuk kejelasan beban kerja arsitek.

## Project Entry Flow

### Jalur A — Desain RKK (Full Flow)
Konsumen belum memiliki gambar kerja.
`Design Request` -> `Arsitek` -> `Design Files` -> `Approved` -> `Ready to Convert` -> `RAB` -> `Project`.

### Jalur B — Desain Bawaan Konsumen
Konsumen membawa gambar sendiri.
`Customer Design Files` -> `Admin/RKK Review` -> `RAB` -> `Project`.
*Jalur ini tidak melalui Arsitek dan tidak memiliki `designRequests`.*

### Jalur C — Tanpa Desain (Maintenance)
Pekerjaan kecil/perawatan.
`Project Requirement` -> `RAB/Quotation` -> `Project`.

## Belum Dikerjakan
- [ ] UI dashboard Arsitek
- [ ] Halaman daftar design request
- [ ] Halaman detail design request
- [ ] Komponen upload file desain
- [ ] Sistem komentar interaktif pada gambar desain
- [ ] Alur approval desain final oleh Konsumen
