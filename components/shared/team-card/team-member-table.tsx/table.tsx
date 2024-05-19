import { DataTable } from "@/components/ui/data-table";
import { columns, TeamMember } from "./columns";

const sampleData = [
  {
    id: "1",
    name: "John Doe",
    averageScore: 120,
    personalRecord: 140,
    totalScore: 120,
  },
  {
    id: "2",
    name: "Jane Doe",
    averageScore: 130,
    personalRecord: 150,
    totalScore: 120,
  },
  {
    id: "3",
    name: "Jim Smith",
    averageScore: 11,
    personalRecord: 300,
    totalScore: 120,
  },
];

interface TeamMemberTableProps {
  data: TeamMember[];
}
export function TeamMemberTable({ data }: TeamMemberTableProps) {
  return (
    <>
      <DataTable columns={columns} data={sampleData} />
    </>
  );
}
