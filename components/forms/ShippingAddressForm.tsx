'use client';

import { Button } from "@/components/ui/button";
import { Form, FormField, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import Loader from "../ui/loaders/Loader";
import { shippingFormSchema } from "@/lib/shippingSchema";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { initializePayment } from "@/services/paystack";
import { NIGERIAN_STATES } from "@/constants/states";
import { CiDeliveryTruck } from "react-icons/ci";
import { FaLock } from "react-icons/fa";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const inputBase =
  "h-11 w-full rounded-none border border-ink-200 bg-white px-3.5 text-sm text-ink-900 shadow-none transition-colors placeholder:text-ink-400 focus-visible:border-ink-900 focus-visible:ring-0";
const labelClass = "mb-2 block text-[11px] font-medium uppercase tracking-[0.14em] text-ink-500";

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="border-b border-ink-100 pb-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-900">
      {children}
    </h2>
  );
}

export default function ShippingAddressForm({ cart }: { cart: Cart }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof shippingFormSchema>>({
    resolver: zodResolver(shippingFormSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      phonenumber: "",
      address: "",
      city: "",
      state: "",
      postalCode: "",
      country: "Nigeria",
    },
  });

  const onSubmit = async (values: z.infer<typeof shippingFormSchema>) => {
    if (!cart.totalPrice) {
      return alert("Total price is missing. Please make an order.");
    }
    setLoading(true);
    const shippingAddress = {
      firstName: values.firstname,
      lastName: values.lastname,
      phoneNumber: values.phonenumber,
      address: values.address,
      city: values.city,
      state: values.state,
      postalCode: values.postalCode,
      country: "Nigeria",
    };
    try {
      const { data } = await initializePayment(cart.totalPrice, shippingAddress);
      if (data.authorization_url) {
        router.push(data.authorization_url);
      }
    } catch (error) {
      console.error("Payment Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 grid grid-cols-1 gap-x-12 gap-y-12 lg:grid-cols-[1fr_400px]">
      {/* Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-xl space-y-10">
          {/* Delivery */}
          <section className="space-y-4">
            <SectionHeading>Delivery</SectionHeading>
            <p className="text-sm text-ink-500">
              Expect delivery 2 to 3 days after you place your order.
            </p>
            <div className="flex items-center justify-between border border-ink-200 px-4 py-3.5 text-sm text-ink-700">
              <span>Door delivery</span>
              <CiDeliveryTruck className="size-5 text-ink-500" />
            </div>
          </section>

          {/* Address */}
          <section className="space-y-5">
            <SectionHeading>Shipping address</SectionHeading>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {(["firstname", "lastname"] as CheckOutFieldName[]).map((name) => (
                <FormField
                  key={name}
                  control={form.control}
                  name={name}
                  render={({ field }) => (
                    <div>
                      <label className={labelClass}>
                        {name === "firstname" ? "First name" : "Last name"}
                      </label>
                      <Input type="text" {...field} placeholder={name === "firstname" ? "Jane" : "Doe"} className={inputBase} />
                      <FormMessage className="pt-2 text-xs text-red-600" />
                    </div>
                  )}
                />
              ))}
            </div>

            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <div>
                  <label className={labelClass}>Country</label>
                  <Input
                    type="text"
                    {...field}
                    readOnly
                    className={`${inputBase} cursor-not-allowed bg-ink-50 text-ink-500`}
                  />
                  <FormMessage className="pt-2 text-xs text-red-600" />
                </div>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <div>
                  <label className={labelClass}>Address</label>
                  <Input type="text" {...field} placeholder="Street address" className={inputBase} />
                  <FormMessage className="pt-2 text-xs text-red-600" />
                </div>
              )}
            />

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <div>
                    <label className={labelClass}>City</label>
                    <Input type="text" {...field} placeholder="City" className={inputBase} />
                    <FormMessage className="pt-2 text-xs text-red-600" />
                  </div>
                )}
              />

              <FormField
                control={form.control}
                name="state"
                render={() => (
                  <Controller
                    name="state"
                    control={form.control}
                    render={({ field }) => (
                      <div>
                        <label className={labelClass}>State</label>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <SelectTrigger className={`${inputBase} text-ink-900 data-[placeholder]:text-ink-400`}>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent className="rounded-none">
                            <SelectGroup>
                              {NIGERIAN_STATES.map((state) => (
                                <SelectItem key={state} value={state}>
                                  {state}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        <FormMessage className="pt-2 text-xs text-red-600" />
                      </div>
                    )}
                  />
                )}
              />

              <FormField
                control={form.control}
                name="postalCode"
                render={({ field }) => (
                  <div>
                    <label className={labelClass}>Postal code</label>
                    <Input type="text" {...field} placeholder="100001" className={inputBase} />
                    <FormMessage className="pt-2 text-xs text-red-600" />
                  </div>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="phonenumber"
              render={({ field }) => (
                <div>
                  <label className={labelClass}>Phone number</label>
                  <Input type="tel" {...field} placeholder="0801 234 5678" className={inputBase} />
                  <FormMessage className="pt-2 text-xs text-red-600" />
                </div>
              )}
            />
          </section>

          {/* Shipping method */}
          <section className="space-y-4">
            <SectionHeading>Shipping method</SectionHeading>
            <div className="flex items-center justify-between border border-ink-200 px-4 py-3.5 text-sm text-ink-700">
              <span>Standard shipping</span>
              <span className="font-medium text-ink-900">
                &#8358;{cart.deliveryFee.toLocaleString()}
              </span>
            </div>
          </section>

          {/* Payment method */}
          <section className="space-y-4">
            <SectionHeading>Payment</SectionHeading>
            <p className="text-sm text-ink-500">All transactions are secure and encrypted.</p>
            <div className="flex items-center justify-between border border-ink-200 px-4 py-3.5 text-sm text-ink-700">
              <span>Paystack</span>
              <span className="text-[11px] uppercase tracking-[0.12em] text-ink-400">
                Card / Transfer / USSD
              </span>
            </div>
            <p className="text-xs leading-relaxed text-ink-400">
              After you tap Pay, you will be redirected to Paystack to complete your purchase securely.
            </p>
          </section>

          <Button
            type="submit"
            disabled={cart.totalPrice === 0 || loading}
            className="h-12 w-full rounded-none bg-ink-900 text-[11px] font-semibold uppercase tracking-[0.16em] text-white hover:bg-ink-700"
          >
            {loading ? <Loader /> : `Pay ₦${cart.totalPrice.toLocaleString()}`}
          </Button>
        </form>
      </Form>

      {/* Summary */}
      <div className="lg:sticky lg:top-24 lg:h-fit">
        <div className="border border-ink-100 p-6">
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-900">
            Order summary
          </h2>

          <ul className="mt-5 divide-y divide-ink-100 border-y border-ink-100">
            {cart.items.map((item, index) => (
              <li key={index} className="flex gap-3 py-4">
                <div className="relative aspect-[3/4] w-14 shrink-0 overflow-hidden bg-ink-50">
                  {item.product.images?.[0] && (
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  )}
                </div>
                <div className="flex min-w-0 flex-1 flex-col">
                  <p className="truncate text-[11px] font-medium uppercase tracking-[0.1em] text-ink-900">
                    {item.product.name}
                  </p>
                  <p className="mt-1 flex items-center gap-1.5 text-xs text-ink-500">
                    <span>{item.size}</span>
                    <span className="text-ink-300">/</span>
                    <span
                      className="inline-block h-2.5 w-2.5 rounded-full border border-ink-200"
                      style={{ backgroundColor: item.color?.toLowerCase() }}
                      title={item.color}
                    />
                    <span className="text-ink-300">/</span>
                    <span>Qty {item.quantity}</span>
                  </p>
                  {Number(item.product.quantity) === 0 && (
                    <span className="mt-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-red-600">
                      Out of stock
                    </span>
                  )}
                  <p className="mt-auto pt-2 text-xs font-medium text-ink-900">
                    &#8358;{item.subtotal.toLocaleString()}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <dl className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between text-ink-500">
              <dt>Subtotal ({cart.items.length} {cart.items.length === 1 ? "item" : "items"})</dt>
              <dd className="text-ink-900">&#8358;{cart.subtotal.toLocaleString()}</dd>
            </div>
            <div className="flex justify-between text-ink-500">
              <dt>Shipping</dt>
              <dd className="text-ink-900">&#8358;{cart.deliveryFee.toLocaleString()}</dd>
            </div>
            <div className="flex justify-between border-t border-ink-100 pt-3 text-base font-medium text-ink-900">
              <dt>Total</dt>
              <dd>&#8358;{cart.totalPrice.toLocaleString()}</dd>
            </div>
          </dl>

          <div className="mt-5 flex items-center justify-center gap-1.5 text-[10px] uppercase tracking-[0.14em] text-ink-400">
            <FaLock className="h-2.5 w-2.5" /> Secure checkout
          </div>
        </div>
      </div>
    </div>
  );
}
