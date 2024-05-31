"use server";

import { prisma } from "@/lib/db";

type WeekStreakResult = {
  streak_count: number;
};

export default async function getWeekStreakByPlayerId(id: string) {
  try {
    const results: WeekStreakResult[] = await prisma.$queryRaw`
      with
        player_week_activity as (
          select
            "TournamentScore"."playerId",
            week,
            "Player".id as player_id
          from
            "TournamentScore"
            inner join "TeamTournament" on "TeamTournament".id = "TournamentScore"."teamTournamentId"
            inner join "Player" on "Player".id = "TournamentScore"."playerId"
          where
            "TournamentScore".score <> 0
          order by
            week asc
          
        ),
        with_previous_week as (
          select
            *,
            lag(week) over (partition by "playerId" order by week asc) as prevWeek
          from 
            player_week_activity
        ),
        streak_change as (
          select
            *,
            prevWeek,
            case when prevWeek is null then 0 else 1 end as streak_changed
          from 
            with_previous_week
        ),
        streak_identified as (
          select
            *,
            sum(streak_changed) over (partition by "playerId" order by week asc) as streak_count
          from 
            streak_change
        )
      select
        "playerId",
        week,
        player_id,
        streak_count
      from 
        streak_identified
      where
        player_id = ${id}
      order by week desc
      limit 1
    `;

    const parsed = {
      current: results.length !== 1 ? 0 : Number(results[0].streak_count),
    };

    return { success: true, data: parsed };
  } catch (error) {
    console.warn("getHighScoreByPlayerId", JSON.stringify(error, null, 2));
    return { success: false, error: "" };
  }
}
