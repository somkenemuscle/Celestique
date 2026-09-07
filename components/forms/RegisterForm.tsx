'use client';
import { Button } from "@/components/ui/button";
import { Form, FormField, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { Eye, EyeOff } from 'react-feather';
import { useState } from "react";
import Loader from "../ui/loaders/Loader";
import { SignUpFormSchema } from "@/lib/authSchema";
import { signUp } from "@/services/auth";
import { z } from "zod";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import useFirstNameStore from "@/store/usernameStore";

const inputBase =
  "h-11 w-full rounded-none border border-ink-200 bg-white px-3.5 text-sm text-ink-900 shadow-none transition-colors placeholder:text-ink-400 focus-visible:border-ink-900 focus-visible:ring-0";
const labelClass = "mb-2 block text-[11px] font-medium uppercase tracking-[0.14em] text-ink-500";

export default function RegisterForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setFirstname } = useFirstNameStore();

  const form = useForm<z.infer<typeof SignUpFormSchema>>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      phonenumber: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof SignUpFormSchema>) => {
    try {
      setLoading(true);
      const res = await signUp(values.firstname, values.lastname, values.phonenumber, values.email, values.password);
      const { message, firstname } = res;
      localStorage.setItem('firstname', firstname);
      setFirstname(firstname);
      form.reset();
      router.push('/');
      toast.success(message);
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message || error?.response?.data?.error || 'An unexpected error occurred';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const textFields: { name: FieldName; label: string; placeholder: string; type: string }[] = [
    { name: "firstname", label: "First name", placeholder: "Jane", type: "text" },
    { name: "lastname", label: "Last name", placeholder: "Doe", type: "text" },
    { name: "phonenumber", label: "Phone number", placeholder: "0801 234 5678", type: "tel" },
    { name: "email", label: "Email", placeholder: "you@example.com", type: "text" },
  ];

  return (
    <div>
      <h1 className="font-display text-3xl font-medium tracking-[0.01em] text-ink-900">
        Create account
      </h1>
      <p className="mt-2 text-sm text-ink-500">Start shopping with Celestique and enjoy member deals.</p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-5">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {textFields
              .filter((f) => f.name === "firstname" || f.name === "lastname")
              .map((f) => (
                <FormField
                  key={f.name}
                  control={form.control}
                  name={f.name}
                  render={({ field }) => (
                    <div>
                      <label className={labelClass} htmlFor={`signup-form-input-${f.name}`}>{f.label}</label>
                      <Input
                        type={f.type}
                        {...field}
                        placeholder={f.placeholder}
                        className={inputBase}
                        id={`signup-form-input-${f.name}`}
                      />
                      <FormMessage className="pt-2 text-xs text-red-600" />
                    </div>
                  )}
                />
              ))}
          </div>

          {textFields
            .filter((f) => f.name !== "firstname" && f.name !== "lastname")
            .map((f) => (
              <FormField
                key={f.name}
                control={form.control}
                name={f.name}
                render={({ field }) => (
                  <div>
                    <label className={labelClass} htmlFor={`signup-form-input-${f.name}`}>{f.label}</label>
                    <Input
                      type={f.type}
                      {...field}
                      placeholder={f.placeholder}
                      className={inputBase}
                      id={`signup-form-input-${f.name}`}
                    />
                    <FormMessage className="pt-2 text-xs text-red-600" />
                  </div>
                )}
              />
            ))}

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <div>
                <label className={labelClass} htmlFor="signup-form-input-password">Password</label>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    {...field}
                    placeholder="Create a password"
                    className={`${inputBase} pr-11`}
                    id="signup-form-input-password"
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
            {loading ? <Loader /> : 'Create account'}
          </Button>

          <p className="text-center text-sm text-ink-500">
            Already have an account?{' '}
            <Link className="text-ink-900 underline underline-offset-4 hover:text-ink-500" href="/sign-in">
              Sign in
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
}
