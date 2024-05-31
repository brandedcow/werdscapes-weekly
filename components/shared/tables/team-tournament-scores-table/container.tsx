import getScoresByTournamentId from "@/data/by-tournament-id/getScoresByTournamentId";
import { NoDataFound } from "../../no-data-found";
import { DataTable, DataTableProps } from "@/components/ui/data-table/table";
import {
  teamTournamentScoresTableColumns,
  TeamTournamentScoresTableRow,
} from "./columns";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type TeamTournamentScoresTableProps = {
  tournamentId: string;
  limit?: number;
} & Omit<DataTableProps<TeamTournamentScoresTableRow>, "data" | "columns">;

export async function TeamTournamentScoresTable({
  tournamentId,
  limit,
  ...props
}: TeamTournamentScoresTableProps) {
  const { success, data } = await getScoresByTournamentId(tournamentId);

  if (!success || !data || data.scores.length === 0) {
    return (
      <NoDataFound
        type="Team Tournament Scores"
        description="There is no score data for this tournament."
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

  const transformedData: TeamTournamentScoresTableRow[] = data.scores.map(
    (score, index) => ({
      ...score,
      playerName: score.Player.name,
      score: score.score,
      href: `/player/${score.Player.id}`,
      place: index + 1,
    })
  );

  return (
    <DataTable
      {...props}
      data={transformedData}
      columns={teamTournamentScoresTableColumns}
    />
  );
}
