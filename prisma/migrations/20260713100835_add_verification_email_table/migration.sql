-- CreateTable
CREATE TABLE "emailVerification" (
    "id" TEXT NOT NULL,
    "OrganizationId" INTEGER,
    "token" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiredAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "emailVerification_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "emailVerification" ADD CONSTRAINT "emailVerification_OrganizationId_fkey" FOREIGN KEY ("OrganizationId") REFERENCES "Organization"("id") ON DELETE CASCADE ON UPDATE CASCADE;
