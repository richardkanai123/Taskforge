import React from 'react'
import { Params } from 'next/dist/server/request/params'
import { getTasksByProjectId } from '@/lib/actions/get-tasksbyprojectid'
import { GetProjectById } from '@/lib/actions/get-projectbyid'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Sheet, SheetTrigger } from '@/components/ui/sheet'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CalendarDays, CheckCircle, Clock, Users, GitBranch, Calendar } from 'lucide-react'
import { TaskSheet } from '@/components/projects/task-sheet'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { format } from "date-fns"

const ProjectPage = async ({ params }: { params: Params }) => {
    const { projectid } = await params

    const { project, message, status: projectFetchStatus } = await GetProjectById(projectid as string)
    const { tasks, message: taskMessage, status: taskFetchStatus } = await getTasksByProjectId(projectid as string)

    if (!project) {
        return (
            <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="col-span-full">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle>Project not found</CardTitle>
                        </CardHeader>
                    </Card>
                </div>
            </div>
        )
    }
    const { createdAt, description, title, dueDate, id, status, updatedAt, leadId, githubRepo } = project

    return (
        <div className="p-6 space-y-6">
            <Card className="col-span-full">
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>{title}</CardTitle>
                            <div className="text-sm text-muted-foreground mt-2"
                                dangerouslySetInnerHTML={{ __html: description }}></div>
                        </div>
                        <Badge variant={status === 'COMPLETED' ? 'default' : 'secondary'}>
                            {status}
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <div>
                            <p className="text-muted-foreground">Due Date</p>
                            <p>{dueDate ? format(new Date(dueDate), 'PP') : 'Not set'}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <div>
                            <p className="text-muted-foreground">Project Lead</p>
                            <p>{leadId || 'Unassigned'}</p>
                        </div>
                    </div>
                    {githubRepo && (
                        <div className="flex items-center gap-2">
                            <GitBranch className="w-4 h-4 text-muted-foreground" />
                            <a href={githubRepo} className="hover:underline" target="_blank" rel="noopener">
                                Repository
                            </a>
                        </div>
                    )}
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Tasks ({tasks?.length || 0})</CardTitle>
                    <Button>Add New Task</Button>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Due Date</TableHead>
                                <TableHead>Priority</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {tasks?.map((task) => (
                                <TableRow key={task.id}>
                                    <TableCell>
                                        <Sheet>
                                            <SheetTrigger asChild>
                                                <button className="text-left hover:underline">
                                                    {task.title}
                                                </button>
                                            </SheetTrigger>
                                            <TaskSheet task={task} />
                                        </Sheet>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={task.status === 'COMPLETED' ? 'default' : 'secondary'}>
                                            {task.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        {task.dueDate ? format(new Date(task.dueDate), 'PP') : '-'}
                                    </TableCell>
                                    <TableCell>
                                        {task.priority || 'Normal'}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}

export default ProjectPage