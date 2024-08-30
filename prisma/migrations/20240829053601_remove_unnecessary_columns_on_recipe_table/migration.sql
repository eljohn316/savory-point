/*
  Warnings:

  - You are about to drop the column `about` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `creditsText` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `readyTime` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `sourceName` on the `Recipe` table. All the data in the column will be lost.
  - You are about to drop the column `sourceUrl` on the `Recipe` table. All the data in the column will be lost.
  - Added the required column `step` to the `Instruction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Recipe` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Instruction" ADD COLUMN     "step" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "about",
DROP COLUMN "creditsText",
DROP COLUMN "readyTime",
DROP COLUMN "sourceName",
DROP COLUMN "sourceUrl",
ADD COLUMN     "description" TEXT NOT NULL;
