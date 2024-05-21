"use server";

import { prisma } from "@/lib/db";

type AverageScoreResult = {
  last_month_average_score: number;
  all_time_average_score: number;
};

export default async function getAvgScoreByPlayerId(id: string) {
  try {
    const results: AverageScoreResult[] = await prisma.$queryRaw`
      with
        all_time as (
          select
            avg(score) as all_time_average_score
          from
            "Score"
            join "Player" on "Score"."playerName" = "Player".name
          where
            "Player".id = 'clw9t89zk000ce67d1a2qk185'
        ),
        last_month as (
          select
            avg(score) as last_month_average_score
          from
            "Score"
            join "Player" on "Score"."playerName" = "Player".name
            join "Tournament" on "Score"."tournamentId" = "Tournament".id
          where
            "Player".id = 'clw9t89zk000ce67d1a2qk185'
            and "Tournament".week between now() - interval '4 week' and now()
        )
        select * from all_time, last_month
    `;

    const parsed = {
      lastMonth:
        results.length !== 1 ? 0 : Number(results[0].last_month_average_score),
      allTime:
        results.length !== 1 ? 0 : Number(results[0].all_time_average_score),
    };

    return { success: true, data: parsed };
  } catch (error) {
    console.warn("getHighScoreByPlayerId", JSON.stringify(error, null, 2));
    return { success: false, error: "" };
  }
}
