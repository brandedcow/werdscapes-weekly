"use client";

import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

export type PlayerRow = {
  id: string;
  playerName: string;
  teamName: string;
  href: string;
};

const columnHelper = createColumnHelper<PlayerRow>();

export const playerTableColumns: ColumnDef<PlayerRow>[] = [
  columnHelper.accessor("playerName", {
    header: "Player Name",
    sortingFn: "alphanumeric",
  }),
  columnHelper.accessor("teamName", {
    header: "Team Name",
    sortingFn: "alphanumeric",
  }),
  columnHelper.accessor("id", {
    header: "ID",
  }),
] as Array<ColumnDef<PlayerRow, unknown>>;
