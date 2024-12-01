'use client';

import { useEffect, useState } from 'react';
import { verifyPayment } from '@/services/paystack';
import { getCart } from '@/services/cart';
import { useRouter } from 'next/navigation';
import useCartStore from '@/store/cartStore';
import toast from 'react-hot-toast';

const VerifyPaymentContent = ({ reference }: { reference: string }) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [cart, setCart] = useState<Cart | null>(null);
    const { setGlobalCart } = useCartStore();
    const [order, setOrder] = useState<Order>();

    // Fetch the cart data
    useEffect(() => {
        async function fetchCartItems() {
            try {
                const res = await getCart();
                setCart(res.cart);
            } catch (err: any) {
                console.error(err.message || 'Failed to fetch items');
            } finally {
                setLoading(false);
            }
        }

        fetchCartItems();
    }, []);

    // Payment verification
    useEffect(() => {
        if (!cart) return;

        if (!reference) {
            setMessage('No reference found.');
            return;
        }

        if (!cart?.totalPrice) {
            setMessage('Cart total price is missing. Cannot verify payment.');
            return;
        }

        const checkPayment = async () => {
            try {
                const response = await verifyPayment(reference, cart.totalPrice);

                if (response.success) {
                    setGlobalCart(response.cart);
                    setMessage(response.message);
                    setOrder(response.order);
                    toast.success('Payment verified successfully!');
                } else {
                    setMessage('Payment verification failed.');
                    toast.error('Payment verification failed.');
                }
            } catch (error: any) {
                console.error('Error verifying payment:', error);
                setMessage(error.response?.data?.message || 'An error occurred.');
                toast.error('An error occurred while verifying payment.');
            } finally {
                setLoading(false);
            }
        };

        checkPayment();
    }, [cart?.totalPrice, reference]);

    // Render
    return (
        <div className="min-h-screen flex items-center justify-center px-4 verify-page-body">
            <div className="max-w-3xl w-full bg-white shadow-sm rounded-lg p-6">
                {loading ? (
                    <div className="flex flex-col items-center justify-center">
                        <p className="tracking-wide">Verifying your payment...</p>
                        <div className="loader mt-4 w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div>
                        <h1 className="text-2xl font-semibold text-center mb-6">
                            {message}
                        </h1>
                        {order ? (
                            <div className="mt-4">
                                <h2 className="text-xl font-semibold">Order Summary</h2>
                                <div className="mt-2 space-y-4">
                                    <p><strong>Total Amount:</strong> ₦{order.totalAmount}</p>
                                    <h3 className="text-lg font-medium mt-4">Items:</h3>
                                    <ul className="space-y-2">
                                        {order.items.map((item, index) => (
                                            <li key={index} className="border p-3 rounded">
                                                <p><strong>Product:</strong> {item.product.name}</p>
                                                <p><strong>Quantity:</strong> {item.quantity}</p>
                                                <p><strong>Color:</strong> {item.color}</p>
                                                <p><strong>Size:</strong> {item.size}</p>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <button
                                    onClick={() => router.push('/')}
                                    className="mt-6 w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
                                >
                                    Continue Shopping
                                </button>
                            </div>
                        ) : (
                            <p className="text-center text-red-600">{message}</p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default VerifyPaymentContent;
