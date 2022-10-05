/*
  Warnings:

  - Added the required column `teaId` to the `PriceAtDate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PriceAtDate" ADD COLUMN     "teaId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "PriceAtDate" ADD CONSTRAINT "PriceAtDate_teaId_fkey" FOREIGN KEY ("teaId") REFERENCES "Tea"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
