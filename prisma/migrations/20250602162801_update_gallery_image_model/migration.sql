/*
  Warnings:

  - Added the required column `type` to the `GalleryImage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `GalleryImage` ADD COLUMN `type` VARCHAR(191) NOT NULL DEFAULT 'image',
    ADD COLUMN `youtubeUrl` VARCHAR(191) NULL,
    MODIFY `imageUrl` VARCHAR(191) NULL;
