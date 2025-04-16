'use client'
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { CheckCircle2Icon, Edit2Icon } from "lucide-react";
import Link from "next/link";

interface TaskActionsProps {
    taskId: string;
    assignedId: string;
    status: string;
    // ?: string;
}

export const TaskActions = ({ taskId, assignedId, status }: TaskActionsProps) => {

    const session = authClient.useSession()

    const sessionUserId = session.data?.userId

    return (
        <div className="flex gap-2">
            <Button variant='secondary' asChild className='self-center my-auto'>
                <Link href={`/dashboard/tasks/${taskId}/edit`}>
                    <Edit2Icon className="h-4 w-4 mr-2" />
                    Edit
                </Link>
            </Button>
            {sessionUserId === assignedId && status !== 'COMPLETED' && (
                <Button variant='default' className='self-center my-auto'>
                    <CheckCircle2Icon className="h-4 text-green-300 w-4 mr-2" />
                    Mark Complete
                </Button>
            )}
        </div>
    );
};
