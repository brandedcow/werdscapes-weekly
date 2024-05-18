"use server";

import { prisma } from "@/lib/db";

type StreakTableRow = {
  playerName: string;
  week: Date;
  player_id: string;
  streak_count: number;
};

export default async function getStreaksByPlayerId(playerId: string) {
  try {
    const result: StreakTableRow[] = await prisma.$queryRaw`
      with
        player_week_activity as (
          select
            "Score"."playerName",
            week,
            "Player".id as player_id
          from
            "Score"
            inner join "Tournament" on "Tournament".id = "Score"."tournamentId"
            inner join "Player" on "Player".name = "Score"."playerName"
          where
            "Score".score <> 0
          order by
            week asc
          
        ),
        with_previous_week as (
          select
            *,
            lag(week) over (partition by "playerName" order by week asc) as prevWeek
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
            sum(streak_changed) over (partition by "playerName" order by week asc) as streak_count
          from 
            streak_change
        )
      select
        "playerName",
        week,
        player_id,
        streak_count
      from 
        streak_identified
      where
        player_id = ${playerId}
      order by week desc
      limit 1
    `;

    const data = Number(result[0].streak_count);

    return { success: true, data };
  } catch (error) {
    console.warn("getStreaksByPlayerId", JSON.stringify(error, null, 2));
    return { success: false, error: "Something went wrong fetching streaks." };
  }
}
