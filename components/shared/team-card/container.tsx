import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import getTeamById from "@/data/getTeamById";
import { TeamTournamentList } from "../team-history-card/team-tournament-list";
import { DataTable as TeamMemberTable } from "../../ui/data-table/table";
import { CardLabel } from "@/components/ui/card-label";
import { TeamTrendsInfo } from "./team-member-table.tsx/team-trends-info";
import { prisma } from "@/lib/db";
import { columns, TeamMember } from "./team-member-table.tsx/columns";

interface TeamCardProps {
  id: string;
}

export const TeamCard = async ({ id }: TeamCardProps) => {
  const { success, data } = await getTeamById(id);

  const results: TeamMember[] = await prisma.$queryRaw`
    SELECT 
      p.id,
      p.name AS "name",
      round(AVG(s.score), 2) AS "averageScore",
      MAX(s.score) AS "personalRecord",
      SUM(s.score) AS "totalScore"
    FROM "Player" p
    INNER JOIN "Score" s ON p.name = s."playerName"
    where p."teamId" = ${id}
    GROUP BY p.id, p.name
    ORDER BY "totalScore" desc;
  `;

  if (!success || !data) {
    return null;
  }

  const transformedData: TeamMember[] = results.map((row) => ({
    ...row,
    averageScore: Number(row.averageScore),
    personalRecord: Number(row.personalRecord),
    totalScore: Number(row.totalScore),
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>⛨ {data.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <TeamTrendsInfo teamId={id} />
        <>
          <CardLabel label="Team Members" className="mb-4" />
          <TeamMemberTable columns={columns} data={transformedData} />
        </>
        <CardLabel label="Tournament History" />
        <TeamTournamentList tournaments={data.tournaments} />
      </CardContent>
    </Card>
  );
};
