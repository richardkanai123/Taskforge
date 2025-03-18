import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Activity, CheckCircle2, Clock, ListTodo } from "lucide-react"
import { sampleTasks, sampleProjects } from "@/app/data/Data"

const Dashboard = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    if (!session) {
        redirect('/sign-in')
    }

    // Calculate dashboard stats
    const stats = {
        totalTasks: sampleTasks.length,
        completedTasks: sampleTasks.filter(task => task.status === 'IN_PROGRESS').length,
        inProgressTasks: sampleTasks.filter(task => task.status === 'IN_PROGRESS').length,
        activeProjects: sampleProjects.filter(project => project.status === 'IN_PROGRESS').length
    }

    return (
        <div className="flex flex-col w-full h-full min-h-screen p-4 md:p-6 gap-4 md:gap-6 overflow-auto mx-auto align-middle justify-center">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
                        <ListTodo className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.totalTasks}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Completed</CardTitle>
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.completedTasks}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">In Progress</CardTitle>
                        <Clock className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.inProgressTasks}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
                        <Activity className="h-4 w-4 text-purple-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.activeProjects}</div>
                    </CardContent>
                </Card>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6 flex-1">
                {/* Recent Tasks */}
                <Card className="flex flex-col">
                    <CardHeader>
                        <CardTitle>Recent Tasks</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 overflow-auto">
                        <div className="space-y-4">
                            {sampleTasks.slice(0, 5).map(task => (
                                <div
                                    key={task.id}
                                    className="flex items-center gap-4 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                                >
                                    <div className={[
                                        'h-2 w-2 shrink-0 rounded-full',
                                        task.status === 'IN_PROGRESS'
                                            ? 'bg-blue-500'
                                            : task.status === 'OPEN'
                                                ? 'bg-gray-300'
                                                : 'bg-green-500'
                                    ].join(' ')} />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium truncate">{task.title}</p>
                                        <p className="text-xs text-muted-foreground truncate">
                                            {task.description}
                                        </p>
                                    </div>
                                    <div className="text-xs font-medium text-muted-foreground shrink-0">
                                        {task.progress}%
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Project Overview */}
                <Card className="flex flex-col">
                    <CardHeader>
                        <CardTitle>Project Status</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 overflow-auto">
                        <div className="space-y-6">
                            {sampleProjects.map(project => {
                                const projectTasks = sampleTasks.filter(task => task.projectId === project.id)
                                const completedTasks = projectTasks.filter(task => task.status !== 'IN_PROGRESS' && task.status !== 'OPEN').length
                                const progress = (completedTasks / projectTasks.length) * 100 || 0

                                return (
                                    <div key={project.id} className="space-y-2">
                                        <div className="flex items-center justify-between gap-2">
                                            <p className="text-sm font-medium truncate flex-1">
                                                {project.title}
                                            </p>
                                            <span className="text-xs text-muted-foreground whitespace-nowrap">
                                                {completedTasks}/{projectTasks.length} tasks
                                            </span>
                                        </div>
                                        <div className="h-2 rounded-full bg-secondary overflow-hidden">
                                            <div
                                                className="h-full rounded-full bg-primary transition-all duration-300"
                                                style={{ width: `${progress}%` }}
                                            />
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default Dashboard