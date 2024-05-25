import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TeamTournamentTable } from "@/components/shared/tables/team-tournament-table/container";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export default function Home() {
  return (
    <div className="flex flex-col gap-y-4 w-svw pr-12">
      <Card>
        <CardHeader>
          <CardTitle>Latest Team Tournaments</CardTitle>
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
          <TeamTournamentTable />
        </CardContent>
      </Card>
    </div>
  );
}
