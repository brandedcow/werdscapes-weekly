import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { prisma } from "@/lib/db";
import { format } from "date-fns";
import { PlusSquare } from "lucide-react";
import Link from "next/link";
import { v4 } from "uuid";

export async function TeamHistoryCard() {
  const tournaments = await prisma.tournament.findMany({
    where: {},
    include: {
      Team: true,
    },
  });

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle>Team Tournament History</CardTitle>
        <Button size="icon" variant="outline">
          <Link href="/dashboard/upload-screenshots">
            <PlusSquare />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        {tournaments.length === 0 ? (
          <CardDescription>
            PeopleFun does not offer a public API to access tournament info.
            Upload screenshots to add data, and add your player info to filter
            results.
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
              {tournaments.map(({ week, Team, scoreTotal }) => (
                <TableRow key={v4()}>
                  <TableCell>{format(new Date(week), "MMM d, y")}</TableCell>
                  <TableCell>{Team.name}</TableCell>
                  <TableCell>{scoreTotal}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
