/*
  Warnings:

  - A unique constraint covering the columns `[recipeId]` on the table `Ingredient` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[recipeId]` on the table `Instruction` will be added. If there are existing duplicate values, this will fail.
  - Made the column `recipeId` on table `Ingredient` required. This step will fail if there are existing NULL values in that column.
  - Made the column `recipeId` on table `Instruction` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `readyTime` to the `Recipe` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_recipeId_fkey";

-- DropForeignKey
ALTER TABLE "Ingredient" DROP CONSTRAINT "Ingredient_recipeId_fkey";

-- DropForeignKey
ALTER TABLE "Instruction" DROP CONSTRAINT "Instruction_recipeId_fkey";

-- AlterTable
ALTER TABLE "Ingredient" ALTER COLUMN "recipeId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Instruction" ALTER COLUMN "recipeId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "creditsText" TEXT,
ADD COLUMN     "readyTime" INTEGER NOT NULL,
ADD COLUMN     "sourceName" TEXT,
ADD COLUMN     "sourceUrl" TEXT,
ADD COLUMN     "uploaderId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Ingredient_recipeId_key" ON "Ingredient"("recipeId");

-- CreateIndex
CREATE UNIQUE INDEX "Instruction_recipeId_key" ON "Instruction"("recipeId");

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_uploaderId_fkey" FOREIGN KEY ("uploaderId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ingredient" ADD CONSTRAINT "Ingredient_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Instruction" ADD CONSTRAINT "Instruction_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;
