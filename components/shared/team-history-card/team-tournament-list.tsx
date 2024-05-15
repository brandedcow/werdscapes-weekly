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

type TournamentWithTeam = Tournament & {
  Team: Team;
};

export function TeamTournamentList({
  tournaments,
}: {
  tournaments: TournamentWithTeam[];
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Team Name</TableHead>
          <TableHead>Score</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tournaments.map(({ id, week, Team, scoreTotal }) => (
          <Link
            key={v4()}
            legacyBehavior
            href={`/dashboard/team-tournament/${id}`}
          >
            <TableRow className="hover:cursor-pointer">
              <TableCell>{format(new Date(week), "MMM d, y")}</TableCell>
              <TableCell>{Team.name}</TableCell>
              <TableCell>{scoreTotal}</TableCell>
            </TableRow>
          </Link>
        ))}
      </TableBody>
    </Table>
  );
}
