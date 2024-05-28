"use server";

import { StatData } from "@/components/shared/stat-cards/container";
import getParticipationByTournamentId from "./getParticipationByTournamentId";
import getScoreTotalsByTournamentId from "./getScoreTotalsByTournamentId";

export default async function getTournamentStatsById(id: string) {
  try {
    const { data: totalScores } = await getScoreTotalsByTournamentId(id);
    const { data: participation } = await getParticipationByTournamentId(id);

    const tournamentStats: StatData[] = [
      { displayName: "Totals", variants: totalScores },
      { displayName: "Participation %", variants: participation },
    ];

    return { success: true, data: tournamentStats };
  } catch (error) {
    console.warn("getTournamentStatsById");
    return { success: false };
  }
}
