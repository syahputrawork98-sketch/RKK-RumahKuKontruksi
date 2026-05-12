# Mock Data Plan

Untuk mempercepat pengembangan UI/UX tanpa ketergantungan backend, aplikasi menggunakan sistem mock data terpusat sebagai *single source of truth*.

## Struktur Terimplementasi
Lokasi: `client/src/data/mock/`

| Mock Table | File | Status | Deskripsi |
|---|---|---|---|
| Users | `users.js` | **Audit Done** | Akun dasar semua role |
| Roles | `roles.js` | **Audit Done** | Definisi label dan permission role |
| Customers | `customers.js` | **Audit Done** | Profil konsumen (Individual & Company) |
| RAB Plan | `rabPlans.js` | **Audit Done** | Dokumen header RAB (Level 1) |
| RAB Category | `rabCategories.js` | **Audit Done** | Kelompok pekerjaan (Level 2) |
| RAB Item | `rabItems.js` | **Audit Done** | Detail pekerjaan (Level 3) |
| Admins | `admins.js` | **Audit Done** | Profil admin (Kapasitas: 3 proyek) |
| Architects | `architects.js` | **Audit Done** | Profil arsitek/designer |
| Design Requests | `designRequests.js` | **Audit Done** | Kepala pekerjaan desain |
| Design Stages | `designStages.js` | **Audit Done** | Timeline/Tahapan kerja desain |
| Design Files | `designFiles.js` | **Audit Done** | Gambar/berkas desain |
| Design Revisions | `designRevisions.js` | **Audit Done** | Riwayat revisi desain |
| Design Comments | `designComments.js` | **Audit Done** | Komentar fase desain |
| Supervisors | `supervisors.js` | **Audit Done** | Profil pengawas (Kapasitas: 3 proyek) |
| Foremen | `foremen.js` | **Audit Done** | Mandor sebagai Vendor Lapangan (Kapasitas: 2) |
| Projects | `projects.js` | **Audit Done** | Data proyek utama |
| Project Stages | `projectStages.js` | **Audit Done** | Tahapan timeline konstruksi |
| Project Comments | `projectComments.js` | **Audit Done** | Komentar fase konstruksi |
| Notifications | `notifications.js` | **Done** | Notifikasi tertarget |

## Dua Alur Terpisah

RKK memiliki dua alur operasional yang berbeda:

### 1. Design Flow / Alur Arsitek

Alur ini digunakan ketika konsumen belum memiliki desain, membutuhkan gambar kerja, atau membutuhkan redesign.

Data utama:
- `designRequests.js`
- `designStages.js`
- `designFiles.js`
- `designRevisions.js`
- `designComments.js`
- `architects.js`

Design Flow selesai pada tahap desain final / handover desain. Jika desain tersebut dilanjutkan menjadi pekerjaan konstruksi, maka proses berikutnya masuk ke Project Flow sebagai alur terpisah.

### 2. Project Flow / Alur Project Lapangan

Alur ini digunakan untuk implementasi konstruksi/lapangan.

Data utama:
- `projects.js`
- `projectStages.js`
- `rabPlans.js`
- `rabCategories.js`
- `rabItems.js`
- `projectComments.js`
- `supervisors.js`
- `foremen.js`

Project Flow tidak wajib berasal dari Design Flow. Project dapat berasal dari desain RKK, desain bawaan konsumen, atau pekerjaan yang tidak membutuhkan desain formal.

## Relasi Opsional Design ke Project

Jika Design Flow dilanjutkan ke konstruksi:
- `designRequests.convertedProjectId` -> `projects.id`
- `projects.sourceDesignRequestId` -> `designRequests.id`
- `rabPlans.sourceDesignRequestId` -> `designRequests.id`

Jika project berasal dari desain bawaan konsumen atau tidak membutuhkan desain formal:
- `projects.sourceDesignRequestId` boleh `null`

## Aturan Konsistensi Relasi
*   **Capacity Limit**: 
    - Admin: Maksimal 3 proyek aktif.
    - Pengawas: Maksimal 3 proyek aktif.
    - Mandor: Maksimal 2 proyek aktif.
    - Arsitek: Maksimal 2 design request aktif.
*   **Architect Metrics**: Arsitek menggunakan `maxDesignCapacity`. `architects.assignedDesignRequestIds` hanya berisi design request aktif. History dihitung dari `designRequests.assignedArchitectId`.
*   **Mandor as Vendor**: Tidak mengelola tukang/worker detail. Permission `manage_workers` ditiadakan.
*   **RAB Integrity**: Subtotal Category harus cocok dengan total Item, atau diberi flag `isPlaceholder`.
*   **User Sync**: Setiap profil (Customer/Staff) wajib memiliki user entry yang valid di `users.js`.

## Design Source & Project Entry Flow
Project konstruksi tidak wajib berasal dari Design Timeline RKK. UI harus menyesuaikan tampilan berdasarkan sumber desain.

### Design Source Types
| Value | Makna |
|---|---|
| `rkk_design_request` | Project berasal dari Design Timeline RKK. Memiliki `sourceDesignRequestId`. |
| `customer_provided` | Konsumen membawa desain sendiri. `sourceDesignRequestId` adalah `null`. |
| `not_required` | Project kecil/perawatan tanpa desain formal. `sourceDesignRequestId` adalah `null`. |

### Recommended Fields in `projects.js`
```js
designSource: "rkk_design_request" | "customer_provided" | "not_required",
sourceDesignRequestId: "design-request-xxx" | null
```

## Struktur RAB 3 Tingkat
1.  **RAB Plan**: Mewakili dokumen/header RAB untuk satu proyek tertentu.
2.  **RAB Category**: Kelompok pekerjaan besar (Persiapan, Struktur, Dinding, dll).
3.  **RAB Item**: Rincian pekerjaan detail lengkap dengan volume, satuan, dan harga.

---
*Terakhir diperbarui: 7 Mei 2026*
