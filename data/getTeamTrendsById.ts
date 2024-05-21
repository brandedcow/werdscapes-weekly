"use server";

import { prisma } from "@/lib/db";
import { startOfDay, subMonths } from "date-fns";
import getActivePlayerRatio from "./getActivePlayerRatio";

export default async function getTeamTrendsById(id: string) {
  try {
    const team = await prisma.team.findFirst({ where: { id } });

    if (!team) throw new Error("No team found.");

    const averageTotalScoreData = await prisma.tournament.aggregate({
      _avg: { scoreTotal: true },
      where: {
        teamName: team.name,
        week: {
          gte: subMonths(startOfDay(new Date()), 1).toISOString(),
        },
      },
    });

    const topFives = await prisma.tournament.count({
      where: {
        Team: { id },
        place: {
          lte: 5,
        },
      },
    });

    const { data, error } = await getActivePlayerRatio(team.name);
    if (!data) throw new Error(error);
    const averageMonthlyActiveRatio =
      data.reduce((acc, curr) => {
        return acc + Number(curr.active_percent);
      }, 0) / data.length;

    const tournaments = await prisma.tournament.aggregate({
      _sum: {
        scoreTotal: true,
      },
      _count: true,
      where: { Team: { id } },
    });

    const teamTrends = {
      averageTotalScore: {
        value: Number(averageTotalScoreData._avg.scoreTotal),
        displayName: "Avg Total Stars (Last 4Wks)",
      },
      activePlayerRatio: {
        value: `${averageMonthlyActiveRatio}%`,
        displayName: "Roster Active% (Last 4Wks)",
      },
      topFivePercentage: {
        value: `${(topFives / tournaments._count) * 100}%`,
        displayName: "Top 5% (All Time)",
      },
      totalAllTime: {
        value: tournaments._sum.scoreTotal,
        displayName: "Total Stars (All Time)",
      },
    };

    return { success: true, data: teamTrends };
  } catch (error) {
    console.log("getTeamTrendsById", JSON.stringify(error, null, 2));
    return {
      success: false,
      error: "Something went wrong fetching team trends.",
    };
  }
}
