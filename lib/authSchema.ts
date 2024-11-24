import { z } from "zod";

//signup schema
export const SignUpFormSchema = z.object({
    username: z.string()
        .min(4, { message: "Username must be at least 4 characters" })
        .max(20, { message: "Username must be no more than 20 characters." })
        .regex(/^[a-zA-Z0-9._-]+$/, { message: "Username can only contain letters, numbers, periods ( . ), hyphens ( - ), or underscores ( _ )." }),
    email: z.string()
        .min(5, { message: "Enter a valid email", })
        .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, { message: "Must be a valid email address with  'name@gmail.com' " }),
    password: z.string()
        .min(6, { message: 'Password must be at least 6 characters long' })
        .max(50, { message: 'Password must be no more than 50 characters long' })
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#_-])[A-Za-z\d@$!%*?&#_-]{6,}$/, {
            message: 'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character.'
        })
});



//signin schema
export const SignInFormSchema = z.object({
    email: z.string()
        .min(5, { message: "Enter a valid email", })
        .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, { message: "Must be a valid email address with  'name@gmail.com' " }),

    password: z.string()
        .min(1, { message: "Password is required" })
        .max(50, { message: "Password must be no more than 50 characters" })
});

