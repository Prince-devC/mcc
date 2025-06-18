-- CreateTable
CREATE TABLE `Settings` (
    `id` VARCHAR(191) NOT NULL DEFAULT '1',
    `siteName` VARCHAR(191) NOT NULL,
    `siteDescription` VARCHAR(191) NOT NULL,
    `logo` VARCHAR(191) NOT NULL,
    `favicon` VARCHAR(191) NOT NULL,
    `primaryColor` VARCHAR(191) NOT NULL,
    `secondaryColor` VARCHAR(191) NOT NULL,
    `accentColor` VARCHAR(191) NOT NULL,
    `paymentMethods` JSON NOT NULL,
    `stripePublicKey` VARCHAR(191) NULL,
    `stripeSecretKey` VARCHAR(191) NULL,
    `paypalClientId` VARCHAR(191) NULL,
    `paypalSecret` VARCHAR(191) NULL,
    `metaTitle` VARCHAR(191) NOT NULL,
    `metaDescription` VARCHAR(191) NOT NULL,
    `metaKeywords` VARCHAR(191) NOT NULL,
    `metaImage` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `SecuritySettings` (
    `id` VARCHAR(191) NOT NULL DEFAULT '1',
    `twoFactorAuth` BOOLEAN NOT NULL DEFAULT false,
    `sessionTimeout` INTEGER NOT NULL DEFAULT 30,
    `passwordExpiry` INTEGER NOT NULL DEFAULT 90,
    `maxLoginAttempts` INTEGER NOT NULL DEFAULT 5,
    `lockoutDuration` INTEGER NOT NULL DEFAULT 15,
    `allowedIPs` JSON NOT NULL,
    `sslEnabled` BOOLEAN NOT NULL DEFAULT true,
    `backupEnabled` BOOLEAN NOT NULL DEFAULT true,
    `backupFrequency` VARCHAR(191) NOT NULL DEFAULT 'daily',
    `backupRetention` INTEGER NOT NULL DEFAULT 30,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
