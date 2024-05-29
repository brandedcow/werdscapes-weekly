"use server";

import { StatData } from "@/components/shared/stat-cards/container";
import getHighScoreByPlayerId from "./getHighScoreByPlayerId";
import getAvgScoreByPlayerId from "./getAvgScoreByPlayerId";
import getWeekStreakByPlayerId from "./getWeekStreakByPlayerId";
import getPOintTotalByPlayerId from "./getPointTotalByPlayerId";

export default async function getPlayerStatsById(id: string) {
  try {
    const { data: highScore } = await getHighScoreByPlayerId(id);
    const { data: averageScore } = await getAvgScoreByPlayerId(id);
    const { data: weekStreak } = await getWeekStreakByPlayerId(id);
    const { data: pointTotal } = await getPOintTotalByPlayerId(id);

    const playerStats: StatData[] = [
      { displayName: "Highest Score", variants: highScore },
      { displayName: "Average Score", variants: averageScore },
      { displayName: "Week Streak", variants: weekStreak },
      { displayName: "Total Points", variants: pointTotal },
    ];

    return { success: true, data: playerStats };
  } catch (error) {
    console.warn("getPlayerStatsById");
    return { success: false };
  }
}
