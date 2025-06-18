/*
  Warnings:

  - Added the required column `updatedAt` to the `GalleryImage` table without a default value. This is not possible if the table is not empty.
  - Made the column `alt` on table `GalleryImage` required. This step will fail if there are existing NULL values in that column.
  - Made the column `rentreePourTousId` on table `GalleryImage` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `updatedAt` to the `MainMedia` table without a default value. This is not possible if the table is not empty.
  - Made the column `alt` on table `MainMedia` required. This step will fail if there are existing NULL values in that column.
  - Made the column `rentreePourTousId` on table `MainMedia` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `GalleryImage` DROP FOREIGN KEY `GalleryImage_rentreePourTousId_fkey`;

-- DropForeignKey
ALTER TABLE `MainMedia` DROP FOREIGN KEY `MainMedia_rentreePourTousId_fkey`;

-- AlterTable
ALTER TABLE `GalleryImage` ADD COLUMN `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `alt` VARCHAR(191) NOT NULL,
    MODIFY `rentreePourTousId` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `MainMedia` ADD COLUMN `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    MODIFY `alt` VARCHAR(191) NOT NULL,
    MODIFY `rentreePourTousId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `MainMedia` ADD CONSTRAINT `MainMedia_rentreePourTousId_fkey` FOREIGN KEY (`rentreePourTousId`) REFERENCES `RentreePourTous`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GalleryImage` ADD CONSTRAINT `GalleryImage_rentreePourTousId_fkey` FOREIGN KEY (`rentreePourTousId`) REFERENCES `RentreePourTous`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
