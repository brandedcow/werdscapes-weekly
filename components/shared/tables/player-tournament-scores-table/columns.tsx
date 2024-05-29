"use client";

import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { isAfter } from "date-fns";

export type PlayerTournamentScoresRow = {
  id: string;
  week: string;
  score: number;
  place: string;
  href: string;
};

const columnHelper = createColumnHelper<PlayerTournamentScoresRow>();

export const playerTournamentScoresTableColumns: ColumnDef<PlayerTournamentScoresRow>[] =
  [
    columnHelper.accessor("week", {
      header: "Date",
      sortingFn: (a, b) =>
        isAfter(new Date(a.original.week), new Date(b.original.week)) ? 1 : -1,
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
  ] as Array<ColumnDef<PlayerTournamentScoresRow, unknown>>;
