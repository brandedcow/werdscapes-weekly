import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Score, Tournament } from "@prisma/client";
import { format } from "date-fns";
import { v4 } from "uuid";

type ScoreWithTournament = Score & {
  Tournament: Tournament;
};

interface PlayerTournamentScoresListProps {
  scores: ScoreWithTournament[];
}

export async function PlayerTournamentScoresList({
  scores,
}: PlayerTournamentScoresListProps) {
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
        {scores.map(({ Tournament, score }) => (
          <TableRow key={v4()}>
            <TableCell>{format(Tournament.week, "MMM d, y")}</TableCell>
            <TableCell>{Tournament.teamName}</TableCell>
            <TableCell>{score}</TableCell>
            <TableCell>{Tournament.place}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
