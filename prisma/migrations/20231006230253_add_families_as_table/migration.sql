-- AlterTable
ALTER TABLE "Risk" ADD COLUMN     "riskFamilyId" INTEGER;

-- CreateTable
CREATE TABLE "RiskFamily" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "projectId" INTEGER NOT NULL,

    CONSTRAINT "RiskFamily_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Risk" ADD CONSTRAINT "Risk_riskFamilyId_fkey" FOREIGN KEY ("riskFamilyId") REFERENCES "RiskFamily"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RiskFamily" ADD CONSTRAINT "RiskFamily_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
