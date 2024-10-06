/*
  Warnings:

  - You are about to drop the column `cookingTime` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `prepTime` on the `Recipe` table. All the data in the column will be lost.
  - Added the required column `cookingTimeHours` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cookingTimeMins` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prepTimeHours` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prepTimeMins` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Made the column `imageUrl` on table `Recipe` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "cookingTime",
DROP COLUMN "prepTime",
ADD COLUMN     "cookingTimeHours" INTEGER NOT NULL,
ADD COLUMN     "cookingTimeMins" INTEGER NOT NULL,
ADD COLUMN     "prepTimeHours" INTEGER NOT NULL,
ADD COLUMN     "prepTimeMins" INTEGER NOT NULL,
ALTER COLUMN "imageUrl" SET NOT NULL;
