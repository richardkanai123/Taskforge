import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface SignUpResponse {
  success: boolean;
  message?: string;
  error?: string;
  cause?: string | null;
  errors?: Array<{
    field: string;
    message: string;
  }> | null;
  status: number;
}

export function getProgressColor(progress: number): string {
  if (progress >= 80) return '#22c55e' // green-500
  if (progress >= 50) return '#3b82f6' // blue-500
  if (progress >= 20) return '#f59e0b' // amber-500
  return '#6b7280' // gray-500
}

export const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "L1":
      return "bg-red-500 text-white";
    case "L2":
      return "bg-orange-500 text-white";
    case "L3":
      return "bg-yellow-500";
    case "L4":
      return "bg-green-500 text-white";
    case "L5":
      return "bg-blue-500 text-white";
    default:
      return "bg-gray-500";
  }
};

export const getStatusLabel = (status: string) => {
  switch (status) {
    case "OPEN":
      return "Open";
    case "IN_PROGRESS":
      return "In Progress";
    case "COMPLETED":
      return "Completed";
    default:
      return status;
  }
};