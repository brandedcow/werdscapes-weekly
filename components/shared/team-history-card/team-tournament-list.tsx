import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Team, Tournament } from "@prisma/client";
import { format } from "date-fns";
import Link from "next/link";
import { v4 } from "uuid";
import { NoDataFound } from "../no-data-found";

type TournamentWithTeam = Tournament & {
  Team: Team;
};

export function TeamTournamentList({
  tournaments,
}: {
  tournaments: TournamentWithTeam[];
}) {
  if (tournaments.length === 0) {
    return (
      <NoDataFound
        type="tournaments"
        description="There is no tournament data to be seen here. Since there is no public
    API to fetch it for us, to see data, please upload manually."
        linkHref="/dashboard/upload-screenshots"
        buttonLabel="Upload Scores"
      />
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Team Name</TableHead>
          <TableHead>Score</TableHead>
          <TableHead>Place</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tournaments.map(({ id, week, Team, scoreTotal, place }) => (
          <Link
            key={v4()}
            legacyBehavior
            href={`/dashboard/team-tournament/${id}`}
          >
            <TableRow className="hover:cursor-pointer">
              <TableCell>{format(new Date(week), "MMM d, y")}</TableCell>
              <TableCell>{Team.name}</TableCell>
              <TableCell>{scoreTotal}</TableCell>
              <TableCell>#{place}</TableCell>
            </TableRow>
          </Link>
        ))}
      </TableBody>
    </Table>
  );
}
