'use client'

import { TasksBoard } from './TasksBoard'
import { updateTaskStatus } from '@/lib/actions/update-task-status'
import { Task } from '@/lib/types'
import { TaskStatus } from '@prisma/client'
import { useOptimistic, useTransition } from 'react'
import { toast } from 'react-hot-toast'

export function TasksBoardWrapper({ tasks }: { tasks: Task[] }) {
    const [isPending, startTransition] = useTransition()
    const [optimisticTasks, updateOptimisticTasks] = useOptimistic<Task[]>(tasks)

    const handleTaskMove = async (taskId: string, newStatus: string) => {
        const originalTasks = [...optimisticTasks]
        const taskToUpdate = originalTasks.find(t => t.id === taskId)

        if (!taskToUpdate) return

        try {
            startTransition(async () => {
                const statusEnum = newStatus as TaskStatus

                // Optimistically update the task
                updateOptimisticTasks(current =>
                    current.map(task =>
                        task.id === taskId
                            ? {
                                ...task,
                                status: statusEnum,
                                updatedAt: new Date()
                            }
                            : task
                    )
                )

                const result = await updateTaskStatus(taskId, statusEnum)

                if (result.status === 200) {
                    toast.success('Task status updated')
                } else {
                    throw new Error(result.message)
                }
            })
        } catch (error) {
            // Revert to original state on error
            updateOptimisticTasks(originalTasks)
            toast.error(error instanceof Error ? error.message : 'Failed to update task status')
        }
    }

    return (
        <div className="relative">
            {isPending && (
                <div className="absolute inset-0 bg-background/50 backdrop-blur-sm z-10" />
            )}
            <TasksBoard
                tasks={optimisticTasks}
                onTaskMove={handleTaskMove}
                disabled={isPending}
            />
        </div>
    )
}
