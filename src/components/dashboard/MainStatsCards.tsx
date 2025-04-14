import React, { JSX } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Activity, CheckCircle2Icon, Clock, ListTodo } from 'lucide-react'
import { cn } from "@/lib/utils"

const MainStatsCards = ({ stats }: {
    stats: {
        totalTasks: number
        completedTasks: number
        ongoingTasks: number
        activeProjects: number
        totalProject: number
        overdueTasksCount: number
        highPriorityTasks: number
        tasksThisWeek: number
        projectCompletionRate: number
    }
}) => {
    return (
        <>
            <StatCard
                icon={<ListTodo className="text-blue-500" />}
                title='Total Tasks'
                value={stats.totalTasks}
                description={`${stats.highPriorityTasks} high priority`}
                className="bg-blue-500/50"
            />
            <StatCard
                icon={<CheckCircle2Icon className="text-green-500" />}
                title='Projects'
                value={stats.totalProject}
                trend={stats.projectCompletionRate.toString()}
                description="Completion rate"
                className="bg-green-500/50"
            />
            <StatCard
                icon={<Clock className="text-orange-500" />}
                title='Due This Week'
                value={stats.tasksThisWeek}
                trend={stats.overdueTasksCount > 0 ? `-${stats.overdueTasksCount}` : "0"}
                description={`${stats.overdueTasksCount} overdue`}
                className="bg-orange-500/50"
            />
            <StatCard
                icon={<Activity className="text-purple-500" />}
                title='Active Projects'
                value={stats.activeProjects}
                description="In progress"
                className="bg-purple-500/50"
            />
        </>
    )
}

function StatCard({
    icon,
    title,
    value,
    trend,
    description,
    className
}: {
    icon: JSX.Element
    title: string
    value: number
    trend?: string
    description?: string
    className?: string
}) {
    return (
        <Card className={cn(
            "transition-all  duration-300 hover:shadow-md hover:-translate-y-1",
            className
        )}>
            <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-4">
                    <div className="p-2 rounded-lg bg-card shadow-sm">
                        {icon}
                    </div>
                    {trend && (
                        <span className={cn(
                            "text-xs font-medium px-2 py-1 rounded-full",
                            trend.startsWith("+") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                        )}>
                            {trend}%
                        </span>
                    )}
                </div>
                <div className="space-y-1">
                    <h3 className="text-3xl font-bold tracking-tight  dark:text-white">{value}</h3>
                    <p className="text-sm font-medium text-muted-foreground">{title}</p>
                    {description && (
                        <p className="text-xs text-muted-foreground">{description}</p>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}

export default MainStatsCards