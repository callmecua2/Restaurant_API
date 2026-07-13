-- CreateEnum
CREATE TYPE "OrganizationStatus" AS ENUM ('PENDING_VERIFICATION', 'ACTIVE', 'SUSPENDED');

-- AlterTable
ALTER TABLE "Organization" ADD COLUMN     "status" "OrganizationStatus" NOT NULL DEFAULT 'PENDING_VERIFICATION';
