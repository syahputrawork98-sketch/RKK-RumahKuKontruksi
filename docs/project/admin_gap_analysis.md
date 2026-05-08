# Admin Feature Gap Analysis - RKK Repository

## 1. Executive Summary
This document summarizes the current state of the Admin module in the RKK (RumahKu Konstruksi) repository. The goal is to move towards a full database-backed operational flow while maintaining a clear boundary on non-production features (Auth, Payment, Customer Portal).

## 2. Feature Inventory & Database Status

| Module | Feature | Status | Data Source | Notes |
| :--- | :--- | :--- | :--- | :--- |
| **Dashboard** | Statistics (Counts) | **DB-Backed** | `AdminRepository.getStats` | Real-time counts of projects, reports, etc. |
| | Recent Activities | **Mock** | Hardcoded Array | Needs backend tracking of activity logs. |
| | Financial Stats | **Partial** | `AdminRepository.getStats` | Logic exists but values are often 0 or placeholders. |
| **Project** | List & Search | **DB-Backed** | `projectService.getProjects` | Filters by `adminId`. |
| | Create Project | **DB-Backed** | `projectService.createProject` | Full CRUD integration. |
| | Detail View | **DB-Backed** | `projectService.getProjectById` | Hub for RAB, Stages, and Team. |
| | Activation | **DB-Backed** | `projectService.activateProject` | Validates readiness before activation. |
| | Team Assignment | **DB-Backed** | `projectService.updateProjectAssignment` | Direct assignment of SUP/FOR. |
| **Customer** | Data Management | **DB-Backed** | `customerService` | Full CRUD (Retail & Corporate). |
| **Planning** | RAB Management | **DB-Backed** | `rabService` | Categories, Items, and Versioning. |
| | Stages (Tahapan) | **DB-Backed** | `projectStageService` | CRUD for project milestones. |
| **Monitoring** | Progress SOT | **DB-Backed** | `progressService` | Historical log of verified progress. |
| | Material Requests | **DB-Backed** | `materialRequestService` | Approval flow (SUBMIT -> APP_SUP -> APP_ADM). |
| | Report Review | **DB-Backed** | `supervisorWeeklyReportService` | Review alur (Start -> Revision -> Reviewed). |
| **Settings** | Admin Profile | **Mixed** | `AdminPersonaContext` | Read-only from context. |
| | Security/Auth | **Hold** | N/A | Labeled as "Coming Soon". |

## 3. Identified Gaps & Technical Debt

### P0 - Critical (Data Integrity)
- **Activity Logging**: The Admin Dashboard lacks a real backend-driven activity feed. This makes monitoring "Recent Events" impossible without manual checks.
- **Status Syncing**: While project activation works, automatic transitions based on RAB/Stage completion are not yet strictly enforced in the database.

### P1 - Important (UI/UX Refinement)
- **Filtering Consistency**: Some lists (Project List, Publication List) rely on in-memory filtering rather than backend query parameters for search queries.
- **Financial Visuals**: The Dashboard displays financial boxes that often show 0 because `paidAmount` tracking isn't integrated with a real transaction log.

### P2 - Minor (Monitoring)
- **Settings Page**: Profile updates (name/email) are currently disabled/read-only in the UI.

## 4. Out of Scope (Locked)
- **Real Authentication**: No JWT, Session, or Password management. Role simulation via Persona Switcher is the permanent tool for local development.
- **Payment Gateway**: Financials are tracked via simple numeric fields, no real payment integration.
- **Customer Portal**: Timeline publication logic is ready, but the actual portal for customers is not part of this stabilization phase.
- **File Upload**: Images/Documents are currently mocked or handled via dummy URLs.

## 5. Next Steps Roadmap
1. **Stabilize Activity Feed**: Implement a simple `ActivityLog` table and service to populate the Admin Dashboard.
2. **Refine Financial Tracking**: Ensure `budgetTotal`, `paidAmount`, and `remainingAmount` are accurately updated when RAB changes or manual payments are logged.
3. **Internal QA**: Perform a full walkthrough of the "Mandor -> Pengawas -> Admin Review" flow to ensure status transitions (e.g., `submitted` to `reviewed`) are robust.

---
**Status**: Admin Module is ~85% DB-backed for core operations. Remaining 15% consists of dashboard metrics and non-critical profile settings.
