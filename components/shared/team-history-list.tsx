import { PlusSquare } from "lucide-react";
import { v4 } from "uuid";
import { format } from "date-fns";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { PlayerTournamentScore } from "@/data/getPlayerTournamentScores";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface TeamHistoryListProps {
  scores: PlayerTournamentScore[];
  onUpload: () => void;
}

export default function TeamHistoryList({
  scores,
  onUpload,
}: TeamHistoryListProps) {
  const router = useRouter();

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Team Tournament History</CardTitle>
        <Button variant="outline" size="icon" onClick={onUpload}>
          <PlusSquare />
        </Button>
      </CardHeader>
      <CardContent>
        {scores.length === 0 ? (
          <CardDescription>
            PeopleFun does not offer a public API to access tournament info.
            Upload screenshots to add data.
          </CardDescription>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Team Name</TableHead>
                <TableHead>Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {scores.map(
                ({
                  score,
                  Tournament: {
                    id,
                    week,
                    Team: { name },
                  },
                }) => (
                  <TableRow
                    key={v4()}
                    onClick={() => router.push(`/tournament-details/${id}`)}
                  >
                    <TableCell>{format(new Date(week), "MMM d, y")}</TableCell>
                    <TableCell>{name}</TableCell>
                    <TableCell>{score}</TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
