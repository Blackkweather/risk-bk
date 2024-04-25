/*
  Warnings:

  - You are about to drop the column `clientName` on the `ClientProfile` table. All the data in the column will be lost.
  - Added the required column `denomination` to the `ClientProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `judicial` to the `ClientProfile` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sector` to the `ClientProfile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ClientProfile" DROP COLUMN "clientName",
ADD COLUMN     "denomination" TEXT NOT NULL,
ADD COLUMN     "judicial" TEXT NOT NULL,
ADD COLUMN     "sector" TEXT NOT NULL;
