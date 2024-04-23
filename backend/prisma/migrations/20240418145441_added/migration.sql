/*
  Warnings:

  - You are about to drop the column `formId` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Form" ALTER COLUMN "userId" DROP DEFAULT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "formId";
