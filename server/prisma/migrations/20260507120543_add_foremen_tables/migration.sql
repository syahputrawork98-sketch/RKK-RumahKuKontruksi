-- CreateTable
CREATE TABLE "foremen" (
    "id" TEXT NOT NULL,
    "user_id" TEXT,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "avatar" TEXT,
    "vendor_type" TEXT,
    "company_name" TEXT,
    "address" TEXT,
    "specialization" TEXT,
    "experience_years" INTEGER,
    "skill_tags" JSONB,
    "team_summary" JSONB,
    "max_project_capacity" INTEGER NOT NULL DEFAULT 2,
    "status" TEXT NOT NULL DEFAULT 'active',
    "joined_at" TIMESTAMP(3),
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "foremen_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "foreman_certificates" (
    "id" TEXT NOT NULL,
    "foreman_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "issuer" TEXT NOT NULL,
    "certificate_number" TEXT,
    "issued_at" TIMESTAMP(3),
    "expired_at" TIMESTAMP(3),
    "file_url" TEXT,
    "file_type" TEXT,
    "status" TEXT NOT NULL DEFAULT 'valid',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "foreman_certificates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "foreman_experiences" (
    "id" TEXT NOT NULL,
    "foreman_id" TEXT NOT NULL,
    "project_name" TEXT NOT NULL,
    "company_name" TEXT,
    "role" TEXT,
    "location" TEXT,
    "start_year" INTEGER,
    "end_year" INTEGER,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "foreman_experiences_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "foremen_email_key" ON "foremen"("email");

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_foreman_id_fkey" FOREIGN KEY ("foreman_id") REFERENCES "foremen"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "foreman_certificates" ADD CONSTRAINT "foreman_certificates_foreman_id_fkey" FOREIGN KEY ("foreman_id") REFERENCES "foremen"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "foreman_experiences" ADD CONSTRAINT "foreman_experiences_foreman_id_fkey" FOREIGN KEY ("foreman_id") REFERENCES "foremen"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
