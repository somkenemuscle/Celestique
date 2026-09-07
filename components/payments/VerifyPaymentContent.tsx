'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { verifyPayment } from '@/services/paystack';
import { getCart } from '@/services/cart';
import { useRouter } from 'next/navigation';
import useCartStore from '@/store/cartStore';
import toast from 'react-hot-toast';

type Status = 'verifying' | 'success' | 'error';

const VerifyPaymentContent = ({ reference }: { reference: string | undefined }) => {
    const router = useRouter();
    const [status, setStatus] = useState<Status>('verifying');
    const [message, setMessage] = useState('');
    const [cart, setCart] = useState<Cart | null>(null);
    const [cartLoaded, setCartLoaded] = useState(false);
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
                setCartLoaded(true);
            }
        }

        fetchCartItems();
    }, []);

    // Payment verification
    useEffect(() => {
        if (!cartLoaded) return;

        if (!reference) {
            setStatus('error');
            setMessage('No payment reference was found in the link.');
            return;
        }

        if (!cart?.totalPrice) {
            setStatus('error');
            setMessage('We could not read your cart total, so the payment cannot be verified.');
            return;
        }

        const checkPayment = async () => {
            try {
                const response = await verifyPayment(reference, cart.totalPrice);

                if (response.success) {
                    setGlobalCart(response.cart);
                    setStatus('success');
                    toast.success('Payment verified. Your order has been placed.');
                    setTimeout(() => router.push('/customer/orders'), 2200);
                } else {
                    setStatus('error');
                    setMessage('Your payment could not be verified. If you were charged, it will be refunded.');
                    toast.error('Payment verification failed.');
                }
            } catch (error: any) {
                console.error('Error verifying payment:', error);
                setStatus('error');
                setMessage(
                    error?.response?.data?.message ||
                    'Something went wrong while verifying your payment.'
                );
                toast.error('An error occurred while verifying payment.');
            }
        };

        checkPayment();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cartLoaded, cart?.totalPrice, reference]);

    return (
        <div className="mx-auto flex min-h-[70vh] max-w-lg flex-col items-center justify-center px-4 py-20 text-center">
            {status === 'verifying' && (
                <>
                    <span className="relative flex h-16 w-16 items-center justify-center">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ink-200 opacity-60" />
                        <span className="relative inline-flex h-11 w-11 animate-spin rounded-full border-2 border-ink-200 border-t-ink-900" />
                    </span>
                    <h1 className="mt-10 font-display text-2xl font-medium tracking-[0.01em] text-ink-900 sm:text-3xl">
                        Verifying your payment
                    </h1>
                    <p className="mt-3 text-sm leading-relaxed text-ink-500">
                        This only takes a moment. Please keep this window open and do not refresh.
                    </p>
                </>
            )}

            {status === 'success' && (
                <>
                    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 ring-1 ring-inset ring-emerald-200">
                        <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7 text-emerald-600" stroke="currentColor" strokeWidth="2">
                            <path d="m5 13 4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </span>
                    <h1 className="mt-10 font-display text-2xl font-medium tracking-[0.01em] text-ink-900 sm:text-3xl">
                        Payment confirmed
                    </h1>
                    <p className="mt-3 text-sm leading-relaxed text-ink-500">
                        Your order has been placed. Taking you to your orders now.
                    </p>
                    <Link
                        href="/customer/orders"
                        className="mt-8 inline-block border border-ink-900 px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-900 transition hover:bg-ink-900 hover:text-white"
                    >
                        View orders
                    </Link>
                </>
            )}

            {status === 'error' && (
                <>
                    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-red-50 ring-1 ring-inset ring-red-200">
                        <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7 text-red-600" stroke="currentColor" strokeWidth="2">
                            <path d="M12 8v5M12 16.5v.5" strokeLinecap="round" />
                            <circle cx="12" cy="12" r="9" />
                        </svg>
                    </span>
                    <h1 className="mt-10 font-display text-2xl font-medium tracking-[0.01em] text-ink-900 sm:text-3xl">
                        We could not verify your payment
                    </h1>
                    <p className="mt-3 text-sm leading-relaxed text-ink-500">{message}</p>
                    <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                        <Link
                            href="/cart"
                            className="border border-ink-900 bg-ink-900 px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-ink-700"
                        >
                            Back to cart
                        </Link>
                        <Link
                            href="/customer/orders"
                            className="border border-ink-300 px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-900 transition hover:border-ink-900"
                        >
                            Check orders
                        </Link>
                    </div>
                </>
            )}
        </div>
    );
};

export default VerifyPaymentContent;
