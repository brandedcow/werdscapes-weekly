"use server";

import { editTeamTournamentScoresFormValues } from "@/components/shared/forms/edit-team-tournament-scores";
import { prisma } from "@/lib/db";

export default async function updateTeamTournamentScores(
  values: editTeamTournamentScoresFormValues & {
    tournamentId: string;
    teamId: string;
  }
) {
  try {
    const { tournamentId, teamId, scores } = values;

    // Upsert players that do not exist
    const updatedScores = await prisma.$transaction(
      async (tx) => {
        let scoresWithPlayerId: {
          playerId: string;
          name: string;
          score: number;
        }[] = [];

        for (const item of scores) {
          const { name, playerId, score } = item;
          const player = await tx.player.upsert({
            where: {
              id: playerId,
            },
            create: {
              name,
              teamId,
            },
            update: {
              name,
            },
          });

          scoresWithPlayerId.push({
            playerId: player.id,
            name,
            score,
          });
        }

        return scoresWithPlayerId;
      },
      {
        timeout: 20000,
      }
    );

    // Delete all scores
    await prisma.tournamentScore.deleteMany({
      where: { teamTournamentId: tournamentId },
    });

    // Bulk create scores
    const { count } = await prisma.tournamentScore.createMany({
      data: updatedScores.map(({ playerId, score }) => ({
        score,
        playerId,
        teamTournamentId: tournamentId,
      })),
      skipDuplicates: true,
    });

    // Update tournament score total
    const scoreTotal = updatedScores.reduce((acc, curr) => acc + curr.score, 0);
    await prisma.teamTournament.update({
      where: { id: tournamentId },
      data: {
        scoreTotal,
      },
    });

    const message = `Updated ${count} scores`;

    return { success: true, data: message };
  } catch (error) {
    console.warn("updateTeamTournamentScores");
    return {
      success: false,
      error: "Something went wrong updating the tournament scores.",
    };
  }
}
