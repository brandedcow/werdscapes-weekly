import { NoDataFound } from "../../no-data-found";
import { TeamRow, teamTableColumns } from "./columns";
import { DataTable, DataTableProps } from "@/components/ui/data-table/table";
import getTeams from "@/data/getTeams";

type TeamTableProps = {
  teamId?: string;
  limit?: number;
} & Omit<DataTableProps<TeamRow>, "data" | "columns">;

export async function TeamTable({ teamId, limit, ...props }: TeamTableProps) {
  const { success, data } = await getTeams();

  if (!success || !data || data.length === 0) {
    return (
      <NoDataFound
        type="Teams"
        description="No Teams found."
        buttonComponent={() => <></>}
      />
    );
  }

  const transformedData: TeamRow[] = data
    .map((team) => ({
      ...team,
      teamName: team.name,
      href: `/team/${team.id}`,
    }))
    .slice(0, limit);

  return (
    <DataTable {...props} data={transformedData} columns={teamTableColumns} />
  );
}
