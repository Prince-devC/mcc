-- DropForeignKey
ALTER TABLE `MainMedia` DROP FOREIGN KEY `MainMedia_rentreePourTousId_fkey`;

-- AddForeignKey
ALTER TABLE `MainMedia` ADD CONSTRAINT `MainMedia_rentreePourTousId_fkey` FOREIGN KEY (`rentreePourTousId`) REFERENCES `RentreePourTous`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
