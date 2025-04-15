'use server'
// import { TaskStatus } from "@prisma/client"
// import { prisma } from "../Prisma";


//   function StatusValue(status:string){
//         switch (status) {
//             case 'completed':
//                 return { status: TaskStatus.COMPLETED };
//             case 'ongoing':
//                 return { status: TaskStatus.IN_PROGRESS };
//             case 'open':
//                 return { status: TaskStatus.OPEN };
//             default:
//                 throw new Error('Invalid status');
//         }
//     }
export async function updateTaskStatus(taskId: string, status: string) {
    
    try
    {
        console.log(taskId, status)
       
    } catch (error) {
        if (error instanceof Error) return { status: 500, task: null, message: error.message }
        
        return { status: 500, task: null, message: 'Failed to update task' }
    }
}
