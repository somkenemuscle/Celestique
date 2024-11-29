'use client';

import { useState, useEffect } from "react";
import { getProductBySlug } from "@/services/product";
import Loader from "@/components/ui/Loader";
import Image from "next/image";
import { addToCart } from "@/services/cart";
import useCartStore from "@/store/cartStore";




function Slugpage({ params: { slug } }: { params: { slug: string } }) {
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { setGlobalCart } = useCartStore();


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
            setLoading(true)
            const res = await addToCart(product!._id, selectedQuantity, selectedSize, selectedColor);
            setGlobalCart(res.cart)
            console.log("Item added to cart successfully!");
        } catch (error: any) {
            alert(error.message || "Failed to add item to cart.");
        } finally {
            setLoading(false)
        }
    };



    if (!product) return;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="grid grid-cols-12 mt-48 slug-page-body">
            {/* Carousel Section */}
            <div className="col-span-12 md:col-span-6 flex justify-center">
                <Image
                    src={product.images[0]}
                    alt={`${product.name}`}
                    width={700}
                    height={700}
                    className="object-contain"
                />
            </div>

            {/* Product Details Section */}
            <div className="col-span-12 p-10 lg:pr-20 sm:p-20 md:col-span-6 hover:cursor-pointer">
                <p className="text-sm text-gray-500 mb-1">Celestique</p>
                <h1 className="text-2xl font-semibold mb-1 tracking-wide">{product.name}</h1>
                <p className="text-lg tracking-wide"> ₦ {product.price.toLocaleString()}</p>
                <p className="text-sm tracking-wider text-gray-500 mb-6 flex items-center ">
                    <span className="flex items-center justify-center mr-2">
                        <span
                            className={`absolute h-2 w-2 rounded-full bg-opacity-50 animate-pulse-ring ${product.quantity > 10 ? 'bg-green-600' : 'bg-red-500'
                                }`}
                        ></span>
                        <span
                            className={`h-2 w-2 rounded-full ${product.quantity > 10 ? 'bg-green-500' : 'bg-red-500'
                                }`}
                        ></span>
                    </span>
                    {product.quantity > 10 ? <span>In Stock </span> : <span>Low Stock </span>} . ( {product.quantity} Units left )
                </p>

                <hr />

                {/* Size Selection */}
                <div className="my-6">
                    <label htmlFor="size" className="block font-medium mb-2 text-gray-500">Size</label>
                    <select
                        id="size"
                        value={selectedSize}
                        onChange={(e) => setSelectedSize(e.target.value)}
                        className="hover:cursor-pointer border border-gray-300 rounded p-3 w-full outline-none"
                    >
                        <option value="">Select Size</option>
                        {product.sizes.map((size: string) => (
                            <option key={size} value={size}>{size}</option>
                        ))}
                    </select>
                </div>

                {/* Color Selection */}
                <div className="mb-4">
                    <label htmlFor="color" className="block font-medium mb-2 text-gray-500">Color</label>
                    <select
                        id="color"
                        value={selectedColor}
                        onChange={(e) => setSelectedColor(e.target.value)}
                        className="hover:cursor-pointer border border-gray-300 rounded p-3 w-full outline-none"
                    >
                        <option value="">Select Color</option>
                        {product.colors.map((color: string) => (
                            <option key={color} value={color}>{color}</option>
                        ))}
                    </select>
                </div>

                {/* Quantity Selection */}
                <div className="mb-6">
                    <label htmlFor="quantity" className="block font-medium mb-2 text-gray-500">
                        Quantity
                    </label>
                    <div className="flex items-center space-x-2 border border-gray-300 rounded w-24 py-2">
                        <button
                            onClick={() => setSelectedQuantity((prev) => Math.max(1, prev - 1))}
                            className="px-3  rounded text-gray-700"
                            disabled={selectedQuantity <= 1}
                        >
                            -
                        </button>
                        <input
                            type="text"
                            id="quantity"
                            value={selectedQuantity}
                            readOnly
                            className="text-sm text-center outline-none w-5"
                        />
                        <button
                            onClick={() => setSelectedQuantity((prev) => Math.min(product.quantity, prev + 1))}
                            className="px-3 rounded text-gray-700 text-sm"
                            disabled={selectedQuantity >= product.quantity}
                        >
                            +
                        </button>
                    </div>
                </div>


                {/* Add to Cart Button */}
                <button
                    className="bg-black tracking-wider text-sm text-white p-3 rounded hover:bg-gray-800 transition w-full mt-3"
                    onClick={handleAddToCart} >
                    <span className="inline-block">{loading ? (<Loader />) : 'ADD TO CART'}</span>
                </button>

                <button className="w-full p-3 tracking-wider text-sm mt-3 text-center border border-gray-400 rounded hover:bg-gray-100 transition">
                    SAVE FOR LATER
                </button>


                <div className="mt-10">
                    <h1 className="text-gray-500 font-semibold">Product Details</h1>
                    <p className="text-sm text-left pt-2">{product.description}</p>
                </div>
            </div>
        </div>



    );
}

export default Slugpage;
