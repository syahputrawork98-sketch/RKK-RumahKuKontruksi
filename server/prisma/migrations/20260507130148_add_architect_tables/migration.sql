-- CreateTable
CREATE TABLE "architects" (
    "id" TEXT NOT NULL,
    "user_id" TEXT,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "avatar" TEXT,
    "employment_type" TEXT,
    "specialization" TEXT,
    "experience_years" INTEGER,
    "skill_tags" JSONB,
    "max_design_capacity" INTEGER NOT NULL DEFAULT 2,
    "status" TEXT NOT NULL DEFAULT 'active',
    "joined_at" TIMESTAMP(3),
    "notes" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "architects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "architect_certificates" (
    "id" TEXT NOT NULL,
    "architect_id" TEXT NOT NULL,
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

    CONSTRAINT "architect_certificates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "architect_experiences" (
    "id" TEXT NOT NULL,
    "architect_id" TEXT NOT NULL,
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

    CONSTRAINT "architect_experiences_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "architects_email_key" ON "architects"("email");

-- AddForeignKey
ALTER TABLE "architect_certificates" ADD CONSTRAINT "architect_certificates_architect_id_fkey" FOREIGN KEY ("architect_id") REFERENCES "architects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "architect_experiences" ADD CONSTRAINT "architect_experiences_architect_id_fkey" FOREIGN KEY ("architect_id") REFERENCES "architects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
