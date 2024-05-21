import {
  Card,
  CardContent,
  CardHeader,
  CardSection,
  CardSectionTitle,
  CardTitle,
} from "@/components/ui/card";
import getTeamById from "@/data/getTeamById";
import { TeamTrendsInfo } from "./team-member-table/team-trends-info";
import { TeamTournamentTable } from "../team-tournament-history-card/team-tournament-table/container";
import { TeamMemberTable } from "./team-member-table/container";

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
        <CardSection>
          <CardSectionTitle>Quick Glance</CardSectionTitle>
          <TeamTrendsInfo teamId={id} />
        </CardSection>
        <CardSection>
          <CardSectionTitle>Latest Tournaments</CardSectionTitle>
          <TeamTournamentTable teamId={id} limit={4} />
        </CardSection>
        <CardSection>
          <CardSectionTitle>Team Members</CardSectionTitle>
          <TeamMemberTable teamId={id} />
        </CardSection>
      </CardContent>
    </Card>
  );
};
