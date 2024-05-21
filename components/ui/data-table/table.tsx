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
import Link from "next/link";

interface DataTableProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
  onRowClick?: React.MouseEventHandler<HTMLTableRowElement>;
}

export function DataTable<T>({ columns, data, onRowClick }: DataTableProps<T>) {
  const [stableData] = useState(data);

  const table = useReactTable({
    columns,
    data: stableData,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  console.log(table.getRowModel());

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
          <Link href={(row.original as any)?.href} legacyBehavior>
            <TableRow key={row.id} className="hover:cursor-pointer">
              {row.getAllCells().map((cell) => (
                <TableCell
                  key={cell.id}
                  align={(cell.column.columnDef.meta as any)?.align}
                >
                  {cell.getValue() as string}
                </TableCell>
              ))}
            </TableRow>
          </Link>
        ))}
      </TableBody>
    </Table>
  );
}
