'use client';

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { saveProductToFavorite } from "@/services/favoriteProduct";
import toast from "react-hot-toast";

function ProductCard({ product }: { product: Product }) {
    const [isHovered, setIsHovered] = useState(false);
    const [saved, setSaved] = useState(false);

    async function handleSave() {
        setSaved(true);
        try {
            const res = await saveProductToFavorite(product._id);
            toast.success(res.message);
        } catch (error) {
            setSaved(false);
            console.log(error);
        }
    }

    const extraColors =
        product.colors?.length > 4 ? product.colors.length - 4 : 0;

    return (
        <li
            className="group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="relative overflow-hidden bg-ink-50">
                <button
                    onClick={handleSave}
                    aria-label="Save to wishlist"
                    aria-pressed={saved}
                    className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 opacity-0 shadow-sm backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100 focus-visible:opacity-100"
                >
                    {saved ? (
                        <FaHeart className="text-ink-900" size={14} />
                    ) : (
                        <FaRegHeart className="text-ink-700 hover:text-ink-900" size={14} />
                    )}
                </button>
                <Link href={`/products/${product.slug}`}>
                    <div className="aspect-[3/4] w-full">
                        <Image
                            src={isHovered && product.images[1] ? product.images[1] : product.images[0]}
                            alt={product.name}
                            width={500}
                            height={667}
                            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                        />
                    </div>
                </Link>
            </div>

            <Link href={`/products/${product.slug}`} className="mt-3 block">
                <h3 className="truncate text-[11px] font-medium uppercase tracking-[0.12em] text-ink-700">
                    {product.name}
                </h3>
            </Link>
            <p className="mt-1.5 text-sm text-ink-900">
                ₦{product.price.toLocaleString()}
            </p>

            {product.colors?.length > 0 && (
                <ul className="mt-2.5 flex items-center gap-1.5">
                    {product.colors.slice(0, 4).map((color, index) => (
                        <li
                            key={index}
                            className="h-3 w-3 rounded-full border border-ink-200"
                            style={{ backgroundColor: color }}
                        />
                    ))}
                    {extraColors > 0 && (
                        <li className="text-[10px] text-ink-400">+{extraColors}</li>
                    )}
                </ul>
            )}
        </li>
    );
}

export default ProductCard;
