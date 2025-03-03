import {z} from 'zod';



export const NewUserSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6).max(20),
    fullname: z.string().min(4),
    username: z.string().min(5),
    role: z.enum(["ADMIN", "LEAD", "MEMBER", "CUSTOMER"]).default("MEMBER"),
})


