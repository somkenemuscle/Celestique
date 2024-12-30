'use client'

import ProductCard from "@/components/ui/ProductCard";
import { useState, useEffect } from "react";
import ProductHomePageSkeleton from "@/components/ui/skelentons/ProductCardHomePageSkeleton";
import StatusGraphic from "@/components/ui/StatusGraphic";
import { FaHeart } from "react-icons/fa";
import ProductSet1 from "@/components/shared/ProductSet1";
import { getUsersSavedProducts } from "@/services/favoriteProduct";

function WishlistPage() {
    const [savedProducts, setSavedProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        async function fetchSavedProducts() {
            try {
                setLoading(true);
                const res = await getUsersSavedProducts();
                setSavedProducts(res.favoriteProducts.savedItems);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        fetchSavedProducts();
    }, []);


    if (loading) return <ProductHomePageSkeleton />;

    return (
        <div className="px-1 md:px-10">
            {savedProducts.length === 0 ? <StatusGraphic message="You have not saved any product yet" /> : (
                <>
                    <h1 className="pl-4 lg:pl-8 font-extrabold text-xl tracking-wide mt-16 font-sans">
                        Saved Items <FaHeart className="text-red-600 inline-block" size={18} />
                    </h1>
                    <h4 className="pl-4 lg:pl-8 font-medium text-sm tracking-wide text-gray-500 font-sans">Preview of your saved wishlist</h4>
                    <ul className="grid grid-cols-2 sm:grid-cols-2  md:grid-cols-4 lg:grid-cols-4 px-4 sm:p-4 lg:px-8 gap-x-8 mt-4">
                        {savedProducts.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </ul>
                </>
            )}
            <ProductSet1 header="Recommended" subheader="You might also like this" />
        </div>
    )
}

export default WishlistPage