'use client';

import { useState, useEffect } from "react";
import { getAllProducts } from "@/services/product";
import ProductCard from "@/components/ui/ProductCard";
import ProductCardSkeleton from "../ui/skelentons/ProductCardSkeleton";
import Link from "next/link";


export default function ProductSet2() {
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
            setProducts(res.products.splice(4,8));
        } catch (err: any) {
            setError(err.message || "Failed to fetch products");
        } finally {
            setLoading(false);
        }
    };


    if (loading) return <div><ProductCardSkeleton /></div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <>
            <ul className="grid grid-cols-2 sm:grid-cols-2  md:grid-cols-4 lg:grid-cols-4 px-4 sm:p-4 lg:px-8 gap-x-8 mt-10">
                {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
                <Link href={'/products'}>
                    <button className="px-6 py-2 font-sans font-medium tracking-wider  border border-solid text-white bg-black">
                        View More
                    </button>
                </Link>
            </ul>
        </>

    )
}
