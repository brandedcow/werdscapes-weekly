import { prisma } from "@/lib/db";
import getStreaksByPlayerId from "./getStreaksByPlayerId";

export default async function getPlayerTrendsById(playerId: string) {
  try {
    const highestScore = await prisma.score.findFirst({
      where: {
        Player: {
          id: playerId,
        },
      },
      select: {
        score: true,
      },
      orderBy: {
        score: "desc",
      },
      take: 1,
    });

    const averageMonthly = await prisma.score.aggregate({
      _avg: { score: true },
      where: { Player: { id: playerId } },
      orderBy: { Tournament: { week: "desc" } },
      take: 4,
    });

    const weekStreak = await getStreaksByPlayerId(playerId);

    const playerTrends = {
      highestScore: {
        value: highestScore?.score ?? 0,
        displayName: "Highest Score",
      },
      averageMonthly: {
        value: averageMonthly._avg?.score ?? 0,
        displayName: "Avg Score (4 Wks)",
      },
      weekStreak: {
        value: weekStreak?.data ?? 0,
        displayName: "Week Streak",
      },
    };

    return { success: true, data: playerTrends };
  } catch (error) {
    console.warn("getPlayerTrendsById", JSON.stringify(error, null, 2));
    return {
      success: false,
      error: "Something went wrong fetching player trends.",
    };
  }
}
