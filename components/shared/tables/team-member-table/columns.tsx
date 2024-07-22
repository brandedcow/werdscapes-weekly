"use client";

import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

export type TeamMember = {
  id: string;
  name: string;
  isLeader: boolean;
  averageScore: number;
  personalRecord: number;
  totalScore: number;
  href?: string;
};

const columnHelper = createColumnHelper<TeamMember>();

export const teamMemberTableColumns: ColumnDef<TeamMember>[] = [
  {
    header: "#",
    id: "id",
    cell: ({ row, table }) =>
      (table
        .getSortedRowModel()
        ?.flatRows?.findIndex((flatRow) => flatRow.id === row.id) || 0) + 1,
  },
  columnHelper.accessor("name", {
    sortingFn: "alphanumeric",
    header: "Player Name",
    cell: ({ row }) => (
      <div className="flex row gap-1.5">
        <p>{row.original.isLeader && "👑"}</p>
        <p>{row.original.name}</p>
      </div>
    ),
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
