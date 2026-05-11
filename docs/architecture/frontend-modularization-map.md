# Frontend Modularization Map - RKK RumahKu Konstruksi

Dokumen ini memetakan transisi arsitektur frontend dari halaman monolitik (*God Page*) ke pola *Page Container + Modular Components*.

## Prinsip Arsitektur
1. **Page as Orchestrator**: Halaman utama (`pages/`) berfungsi sebagai container yang mengelola state utama, API fetching via service, dan event handlers.
2. **Modular Components**: UI dipecah menjadi komponen-komponen terfokus di dalam folder `components/` spesifik modul.
3. **Props-Driven**: Komponen modular menerima data dan callback melalui props, menjaga ketergantungan tetap eksplisit.
4. **No-Behavior-Change**: Modularisasi dilakukan sebagai refactor struktur tanpa mengubah logika bisnis atau API contract.

## Pemetaan Modul

### 1. Admin Design Request (Batch 15A)
- **Container**: `client/src/pages/admin/DesignRequestAdminPage.jsx`
- **Component Folder**: `client/src/components/design/admin/`
- **Helper**: `client/src/utils/designRequestHistory.js`
- **Komponen Utama**:
    - `PostDesignDecisionMonitorPanel`
    - `MandorSelectionPreparationPanel`
    - `ConstructionReadinessPreparationPanel`
    - `ConstructionTransitionSummaryPanel`
    - `ConstructionTransitionReviewPanel`
    - `RevisionMonitoringPanel`

### 2. Konsumen Design Request (Batch M1)
- **Container**: `client/src/pages/konsumen/DesignRequestCustomerPage.jsx`
- **Component Folder**: `client/src/components/konsumen/design-request/`
- **Komponen Utama**:
    - `DesignRequestCard.jsx`: Item list satuan.
    - `DesignRequestList.jsx`: Grid/list wrapper.
    - `CreateDesignRequestModal.jsx`: Form pembuatan request baru.
    - `PostDesignDecisionPanel.jsx`: UI keputusan pasca-desain.
    - `DesignRequestDetailOverlay.jsx`: Overlay detail dan timeline.

### 3. Admin RAB Builder (Batch M2)
- **Container**: `client/src/pages/admin/DetailRabAdminPage.jsx`
- **Component Folder**: `client/src/components/admin/rab/`
- **Helper**: `client/src/components/admin/rab/rabUtils.js`
- **Komponen Utama**:
    - `RabItemTable.jsx`: Tabel item pekerjaan.
    - `RabSummarySidebar.jsx`: Sidebar kalkulasi budget.
    - `RabCategorySection.jsx`: Grup kategori RAB.
    - `RabItemModal.jsx`: Form tambah/edit item.
    - `RabUIAtoms.jsx`: Komponen UI kecil (badge, icon wrapper).

### 4. Role Settings (Batch M3)
- **Container**:
    - `client/src/pages/pengawas/PengaturanPengawasPage.jsx`
    - `client/src/pages/mandor/PengaturanMandorPage.jsx`
- **Component Folder**: `client/src/components/role-settings/`
- **Helper**: `client/src/components/role-settings/roleSettingsUtils.js`
- **Komponen Shared**:
    - `RoleSettingsTabs.jsx`: Navigasi sub-tab.
    - `RoleProfileBasicInfoPanel.jsx`: Informasi dasar user.
    - `RoleStatsCard.jsx`: Ringkasan statistik pengalaman.
    - `RoleCapacityCard.jsx`: Bar kapasitas kerja.
    - `RoleCertificateList.jsx` / `RoleExperienceList.jsx`: List data profesional.
    - `RoleCertificateExperienceModal.jsx`: Form CRUD data profesional.
    - `RoleForemanTeamCard.jsx`: Khusus Mandor (Tim Binaan).

### 5. Project Detail Admin & Mandor (Batch M4)
- **Container**:
    - `client/src/pages/admin/DetailProyekAdminPage.jsx`
    - `client/src/pages/mandor/DetailProyekAktifMandorPage.jsx`
- **Component Folder**:
    - `client/src/components/admin/project-detail/`
    - `client/src/components/mandor/project-detail/`
- **Helpers**:
    - `client/src/components/admin/project-detail/ProjectDetailUIHelpers.jsx`
    - `client/src/components/mandor/project-detail/MandorProjectDetailUIHelpers.jsx`
- **Komponen Utama (Admin)**:
    - `AdminProjectHeader.jsx`, `AdminProjectTabs.jsx`, `AdminProjectSidebar.jsx`
    - `AdminProjectOverviewTab.jsx`, `AdminProjectCustomerTab.jsx`, `AdminProjectStagesTab.jsx`
    - `AdminProjectActivationModal.jsx`, `AdminProjectCompletionModal.jsx`
- **Komponen Utama (Mandor)**:
    - `MandorProjectHeader.jsx`, `MandorProjectTabs.jsx`, `MandorProjectSidebar.jsx`
    - `MandorProjectOverviewTab.jsx`, `MandorProjectScopeTab.jsx`, `MandorProjectJournalTab.jsx`

## Status Verifikasi
| Batch | Status | Validation |
| :--- | :--- | :--- |
| **15A** | Accepted | Build-safe, Refactor God Page (~1700 lines reduced) |
| **M1** | Accepted | No-behavior-change (~715 to ~302 lines) |
| **M2** | Accepted | No-behavior-change (~633 to ~291 lines) |
| **M3** | Accepted | Shared role settings components (High Reusability) |
| **M4** | Accepted | Admin & Mandor Project Detail modularized (Stability Guaranteed) |
