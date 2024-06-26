"use server";

import { prisma } from "@/lib/db";

export default async function getScoresByTournamentId(tournamentId: string) {
  try {
    const scores = await prisma.tournamentScore.findMany({
      where: { teamTournamentId: tournamentId },
      include: { Player: true },
      orderBy: {
        score: "desc",
      },
    });
    const scoreTotal = scores.reduce((acc, curr) => acc + curr.score, 0);
    const data = { scores, scoreTotal };
    return { success: true, data };
  } catch (error) {
    console.warn("getScoresByTournamentId", JSON.stringify(error, null, 2));
    return { success: false, error: "Something went wrong finding scores." };
  }
}
