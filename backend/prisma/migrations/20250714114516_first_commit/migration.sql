-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(191) NOT NULL DEFAULT '',
    `name` VARCHAR(191) NOT NULL DEFAULT '',
    `email` VARCHAR(191) NOT NULL DEFAULT '',
    `password` VARCHAR(191) NOT NULL DEFAULT '',
    `profile_picture` VARCHAR(191) NOT NULL DEFAULT '',
    `role` ENUM('MANAGER', 'USER') NOT NULL DEFAULT 'USER',
    `alamat` VARCHAR(191) NOT NULL DEFAULT '',
    `telephone` VARCHAR(191) NOT NULL DEFAULT '',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_uuid_key`(`uuid`),
    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL DEFAULT '',
    `price` INTEGER NOT NULL DEFAULT 0,
    `mainCategory` ENUM('WANITA', 'PRIA', 'ANAK', 'SEPATU', 'TAS', 'SPORTS') NOT NULL,
    `subCategory` ENUM('BLOUSE', 'DRESS', 'ROK', 'TUNIK', 'OUTER', 'HIJAB', 'SETELAN_FORMAL', 'KAOS', 'KEMEJA', 'CELANA', 'JAKET', 'BATIK', 'SWEATER', 'BAJU_ANAK', 'SETELAN_ANAK', 'KAOS_ANAK', 'CELANA_ANAK', 'SEPATU_PRIA', 'SEPATU_WANITA', 'SNEAKERS', 'SEPATU_ANAK', 'SEPATU_OLAHRAGA', 'TAS_PRIA', 'TAS_WANITA', 'RANSEL', 'SELEMPANG', 'JERSEY', 'TRAINING', 'LEGGING', 'SPORT_BRA', 'CELANA_OLAHRAGA') NOT NULL,
    `picture` VARCHAR(191) NOT NULL DEFAULT '',
    `description` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Product_uuid_key`(`uuid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Order` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(191) NOT NULL DEFAULT '',
    `customer` VARCHAR(191) NOT NULL DEFAULT '',
    `total_price` INTEGER NOT NULL DEFAULT 0,
    `payment_method` ENUM('CASH', 'QRIS', 'BANK') NOT NULL DEFAULT 'CASH',
    `alamat` VARCHAR(191) NOT NULL DEFAULT '',
    `status` ENUM('NEW', 'PAID', 'DONE') NOT NULL DEFAULT 'NEW',
    `size` ENUM('XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL') NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `userId` INTEGER NULL,

    UNIQUE INDEX `Order_uuid_key`(`uuid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `OrderList` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `uuid` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL DEFAULT 0,
    `note` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `productId` INTEGER NULL,
    `orderId` INTEGER NULL,

    UNIQUE INDEX `OrderList_uuid_key`(`uuid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderList` ADD CONSTRAINT `OrderList_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderList` ADD CONSTRAINT `OrderList_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
