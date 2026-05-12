# Batch 32 — Mandor Weekly Journal Stabilization Walkthrough

This document summarizes the stabilization of the **Mandor Weekly Journal** workflow, ensuring a robust local development experience where data reporting is consistent and does not interfere with the official project progress metrics (Source of Truth).

## 1. UI Stabilization & Hardening

We have implemented defensive UI patterns across the three primary journal pages to handle loading, error, and empty states gracefully.

### List View (`JurnalMingguanMandorPage.jsx`)
- Added a consistent loading state with text ("Memuat jurnal mingguan...").
- Uses `RoleDataState` for error handling and empty states.

### Detail View (`DetailJurnalMingguanMandorPage.jsx`)
- Integrated `RoleDataState` and `RolePersonaEmptyState`.
- Implemented a "Read-Only" guard: If the project is marked as "Selesai", editing and submitting journals is disabled.
- Added an explicit alert informing the user when a project is finished and the journal is in read-only mode.

### Create View (`CreateJurnalMingguanMandorPage.jsx`)
- Hardened the project fetching logic.
- Added `RoleDataState` for "No Projects Assigned" scenarios, preventing the Mandor from attempting to create journals without an assigned project context.
- Ensured proper data transformation (parseFloat, null for empty IDs) before submission.

## 2. Architectural Integrity

A key requirement was ensuring that Mandor claims do not automatically update the official project progress.

- **Non-Official Claim**: All progress entries by Mandors are explicitly labeled as "Klaim" or "Non-Resmi" in the UI.
- **Source of Truth (SOT)**: The `Project.verifiedProgress` remains untouched by the journal submission or approval workflow. Official progress updates are strictly reserved for the Supervisor/Admin verification module.
- **Project Context**: Backend validation ensures that a Mandor can only create journals for projects where they are specifically assigned as the `foremanId`.

## 3. Implementation Verification

- **Backend Enforcements**:
    - `weekly-journals.controller.js` checks project status before allowing creation or updates.
    - `weekly-journals.repository.js` operates purely on journal records and review logs without side effects on project metrics.
- **Build Success**: A full `npm run build` of the client was performed, confirming no syntax or dependency issues in the frontend.
- **Syntax Check**: `node --check` was performed on the server entry point to ensure runtime readiness.

## 4. Current Workflow Status

| Feature | Status | Note |
| :--- | :--- | :--- |
| **Project Selection** | ✅ Stable | Filters only active/ongoing projects. |
| **Activity Context** | ✅ Stable | Optional links to Project Stages and RAB items. |
| **Progress Claim** | ✅ Stable | Administrative only, non-SOT. |
| **Review Workflow** | ✅ Stable | Supervisor can review/approve/request revision. |
| **Photos** | ⚠️ Placeholder | Frontend logic exists, backend upload pending (Batch 25/Cloud). |

---
*Pekerjaan Batch 32 telah selesai dan sistem berada dalam kondisi stabil untuk pengembangan lokal.*
