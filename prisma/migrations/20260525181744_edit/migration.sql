/*
  Warnings:

  - The `status` column on the `Order` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `orderId` on the `Payment` table. All the data in the column will be lost.
  - Added the required column `orderNum` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('WAITING_PAYMENT', 'PAID', 'CANCELLED');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'SUCCESS', 'FAILED', 'CANCELLED');

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_orderId_fkey";

-- DropIndex
DROP INDEX "Payment_orderId_key";

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "status",
ADD COLUMN     "status" "OrderStatus" NOT NULL DEFAULT 'WAITING_PAYMENT';

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "orderId",
ADD COLUMN     "orderNum" INTEGER NOT NULL,
ADD COLUMN     "status" "PaymentStatus" NOT NULL DEFAULT 'SUCCESS';

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_orderNum_fkey" FOREIGN KEY ("orderNum") REFERENCES "Order"("orderNumber") ON DELETE RESTRICT ON UPDATE CASCADE;
