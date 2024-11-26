'use client';

import { useEffect, useState } from 'react';
import { verifyPayment } from '@/services/paystack';
import { getCart } from '@/services/cart';
import { useRouter } from 'next/navigation';
import useCartStore from '@/store/cartStore';

const VerifyPaymentContent = ({ reference }: VerifyPaymentContentProps) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [cart, setCart] = useState<Cart | null>(null);
    const { setGlobalCart } = useCartStore();

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
                    setTimeout(() => {
                        router.push('/');
                    }, 4000);
                } else {
                    setMessage('Payment failed.');
                }
            } catch (error: any) {
                console.error('Error verifying payment:', error);
                setMessage(error.response.data.message);
            } finally {
                setLoading(false);
            }
        };

        checkPayment();
    }, [cart?.totalPrice, reference]);

    return <div>{loading ? <p>Verifying payment...</p> : <p>{message}</p>}</div>;
};

export default VerifyPaymentContent;
