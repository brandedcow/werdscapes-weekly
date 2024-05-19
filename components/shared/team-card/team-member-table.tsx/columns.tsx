import { ColumnDef, SortingFn } from "@tanstack/react-table";

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
    meta: {
      align: "right",
    },
  },
  {
    accessorKey: "personalRecord",
    header: "Personal Record",
    meta: {
      align: "right",
    },
  },
  {
    accessorKey: "totalScore",
    header: "Points All Time",
    meta: {
      align: "right",
    },
  },
];
