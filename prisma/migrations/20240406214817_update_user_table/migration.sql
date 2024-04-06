/*
  Warnings:

  - Added the required column `avatar` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserLanguage" AS ENUM ('EN', 'PTBR', 'FR');

-- CreateEnum
CREATE TYPE "UserTheme" AS ENUM ('LIGHT', 'DARK');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "avatar" TEXT NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "credits" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "language" "UserLanguage" NOT NULL DEFAULT 'EN',
ADD COLUMN     "theme" "UserTheme" NOT NULL DEFAULT 'LIGHT',
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;
