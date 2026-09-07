'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { getCart } from "@/services/cart";
import ShippingAddressForm from "@/components/forms/ShippingAddressForm";
import ShippingFormSkelenton from "@/components/ui/skelentons/ShippingFormSkelenton";

function CheckoutPage() {
    const [cart, setCart] = useState<Cart | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [needsAuth, setNeedsAuth] = useState(false);

    useEffect(() => {
        async function fetchCartItems() {
            try {
                const res = await getCart();
                setCart(res.cart);
            } catch (err: any) {
                if (err?.response?.status === 401) {
                    setNeedsAuth(true);
                } else {
                    setError(err?.response?.data?.message || "Failed to load your bag");
                }
            } finally {
                setLoading(false);
            }
        }
        fetchCartItems();
    }, []);

    if (loading) return <ShippingFormSkelenton />;

    if (needsAuth) {
        return (
            <div className="mx-auto max-w-[1400px] px-4 pb-24 pt-14 text-center sm:px-6 lg:px-10 lg:pt-20">
                <h1 className="border-b border-ink-100 pb-6 font-display text-3xl font-medium tracking-[0.01em] text-ink-900 sm:text-4xl">
                    Checkout
                </h1>
                <div className="mt-8 border border-ink-100 py-24">
                    <h2 className="text-sm font-medium uppercase tracking-[0.14em] text-ink-900">
                        Sign in to check out
                    </h2>
                    <p className="mx-auto mt-2 max-w-sm text-sm text-ink-500">
                        You need an account to place an order. Sign in and your bag will be waiting.
                    </p>
                    <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                        <Link
                            href="/sign-in"
                            className="border border-ink-900 bg-ink-900 px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-ink-700"
                        >
                            Sign in
                        </Link>
                        <Link
                            href="/register"
                            className="border border-ink-300 px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-900 transition hover:border-ink-900"
                        >
                            Create account
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !cart) {
        return (
            <div className="mx-auto max-w-[1400px] px-4 py-32 text-center sm:px-6 lg:px-10">
                <p className="text-sm text-ink-700">{error ?? "Your bag is unavailable right now"}</p>
                <Link
                    href="/cart"
                    className="mt-6 inline-block border border-ink-900 px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-900 transition hover:bg-ink-900 hover:text-white"
                >
                    Back to bag
                </Link>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-[1120px] px-4 pb-20 pt-14 sm:px-6 lg:px-10 lg:pt-20">
            <Link
                href="/cart"
                className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-500 transition-colors hover:text-ink-900"
            >
                <span>&lsaquo;</span> Back to bag
            </Link>
            <h1 className="mt-6 border-b border-ink-100 pb-6 font-display text-3xl font-medium tracking-[0.01em] text-ink-900 sm:text-4xl">
                Checkout
            </h1>

            <ShippingAddressForm cart={cart} />
        </div>
    );
}

export default CheckoutPage;
