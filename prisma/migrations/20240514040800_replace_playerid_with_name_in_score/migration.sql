/*
  Warnings:

  - You are about to drop the column `playerId` on the `Score` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[playerName,tournamentId]` on the table `Score` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `playerName` to the `Score` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Score" DROP CONSTRAINT "Score_playerId_fkey";

-- DropIndex
DROP INDEX "Score_playerId_tournamentId_key";

-- AlterTable
ALTER TABLE "Score" DROP COLUMN "playerId",
ADD COLUMN     "playerName" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Score_playerName_tournamentId_key" ON "Score"("playerName", "tournamentId");

-- AddForeignKey
ALTER TABLE "Score" ADD CONSTRAINT "Score_playerName_fkey" FOREIGN KEY ("playerName") REFERENCES "Player"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
