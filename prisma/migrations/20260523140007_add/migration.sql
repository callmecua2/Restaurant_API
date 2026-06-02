/*
  Warnings:

  - Added the required column `OrganizationId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "OrganizationId" INTEGER NOT NULL,
ADD COLUMN     "sometesting" TEXT;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_OrganizationId_fkey" FOREIGN KEY ("OrganizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
