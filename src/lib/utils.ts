import { clsx, type ClassValue } from "clsx"
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
