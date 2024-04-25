/*
  Warnings:

  - You are about to drop the column `userId` on the `ClientProfile` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "ClientProfile_userId_key";

-- AlterTable
ALTER TABLE "ClientProfile" DROP COLUMN "userId";
