"use server";

import { prisma } from "@/lib/db";

export default async function getTeamById(id: string) {
  try {
    const team = await prisma.team.findFirst({
      where: { id },
      include: {
        players: true,
        tournaments: true,
      },
    });

    return { success: true, data: null };
  } catch (error) {
    console.warn("getTeamById", JSON.stringify(error, null, 2));
    return {
      success: false,
      error: "Something went wrong fetching team info.",
    };
  }
}
