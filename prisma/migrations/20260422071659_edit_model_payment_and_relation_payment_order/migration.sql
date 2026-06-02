/*
  Warnings:

  - You are about to drop the column `methodID` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the `PaymentMethod` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[orderId]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `method` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PaymentType" AS ENUM ('QRIS', 'TUNAI');

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_methodID_fkey";

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "methodID",
ADD COLUMN     "method" "PaymentType" NOT NULL;

-- DropTable
DROP TABLE "PaymentMethod";

-- CreateIndex
CREATE UNIQUE INDEX "Payment_orderId_key" ON "Payment"("orderId");

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
