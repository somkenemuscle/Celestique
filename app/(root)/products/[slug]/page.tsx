'use client'

import { useState, useEffect } from "react";
import { getProductBySlug } from "@/services/product";
import Loader from "@/components/ui/Loader";
import Image from "next/image";


function Slugpage({ params: { slug } }: { params: { slug: string } }) {

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
            <ul>
                <li>{product.name} - ₦{product.price}</li>
                <li>{product.quantity} Units left</li>
                <Image
                    src={product.images[0]}
                    alt="Product-Image"
                    width={500}
                    height={500}
                />
                <li>{product.description}</li>
                <li>{product.sizes}</li>
                <li>{product.colors}</li>
            </ul>
        </div>
    )
}

export default Slugpage;