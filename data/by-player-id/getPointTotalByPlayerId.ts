"use server";

import { prisma } from "@/lib/db";

export default async function getPOintTotalByPlayerId(id: string) {
  try {
    const data: {
      total_all_time: number;
      total_monthly: number;
    }[] = await prisma.$queryRaw`
      select
        sum(score) as total_all_time,
        sum(
          case
            when week between now() - interval '4 week' and now() then score
            else 0
          end
        ) as total_monthly
      from
        "TournamentScore"
        join "TeamTournament" on "TeamTournament".id = "TournamentScore"."teamTournamentId"
      where
        "playerId" = ${id}
    `;

    const parsed = {
      allTime: data.length !== 1 ? 0 : Number(data[0].total_all_time),
      lastMonth: data.length !== 1 ? 0 : Number(data[0].total_monthly),
    };

    return { success: true, data: parsed };
  } catch (error) {
    console.warn("getPointTotalByTeamId");
    return { success: false };
  }
}
