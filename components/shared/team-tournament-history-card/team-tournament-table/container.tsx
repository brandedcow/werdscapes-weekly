import getTournaments from "@/data/getTournaments";
import { NoDataFound } from "../../no-data-found";
import { TeamTournamentRow, teamTournamentTableColumns } from "./columns";
import { format } from "date-fns";
import { DataTable } from "@/components/ui/data-table/table";

interface TeamTournamentTableProps {
  teamId?: string;
  limit?: number;
}

export async function TeamTournamentTable({
  teamId,
  limit,
}: TeamTournamentTableProps) {
  const { success, data } = await getTournaments(teamId);

  if (!success || !data) {
    return (
      <NoDataFound
        type="tournaments"
        description="There is no tournament data to be seen here. Since there is no public
API to fetch it for us, to see data, please upload manually."
        linkHref="/dashboard/upload-scores"
        buttonLabel="Upload Scores"
      />
    );
  }

  const transformedData: TeamTournamentRow[] = data
    .map((tournament) => ({
      ...tournament,
      place: `#${tournament.place}`,
      score: tournament.scoreTotal,
      week: format(tournament.week, "MMM d, y"),
      href: `/dashboard/team-tournament/${tournament.id}`,
    }))
    .slice(0, limit);

  return (
    <DataTable data={transformedData} columns={teamTournamentTableColumns} />
  );
}
