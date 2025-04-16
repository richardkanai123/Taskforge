import { Card, CardContent } from "@/components/ui/card"
import { UserCog2Icon } from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { ReassignDialog } from "./ReassignDialog"

interface AssigneeCardProps {
    assignee: {
        id: string;
        email: string;
        name: string;
        username: string;
        image: string | null;
    } | null;
    taskId: string;
}

export function AssigneeCard({ assignee, taskId }: AssigneeCardProps) {



    return (
        <div className="flex items-center gap-2">
            <Tooltip>
                <TooltipTrigger asChild>
                    <Card className="cursor-help flex-1">
                        <CardContent className="flex justify-between pt-6">
                            <div className="flex items-center gap-4">
                                <UserCog2Icon className="h-8 w-8 text-primary" />
                                <div>
                                    <p className="text-sm text-muted-foreground">Assignee</p>
                                    {assignee ? (
                                        <div className="flex items-center gap-2 mt-2">
                                            <Avatar className="h-6 w-6">
                                                <AvatarImage src={assignee.image || ''} alt={assignee.name} />
                                                <AvatarFallback>{assignee.name?.[0]}</AvatarFallback>
                                            </Avatar>
                                            <span className="font-medium">{assignee.username}</span>
                                        </div>
                                    ) : (
                                        <p className="font-medium">Not assigned</p>
                                    )}
                                </div>
                            </div>
                            <ReassignDialog assigneeid={assignee?.id as string} taskId={taskId} />
                        </CardContent>

                    </Card>
                </TooltipTrigger>
                <TooltipContent>
                    <div className="flex flex-col gap-1">
                        <span className="font-medium">{assignee?.name}</span>
                        <span className="text-xs text-muted-foreground">{assignee?.email}</span>
                    </div>
                </TooltipContent>
            </Tooltip>

        </div>
    )
}
