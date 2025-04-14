'use server'
import { TaskStatus } from "@prisma/client"
import { prisma } from "../Prisma";


  function StatusValue(status:string){
        switch (status) {
            case 'completed':
                return { status: TaskStatus.COMPLETED };
            case 'ongoing':
                return { status: TaskStatus.IN_PROGRESS };
            case 'open':
                return { status: TaskStatus.OPEN };
            default:
                throw new Error('Invalid status');
        }
    }
export async function updateTaskStatus(taskId: string, status: string) {
  
    try
    {
        const value = StatusValue(status)

        const updatedTask = await prisma.task.update({
            where: { id: taskId },
            data: value
        })
        return { status: 200, task: updatedTask, message: 'Task updated successfully' }
    } catch (error) {
        if (error instanceof Error) return { status: 500, task: null, message: error.message }
        
        return { status: 500, task: null, message: 'Failed to update task' }
    }
}
