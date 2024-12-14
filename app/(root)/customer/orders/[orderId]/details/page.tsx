'use client'
import React, { useEffect, useState } from 'react'
import { getOrderDetails } from '@/services/order';
import { CheckCircle } from 'lucide-react';
import Image from 'next/image';

export default function page({ params: { orderId } }: { params: { orderId: string } }) {
    const [OrderDetails, setOrdrDetails] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    async function fetchOrderDetails() {
        try {
            const res = await getOrderDetails(orderId);
            setOrdrDetails(res.orders)
        } catch (err: any) {
            setError(err.message || "Failed to fetch products");
        } finally {
            setLoading(false);
        }

    }

    useEffect(() => {
        fetchOrderDetails()
    }, [orderId])

    let ConvertedDate = ''

    let formattedDeliveryDate = ''

    let formattedExpectedDeliveryDate = ''

    if (OrderDetails) {
        const ExpectedDeliveryDate = new Date(OrderDetails.createdAt);
        ExpectedDeliveryDate.setDate(ExpectedDeliveryDate.getDate() + 3);

        ConvertedDate = ExpectedDeliveryDate.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
        }).replace(/\//g, '-');


        formattedDeliveryDate = new Date(OrderDetails.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'long' });

        formattedExpectedDeliveryDate = ExpectedDeliveryDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'long' });

    }

    return (
        <div id='order-details-container' className='mt-16 justify-self-center '>
            {OrderDetails && (
                <>
                    <div className='border rounded pb-2 mb-10'>
                        <h2 className='font-semibold text-base py-2 px-4 border-b'>ORDER DETAILS</h2>
                        <ul className=' text-gray-700 text-base py-2 px-4 '>
                            {OrderDetails.items.length > 1 ? (
                                <li>{OrderDetails.items.length} items</li>
                            ) : (
                                <li>{OrderDetails.items.length} item</li>
                            )}
                            <li>Placed On <span className='text-black font-medium'> {new Date(OrderDetails.createdAt).toLocaleDateString('en-GB', {
                                day: 'numeric',
                                month: 'numeric',
                                year: 'numeric',
                            }).replace(/\//g, '-')}
                            </span>
                            </li>
                            <li>Total: ₦{OrderDetails.totalAmount.toLocaleString()}</li>
                        </ul>
                    </div>


                    {OrderDetails.items.length > 1 ? (
                        <h2 className='font-semibold text-base pb-2'>ITEMS IN YOUR ORDER</h2>
                    ) : (
                        <h2 className='font-semibold text-base pb-2'>ITEM IN YOUR ORDER</h2>
                    )}

                    <div className='border rounded py-4 px-7'>
                        <section className='text-sm'>
                            {OrderDetails.orderStatus === 'Processing' || OrderDetails.orderStatus === 'Shipped' ? (
                                <span className='flex items-center justify-between'>
                                    <h3 className='text-black font-medium'>Expected On {ConvertedDate}</h3>
                                    <button className='bg-orange-600 text-white font-medium rounded py-1 px-2 '>{OrderDetails.orderStatus}</button>
                                </span>
                            ) : OrderDetails.orderStatus === 'Delivered' ? (
                                <span className='flex items-center justify-between'>
                                    <h3 className='text-black font-medium'>On {ConvertedDate}</h3>
                                    <button className='bg-green-700 text-white rounded p-1'>{OrderDetails.orderStatus}</button>
                                </span>
                            ) : (
                                    <button className='bg-red-700 text-white rounded p-1'>{OrderDetails.orderStatus}</button>
                            )}
                        </section>
                        <section className='py-5'>
                            {OrderDetails.items.map((item: any, index: number) => (
                                <div key={item.product._id}>  
                                    <div className='flex'>
                                        <Image
                                            src={item.product.images.length === 0 ? '' : item.product.images[0]}
                                            alt={item.product.name}
                                            width={100}
                                            height={100}
                                            className="rounded-xl aspect-auto"
                                        />
                                        <div className="flex-col pl-5 grid">
                                            <h3 className="text-black font-semibold font-sans text-xl  truncate">
                                                {item.product.name}
                                            </h3>

                                            <ul className='text-gray-600  text-sm'>
                                                <li>Color - {item.color}</li>
                                                <li>Qty - {item.quantity}</li>
                                                <li>{item.size}</li>
                                                <li>₦{item.subtotal.toLocaleString()}</li>
                                            </ul>

                                        </div>

                                    </div>
                                    {index < OrderDetails.items.length - 1 && <hr className="my-5 text-black" />}
                                </div>
                            ))}
                        </section>
                    </div>

                    {/* shippind and payment grid */}
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 py-8'>
                        <div className='rounded border pb-2'>
                            <h3 className='font-medium text-base py-2 px-4 border-b'>PAYMENT INFORMATION</h3>
                            <div className='grid grid-cols-1 px-4'>
                                <h2 className='font-semibold text-base py-2 '>Payment Method</h2>
                                <h4 className='text-gray-500  text-sm'>{OrderDetails.paymentId.paymentMethod}</h4>

                                <h2 className='font-semibold text-base pt-7'>Payment Details</h2>
                                <ul className='text-gray-500  text-sm pb-7 pt-2'>
                                    <li>Total: ₦{OrderDetails.totalAmount.toLocaleString()}</li>
                                </ul>

                            </div>
                        </div>

                        <div className='rounded border pb-2'>
                            <h2 className='font-medium text-base py-2 px-4 border-b'>DELIVERY INFORMATION</h2>
                            <div className='grid grid-cols-1 px-4'>
                                <h2 className='font-semibold text-base py-2 '>Delivery Method</h2>
                                <h4 className='text-gray-500  text-sm'>Door Delivery</h4>

                                <h2 className='font-semibold text-base pt-7'>Shipping Address</h2>
                                <ul className='text-gray-500  text-sm pb-7 pt-2 leading-tight'>
                                    <li>{OrderDetails.shippingAddress.lastName} {OrderDetails.shippingAddress.firstName}</li>
                                    <li>{OrderDetails.shippingAddress.address}</li>
                                    <li>{OrderDetails.shippingAddress.city} , {OrderDetails.shippingAddress.state}</li>
                                    <li>{OrderDetails.shippingAddress.country}.</li>
                                    <li>{OrderDetails.shippingAddress.postalCode}.</li>
                                </ul>

                                <h2 className='font-semibold text-base'>Delivery Details</h2>
                                <ul className='text-gray-500 text-sm pb-7 pt-2 leading-tight'>
                                    <li>
                                        <span>Delivery between
                                            <span className='font-semibold'> {formattedDeliveryDate}</span> and
                                            <span className='font-semibold'> {formattedExpectedDeliveryDate} </span>
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                </>
            )}
        </div>
    )
}
