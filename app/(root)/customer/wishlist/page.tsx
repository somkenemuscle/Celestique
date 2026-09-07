'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import ProductCard from "@/components/ui/ProductCard";
import ProductGridSkeleton from "@/components/ui/skelentons/ProductGridSkeleton";
import ProductSet1 from "@/components/shared/ProductSet1";
import { getUsersSavedProducts } from "@/services/favoriteProduct";

function WishlistPage() {
    const [savedProducts, setSavedProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [needsAuth, setNeedsAuth] = useState(false);

    useEffect(() => {
        async function fetchSavedProducts() {
            try {
                const res = await getUsersSavedProducts();
                setSavedProducts(res.favoriteProducts?.savedItems ?? []);
            } catch (err: any) {
                if (err?.response?.status === 401) {
                    setNeedsAuth(true);
                } else {
                    setError(err?.response?.data?.message || "Failed to load your wishlist");
                }
            } finally {
                setLoading(false);
            }
        }
        fetchSavedProducts();
    }, []);

    const Shell = ({ children }: { children: React.ReactNode }) => (
        <div className="mx-auto max-w-[1400px] px-4 pb-24 pt-14 sm:px-6 lg:px-10 lg:pt-20">
            <header className="border-b border-ink-100 pb-6">
                <h1 className="font-display text-3xl font-medium tracking-[0.01em] text-ink-900 sm:text-4xl">
                    Wishlist
                </h1>
                {!loading && !needsAuth && savedProducts.length > 0 && (
                    <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-ink-400">
                        {savedProducts.length} {savedProducts.length === 1 ? "saved item" : "saved items"}
                    </p>
                )}
            </header>
            <div className="mt-8">{children}</div>
        </div>
    );

    if (loading) {
        return (
            <Shell>
                <ProductGridSkeleton />
            </Shell>
        );
    }

    if (needsAuth) {
        return (
            <Shell>
                <div className="border border-ink-100 py-24 text-center">
                    <svg viewBox="0 0 24 24" fill="none" className="mx-auto h-10 w-10 text-ink-300" stroke="currentColor" strokeWidth="1.25">
                        <path d="M12 20s-7-4.35-9.5-8.5C1 8.5 2.5 5 6 5c2 0 3.2 1.2 4 2.3C10.8 6.2 12 5 14 5c3.5 0 5 3.5 3.5 6.5C19 15.65 12 20 12 20Z" strokeLinejoin="round" />
                    </svg>
                    <h2 className="mt-5 text-sm font-medium uppercase tracking-[0.14em] text-ink-900">
                        Sign in to see your wishlist
                    </h2>
                    <p className="mt-2 text-sm text-ink-500">
                        Saved items are kept with your account.
                    </p>
                    <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                        <Link href="/sign-in" className="border border-ink-900 bg-ink-900 px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-ink-700">
                            Sign in
                        </Link>
                        <Link href="/register" className="border border-ink-300 px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-900 transition hover:border-ink-900">
                            Create account
                        </Link>
                    </div>
                </div>
            </Shell>
        );
    }

    if (error) {
        return (
            <Shell>
                <div className="border border-ink-100 py-16 text-center">
                    <p className="text-sm text-ink-700">{error}</p>
                </div>
            </Shell>
        );
    }

    return (
        <>
            <Shell>
                {savedProducts.length === 0 ? (
                    <div className="border border-ink-100 py-24 text-center">
                        <svg viewBox="0 0 24 24" fill="none" className="mx-auto h-10 w-10 text-ink-300" stroke="currentColor" strokeWidth="1.25">
                            <path d="M12 20s-7-4.35-9.5-8.5C1 8.5 2.5 5 6 5c2 0 3.2 1.2 4 2.3C10.8 6.2 12 5 14 5c3.5 0 5 3.5 3.5 6.5C19 15.65 12 20 12 20Z" strokeLinejoin="round" />
                        </svg>
                        <h2 className="mt-5 text-sm font-medium uppercase tracking-[0.14em] text-ink-900">
                            Your wishlist is empty
                        </h2>
                        <p className="mt-2 text-sm text-ink-500">
                            Tap the heart on any product to save it here.
                        </p>
                        <Link
                            href="/products"
                            className="mt-6 inline-block border border-ink-900 px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-900 transition hover:bg-ink-900 hover:text-white"
                        >
                            Browse products
                        </Link>
                    </div>
                ) : (
                    <ul className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-3 xl:grid-cols-4">
                        {savedProducts.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </ul>
                )}
            </Shell>

            <div className="mx-auto max-w-[1400px] px-4 pb-16 sm:px-6 lg:px-10">
                <ProductSet1 header="You might also like" subheader="Recommended for you" />
            </div>
        </>
    );
}

export default WishlistPage;
