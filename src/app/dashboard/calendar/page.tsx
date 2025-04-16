import DashboardCalendar from '@/components/dashboard/Calendar/DashboardCalendar'
import { getUserTasks } from '@/lib/actions/get-tasks'
import { TriangleAlertIcon } from 'lucide-react'


const CalendarPage = async () => {
    const { tasks, message, status } = await getUserTasks()

    if (!tasks || status !== 200) {
        return (
            <div className="flex flex-col items-center justify-center w-full h-[50vh]">
                <div className="text-center space-y-4">
                    <TriangleAlertIcon className="h-12 w-12 text-yellow-500 mx-auto" />
                    <h3 className="text-2xl font-semibold">No Tasks Found</h3>
                    {message && (
                        <p className="text-gray-500 max-w-md mx-auto">{message}</p>
                    )}
                </div>
            </div>
        )
    }

    return (
        <div className='p-4 mx-auto w-full'>
            <DashboardCalendar tasks={tasks} />
        </div>
    )
}

export default CalendarPage