'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import { getAllProducts } from "@/services/product";
import ProductCard from "@/components/ui/ProductCard";
import ProductHomePageSkeleton from "../ui/skelentons/ProductCardHomePageSkeleton";


export default function ProductSet1({ header, subheader }: { header: string, subheader: string }) {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        fetchProducts();
    }, []);


    async function fetchProducts() {
        setLoading(true);
        setError(null);
        try {
            const res = await getAllProducts(1);
            setProducts(res.products.splice(0, 4));
        } catch (err: any) {
            setError(err.message || "Failed to fetch products");
        } finally {
            setLoading(false);
        }
    };


    if (loading) return <ProductHomePageSkeleton />;
    if (error) return <div>Error: {error}</div>;

    return (
        <section className="mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:px-20">
            <div className="mb-10 flex flex-col items-center text-center">
                <span className="eyebrow">{subheader}</span>
                <h2 className="mt-2 font-display text-3xl font-medium text-ink-900 sm:text-4xl">{header}</h2>
                <Link href="/products" className="link-underline mt-4 text-xs font-medium uppercase tracking-[0.2em] text-ink-500">
                    View all
                </Link>
            </div>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4 lg:gap-x-8">
                {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </ul>
        </section>
    )
}
