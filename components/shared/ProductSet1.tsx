'use client';

import { useState, useEffect } from "react";
import { getAllProducts } from "@/services/product";
import ProductCard from "@/components/ui/ProductCard";
import Link from "next/link";
import ProductHomePageSkeleton from "../ui/skelentons/ProductCardHomePageSkeleton";


export default function ProductSet1() {
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


    if (loading) return <div><ProductHomePageSkeleton /></div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <>
            <h1 className="pl-4 lg:pl-8 font-extrabold text-xl tracking-wide mt-16 font-sans">SHOP THE LATEST</h1>
            <h4 className="pl-4 lg:pl-8 font-medium text-sm tracking-wide text-gray-500 font-sans">Men's T-Shirts</h4>
            <ul className="grid grid-cols-2 sm:grid-cols-2  md:grid-cols-4 lg:grid-cols-4 px-4 sm:p-4 lg:px-8 gap-x-8 mt-4">
                {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </ul>
        </>

    )
}
