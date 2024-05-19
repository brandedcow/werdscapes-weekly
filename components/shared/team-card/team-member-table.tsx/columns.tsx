import { ColumnDef } from "@tanstack/react-table";

export type TeamMember = {
  id: string;
  name: string;
  averageScore: number;
  personalRecord: number;
  totalScore: number;
};

export const columns: ColumnDef<TeamMember>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "averageScore",
    header: "Avg Score (4 Wks)",
  },
  {
    accessorKey: "personalRecord",
    header: "Personal Record",
  },
  {
    accessorKey: "totalScore",
    header: "Total Score",
  },
];
