import { Card, CardContent } from "@/components/ui/card"
import { FolderGit2 } from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import Link from "next/link"
import { GetProjectById } from "@/lib/actions/get-projectbyid"

interface ProjectLinkCardProps {
    projectid: string
}

export async function ProjectLinkCard({ projectid }: ProjectLinkCardProps) {

    const { project, message } = await GetProjectById(projectid)
    if (!project) return <p>{message}</p>

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Link href={`/dashboard/projects/${project.id}`}>
                    <Card className="cursor-pointer hover:bg-accent/50 transition-colors">
                        <CardContent className="pt-6">
                            <div className="flex items-center gap-4">
                                <FolderGit2 className="h-8 w-8 text-primary" />
                                <div>
                                    <p className="text-sm text-muted-foreground">Project</p>
                                    <div className="flex flex-col gap-1">
                                        <span className="font-medium">{project.title}</span>
                                        {project.dueDate && (
                                            <span className="text-xs text-muted-foreground">
                                                Due {new Date(project.dueDate).toLocaleDateString()}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </Link>
            </TooltipTrigger>
            <TooltipContent>
                <span>View project details</span>
            </TooltipContent>
        </Tooltip>
    )
}
