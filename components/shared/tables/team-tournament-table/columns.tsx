"use client";

import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { isAfter } from "date-fns";

export type TeamTournamentRow = {
  id: string;
  week: string;
  teamName: string;
  score: number;
  place: string;
  href: string;
};

const columnHelper = createColumnHelper<TeamTournamentRow>();

export const teamTournamentTableColumns: ColumnDef<TeamTournamentRow>[] = [
  columnHelper.accessor("week", {
    header: "Date",
    sortingFn: (a, b) =>
      isAfter(new Date(a.original.week), new Date(b.original.week)) ? 1 : -1,
  }),
  columnHelper.accessor("teamName", {
    header: "Team",
    sortingFn: "alphanumeric",
  }),
  columnHelper.accessor("score", {
    header: "Score",
    sortingFn: "basic",
    meta: { align: "right" },
  }),
  columnHelper.accessor("place", {
    header: "Place",
    sortingFn: "basic",
    meta: { align: "right" },
  }),
] as Array<ColumnDef<TeamTournamentRow, unknown>>;
