import { AssigneeCard } from '@/components/dashboard/tasks/AssigneeCard'
import { ProjectLinkCard } from '@/components/projects/ProjectLinkCard'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { GetTaskById } from '@/lib/actions/get-taskbyid'
import { getUserdetails } from '@/lib/actions/get-userdetailsbyid'
import { Terminal, } from 'lucide-react'
import { Suspense } from 'react'
import { TaskHeader } from '@/components/dashboard/tasks/TaskHeader'
import { TaskStatusCard } from '@/components/dashboard/tasks/TaskStatusCard'
import { Params } from 'next/dist/server/request/params'
import { TaskActions } from '@/components/dashboard/tasks/TaskActions'

const ProjectPage = async ({ params }: { params: Params }) => {
    const { taskid } = await params

    const { task, message, status: resStatus } = await GetTaskById(taskid as string)

    if (resStatus !== 200) {
        return (
            <div className="w-3/4 m-auto pt-20 flex items-center align-middle justify-center">

                <Alert>
                    <Terminal className="h-4 w-4" />
                    <AlertTitle>Heads up!</AlertTitle>
                    <AlertDescription>
                        {message}
                    </AlertDescription>
                </Alert>
            </div>

        )
    }

    if (!task) {
        return (
            <div className="w-3/4 m-auto pt-20 flex items-center align-middle justify-center">

                <Alert>
                    <Terminal className="h-4 w-4" />
                    <AlertTitle>Heads up!</AlertTitle>
                    <AlertDescription>
                        Task not found!
                    </AlertDescription>
                </Alert>
            </div>
        )
    }

    const { title, assignedId, projectId, createdAt, description, dueDate, priority, progress, status } = task
    const { user: assignee } = await getUserdetails(assignedId as string)

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <TaskHeader
                title={title}
                createdAt={createdAt}
                dueDate={dueDate}
                priority={priority}
            />
            <Suspense fallback={<span>Loading...</span>}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <TaskStatusCard assignee={assignedId as string} status={status} progress={progress} />
                    <AssigneeCard assignee={assignee} taskId={taskid as string} />
                </div>
            </Suspense>

            <div className=" rounded-lg p-4 mb-8">
                <h2 className="font-semibold mb-4">Description</h2>
                <div className="prose max-w-none px-4" dangerouslySetInnerHTML={{ __html: description }}></div>
            </div>

            <div className=" rounded-lg shadow p-4">
                <h2 className="font-semibold mb-2">Details</h2>
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <Suspense fallback={<span>Loading...</span>}>
                            <ProjectLinkCard projectid={projectId as string} />
                        </Suspense>
                    </div>
                    <div>
                        <Suspense fallback={<span>Loading...</span>}>
                            <TaskActions
                                taskId={taskid as string}
                                assignedId={assignedId as string}
                                status={status}
                            />
                        </Suspense>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectPage