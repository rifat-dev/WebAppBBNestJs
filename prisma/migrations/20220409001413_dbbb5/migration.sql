/*
  Warnings:

  - Added the required column `date_end` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date_start` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Accommodation" ADD COLUMN     "calendar_rental" JSONB,
ADD COLUMN     "max_child" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "max_guests" SET DEFAULT 1;

-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "date_end" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "date_start" TIMESTAMP(3) NOT NULL;
