'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { X, Search } from "lucide-react";
import { getProductBySlug } from "@/services/product";
import { addToCart } from "@/services/cart";
import { saveProductToFavorite } from "@/services/favoriteProduct";
import useCartStore from "@/store/cartStore";
import { validateCartInputs } from "@/lib/validate";
import Loader from "@/components/ui/loaders/Loader";
import LoaderDark from "@/components/ui/loaders/LoaderDark";
import ProductSet1 from "@/components/shared/ProductSet1";
import SlugPageSkelenton from "@/components/ui/skelentons/SlugPageSkelenton";

function Slugpage({ params: { slug } }: { params: { slug: string } }) {
    const [product, setProduct] = useState<Product | null>(null);
    const [initialLoading, setInitialLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [wishlistLoading, setWishlistLoading] = useState(false);
    const [saved, setSaved] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { setGlobalCart } = useCartStore();

    const [selectedQuantity, setSelectedQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedColor, setSelectedColor] = useState("");

    const [activeImage, setActiveImage] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        async function fetchProduct() {
            setInitialLoading(true);
            try {
                const res = await getProductBySlug(slug);
                setProduct(res.product);
            } catch (err: any) {
                setError(err?.response?.data?.message || err?.message || "Failed to load this product");
            } finally {
                setInitialLoading(false);
            }
        }
        fetchProduct();
    }, [slug]);

    useEffect(() => {
        function onKey(e: KeyboardEvent) {
            if (e.key === "Escape") setIsModalOpen(false);
        }
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, []);

    const handleAddToCart = async () => {
        const validationErrors = validateCartInputs(selectedColor, selectedSize, selectedQuantity);
        if (validationErrors) {
            toast.error(validationErrors);
            return;
        }
        try {
            setLoading(true);
            const res = await addToCart(product!._id, selectedQuantity, selectedSize, selectedColor);
            setGlobalCart(res.cart);
            toast.success(res.message);
        } catch (err: any) {
            toast.error(err?.response?.data?.message || "Could not add to bag");
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        if (!product) return;
        try {
            setWishlistLoading(true);
            const res = await saveProductToFavorite(product._id);
            setSaved(true);
            toast.success(res.message);
        } catch (err: any) {
            toast.error(err?.response?.data?.message || "Could not save this item");
        } finally {
            setWishlistLoading(false);
        }
    };

    if (initialLoading) return <SlugPageSkelenton />;

    if (!product) {
        return (
            <div className="mx-auto max-w-[1400px] px-4 py-32 text-center sm:px-6 lg:px-10">
                <p className="text-sm text-ink-700">{error ?? "Product not found"}</p>
                <Link
                    href="/products"
                    className="mt-6 inline-block border border-ink-900 px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-900 transition hover:bg-ink-900 hover:text-white"
                >
                    Back to shop
                </Link>
            </div>
        );
    }

    const outOfStock = product.quantity === 0;
    const lowStock = product.quantity > 0 && product.quantity <= 10;
    const dotColor = outOfStock ? "bg-red-600" : lowStock ? "bg-amber-500" : "bg-emerald-500";
    const stockLabel = outOfStock
        ? "Out of stock"
        : lowStock
        ? `Low stock, ${product.quantity} left`
        : "In stock";

    return (
        <>
            <div className="mx-auto max-w-[1400px] px-4 pb-20 pt-8 sm:px-6 lg:px-10">
                <nav className="text-[11px] uppercase tracking-[0.16em] text-ink-400">
                    <Link href="/" className="transition-colors hover:text-ink-900">Home</Link>
                    <span className="px-1.5">/</span>
                    <Link href="/products" className="transition-colors hover:text-ink-900">Shop</Link>
                    <span className="px-1.5">/</span>
                    <span className="text-ink-700">{product.name}</span>
                </nav>

                <div className="mt-6 grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-2 xl:gap-x-16">
                    {/* Gallery */}
                    <div>
                        <button
                            type="button"
                            onClick={() => setIsModalOpen(true)}
                            className="group relative block aspect-[3/4] w-full cursor-zoom-in overflow-hidden bg-ink-50"
                        >
                            <Image
                                src={product.images[activeImage] ?? product.images[0]}
                                alt={product.name}
                                fill
                                priority
                                sizes="(min-width: 1024px) 45vw, 100vw"
                                className="pointer-events-none object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                            />
                            <span className="pointer-events-none absolute bottom-4 right-4 flex items-center gap-1.5 bg-white/90 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-900 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                                <Search className="h-3 w-3" />
                                Zoom
                            </span>
                        </button>

                        {product.images.length > 1 && (
                            <div className="mt-4 grid grid-cols-5 gap-3">
                                {product.images.map((img, index) => (
                                    <button
                                        key={index}
                                        onMouseEnter={() => setActiveImage(index)}
                                        onClick={() => setActiveImage(index)}
                                        className={`relative aspect-[3/4] overflow-hidden bg-ink-50 transition ${
                                            activeImage === index
                                                ? "opacity-100 ring-1 ring-ink-400 ring-offset-2"
                                                : "opacity-60 hover:opacity-100"
                                        }`}
                                    >
                                        <Image src={img} alt="" fill sizes="120px" className="object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Info */}
                    <div className="lg:sticky lg:top-24 lg:h-fit">
                        <span className="eyebrow">Celestique</span>
                        <h1 className="mt-2 font-display text-2xl font-medium tracking-[0.01em] text-ink-900 sm:text-3xl">
                            {product.name}
                        </h1>
                        <p className="mt-3 text-lg text-ink-900">&#8358;{product.price.toLocaleString()}</p>

                        <p className="mt-3 flex items-center gap-2 text-xs uppercase tracking-[0.12em] text-ink-500">
                            <span className="relative flex h-2 w-2 items-center justify-center">
                                <span className={`absolute h-2 w-2 rounded-full opacity-60 animate-pulse-ring ${dotColor}`} />
                                <span className={`h-2 w-2 rounded-full ${dotColor}`} />
                            </span>
                            {stockLabel}
                        </p>

                        <div className="my-7 h-px bg-ink-100" />

                        {/* Size */}
                        <div>
                            <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-900">Size</span>
                            <div className="mt-3 flex flex-wrap gap-2">
                                {product.sizes.map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize((s) => (s === size ? "" : size))}
                                        className={`flex h-10 min-w-[3rem] items-center justify-center border px-3 text-xs uppercase tracking-[0.08em] transition ${
                                            selectedSize === size
                                                ? "border-ink-900 bg-ink-900 text-white"
                                                : "border-ink-200 text-ink-700 hover:border-ink-900"
                                        }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Colour */}
                        <div className="mt-6">
                            <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-900">Colour</span>
                            <div className="mt-3 flex flex-wrap gap-2">
                                {product.colors.map((color) => (
                                    <button
                                        key={color}
                                        onClick={() => setSelectedColor((c) => (c === color ? "" : color))}
                                        className={`inline-flex h-10 items-center gap-2 border px-3 text-xs uppercase tracking-[0.08em] transition ${
                                            selectedColor === color
                                                ? "border-ink-900 text-ink-900"
                                                : "border-ink-200 text-ink-600 hover:border-ink-900"
                                        }`}
                                    >
                                        <span
                                            className="inline-block h-3.5 w-3.5 rounded-full border border-ink-200"
                                            style={{ backgroundColor: color.toLowerCase() }}
                                        />
                                        {color}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quantity */}
                        <div className="mt-6">
                            <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-900">Quantity</span>
                            <div className="mt-3 flex h-9 w-fit items-center border border-ink-200">
                                <button
                                    onClick={() => setSelectedQuantity((q) => Math.max(1, q - 1))}
                                    disabled={selectedQuantity <= 1}
                                    className="flex h-full w-9 items-center justify-center text-sm text-ink-700 transition-colors hover:bg-ink-50 disabled:cursor-not-allowed disabled:text-ink-300"
                                    aria-label="Decrease quantity"
                                >
                                    &minus;
                                </button>
                                <span className="flex h-full w-10 items-center justify-center border-x border-ink-200 text-xs">
                                    {selectedQuantity}
                                </span>
                                <button
                                    onClick={() => setSelectedQuantity((q) => Math.min(product.quantity, q + 1))}
                                    disabled={selectedQuantity >= product.quantity}
                                    className="flex h-full w-9 items-center justify-center text-sm text-ink-700 transition-colors hover:bg-ink-50 disabled:cursor-not-allowed disabled:text-ink-300"
                                    aria-label="Increase quantity"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        {/* Actions */}
                        <button
                            onClick={handleAddToCart}
                            disabled={outOfStock || loading}
                            className="mt-8 flex h-12 w-full items-center justify-center bg-ink-900 text-[11px] font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-ink-700 disabled:cursor-not-allowed disabled:bg-ink-300"
                        >
                            {loading ? <Loader /> : outOfStock ? "Out of stock" : "Add to bag"}
                        </button>

                        <button
                            onClick={handleSave}
                            disabled={wishlistLoading}
                            className="mt-3 flex h-12 w-full items-center justify-center gap-2 border border-ink-300 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-900 transition-colors hover:border-ink-900"
                        >
                            {wishlistLoading ? (
                                <LoaderDark />
                            ) : (
                                <>
                                    {saved ? <FaHeart className="h-3.5 w-3.5" /> : <FaRegHeart className="h-3.5 w-3.5" />}
                                    {saved ? "Saved" : "Save for later"}
                                </>
                            )}
                        </button>

                        <div className="mt-9 border-t border-ink-100 pt-6">
                            <h2 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-900">Details</h2>
                            <p className="mt-3 text-sm leading-relaxed text-ink-600">{product.description}</p>
                        </div>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div
                    className="fixed inset-0 z-[60] flex items-center justify-center bg-ink-900/90 p-4"
                    onClick={() => setIsModalOpen(false)}
                >
                    <button
                        onClick={() => setIsModalOpen(false)}
                        aria-label="Close"
                        className="absolute right-5 top-5 text-white/80 transition-colors hover:text-white"
                    >
                        <X className="h-6 w-6" />
                    </button>
                    <div className="relative h-[88vh] w-full max-w-3xl" onClick={(e) => e.stopPropagation()}>
                        <Image
                            src={product.images[activeImage] ?? product.images[0]}
                            alt={product.name}
                            fill
                            sizes="90vw"
                            className="object-contain"
                        />
                    </div>
                </div>
            )}

            <ProductSet1 header="You might also like" subheader="Recommended for you" />
        </>
    );
}

export default Slugpage;
