import { DeleteTeamTournamentButton } from "@/components/shared/buttons/delete-tournament-button";
import { EditTeamTournamentInfoForm } from "@/components/shared/forms/edit-team-tournament-info-form";
import { EditTeamTournamentScoresForm } from "@/components/shared/forms/edit-team-tournament-scores";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import getTournamentById from "@/data/by-tournament-id/getTournamentById";

export default async function EditTeamTournamentPage({
  params,
}: {
  params: { id: string };
}) {
  const { success, data: tournament } = await getTournamentById(params.id);

  if (!success || !tournament) return null;

  return (
    <div className="flex flex-col gap-y-4 w-svw pr-12">
      <div className="flex justify-between items-center">
        <CardTitle>{`⛨ ${tournament.Team.name}`}</CardTitle>
        <DeleteTeamTournamentButton id={params.id} />
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Update Tournament Info</CardTitle>
        </CardHeader>
        <CardContent>
          <EditTeamTournamentInfoForm
            id={params.id}
            defaultValues={{
              week: tournament.week,
              place: tournament.place.toString(),
            }}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Update Scores</CardTitle>
        </CardHeader>
        <CardContent>
          <EditTeamTournamentScoresForm
            tournamentId={params.id}
            teamId={tournament.Team.id}
            defaultValues={{
              scores: tournament.scores.map((score) => ({
                playerId: score.Player.id,
                score: score.score.toString(),
                name: score.Player.name,
              })),
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
