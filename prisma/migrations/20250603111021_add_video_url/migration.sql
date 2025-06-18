/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `GalleryImage` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `MainMedia` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `GalleryImage` DROP FOREIGN KEY `GalleryImage_rentreePourTousId_fkey`;

-- DropForeignKey
ALTER TABLE `MainMedia` DROP FOREIGN KEY `MainMedia_rentreePourTousId_fkey`;

-- AlterTable
ALTER TABLE `GalleryImage` DROP COLUMN `updatedAt`,
    ADD COLUMN `videoUrl` VARCHAR(191) NULL,
    MODIFY `alt` VARCHAR(191) NULL,
    MODIFY `rentreePourTousId` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `MainMedia` DROP COLUMN `updatedAt`,
    ADD COLUMN `videoUrl` VARCHAR(191) NULL,
    MODIFY `alt` VARCHAR(191) NULL,
    MODIFY `rentreePourTousId` VARCHAR(191) NULL;

-- AddForeignKey
ALTER TABLE `MainMedia` ADD CONSTRAINT `MainMedia_rentreePourTousId_fkey` FOREIGN KEY (`rentreePourTousId`) REFERENCES `RentreePourTous`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GalleryImage` ADD CONSTRAINT `GalleryImage_rentreePourTousId_fkey` FOREIGN KEY (`rentreePourTousId`) REFERENCES `RentreePourTous`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
