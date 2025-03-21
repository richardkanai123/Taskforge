// components/project-preview.tsx
"use client";

import { ProjectWithTasks } from "@/lib/types";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, Info } from "lucide-react";
import { getPriorityColor, getStatusLabel, cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";


type ProjectPreviewProps = {
    project: ProjectWithTasks;
    onPrevious: () => void;
    onSubmit: () => void;
};

export function ProjectPreview({
    project,
    onPrevious,
    onSubmit,
}: ProjectPreviewProps) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case "OPEN":
                return "bg-blue-500/90 hover:bg-blue-500 transition-colors";
            case "IN_PROGRESS":
                return "bg-yellow-500/90 hover:bg-yellow-500 transition-colors";
            case "COMPLETED":
                return "bg-green-500/90 hover:bg-green-500 transition-colors";
            default:
                return "bg-gray-500/90 hover:bg-gray-500 transition-colors";
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in-50 duration-500">
            <div className="space-y-2">
                <h3 className="text-xl font-semibold tracking-tight">Project Preview</h3>
                <p className="text-sm text-muted-foreground/80">
                    Review your project and tasks before creating
                </p>
            </div>

            <Card className="border-2 shadow-md hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-4 space-y-4">
                    <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1.5">
                            <CardTitle className="text-2xl font-bold">{project.title}</CardTitle>
                            <CardDescription className="text-sm">
                                Due {format(new Date(project.dueDate), "PPP")}
                            </CardDescription>
                        </div>
                        <Badge className={cn("px-3 py-1", getStatusColor(project.status))}>
                            {getStatusLabel(project.status)}
                        </Badge>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <h4 className="text-sm font-medium text-foreground/80">Description</h4>
                        <Textarea className="min-h-[200px] max-h-fit" value={project.description} readOnly />
                    </div>

                    <Separator className="my-6" />

                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h4 className="text-sm font-medium">Tasks</h4>
                            <Badge variant="secondary" className="text-xs">
                                {project.tasks.length} total
                            </Badge>
                        </div>
                        <div className="grid gap-4">
                            {project.tasks.map((task, i) => (
                                <Card
                                    key={i}
                                    className="hover:shadow-md transition-all duration-300 hover:border-border/80"
                                >
                                    <CardContent className="p-4 overflow-hidden">
                                        <div className="flex flex-col gap-3">
                                            <div className="flex items-center justify-between gap-4">
                                                <h5 className="font-medium text-foreground">
                                                    {task.title}
                                                </h5>
                                                <div className="flex items-center gap-2 flex-shrink-0">
                                                    <Badge
                                                        variant="outline"
                                                        className={cn(
                                                            "transition-colors duration-200",
                                                            getPriorityColor(task.priority)
                                                        )}
                                                    >
                                                        {task.priority}
                                                    </Badge>
                                                    <Badge className={getStatusColor(task.status)}>
                                                        {getStatusLabel(task.status)}
                                                    </Badge>
                                                </div>
                                            </div>
                                            <div className="w-full rounded-md">

                                                <Textarea className="min-h-[200px] max-h-fit" value={task.description} readOnly />

                                            </div>
                                            <div className="flex items-center text-xs text-muted-foreground/80">
                                                <Clock className="mr-1.5 h-3.5 w-3.5" />
                                                Due {format(new Date(task.dueDate), "PP")}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="bg-muted/50 p-6 rounded-lg border border-border/50 hover:border-border/80 transition-colors duration-300">
                <div className="flex items-start gap-3">
                    <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                    <div className="space-y-1.5">
                        <h4 className="text-sm font-medium">Ready to create?</h4>
                        <p className="text-sm text-muted-foreground/90 leading-relaxed">
                            Review the details above and click &quot;Create Project&quot; when
                            you&apos;re ready. You can always edit the project and tasks
                            later.
                        </p>
                    </div>
                </div>
            </div>

            <Separator className="my-6" />

            <div className="flex justify-between gap-4">
                <Button
                    type="button"
                    variant="outline"
                    onClick={onPrevious}
                    className="hover:bg-muted/50 transition-colors duration-200"
                >
                    Back to Tasks
                </Button>
                <Button
                    onClick={onSubmit}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground transition-colors duration-200"
                >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Create Project
                </Button>
            </div>
        </div >
    );
}
