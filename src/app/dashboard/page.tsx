import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getUserProjects } from "@/lib/actions/get-projects";
import { getUserTasks } from "@/lib/actions/get-tasks";
import { Suspense } from "react";
import MainStatsCards from "@/components/dashboard/MainStatsCards";
import { DataTable } from "@/components/tables/ProjectsTable";
import { columns } from "@/components/tables/ProjectsTableColumns";
import RecentActivity from "@/components/dashboard/RecentActivity";
import TasksOverviewChart from "@/components/dashboard/TasksOverviewChart";

const Dashboard = async () => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        redirect("/sign-in");
    }
    const [
        { projects, message: projectsMessage, status: projectsStatus },
        { tasks, message: tasksMessage, status: tasksStatus },
    ] = await Promise.all([getUserProjects(), getUserTasks()]);

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
        );
    }

    const stats = {
        totalTasks: tasks?.length || 0,
        completedTasks:
            tasks?.filter((task) => task.status === "COMPLETED").length || 0,
        ongoingTasks:
            tasks?.filter((task) => task.status === "IN_PROGRESS").length || 0,
        activeProjects:
            projects?.filter(
                (project) =>
                    project.status === "OPEN" || project.status === "IN_PROGRESS"
            ).length || 0,
        totalProject: projects?.length || 0,
        overdueTasksCount:
            tasks?.filter(
                (task) =>
                    task.status !== "COMPLETED" &&
                    task.dueDate &&
                    new Date(task.dueDate) < new Date()
            ).length || 0,
        highPriorityTasks:
            tasks?.filter((task) => task.priority === "L1").length || 0,
        tasksThisWeek:
            tasks?.filter((task) => {
                if (!task.dueDate) return false;
                const dueDate = new Date(task.dueDate);
                const today = new Date();
                const nextWeek = new Date();
                nextWeek.setDate(today.getDate() + 7);
                return dueDate >= today && dueDate <= nextWeek;
            }).length || 0,
        projectCompletionRate: projects
            ? Math.round(
                (projects.filter((p) => p.status === "COMPLETED").length /
                    projects.length) *
                100
            )
            : 0,
        recentActivity:
            tasks
                ?.sort(
                    (a, b) =>
                        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
                )
                .slice(0, 5) || [],
        tasksByPriority: {
            high: tasks?.filter((t) => t.priority === "L1").length || 0,
            medium: tasks?.filter((t) => t.priority === "L2").length || 0,
            low: tasks?.filter((t) => t.priority === "L3").length || 0,
        },
        tasksTrend: tasks?.reduce((acc, task) => {
            const month = new Date(task.createdAt).getMonth();
            acc[month] = (acc[month] || 0) + 1;
            return acc;
        }, Array(12).fill(0)),
    };

    return (
        <div className="flex flex-col w-full h-full min-h-screen p-4 md:p-6 gap-4 md:gap-6 mx-auto align-middle justify-center">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-sm font-semibold">Hey {session.user?.name},</h1>
                <h2 className="text-sm font-semibold">Dashboard</h2>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Suspense
                    fallback={
                        <div className="w-full flex justify-around mx-auto animate-pulse">
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

            {/* New Insights Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Suspense
                    fallback={
                        <div className="h-64 bg-gray-100 animate-pulse rounded-lg" />
                    }>
                    <TasksOverviewChart tasks={tasks ?? []} />
                </Suspense>
                <Suspense
                    fallback={
                        <div className="h-64 bg-gray-100 animate-pulse rounded-lg" />
                    }>
                    <RecentActivity tasks={stats.recentActivity} />
                </Suspense>
            </div>

            <Suspense
                fallback={
                    <div className="w-full space-y-4 animate-pulse">
                        {/* Table header */}
                        <div className="h-10 bg-gray-200 rounded-md w-full" />
                        {/* Table rows */}
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div
                                key={i}
                                className="flex gap-4">
                                <div className="h-12 bg-gray-200 rounded-md w-1/4" />
                                <div className="h-12 bg-gray-200 rounded-md w-1/4" />
                                <div className="h-12 bg-gray-200 rounded-md w-1/4" />
                                <div className="h-12 bg-gray-200 rounded-md w-1/4" />
                            </div>
                        ))}
                    </div>
                }>
                <>
                    <h1>Recent Projects</h1>
                    <DataTable
                        data={(projects ?? []).map((p) => ({
                            ...p,
                            progress: p.progress ?? 0,
                        }))}
                        columns={columns}
                    />
                </>
            </Suspense>
        </div>
    );
};

export default Dashboard;
