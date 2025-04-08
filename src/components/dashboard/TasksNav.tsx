'use client'
import React from 'react'
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '../ui/sidebar'
import { CheckCircle2, Circle, Clock, ListTodo, LucideListTodo, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { TaskStatus } from '@prisma/client'
import { usePathname } from 'next/navigation'

const getStatusIcon = (status: TaskStatus) => {
    switch (status) {
        case TaskStatus.COMPLETED:
            return <CheckCircle2 className="h-4 w-4 text-green-500" />
        case TaskStatus.IN_PROGRESS:
            return <Clock className="h-4 w-4 text-yellow-500" />
        default:
            return <Circle className="h-4 w-4 text-gray-400" />
    }
}
const TasksNav = () => {
    const pathname = usePathname()
    return (
        < SidebarGroup>
            <div className="flex items-center justify-between px-2 mb-2">
                <SidebarGroupLabel>
                    <div className="flex items-center gap-2">
                        <ListTodo className="h-4 w-4" />
                        Tasks
                    </div>
                </SidebarGroupLabel>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    asChild
                >
                    <Link href="/dashboard/tasks/create-new">
                        <Plus className="h-4 w-4" />
                    </Link>
                </Button>
            </div>
            <SidebarMenu>
                <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                        <Link className={`${pathname === `/dashboard/tasks` ? 'text-primary' : ''}`} href="/dashboard/tasks">
                            <LucideListTodo className="h-4 w-4 text-muted-foreground group-hover:text-primary flex-shrink-0" />
                            <span>Your Tasks</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                        <Link href="/dashboard/tasks?status=in_progress">
                            {getStatusIcon(TaskStatus.IN_PROGRESS)}
                            <span>In Progress</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                        <Link href="/dashboard/tasks?status=completed">
                            {getStatusIcon(TaskStatus.COMPLETED)}
                            <span>Completed</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                        <Link href="/dashboard/tasks?status=open">
                            {getStatusIcon(TaskStatus.OPEN)}
                            <span>Open</span>
                        </Link>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            </SidebarMenu>
        </SidebarGroup >
    )
}

export default TasksNav