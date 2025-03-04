import { z } from "zod";

const kenyanPhoneRegex = /^254[1-9][0-9]{8}$/;


export const NewCustomerSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    phone: z.string().regex(kenyanPhoneRegex, 'Invalid  phone number format. It must start with 254 and have 9 digits after it.'),
    projects: z.array(z.string()).optional()
});
    