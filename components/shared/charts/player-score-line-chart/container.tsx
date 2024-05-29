import getTournamentScoresByPlayerId from "@/data/by-player-id/getTournamentScoresByPlayerId";
import { DataChart } from "./chart";
import { format } from "date-fns";

interface PlayerScoreLineChartProps {
  playerId: string;
}

export async function PlayerScoreLineChart({
  playerId,
}: PlayerScoreLineChartProps) {
  const { success, data: scores } = await getTournamentScoresByPlayerId(
    playerId
  );

  if (!success || !scores || scores.length === 0) {
    return null;
  }

  const data = scores.map((score) => ({
    ...score,
    week: format(new Date(score.TeamTournament?.week ?? ""), "M/d"),
    score: score.score,
  }));

  return <DataChart scores={data} height={350} />;
}
