import { Card, CardContent } from "@/components/ui/card"
import { Calendar, GitBranch, Clock } from "lucide-react"
import { format, differenceInDays } from "date-fns"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { LeadCard } from "./lead-card"

interface ProjectStatsProps {
    dueDate?: Date | string
    lead: {
        id: string;
        email: string;
        name: string;
        username: string;
        image: string | null;
    } | null
    githubRepo?: string
    createdAt: Date | string
}

export function ProjectStats({ dueDate, lead, githubRepo, createdAt }: ProjectStatsProps) {
    const getDaysMessage = (date: Date) => {
        const days = differenceInDays(new Date(date), new Date())
        if (days < 0) return `${Math.abs(days)} days overdue`
        if (days === 0) return "Due today"
        return `${days} days remaining`
    }

    const getTimeAgoMessage = (date: Date) => {
        const days = Math.abs(differenceInDays(new Date(date), new Date()))
        if (days === 0) return "Created today"
        if (days === 1) return "Created yesterday"
        return `Created ${days} days ago`
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 justify-around">
            <Tooltip>
                <TooltipTrigger asChild>
                    <Card className="cursor-help">
                        <CardContent className="pt-6">
                            <div className="flex items-center gap-4">
                                <Calendar className="h-8 w-8 text-primary" />
                                <div>
                                    <p className="text-sm text-muted-foreground">Due Date</p>
                                    <p className="font-medium">
                                        {dueDate ? format(new Date(dueDate), 'PPP') : 'Not set'}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TooltipTrigger>
                {dueDate && (
                    <TooltipContent>
                        {getDaysMessage(new Date(dueDate))}
                    </TooltipContent>
                )}
            </Tooltip>

            <Tooltip>
                <TooltipTrigger asChild>
                    <Card className="cursor-help">
                        <CardContent className="pt-6">
                            <div className="flex items-center gap-4">
                                <Clock className="h-8 w-8 text-primary" />
                                <div>
                                    <p className="text-sm text-muted-foreground">Created</p>
                                    <p className="font-medium">
                                        {format(new Date(createdAt), 'PPP')}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TooltipTrigger>
                <TooltipContent>
                    {getTimeAgoMessage(new Date(createdAt))}
                </TooltipContent>
            </Tooltip>

            <LeadCard lead={lead} />

            {githubRepo && (
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-4">
                            <GitBranch className="h-8 w-8 text-primary" />
                            <div>
                                <p className="text-sm text-muted-foreground">Repository</p>
                                <a href={githubRepo} className="font-medium hover:underline" target="_blank" rel="noopener">
                                    View on GitHub
                                </a>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
