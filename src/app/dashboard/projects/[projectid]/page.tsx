import React, { Suspense } from 'react'
import { Params } from 'next/dist/server/request/params'
import { getTasksByProjectId } from '@/lib/actions/get-tasksbyprojectid'
import { GetProjectById } from '@/lib/actions/get-projectbyid'
import { TasksTable } from '@/components/projects/tasks-table'
import { ProjectHeader } from "@/components/projects/project-header"
import { ProjectStats } from "@/components/projects/project-stats"
import { FetchError } from '@/components/ui/fetch-error'
import { getUserdetails } from '@/lib/actions/get-userdetailsbyid'
import { ManageProject } from "@/components/projects/manage-project"

const ProjectPage = async ({ params }: { params: Params }) => {
    const { projectid } = await params

    const [projectResult, tasksResult] = await Promise.all([
        GetProjectById(projectid as string),
        getTasksByProjectId(projectid as string),
    ])

    // Handle API errors
    if (projectResult.status !== 200 || tasksResult.status !== 200) {
        return (
            <div className="p-6 space-y-4">
                {projectResult.status !== 200 && (
                    <FetchError
                        message={projectResult.message}
                        status={projectResult.status}
                    />
                )}
                {tasksResult.status !== 200 && (
                    <FetchError
                        message={tasksResult.message}
                        status={tasksResult.status}
                    />
                )}
            </div>
        )
    }

    // Handle no project found
    if (!projectResult.project) {
        return (
            <div className="p-6">
                <FetchError
                    message="Project not found or you don't have access to it."
                    status="404"
                />
            </div>
        )
    }

    const { project } = projectResult
    const { tasks } = tasksResult
    const { createdAt, description, title, dueDate, status, leadId, githubRepo } = project

    const { user: lead, } = await getUserdetails(leadId as string)

    return (
        <div className="p-6 space-y-8">
            <Suspense fallback={
                <div className="h-24 rounded-lg bg-muted animate-pulse" />
            }>
                <ProjectHeader
                    title={title}
                    description={description}
                    status={status}
                />
            </Suspense>

            <Suspense fallback={
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="h-20 rounded-lg bg-muted animate-pulse" />
                    ))}
                </div>
            }>
                <ProjectStats
                    dueDate={dueDate}
                    lead={lead}
                    githubRepo={githubRepo || ""}
                    createdAt={createdAt}
                />
            </Suspense>



            <Suspense fallback={
                <div className="rounded-lg bg-muted animate-pulse">
                    <div className="h-16 border-b" />
                    {[...Array(3)].map((_, i) => (
                        <div key={i} className="h-14 border-b last:border-none" />
                    ))}
                </div>
            }>
                <TasksTable tasks={tasks || []} />
            </Suspense>
            <Suspense fallback={
                <div className="h-[140px] rounded-lg bg-muted animate-pulse" />
            }>
                <ManageProject projectId={projectid as string} leadId={leadId as string} />
            </Suspense>
        </div>
    )
}

export default ProjectPage