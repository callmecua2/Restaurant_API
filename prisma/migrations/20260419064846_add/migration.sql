/*
  Warnings:

  - You are about to drop the column `tableNumber` on the `OrderItem` table. All the data in the column will be lost.
  - Added the required column `tableNumber` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "tableNumber" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "OrderItem" DROP COLUMN "tableNumber";
