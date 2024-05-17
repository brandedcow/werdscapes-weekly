"use server";

import { editTournamentFormValues } from "@/components/shared/edit-tournament-card/edit-tournament-form";
import { prisma } from "@/lib/db";
import { format, startOfDay } from "date-fns";

export const updateTournament = async (
  values: editTournamentFormValues & { id: string }
) => {
  const { id, teamName, week, scores, place } = values;
  const scoreTotal = scores.reduce(
    (acc, { score }) => acc + parseInt(score),
    0
  );

  try {
    const tournament = await prisma.tournament.update({
      where: { id },
      data: {
        place,
        week,
        scoreTotal,
        teamName,
        scores: {
          upsert: scores.map(({ score, playerName }) => ({
            where: {
              playerName_tournamentId: {
                playerName,
                tournamentId: id,
              },
            },
            create: { playerName, score: parseInt(score) },
            update: { score: parseInt(score) },
          })),
        },
      },
    });

    const message = `Updated ${teamName}'s team ${format(
      tournament.week,
      "MMM d, y"
    )} tournament.`;
    return { success: true, data: message };
  } catch (error: any) {
    console.error("updateTournament", JSON.stringify(error, null, 2));

    let errorMessage = "";

    if (error.code === "P2002") {
      errorMessage = `A tournament for ${teamName} on ${format(
        new Date(week),
        "MMM d, y"
      )} already exists.`;
    }

    return { success: false, error: errorMessage };
  }
};
