# Design System - Shared Components

Daftar komponen "Atom" dan "Molecule" yang digunakan secara lintas modul dalam fitur Design & Construction Preparation.

## Locations
- **Shared Atoms**: `client/src/components/design/shared/`

## Components List

### 1. SectionCard
Container standar untuk panel admin.
- **Props**: `title`, `icon`, `badge`, `hint`, `className`.
- **Usage**: Digunakan untuk seluruh panel di `DesignRequestAdminPage`.

### 2. CandidateCard
Card standar untuk menampilkan profil kandidat (Mandor/Pengawas).
- **Props**: `candidate`, `isSelected`, `onToggle`, `typeColor`.

### 3. HoldStateCard
Panel placeholder untuk modul yang belum aktif (Gated).
- **Props**: `title`, `icon`, `message`.

### 4. ChecklistItem
Baris indikator status checklist (Done/Pending).
- **Props**: `label`, `isDone`.

### 5. InfoWarningBox
Box informasi/peringatan dengan styling khusus.
- **Props**: `message`, `type` (info, warning, success).

## Role-Based Profile Components
Lokasi: `client/src/components/role-settings/`

Grup komponen ini digunakan bersama oleh Pengawas, Mandor, dan Arsitek (Planned) untuk mengelola profil profesional.

- **RoleStatsCard**: Visualisasi statistik pengalaman lokal.
- **RoleCapacityCard**: Indikator kapasitas dan status ketersediaan.
- **RoleCertificateList**: Grid sertifikasi lokal unverified.
- **RoleGovernanceNoticePanel**: Notice tata kelola identitas lokal.
