/*
  Warnings:

  - You are about to drop the column `proposedSolution` on the `RiskControl` table. All the data in the column will be lost.
  - You are about to drop the column `proposedSolutionDescription` on the `RiskControl` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "RiskControl" DROP COLUMN "proposedSolution",
DROP COLUMN "proposedSolutionDescription",
ADD COLUMN     "proposedControl" TEXT,
ADD COLUMN     "proposedControlDescription" TEXT;
