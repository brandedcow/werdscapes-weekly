import { DataTable, DataTableProps } from "@/components/ui/data-table/table";
import { TeamMember, teamMemberTableColumns } from "./columns";
import { prisma } from "@/lib/db";

type TeamMemberTableProps = {
  teamId?: string;
  limit?: number;
} & Omit<DataTableProps<TeamMember>, "data" | "columns">;

export async function TeamMemberTable({
  teamId,
  limit,
  ...props
}: TeamMemberTableProps) {
  const results: TeamMember[] = await prisma.$queryRaw`
    SELECT 
      p.id,
      p.name AS "name",
      round(AVG(s.score), 2) AS "averageScore",
      MAX(s.score) AS "personalRecord",
      SUM(s.score) AS "totalScore"
    FROM "Player" p
    INNER JOIN "TournamentScore" s ON p.id = s."playerId"
    where p."teamId" = ${teamId}
    GROUP BY p.id, name
    ORDER BY "totalScore" desc;
  `;

  const transformedData: TeamMember[] = results
    .map((row) => ({
      ...row,
      averageScore: Number(row.averageScore),
      personalRecord: Number(row.personalRecord),
      totalScore: Number(row.totalScore),
      href: `/player/${row.id}`,
    }))
    .slice(0, limit);

  return (
    <DataTable
      {...props}
      data={transformedData}
      columns={teamMemberTableColumns}
    />
  );
}
