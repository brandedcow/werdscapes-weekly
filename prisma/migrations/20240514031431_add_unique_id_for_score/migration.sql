/*
  Warnings:

  - A unique constraint covering the columns `[playerId,tournamentId]` on the table `Score` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Score_playerId_tournamentId_key" ON "Score"("playerId", "tournamentId");
