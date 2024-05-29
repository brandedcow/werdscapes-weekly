"use server";

import { prisma } from "@/lib/db";

export default async function getTournamentScoresByPlayerId(id: string) {
  try {
    const data = await prisma.tournamentScore.findMany({
      where: { playerId: id },
      include: {
        TeamTournament: true,
        Player: true,
      },
    });

    return { success: true, data };
  } catch (error) {
    console.warn("getTournamentScoresByPlayerId");
    return { success: false };
  }
}
