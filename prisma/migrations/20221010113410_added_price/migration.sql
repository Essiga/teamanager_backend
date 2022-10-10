/*
  Warnings:

  - You are about to drop the `PriceAtDate` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PriceAtDate" DROP CONSTRAINT "PriceAtDate_teaId_fkey";

-- AlterTable
ALTER TABLE "Tea" ADD COLUMN     "price" DECIMAL(65,30);

-- DropTable
DROP TABLE "PriceAtDate";
