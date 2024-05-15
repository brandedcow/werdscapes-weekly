"use server";

import { editTournamentFormValues } from "@/components/shared/edit-tournament-card/edit-tournament-form";
import { prisma } from "@/lib/db";
import { format } from "date-fns";

export const updateTournament = async (
  values: editTournamentFormValues & { id: string }
) => {
  try {
    const { id, teamName, week, scores } = values;

    const scoreTotal = scores.reduce(
      (acc, { score }) => acc + parseInt(score),
      0
    );

    const tournament = await prisma.tournament.update({
      where: { id },
      data: {
        week,
        scoreTotal,
        Team: {
          update: { name: teamName },
        },
        scores: {
          update: scores.map(({ id, score, playerName }) => ({
            where: { id },
            data: { playerName, score: parseInt(score) },
          })),
        },
      },
    });

    const message = `Updated ${teamName}'s team ${format(
      tournament.week,
      "MMM d, y"
    )} tournament.`;
    return { success: true, data: message };
  } catch (error) {
    console.error("updateTournament", error);
    return { success: false, error };
  }
};
