'use client';

import { useState, useEffect } from "react";
import { getProductBySlug } from "@/services/product";
import Loader from "@/components/ui/Loader";
import Image from "next/image";
import { addToCart } from "@/services/cart";

function Slugpage({ params: { slug } }: { params: { slug: string } }) {
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // States for user input
    const [selectedQuantity, setSelectedQuantity] = useState<number>(1);
    const [selectedSize, setSelectedSize] = useState<string>("");
    const [selectedColor, setSelectedColor] = useState<string>("");

    useEffect(() => {
        async function fetchProduct() {
            try {
                const res = await getProductBySlug(slug);
                setProduct(res.product);
            } catch (err: any) {
                setError(err.message || "Failed to fetch products");
            } finally {
                setLoading(false);
            }
        }

        fetchProduct();
    }, [slug]);


    // Handler for adding to cart
    const handleAddToCart = async () => {
        if (!selectedSize || !selectedColor || selectedQuantity <= 0) {
            alert("Please select size, color, and a valid quantity.");
            return;
        }
        try {
            await addToCart(product!._id, selectedQuantity, selectedSize, selectedColor);
            alert("Item added to cart successfully!");
        } catch (error: any) {
            alert(error.message || "Failed to add item to cart.");
        }
    };

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

                {/* Size Selection */}
                <li>
                    <label htmlFor="size">Size:</label>
                    <select
                        id="size"
                        value={selectedSize}
                        onChange={(e) => setSelectedSize(e.target.value)}
                    >
                        <option value="">Select Size</option>
                        {product.sizes.map((size: string) => (
                            <option key={size} value={size}>
                                {size}
                            </option>
                        ))}
                    </select>
                </li>

                {/* Color Selection */}
                <li>
                    <label htmlFor="color">Color:</label>
                    <select
                        id="color"
                        value={selectedColor}
                        onChange={(e) => setSelectedColor(e.target.value)}
                    >
                        <option value="">Select Color</option>
                        {product.colors.map((color: string) => (
                            <option key={color} value={color}>
                                {color}
                            </option>
                        ))}
                    </select>
                </li>

                {/* Quantity Selection */}
                <li>
                    <label htmlFor="quantity">Quantity:</label>
                    <input
                        type="number"
                        id="quantity"
                        min="1"
                        max={product.quantity}
                        value={selectedQuantity}
                        onChange={(e) => setSelectedQuantity(Number(e.target.value))}
                    />
                </li>
            </ul>

            <button
                className="bg-black text-white p-4"
                onClick={handleAddToCart}
            >
                Add to cart
            </button>
        </div>
    );
}

export default Slugpage;
