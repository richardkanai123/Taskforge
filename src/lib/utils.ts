import { Role } from "@prisma/client";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { ZodError } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export type SignUpResponse = {
  success: boolean;
  user?: {
    id: string;
    email: string;
    name: string;
    username: string;
    role: Role;
    image: string | null;
    emailVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
  };
  token?: string;
  error?: string;
  cause?: string;
  message?: string;
  errors?: ZodError[];
};