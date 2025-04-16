'use client'
import React, { useState } from 'react'
import { Calendar, dateFnsLocalizer, Views } from 'react-big-calendar'
import { format } from 'date-fns/format'
import { parse } from 'date-fns/parse'
import { startOfWeek } from 'date-fns/startOfWeek'
import { getDay } from 'date-fns/getDay'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { enUS } from 'date-fns/locale'
import { TaskEvent, priorityColors } from './types'
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogCancel,
    AlertDialogFooter,
} from "@/components/ui/alert-dialog"
import { TaskWithProject } from '@/lib/types'
import Link from 'next/link'

const locales = {
    'en-US': enUS
}

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales
})

const eventStyleGetter = (event: TaskEvent) => {
    return {
        style: {
            backgroundColor: priorityColors[event.priority as keyof typeof priorityColors],
            borderRadius: '0.5rem',
            opacity: event.completed ? 0.6 : 1,
            color: '#fff',
            border: '0px',
            padding: '0.25rem'
        }
    }
}

const DashboardCalendar = ({ tasks }: { tasks: TaskWithProject[] }) => {
    const [selectedEvent, setSelectedEvent] = useState<TaskEvent | null>(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const handleSelectEvent = (event: TaskEvent) => {
        setSelectedEvent(event)
        setIsDialogOpen(true)
    }

    return (
        <div className="h-[700px] max-h-fit bg-white dark:bg-gray-700 dark:text-white/80 rounded-lg">


            <div className="h-full [&_.rbc-calendar]:h-full [&_.rbc-calendar]:bg-transparent
                [&_.rbc-header]:bg-gray-50 [&_.rbc-header]:dark:bg-gray-800 [&_.rbc-header]:p-2 [&_.rbc-header]:text-gray-600 [&_.rbc-header]:dark:text-gray-300
                [&_.rbc-month-view]:border-gray-200 [&_.rbc-month-view]:dark:border-gray-700
                [&_.rbc-day-bg]:bg-white [&_.rbc-day-bg]:dark:bg-gray-900
                [&_.rbc-off-range-bg]:bg-gray-50 [&_.rbc-off-range-bg]:dark:bg-gray-800/50
                [&_.rbc-today]:bg-blue-50 [&_.rbc-today]:dark:bg-blue-900/20
                [&_.rbc-toolbar]:flex [&_.rbc-toolbar]:justify-between [&_.rbc-toolbar]:items-center [&_.rbc-toolbar]:mb-4
                [&_.rbc-btn-group]:flex [&_.rbc-btn-group]:gap-px
                [&_.rbc-toolbar_button]:bg-white [&_.rbc-toolbar_button]:dark:bg-gray-800 
                [&_.rbc-toolbar_button]:border-gray-200 [&_.rbc-toolbar_button]:dark:text-white [&_.rbc-toolbar_button]:dark:border-gray-700
                [&_.rbc-toolbar_button:hover]:bg-gray-50 [&_.rbc-toolbar_button:hover]:dark:bg-gray-700
                [&_.rbc-toolbar_button.rbc-active]:bg-gray-100 [&_.rbc-toolbar_button.rbc-active]:dark:bg-gray-600
                [&_.rbc-time-content]:bg-white [&_.rbc-time-content]:dark:bg-gray-900
                [&_.rbc-time-header]:bg-gray-50 [&_.rbc-time-header]:dark:bg-gray-800
                [&_.rbc-time-slot]:text-gray-500 [&_.rbc-time-slot]:dark:text-gray-400
                [&_.rbc-show-more]:text-blue-500 [&_.rbc-show-more]:dark:text-blue-400
                [&_.rbc-show-more]:hover:underline
                [&_.rbc-current-time-indicator]:bg-blue-500">
                <Calendar
                    localizer={localizer}
                    events={tasks.map(task => ({
                        ...task,
                        start: new Date(task.createdAt),
                        end: new Date(task.dueDate),
                        title: task.title,
                        description: task.description,
                        priority: task.priority,
                        completed: task.status === 'COMPLETED',
                        assignedId: task.assignedId,
                        project: {
                            id: task.projectId,
                            title: task.project.title
                        },
                    }))}
                    startAccessor="start"
                    endAccessor="end"
                    eventPropGetter={eventStyleGetter}
                    onSelectEvent={handleSelectEvent}
                    views={['month', 'week', 'day', 'agenda']}
                    defaultView={Views.MONTH}
                    tooltipAccessor={event =>
                        `${event.title}\n${event.description || ''}\nPriority: ${event.priority}`
                    }
                    popup
                />
            </div>

            <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <AlertDialogContent className="dark:bg-gray-800">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="flex items-center gap-2 dark:text-white">
                            {selectedEvent?.title}
                            <span className="px-2 py-1 text-xs text-white rounded-full"
                                style={{ backgroundColor: selectedEvent?.priority ? priorityColors[selectedEvent.priority as keyof typeof priorityColors] : undefined }}>
                                {selectedEvent?.priority}
                            </span>
                        </AlertDialogTitle>
                        <AlertDialogDescription className="space-y-2">
                            <p className="text-gray-500 text-lg dark:text-gray-400">Project: {selectedEvent?.project.title}</p>
                            {selectedEvent?.dueDate && (
                                <p className="text-gray-500 dark:text-gray-400">
                                    Deadline: {format(selectedEvent.dueDate, 'PPpp')}
                                </p>
                            )}
                            <p className="text-gray-500 dark:text-gray-400">
                                Status: {selectedEvent?.completed ? 'Completed' : 'Pending'}
                            </p>
                            <p className="text-gray-500 dark:text-gray-400">
                                Duration: {format(selectedEvent?.start || new Date(), 'p')} - {format(selectedEvent?.end || new Date(), 'p')}
                            </p>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className="bg-primary dark:hover:bg-gray-600">
                            <Link href={`/dashboard/tasks/${selectedEvent?.id}`}>View Detail</Link>
                        </AlertDialogCancel>

                        <AlertDialogCancel className="dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600">
                            Close
                        </AlertDialogCancel>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

export default DashboardCalendar