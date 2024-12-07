'use client'
import { useState, useEffect } from "react";
import { getUserOrders } from "@/services/order";
import Image from "next/image";
import React from "react";
import { CheckCircle } from "lucide-react";
import Link from "next/link";




function OrdersPage() {
  const [UserOrders, setUserOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchOrder() {
    try {
      const res = await getUserOrders();
      setUserOrders(res.orders)


    } catch (err: any) {
      setError(err.message || "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchOrder();
  }, []);

  if (error) return <div>Error: {error}</div>;

  return (
    <div id="order-history-container" className="mt-40   justify-self-center   text-black">
      <h1 className="text-black font-sans pb-5 font-bold text-xl sm:text-2xl text-left tracking-wide">Order history</h1>
      {UserOrders.map((order: any) => (
        <div key={order._id} className="rounded px-4 border py-5 text-xs mb-5 border-gray-200 ">
          {order.items.map((item: any, index: number) => (

            <div key={item._id}>
             {item.product.images.length > 1 && index === item.product.images.length - 1 && (
                  <div className="pt-5"></div>
                )}
              <div className="flex items-start">
                
                <Image
                  src={item.product.images.length === 0 ? '' : item.product.images[0]}
                  alt={item.product.name}
                  width={100}
                  height={100}
                  className=" rounded aspect-auto"
                />

                <div className="w-full pt-2  pl-4 grid" >
                  <h2 className="text-left pb-1 text-base font-semibold truncate">{item.product.name}</h2>
                  <ul key={order.items._id} >
                    <li className=" text-gray-600 font-semibold">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </li>
                  </ul>
                  {order.items.length && index === 0 && (
                    <div className="sm:flex sm:justify-between mt-8 sm:mt-16 items-center text-xs">
                     <button className='bg-orange-600 text-white font-medium rounded  p-1 flex'>{order.orderStatus}</button>
                      <Link href={`/customer/orders/${order._id}/details`}>
                        <button className="px-2 py-1  rounded mt-2 border-black font-medium  text-white bg-black hover:bg-zinc-800">See Details</button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>
      ))}
    </div>

  )
}


export default OrdersPage