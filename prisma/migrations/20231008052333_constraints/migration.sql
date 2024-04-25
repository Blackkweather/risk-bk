/*
  Warnings:

  - A unique constraint covering the columns `[projectId,name]` on the table `PerformanceIndicator` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[riskId,name]` on the table `RiskControl` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[projectId,name]` on the table `StrategicObjectif` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "PerformanceIndicator_projectId_name_key" ON "PerformanceIndicator"("projectId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "RiskControl_riskId_name_key" ON "RiskControl"("riskId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "StrategicObjectif_projectId_name_key" ON "StrategicObjectif"("projectId", "name");
