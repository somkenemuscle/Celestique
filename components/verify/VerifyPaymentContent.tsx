'use client';

import { useEffect, useState } from 'react';
import { verifyPayment } from '@/services/paystack';
import { getCart } from '@/services/cart';
import { useRouter } from 'next/navigation';


const VerifyPaymentContent = ({ reference }: VerifyPaymentContentProps) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [cart, setCart] = useState<Cart | null>(null);

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
                const result = await verifyPayment(reference, cart.totalPrice);

                if (result.success) {
                    setMessage('Payment successful!');
                    setTimeout(() => {
                        router.push('/'); // Redirect to home or desired page
                    }, 2000);
                } else {
                    setMessage('Payment failed.');
                }
            } catch (error) {
                console.error('Error verifying payment:', error);
                setMessage('Error verifying payment.');
            } finally {
                setLoading(false);
            }
        };

        checkPayment();
    }, [cart, reference]);

    return <div>{loading ? <p>Verifying payment...</p> : <p>{message}</p>}</div>;
};

export default VerifyPaymentContent;
