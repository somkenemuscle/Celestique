'use client'
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { Eye, EyeOff } from 'react-feather';
import { useState, useRef } from "react";
import axiosInstance from "@/lib/axiosInstance";
import ReCAPTCHA from "react-google-recaptcha";
import Loader from "../ui/Loader"
import { SignUpFormSchema } from "@/lib/authSchema";


export default function RegisterForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);


  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


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

  //Reser captch function
  const resetRecaptcha = () => {
    if (recaptchaRef.current) {
      recaptchaRef.current.reset();
    }
  };


  async function onSubmit(values: z.infer<typeof SignUpFormSchema>) {
    try {
      if (!recaptchaToken) {
        toast({
          className: "shadcn-toast-failure",
          description: "Please complete the reCAPTCHA",
        });
        return;
      }

      // Show loader before making the request
      setLoading(true);

      // Send a POST request to the signup endpoint
      const res = await axiosInstance.post('/auth/signup', {
        firstname: values.firstname,
        lastname: values.lastname,
        phoneNumber: values.phonenumber,
        email: values.email,
        password: values.password,
        recaptchaToken
      });


      // Extract message from response
      const { message, email } = res.data;

      // Store username in local storage
      localStorage.setItem('email', email);

      // Reset the form after successful signup
      form.reset();



      // Clear the reCAPTCHA token
      setRecaptchaToken(null);
      resetRecaptcha();


      // Redirect to the home page or another route after successful signup
      router.push('/');

      // Show success toast notification
      toast({
        className: "shadcn-toast-success",
        description: message
      });

    } catch (error: any) {
      console.error('Error occurred during signup:', error);

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

      // Show error toast notification
      toast({
        className: "shadcn-toast-failure",
        description: errorMessage
      });

      // Clear the reCAPTCHA token
      setRecaptchaToken(null);
      resetRecaptcha();
    } finally {
      // Hide the loader after request is complete (either success or error)
      setLoading(false);
    }
  }



  return (
    <div className="min-h-screen justify-center items-center">
      <div className="px-4 py-48 sm:px-6 sm:my-auto md:px-8 md:py-24">
        <div className="mx-auto max-w-lg text-center">
          <h1 className="text-2xl font-bold sm:text-3xl">Register</h1>
          <p className="mt-3 text-gray-500">
            Start shopping with us and enjoy brand deals!
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto mt-8 max-w-xl space-y-4">
            {/* Name Fields Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Firstname Field */}
              <FormField
                control={form.control}
                name="firstname"
                render={({ field }) => (
                  <div>
                    <Input
                      type="text"
                      {...field}
                      placeholder="Enter firstname"
                      className="w-full rounded-xl border-gray-200 p-6 pe-12 text-sm shadow-sm"
                      id="signup-form-input-firstname"
                    />
                    <FormMessage className="text-red-600 pt-3" />
                  </div>
                )}
              />

              {/* Lastname Field */}
              <FormField
                control={form.control}
                name="lastname"
                render={({ field }) => (
                  <div>
                    <Input
                      type="text"
                      {...field}
                      placeholder="Enter lastname"
                      className="w-full rounded-xl border-gray-200 p-6 pe-12 text-sm shadow-sm"
                      id="signup-form-input-lastname"
                    />
                    <FormMessage className="text-red-600 pt-3" />
                  </div>
                )}
              />
            </div>

            {/* PhoneNumber Field */}
            <FormField
              control={form.control}
              name="phonenumber"
              render={({ field }) => (
                <>
                  <Input
                    type="tel"
                    {...field}
                    placeholder="Enter phonenumber"
                    className="w-full rounded-xl border-gray-200 p-6 pe-12 text-sm shadow-sm"
                    id="signup-form-input-phonenumber"
                  />
                  <FormMessage className="text-red-600" />
                </>
              )}
            />

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
                    id="signup-form-input-email"
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

