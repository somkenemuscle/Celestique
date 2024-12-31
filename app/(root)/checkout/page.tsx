'use client';

import { useState, useEffect } from "react";
import { getCart } from "@/services/cart";
import ShippingAddressForm from "@/components/forms/ShippingAddressForm";
import ShippingFormSkelenton from "@/components/ui/skelentons/ShippingFormSkelenton";

function CheckoutPage() {
    const [cart, setCart] = useState<Cart | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        async function fetchCartItems() {
            try {
                const res = await getCart();
                setCart(res.cart);
            } catch (err: any) {
                setError(err.message || "Failed to fetch cart");
            } finally {
                setLoading(false);
            }
        }
        fetchCartItems();
    }, []);


    if (loading || !cart) return <ShippingFormSkelenton />;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            {/* Shipping Address Form */}
            <ShippingAddressForm cart={cart} />
        </div>
    );
}

export default CheckoutPage;
