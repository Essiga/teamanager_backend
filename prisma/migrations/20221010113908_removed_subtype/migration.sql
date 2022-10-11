/*
  Warnings:

  - You are about to drop the `SubType` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "SubType" DROP CONSTRAINT "SubType_teaId_fkey";

-- DropTable
DROP TABLE "SubType";
