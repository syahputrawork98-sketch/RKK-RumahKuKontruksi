/*
  Warnings:

  - A unique constraint covering the columns `[source_design_request_id]` on the table `projects` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "projects" ADD COLUMN     "verified_progress" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "verified_progress_by_id" TEXT,
ADD COLUMN     "verified_progress_updated_at" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "material_requests" (
    "id" TEXT NOT NULL,
    "request_code" TEXT NOT NULL,
    "project_id" TEXT NOT NULL,
    "stage_id" TEXT NOT NULL,
    "foreman_id" TEXT NOT NULL,
    "supervisor_id" TEXT NOT NULL,
    "admin_id" TEXT,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "priority" TEXT NOT NULL DEFAULT 'medium',
    "needed_date" TIMESTAMP(3),
    "reason" TEXT,
    "over_estimate_reason" TEXT,
    "supervisor_note" TEXT,
    "admin_note" TEXT,
    "rejection_reason" TEXT,
    "revision_note" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "submitted_at" TIMESTAMP(3),
    "supervisor_reviewed_at" TIMESTAMP(3),
    "admin_reviewed_at" TIMESTAMP(3),
    "processed_at" TIMESTAMP(3),
    "delivered_at" TIMESTAMP(3),
    "received_at" TIMESTAMP(3),
    "completed_at" TIMESTAMP(3),
    "cancelled_at" TIMESTAMP(3),

    CONSTRAINT "material_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "material_request_items" (
    "id" TEXT NOT NULL,
    "material_request_id" TEXT NOT NULL,
    "rab_item_id" TEXT,
    "material_name" TEXT NOT NULL,
    "requested_qty" DECIMAL(12,3) NOT NULL,
    "approved_qty" DECIMAL(12,3),
    "received_qty" DECIMAL(12,3),
    "unit" TEXT NOT NULL,
    "estimated_qty_from_rab" DECIMAL(12,3),
    "previously_requested_qty" DECIMAL(12,3),
    "previously_approved_qty" DECIMAL(12,3),
    "previously_received_qty" DECIMAL(12,3),
    "total_after_request_qty" DECIMAL(12,3),
    "variance_qty" DECIMAL(12,3),
    "variance_percentage" DECIMAL(8,2),
    "tolerance_status" TEXT,
    "estimated_unit_price" DECIMAL(15,2),
    "final_unit_price" DECIMAL(15,2),
    "note" TEXT,
    "is_additional_material" BOOLEAN NOT NULL DEFAULT false,
    "additional_reason" TEXT,

    CONSTRAINT "material_request_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "material_request_history" (
    "id" TEXT NOT NULL,
    "material_request_id" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "old_status" TEXT,
    "new_status" TEXT,
    "actor_id" TEXT NOT NULL,
    "actor_role" TEXT NOT NULL,
    "note" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "material_request_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "progress_verification_logs" (
    "id" TEXT NOT NULL,
    "project_id" TEXT NOT NULL,
    "supervisor_id" TEXT NOT NULL,
    "previous_progress" DOUBLE PRECISION NOT NULL,
    "new_progress" DOUBLE PRECISION NOT NULL,
    "notes" TEXT NOT NULL,
    "stage_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "progress_verification_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "weekly_journals" (
    "id" TEXT NOT NULL,
    "project_id" TEXT NOT NULL,
    "foreman_id" TEXT NOT NULL,
    "supervisor_id" TEXT NOT NULL,
    "week_start_date" TIMESTAMP(3) NOT NULL,
    "week_end_date" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "claimed_progress" DOUBLE PRECISION,
    "verified_progress_snapshot" DOUBLE PRECISION,
    "summary" TEXT,
    "blocker_note" TEXT,
    "reviewed_by_id" TEXT,
    "submitted_at" TIMESTAMP(3),
    "reviewed_at" TIMESTAMP(3),
    "locked_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "weekly_journals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "weekly_journal_activities" (
    "id" TEXT NOT NULL,
    "weekly_journal_id" TEXT NOT NULL,
    "project_stage_id" TEXT,
    "rab_item_id" TEXT,
    "work_title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "location" TEXT,
    "volume" DECIMAL(12,3),
    "unit" TEXT,
    "worker_count" INTEGER,
    "start_date" TIMESTAMP(3),
    "end_date" TIMESTAMP(3),
    "progress_claim" DOUBLE PRECISION,
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "weekly_journal_activities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "weekly_journal_photos" (
    "id" TEXT NOT NULL,
    "weekly_journal_id" TEXT NOT NULL,
    "activity_id" TEXT,
    "photo_url" TEXT NOT NULL,
    "caption" TEXT,
    "taken_at" TIMESTAMP(3),
    "uploaded_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "weekly_journal_photos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "weekly_journal_review_logs" (
    "id" TEXT NOT NULL,
    "weekly_journal_id" TEXT NOT NULL,
    "actor_role" TEXT NOT NULL,
    "actor_id" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "old_status" TEXT,
    "new_status" TEXT,
    "note" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "weekly_journal_review_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "supervisor_weekly_reports" (
    "id" TEXT NOT NULL,
    "project_id" TEXT NOT NULL,
    "supervisor_id" TEXT NOT NULL,
    "week_start_date" TIMESTAMP(3) NOT NULL,
    "week_end_date" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "verified_progress_snapshot" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "summary" TEXT,
    "quality_notes" TEXT,
    "safety_notes" TEXT,
    "blocker_notes" TEXT,
    "recommendation" TEXT,
    "admin_note" TEXT,
    "reviewed_by_admin_id" TEXT,
    "customer_summary_draft" TEXT,
    "submitted_at" TIMESTAMP(3),
    "reviewed_at" TIMESTAMP(3),
    "locked_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "is_visible_to_customer" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "supervisor_weekly_reports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "supervisor_weekly_report_journals" (
    "id" TEXT NOT NULL,
    "report_id" TEXT NOT NULL,
    "weekly_journal_id" TEXT NOT NULL,
    "note" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "supervisor_weekly_report_journals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "supervisor_weekly_report_notes" (
    "id" TEXT NOT NULL,
    "report_id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "severity" TEXT,
    "project_stage_id" TEXT,
    "rab_item_id" TEXT,
    "progress" DOUBLE PRECISION,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "supervisor_weekly_report_notes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "supervisor_weekly_report_review_logs" (
    "id" TEXT NOT NULL,
    "report_id" TEXT NOT NULL,
    "actor_role" TEXT NOT NULL,
    "actor_id" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "old_status" TEXT,
    "new_status" TEXT,
    "note" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "supervisor_weekly_report_review_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_stage_public_comments" (
    "id" TEXT NOT NULL,
    "project_id" TEXT NOT NULL,
    "project_stage_id" TEXT NOT NULL,
    "author_role" TEXT NOT NULL,
    "author_id" TEXT,
    "author_name" TEXT,
    "message" TEXT NOT NULL,
    "parent_id" TEXT,
    "status" TEXT NOT NULL DEFAULT 'published',
    "is_official" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "project_stage_public_comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "design_requests" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "building_type" TEXT,
    "location" TEXT,
    "estimated_budget" DECIMAL(15,2),
    "status" TEXT NOT NULL DEFAULT 'submitted',
    "notes" TEXT,
    "customer_id" TEXT,
    "project_id" TEXT,
    "architect_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),
    "major_revision_count" INTEGER NOT NULL DEFAULT 0,
    "minor_revision_count" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "design_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "design_request_history" (
    "id" TEXT NOT NULL,
    "design_request_id" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "actor_role" TEXT NOT NULL,
    "actor_id" TEXT NOT NULL,
    "actor_name" TEXT,
    "note" TEXT,
    "metadata" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "design_request_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "design_tenders" (
    "id" TEXT NOT NULL,
    "design_request_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "status" TEXT NOT NULL DEFAULT 'open',
    "base_design_fee" DECIMAL(15,2) NOT NULL,
    "platform_fee_percent" DECIMAL(5,2) NOT NULL DEFAULT 30,
    "drafter_budget_percent" DECIMAL(5,2) NOT NULL DEFAULT 70,
    "platform_fee_amount" DECIMAL(15,2) NOT NULL,
    "drafter_budget_amount" DECIMAL(15,2) NOT NULL,
    "published_at" TIMESTAMP(3),
    "closed_at" TIMESTAMP(3),
    "awarded_at" TIMESTAMP(3),
    "selected_bid_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "design_tenders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "design_tender_bids" (
    "id" TEXT NOT NULL,
    "design_tender_id" TEXT NOT NULL,
    "architect_id" TEXT NOT NULL,
    "bid_amount" DECIMAL(15,2) NOT NULL,
    "message" TEXT,
    "estimated_duration_days" INTEGER,
    "status" TEXT NOT NULL DEFAULT 'submitted',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "design_tender_bids_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audit_logs" (
    "id" TEXT NOT NULL,
    "actor_role" TEXT NOT NULL,
    "actor_id" TEXT NOT NULL,
    "actor_name" TEXT,
    "action" TEXT NOT NULL,
    "entity_type" TEXT NOT NULL,
    "entity_id" TEXT NOT NULL,
    "summary" TEXT,
    "metadata" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "audit_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profile_change_requests" (
    "id" TEXT NOT NULL,
    "target_role" TEXT NOT NULL,
    "target_id" TEXT NOT NULL,
    "requested_by_role" TEXT NOT NULL,
    "requested_by_id" TEXT NOT NULL,
    "field_name" TEXT NOT NULL,
    "old_value" TEXT,
    "new_value" TEXT,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "reviewed_by_role" TEXT,
    "reviewed_by_id" TEXT,
    "reviewed_at" TIMESTAMP(3),
    "note" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "profile_change_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customer_payment_plans" (
    "id" TEXT NOT NULL,
    "project_id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "customer_payment_plans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customer_payment_milestones" (
    "id" TEXT NOT NULL,
    "payment_plan_id" TEXT NOT NULL,
    "project_id" TEXT NOT NULL,
    "category_id" TEXT,
    "label" TEXT NOT NULL,
    "percentage" DOUBLE PRECISION,
    "amount" DECIMAL(15,2) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'planned',
    "due_order" INTEGER NOT NULL,
    "note" TEXT,
    "paid_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "customer_payment_milestones_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "foreman_weekly_payment_eligibilities" (
    "id" TEXT NOT NULL,
    "project_id" TEXT NOT NULL,
    "foreman_id" TEXT NOT NULL,
    "weekly_journal_id" TEXT,
    "supervisor_report_id" TEXT,
    "week_number" INTEGER,
    "period_start" TIMESTAMP(3),
    "period_end" TIMESTAMP(3),
    "status" TEXT NOT NULL DEFAULT 'pending_review',
    "estimated_amount" DECIMAL(15,2),
    "approved_amount" DECIMAL(15,2),
    "admin_note" TEXT,
    "reviewed_by_id" TEXT,
    "reviewed_at" TIMESTAMP(3),
    "paid_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "foreman_weekly_payment_eligibilities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "foreman_weekly_payment_eligibility_items" (
    "id" TEXT NOT NULL,
    "eligibility_id" TEXT NOT NULL,
    "rab_item_id" TEXT,
    "project_stage_id" TEXT,
    "weekly_journal_activity_id" TEXT,
    "description" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "estimated_amount" DECIMAL(15,2),
    "approved_amount" DECIMAL(15,2),
    "note" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "foreman_weekly_payment_eligibility_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "field_issues" (
    "id" TEXT NOT NULL,
    "issue_code" TEXT NOT NULL,
    "project_id" TEXT NOT NULL,
    "foreman_id" TEXT NOT NULL,
    "supervisor_id" TEXT,
    "admin_id" TEXT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "priority" TEXT NOT NULL DEFAULT 'medium',
    "status" TEXT NOT NULL DEFAULT 'open',
    "stage_id" TEXT,
    "rab_item_id" TEXT,
    "resolution_note" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "resolved_at" TIMESTAMP(3),

    CONSTRAINT "field_issues_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "daily_tasks" (
    "id" TEXT NOT NULL,
    "project_id" TEXT NOT NULL,
    "foreman_id" TEXT NOT NULL,
    "stage_id" TEXT,
    "rab_item_id" TEXT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "target_date" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'todo',
    "priority" TEXT NOT NULL DEFAULT 'medium',
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "daily_tasks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "daily_reports" (
    "id" TEXT NOT NULL,
    "report_code" TEXT NOT NULL,
    "project_id" TEXT NOT NULL,
    "foreman_id" TEXT NOT NULL,
    "supervisor_id" TEXT,
    "date" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "weather_summary" TEXT,
    "worker_count" INTEGER,
    "activity_summary" TEXT NOT NULL,
    "blocker_summary" TEXT,
    "task_id" TEXT,
    "stage_id" TEXT,
    "field_issue_id" TEXT,
    "supervisor_note" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "submitted_at" TIMESTAMP(3),
    "reviewed_at" TIMESTAMP(3),

    CONSTRAINT "daily_reports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_documents" (
    "id" TEXT NOT NULL,
    "project_id" TEXT,
    "design_request_id" TEXT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "category" TEXT NOT NULL,
    "file_name" TEXT NOT NULL,
    "file_url" TEXT,
    "mime_type" TEXT,
    "size" INTEGER,
    "visibility" TEXT NOT NULL DEFAULT 'internal',
    "status" TEXT NOT NULL DEFAULT 'active',
    "uploaded_by_role" TEXT NOT NULL,
    "uploaded_by_id" TEXT NOT NULL,
    "stage_id" TEXT,
    "daily_report_id" TEXT,
    "field_issue_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "project_documents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payment_records" (
    "id" TEXT NOT NULL,
    "payment_code" TEXT NOT NULL,
    "project_id" TEXT NOT NULL,
    "customer_id" TEXT,
    "foreman_id" TEXT,
    "type" TEXT NOT NULL,
    "amount" DECIMAL(15,2) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "due_date" TIMESTAMP(3),
    "paid_at" TIMESTAMP(3),
    "verified_at" TIMESTAMP(3),
    "verified_by_role" TEXT,
    "verified_by_id" TEXT,
    "note" TEXT,
    "proof_document_id" TEXT,
    "milestone_id" TEXT,
    "eligibility_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "payment_records_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "administrative_helper_documents" (
    "id" TEXT NOT NULL,
    "document_code" TEXT NOT NULL,
    "project_id" TEXT NOT NULL,
    "customer_id" TEXT,
    "payment_record_id" TEXT,
    "type" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "content_json" JSONB,
    "summary_data" TEXT,
    "note" TEXT,
    "issued_at" TIMESTAMP(3),
    "released_at" TIMESTAMP(3),
    "created_by_id" TEXT,
    "created_by_role" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "administrative_helper_documents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "app_notifications" (
    "id" TEXT NOT NULL,
    "recipient_role" TEXT NOT NULL,
    "recipient_id" TEXT NOT NULL,
    "actor_role" TEXT,
    "actor_id" TEXT,
    "event_type" TEXT NOT NULL,
    "entity_type" TEXT,
    "entity_id" TEXT,
    "title" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "link_path" TEXT,
    "read_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "app_notifications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "material_requests_request_code_key" ON "material_requests"("request_code");

-- CreateIndex
CREATE UNIQUE INDEX "weekly_journals_project_id_foreman_id_week_start_date_week__key" ON "weekly_journals"("project_id", "foreman_id", "week_start_date", "week_end_date");

-- CreateIndex
CREATE UNIQUE INDEX "supervisor_weekly_reports_project_id_supervisor_id_week_sta_key" ON "supervisor_weekly_reports"("project_id", "supervisor_id", "week_start_date", "week_end_date");

-- CreateIndex
CREATE UNIQUE INDEX "supervisor_weekly_report_journals_report_id_weekly_journal__key" ON "supervisor_weekly_report_journals"("report_id", "weekly_journal_id");

-- CreateIndex
CREATE UNIQUE INDEX "design_tenders_design_request_id_key" ON "design_tenders"("design_request_id");

-- CreateIndex
CREATE UNIQUE INDEX "design_tender_bids_design_tender_id_architect_id_key" ON "design_tender_bids"("design_tender_id", "architect_id");

-- CreateIndex
CREATE UNIQUE INDEX "customer_payment_plans_project_id_key" ON "customer_payment_plans"("project_id");

-- CreateIndex
CREATE UNIQUE INDEX "field_issues_issue_code_key" ON "field_issues"("issue_code");

-- CreateIndex
CREATE UNIQUE INDEX "daily_reports_report_code_key" ON "daily_reports"("report_code");

-- CreateIndex
CREATE UNIQUE INDEX "payment_records_payment_code_key" ON "payment_records"("payment_code");

-- CreateIndex
CREATE UNIQUE INDEX "administrative_helper_documents_document_code_key" ON "administrative_helper_documents"("document_code");

-- CreateIndex
CREATE UNIQUE INDEX "projects_source_design_request_id_key" ON "projects"("source_design_request_id");

-- AddForeignKey
ALTER TABLE "material_requests" ADD CONSTRAINT "material_requests_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "admins"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "material_requests" ADD CONSTRAINT "material_requests_foreman_id_fkey" FOREIGN KEY ("foreman_id") REFERENCES "foremen"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "material_requests" ADD CONSTRAINT "material_requests_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "material_requests" ADD CONSTRAINT "material_requests_stage_id_fkey" FOREIGN KEY ("stage_id") REFERENCES "project_stages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "material_requests" ADD CONSTRAINT "material_requests_supervisor_id_fkey" FOREIGN KEY ("supervisor_id") REFERENCES "supervisors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "material_request_items" ADD CONSTRAINT "material_request_items_material_request_id_fkey" FOREIGN KEY ("material_request_id") REFERENCES "material_requests"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "material_request_items" ADD CONSTRAINT "material_request_items_rab_item_id_fkey" FOREIGN KEY ("rab_item_id") REFERENCES "rab_items"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "material_request_history" ADD CONSTRAINT "material_request_history_material_request_id_fkey" FOREIGN KEY ("material_request_id") REFERENCES "material_requests"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "progress_verification_logs" ADD CONSTRAINT "progress_verification_logs_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "progress_verification_logs" ADD CONSTRAINT "progress_verification_logs_supervisor_id_fkey" FOREIGN KEY ("supervisor_id") REFERENCES "supervisors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "weekly_journals" ADD CONSTRAINT "weekly_journals_foreman_id_fkey" FOREIGN KEY ("foreman_id") REFERENCES "foremen"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "weekly_journals" ADD CONSTRAINT "weekly_journals_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "weekly_journals" ADD CONSTRAINT "weekly_journals_supervisor_id_fkey" FOREIGN KEY ("supervisor_id") REFERENCES "supervisors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "weekly_journal_activities" ADD CONSTRAINT "weekly_journal_activities_weekly_journal_id_fkey" FOREIGN KEY ("weekly_journal_id") REFERENCES "weekly_journals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "weekly_journal_activities" ADD CONSTRAINT "weekly_journal_activities_project_stage_id_fkey" FOREIGN KEY ("project_stage_id") REFERENCES "project_stages"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "weekly_journal_activities" ADD CONSTRAINT "weekly_journal_activities_rab_item_id_fkey" FOREIGN KEY ("rab_item_id") REFERENCES "rab_items"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "weekly_journal_photos" ADD CONSTRAINT "weekly_journal_photos_activity_id_fkey" FOREIGN KEY ("activity_id") REFERENCES "weekly_journal_activities"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "weekly_journal_photos" ADD CONSTRAINT "weekly_journal_photos_weekly_journal_id_fkey" FOREIGN KEY ("weekly_journal_id") REFERENCES "weekly_journals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "weekly_journal_review_logs" ADD CONSTRAINT "weekly_journal_review_logs_weekly_journal_id_fkey" FOREIGN KEY ("weekly_journal_id") REFERENCES "weekly_journals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supervisor_weekly_reports" ADD CONSTRAINT "supervisor_weekly_reports_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supervisor_weekly_reports" ADD CONSTRAINT "supervisor_weekly_reports_supervisor_id_fkey" FOREIGN KEY ("supervisor_id") REFERENCES "supervisors"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supervisor_weekly_report_journals" ADD CONSTRAINT "supervisor_weekly_report_journals_report_id_fkey" FOREIGN KEY ("report_id") REFERENCES "supervisor_weekly_reports"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supervisor_weekly_report_journals" ADD CONSTRAINT "supervisor_weekly_report_journals_weekly_journal_id_fkey" FOREIGN KEY ("weekly_journal_id") REFERENCES "weekly_journals"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supervisor_weekly_report_notes" ADD CONSTRAINT "supervisor_weekly_report_notes_report_id_fkey" FOREIGN KEY ("report_id") REFERENCES "supervisor_weekly_reports"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supervisor_weekly_report_notes" ADD CONSTRAINT "supervisor_weekly_report_notes_project_stage_id_fkey" FOREIGN KEY ("project_stage_id") REFERENCES "project_stages"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supervisor_weekly_report_notes" ADD CONSTRAINT "supervisor_weekly_report_notes_rab_item_id_fkey" FOREIGN KEY ("rab_item_id") REFERENCES "rab_items"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "supervisor_weekly_report_review_logs" ADD CONSTRAINT "supervisor_weekly_report_review_logs_report_id_fkey" FOREIGN KEY ("report_id") REFERENCES "supervisor_weekly_reports"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_stage_public_comments" ADD CONSTRAINT "project_stage_public_comments_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_stage_public_comments" ADD CONSTRAINT "project_stage_public_comments_project_stage_id_fkey" FOREIGN KEY ("project_stage_id") REFERENCES "project_stages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_stage_public_comments" ADD CONSTRAINT "project_stage_public_comments_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "project_stage_public_comments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "design_requests" ADD CONSTRAINT "design_requests_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "design_requests" ADD CONSTRAINT "design_requests_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "design_requests" ADD CONSTRAINT "design_requests_architect_id_fkey" FOREIGN KEY ("architect_id") REFERENCES "architects"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "design_request_history" ADD CONSTRAINT "design_request_history_design_request_id_fkey" FOREIGN KEY ("design_request_id") REFERENCES "design_requests"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "design_tenders" ADD CONSTRAINT "design_tenders_design_request_id_fkey" FOREIGN KEY ("design_request_id") REFERENCES "design_requests"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "design_tender_bids" ADD CONSTRAINT "design_tender_bids_design_tender_id_fkey" FOREIGN KEY ("design_tender_id") REFERENCES "design_tenders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "design_tender_bids" ADD CONSTRAINT "design_tender_bids_architect_id_fkey" FOREIGN KEY ("architect_id") REFERENCES "architects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer_payment_plans" ADD CONSTRAINT "customer_payment_plans_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer_payment_milestones" ADD CONSTRAINT "customer_payment_milestones_payment_plan_id_fkey" FOREIGN KEY ("payment_plan_id") REFERENCES "customer_payment_plans"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer_payment_milestones" ADD CONSTRAINT "customer_payment_milestones_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "rab_categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "foreman_weekly_payment_eligibilities" ADD CONSTRAINT "foreman_weekly_payment_eligibilities_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "foreman_weekly_payment_eligibilities" ADD CONSTRAINT "foreman_weekly_payment_eligibilities_foreman_id_fkey" FOREIGN KEY ("foreman_id") REFERENCES "foremen"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "foreman_weekly_payment_eligibilities" ADD CONSTRAINT "foreman_weekly_payment_eligibilities_weekly_journal_id_fkey" FOREIGN KEY ("weekly_journal_id") REFERENCES "weekly_journals"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "foreman_weekly_payment_eligibilities" ADD CONSTRAINT "foreman_weekly_payment_eligibilities_supervisor_report_id_fkey" FOREIGN KEY ("supervisor_report_id") REFERENCES "supervisor_weekly_reports"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "foreman_weekly_payment_eligibilities" ADD CONSTRAINT "foreman_weekly_payment_eligibilities_reviewed_by_id_fkey" FOREIGN KEY ("reviewed_by_id") REFERENCES "admins"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "foreman_weekly_payment_eligibility_items" ADD CONSTRAINT "foreman_weekly_payment_eligibility_items_eligibility_id_fkey" FOREIGN KEY ("eligibility_id") REFERENCES "foreman_weekly_payment_eligibilities"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "foreman_weekly_payment_eligibility_items" ADD CONSTRAINT "foreman_weekly_payment_eligibility_items_rab_item_id_fkey" FOREIGN KEY ("rab_item_id") REFERENCES "rab_items"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "foreman_weekly_payment_eligibility_items" ADD CONSTRAINT "foreman_weekly_payment_eligibility_items_project_stage_id_fkey" FOREIGN KEY ("project_stage_id") REFERENCES "project_stages"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "foreman_weekly_payment_eligibility_items" ADD CONSTRAINT "foreman_weekly_payment_eligibility_items_weekly_journal_ac_fkey" FOREIGN KEY ("weekly_journal_activity_id") REFERENCES "weekly_journal_activities"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "field_issues" ADD CONSTRAINT "field_issues_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "field_issues" ADD CONSTRAINT "field_issues_foreman_id_fkey" FOREIGN KEY ("foreman_id") REFERENCES "foremen"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "field_issues" ADD CONSTRAINT "field_issues_supervisor_id_fkey" FOREIGN KEY ("supervisor_id") REFERENCES "supervisors"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "field_issues" ADD CONSTRAINT "field_issues_admin_id_fkey" FOREIGN KEY ("admin_id") REFERENCES "admins"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "field_issues" ADD CONSTRAINT "field_issues_stage_id_fkey" FOREIGN KEY ("stage_id") REFERENCES "project_stages"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "field_issues" ADD CONSTRAINT "field_issues_rab_item_id_fkey" FOREIGN KEY ("rab_item_id") REFERENCES "rab_items"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "daily_tasks" ADD CONSTRAINT "daily_tasks_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "daily_tasks" ADD CONSTRAINT "daily_tasks_foreman_id_fkey" FOREIGN KEY ("foreman_id") REFERENCES "foremen"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "daily_tasks" ADD CONSTRAINT "daily_tasks_stage_id_fkey" FOREIGN KEY ("stage_id") REFERENCES "project_stages"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "daily_tasks" ADD CONSTRAINT "daily_tasks_rab_item_id_fkey" FOREIGN KEY ("rab_item_id") REFERENCES "rab_items"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "daily_reports" ADD CONSTRAINT "daily_reports_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "daily_reports" ADD CONSTRAINT "daily_reports_foreman_id_fkey" FOREIGN KEY ("foreman_id") REFERENCES "foremen"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "daily_reports" ADD CONSTRAINT "daily_reports_supervisor_id_fkey" FOREIGN KEY ("supervisor_id") REFERENCES "supervisors"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "daily_reports" ADD CONSTRAINT "daily_reports_task_id_fkey" FOREIGN KEY ("task_id") REFERENCES "daily_tasks"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "daily_reports" ADD CONSTRAINT "daily_reports_stage_id_fkey" FOREIGN KEY ("stage_id") REFERENCES "project_stages"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "daily_reports" ADD CONSTRAINT "daily_reports_field_issue_id_fkey" FOREIGN KEY ("field_issue_id") REFERENCES "field_issues"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_documents" ADD CONSTRAINT "project_documents_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_documents" ADD CONSTRAINT "project_documents_design_request_id_fkey" FOREIGN KEY ("design_request_id") REFERENCES "design_requests"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_documents" ADD CONSTRAINT "project_documents_stage_id_fkey" FOREIGN KEY ("stage_id") REFERENCES "project_stages"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_documents" ADD CONSTRAINT "project_documents_daily_report_id_fkey" FOREIGN KEY ("daily_report_id") REFERENCES "daily_reports"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_documents" ADD CONSTRAINT "project_documents_field_issue_id_fkey" FOREIGN KEY ("field_issue_id") REFERENCES "field_issues"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_records" ADD CONSTRAINT "payment_records_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_records" ADD CONSTRAINT "payment_records_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_records" ADD CONSTRAINT "payment_records_foreman_id_fkey" FOREIGN KEY ("foreman_id") REFERENCES "foremen"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payment_records" ADD CONSTRAINT "payment_records_proof_document_id_fkey" FOREIGN KEY ("proof_document_id") REFERENCES "project_documents"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "administrative_helper_documents" ADD CONSTRAINT "administrative_helper_documents_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "administrative_helper_documents" ADD CONSTRAINT "administrative_helper_documents_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "administrative_helper_documents" ADD CONSTRAINT "administrative_helper_documents_payment_record_id_fkey" FOREIGN KEY ("payment_record_id") REFERENCES "payment_records"("id") ON DELETE SET NULL ON UPDATE CASCADE;
