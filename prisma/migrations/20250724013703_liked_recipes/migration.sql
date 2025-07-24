/*
  Warnings:

  - You are about to drop the column `imagePublicId` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `Recipe` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Recipe" DROP CONSTRAINT "Recipe_uploaderId_fkey";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "imagePublicId",
ADD COLUMN     "image" TEXT;

-- DropTable
DROP TABLE "Recipe";

-- CreateTable
CREATE TABLE "recipe" (
    "id" TEXT NOT NULL,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "imagePublicId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "servings" INTEGER NOT NULL,
    "cooking" DOUBLE PRECISION NOT NULL,
    "preparation" DOUBLE PRECISION NOT NULL,
    "total" DOUBLE PRECISION NOT NULL,
    "ingredients" JSONB NOT NULL,
    "instructions" JSONB NOT NULL,
    "nutrition" JSONB NOT NULL,
    "uploaderId" TEXT NOT NULL,

    CONSTRAINT "recipe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "likedRecipes" (
    "id" TEXT NOT NULL,
    "recipeId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "likedRecipes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "recipe_name_key" ON "recipe"("name");

-- CreateIndex
CREATE UNIQUE INDEX "recipe_slug_key" ON "recipe"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "likedRecipes_recipeId_key" ON "likedRecipes"("recipeId");

-- CreateIndex
CREATE UNIQUE INDEX "likedRecipes_userId_key" ON "likedRecipes"("userId");

-- AddForeignKey
ALTER TABLE "recipe" ADD CONSTRAINT "recipe_uploaderId_fkey" FOREIGN KEY ("uploaderId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likedRecipes" ADD CONSTRAINT "likedRecipes_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "likedRecipes" ADD CONSTRAINT "likedRecipes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
