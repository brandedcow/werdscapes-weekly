import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

export type TeamMember = {
  id: string;
  name: string;
  averageScore: number;
  personalRecord: number;
  totalScore: number;
  href?: string;
};

const columnHelper = createColumnHelper<TeamMember>();
export const columns: ColumnDef<TeamMember>[] = [
  columnHelper.accessor("name", {
    sortingFn: "alphanumeric",
    header: "Player Name",
  }),
  columnHelper.accessor("averageScore", {
    header: "Avg Score (4Wks)",
    meta: { align: "right" },
  }),
  columnHelper.accessor("personalRecord", {
    header: "High Score",
    meta: { align: "right" },
  }),
  columnHelper.accessor("totalScore", {
    header: "Total (All Time)",
    meta: { align: "right" },
  }),
] as Array<ColumnDef<TeamMember, unknown>>;
