/*
  Warnings:

  - A unique constraint covering the columns `[teamId,week,type]` on the table `Tournament` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Tournament_week_key";

-- CreateIndex
CREATE UNIQUE INDEX "Tournament_teamId_week_type_key" ON "Tournament"("teamId", "week", "type");
