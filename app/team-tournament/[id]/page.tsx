import { DeleteTeamTournamentButton } from "@/components/shared/buttons/delete-tournament-button";
import { EditTeamTournamentButton } from "@/components/shared/buttons/edit-team-tournament-button";
import { NoDataFound } from "@/components/shared/no-data-found";
import { QuickGlanceCard } from "@/components/shared/quick-glance-card";
import { ScoresCard } from "@/components/shared/scores-card";
import { CardDescription, CardTitle } from "@/components/ui/card";
import getTournamentById from "@/data/by-tournament-id/getTournamentById";
import { SignedIn } from "@clerk/nextjs";
import { format } from "date-fns";

export default async function TournamentDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { success, data } = await getTournamentById(params.id);

  if (!success || !data) {
    return (
      <NoDataFound
        type="Team Tournament"
        description={`No Tournament found with the id: ${params.id}.`}
        buttonComponent={() => (
          <>
            <SignedIn></SignedIn>
          </>
        )}
      />
    );
  }

  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex justify-between items-center">
        <CardTitle>
          {`#${data.place} ${data.Team.name} | ${format(
            data.week,
            "MMM d, y"
          )}`}
        </CardTitle>
        <EditTeamTournamentButton id={params.id} />
      </div>
      <CardDescription>ID: {params.id}</CardDescription>
      <QuickGlanceCard type="tournament" id={params.id} />
      <ScoresCard tournamentId={params.id} />
    </div>
  );
}
