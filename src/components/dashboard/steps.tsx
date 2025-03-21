// components/ui/steps.tsx
"use client";

import { cn } from "@/lib/utils";
import React from "react";

interface StepsProps {
    value: number;
    children: React.ReactNode;
    className?: string;
}

interface StepProps {
    value: number;
    children?: React.ReactNode;
}

interface StepTitleProps {
    children: React.ReactNode;
}

interface StepDescriptionProps {
    children: React.ReactNode;
}

function Steps({ value, children, className }: StepsProps) {
    const childrenArray = React.Children.toArray(children);
    const steps = childrenArray.filter(
        (child) => React.isValidElement(child) && child.type === Step
    );

    return (
        <div className={cn(
            "relative w-full overflow-hidden px-4 sm:px-6 md:px-8",
            "before:absolute before:inset-0 before:z-0 before:bg-gradient-to-r before:from-transparent before:via-transparent before:to-transparent",
            className
        )}>
            <div className="w-full max-w-3xl mx-auto relative flex items-center justify-between">
                {steps.map((step, index) => {
                    const stepElement = step as React.ReactElement<StepProps>;
                    const isCompleted = value > stepElement.props.value;
                    const isCurrent = value === stepElement.props.value;

                    // Get title and description from children
                    const stepChildren = React.Children.toArray(stepElement.props.children);
                    const title = stepChildren.find(
                        child => React.isValidElement(child) && child.type === StepTitle
                    );
                    const description = stepChildren.find(
                        child => React.isValidElement(child) && child.type === StepDescription
                    );

                    return (
                        <div key={index} className="flex-1 w-full flex flex-col items-center relative self-center mx-auto">
                            <div className="flex flex-1 items-center w-full">
                                <div className=" h-full  flex flex-col items-center">
                                    <div
                                        className={cn(
                                            "flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full border-2",
                                            "text-center font-medium shrink-0 transition-all duration-300 ease-in-out",
                                            "transform hover:scale-105",
                                            isCompleted
                                                ? "border-primary bg-primary text-primary-foreground shadow-lg"
                                                : isCurrent
                                                    ? "border-primary text-primary ring-4 ring-primary/20"
                                                    : "border-input text-muted-foreground hover:border-muted-foreground/50"
                                        )}
                                    >
                                        {isCompleted ? (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="2.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="h-4 w-4 sm:h-5 sm:w-5"
                                            >
                                                <polyline points="20 6 9 17 4 12"></polyline>
                                            </svg>
                                        ) : (
                                            <span className="text-sm sm:text-base font-semibold">
                                                {stepElement.props.value}
                                            </span>
                                        )}
                                    </div>
                                    <div className="mt-3 flex flex-col items-center gap-1 text-center">
                                        <div className={cn(
                                            "text-sm font-medium transition-colors duration-200",
                                            "whitespace-nowrap",
                                            isCurrent ? "text-primary font-semibold" : "text-foreground"
                                        )}>
                                            {title}
                                        </div>
                                        <div className="text-xs text-muted-foreground/80 max-w-[120px] text-center">
                                            {description}
                                        </div>
                                    </div>
                                </div>
                                {index < steps.length - 1 && (
                                    <div className="relative flex-1 px-2">
                                        <div
                                            className={cn(
                                                "absolute top-4 sm:top-5 w-full h-0.5 transition-all duration-300 ease-in-out",
                                                isCompleted
                                                    ? "bg-primary shadow-sm"
                                                    : "bg-input border-t border-input"
                                            )}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

function Step({ children }: StepProps) {
    return (
        <div className="w-full transition-all duration-200">
            {children}
        </div>
    );
}

function StepTitle({ children }: StepTitleProps) {
    return (
        <h3 className="text-sm font-medium sm:text-base transition-colors leading-none">
            {children}
        </h3>
    );
}

function StepDescription({ children }: StepDescriptionProps) {
    return (
        <p className="text-xs sm:text-sm transition-colors leading-tight">
            {children}
        </p>
    );
}

export { Steps, Step, StepTitle, StepDescription };