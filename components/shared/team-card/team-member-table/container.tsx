import { DataTable } from "@/components/ui/data-table/table";
import { TeamMember, teamMemberTableColumns } from "./columns";
import { prisma } from "@/lib/db";

export async function TeamMemberTable({ teamId }: { teamId: string }) {
  const results: TeamMember[] = await prisma.$queryRaw`
    SELECT 
      p.id,
      p.name AS "name",
      round(AVG(s.score), 2) AS "averageScore",
      MAX(s.score) AS "personalRecord",
      SUM(s.score) AS "totalScore"
    FROM "Player" p
    INNER JOIN "Score" s ON p.name = s."playerName"
    where p."teamId" = ${teamId}
    GROUP BY p.id, p.name
    ORDER BY "totalScore" desc;
  `;

  const transformedData: TeamMember[] = results.map((row) => ({
    ...row,
    averageScore: Number(row.averageScore),
    personalRecord: Number(row.personalRecord),
    totalScore: Number(row.totalScore),
    href: `/dashboard/player/${row.id}`,
  }));

  return <DataTable data={transformedData} columns={teamMemberTableColumns} />;
}
