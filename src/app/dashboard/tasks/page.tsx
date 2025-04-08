import { getUserTasks } from '@/lib/actions/get-tasks'
import { SearchParams } from 'next/dist/server/request/search-params'
import { TasksTable } from '@/components/dashboard/tasks/TasksTable'

const TasksPage = async ({ searchParams }: { searchParams: SearchParams }) => {
    const { tasks, message } = await getUserTasks()
    const { status } = searchParams

    if (!tasks) {
        return (
            <div className="w-full mx-auto">
                <h3 className="text-xl font-semibold mb-2">No Tasks Found</h3>
                <p className="text-gray-400">{message}</p>
            </div>
        )
    }

    // Filter tasks by status if status param exists
    const statusValue = Array.isArray(status) ? status[0] : status
    const filteredTasks = status
        ? tasks.filter(task => task.status.toLowerCase() === statusValue?.toLowerCase())
        : tasks

    return (
        <div className="w-full p-4">
            <h2 className="text-2xl font-bold mb-4">Tasks</h2>
            <TasksTable tasks={filteredTasks} />
        </div>
    )
}

export default TasksPage