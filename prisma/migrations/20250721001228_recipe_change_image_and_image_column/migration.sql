/*
  Warnings:

  - You are about to drop the column `image` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `Cooking` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `cooking` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imagePublicId` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `preparation` to the `Recipe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total` to the `Recipe` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Cooking" DROP CONSTRAINT "Cooking_recipeId_fkey";

-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "image",
ADD COLUMN     "cooking" TEXT NOT NULL,
ADD COLUMN     "imagePublicId" TEXT NOT NULL,
ADD COLUMN     "preparation" TEXT NOT NULL,
ADD COLUMN     "total" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "user" DROP COLUMN "image",
ADD COLUMN     "imagePublicId" TEXT;

-- DropTable
DROP TABLE "Cooking";
