'use client';

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";



function ProductCard({ product }: { product: Product }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div>
            <Link href={`/products/${product.slug}`}>
                <li
                    className="mb-7 relative group"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <Image
                        src={isHovered && product.images[1] ? product.images[1] : product.images[0]}
                        alt={product.name}
                        width={500}
                        height={500}
                        className="pb-4 transition-transform duration-300"
                    />
                    <h2 className="text-xs font-medium tracking-wide mt-2">{product.name}</h2>
                    <p className="tracking-wide text-xs font-medium">
                        ₦{product.price.toLocaleString()}
                    </p>
                </li>
            </Link>
        </div>

    );
}

export default ProductCard;
