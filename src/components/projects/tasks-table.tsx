import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Sheet, SheetTrigger } from '@/components/ui/sheet'
import { Badge } from '@/components/ui/badge'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { format } from "date-fns"
import { TaskSheet } from '@/components/projects/task-sheet'
import { Task } from "@prisma/client"
interface TasksTableProps {
    tasks: Task[]
}

export function TasksTable({ tasks }: TasksTableProps) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Tasks</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                        {tasks?.length || 0} tasks in total
                    </p>
                </div>
                <Button size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Task
                </Button>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[40%]">Title</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Due Date</TableHead>
                            <TableHead>Priority</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {tasks?.map((task) => (
                            <TableRow key={task.id}>
                                <TableCell className="font-medium">
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
                                <TableCell className="text-muted-foreground">
                                    {task.dueDate ? format(new Date(task.dueDate), 'PP') : '-'}
                                </TableCell>
                                <TableCell>
                                    <Badge variant="outline">{task.priority || 'Normal'}</Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
