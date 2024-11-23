'use client';

import { useState, useEffect } from "react";
import Loader from "@/components/ui/Loader";
import { getCart } from "@/services/cart";
import ShippingAddressForm from "@/components/forms/ShippingAddressForm";
import { initializePayment } from "@/services/paystack";
import { useRouter } from "next/navigation";


function CheckoutPage() {
    const router = useRouter();
    const [cart, setCart] = useState<Cart | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const handleShippingAddressSubmit = async (shippingAddress: any) => {

        if (!cart?.totalPrice) {
            return alert('Total Price is missing. Please make an order.');
        }
        try {
            const { data } = await initializePayment(cart?.totalPrice, shippingAddress);
            if (data.authorization_url) {
                router.push(data.authorization_url);
            }
        } catch (error) {
            console.error('Payment Error:', error);
        }


    };

    useEffect(() => {
        async function fetchCartItems() {
            try {
                const res = await getCart();
                setCart(res.cart);
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
            <h1>Checkout</h1>
            <ul>
                <li>Sub-Total: ₦{cart.subtotal}</li>
                <li>Delivery Fee: ₦{cart.deliveryFee}</li>
                <li>Total Price: ₦{cart.totalPrice}</li>
                <hr />
            </ul>

            {/* Shipping Address Form */}
            <h2>Shipping Address</h2>
            <ShippingAddressForm onSubmit={handleShippingAddressSubmit} />
        </div>
    );
}

export default CheckoutPage;
