import { StatData } from "@/components/shared/stat-cards/container";
import getHighScoreByPlayerId from "./getHighScoreByPlayerId";
import getAvgScoreByPlayerId from "./getAvgScoreByPlayerId";
import getWeekStreakByPlayerId from "./getWeekStreakByPlayerId";

export default async function getPlayerTrendsById(id: string) {
  try {
    const { data: highestScore } = await getHighScoreByPlayerId(id);
    const { data: averageMonthly } = await getAvgScoreByPlayerId(id);
    const { data: weekStreak } = await getWeekStreakByPlayerId(id);

    const playerTrends: StatData[] = [
      {
        displayName: "Highest Score",
        type: "number",
        timeframes: highestScore,
      },
      {
        displayName: "Average Score",
        type: "number",
        timeframes: averageMonthly,
      },
      {
        displayName: "Week Streak",
        type: "number",
        timeframes: weekStreak,
      },
    ];

    return { success: true, data: playerTrends };
  } catch (error) {
    console.warn("getPlayerTrendsById", JSON.stringify(error, null, 2));
    return {
      success: false,
      error: "Something went wrong fetching player trends.",
    };
  }
}
