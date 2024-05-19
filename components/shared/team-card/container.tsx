import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import getTeamById from "@/data/getTeamById";
import { TeamTournamentList } from "../team-history-card/team-tournament-list";
import { TeamMemberList } from "./team-member-list";
import { TeamMemberTable } from "./team-member-table.tsx/table";
import { CardLabel } from "@/components/ui/card-label";
import { TeamTrendsInfo } from "./team-member-table.tsx/team-trends-info";

interface TeamCardProps {
  id: string;
}

export const TeamCard = async ({ id }: TeamCardProps) => {
  const { success, data } = await getTeamById(id);

  if (!success || !data) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>⛨ {data.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <TeamTrendsInfo teamId={id} />
        <>
          <CardLabel label="Team Members" className="mb-4" />
          <TeamMemberTable data={[]} />
        </>

        <CardLabel label="Tournament History" />
        <TeamTournamentList tournaments={data.tournaments} />
      </CardContent>
    </Card>
  );
};
