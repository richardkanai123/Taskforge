'use client';

import { Badge } from "@/components/ui/badge";
import { Task } from "@prisma/client";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";

interface RecentActivityProps {
    tasks: Task[];
}

export default function RecentActivity({ tasks }: RecentActivityProps) {
    // Sort tasks by updatedAt in ascending order
    const sortedTasks = tasks.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
    return (
        <div className="p-4 rounded-lg border">
            <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
            <div className="space-y-3">
                {sortedTasks.map((task) => (
                    <Link href={`/dashboard/tasks/${task.id}`} key={task.id} className="flex flex-col gap-1 p-2 hover:border shadow-sm rounded-md transition-all ease-in cursor-pointer">
                        <div className="flex justify-between items-center">
                            <span className="font-medium">{task.title}</span>
                            <Badge className={
                                task.status === 'COMPLETED' ? 'bg-green-500 transition-all ease-in' :
                                    task.status === 'IN_PROGRESS' ? 'bg-yellow-500 transition-all ease-in' : 'bg-red-500 transition-all ease-in'
                            } >
                                {task.status}
                            </Badge>
                        </div>
                        <div className="flex justify-between text-sm text-gray-500">
                            <span>{task.priority}</span>
                            <span>{formatDistanceToNow(new Date(task.updatedAt))} ago</span>
                        </div>
                        {task.dueDate && (
                            <div className="w-full h-1 bg-gray-200 rounded-full mt-2">
                                <div
                                    className={`h-full rounded-full ${task.status === 'COMPLETED' ? 'bg-green-500' :
                                        new Date(task.dueDate) < new Date() ? 'bg-red-500' :
                                            'bg-blue-500'
                                        }`}
                                    style={{ width: `${task.progress ?? 0}%` }}
                                />
                            </div>
                        )}
                    </Link>
                ))}
            </div>
        </div>
    );
}
