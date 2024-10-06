-- CreateEnum
CREATE TYPE "ProviderEnum" AS ENUM ('email', 'apple', 'facebook', 'twitter', 'google');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "provider" "ProviderEnum" NOT NULL DEFAULT 'email';
