-- CreateTable
CREATE TABLE "WaitingList" (
    "id" SERIAL NOT NULL,
    "WaitingNumber" INTEGER NOT NULL,
    "WaitingStatus" TEXT NOT NULL DEFAULT 'Waiting',

    CONSTRAINT "WaitingList_pkey" PRIMARY KEY ("id")
);
