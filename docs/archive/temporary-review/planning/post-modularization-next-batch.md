# Post-Modularization Next Batch Recommendations

Dokumen ini berisi rekomendasi langkah selanjutnya setelah siklus modularisasi frontend (15A, M1, M2, M3) selesai.

## Status Baseline
Project saat ini memiliki arsitektur frontend yang lebih bersih dan maintainable. Seluruh fitur operasional (Design, RAB, Construction Monitoring) berada dalam status **Local Workflow Stabilized**.

## Rekomendasi Batch 16+

Setelah sinkronisasi dokumen ini diterima, Room Chat 00 dapat melanjutkan ke fitur baru dengan tetap mengikuti batasan *Local Development CRUD Integration*.

### Kandidat Fitur Prioritas Tinggi

1. **Project Planning Bridge (Bridge to Project)**
    - **Tujuan**: Mengonversi `Design Request` yang sudah disetujui menjadi entitas `Project` dengan data RAB Plan dan Stages awal.
    - **Scope**: Create project draft, copy RAB data, set status `planning`.
    - **Status**: Sebelumnya Hold, kini direkomendasikan sebagai batch fitur baru.

2. **Final Assignment System**
    - **Tujuan**: Menugaskan Mandor dan Pengawas secara rill ke field `Project.foremanId` dan `Project.supervisorId`.
    - **Scope**: UI assignment di Admin Project, update field database, penanganan guard post-assignment.

3. **Material Request Stabilization**
    - **Tujuan**: Modularisasi dan pembersihan sisa-sisa placeholder pada alur distribusi material lokal.
    - **Scope**: Modularisasi MR pages, perbaikan tracking status received, integrasi timeline.

### Kandidat Fitur Prioritas Menengah

4. **Timeline Category & Work Item Progress**
    - **Tujuan**: Menambahkan kategori pada timeline konstruksi dan mencatat progress per item pekerjaan (RAB Item).
    - **Scope**: Schema/UI update untuk progress per item, visualisasi per kategori.

5. **Architect Workspace Continuation**
    - **Tujuan**: Menyelesaikan modularisasi untuk role Arsitek agar konsisten dengan role lainnya.
    - **Scope**: Modularisasi `PengaturanArsitekPage.jsx` dan monitoring tender.

## Batasan Tetap (Scope Guard)
Meskipun lanjut ke fitur baru, batasan berikut tetap berlaku:
- **No Production Auth**: Tetap gunakan dev-persona switcher.
- **No Real Payment**: Tetap gunakan simulasi eligibility/billing.
- **No Real Real-time**: Tetap gunakan HTTP polling/manual refresh.
- **No File Upload**: Tetap gunakan placeholder URL.
- **No Legal/BAST**: Tetap bersifat administratif lokal.

---
*Rekomendasi ini bersifat fleksibel dan dapat dipilih oleh Room Chat 00 sesuai kebutuhan prioritas project.*
