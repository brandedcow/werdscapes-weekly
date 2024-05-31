/*
  Warnings:

  - You are about to drop the column `playerName` on the `TournamentScore` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "TournamentScore" DROP CONSTRAINT "TournamentScore_playerId_playerName_fkey";

-- AlterTable
ALTER TABLE "TournamentScore" DROP COLUMN "playerName",
ALTER COLUMN "individualTournamentId" DROP NOT NULL,
ALTER COLUMN "teamTournamentId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "TournamentScore" ADD CONSTRAINT "TournamentScore_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
