"use client";

import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

export type TeamRow = {
  id: string;
  teamName: string;
  href: string;
};

const columnHelper = createColumnHelper<TeamRow>();

export const teamTableColumns: ColumnDef<TeamRow>[] = [
  columnHelper.accessor("teamName", {
    header: "Team Name",
  }),
  columnHelper.accessor("id", {
    header: "ID",
  }),
] as Array<ColumnDef<TeamRow, unknown>>;
