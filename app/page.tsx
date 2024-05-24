import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TeamTournamentTable } from "@/components/shared/tables/team-tournament-table/container";

export default function Home() {
  return (
    <div className="flex flex-col gap-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Latest Team Tournaments</CardTitle>
        </CardHeader>
        <CardContent>
          <TeamTournamentTable />
        </CardContent>
      </Card>
    </div>
  );
}
