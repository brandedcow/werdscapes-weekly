import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TeamTournamentTable } from "@/components/shared/tables/team-tournament-table/container";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { IndividualTournamentTable } from "@/components/shared/tables/individual-tournament-table/container";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-y-4 w-svw pr-12">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Latest Team Tournaments</CardTitle>
          <Button variant="link" className="underline">
            <Link href="/team-tournaments">{"View All ->"}</Link>
          </Button>
        </CardHeader>
        <CardContent>
          <ScrollArea>
            <TeamTournamentTable />
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Latest Individual Tournaments</CardTitle>
        </CardHeader>
        <CardContent>
          <IndividualTournamentTable />
        </CardContent>
      </Card>
    </div>
  );
}
