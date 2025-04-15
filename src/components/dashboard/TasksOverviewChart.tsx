'use client';

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { Task } from "@prisma/client";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

interface TasksOverviewChartProps {
    tasks: Task[];
}

export default function TasksOverviewChart({ tasks }: TasksOverviewChartProps) {
    // Group tasks by status and priority
    const chartData = [
        {
            priority: "L1",
            completed: tasks.filter(t => t.status === "COMPLETED" && t.priority === "L1").length,
            inProgress: tasks.filter(t => t.status === "IN_PROGRESS" && t.priority === "L1").length,
            pending: tasks.filter(t => t.status === "OPEN" && t.priority === "L1").length,
        },
        {
            priority: "L2",
            completed: tasks.filter(t => t.status === "COMPLETED" && t.priority === "L2").length,
            inProgress: tasks.filter(t => t.status === "IN_PROGRESS" && t.priority === "L2").length,
            pending: tasks.filter(t => t.status === "OPEN" && t.priority === "L2").length,
        },
        {
            priority: "L3",
            completed: tasks.filter(t => t.status === "COMPLETED" && t.priority === "L3").length,
            inProgress: tasks.filter(t => t.status === "IN_PROGRESS" && t.priority === "L3").length,
            pending: tasks.filter(t => t.status === "OPEN" && t.priority === "L3").length,
        },
    ];

    const chartConfig = {
        completed: {
            label: "Completed",
            color: "#22c55e",
        },
        inProgress: {
            label: "In Progress",
            color: "#fcff58",
        },
        pending: {
            label: "Pending",
            color: "#ef4444",
        },
    };

    return (
        <div className="p-4 rounded-lg border">
            <h3 className="text-lg font-semibold mb-4">Tasks by Priority & Status</h3>
            <ChartContainer config={chartConfig} className="h-[300px] w-full">
                <BarChart data={chartData}>
                    <CartesianGrid vertical={false} />
                    <XAxis
                        dataKey="priority"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={10}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar
                        dataKey="completed"
                        fill={chartConfig.completed.color}
                        radius={[4, 4, 0, 0]}
                        stackId="stack"
                    />
                    <Bar
                        dataKey="inProgress"
                        fill={chartConfig.inProgress.color}
                        radius={[4, 4, 0, 0]}
                        stackId="stack"
                    />
                    <Bar
                        dataKey="pending"
                        fill={chartConfig.pending.color}
                        radius={[4, 4, 0, 0]}
                        stackId="stack"
                    />
                </BarChart>
            </ChartContainer>
        </div>
    );
}
