"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, ArrowRight, Home } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

export default function SuccessPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const projectId = searchParams.get("projectId") || "";
    const projectName = searchParams.get("title") || "";

    return (
        <div className="container max-w-lg mx-auto px-4 py-12">
            <Card className="p-6 space-y-6 text-center animate-in fade-in-50 zoom-in-95 duration-500">
                <div className="space-y-2">
                    <div className="h-12 w-12 rounded-full bg-green-100 mx-auto flex items-center justify-center">
                        <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight">
                        Created Successfully!
                    </h1>
                    <p className="text-muted-foreground text-sm">
                        {projectName ? (
                            <>Your project <span className="font-medium">{projectName}</span> has been created.</>
                        ) : (
                            "Your project has been created."
                        )}
                    </p>
                </div>

                <div className="grid gap-4">
                    <Button
                        asChild
                        className="w-full"
                    >
                        <Link href={`/dashboard/projects/${projectId}`}>
                            View Project <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">
                                or
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Button
                            variant="outline"
                            onClick={() => router.push("/dashboard/projects/create-new")}
                        >
                            Create Another
                        </Button>
                        <Button
                            variant="outline"
                            asChild
                        >
                            <Link href="/dashboard">
                                <Home className="mr-2 h-4 w-4" />
                                Dashboard
                            </Link>
                        </Button>
                    </div>
                </div>

                <p className="text-xs text-muted-foreground/60">
                    You can always access your projects from the dashboard
                </p>
            </Card>
        </div>
    );
}