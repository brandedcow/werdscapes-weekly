import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { prisma } from "@/lib/db";
import { PlusSquare } from "lucide-react";
import Link from "next/link";
import { TeamTournamentList } from "./team-tournament-list";
import getTournaments from "@/data/getTournaments";

export async function TeamHistoryCard({}) {
  // TODO: sort tournaments by date, include options in table to sort
  const { success, data } = await getTournaments();

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
        {!success || !data ? (
          <CardDescription>
            PeopleFun does not offer a public API to access tournament info.
            Upload screenshots to add data, and add your player info to filter
            results.
          </CardDescription>
        ) : (
          <TeamTournamentList tournaments={data} />
        )}
      </CardContent>
    </Card>
  );
}
