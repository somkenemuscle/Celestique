'use client';

import { useState, useEffect } from "react";
import { getProductBySlug } from "@/services/product";
import Loader from "@/components/ui/loaders/Loader";
import Image from "next/image";
import { addToCart } from "@/services/cart";
import useCartStore from "@/store/cartStore";
import toast from "react-hot-toast";
import StatusGraphic from "@/components/ui/StatusGraphic";



function Slugpage({ params: { slug } }: { params: { slug: string } }) {
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { setGlobalCart } = useCartStore();


    // States for user input
    const [selectedQuantity, setSelectedQuantity] = useState<number>(1);
    const [selectedSize, setSelectedSize] = useState<string>("");
    const [selectedColor, setSelectedColor] = useState<string>("");

    // State for fullscreen image modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentImage, setCurrentImage] = useState<string | null>(null);

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
            toast.error('Please select size, color, and a valid quantity')
            return;
        }
        try {
            setLoading(true)
            const res = await addToCart(product!._id, selectedQuantity, selectedSize, selectedColor);
            setGlobalCart(res.cart)
            toast.success(res.message)
        } catch (error: any) {
            toast.error(error.response.data.message)
        } finally {
            setLoading(false)
        }
    };

    const openModal = (image: string) => {
        setCurrentImage(image);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCurrentImage(null);
    };



    if (!product) return <div><StatusGraphic message="Product Not Found" /></div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <div className="grid grid-cols-12 slug-page-body">
                {/* Carousel Section */}
                <div className="col-span-12 md:col-span-6  flex">
                    <Image
                        src={product.images[0]}
                        alt={`${product.name}`}
                        width={500}
                        height={500}
                        className="object-cover w-full hover:cursor-zoom-in"
                        onClick={() => openModal(product.images[0])}
                    />
                </div>

                {/* Product Details Section */}
                <div className="col-span-12 p-10 lg:pr-20 sm:p-20  md:col-span-6 hover:cursor-pointer">
                    <p className="text-sm text-gray-500 mb-1">Celestique</p>
                    <h1 className="text-2xl font-semibold mb-1 tracking-wide">{product.name}</h1>
                    <p className="text-lg tracking-wide"> ₦ {product.price.toLocaleString()}</p>
                    <p className="text-sm tracking-wider text-gray-500 mb-6 flex items-center ">
                        <span className="flex items-center justify-center mr-2">
                            <span
                                className={`absolute h-2 w-2 rounded-full bg-opacity-50 animate-pulse-ring ${product.quantity > 10 ? 'bg-green-600' : 'bg-red-600'
                                    }`}
                            ></span>
                            <span
                                className={`h-2 w-2 rounded-full ${product.quantity > 10 ? 'bg-green-500' : 'bg-red-600'
                                    }`}
                            ></span>
                        </span>
                        {product.quantity > 10 ? <span>In Stock </span> : <span>Low Stock </span>} . ( {product.quantity} Units left )
                    </p>

                    <p className="font-semibold text-sm text-red-500 tracking-wider mb-4">{product.quantity === 0 && 'OUT OF STOCK'}</p>

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

                {/* Fullscreen Modal */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
                        <div className="relative">
                            <button
                                onClick={closeModal}
                                className="absolute top-2 right-2 text-white bg-red-500 rounded-full w-8 h-8 flex items-center justify-center"
                            >
                                ✕
                            </button>
                            <Image
                                src={currentImage!}
                                alt="Fullscreen Image"
                                width={800}
                                height={800}
                                className="object-contain max-h-screen"
                            />
                        </div>
                    </div>
                )}
            </div>

        </div>


    );
}

export default Slugpage;
