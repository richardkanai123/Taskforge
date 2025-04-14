import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { getUserProjects } from '@/lib/actions/get-projects'
import { getUserTasks } from '@/lib/actions/get-tasks'
import { Suspense } from 'react'
import MainStatsCards from '@/components/dashboard/MainStatsCards'
import { TasksBoardWrapper } from '@/components/dashboard/tasks/TasksBoardWrapper'

const Dashboard = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) {
        redirect('/sign-in')
    }

    const { projects, message: projectsMessage, status: projectsStatus } = await getUserProjects()

    const { tasks, message: tasksMessage, status: tasksStatus } = await getUserTasks()


    if (projectsStatus !== 200 || tasksStatus !== 200) {
        return (
            <div className="flex flex-col w-full h-full min-h-screen p-4 md:p-6 gap-4 md:gap-6 overflow-auto mx-auto align-middle justify-center">
                <h1 className="text-sm font-semibold">Hey {session.user?.name},</h1>
                <h2 className="text-sm font-semibold">Dashboard</h2>
                <div className="flex flex-col w-full h-full min-h-screen p-4 md:p-6 gap-4 md:gap-6 overflow-auto mx-auto align-middle justify-center">
                    <h1 className="text-sm font-semibold">Hey {session.user?.name},</h1>
                    <h2 className="text-sm font-semibold">Dashboard</h2>
                    <p className="text-sm text-muted-foreground">{projectsMessage}</p>
                    <p className="text-sm text-muted-foreground">{tasksMessage}</p>
                </div>
            </div>
        )
    }



    const stats = {
        totalTasks: tasks?.length || 0,
        completedTasks: tasks?.filter((task) => task.status === "COMPLETED").length || 0,
        ongoingTasks: tasks?.filter((task) => task.status === "IN_PROGRESS").length || 0,
        activeProjects: projects?.filter((project) => project.status === "OPEN" || project.status === "IN_PROGRESS").length || 0,
        totalProject: projects?.length || 0,
        overdueTasksCount: tasks?.filter(task =>
            task.status !== "COMPLETED" &&
            task.dueDate &&
            new Date(task.dueDate) < new Date()
        ).length || 0,
        highPriorityTasks: tasks?.filter(task => task.priority === "L1").length || 0,
        tasksThisWeek: tasks?.filter(task => {
            if (!task.dueDate) return false;
            const dueDate = new Date(task.dueDate);
            const today = new Date();
            const nextWeek = new Date();
            nextWeek.setDate(today.getDate() + 7);
            return dueDate >= today && dueDate <= nextWeek;
        }).length || 0,
        projectCompletionRate: projects ?
            Math.round((projects.filter(p => p.status === "COMPLETED").length / projects.length) * 100) : 0
    }


    return (
        <div className="flex flex-col w-full h-full min-h-screen p-4 md:p-6 gap-4 md:gap-6 mx-auto align-middle justify-center">

            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-sm font-semibold">Hey {session.user?.name},</h1>
                <h2 className="text-sm font-semibold">Dashboard</h2>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Suspense fallback={
                    <div className='w-full flex justify-around mx-auto animate-pulse'>
                        {/* four animating cards */}
                        <div className="w-1/2 h-24 bg-gray-200 rounded-lg"></div>
                        <div className="w-1/2 h-24 bg-gray-200 rounded-lg"></div>
                        <div className="w-1/2 h-24 bg-gray-200 rounded-lg"></div>
                        <div className="w-1/2 h-24 bg-gray-200 rounded-lg"></div>
                    </div>
                }>
                    <MainStatsCards stats={stats} />
                </Suspense>
            </div>



            {/* tasks kanban board */}
            <Suspense fallback={
                <div className='w-full flex justify-around mx-auto animate-pulse'>
                    <div className="w-full h-24 bg-gray-200 rounded-lg">
                    </div>
                </div>
            }>
                <TasksBoardWrapper tasks={(tasks ?? []).map(task => ({
                    ...task,
                    project: undefined
                }))} />



            </Suspense>



        </div >
    )
}

export default Dashboard