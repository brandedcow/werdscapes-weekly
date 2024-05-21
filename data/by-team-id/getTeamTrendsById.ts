"use server";

import getPointTotalByTeamId from "./getPointTotalByTeamId";
import { StatData } from "@/components/shared/stat-cards/container";
import getWinPercentByTeamId from "./getWinPercentByTeamId";
import getAvgScoreByTeamId from "./getAvgScoreByTeamId";
import getParticipationByTeamId from "./getParticipationByTeamId";

export default async function getTeamTrendsById(id: string) {
  try {
    const { data: avgTotalScore } = await getAvgScoreByTeamId(id);
    const { data: participation } = await getParticipationByTeamId(id);
    const { data: topFives } = await getWinPercentByTeamId(id);
    const { data: totalStars } = await getPointTotalByTeamId(id);

    const teamTrends: StatData[] = [
      {
        displayName: "Avg Total Score",
        type: "number",
        timeframes: avgTotalScore,
      },
      {
        displayName: "Participation%",
        type: "percent",
        timeframes: participation,
      },
      {
        displayName: "Top 5%",
        type: "percent",
        timeframes: topFives,
      },
      {
        displayName: "Total Stars",
        type: "number",
        timeframes: totalStars,
      },
    ];

    return { success: true, data: teamTrends };
  } catch (error) {
    console.warn("getTeamTrendsById", JSON.stringify(error, null, 2));
    return {
      success: false,
      error: "Something went wrong fetching team trends.",
    };
  }
}
