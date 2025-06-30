/*
  Warnings:

  - A unique constraint covering the columns `[uploaderId]` on the table `Recipe` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "uploaderId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Recipe_uploaderId_key" ON "Recipe"("uploaderId");

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_uploaderId_fkey" FOREIGN KEY ("uploaderId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
