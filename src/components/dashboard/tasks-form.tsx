// components/tasks-form.tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { tasksFormSchema } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,

    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Task } from "@/lib/types";
import { CalendarIcon, Plus, Trash2 } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import TipTap from "./TipTap";

type TasksFormProps = {
    tasks: Task[];
    onSubmit: (tasks: Task[]) => void;
    onPrevious: () => void;
};

export function TasksForm({ tasks, onSubmit, onPrevious }: TasksFormProps) {
    const form = useForm<z.infer<typeof tasksFormSchema>>({
        resolver: zodResolver(tasksFormSchema),
        defaultValues: {
            tasks: tasks.length ? tasks : [getEmptyTask()],
        },
    });

    const { fields, append, remove } = useFieldArray({
        name: "tasks",
        control: form.control,
    });

    function getEmptyTask(): Task {
        return {
            title: "",
            description: "",
            status: "OPEN",
            priority: "L3",
            dueDate: new Date(),
        };
    }

    function handleSubmit(values: z.infer<typeof tasksFormSchema>) {
        onSubmit(values.tasks);
    }

    function addTask() {
        append(getEmptyTask());
    }

    function getPriorityColor(priority: string) {
        switch (priority) {
            case "L1":
                return "bg-red-500";
            case "L2":
                return "bg-orange-500";
            case "L3":
                return "bg-yellow-500";
            case "L4":
                return "bg-green-500";
            case "L5":
                return "bg-blue-500";
            default:
                return "bg-gray-500";
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                <div className="space-y-4">
                    {fields.map((field, index) => (
                        <Card key={field.id} className="overflow-hidden">
                            <CardHeader className="bg-muted py-3">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-lg">Task {index + 1}</CardTitle>
                                    {fields.length > 1 && (
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => remove(index)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    )}
                                </div>
                            </CardHeader>
                            <CardContent className="pt-6">
                                <div className="space-y-4">
                                    <FormField
                                        control={form.control}
                                        name={`tasks.${index}.title`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Task Title</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter task title" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name={`tasks.${index}.description`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Description</FormLabel>
                                                <FormControl>
                                                    <TipTap content={field.value} onChange={field.onChange} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <FormField
                                            control={form.control}
                                            name={`tasks.${index}.status`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Status</FormLabel>
                                                    <Select
                                                        onValueChange={field.onChange}
                                                        defaultValue={field.value}
                                                    >
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select status" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value="OPEN">Open</SelectItem>
                                                            <SelectItem value="IN_PROGRESS">
                                                                In Progress
                                                            </SelectItem>
                                                            <SelectItem value="COMPLETED">
                                                                Completed
                                                            </SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name={`tasks.${index}.priority`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Priority</FormLabel>
                                                    <Select
                                                        onValueChange={field.onChange}
                                                        defaultValue={field.value}
                                                    >
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select priority">
                                                                    {field.value && (
                                                                        <div className="flex items-center">
                                                                            <div
                                                                                className={`h-2 w-2 rounded-full mr-2 ${getPriorityColor(
                                                                                    field.value
                                                                                )}`}
                                                                            ></div>
                                                                            {field.value}
                                                                        </div>
                                                                    )}
                                                                </SelectValue>
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value="L1">
                                                                <div className="flex items-center">
                                                                    <div className="h-2 w-2 rounded-full mr-2 bg-red-500"></div>
                                                                    L1 (Highest)
                                                                </div>
                                                            </SelectItem>
                                                            <SelectItem value="L2">
                                                                <div className="flex items-center">
                                                                    <div className="h-2 w-2 rounded-full mr-2 bg-orange-500"></div>
                                                                    L2 (High)
                                                                </div>
                                                            </SelectItem>
                                                            <SelectItem value="L3">
                                                                <div className="flex items-center">
                                                                    <div className="h-2 w-2 rounded-full mr-2 bg-yellow-500"></div>
                                                                    L3 (Medium)
                                                                </div>
                                                            </SelectItem>
                                                            <SelectItem value="L4">
                                                                <div className="flex items-center">
                                                                    <div className="h-2 w-2 rounded-full mr-2 bg-green-500"></div>
                                                                    L4 (Low)
                                                                </div>
                                                            </SelectItem>
                                                            <SelectItem value="L5">
                                                                <div className="flex items-center">
                                                                    <div className="h-2 w-2 rounded-full mr-2 bg-blue-500"></div>
                                                                    L5 (Lowest)
                                                                </div>
                                                            </SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name={`tasks.${index}.dueDate`}
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Due Date</FormLabel>
                                                    <Popover>
                                                        <PopoverTrigger asChild>
                                                            <FormControl>
                                                                <Button
                                                                    variant={"outline"}
                                                                    className={cn(
                                                                        "w-full pl-3 text-left font-normal",
                                                                        !field.value && "text-muted-foreground"
                                                                    )}
                                                                >
                                                                    {field.value ? (
                                                                        format(field.value, "PPP")
                                                                    ) : (
                                                                        <span>Pick a date</span>
                                                                    )}
                                                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                                </Button>
                                                            </FormControl>
                                                        </PopoverTrigger>
                                                        <PopoverContent
                                                            className="w-auto p-0"
                                                            align="start"
                                                        >
                                                            <Calendar
                                                                mode="single"
                                                                selected={
                                                                    field.value instanceof Date
                                                                        ? field.value
                                                                        : new Date(field.value)
                                                                }
                                                                onSelect={field.onChange}
                                                                initialFocus
                                                            />
                                                        </PopoverContent>
                                                    </Popover>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <Button
                    type="button"
                    variant="outline"
                    onClick={addTask}
                    className="w-full"
                >
                    <Plus className="mr-2 h-4 w-4" /> Add Another Task
                </Button>

                <Separator className="my-6" />

                <div className="flex justify-between">
                    <Button type="button" variant="outline" onClick={onPrevious}>
                        Back to Project Details
                    </Button>
                    <Button type="submit">Review Project</Button>
                </div>
            </form>
        </Form>
    );
}