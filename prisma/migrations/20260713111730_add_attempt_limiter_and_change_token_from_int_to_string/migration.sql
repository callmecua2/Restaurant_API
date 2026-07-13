-- AlterTable
ALTER TABLE "emailVerification" ADD COLUMN     "attempts" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "token" SET DATA TYPE TEXT;
