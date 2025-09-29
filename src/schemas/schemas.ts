import * as z from "zod";

export const registerSchema = z.object({
    name: z.string().min(3, { message: "Name must contain at least 3 letters!" }),
    email: z.email({ message: "Invalid email format!" }),
    password: z.string().min(8, { message: "Password must contain at least 8 letters!" })
})

export const enrollmentSchema = z.object({
    name: z.string().min(3, { message: "Name must contain at least 3 letters!" }),
    email: z.email({ message: "Invalid email format!" }),
    linkedin: z.url({ message: "Invalid URL format!" }).refine((val) => val.includes("linkedin.com/in/"), { error: "Make sure to type a valid Linkedin URL." })
})
