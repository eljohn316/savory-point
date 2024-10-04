/*
  Warnings:

  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `defaultImage` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_userId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "defaultImage" TEXT NOT NULL,
ADD COLUMN     "image" TEXT;

-- DropTable
DROP TABLE "Image";
