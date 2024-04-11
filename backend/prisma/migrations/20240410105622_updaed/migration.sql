/*
  Warnings:

  - The `properties` column on the `Form` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Form" DROP COLUMN "properties",
ADD COLUMN     "properties" JSONB;
