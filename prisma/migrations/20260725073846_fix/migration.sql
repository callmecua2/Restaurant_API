/*
  Warnings:

  - Made the column `OrganizationId` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_OrganizationId_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "OrganizationId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_OrganizationId_fkey" FOREIGN KEY ("OrganizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
