'use client';

import { useState, useEffect } from "react";
import LoaderDark from "@/components/ui/LoaderDark";
import Image from "next/image";
import { getCart, removeFromCart, clearCart } from "@/services/cart";
import Link from "next/link";
import { FaLock } from "react-icons/fa";
import { GoTrash } from "react-icons/go";
import useCartStore from "@/store/cartStore";
import { updateCartItemQuantity } from "@/services/cart";



function CartPage() {
  const [cart, setCart] = useState<Cart | null>(null);
  const { setGlobalCart } = useCartStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAnyOutOfStock, setIsAnyOutOfStock] = useState(false);
  const [loadingItemId, setLoadingItemId] = useState<string | null>(null);


  useEffect(() => {
    async function fetchCartItems() {
      try {
        const res = await getCart();
        setCart(res.cart);

        // Check if any item in the cart is out of stock
        const outOfStock = res.cart.items.some((item: any) => item.product.quantity === 0);
        setIsAnyOutOfStock(outOfStock);
      } catch (err: any) {
        setError(err.message || "Failed to fetch items");
      } finally {
        setLoading(false);
      }
    }

    fetchCartItems();
  }, []);



  //Handle Update cart quantity functionality
  const handleCartQuantityUpdate = async (productId: string, size: string, color: string, quantity: number) => {
    try {
      setLoadingItemId(`${productId}-${size}-${color}`); // Unique ID for the loading item
      setLoading(true)
      if (quantity < 1) return; // Safety check to avoid sending invalid quantities
      const res = await updateCartItemQuantity(productId, size, color, quantity);
      setCart(res.cart);
    } catch (error) {
      console.log("Error updating item quantity in cart");
    } finally {
      setLoading(false);
      setLoadingItemId(null); // Reset the loading item
    }
  };




  //Handle Delete from cart functionality
  const handleDelete = async (productId: string, size: string, color: string) => {
    try {
      setLoadingItemId(`${productId}-${size}-${color}`); // Unique ID for the loading item
      setLoading(true)
      const res = await removeFromCart(productId, size, color);
      setCart(res.cart)
      setGlobalCart(res.cart)
    } catch (error) {
      console.log("Error removing item from cart")
    } finally {
      setLoading(false);
      setLoadingItemId(null); // Reset the loading item
    }
  };


  //Handle Clearing cart functionality
  const handleClearCart = async () => {
    try {
      const res = await clearCart();
      setCart(res.cart)
      setGlobalCart(res.cart)
    } catch (error) {
      console.log("Error clearing cart")
    }
  };



  if (!cart) return;

  return (
    <div className="cart-body mt-52 container mx-auto  p-4 grid lg:grid-cols-3 gap-8">

      {/* Cart Items */}
      <div className="lg:col-span-2">
        <h1 className="text-xl font-medium mb-6">Shopping Cart <span className="text-gray-500">( {cart.items.length} items )</span> </h1>

        {!cart || cart.items.length === 0 ? (
          <div className="text-center text-sm tracking-wider pt-10 text-gray-600">
            <span>Your Cart is currently empty</span>
            <div className="flex items-center justify-center pt-7">
              <Link href={'/products'}>
                <button className="flex items-center justify-center px-4 py-3 bg-black text-white rounded w-60">
                  Shop now
                </button>
              </Link>
            </div>
          </div>
        ) : (

          cart.items.map((item: any, index) => {
            const isLoading = loadingItemId === `${item.product._id}-${item.size}-${item.color}`;

            return (
              <div key={index} className="flex items-center border-b pb-4 mb-4">

                {/* Product Image */}
                <Image
                  src={item.product.images === 0 ? '' : item.product.images[0]}
                  alt={item.product.name}
                  width={100}
                  height={100}
                  className="rounded-md"
                />

                {/* Product Details */}
                <div className="ml-4 flex-grow">
                  <h2 className="text-xs font-semibold uppercase">{item.product.name}</h2>
                  <p className="text-xs text-gray-600">
                    {item.product.gender.gender} / {item.size} / {item.color}
                  </p>
                  {item.product.quantity === 0 && (
                    <p className="text-red-600 font-bold text-sm">OUT OF STOCK</p>
                  )}

                  {/* Quantity Controls */}
                  <div className="flex items-center mt-2 hover:cursor-pointer">
                    <span className="border p-0.5">
                      <button
                        className="px-2 text-sm"
                        onClick={() =>
                          handleCartQuantityUpdate(item.product._id, item.size, item.color, item.quantity - 1)
                        }
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>

                      <span className="text-center text-xs px-3">{isLoading ? <span className="inline-block text-center"><LoaderDark /> </span> : item.quantity}</span>

                      <button
                        className="px-2 text-sm"
                        onClick={() =>
                          handleCartQuantityUpdate(item.product._id, item.size, item.color, item.quantity + 1)
                        }
                        disabled={item.quantity >= item.product.quantity}
                      >
                        +
                      </button>
                    </span>
                    {/* Delete Button */}
                    <button
                      className="ml-4"
                      onClick={() => handleDelete(item.product._id, item.size, item.color)}
                    >
                      <GoTrash className="size-4 hover:text-red-500" />
                    </button>
                  </div>
                </div>
                <p className="text-sm" id="cart-item-price">
                  {isLoading ? <LoaderDark /> : `₦${item.subtotal.toLocaleString()}`}
                </p>
              </div>
            );
          }))}
      </div>


      {/* Order Summary */}
      <div className="h-72 border p-6  rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
        <hr className="my-4" />
        <p className="flex justify-between">
          <span>Subtotal <span aria-hidden="true">→</span></span>
          <span>₦{cart.subtotal.toLocaleString()}</span>
        </p>
        <hr className="my-4" />
        <p className="text-xs text-gray-600">Shipping will be calculated at checkout</p>
        <hr className="my-4" />

        <Link href={isAnyOutOfStock || cart.subtotal === 0 ? '#' : '/checkout'}>
          <button
            className={`w-full p-3 rounded-md ${isAnyOutOfStock || cart.subtotal === 0 ? 'bg-black text-white cursor-not-allowed' : 'bg-black text-white hover:bg-gray-900'}`}
            disabled={isAnyOutOfStock}
          >
            {isAnyOutOfStock || cart.subtotal === 0 ? (
              <span className="flex items-center justify-center gap-2">
                <FaLock /> Checkout Disabled
              </span>
            ) : (
              'Check Out'
            )}
          </button>
        </Link>
        <p onClick={() => { handleClearCart() }} className="text-right text-sm py-3 hover:cursor-pointer hover:underline text-gray-500 tracking-wider">Clear Cart ?</p>
      </div>
    </div>
  );
}

export default CartPage;
