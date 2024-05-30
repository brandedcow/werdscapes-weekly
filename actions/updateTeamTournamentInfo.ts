"use server";

import { editTeamTournamentInfoFormValues } from "@/components/shared/forms/edit-team-tournament-info-form";
import { prisma } from "@/lib/db";
import { format } from "date-fns";

export const updateTeamTournamentInfo = async (
  values: editTeamTournamentInfoFormValues & { id: string }
) => {
  try {
    const { id, place, week } = values;

    const tournament = await prisma.teamTournament.update({
      where: { id },
      data: {
        place,
        week,
      },
      include: {
        Team: true,
      },
    });

    const message = `Updated ${tournament.Team.name}'s team ${format(
      tournament.week,
      "MMM d, y"
    )} tournament.`;

    return { success: true, data: message };
  } catch (error) {
    console.warn("updateTeamTournamentInfo", JSON.stringify(error, null, 2));
    return {
      success: false,
      error: "Something went wrong updating the tournament.",
    };
  }
};
