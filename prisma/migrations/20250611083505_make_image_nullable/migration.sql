/*
  Warnings:

  - Made the column `title` on table `HomeGallery` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `HomeGallery` MODIFY `title` VARCHAR(191) NOT NULL;
