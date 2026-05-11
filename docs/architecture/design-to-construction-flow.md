# Design to Construction Preparation Flow

Alur transisi dari tahap desain arsitektur menuju persiapan konstruksi lapangan dalam sistem RKK.

## Workflow Overview

```mermaid
graph TD
    A[Design/RAB Approved] --> B[Customer Post-Design Decision]
    B -- "Selesai Desain Sahaja" --> C[End - Archive Request]
    B -- "Lanjut ke Persiapan Konstruksi" --> D[Mandor Selection Preparation]
    D --> E[Construction Readiness Preparation]
    E --> F[Construction Transition Review]
    F --> G[Project Planning Bridge]
    G --> H[Project Planning / Draft]
    H --> I[Final Assignment Mandor/Pengawas]
    I --> J[Project Activation Gate]
    J --> K[Active Construction / Berjalan]
```

## Detail Tahapan

### 1. Customer Post-Design Decision (Batch 10A)
Setelah Admin/Arsitek merilis desain final, Konsumen memberikan intensi melalui timeline.
- **Event**: `customer_post_design_decision`
- **Output**: Menentukan apakah Admin perlu melakukan persiapan konstruksi.

### 2. Mandor Selection Preparation (Batch 11A)
Admin melakukan screening awal terhadap database Mandor (Foreman) lokal.
- **Event**: `admin_mandor_selection_preparation`
- **Data**: Menampilkan kandidat dari API `/api/foreman`.
- **Note**: Ini bukan penugasan rill (`Project.foremanId`), melainkan shortlist administratif.

### 3. Construction Readiness Preparation (Batch 12A)
Admin melakukan verifikasi kesiapan teknis dan screening Pengawas (Supervisor).
- **Event**: `admin_construction_readiness_preparation`
- **Gate**: Hanya terbuka jika Konsumen memilih "Lanjut Konstruksi" DAN Mandor Shortlist sudah dibuat.
- **Data**: Menampilkan kandidat dari API `/api/supervisor`.

### 4. Construction Transition Review (Batch 14)
Marker review final oleh Admin untuk memastikan seluruh data persiapan sudah valid.
- **Event**: `admin_construction_transition_review`
- **Recommendation**: `project_planning_review_only` (Status marker untuk fase bridge berikutnya).

### 5. Project Planning Bridge (Batch 16A/B)
Admin mengonversi Design Request yang sudah disetujui menjadi draft Proyek.
- **Action**: Manual convert oleh Admin.
- **Guard**: Status approved, decision confirmed, transition review exists.
- **Output**: Entitas `Project` baru dengan status `planning`.

### 6. Final Assignment Mandor/Pengawas (Batch 17)
Admin menetapkan personel operasional rill ke dalam proyek draft.
- **Action**: Update `supervisorId` dan `foremanId` pada entitas Project.
- **Note**: Penugasan ini bersifat final dan menjadi basis akses operasional bagi Mandor/Pengawas.

### 7. Project Activation Gate (Batch 18)
Pintu gerbang terakhir untuk memulai operasional lapangan rill.
- **Action**: Admin menekan tombol "Aktifkan Proyek" setelah checklist readiness terpenuhi.
- **Output**: Proyek berubah status menjadi `Berjalan` (active).
- **Impact**: Membuka akses Material Request dan pelaporan progres resmi.

## Data Integrity
Seluruh flow di atas berawal dari `DesignRequestHistory` dan berakhir pada aktivasi entitas `Project`. Tidak ada auto-activation; seluruh transisi kritis memerlukan intervensi manual Admin untuk menjamin tata kelola operasional lokal.
