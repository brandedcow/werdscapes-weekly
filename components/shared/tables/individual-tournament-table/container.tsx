import { NoDataFound } from "../../no-data-found";
import { format } from "date-fns";
import { DataTable, DataTableProps } from "@/components/ui/data-table/table";
import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import Link from "next/link";
import {
  IndividualTournamentRow,
  individualTournamentTableColumns,
} from "./columns";
import getIndividualTournaments from "@/data/getIndividualTournaments";

type IndividualTournamentTableProps = {
  playerId?: string;
  limit?: number;
} & Omit<DataTableProps<IndividualTournamentRow>, "data" | "columns">;

export async function IndividualTournamentTable({
  playerId,
  limit,
  ...props
}: IndividualTournamentTableProps) {
  const { success, data } = await getIndividualTournaments(playerId);

  if (!success || !data || data.length === 0) {
    return (
      <NoDataFound
        type="Individual Tournaments"
        description="There is no tournament data to be seen here. Since there is no public
API to fetch it for us, to see data, please upload manually."
        buttonComponent={() => (
          <>
            <SignedIn>
              <Button asChild>
                <Link href="/upload-individual-scores">
                  Upload Individual Scores
                </Link>
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

  const transformedData: IndividualTournamentRow[] = data
    .map((tournament) => ({
      ...tournament,
      playerName: tournament.Player.name,
      place: `#${tournament.place}`,
      score: tournament.scoreTotal,
      week: format(tournament.week, "M/d"),
      href: `/dashboard/individual-tournament/${tournament.id}`,
    }))
    .slice(0, limit);

  return (
    <DataTable
      {...props}
      data={transformedData}
      columns={individualTournamentTableColumns}
    />
  );
}
