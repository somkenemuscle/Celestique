'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaLock } from "react-icons/fa";
import { GoTrash } from "react-icons/go";
import toast from "react-hot-toast";
import { getCart, removeFromCart, clearCart, updateCartItemQuantity } from "@/services/cart";
import useCartStore from "@/store/cartStore";
import LoaderDark from "@/components/ui/loaders/LoaderDark";
import CartSkeleton from "@/components/ui/skelentons/CartSkeleton";
import ProductSet1 from "@/components/shared/ProductSet1";

function CartPage() {
  const [cart, setCart] = useState<Cart | null>(null);
  const { setGlobalCart } = useCartStore();
  const [initialLoading, setInitialLoading] = useState(true);
  const [isAnyOutOfStock, setIsAnyOutOfStock] = useState(false);
  const [loadingItemId, setLoadingItemId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCartItems() {
      try {
        const res = await getCart();
        setCart(res.cart);
        setIsAnyOutOfStock(res.cart.items.some((item: any) => item.product.quantity === 0));
      } catch (err: any) {
        setError(err?.message || "Failed to load your bag");
      } finally {
        setInitialLoading(false);
      }
    }
    fetchCartItems();
  }, []);

  const handleCartQuantityUpdate = async (
    productId: string,
    size: string,
    color: string,
    quantity: number
  ) => {
    if (quantity < 1) return;
    try {
      setLoadingItemId(`${productId}-${size}-${color}`);
      const res = await updateCartItemQuantity(productId, size, color, quantity);
      setCart(res.cart);
      setGlobalCart(res.cart);
    } catch (error) {
      toast.error("Could not update quantity");
    } finally {
      setLoadingItemId(null);
    }
  };

  const handleDelete = async (productId: string, size: string, color: string) => {
    try {
      setLoadingItemId(`${productId}-${size}-${color}`);
      const res = await removeFromCart(productId, size, color);
      setCart(res.cart);
      setGlobalCart(res.cart);
      toast.success(res.message);
    } catch (error) {
      toast.error("Could not remove item");
    } finally {
      setLoadingItemId(null);
    }
  };

  const handleClearCart = async () => {
    try {
      const res = await clearCart();
      setCart(res.cart);
      setGlobalCart(res.cart);
      toast.success(res.message);
    } catch (error) {
      toast.error("Could not clear your bag");
    }
  };

  if (initialLoading) return <CartSkeleton />;
  if (!cart) {
    return (
      <div className="mx-auto max-w-[1400px] px-4 py-32 text-center sm:px-6 lg:px-10">
        <p className="text-sm text-ink-700">{error ?? "Your bag is unavailable right now"}</p>
      </div>
    );
  }

  const isEmpty = cart.items.length === 0;
  const checkoutDisabled = isAnyOutOfStock || cart.subtotal === 0;

  return (
    <>
      <div className="mx-auto max-w-[1400px] px-4 pb-20 pt-14 sm:px-6 lg:px-10 lg:pt-20">
        <header className="border-b border-ink-100 pb-6">
          <h1 className="font-display text-3xl font-medium tracking-[0.01em] text-ink-900 sm:text-4xl">
            Shopping bag
          </h1>
          {!isEmpty && (
            <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-ink-400">
              {cart.items.length} {cart.items.length === 1 ? "item" : "items"}
            </p>
          )}
        </header>

        {isEmpty ? (
          <div className="border border-ink-100 py-24 text-center">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="mx-auto h-10 w-10 text-ink-300"
              stroke="currentColor"
              strokeWidth="1.25"
            >
              <path d="M6 7h12l1 13H5L6 7Z" strokeLinejoin="round" />
              <path d="M9 7V5a3 3 0 0 1 6 0v2" strokeLinecap="round" />
            </svg>
            <h2 className="mt-5 text-sm font-medium uppercase tracking-[0.14em] text-ink-900">
              Your bag is empty
            </h2>
            <p className="mt-2 text-sm text-ink-500">Add something you love to get started.</p>
            <Link
              href="/products"
              className="mt-6 inline-block border border-ink-900 px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-900 transition hover:bg-ink-900 hover:text-white"
            >
              Continue shopping
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-x-12 gap-y-10 lg:grid-cols-[1fr_380px]">
            {/* Line items */}
            <ul className="divide-y divide-ink-100 border-y border-ink-100">
              {cart.items.map((item: any, index) => {
                const isLoading = loadingItemId === `${item.product._id}-${item.size}-${item.color}`;
                const outOfStock = item.product.quantity === 0;

                return (
                  <li key={index} className="flex gap-4 py-6 sm:gap-6">
                    <Link
                      href={`/products/${item.product.slug}`}
                      className="relative aspect-[3/4] w-24 shrink-0 overflow-hidden bg-ink-50 sm:w-28"
                    >
                      {item.product.images?.[0] && (
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          sizes="112px"
                          className="object-cover"
                        />
                      )}
                    </Link>

                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <Link
                            href={`/products/${item.product.slug}`}
                            className="block truncate text-[12px] font-medium uppercase tracking-[0.12em] text-ink-900 hover:text-ink-500"
                          >
                            {item.product.name}
                          </Link>
                          <p className="mt-1.5 flex items-center gap-2 text-xs text-ink-500">
                            <span>{item.product.gender?.gender}</span>
                            <span className="text-ink-300">/</span>
                            <span>{item.size}</span>
                            <span className="text-ink-300">/</span>
                            <span
                              className="inline-block h-3 w-3 rounded-full border border-ink-200"
                              style={{ backgroundColor: item.color?.toLowerCase() }}
                              title={item.color}
                            />
                          </p>
                          {outOfStock && (
                            <span className="mt-2 inline-flex items-center rounded-full bg-red-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-red-700 ring-1 ring-inset ring-red-200">
                              Out of stock
                            </span>
                          )}
                        </div>
                        <p className="shrink-0 text-sm font-medium text-ink-900">
                          {isLoading ? (
                            <LoaderDark />
                          ) : (
                            <>&#8358;{item.subtotal.toLocaleString()}</>
                          )}
                        </p>
                      </div>

                      <div className="mt-auto flex items-center justify-between pt-4">
                        <div className="inline-flex h-9 items-center border border-ink-200">
                          <button
                            className="flex h-full w-9 items-center justify-center text-sm text-ink-700 transition-colors hover:bg-ink-50 disabled:cursor-not-allowed disabled:text-ink-300"
                            onClick={() =>
                              handleCartQuantityUpdate(
                                item.product._id,
                                item.size,
                                item.color,
                                item.quantity - 1
                              )
                            }
                            disabled={item.quantity <= 1 || isLoading}
                            aria-label="Decrease quantity"
                          >
                            &minus;
                          </button>
                          <span className="flex h-full w-10 items-center justify-center border-x border-ink-200 text-xs">
                            {isLoading ? <LoaderDark /> : item.quantity}
                          </span>
                          <button
                            className="flex h-full w-9 items-center justify-center text-sm text-ink-700 transition-colors hover:bg-ink-50 disabled:cursor-not-allowed disabled:text-ink-300"
                            onClick={() =>
                              handleCartQuantityUpdate(
                                item.product._id,
                                item.size,
                                item.color,
                                item.quantity + 1
                              )
                            }
                            disabled={item.quantity >= item.product.quantity || isLoading}
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>

                        <button
                          className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.12em] text-ink-400 transition-colors hover:text-red-600"
                          onClick={() => handleDelete(item.product._id, item.size, item.color)}
                        >
                          <GoTrash className="h-3.5 w-3.5" />
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>

            {/* Summary */}
            <div className="lg:sticky lg:top-24 lg:h-fit">
              <div className="border border-ink-100 p-6">
                <h2 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-900">
                  Order summary
                </h2>

                <dl className="mt-5 space-y-3 text-sm">
                  <div className="flex justify-between text-ink-500">
                    <dt>Subtotal</dt>
                    <dd className="text-ink-900">&#8358;{cart.subtotal.toLocaleString()}</dd>
                  </div>
                  <div className="flex justify-between text-ink-500">
                    <dt>Shipping</dt>
                    <dd>Calculated at checkout</dd>
                  </div>
                  <div className="flex justify-between border-t border-ink-100 pt-3 text-base font-medium text-ink-900">
                    <dt>Total</dt>
                    <dd>&#8358;{cart.subtotal.toLocaleString()}</dd>
                  </div>
                </dl>

                <Link
                  href={checkoutDisabled ? "#" : "/checkout"}
                  aria-disabled={checkoutDisabled}
                  className={`mt-6 flex w-full items-center justify-center gap-2 px-4 py-3.5 text-[11px] font-semibold uppercase tracking-[0.16em] transition-colors ${
                    checkoutDisabled
                      ? "cursor-not-allowed bg-ink-300 text-white"
                      : "bg-ink-900 text-white hover:bg-ink-700"
                  }`}
                  onClick={(e) => checkoutDisabled && e.preventDefault()}
                >
                  {checkoutDisabled ? (
                    <>
                      <FaLock className="h-3 w-3" /> Checkout unavailable
                    </>
                  ) : (
                    "Checkout"
                  )}
                </Link>

                {isAnyOutOfStock && (
                  <p className="mt-3 text-center text-xs text-red-600">
                    Remove out-of-stock items to continue.
                  </p>
                )}

                <div className="mt-4 flex items-center justify-center gap-1.5 text-[10px] uppercase tracking-[0.14em] text-ink-400">
                  <FaLock className="h-2.5 w-2.5" /> Secure checkout
                </div>
              </div>

              <button
                onClick={handleClearCart}
                className="mt-4 w-full text-center text-[11px] uppercase tracking-[0.14em] text-ink-400 underline underline-offset-4 transition-colors hover:text-ink-900"
              >
                Clear bag
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="mt-10 px-4 pb-4 sm:px-6 md:px-20">
        <ProductSet1 header="Keep shopping" subheader="You might also like this" />
      </div>
    </>
  );
}

export default CartPage;
