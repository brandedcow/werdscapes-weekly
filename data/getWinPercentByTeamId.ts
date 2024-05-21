"use server";

import { prisma } from "@/lib/db";

type WinPercentageResult = {
  all_time_win_rate: number;
  last_month_win_rate: number;
};

export default async function getWinPercentByTeamId(teamId: string) {
  try {
    const results: WinPercentageResult[] = await prisma.$queryRaw`
      WITH 
        all_tournaments AS (
          SELECT 
            sum(
              case
                when "Tournament".place between 1 and 5 then 1
                else 0
              end
            ) as total_tournament_wins,
            COUNT(*) AS total_tournament_count,
            sum(
              case
                when "Tournament".place between 1 and 5
                  and "Tournament".week between now() - interval '4 week' and now() then 1
                else 0
              end
            ) as last_month_wins,
            sum(
              case
                when "Tournament".week between now() - interval '4 week' and now() then 1
                else 0
              end
            ) as last_month_tournament_count
          FROM "Tournament"
            join "Team" on "teamName" = "Team".name
          where "Team".id = ${teamId}
        )
        SELECT
          100.0 * total_tournament_wins / total_tournament_count  as all_time_win_rate,
          100.0 * last_month_wins / last_month_tournament_count as last_month_win_rate
        FROM  all_tournaments;
    `;

    console.log(results);

    const parsed = {
      lastMonth:
        results.length !== 1 ? 0 : Number(results[0].last_month_win_rate),
      allTime: results.length !== 1 ? 0 : Number(results[0].all_time_win_rate),
    };

    return { success: true, data: parsed };
  } catch (error) {
    console.warn("getWinPercentByTeamId", JSON.stringify(error, null, 2));
    return { success: false, error: "" };
  }
}
