'use client'
import { DndContext, DragEndEvent, DragStartEvent, DragOverlay, closestCorners, DragOverEvent } from '@dnd-kit/core';
import { useState } from 'react';
import { TaskColumn } from './TaskColumn';
import { TaskCard } from './TaskCard';
import { Task, TaskStatus } from '@prisma/client';

const TASK_STATUS = ['OPEN', 'IN_PROGRESS', 'COMPLETED'] as const;

interface TasksBoardProps {
    tasks: Task[];
    onTaskMove?: (taskId: string, status: string) => void;
    disabled?: boolean;
}

export function TasksBoard({ tasks, onTaskMove, disabled }: TasksBoardProps) {
    const [activeId, setActiveId] = useState<string | null>(null);
    const [currentStatus, setCurrentStatus] = useState<string | null>(null);

    const tasksByStatus = TASK_STATUS.reduce((acc, status) => {
        acc[status] = tasks.filter((task) => task.status === status);
        return acc;
    }, {} as Record<string, Task[]>);

    const handleDragStart = (event: DragStartEvent) => {
        const { active } = event;
        setActiveId(active.id.toString());
        setCurrentStatus(tasks.find(task => task.id === active.id)?.status || null);
    };

    const handleDragOver = (event: DragOverEvent) => {
        const { over } = event;
        if (!over) return;

        const activeStatus = currentStatus;
        const overStatus = over.id.toString().split('-')[0];

        if (activeStatus !== overStatus) {
            setCurrentStatus(overStatus);
        }
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over) {
            const overStatus = over.id.toString().split('-')[0];
            if (active.id !== over.id && TASK_STATUS.includes(overStatus as TaskStatus)) {
                onTaskMove?.(active.id.toString(), overStatus);
            }
        }

        setActiveId(null);
        setCurrentStatus(null);
    };

    return (
        <DndContext
            collisionDetection={closestCorners}
            onDragStart={disabled ? undefined : handleDragStart}
            onDragOver={disabled ? undefined : handleDragOver}
            onDragEnd={disabled ? undefined : handleDragEnd}
        >
            <div className="flex gap-4 h-full overflow-x-auto p-4">
                {TASK_STATUS.map((status) => (
                    <TaskColumn
                        key={status}
                        status={status}
                        tasks={tasksByStatus[status]}
                    />
                ))}
            </div>

            <DragOverlay>
                {activeId ? (
                    <TaskCard
                        task={tasks.find((task) => task.id === activeId)!}
                        overlay
                    />
                ) : null}
            </DragOverlay>
        </DndContext>
    );
}
