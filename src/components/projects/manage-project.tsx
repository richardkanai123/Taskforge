'use client'
import { Pencil, Trash2, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { authClient } from "@/lib/auth-client"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

interface ManageProjectProps {
    projectId: string
    leadId: string
}

export function ManageProject({ projectId, leadId }: ManageProjectProps) {
    const { data: session } = authClient.useSession();
    const router = useRouter()
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)

    const isProjectLead = session?.user?.id === leadId
    const isAdmin = session?.role === 'ADMIN'
    const canManageProject = isProjectLead || isAdmin

    if (!canManageProject) return null

    const handleEdit = () => {
        router.push(`/dashboard/projects/${projectId}/edit`)
    }

    const handleDelete = async () => {
        try {
            const response = await fetch(`/api/projects/${projectId}`, {
                method: 'DELETE',
            })
            if (response.ok) {
                router.push('/dashboard/projects')
                router.refresh()
            }
        } catch (error) {
            console.error('Failed to delete project:', error)
        }
    }

    return (
        <Card>
            <CardHeader className="pb-4 sm:pb-6">
                <CardTitle className="text-lg font-semibold text-muted-foreground">
                    Project Management
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <Button
                        onClick={handleEdit}
                        variant="outline"
                        className="flex items-center gap-2 w-full sm:w-auto justify-center"
                    >
                        <Pencil className="h-4 w-4" />
                        <span>Edit Project</span>
                    </Button>
                    <Button
                        variant="outline"
                        className="flex items-center gap-2 w-full sm:w-auto justify-center"
                    >
                        <UserPlus className="h-4 w-4" />
                        <span>Manage Members</span>
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={() => setShowDeleteDialog(true)}
                        className="flex items-center gap-2 w-full sm:w-auto justify-center"
                    >
                        <Trash2 className="h-4 w-4" />
                        <span>Delete Project</span>
                    </Button>
                </div>
            </CardContent>

            <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the
                            project and all associated tasks.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            Delete Project
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </Card>
    )
}
