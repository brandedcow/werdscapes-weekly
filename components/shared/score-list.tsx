import { Score } from "@prisma/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { v4 } from "uuid";

interface ScoreListProps {
  scores: Score[];
  scoreTotal: number;
}

export function ScoreList({ scores, scoreTotal }: ScoreListProps) {
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
          {scores.map(({ playerName, score }, index) => (
            <TableRow key={v4()}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{playerName}</TableCell>
              <TableCell>{score}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
