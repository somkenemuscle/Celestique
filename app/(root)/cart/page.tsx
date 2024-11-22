'use client';

import { useState, useEffect } from "react";
import Loader from "@/components/ui/Loader";
import Image from "next/image";
import { getCart } from "@/services/cart";

function CartPage() {

  const [cartItems, setCartItems] = useState<CartItems | null>(null);
  const [totalPrice, setTotalPrice] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCartItems() {
      try {
        const res = await getCart();
        setTotalPrice(res.cart.totalPrice)
        setCartItems(res.cart.items)
      } catch (err: any) {
        setError(err.message || "Failed to fetch items");
      } finally {
        setLoading(false);
      }
    }

    fetchCartItems();
  }, []);

  if (loading || !cartItems) return <div className="bg-black"><Loader /></div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>cart</h1>
      {cartItems.map((item: any) => (
        <ul key={item._id}>
          <Image
            src={item.product.images[0]}
            alt="item-Image"
            width={500}
            height={500}
          />
          <li>{item.product.name}</li>
          <li>size: {item.size}</li>
          <li>color: {item.color}</li>
          <li>quantity: {item.quantity}</li>
          <li>subtotal: ₦{item.subtotal}</li>
          <hr />
        </ul>
      ))}

      <div>total price: ₦{totalPrice}</div>

    </div>
  )
}

export default CartPage