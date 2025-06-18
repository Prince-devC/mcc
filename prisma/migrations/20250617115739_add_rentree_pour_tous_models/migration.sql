/*
  Warnings:

  - You are about to drop the column `title` on the `Media` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `Media` table. All the data in the column will be lost.
  - You are about to drop the column `budget` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `category` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `endDate` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `objectives` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `partners` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `results` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `subtitle` on the `Project` table. All the data in the column will be lost.
  - You are about to alter the column `fundingGoal` on the `RentreePourTous` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `fundsRaised` on the `RentreePourTous` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to drop the `GalleryImage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MainMedia` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[rentreePourTousId]` on the table `Media` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `alt` to the `Media` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rentreePourTousId` to the `Media` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `RentreePourTous` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `RentreePourTous` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `GalleryImage` DROP FOREIGN KEY `GalleryImage_rentreePourTousId_fkey`;

-- DropForeignKey
ALTER TABLE `MainMedia` DROP FOREIGN KEY `MainMedia_rentreePourTousId_fkey`;

-- AlterTable
ALTER TABLE `Media` DROP COLUMN `title`,
    DROP COLUMN `url`,
    ADD COLUMN `alt` VARCHAR(191) NOT NULL,
    ADD COLUMN `imageUrl` VARCHAR(191) NULL,
    ADD COLUMN `rentreePourTousId` VARCHAR(191) NOT NULL,
    ADD COLUMN `videoUrl` VARCHAR(191) NULL,
    ADD COLUMN `youtubeUrl` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `Project` DROP COLUMN `budget`,
    DROP COLUMN `category`,
    DROP COLUMN `endDate`,
    DROP COLUMN `location`,
    DROP COLUMN `objectives`,
    DROP COLUMN `partners`,
    DROP COLUMN `results`,
    DROP COLUMN `startDate`,
    DROP COLUMN `status`,
    DROP COLUMN `subtitle`;

-- AlterTable
ALTER TABLE `RentreePourTous` ADD COLUMN `date` DATETIME(3) NOT NULL,
    ADD COLUMN `location` VARCHAR(191) NOT NULL,
    ADD COLUMN `participants` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `status` VARCHAR(191) NOT NULL DEFAULT 'upcoming',
    MODIFY `fundingGoal` DOUBLE NOT NULL,
    MODIFY `fundsRaised` DOUBLE NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE `GalleryImage`;

-- DropTable
DROP TABLE `MainMedia`;

-- CreateTable
CREATE TABLE `Gallery` (
    `id` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `imageUrl` VARCHAR(191) NULL,
    `youtubeUrl` VARCHAR(191) NULL,
    `videoUrl` VARCHAR(191) NULL,
    `alt` VARCHAR(191) NOT NULL,
    `rentreePourTousId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Media_rentreePourTousId_key` ON `Media`(`rentreePourTousId`);

-- AddForeignKey
ALTER TABLE `Media` ADD CONSTRAINT `Media_rentreePourTousId_fkey` FOREIGN KEY (`rentreePourTousId`) REFERENCES `RentreePourTous`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Gallery` ADD CONSTRAINT `Gallery_rentreePourTousId_fkey` FOREIGN KEY (`rentreePourTousId`) REFERENCES `RentreePourTous`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
