'use client';

import { Button } from "@/components/ui/button";
import { Form, FormField, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import Loader from "../ui/Loader";
import { shippingFormSchema } from "@/lib/shippingSchema";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { initializePayment } from "@/services/paystack";
import { NIGERIAN_STATES } from "@/constants/states";
import { CiDeliveryTruck } from "react-icons/ci";
import { FaCcMastercard } from "react-icons/fa";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"




export default function ShippingAddressForm({ cart }: { cart: Cart }) {
  const { toast } = useToast();
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
      country: "🇳🇬 Nigeria (NIG)",
    },
  });

  const onSubmit = async (values: z.infer<typeof shippingFormSchema>) => {
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
    }
    if (!cart.totalPrice) {
      return alert('Total Price is missing. Please make an order.');
    }
    try {
      const { data } = await initializePayment(cart.totalPrice, shippingAddress);
      if (data.authorization_url) {
        router.push(data.authorization_url);
      }
    } catch (error) {
      console.error('Payment Error:', error);
    }
    finally {
      setLoading(false);
    }
  };


  return (
    <div className="mt-10 mb-10">
      <div className="container mx-auto px-6 sm:px-6 md:px-20 lg:px-20">
        {/* Main Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* SHIPPING FORM SECTION - Left */}
          <div className="lg:col-span-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                {/* Delivery Details */}
                <div>
                  <span className="font-semibold">Delivery details</span>
                  <span className="block text-sm text-gray-500">
                    Expect delivery 2 - 3 days after you make your order.
                  </span>
                  <div className="w-full p-4 border border-black text-sm rounded-xl mt-3 flex justify-between items-center">
                    <span className="text-left">Shipping</span>
                    <span className="text-right">
                      <CiDeliveryTruck className="size-5" />
                    </span>
                  </div>
                </div>

                {/* 2x2 Grid for Firstname and Lastname */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {(["firstname", "lastname"] as CheckOutFieldName[]).map((name) => (
                    <FormField
                      key={name}
                      control={form.control}
                      name={name}
                      render={({ field }) => (
                        <div>
                          <Input
                            type="text"
                            {...field}
                            placeholder={`Enter ${name}`}
                            className="w-full rounded-xl border-gray-200 p-6 text-sm shadow-sm"
                          />
                          <FormMessage className="text-red-600 pt-3" />
                        </div>
                      )}
                    />
                  ))}
                </div>

                {/* Country Input */}
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <div>
                      <Input
                        type="text"
                        {...field}
                        readOnly
                        placeholder="Enter country"
                        className="w-full rounded-xl border-black p-6 text-sm shadow-sm"
                      />
                      <FormMessage className="text-red-600 pt-3" />
                    </div>
                  )}
                />

                {/* Address Input */}
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <div>
                      <Input
                        type="text"
                        {...field}
                        placeholder="Enter address"
                        className="w-full rounded-xl border-gray-200 p-6 text-sm shadow-sm"
                      />
                      <FormMessage className="text-red-600 pt-3" />
                    </div>
                  )}
                />

                {/* 3x3 Grid for City, State, and Postal Code */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {(["city", "postalCode"] as CheckOutFieldName[]).map((name) => (
                    <FormField
                      key={name}
                      control={form.control}
                      name={name}
                      render={({ field }) => (
                        <div>
                          <Input
                            type="text"
                            {...field}
                            placeholder={`Enter ${name}`}
                            className="w-full rounded-xl border-gray-200 p-6 text-sm shadow-sm"
                          />
                          <FormMessage className="text-red-600 pt-3" />
                        </div>
                      )}
                    />
                  ))}
                  {/* State Dropdown */}
                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <Controller
                        name="state"
                        control={form.control}
                        render={({ field }) => (
                          <div>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <SelectTrigger className="w-full rounded-xl p-6 text-sm text-gray-500">
                                <SelectValue placeholder="Select a state" />
                              </SelectTrigger>
                              <SelectContent className="rounded-xl">
                                <SelectGroup>
                                  {NIGERIAN_STATES.map((state) => (
                                    <SelectItem key={state} value={state}>
                                      {state}
                                    </SelectItem>
                                  ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                            <FormMessage className="text-red-600 pt-3" />
                          </div>
                        )}
                      />
                    )}
                  />
                </div>

                {/* Phone Number Input */}
                <FormField
                  control={form.control}
                  name="phonenumber"
                  render={({ field }) => (
                    <div>
                      <Input
                        type="tel"
                        {...field}
                        placeholder="Enter phone number"
                        className="w-full rounded-xl border-gray-200 p-6 text-sm shadow-sm"
                      />
                      <FormMessage className="text-red-600 pt-3" />
                    </div>
                  )}
                />

                {/* Shipping Method Section */}
                <div>
                  <span className="font-semibold">Shipping method</span>
                  <div className="w-full p-4 border border-black text-sm rounded-xl mt-3 flex justify-between items-center">
                    <span className="text-left">Standard Shipping</span>
                    <span className="text-right font-semibold">
                      ₦{cart.deliveryFee.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Payment Method Section */}
                <div>
                  <span className="font-semibold">Payment method</span>
                  <span className="block text-sm text-gray-500">
                    All transactions are secure and encrypted.
                  </span>
                  <div className="w-full p-4 border border-black text-sm rounded-xl mt-3 flex justify-between items-center">
                    <span className="text-left">Paystack</span>
                    <span className="text-right font-semibold">
                      <FaCcMastercard className="size-5 text-blue-700" />
                    </span>
                  </div>
                  <span className="block text-center py-3 px-7 text-sm">
                    After clicking “Pay now”, you will be redirected to Paystack to complete your purchase securely.
                  </span>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className={`w-full text-center rounded-xl bg-black text-sm font-medium text-white hover:bg-slate-900 p-7 tracking-wider`}
                  disabled={cart.totalPrice === 0}
                >
                  {loading ? (
                    <span className="ml-3">
                      <Loader />
                    </span>
                  ) : (`Pay Now (₦${cart.totalPrice.toLocaleString()})`)}
                </Button>
              </form>
            </Form>
          </div>

          {/* CHECKOUT SUMMARY SECTION - Right */}
          <div className="p-6 border lg:px-10 lg:col-span-6 rounded-xl sm:h-full lg:h-full bg-gray-50">
            {cart.items.map((item, index) => (
              <div key={index} className="flex items-center border-b pb-4 mb-4">
                {/* Product Image */}
                <Image
                  src={item.product.images.length === 0 ? "" : item.product.images[0]}
                  alt={item.product.name}
                  width={54}
                  height={54}
                  className="rounded-xl border p-1 bg-gray-100"
                />

                {/* Product Details */}
                <div className="ml-4 flex-grow">
                  <h2 className="text-xs font-bold uppercase">
                    {item.product.name}
                  </h2>
                  <p className="text-xs text-gray-600">
                    {item.product.gender.gender} / {item.size} / {item.color}
                  </p>
                  <p className="text-xs text-gray-600">QTY - {item.quantity}</p>
                  {Number(item.product.quantity) === 0 && (
                    <p className="text-red-600 font-bold text-sm">OUT OF STOCK</p>
                  )}
                </div>

                <p className="text-sm" id="cart-item-price">
                  {`₦${item.subtotal.toLocaleString()}`}
                </p>
              </div>
            ))}

            {/* Summary */}
            <div className="text-sm">
              <div className="flex justify-between items-center py-2">
                <span className="text-left">
                  Subtotal ({cart.items.length} items)
                </span>
                <span className="text-right tracking-wide">
                  ₦{cart.subtotal.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between items-center py-2">
                <span className="text-left">Shipping fee</span>
                <span className="text-right tracking-wide">
                  ₦{cart.deliveryFee.toLocaleString()}
                </span>
              </div>

              <hr className="my-2" />

              <div className="flex justify-between items-center font-bold text-lg py-2">
                <span className="text-left">Total</span>
                <span className="text-right">
                  ₦{cart.totalPrice.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



