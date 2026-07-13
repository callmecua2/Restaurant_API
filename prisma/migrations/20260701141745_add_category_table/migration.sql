-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "OrganizationId" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CategoryToFood" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_CategoryToFood_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_CategoryToFood_B_index" ON "_CategoryToFood"("B");

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_OrganizationId_fkey" FOREIGN KEY ("OrganizationId") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToFood" ADD CONSTRAINT "_CategoryToFood_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToFood" ADD CONSTRAINT "_CategoryToFood_B_fkey" FOREIGN KEY ("B") REFERENCES "Food"("id") ON DELETE CASCADE ON UPDATE CASCADE;
