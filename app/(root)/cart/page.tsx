'use client';

import { useState, useEffect } from "react";
import Loader from "@/components/ui/Loader";
import Image from "next/image";
import { getCart } from "@/services/cart";
import Link from "next/link";

function CartPage() {

  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCartItems() {
      try {
        const res = await getCart();
        setCart(res.cart)
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
      <h1>cart</h1>

      <ul>
        {cart.items.map((item: any, index) => (
          <span key={index}>
            <Image
              src={item.product.images[0]}
              alt="item-Image"
              width={500}
              height={500} />
            <li>{item.product.name}</li>
            <li>size: {item.size}</li>
            <li>color: {item.color}</li>
            <li>quantity: {item.quantity}</li>
            <li>subtotal: ₦{item.subtotal}</li>
          </span>
        ))}
        <hr />
        <li>subtotal: ₦{cart.subtotal}</li>
        <hr />
      </ul>
      <Link href={'/checkout'}>
        <button className="p-4 bg-black text-white mb-10">Checkout</button>
      </Link>

    </div>
  )
}

export default CartPage