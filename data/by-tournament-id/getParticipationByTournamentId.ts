"use server";

import { prisma } from "@/lib/db";

export default async function getParticipationByTournamentId(id: string) {
  try {
    const data: {
      active_players: number;
      total_players: number;
    }[] = await prisma.$queryRaw`
      with
        all_scores as (
          select
            count(distinct "playerId") filter (where score != 0) as active_players,
            count(distinct "playerId") as total_players
          from
            "TournamentScore"
          where
            "teamTournamentId" = 'clwmdlkdg00kcu58bumunixn1'
        )
        select
          active_players, total_players
        from all_scores
    `;

    const activePlayers = Number(data[0].active_players);
    const totalPlayers = Number(data[0].total_players);

    const percent = Math.round((activePlayers / totalPlayers) * 10000) / 100;

    const parsed = {
      "Active / Total Players": `${activePlayers}/${totalPlayers}`,
      percent: `${percent}%`,
    };

    return { success: true, data: parsed };
  } catch (error) {
    console.warn("getParticipationByTournamentId");
    return { success: false };
  }
}
