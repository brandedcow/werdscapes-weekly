import getPlayers from "@/data/getPlayers";
import { NoDataFound } from "../../no-data-found";
import { PlayerRow, playerTableColumns } from "./columns";
import { DataTable, DataTableProps } from "@/components/ui/data-table/table";
import getTeams from "@/data/getTeams";

type TeamTableProps = {
  teamId?: string;
  limit?: number;
} & Omit<DataTableProps<PlayerRow>, "data" | "columns">;

export async function PlayerTable({ teamId, limit, ...props }: TeamTableProps) {
  const { success, data } = await getPlayers();

  if (!success || !data || data.length === 0) {
    return (
      <NoDataFound
        type="Teams"
        description="No Teams found."
        buttonComponent={() => <></>}
      />
    );
  }

  const transformedData: PlayerRow[] = data.map((player) => ({
    ...player,
    playerName: player.name,
    teamName: player.Team?.name ?? "No Team",
    href: `/player/${player.id}`,
  }));

  return (
    <DataTable {...props} data={transformedData} columns={playerTableColumns} />
  );
}
