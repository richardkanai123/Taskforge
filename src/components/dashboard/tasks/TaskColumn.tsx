import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { TaskCard } from './TaskCard';
import { Task } from '@prisma/client';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

interface TaskColumnProps {
    status: string;
    tasks: Task[];
}

export function TaskColumn({ status, tasks }: TaskColumnProps) {
    const { setNodeRef } = useDroppable({
        id: `${status}-column`,
    });

    return (
        <Card className="flex-shrink-0 w-80">
            <CardHeader>
                <CardTitle className="text-sm font-medium">
                    {status} ({tasks.length})
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div
                    ref={setNodeRef}
                    className="space-y-2"
                >
                    <SortableContext
                        items={tasks.map(t => t.id)}
                        strategy={verticalListSortingStrategy}
                    >
                        {tasks.map((task) => (
                            <TaskCard key={task.id} task={task} />
                        ))}
                    </SortableContext>
                </div>
            </CardContent>
        </Card>
    );
}
