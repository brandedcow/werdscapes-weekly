"use server";

import { prisma } from "@/lib/db";
import { format } from "date-fns";

export async function deleteTeamTournament(id: string) {
  try {
    const deletedTournament = await prisma.teamTournament.delete({
      where: { id },
      include: {
        Team: true,
      },
    });

    const { week, Team } = deletedTournament;

    let message = `Deleted tournament for ${Team.name} on ${format(
      week,
      "MMM d, y"
    )}`;
    return { success: true, data: message };
  } catch (error) {
    console.warn("deleteTeamTournament", JSON.stringify(error, null, 2));
    return {
      success: false,
      error: "Something went wrong deleting the tournament.",
    };
  }
}
