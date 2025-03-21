// app/projects/new/page.tsx
"use client";
import { useState } from "react";
import { ProjectForm } from "@/components/dashboard/project-form";
import { TasksForm } from "@/components/dashboard/tasks-form";
import { ProjectPreview } from "@/components/dashboard/project-review";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Steps,
    Step,
    StepTitle,
    StepDescription,
} from "@/components/dashboard/steps";
import { ProjectWithTasks } from "@/lib/types";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { PlusIcon } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import AuthErrorComponent from "@/components/dashboard/AuthError";
import { Button } from "@/components/ui/button";

export default function CreateProjectPage() {
    const [step, setStep] = useState(1);
    const [projectData, setProjectData] = useState<ProjectWithTasks>({
        title: "",
        description: "",
        status: "OPEN",
        dueDate: new Date(),
        tasks: [],
    });

    const router = useRouter();

    const { data, error, isPending } = authClient.useSession();

    if (isPending) {
        return (
            <div className="w-full flex items-center justify-center min-h-screen mx-auto">
                <svg
                    className="mx-auto h-16 w-16 text-blue-500 animate-spin"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                </svg>
            </div>
        )
    }

    if (error) {
        const errorMessage = error.message || "An error occurred";
        <AuthErrorComponent message={errorMessage} />;
    }

    if (!data) {
        return (
            <div className="w-full flex items-center justify-center min-h-screen mx-auto">
                <div className="text-center">
                    <svg
                        className="mx-auto h-16 w-16 text-red-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                    </svg>
                    <p className="mt-2 text-gray-600">
                        You need to sign in to create a new project
                    </p>
                    <Button
                        onClick={() => router.push('/sign-in')}
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                    >
                        Sign In
                    </Button>
                </div>
            </div>
        )
    }

    const handleProjectSubmit = (data: Omit<ProjectWithTasks, "tasks">) => {
        setProjectData((prev) => ({ ...prev, ...data }));
        setStep(2);
    };

    const handleTasksSubmit = (tasks: ProjectWithTasks["tasks"]) => {
        setProjectData((prev) => ({ ...prev, tasks }));
        setStep(3);
    };

    const handlePrevStep = () => {
        if (step > 1) {
            setStep(step - 1);
        }
    };

    const handleCreateProject = async () => {
        try {
            // Simulate API call
            console.log("Creating project...", projectData);
            toast("Creating project...", { icon: "🚀" });
            // Redirect to project page
            // router.push("/projects");
        } catch (error) {
            console.error(error);
            toast("An error occurred", { icon: "🚨" });
        }
    };

    return (
        <div className="container mx-auto max-w-4xl px-4 py-8 md:py-12">
            <Card className="border-none shadow-lg">
                <CardHeader className="space-y-1 pb-8 border-b">
                    <div className="flex items-center space-x-2">
                        <CardTitle className="text-2xl font-bold">Create New Project</CardTitle>
                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                            <PlusIcon className="h-4 w-4 text-white" />
                        </div>
                    </div>
                    <CardDescription className="text-muted-foreground">
                        Follow the steps below to create a new project and add tasks
                    </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                    <div className="space-y-6 mx-auto">
                        <Steps
                            value={step}
                            className="my-8 mx-auto self-center bg-background/50 backdrop-blur-sm rounded-lg p-4"
                        >
                            <Step value={1}>
                                <StepTitle>Project Details</StepTitle>
                                <StepDescription>Set up the project info</StepDescription>
                            </Step>
                            <Step value={2}>
                                <StepTitle>Add Tasks</StepTitle>
                                <StepDescription>Define project tasks</StepDescription>
                            </Step>
                            <Step value={3}>
                                <StepTitle>Preview</StepTitle>
                                <StepDescription>Review and create</StepDescription>
                            </Step>
                        </Steps>

                        <div className="mt-8 space-y-6">
                            {step === 1 && (
                                <div className="animate-in fade-in-50">
                                    <ProjectForm
                                        defaultValues={projectData}
                                        onSubmit={handleProjectSubmit}
                                    />
                                </div>
                            )}
                            {step === 2 && (
                                <div className="animate-in fade-in-50 slide-in-from-right-5">
                                    <TasksForm
                                        tasks={projectData.tasks}
                                        onSubmit={handleTasksSubmit}
                                        onPrevious={handlePrevStep}
                                    />
                                </div>
                            )}
                            {step === 3 && (
                                <div className="animate-in fade-in-50 slide-in-from-right-5">
                                    <ProjectPreview
                                        project={projectData}
                                        onPrevious={handlePrevStep}
                                        onSubmit={handleCreateProject}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}