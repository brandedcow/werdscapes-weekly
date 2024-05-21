"use server";

import { prisma } from "@/lib/db";

type AvgScoreResult = {
  all_time_average_score: number;
  last_month_average_score: number;
};

export default async function getAvgScoreByTeamId(teamId: string) {
  try {
    const results: AvgScoreResult[] = await prisma.$queryRaw`
      with 
        all_time as (
          select
            avg("scoreTotal") as all_time_average_score
          from "Tournament" 
            join "Team" on "teamName" = "Team".name
          where 
            "Team".id = ${teamId}
        ),
        last_month as (
          select avg("scoreTotal") as last_month_average_score
          from "Tournament"
            join "Team" on "teamName" = "Team".name
          where "Team".id = ${teamId}
            and week between now() - interval '4 week' and now()
        )
        select * from last_month, all_time
    `;

    const parsed = {
      lastMonth:
        results.length != 1 ? 0 : Number(results[0].last_month_average_score),
      allTime:
        results.length != 1 ? 0 : Number(results[0].all_time_average_score),
    };
    return { success: true, data: parsed };
  } catch (error) {
    console.warn("getAvgScoreByTeamId", error);
    return { success: false, error: "" };
  }
}
