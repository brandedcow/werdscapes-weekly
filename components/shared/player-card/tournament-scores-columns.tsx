"use client";

import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { format, isAfter } from "date-fns";

export type PlayerTournamentScore = {
  id: string;
  teamName: string;
  week: string;
  place: number;
  score: number;
  href?: string;
};

const columnHelper = createColumnHelper<PlayerTournamentScore>();

export const columns: ColumnDef<PlayerTournamentScore>[] = [
  columnHelper.accessor("teamName", {
    sortingFn: "alphanumeric",
    header: "Team Name",
  }),
  columnHelper.accessor("week", {
    header: "Date",

    sortingFn: (a, b) =>
      isAfter(new Date(a.original.week), new Date(b.original.week)) ? 1 : -1,
  }),
  columnHelper.accessor("place", {
    sortingFn: "basic",
    header: "Place",
    meta: { align: "right" },
  }),
  columnHelper.accessor("score", {
    sortingFn: "basic",
    header: "Score",
    meta: { align: "right" },
  }),
] as Array<ColumnDef<PlayerTournamentScore, unknown>>;
