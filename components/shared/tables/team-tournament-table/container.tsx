import { NoDataFound } from "../../no-data-found";
import { TeamTournamentRow, teamTournamentTableColumns } from "./columns";
import { format } from "date-fns";
import { DataTable, DataTableProps } from "@/components/ui/data-table/table";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import Link from "next/link";
import getTeamTournaments from "@/data/getTeamTournaments";

type TeamTournamentTableProps = {
  teamId?: string;
  limit?: number;
} & Omit<DataTableProps<TeamTournamentRow>, "data" | "columns">;

export async function TeamTournamentTable({
  teamId,
  limit,
  ...props
}: TeamTournamentTableProps) {
  const { success, data } = await getTeamTournaments(teamId);

  if (!success || !data || data.length === 0) {
    return (
      <NoDataFound
        type="Team Tournaments"
        description="There is no tournament data to be seen here. Since there is no public
API to fetch it for us, to see data, please upload manually."
        buttonComponent={() => (
          <>
            <SignedIn>
              <Button asChild>
                <Link href="/upload-team-scores">Upload Team Scores</Link>
              </Button>
            </SignedIn>
            <SignedOut>
              <Button asChild>
                <SignInButton>Create Account to Upload</SignInButton>
              </Button>
            </SignedOut>
          </>
        )}
      />
    );
  }

  const transformedData: TeamTournamentRow[] = data
    .map((tournament) => ({
      ...tournament,
      teamName: tournament.Team.name,
      place: `#${tournament.place}`,
      score: tournament.scoreTotal,
      week: format(tournament.week, "M/d"),
      href: `/team-tournament/${tournament.id}`,
    }))
    .slice(0, limit);

  return (
    <DataTable
      {...props}
      data={transformedData}
      columns={teamTournamentTableColumns}
    />
  );
}
