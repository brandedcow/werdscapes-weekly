"use server";

import { prisma } from "@/lib/db";

export default async function getScoresByTournamentId(tournamentId: string) {
  try {
    const scores = await prisma.score.findMany({
      where: { tournamentId },
      include: { Player: true },
      orderBy: {
        score: "desc",
      },
    });
    const scoreTotal = scores.reduce((acc, curr) => acc + curr.score, 0);
    const data = { scores, scoreTotal };
    return { success: true, data };
  } catch (error) {
    console.log("getScoresByTournamentId", JSON.stringify(error, null, 2));
    return { success: false, error: "Something went wrong finding scores." };
  }
}
