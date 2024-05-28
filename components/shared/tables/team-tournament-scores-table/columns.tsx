import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

export type TeamTournamentScoresTableRow = {
  id: string;
  place: number;
  playerName: string;
  score: number;
};

const columnHelper = createColumnHelper<TeamTournamentScoresTableRow>();

export const teamTournamentScoresTableColumns: ColumnDef<TeamTournamentScoresTableRow>[] =
  [
    columnHelper.accessor("place", {
      header: "#",
    }),
    columnHelper.accessor("playerName", {
      header: "Player",
      sortingFn: "alphanumeric",
    }),
    columnHelper.accessor("score", {
      header: "Score",
      meta: { align: "right" },
    }),
  ] as Array<ColumnDef<TeamTournamentScoresTableRow, unknown>>;
