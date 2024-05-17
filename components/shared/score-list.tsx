import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { v4 } from "uuid";
import Link from "next/link";
import { NoDataFound } from "./no-data-found";
import getScoresByTournamentId from "@/data/getScoresByTournamentId";

interface ScoreListProps {
  tournamentId: string;
}

export async function ScoreList({ tournamentId }: ScoreListProps) {
  const { success, data } = await getScoresByTournamentId(tournamentId);

  if (!success || !data) {
    return (
      <NoDataFound
        type="scores"
        description="There is no score data for this tournament."
        linkHref="/dashboard/upload-scores"
        buttonLabel="Upload Scores"
      />
    );
  }

  const { scores, scoreTotal } = data;

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Team Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>{scoreTotal}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Player Name</TableHead>
            <TableHead>Score</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {scores.map(({ playerName, score, Player: { id } }, index) => (
            <Link key={v4()} href={`/dashboard/player/${id}`} legacyBehavior>
              <TableRow className="hover:cursor-pointer">
                <TableCell>{index + 1}</TableCell>
                <TableCell>{playerName}</TableCell>
                <TableCell>{score}</TableCell>
              </TableRow>
            </Link>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
