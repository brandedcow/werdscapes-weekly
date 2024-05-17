-- DropForeignKey
ALTER TABLE "Score" DROP CONSTRAINT "Score_tournamentId_fkey";

-- AddForeignKey
ALTER TABLE "Score" ADD CONSTRAINT "Score_tournamentId_fkey" FOREIGN KEY ("tournamentId") REFERENCES "Tournament"("id") ON DELETE CASCADE ON UPDATE CASCADE;
