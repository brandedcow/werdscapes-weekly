/*
  Warnings:

  - A unique constraint covering the columns `[week]` on the table `Tournament` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Tournament_week_key" ON "Tournament"("week");
