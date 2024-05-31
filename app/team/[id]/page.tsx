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
import getTeamById from "@/data/by-team-id/getTeamById";
import { DeleteTeamButton } from "@/components/shared/buttons/delete-team-button";

export default async function TeamPage({ params }: { params: { id: string } }) {
  const { success, data } = await getTeamById(params.id);

  if (!success || !data) {
    return (
      <NoDataFound
        type="Team"
        description={`No Team found with the id: ${params.id}.`}
        buttonComponent={() => null}
      />
    );
  }

  return (
    <div className="flex flex-col gap-y-4 w-svw pr-12">
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <CardTitle>⛨ {data.name}</CardTitle>
          <CardDescription>ID: {params.id}</CardDescription>
        </div>
        <DeleteTeamButton id={params.id} />
      </div>
      <QuickGlanceCard type="team" id={params.id} />

      <Card>
        <CardHeader>
          <CardTitle>Latest Tournaments</CardTitle>
        </CardHeader>
        <CardContent>
          <TeamTournamentTable teamId={params.id} limit={4} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
        </CardHeader>
        <CardContent>
          <TeamMemberTable teamId={params.id} />
        </CardContent>
      </Card>
    </div>
  );
}
