/*
  Warnings:

  - You are about to drop the column `intro_photo` on the `Accommodation` table. All the data in the column will be lost.
  - You are about to drop the column `photo` on the `Accommodation` table. All the data in the column will be lost.
  - You are about to drop the column `profile_photo` on the `Host` table. All the data in the column will be lost.
  - You are about to drop the column `profile_photo` on the `Tenant` table. All the data in the column will be lost.
  - Added the required column `password` to the `Host` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Staff` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Tenant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Accommodation" DROP COLUMN "intro_photo",
DROP COLUMN "photo";

-- AlterTable
ALTER TABLE "Host" DROP COLUMN "profile_photo",
ADD COLUMN     "password" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Staff" ADD COLUMN     "password" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Tenant" DROP COLUMN "profile_photo",
ADD COLUMN     "password" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Image" (
    "id" SERIAL NOT NULL,
    "data" BYTEA NOT NULL,
    "description" TEXT,
    "accommodation_id" INTEGER,
    "host_id" INTEGER,
    "tenant_id" INTEGER,

    CONSTRAINT "Image_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "Tenant"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_host_id_fkey" FOREIGN KEY ("host_id") REFERENCES "Host"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Image" ADD CONSTRAINT "Image_accommodation_id_fkey" FOREIGN KEY ("accommodation_id") REFERENCES "Accommodation"("id") ON DELETE SET NULL ON UPDATE CASCADE;
