'use client'
import { Button } from "@/components/ui/button"
import {
    Form,
    FormField,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { Eye, EyeOff } from 'react-feather';
import { useState } from "react";
import Loader from "../ui/Loader";
import { SignInFormSchema } from "@/lib/authSchema"
import { signIn } from "@/services/auth"
import axios from "axios"


export default function SignInForm() {
    const { toast } = useToast();
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    // Toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };


    const form = useForm<z.infer<typeof SignInFormSchema>>({
        resolver: zodResolver(SignInFormSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })


    async function onSubmit(values: z.infer<typeof SignInFormSchema>) {
        try {
            // Show loader before making the request
            setLoading(true);

            const res = await signIn(values?.email, values?.password);

            const { message, email } = res;

            // Store email in local storage
            localStorage.setItem('email', email);

            // Reset the form and redirect
            form.reset();
            router.push('/');

            // Show success toast
            toast({
                className: "shadcn-toast-success",
                description: message
            });

        } catch (error: any) {
            // Default error message
            let errorMessage = 'An error occurred. Please try again.';

            // Check if the error is an Axios error
            if (axios.isAxiosError(error)) {
                // Check for a response error
                if (error.response) {
                    // Extract message from response if available
                    const responseMessage = error.response.data?.error;
                    if (responseMessage) {
                        errorMessage = responseMessage;
                    } else {
                        errorMessage = error.response.data?.message || errorMessage;
                    }
                } else {
                    // Handle cases where no response is available (e.g., network errors)
                    errorMessage = 'Network error. Please try again.';
                }
            } else {
                // Handle unexpected error types
                errorMessage = 'An unexpected error occurred. Please try again later.';
            }

            toast({
                className: "shadcn-toast-failure",
                description: errorMessage
            });
        } finally {
            // Hide the loader after request is complete (either success or error)
            setLoading(false);
        }
    }



    return (
        <div className="min-h-screen justify-center items-center mt-10">
            <div className="px-4 py-48 sm:px-6 sm:my-auto md:px-8 md:py-24">
                <div className="mx-auto max-w-lg text-center">
                    <h1 className="text-2xl font-bold sm:text-3xl">Sign In</h1>
                    <p className="mt-3 text-gray-500">
                        We are glad to have you back here at Celestique ᥫ᭡
                    </p>
                </div>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto mt-8 max-w-lg space-y-4">
                        {/* Email Field */}
                        <FormField
                            control={form.control}
                            name="email"

                            render={({ field }) => (
                                <>
                                    <Input
                                        type="text"
                                        {...field}
                                        placeholder="Enter email"
                                        className="w-full rounded-xl border-gray-200 p-6 pe-12 text-sm shadow-sm"
                                        id="signin-form-input-email"
                                    />
                                    <FormMessage className="text-red-600" />
                                </>
                            )}
                        />

                        {/* Password Field */}
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <>
                                    <div className="relative">
                                        <Input
                                            type={showPassword ? 'text' : 'password'}
                                            {...field}
                                            placeholder="Enter password"
                                            className="w-full rounded-xl border-gray-200 p-6 pe-12 text-sm shadow-sm"
                                            id="signin-form-input-password"
                                        />
                                        <button
                                            type="button"
                                            onClick={togglePasswordVisibility}
                                            className="absolute inset-y-0 right-0 flex items-center pr-3"
                                        >
                                            {showPassword ? <EyeOff className="text-gray-400" size={15} /> : <Eye className="text-gray-400" size={15} />}
                                        </button>
                                    </div>
                                    <FormMessage className="text-red-600" />
                                </>
                            )}
                        />

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            className="w-full text-center rounded-xl bg-black text-sm font-medium text-white hover:bg-slate-900 p-6">
                            Sign In  {loading && <span className="ml-3"> <Loader /> </span>}
                        </Button>

                        {/* Sign-up Prompt */}
                        <p className="text-sm text-center text-gray-500">
                            New to Celestique? <Link className="text-indigo-600 hover:underline" href="/sign-up">Create account here</Link>
                        </p>
                    </form>
                </Form>
            </div>
        </div>
    )
}

