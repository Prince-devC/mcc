/*
  Warnings:

  - A unique constraint covering the columns `[projectId]` on the table `RentreePourTous` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `RentreePourTous` ADD COLUMN `projectId` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `RentreePourTous_projectId_key` ON `RentreePourTous`(`projectId`);

-- AddForeignKey
ALTER TABLE `RentreePourTous` ADD CONSTRAINT `RentreePourTous_projectId_fkey` FOREIGN KEY (`projectId`) REFERENCES `Project`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
