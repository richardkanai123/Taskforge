'use client'
import { SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Task } from '@prisma/client'
import { format, differenceInDays } from 'date-fns'
import Link from 'next/link'

export function TaskSheet({ task }: {
    task: Task,
}) {
    const daysToDeadline = differenceInDays(new Date(task.dueDate), new Date())
    const deadlineText = daysToDeadline > 0
        ? `${daysToDeadline} days remaining`
        : daysToDeadline === 0
            ? 'Due today'
            : `${Math.abs(daysToDeadline)} days overdue`

    return (
        <SheetContent className="w-[400px]">
            <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                    {task.title}
                    <Badge variant={task.status === 'COMPLETED' ? 'default' : 'outline'}>
                        {task.status}
                    </Badge>
                </SheetTitle>
                <p className={`text-sm ${daysToDeadline < 0 ? 'text-red-500' : 'text-muted-foreground'}`}>
                    {deadlineText}
                </p>
            </SheetHeader>
            <div className="w-full mt-6 space-y-6">
                <div className="space-y-2">
                    <Label>Description</Label>
                    <div dangerouslySetInnerHTML={{ __html: task.description }} className="mx-auto w-full prose prose-sm max-w-none"></div>
                </div>
                <div className="text-sm text-muted-foreground">
                    Due: {format(new Date(task.dueDate), 'PPP')}
                </div>
                <div className="flex gap-2">
                    <Button asChild className="flex-1">
                        <Link href={`/dashboard/tasks/${task.id}`}>View Task</Link>
                    </Button>
                </div>
            </div>
        </SheetContent>
    )
}
