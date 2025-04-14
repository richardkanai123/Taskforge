import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Task } from '@prisma/client';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface TaskCardProps {
    task: Task;
    overlay?: boolean;
}

export function TaskCard({ task, overlay }: TaskCardProps) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: task.id,
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <Card
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={cn(
                "cursor-grab active:cursor-grabbing",
                isDragging && "opacity-50",
                overlay && "rotate-3"
            )}
        >
            <CardContent className="p-3">
                <div className="flex flex-col gap-2">
                    <div className="text-sm font-medium">{task.title}</div>
                    <div className="flex items-center gap-2">
                        <Badge variant="secondary">{task.priority}</Badge>
                        {task.dueDate && (
                            <span className="text-xs text-muted-foreground">
                                Due {new Date(task.dueDate).toLocaleDateString()}
                            </span>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
