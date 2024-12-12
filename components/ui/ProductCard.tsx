'use client';

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaHeart, FaRegHeart } from "react-icons/fa"; // Using Font Awesome icons

function ProductCard({ product }: { product: Product }) {
    const [isHovered, setIsHovered] = useState(false);


    return (
        <div>
            <li
                className="mb-7 relative group"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Heart Icon */}
                <button className="absolute top-2 right-2  p-1">
                    <FaRegHeart className="text-gray-500 hover:text-red-700" size={18} />
                </button>
                <Link href={`/products/${product.slug}`}>
                    {/* Product Image */}
                    <Image
                        src={isHovered && product.images[1] ? product.images[1] : product.images[0]}
                        alt={product.name}
                        width={500}
                        height={500}
                        className="rounded"
                    />
                </Link>
                {/* Product Name */}
                <h2 className="text-xs font-medium tracking-wide mt-2 truncate">{product.name}</h2>

                {/* Product Price */}
                <p className="tracking-wide text-sm font-bold text-amber-800">
                    ₦{product.price.toLocaleString()}
                </p>

                <ul>
                    {product.colors.map((color, index) => (
                        <li
                            key={index} className="inline-block w-4 h-4 rounded-full mr-2 border border-gray-200"
                            style={{ backgroundColor: color }}
                        ></li>
                    ))}
                </ul>
            </li>
        </div>
    );
}

export default ProductCard;
