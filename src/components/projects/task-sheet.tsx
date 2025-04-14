'use client'
import { SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { Label } from '@/components/ui/label'
import { Task } from '@prisma/client'

export function TaskSheet({ task }: {
    task: Task,
}) {
    return (
        <SheetContent className="w-[400px]">
            <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                    {task.title}
                    <Badge variant={task.status === 'COMPLETED' ? 'default' : 'outline'}>
                        {task.status}
                    </Badge>
                </SheetTitle>
            </SheetHeader>
            <div className="w-full mt-6 space-y-6">
                <div className="space-y-2">
                    <Label>Description</Label>
                    <div dangerouslySetInnerHTML={{ __html: task.description }} className="mx-auto w-full"></div>
                </div>
                <div className="w-full space-y-2">
                    <Label>Due Date</Label>
                    <Calendar selected={new Date(task.dueDate)} initialFocus={true} mode="single" />
                </div>
                <div className="flex gap-2">
                    <Button className="flex-1">Save Changes</Button>
                    <Button variant="destructive">Delete Task</Button>
                </div>
            </div>
        </SheetContent>
    )
}
