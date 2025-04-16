'use client'
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { authClient } from "@/lib/auth-client"
import { useState } from "react"
import toast from "react-hot-toast"
import { FaExchangeAlt, FaSpinner } from "react-icons/fa"

interface ReassignDialogProps {
    taskId: string;
    assigneeid: string

}

export function ReassignDialog({ taskId, assigneeid }: ReassignDialogProps) {
    const [open, setOpen] = useState(false)
    const [username, setUsername] = useState("")
    const { data, isPending } = authClient.useSession()

    const handleReassign = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const response = await fetch(`/api/tasks/${taskId}/reassign`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username }),
            })

            if (!response.ok) {
                throw new Error('Failed to reassign task')
            }

            toast.success('Task reassigned successfully')
            setOpen(false)
        } catch (error) {
            if (error instanceof Error) toast.error(error.message)
            toast.error('Failed to reassign task')
        }
    }

    if (assigneeid !== data?.user.id) return null

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className='cursor-pointer my-auto hover:text-secondary rounded shadow-sm' asChild>
                {
                    isPending
                        ? <FaSpinner className="animate-spin" />
                        : <FaExchangeAlt className="text-primary w-4 h-4" />
                }
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Reassign Task</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleReassign} className="space-y-4">
                    <div>
                        <Input
                            placeholder="Enter username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <Button type="submit" className="w-full">
                        Reassign
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}
