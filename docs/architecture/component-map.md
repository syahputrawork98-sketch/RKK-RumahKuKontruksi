# Admin Design Request - Component Map

Struktur komponen modular untuk halaman Admin Design Request setelah refactor Batch 15A.

## Main Container
- **Path**: `client/src/pages/admin/DesignRequestAdminPage.jsx`
- **Role**: Orchestrator (State Management, API Fetching, Event Handlers).

## UI Panels
Lokasi: `client/src/components/design/admin/`

| Component | Deskripsi |
| :--- | :--- |
| `PostDesignDecisionMonitorPanel` | Monitor keputusan lanjut/selesai dari Konsumen. |
| `MandorSelectionPreparationPanel` | UI untuk memilih shortlist Mandor. |
| `ConstructionReadinessPreparationPanel` | UI untuk checklist kesiapan & kandidat Pengawas. |
| `ConstructionTransitionSummaryPanel` | Ringkasan transisi (Read-only dashboard). |
| `ConstructionTransitionReviewPanel` | UI untuk input final review note. |
| `AdminControlsPanel` | Tombol aksi status (Publish, Award, Approve, Convert). |
| `ExecutionMonitorPanel` | Monitoring status desain & progress arsitek. |
| `CustomerApprovalStatusPanel` | Status persetujuan desain oleh Konsumen. |
| `CuratedInstructionPanel` | UI untuk mengirim instruksi kurasi ke Arsitek. |
| `ReleaseToCustomerPanel` | UI untuk rilis hasil desain ke Konsumen. |
| `RevisionMonitoringPanel` | Monitor penggunaan limit revisi (3 Major / 5 Minor). |

## Utilities
- **Path**: `client/src/utils/designRequestHistory.js`
- **Helper Functions**:
  - `getLatestCustomerPostDesignDecision()`
  - `getLatestMandorPreparation()`
  - `getLatestConstructionReadiness()`
  - `getLatestHistoryByAction()`
  - `hasConstructionIntent()`
  - `isMandorPreparationReady()`
