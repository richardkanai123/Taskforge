import { Badge } from "@/components/ui/badge";

interface ProjectHeaderProps {
    title: string;
    description: string;
    status: string;
}

export function ProjectHeader({
    title,
    description,
    status,
}: ProjectHeaderProps) {
    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
                <Badge
                    className={
                        status === "OPEN"
                            ? "bg-blue-500/90 hover:bg-blue-500 transition-colors"
                            : status === "IN_PROGRESS"
                                ? "bg-yellow-500/90 hover:bg-yellow-500 transition-colors"
                                : status === "COMPLETED"
                                    ? "bg-green-500/90 hover:bg-green-500 transition-colors"
                                    : "bg-gray-500/90 hover:bg-gray-500 transition-colors"
                    }>
                    {status}
                </Badge>
            </div>
            <div
                className="text-muted-foreground"
                dangerouslySetInnerHTML={{ __html: description }}
            />
        </div>
    );
}
