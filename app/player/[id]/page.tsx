import { NoDataFound } from "@/components/shared/no-data-found";
import { QuickGlanceCard } from "@/components/shared/quick-glance-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import getPlayerById from "@/data/by-player-id/getPlayerById";
import { PlayerTournamentScoresTable } from "@/components/shared/tables/player-tournament-scores-table/container";
import { PlayerScoreLineChart } from "@/components/shared/charts/player-score-line-chart/container";
import { DeletePlayerButton } from "@/components/shared/buttons/delete-player-button";

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
      <div className="flex justify-between items-start">
        <div>
          <CardTitle>⛨ {data.name}</CardTitle>
          <CardDescription>ID: {params.id}</CardDescription>
          {data.Team && (
            <CardDescription>Team: {data.Team.name}</CardDescription>
          )}
        </div>
        <DeletePlayerButton id={params.id} />
      </div>

      <QuickGlanceCard type="player" id={params.id} />

      <Card>
        <CardHeader>
          <CardTitle>Score History</CardTitle>
        </CardHeader>
        <CardContent>
          <PlayerScoreLineChart playerId={params.id} />
          {data.teamId && (
            <PlayerTournamentScoresTable playerId={params.id} limit={10} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
