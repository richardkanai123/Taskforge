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
