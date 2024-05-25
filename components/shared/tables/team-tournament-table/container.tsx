import getTournaments from "@/data/getTournaments";
import { NoDataFound } from "../../no-data-found";
import { TeamTournamentRow, teamTournamentTableColumns } from "./columns";
import { format } from "date-fns";
import { DataTable, DataTableProps } from "@/components/ui/data-table/table";
import { TeamTournament } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import Link from "next/link";

type TeamTournamentTableProps = {
  teamId?: string;
  limit?: number;
} & Omit<DataTableProps<TeamTournamentRow>, "data" | "columns">;

export async function TeamTournamentTable({
  teamId,
  limit,
  ...props
}: TeamTournamentTableProps) {
  const { success, data } = await getTournaments(teamId);

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
    .map((tournament: TeamTournament) => ({
      ...tournament,
      place: `#${tournament.place}`,
      score: tournament.scoreTotal,
      week: format(tournament.week, "MMM d, y"),
      href: `/dashboard/team-tournament/${tournament.id}`,
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
