/*
  Warnings:

  - You are about to drop the column `accommodation_id` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `host_id` on the `Image` table. All the data in the column will be lost.
  - You are about to drop the column `tenant_id` on the `Image` table. All the data in the column will be lost.
  - Added the required column `name` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_accommodation_id_fkey";

-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_host_id_fkey";

-- DropForeignKey
ALTER TABLE "Image" DROP CONSTRAINT "Image_tenant_id_fkey";

-- AlterTable
ALTER TABLE "Accommodation" ADD COLUMN     "photo" TEXT[];

-- AlterTable
ALTER TABLE "Host" ADD COLUMN     "profile_photo" TEXT[];

-- AlterTable
ALTER TABLE "Image" DROP COLUMN "accommodation_id",
DROP COLUMN "host_id",
DROP COLUMN "tenant_id",
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Review" ADD COLUMN     "images" TEXT[];

-- AlterTable
ALTER TABLE "Tenant" ADD COLUMN     "profile_photo" TEXT[];
