/*
  Warnings:

  - You are about to drop the column `updaedAt` on the `Form` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Form" DROP COLUMN "updaedAt",
ADD COLUMN     "updatedAt" TIMESTAMP(3);
