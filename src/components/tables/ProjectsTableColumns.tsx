"use client"

import { ProjectStatus } from "@prisma/client"
import { ColumnDef } from "@tanstack/react-table"
import { formatDistanceToNow } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { Button } from "../ui/button"
import { ArrowUpDown } from "lucide-react"
import Link from "next/link"
export type Project = {
    title: string
    progress: number
    status: ProjectStatus
    dueDate: Date
    id: string
}


export const columns: ColumnDef<Project>[] = [
    {
        accessorKey: "title",
        sortingFn: "alphanumeric",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Title
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        enableColumnFilter: false,
        enableSorting: true,
        cell: ({ row }) => <div className="text-sm">{row.getValue("title")}</div>,
    },
    {
        accessorKey: "progress",
        sortingFn: "alphanumeric",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Progress
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        enableColumnFilter: false,
        enableSorting: true,
        cell: ({ row }) => <div className="text-sm">{row.getValue("progress")}%</div>,
    },
    {
        accessorKey: "status",
        sortingFn: "alphanumericCaseSensitive",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Status
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        enableColumnFilter: false,
        enableSorting: true,
        cell: ({ row }) => {
            const status = row.getValue("status") as ProjectStatus
            // Define the color based on the status value

            const statusColor = (() => {
                switch (status) {
                    case ProjectStatus.COMPLETED:
                        return "bg-green-500 text-white"
                    case ProjectStatus.IN_PROGRESS:
                        return "bg-yellow-500 text-white"
                    case ProjectStatus.OPEN:
                        return "bg-red-500 text-white"
                    default:
                        return "bg-gray-500 text-white"
                }
            }
            )()
            return <Badge className={`text-sm ${statusColor}`}>{status}</Badge>
        },
    },
    {
        accessorKey: "dueDate",
        sortingFn: "datetime",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Due Date
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        enableColumnFilter: true,
        enableSorting: true,
        cell: ({ row }) => <div className="text-sm">{
            formatDistanceToNow(new Date(row.getValue("dueDate")), {
                addSuffix: true,
            })}</div>,
    },

    {
        accessorKey: "actions",
        header: "Actions",
        enableColumnFilter: false,
        enableSorting: false,
        cell: ({ row }) => {
            const projectId = row.original.id
            return (
                <div className="flex items-center space-x-2">
                    <Link
                        className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/80"
                        href={`/dashboard/projects/${projectId}`}>
                        Open
                    </Link>
                </div>
            )
        },
    },
]
