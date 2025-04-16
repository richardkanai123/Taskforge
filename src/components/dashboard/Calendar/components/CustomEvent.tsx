import React from 'react'
import { format } from 'date-fns'
import { TaskEvent } from '../types'

interface CustomEventProps {
    event: TaskEvent;
}

export const CustomEvent: React.FC<CustomEventProps> = ({ event }) => (
    <div className="h-full p-0.5">
        <div className="font-semibold truncate">{event.title}</div>
        {event.dueDate && (
            <div className="text-xs text-white/90">
                🕒 {format(event.dueDate, 'MMM dd, HH:mm')}
            </div>
        )}
    </div>
)
