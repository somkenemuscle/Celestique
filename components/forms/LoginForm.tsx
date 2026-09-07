'use client'
import { Button } from "@/components/ui/button"
import { Form, FormField, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Eye, EyeOff } from 'react-feather'
import { useState } from "react"
import Loader from "../ui/loaders/Loader"
import { SignInFormSchema } from "@/lib/authSchema"
import { signIn } from "@/services/auth"
import axios from "axios"
import toast from "react-hot-toast"
import useFirstNameStore from "@/store/usernameStore"

const inputBase =
    "h-11 w-full rounded-none border border-ink-200 bg-white px-3.5 text-sm text-ink-900 shadow-none transition-colors placeholder:text-ink-400 focus-visible:border-ink-900 focus-visible:ring-0"
const labelClass = "mb-2 block text-[11px] font-medium uppercase tracking-[0.14em] text-ink-500"

export default function LoginForm() {
    const router = useRouter()
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const { setFirstname } = useFirstNameStore()

    const form = useForm<z.infer<typeof SignInFormSchema>>({
        resolver: zodResolver(SignInFormSchema),
        defaultValues: { email: "", password: "" },
    })

    async function onSubmit(values: z.infer<typeof SignInFormSchema>) {
        try {
            setLoading(true)
            const res = await signIn(values?.email, values?.password)
            const { message, firstname } = res
            localStorage.setItem('firstname', firstname)
            setFirstname(firstname)
            form.reset()
            router.push('/')
            toast.success(message)
        } catch (error: any) {
            let errorMessage = 'An error occurred. Please try again.'
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    errorMessage =
                        error.response.data?.error || error.response.data?.message || errorMessage
                } else {
                    errorMessage = 'Network error. Please try again.'
                }
            } else {
                errorMessage = 'An unexpected error occurred. Please try again later.'
            }
            toast.error(errorMessage)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <h1 className="font-display text-3xl font-medium tracking-[0.01em] text-ink-900">
                Sign in
            </h1>
            <p className="mt-2 text-sm text-ink-500">Welcome back to Celestique.</p>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-5">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <div>
                                <label className={labelClass} htmlFor="signin-form-input-email">Email</label>
                                <Input
                                    type="text"
                                    {...field}
                                    placeholder="you@example.com"
                                    className={inputBase}
                                    id="signin-form-input-email"
                                />
                                <FormMessage className="pt-2 text-xs text-red-600" />
                            </div>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <div>
                                <label className={labelClass} htmlFor="signin-form-input-password">Password</label>
                                <div className="relative">
                                    <Input
                                        type={showPassword ? 'text' : 'password'}
                                        {...field}
                                        placeholder="Enter your password"
                                        className={`${inputBase} pr-11`}
                                        id="signin-form-input-password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword((s) => !s)}
                                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-ink-400 hover:text-ink-700"
                                    >
                                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                                <FormMessage className="pt-2 text-xs text-red-600" />
                            </div>
                        )}
                    />

                    <Button
                        type="submit"
                        disabled={loading}
                        className="h-12 w-full rounded-none bg-ink-900 text-[11px] font-semibold uppercase tracking-[0.16em] text-white hover:bg-ink-700"
                    >
                        {loading ? <Loader /> : 'Sign in'}
                    </Button>

                    <p className="text-center text-sm text-ink-500">
                        New to Celestique?{' '}
                        <Link className="text-ink-900 underline underline-offset-4 hover:text-ink-500" href="/register">
                            Create an account
                        </Link>
                    </p>
                </form>
            </Form>
        </div>
    )
}
