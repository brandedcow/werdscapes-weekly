"use server";

import { prisma } from "@/lib/db";

export default async function getTeamById(id: string) {
  try {
    const team = await prisma.team.findFirst({
      where: { id },
      include: {
        teamTournaments: true,
      },
    });

    return { success: true, data: team };
  } catch (error) {
    console.warn("getTeamById", JSON.stringify(error, null, 2));
    return {
      success: false,
      error: "Something went wrong fetching team info.",
    };
  }
}
