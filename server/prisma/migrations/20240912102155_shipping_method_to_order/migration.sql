/*
  Warnings:

  - Added the required column `shippingAddress` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shippingMethod` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ShippingMethod" AS ENUM ('STANDARD', 'PICKUP');

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "shippingAddress" TEXT NOT NULL,
ADD COLUMN     "shippingMethod" "ShippingMethod" NOT NULL;
