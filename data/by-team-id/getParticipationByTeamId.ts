"use server";

import { prisma } from "@/lib/db";

type ParticipationPercentageResult = {
  participation_all_time: number;
  participation_last_month: number;
};

export default async function getParticipationByTeamId(teamId: string) {
  try {
    const results: ParticipationPercentageResult[] = await prisma.$queryRaw`
      with
        active_percentages as (
          select
            t.week,
            t."teamId",
            count(distinct s.id) filter (where s.score != 0) as acive_players,
            count(distinct s.id) as total_players,
            ROUND((COUNT(DISTINCT s.id) FILTER (WHERE s.score != 0) * 100.0) / COUNT(DISTINCT s.id), 2) AS active_percent
          from
            "TeamTournament" t
            join "TournamentScore" s on t.id = s."teamTournamentId"
            join "Team" on "teamId" = "Team".id 
          where
            "Team".id = ${teamId}
          group by
            t.id,
            t.week,
            t."teamId"
        ),
        all_time as (
          select
            avg(active_percent) as participation_all_time
          from active_percentages
        ),
        last_month as (
          select  
            avg(active_percent) as participation_last_month
          from active_percentages
          where week between now() - interval '4 week' and now()
        )
        select * from all_time, last_month
    `;

    const parsed = {
      lastMonth:
        results.length != 1 ? 0 : Number(results[0].participation_last_month),
      allTime:
        results.length != 1 ? 0 : Number(results[0].participation_all_time),
    };
    return { success: true, data: parsed };
  } catch (error) {
    console.warn("getAvgScoreByTeamId", error);
    return { success: false, error: "" };
  }
}
