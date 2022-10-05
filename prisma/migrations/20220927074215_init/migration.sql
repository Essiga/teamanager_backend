-- CreateEnum
CREATE TYPE "TeaType" AS ENUM ('Green', 'Black', 'Oolong', 'Sheng', 'Shou', 'Yellow', 'White', 'Heicha');

-- CreateTable
CREATE TABLE "Tea" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(511) NOT NULL,
    "type" "TeaType" NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "link" TEXT,
    "vendor" TEXT,
    "year" INTEGER,

    CONSTRAINT "Tea_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubType" (
    "name" TEXT NOT NULL,
    "teaId" TEXT NOT NULL,

    CONSTRAINT "SubType_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "PriceAtDate" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "PriceAtDate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "teaId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,
    "price" DECIMAL(65,30),
    "vesselId" TEXT NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vessel" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,

    CONSTRAINT "Vessel_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SubType" ADD CONSTRAINT "SubType_teaId_fkey" FOREIGN KEY ("teaId") REFERENCES "Tea"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_teaId_fkey" FOREIGN KEY ("teaId") REFERENCES "Tea"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_vesselId_fkey" FOREIGN KEY ("vesselId") REFERENCES "Vessel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
