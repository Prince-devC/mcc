-- DropForeignKey
ALTER TABLE `MainMedia` DROP FOREIGN KEY `MainMedia_rentreePourTousId_fkey`;

-- AlterTable
ALTER TABLE `MainMedia` MODIFY `type` VARCHAR(191) NOT NULL DEFAULT 'image';

-- AlterTable
ALTER TABLE `RentreePourTous` MODIFY `description` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `MainMedia` ADD CONSTRAINT `MainMedia_rentreePourTousId_fkey` FOREIGN KEY (`rentreePourTousId`) REFERENCES `RentreePourTous`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
