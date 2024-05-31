"use server";

import { prisma } from "@/lib/db";

export default async function getScoreTotalsByTournamentId(id: string) {
  try {
    const data = await prisma.tournamentScore.aggregate({
      where: { teamTournamentId: id },
      _avg: {
        score: true,
      },
      _sum: {
        score: true,
      },
    });

    const parsed = {
      score: data._sum.score,
      average: Math.round(Number(data._avg.score) * 100) / 100,
    };

    return { success: true, data: parsed };
  } catch (error) {
    console.warn("getAvgScoreByTournamentId");
    return { success: false };
  }
}
