/*
  Warnings:

  - Made the column `issuer` on table `supervisor_certificates` required. This step will fail if there are existing NULL values in that column.
  - Made the column `max_project_capacity` on table `supervisors` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "supervisor_certificates" ALTER COLUMN "issuer" SET NOT NULL;

-- AlterTable
ALTER TABLE "supervisors" ALTER COLUMN "max_project_capacity" SET NOT NULL;
