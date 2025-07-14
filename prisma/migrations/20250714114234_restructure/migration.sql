/*
  Warnings:

  - You are about to drop the `Ingredients` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Instructions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Nutrition` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `ingredients` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `instructions` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nutrition` to the `Recipe` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Ingredients" DROP CONSTRAINT "Ingredients_recipeId_fkey";

-- DropForeignKey
ALTER TABLE "Instructions" DROP CONSTRAINT "Instructions_recipeId_fkey";

-- DropForeignKey
ALTER TABLE "Nutrition" DROP CONSTRAINT "Nutrition_recipeId_fkey";

-- DropForeignKey
ALTER TABLE "Recipe" DROP CONSTRAINT "Recipe_uploaderId_fkey";

-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "ingredients" JSONB NOT NULL,
ADD COLUMN     "instructions" JSONB NOT NULL,
ADD COLUMN     "nutrition" JSONB NOT NULL;

-- DropTable
DROP TABLE "Ingredients";

-- DropTable
DROP TABLE "Instructions";

-- DropTable
DROP TABLE "Nutrition";

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_uploaderId_fkey" FOREIGN KEY ("uploaderId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
