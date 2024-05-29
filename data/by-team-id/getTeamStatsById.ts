"use server";

import { StatData } from "@/components/shared/stat-cards/container";
import getAvgScoreByTeamId from "./getAvgScoreByTeamId";
import getParticipationByTeamId from "./getParticipationByTeamId";
import getWinPercentByTeamId from "./getWinPercentByTeamId";
import getPointTotalByTeamId from "./getPointTotalByTeamId";

export default async function getTeamStatsById(id: string) {
  try {
    const { data: averageScore } = await getAvgScoreByTeamId(id);
    const { data: participation } = await getParticipationByTeamId(id);
    const { data: winPercent } = await getWinPercentByTeamId(id);
    const { data: pointTotal } = await getPointTotalByTeamId(id);

    const teamStats: StatData[] = [
      { displayName: "Average Score", variants: averageScore },
      { displayName: "Participation %", variants: participation },
      { displayName: "Top 5%", variants: winPercent },
      { displayName: "Total Points", variants: pointTotal },
    ];

    return { success: true, data: teamStats };
  } catch (error) {
    console.warn("getTeamStatsById");
    return { success: false };
  }
}
