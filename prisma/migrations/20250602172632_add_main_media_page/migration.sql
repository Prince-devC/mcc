/*
  Warnings:

  - You are about to drop the column `mainImage` on the `RentreePourTous` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `GalleryImage` MODIFY `type` VARCHAR(191) NOT NULL DEFAULT 'image';

-- AlterTable
ALTER TABLE `RentreePourTous` MODIFY `description` TEXT NOT NULL,
    MODIFY `fundingGoal` INTEGER NOT NULL,
    MODIFY `fundsRaised` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `MainMedia` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `imageUrl` VARCHAR(191) NULL,
    `youtubeUrl` VARCHAR(191) NULL,
    `alt` VARCHAR(191) NOT NULL,
    `rentreePourTousId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `MainMedia_rentreePourTousId_key`(`rentreePourTousId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `MainMedia` ADD CONSTRAINT `MainMedia_rentreePourTousId_fkey` FOREIGN KEY (`rentreePourTousId`) REFERENCES `RentreePourTous`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- Migrate existing data
INSERT INTO `MainMedia` (`id`, `createdAt`, `updatedAt`, `type`, `imageUrl`, `alt`, `rentreePourTousId`)
SELECT 
    UUID(),
    NOW(),
    NOW(),
    'image',
    `mainImage`,
    'Image principale du projet',
    `id`
FROM `RentreePourTous`
WHERE `mainImage` IS NOT NULL;

-- DropColumn
ALTER TABLE `RentreePourTous` DROP COLUMN `mainImage`;
