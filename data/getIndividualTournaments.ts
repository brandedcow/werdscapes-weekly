"use server";

import { prisma } from "@/lib/db";

export default async function getIndividualTournaments(playerId?: string) {
  try {
    const data = await prisma.individualTournament.findMany({
      where: { playerId },
      orderBy: {
        week: "desc",
      },
      include: {
        Player: true,
      },
    });
    return { success: true, data };
  } catch (error) {
    console.warn("getIndividualTournaments");
    return { success: false };
  }
}
