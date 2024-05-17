"use server";

import { editScoresFormValues } from "@/components/shared/edit-tournament-card/edit-scores-form";
import { prisma } from "@/lib/db";

export async function updateScores(
  values: editScoresFormValues & { tournamentId: string; teamId: string }
) {
  try {
    const { tournamentId, teamId, scores } = values;

    // Upsert any players that do no exist
    await prisma.$transaction(
      scores.map(({ playerName }) =>
        prisma.player.upsert({
          where: {
            name: playerName,
          },
          create: { name: playerName, teamId },
          update: {},
        })
      )
    );

    // Delete all scores
    await prisma.score.deleteMany({
      where: { tournamentId },
    });

    // Bulk create scores
    const { count } = await prisma.score.createMany({
      data: scores.map(({ playerName, score }) => ({
        score,
        playerName,
        tournamentId,
      })),
      skipDuplicates: true,
    });

    // Update tournament score total
    const scoreTotal = scores.reduce(
      (acc, curr) => acc + parseInt(curr.score),
      0
    );
    await prisma.tournament.update({
      where: { id: tournamentId },
      data: {
        scoreTotal,
      },
    });

    const message = `Updated ${count} scores`;
    return { success: true, data: message };
  } catch (error) {
    console.log("updateScores", JSON.stringify(error, null, 2));
    return { success: false, error: "Something went wrong updating scores." };
  }
}
