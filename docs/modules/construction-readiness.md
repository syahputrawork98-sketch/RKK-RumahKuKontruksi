# Module: Construction Readiness

Modul kesiapan konstruksi berfungsi sebagai "Preparation Layer" antara desain arsitektur dan eksekusi lapangan.

## Key Principles
1. **Preparation, Not Assignment**: Seluruh input (Mandor, Pengawas, Note) disimpan sebagai event history, bukan update langsung ke table `Project`.
2. **Gated Flow**: Tahapan bersifat sekuensial (Konsumen -> Mandor Prep -> Readiness Prep -> Final Review).
3. **No Project Activation**: Aktivasi proyek tetap menjadi proses terpisah untuk menjaga integritas status `Berjalan`.

## Data Schema (Metadata History)

### admin_mandor_selection_preparation
```json
{
  "selectedCandidateIds": ["foreman-uuid-1", "foreman-uuid-2"],
  "preparationStatus": "shortlist_prepared",
  "source": "construction-readiness-flow"
}
```

### admin_construction_readiness_preparation
```json
{
  "selectedSupervisorCandidateIds": ["supervisor-uuid-1"],
  "readinessStatus": "technical_ready",
  "source": "construction-readiness-flow"
}
```

### admin_construction_transition_review
```json
{
  "reviewStatus": "reviewed_for_project_planning",
  "constructionIntentConfirmed": true,
  "mandorPreparationReviewed": true,
  "supervisorReadinessReviewed": true,
  "nextStepRecommendation": "project_planning_review_only"
}
```

## Constraints
- **Role**: Hanya Admin yang dapat memproses preparation layer ini.
- **Project Link**: Data persiapan ini menjadi baseline rujukan bagi Admin saat melakukan "Project Planning Bridge" (Batch 16) dan "Final Assignment" (Batch 17).
- **Gate Integrity**: Proyek tidak dapat dibridge jika transition review belum dilakukan.
