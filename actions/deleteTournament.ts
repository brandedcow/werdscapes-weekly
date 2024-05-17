"use server";

import { prisma } from "@/lib/db";
import { format } from "date-fns";

export async function deleteTournament(id: string) {
  try {
    const deletedTournament = await prisma.tournament.delete({
      where: { id },
    });

    const { week, teamName } = deletedTournament;

    let message = `Deleted tournament for ${teamName} on ${format(
      week,
      "MMM d, y"
    )}`;
    return { success: true, data: message };
  } catch (error) {
    console.log("deleteTournament", JSON.stringify(error, null, 2));
    return {
      success: false,
      error: "Something went wrong deleting the tournament.",
    };
  }
}
