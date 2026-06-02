/*
  Warnings:

  - The primary key for the `WaitingList` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `WaitingNumber` on the `WaitingList` table. All the data in the column will be lost.
  - You are about to drop the column `WaitingStatus` on the `WaitingList` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "WaitingList" DROP CONSTRAINT "WaitingList_pkey",
DROP COLUMN "WaitingNumber",
DROP COLUMN "WaitingStatus",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "customerName" TEXT,
ADD COLUMN     "numberOfCustomer" INTEGER,
ADD COLUMN     "waitingNumber" SERIAL NOT NULL,
ADD COLUMN     "waitingStatus" TEXT NOT NULL DEFAULT 'Waiting',
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "WaitingList_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "WaitingList_id_seq";
