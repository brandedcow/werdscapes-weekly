import { prisma } from "@/lib/db";
import { TournamentType } from "@prisma/client";

export default async function getActivePlayerRatio(teamName: string) {
  try {
    const result: {
      teamId: string;
      week: Date;
      type: TournamentType;
      teamName: string;
      active_players: number;
      total_palyers: number;
      active_percent: number;
    }[] = await prisma.$queryRaw`
      select
        t.week,
        t.type,
        t."teamName",
        count(distinct s.id) filter (where s.score != 0) as acive_players,
        count(distinct s.id) as total_players,
        ROUND((COUNT(DISTINCT s.id) FILTER (WHERE s.score != 0) * 100.0) / COUNT(DISTINCT s.id), 2) AS active_percent
      from
        "Tournament" t
        join "Score" s on t.id = s."tournamentId"
      where t."teamName" = ${teamName}
      group by
        t.id,
        t.week,
        t.type,
        t."teamName"
    `;
    return { success: true, data: result };
  } catch (error) {
    console.warn("getActivePlayerRatio", JSON.stringify(error));
    return {
      success: false,
      error: "Something went wrong fetching active player ratios.",
    };
  }
}
