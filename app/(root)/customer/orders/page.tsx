'use client'
import { useState, useEffect} from "react";
import { getUserOrders } from "@/services/order";
import Image from "next/image";
import React from "react";
import { CheckCircle } from "lucide-react";



function OrdersPage() {
  const [UserOrders, setUserOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchOrder() {
    try {
      const res = await getUserOrders();
      setUserOrders(res.orders)
      console.log(res.orders)

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
        <div key={order._id} className="rounded px-4 border text-xs  border-gray-200 ">
          {order.items.map((item: any, index: number) => (
            <div key={item._id}>
              <div className="flex items-center">

                <Image
                  src={item.product.images.length === 0 ? '' : item.product.images[0]}
                  alt={item.product.name}
                  width={100}
                  height={100}
                  className="pr-4"
                />

                <div className="w-full">
                  <h2 className="text-left pb-1 font-semibold truncate-text">{item.product.name}</h2>
                  <ul key={order.items._id} >
                    <li className=" text-gray-600 font-semibold">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </li>
                  </ul>
                  <div className="md:flex md:justify-between items-center ">
                    <div className=" text-gray-700 font-semibold items-center md:pb-0 pb-2  inline-flex ">
                      <CheckCircle className=" w-2 h-2 bg-orange-600 p-1 text-orange-600 rounded-full mr-1" /> {order.orderStatus}
                    </div>
                    <div>
                      <button className="md:py-1 md:px-2  py-1 px-2  border border-lg border-black  text-black   hover:bg-black hover:text-white">See Details</button>
                    </div>
                  </div>
                </div>
              </div>
              {order.items.length > 1 && index < order.items.length - 1 && (
                <hr className="border-gray-300 w-full my-2" />
              )}
           </div>
          ))}
        </div>
      ))}
    </div>

  )
}


export default OrdersPage