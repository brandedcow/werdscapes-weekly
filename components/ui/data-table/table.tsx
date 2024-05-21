"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { TableHeadSortArrow } from "./table-head-sort-arrow";

interface DataTableProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
}

export function DataTable<T>({ columns, data }: DataTableProps<T>) {
  const [stableData] = useState(data);

  const table = useReactTable({
    columns,
    data: stableData,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => {
          return (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  colSpan={header.colSpan}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  <div
                    className={cn(
                      "flex flex-row items-center",
                      (header.column.columnDef.meta as any)?.align === "right"
                        ? "justify-end"
                        : "justify-start"
                    )}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    <TableHeadSortArrow
                      sortOrder={header.column.getIsSorted()}
                    />
                  </div>
                </TableHead>
              ))}
            </TableRow>
          );
        })}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows.map((row) => (
          <TableRow key={row.id}>
            {row.getAllCells().map((cell) => (
              <TableCell
                key={cell.id}
                align={(cell.column.columnDef.meta as any)?.align}
              >
                {cell.getValue() as string}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
