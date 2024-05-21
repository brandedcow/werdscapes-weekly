import { SortDirection } from "@tanstack/react-table";
import { ChevronDown, ChevronUp } from "lucide-react";

interface TableHeadSortArrow {
  sortOrder: SortDirection | false;
}

export function TableHeadSortArrow({ sortOrder }: TableHeadSortArrow) {
  if (!sortOrder) return null;

  return <>{sortOrder === "asc" ? <ChevronUp /> : <ChevronDown />}</>;
}
