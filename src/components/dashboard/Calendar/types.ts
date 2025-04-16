import { TaskWithProject } from '@/lib/types'

export type TaskPriority = 'L1' | 'L2' | 'L3' | 'L4' | 'L5'

export interface TaskEvent extends TaskWithProject {
    start: Date
    end: Date
    title: string
    description: string
    priority: TaskPriority
    completed: boolean
}

export const priorityColors: Record<TaskPriority, string> = {
    L1: 'rgb(239 68 68)', // red
    L2: 'rgb(249 115 22)', // orange
    L3: 'rgb(245 158 11)', // amber
    L4: 'rgb(34 197 94)', // green
    L5: 'rgb(59 130 246)', // blue
}
