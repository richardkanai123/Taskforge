"use client"

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    SortingState,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "../ui/button"
import { useState } from "react"

interface DataTableProps<ProjectWithDetails, TValue> {
    columns: ColumnDef<ProjectWithDetails, TValue>[]
    data: ProjectWithDetails[]
}

export function DataTable<ProjectWithDetails, TValue>({
    columns,
    data,
}: DataTableProps<ProjectWithDetails, TValue>) {

    const [sorting, setSorting] = useState<SortingState>([])

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        enableColumnFilters: true,
        enableSorting: true,
        enableRowSelection: true,
        // sortingFns: {
        //     alphanumeric: (rowA, rowB) => {
        //         const a = rowA.getValue("title") as string
        //         const b = rowB.getValue("title") as string

        //         return a.localeCompare(b, undefined, { numeric: true })
        //     },
        //     date: (rowA, rowB) => {
        //         const a = rowA.getValue("dueDate") as string
        //         const b = rowB.getValue("dueDate") as string

        //         return new Date(a).getTime() - new Date(b).getTime()
        //     },
        //     progress: (rowA, rowB) => {
        //         const a = rowA.getValue("progress") as number
        //         const b = rowB.getValue("progress") as number

        //         return a - b
        //     },
        //     status: (rowA, rowB) => {
        //         const a = rowA.getValue("status") as string
        //         const b = rowB.getValue("status") as string

        //         return a.localeCompare(b, undefined, { numeric: true })
        //     },
        // },
        onSortingChange: setSorting,
        state: {
            sorting,
        },
    })



    return (
        <div className="rounded-md border">
            <div className="w-full mx-auto p-2">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext(),

                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No Projects Found
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="flex items-center justify-end space-x-2 py-4">
                {
                    table.getCanPreviousPage() && (
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            Previous
                        </Button>
                    )}

                <div className="flex items-center space-x-2 px-4">
                    <span className="text-sm text-muted-foreground">
                        Page{" "}
                        <strong>
                            {table.getState().pagination.pageIndex + 1} of{" "}
                            {table.getPageCount()}
                        </strong>{" "}
                    </span>

                </div>
                {table.getCanNextPage() && (

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                )}
            </div>
        </div>
    )
}
