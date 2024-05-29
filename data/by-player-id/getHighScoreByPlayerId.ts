"use server";

import { prisma } from "@/lib/db";

type HighScoreResult = {
  last_month_high_score: number;
  all_time_high_score: number;
};

export default async function getHighScoreByPlayerId(id: string) {
  try {
    const results: HighScoreResult[] = await prisma.$queryRaw`
      with
        all_time as (
          select 
            score as all_time_high_score
          from
            "TournamentScore"
            join "Player" on "TournamentScore"."playerId" = "Player".id
          where
            "Player".id = ${id}
          order by score desc
          limit 1
        ),
        last_month as (
          select
            score as last_month_high_score
          from
            "TournamentScore"
            join "Player" on "TournamentScore"."playerId" = "Player".id
            join "TeamTournament" on "TournamentScore"."teamTournamentId" = "TeamTournament".id
          where
            "Player".id = ${id}
            and "TeamTournament".week between now() - interval '4 week' and now()
          order by score desc
          limit 1
        )
        select
          all_time_high_score,
          last_month_high_score
        from last_month, all_time
    `;

    const parsed = {
      lastMonth: results.length !== 1 ? 0 : results[0].last_month_high_score,
      allTime: results.length !== 1 ? 0 : results[0].all_time_high_score,
    };

    return { success: true, data: parsed };
  } catch (error) {
    console.warn("getHighScoreByPlayerId", JSON.stringify(error, null, 2));
    return { success: false, error: "" };
  }
}
