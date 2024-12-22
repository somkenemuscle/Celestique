'use client';
import { Button } from "@/components/ui/button";
import { Form, FormField, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { Eye, EyeOff } from 'react-feather';
import { useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import Loader from "../ui/loaders/Loader";
import { SignUpFormSchema } from "@/lib/authSchema";
import { signUp } from "@/services/auth";
import { z } from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";



export default function RegisterForm() {

  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof SignUpFormSchema>>({
    resolver: zodResolver(SignUpFormSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      phonenumber: "",
      email: "",
      password: ""
    }
  });

  const onReCAPTCHAChange = (token: string | null) => {
    setRecaptchaToken(token);
  };

  const resetRecaptcha = () => {
    if (recaptchaRef.current) {
      recaptchaRef.current.reset();
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const onSubmit = async (values: z.infer<typeof SignUpFormSchema>) => {
    try {
      if (!recaptchaToken) {
        toast.error('Please complete the reCAPTCHA');
        return;
      }
      setLoading(true);
      const res = await signUp(values.firstname, values.lastname, values.phonenumber, values.email, values.password, recaptchaToken);
      const { message, firstname } = res;
      localStorage.setItem('firstname', firstname);
      form.reset();
      setRecaptchaToken(null);
      resetRecaptcha();
      router.push('/');
      toast.success(message)

    } catch (error: any) {
      const errorMessage = axios.isAxiosError(error) && error.response?.data?.error
        ? error.response.data.error
        : "An unexpected error occurred. Please try again.";
      toast.error(errorMessage)
      setRecaptchaToken(null);
      resetRecaptcha();
    } finally {
      setLoading(false);
    }
  };

  // Dynamic fields configuration
  const fields: { name: FieldName; placeholder: string; type: string }[] = [
    { name: "firstname", placeholder: "Enter firstname", type: "text" },
    { name: "lastname", placeholder: "Enter lastname", type: "text" },
    { name: "phonenumber", placeholder: "Enter phonenumber", type: "tel" },
    { name: "email", placeholder: "Enter email", type: "text" }
  ];

  return (
    <div className="min-h-screen justify-center items-center">
      <div className="px-4 py-16 sm:px-6 sm:my-auto md:px-8 md:py-24">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-2xl font-bold sm:text-3xl">Register</h1>
          <p className="mt-3 text-gray-500">Start shopping with us and enjoy brand deals!</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto mt-8 max-w-xl space-y-4">
            {/* Render fields dynamically */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {fields
                .filter((field) => field.name === "firstname" || field.name === "lastname")
                .map((field) => (
                  <FormField
                    key={field.name}
                    control={form.control}
                    name={field.name}
                    render={({ field: formField }) => (
                      <div>
                        <Input
                          type={field.type}
                          {...formField}
                          placeholder={field.placeholder}
                          className="w-full rounded-xl border-gray-200 p-6 pe-12 text-sm shadow-sm"
                          id={`signup-form-input-${field.name}`}
                        />
                        <FormMessage className="text-red-600 pt-3" />
                      </div>
                    )}
                  />
                ))}
            </div>

            {/* Render remaining fields */}
            {fields
              .filter((field) => field.name !== "firstname" && field.name !== "lastname")
              .map((field) => (
                <FormField
                  key={field.name}
                  control={form.control}
                  name={field.name}
                  render={({ field: formField }) => (
                    <div>
                      <Input
                        type={field.type}
                        {...formField}
                        placeholder={field.placeholder}
                        className="w-full rounded-xl border-gray-200 p-6 pe-12 text-sm shadow-sm"
                        id={`signup-form-input-${field.name}`}
                      />
                      <FormMessage className="text-red-600 pt-3" />
                    </div>
                  )}
                />
              ))}
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
                      id="signup-form-input-password"
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

            <div
              style={{
                transform: 'scale(0.8)',
                transformOrigin: '0 0',
                width: '100%',
                display: 'flex',
                justifyContent: 'left',
                marginTop: '15px',
                marginBottom: '-20px',
              }}
            >
              <ReCAPTCHA
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string}
                onChange={onReCAPTCHAChange}
                ref={recaptchaRef}
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full text-center rounded-xl bg-black text-sm font-medium text-white hover:bg-slate-800 p-6"
            >
              Create account {loading && (
                <span className="ml-3">
                  <Loader />
                </span>
              )}
            </Button>

            {/* Already have account? */}
            <p className="text-sm text-center text-gray-500">
              Already have an account?{' '}
              <Link className="text-indigo-600 hover:underline" href="/sign-in">
                Sign in
              </Link>
            </p>
          </form>
        </Form>
      </div>
    </div>
  )
}

