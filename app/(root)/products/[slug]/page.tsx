'use client'

import { useState, useEffect } from "react";
import { getProductBySlug } from "@/services/product";
import Loader from "@/components/ui/Loader";
import Link from "next/link";

function Slugpage({ params: { slug } }: { params: { slug: string } }) {

    type Product = {
        _id: string;
        name: string;
        price: string;
    };

    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const res = await getProductBySlug(slug);
                setProduct(res.product);
            } catch (err: any) {
                setError(err.message || "Failed to fetch products");
            } finally {
                setLoading(false);
            }
        }

        fetchProducts();
    }, [slug]);

    if (loading || !product) return <div className="bg-black"><Loader /></div>;
    if (error) return <div>Error: {error}</div>;


    return (
        <div>
            <h1>All Products</h1>
            <ul>
                <li key={product._id}>{product.name} - {product.price}</li>

            </ul>
        </div>
    )
}

export default Slugpage