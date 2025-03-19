import { z } from "zod"
import { Role } from "@prisma/client"

export const NewUserSchema = z.object({
  email: z
    .string()
    .email("Invalid email address")
    .min(5, "Email must be at least 5 characters")
    .max(255, "Email must be less than 255 characters"),
  
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password must be less than 100 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
  
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters")
    .regex(/^[a-zA-Z\s]*$/, "Name can only contain letters and spaces"),
  
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username must be less than 30 characters")
    .regex(
      /^[a-zA-Z0-9_-]*$/,
      "Username can only contain letters, numbers, underscores, and hyphens"
    ),
  image: z.string().optional(),
  
  role: z.enum([Role.ADMIN, Role.LEAD, Role.MEMBER, Role.CUSTOMER]).default(Role.MEMBER),
})

export type NewUserInput = z.infer<typeof NewUserSchema>

export const SignInSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
})

export type SignInInput = z.infer<typeof SignInSchema>

export const ProfileSchema = z.object({
    name: z
        .string()
        .min(2, "Name must be at least 2 characters")
        .max(100, "Name must be less than 100 characters")
        .regex(/^[a-zA-Z\s]*$/, "Name can only contain letters and spaces"),
    username: z
        .string()
        .min(3, "Username must be at least 3 characters")
        .max(30, "Username must be less than 30 characters")
        .regex(
            /^[a-zA-Z0-9_-]*$/,
            "Username can only contain letters, numbers, underscores, and hyphens"
        ),
    image: z.string().optional(),
})

export type ProfileInput = z.infer<typeof ProfileSchema>