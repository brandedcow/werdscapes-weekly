import { NoDataFound } from "../../no-data-found";
import {
  PlayerTournamentScoresRow,
  playerTournamentScoresTableColumns,
} from "./columns";
import { format } from "date-fns";
import { DataTable, DataTableProps } from "@/components/ui/data-table/table";
import getTournamentScoresByPlayerId from "@/data/by-player-id/getTournamentScoresByPlayerId";

type PlayerTournamentScoresTableProps = {
  playerId: string;
  limit?: number;
} & Omit<DataTableProps<PlayerTournamentScoresRow>, "data" | "columns">;

export async function PlayerTournamentScoresTable({
  playerId,
  limit,
  ...props
}: PlayerTournamentScoresTableProps) {
  const { success, data } = await getTournamentScoresByPlayerId(playerId);

  if (!success || !data || data.length === 0) {
    return (
      <NoDataFound
        type="Player Scores"
        description={`No score found for player with the id: ${playerId}.`}
        buttonComponent={() => null}
      />
    );
  }

  const transformedData: PlayerTournamentScoresRow[] = data
    .map((score) => ({
      ...score,
      week: format(new Date(score.TeamTournament?.week ?? ""), "MMM d, y"),
      score: score.score,
      place: `#${score.TeamTournament?.place}`,
      href: `/team-tournament/${score.TeamTournament?.id}`,
    }))
    .slice(0, limit);

  return (
    <DataTable
      {...props}
      data={transformedData}
      columns={playerTournamentScoresTableColumns}
    />
  );
}
