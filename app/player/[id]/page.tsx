import { NoDataFound } from "@/components/shared/no-data-found";
import { QuickGlanceCard } from "@/components/shared/quick-glance-card";
import { TeamTournamentTable } from "@/components/shared/tables/team-tournament-table/container";
import { TeamMemberTable } from "@/components/shared/tables/team-member-table/container";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import getPlayerById from "@/data/by-player-id/getPlayerById";
import { ScoreLineChart } from "@/components/shared/player-card/score-line-chart";

export default async function PlayerPage({
  params,
}: {
  params: { id: string };
}) {
  const { success, data } = await getPlayerById(params.id);

  if (!success || !data) {
    return (
      <NoDataFound
        type="Player"
        description={`No Player found with the id: ${params.id}.`}
        buttonComponent={() => null}
      />
    );
  }

  return (
    <div className="flex flex-col gap-y-4 w-svw pr-12">
      <CardTitle>⛨ {data.name}</CardTitle>
      <CardDescription>ID: {params.id}</CardDescription>
      <QuickGlanceCard type="player" id={params.id} />

      <Card>
        <CardHeader>
          <CardTitle>Score History</CardTitle>
        </CardHeader>
        <CardContent>
          <ScoreLineChart scores={[]} />
        </CardContent>
      </Card>
    </div>
  );
}
