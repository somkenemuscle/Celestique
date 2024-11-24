'use client';

import { useState, useEffect } from "react";
import Loader from "@/components/ui/Loader";
import Image from "next/image";
import { getCart } from "@/services/cart";
import Link from "next/link";
import { FaLock } from "react-icons/fa"; // Import a padlock icon

function CartPage() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAnyOutOfStock, setIsAnyOutOfStock] = useState(false);

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

  if (loading || !cart) return <div className="bg-black"><Loader /></div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Cart</h1>

      <ul>
        {cart.items.map((item: any, index) => (
          <span key={index}>
            <Image
              src={item.product.images[0]}
              alt="item-Image"
              width={500}
              height={500} />
            <li>{item.product.name}</li>
            <li>Size: {item.size}</li>
            <li>Color: {item.color}</li>
            <li>Quantity: {item.quantity}</li>
            <li>Subtotal: ₦{item.subtotal}</li>
            {item.product.quantity === 0 && (
              <li className="text-red-700 font-extrabold">OUT OF STOCK</li>
            )}
          </span>
        ))}
        <hr />
        <li>Subtotal: ₦{cart.subtotal}</li>
        <hr />
      </ul>

      {/* Checkout button */}
      <div className="mt-4">
        <Link href={isAnyOutOfStock ? '#' : '/checkout'}>
          <button
            className={`p-4 mb-10 ${isAnyOutOfStock ? 'bg-gray-500 cursor-not-allowed' : 'bg-black text-white'
              }`}
            disabled={isAnyOutOfStock}
          >
            {isAnyOutOfStock ? (
              <span className="flex items-center gap-2">
                <FaLock /> Checkout Disabled
              </span>
            ) : (
              'Checkout'
            )}
          </button>
        </Link>
      </div>
    </div>
  );
}

export default CartPage;
