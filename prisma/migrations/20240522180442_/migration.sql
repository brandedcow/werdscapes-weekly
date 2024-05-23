/*
  Warnings:

  - You are about to drop the column `playerName` on the `Score` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[playerId,tournamentId]` on the table `Score` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `playerId` to the `Score` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Score" DROP CONSTRAINT "Score_playerName_fkey";

-- DropIndex
DROP INDEX "Player_name_key";

-- DropIndex
DROP INDEX "Score_playerName_tournamentId_key";

-- AlterTable
ALTER TABLE "Player" ADD COLUMN     "isCurrentTeam" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Score" DROP COLUMN "playerName",
ADD COLUMN     "playerId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Score_playerId_tournamentId_key" ON "Score"("playerId", "tournamentId");

-- AddForeignKey
ALTER TABLE "Score" ADD CONSTRAINT "Score_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
