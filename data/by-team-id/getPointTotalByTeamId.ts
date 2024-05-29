"use server";

import { prisma } from "@/lib/db";

type PointTotalResult = {
  id: string;
  teamName: string;
  last_month_stars: number;
  total_stars: number;
};

export default async function getPointTotalByTeamId(teamId: string) {
  try {
    const totals: PointTotalResult[] = await prisma.$queryRaw`
      select
        sum(
          case
            when T.week between now() - interval '1 month' and now()  then T."scoreTotal"
            else 0
          end
        ) as "last_month_stars",
        sum(T."scoreTotal") as "total_stars"
      from
        "TeamTournament" T
        join "Team" on "Team".id = T."teamId"
      where
        "Team".id = ${teamId}
      order by
        "total_stars" desc;
    `;

    const results = {
      lastMonth: totals.length !== 1 ? 0 : Number(totals[0].last_month_stars),
      allTime: totals.length !== 1 ? 0 : Number(totals[0].total_stars),
    };

    return { success: true, data: results };
  } catch (error) {
    console.warn("getPointTotalByTeamId", JSON.stringify(error, null, 2));
    return { success: false, error: "" };
  }
}
