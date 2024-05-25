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
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { TableHeadSortArrow } from "./table-head-sort-arrow";
import Link from "next/link";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../pagination";
import { v4 } from "uuid";

export type DataTableProps<T> = {
  columns: ColumnDef<T>[];
  data: T[];
  isPaginated?: boolean;
  pageSize?: number;
} & React.HTMLAttributes<HTMLDivElement>;

export function DataTable<T>({
  columns,
  data,
  isPaginated,
  pageSize = 10,
  className,
}: DataTableProps<T>) {
  const [stableData] = useState(data);

  const table = useReactTable({
    columns,
    data: stableData,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: isPaginated ? pageSize : data.length,
      },
    },
  });

  const numPages = isPaginated ? Math.ceil(data.length / pageSize) : 1;

  return (
    <div className={cn(className)}>
      <Table className="whitespace-nowrap">
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
            <Link
              key={row.id}
              href={(row.original as any)?.href}
              legacyBehavior
            >
              <TableRow className="hover:cursor-pointer">
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
      {isPaginated && (
        <Pagination className="mt-2">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => table.previousPage()}
                className={cn(
                  table.getCanPreviousPage() && "hover:cursor-pointer",
                  !table.getCanPreviousPage() &&
                    "pointer-events-none opacity-40"
                )}
              />
            </PaginationItem>
            {numPages > 5 ? (
              <>
                {table.getState().pagination.pageIndex < 3 ? (
                  <>
                    {[0, 1, 2, 3].map((pageIndex) => (
                      <PaginationItem key={v4()}>
                        <PaginationLink
                          onClick={() => table.setPageIndex(pageIndex)}
                          className={cn(
                            table.getState().pagination.pageIndex ===
                              pageIndex && "opacity-100 border border-secondary"
                          )}
                        >
                          {pageIndex + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  </>
                ) : table.getState().pagination.pageIndex >= numPages - 3 ? (
                  <>
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                    {[
                      table.getState().pagination.pageIndex - 3,
                      table.getState().pagination.pageIndex - 2,
                      table.getState().pagination.pageIndex - 1,
                      table.getState().pagination.pageIndex,
                    ].map((pageIndex) => (
                      <PaginationItem key={v4()}>
                        <PaginationLink
                          onClick={() => table.setPageIndex(pageIndex)}
                          className={cn(
                            table.getState().pagination.pageIndex ===
                              pageIndex && "opacity-100 border border-secondary"
                          )}
                        >
                          {pageIndex + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                  </>
                ) : (
                  <>
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                    {[
                      table.getState().pagination.pageIndex - 1,
                      table.getState().pagination.pageIndex,
                      table.getState().pagination.pageIndex + 1,
                    ].map((pageIndex) => (
                      <PaginationItem key={v4()}>
                        <PaginationLink
                          onClick={() => table.setPageIndex(pageIndex)}
                          className={cn(
                            table.getState().pagination.pageIndex ===
                              pageIndex && "opacity-100 border border-secondary"
                          )}
                        >
                          {pageIndex + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  </>
                )}
              </>
            ) : (
              new Array(numPages).fill(null).map((_, index) => (
                <PaginationItem key={v4()}>
                  <PaginationLink
                    onClick={() => table.setPageIndex(index)}
                    className={cn(
                      table.getState().pagination.pageIndex === index &&
                        "opacity-100 border border-secondary"
                    )}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))
            )}
            <PaginationItem>
              <PaginationNext
                onClick={() => table.nextPage()}
                className={cn(
                  table.getCanNextPage() && "hover:cursor-pointer",
                  !table.getCanNextPage() && "pointer-events-none opacity-40 "
                )}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
