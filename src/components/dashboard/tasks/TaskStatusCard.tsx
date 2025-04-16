import { auth } from '@/lib/auth'
import { CheckCircle2, Clock } from 'lucide-react'
import { headers } from 'next/headers'
import { FcOpenedFolder } from 'react-icons/fc'

interface TaskStatusCardProps {
    status: string
    progress: number
    assignee: string
}

export const TaskStatusCard = async ({ status, progress, assignee }: TaskStatusCardProps) => {

    const session = await auth.api.getSession({
        headers: await headers(),
    });


    const isAssignee = session?.user?.id === assignee


    return (
        <div className="bg-card p-4 rounded-lg shadow">
            <h2 className="font-semibold mb-2">Status {status}</h2>
            <div className="flex items-center gap-4">
                {
                    status === "COMPLETED" ? (<CheckCircle2 className="h-4 w-4 text-green-500" />) :
                        status === "IN_PROGRESS" ? (<Clock className="h-4 w-4 text-yellow-500" />) :
                            (<FcOpenedFolder className="h-4 w-4 text-gray-400" />)
                }
                <div className="flex-1">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
                    </div>
                </div>
                <span className="text-sm text-gray-600">{progress}%</span>
            </div>

            {
                isAssignee ? (
                    // complete task by assignee
                    status === "COMPLETED" ? (
                        <p className="mt-4 text-green-500">You have completed this task</p>
                    ) : (
                        <p className="mt-4 text-gray-500">
                            You have not completed this task
                        </p>
                    )
                ) : (
                    <p className="mt-4 text-gray-500">You are not assigned to this task</p>
                )
            }
        </div>
    )
}
