import { z } from "zod";


export const shippingFormSchema = z.object({
    firstname: z.string()
        .min(2, { message: "Firstname must be at least 2 characters" })
        .max(20, { message: "Firstname must be no more than 20 characters." })
        .regex(/^[a-zA-Z]+$/, { message: "Firstname can only contain letters" }),
    lastname: z.string()
        .min(2, { message: "Lastname must be at least 2 characters" })
        .max(20, { message: "Lastname must be no more than 20 characters" })
        .regex(/^[a-zA-Z]+$/, { message: "Lastname can only contain letters" }),
    phonenumber: z.string()
        .min(11, { message: "Phone number must be at least 11 characters" })
        .max(15, { message: "Phone number must be no more than 15 characters." })
        .regex(/^\d+$/, { message: "Phone number can only contain digits" }),
    city: z.string()
        .regex(/^[a-zA-Z\s]+$/, { message: "City can only contain letters" }),
    country: z.string(),
    state: z.string()
        .regex(/^[a-zA-Z\s]+$/, { message: "Select State for delivery" }),
    address: z.string()
        .regex(/^[a-zA-Z0-9\s,]+$/, { message: "Address can only contain letters, numbers, and commas" }),
    postalCode: z.string()
        .regex(/^\d+$/, { message: "Only Digits Allowed." }),
});
