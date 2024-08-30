-- CreateEnum
CREATE TYPE "Type" AS ENUM ('WATER', 'GAS');

-- CreateTable
CREATE TABLE "measures" (
    "id" TEXT NOT NULL,
    "value" DECIMAL(10,2) NOT NULL,
    "customer_code" TEXT NOT NULL,
    "type" "Type" NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "confirmed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "measures_pkey" PRIMARY KEY ("id")
);
