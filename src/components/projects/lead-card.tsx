import { Card, CardContent } from "@/components/ui/card"
import { Users } from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

interface LeadCardProps {
    lead: {
        id: string;
        email: string;
        name: string;
        username: string;
        image: string | null;
    } | null;
}

export function LeadCard({ lead }: LeadCardProps) {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Card className="cursor-help">
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-4">
                            <Users className="h-8 w-8 text-primary" />
                            <div>
                                <p className="text-sm text-muted-foreground">Project Lead</p>
                                {lead ? (
                                    <div className="flex items-center gap-2">
                                        <Avatar className="h-6 w-6">
                                            <AvatarImage src={lead.image || ''} alt={lead.name} />
                                            <AvatarFallback>{lead.name?.[0]}</AvatarFallback>
                                        </Avatar>
                                        <span className="font-medium">{lead.username}</span>
                                    </div>
                                ) : (
                                    <p className="font-medium">Not assigned</p>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </TooltipTrigger>
            {lead && (
                <TooltipContent>
                    <div className="flex flex-col gap-1">
                        <span className="font-medium">{lead.name}</span>
                        <span className="text-xs text-muted-foreground">{lead.email}</span>
                    </div>
                </TooltipContent>
            )}
        </Tooltip>
    )
}
