/*
  Warnings:

  - You are about to drop the column `OrganizationId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Organization` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_OrganizationId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "OrganizationId";

-- DropTable
DROP TABLE "Organization";
