import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusSquare } from "lucide-react";
import Link from "next/link";
import { TeamTournamentList } from "./team-tournament-list";
import getTournaments from "@/data/getTournaments";

export async function TeamHistoryCard({}) {
  // TODO: sort tournaments by date, include options in table to sort
  const { data } = await getTournaments();

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
        <TeamTournamentList tournaments={data ?? []} />
      </CardContent>
    </Card>
  );
}
