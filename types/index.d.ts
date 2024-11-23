interface Product {
    _id: string;
    name: string;
    price: string;
    quantity: string;
    colors: string[];
    sizes: string[];
    description: string;
    images: string[];
    category: string;
    gender: string;
};

interface CartItem {
    product: string;
    quantity: number;
    color: string;
    size: string;
    subtotal: number;
}

interface Cart {
    items: CartItem[];
    subtotal: number;
    deliveryFee: number;
    totalPrice: number;
}

interface ShippingAddress {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    postalCode?: string;
    country: string;
    phoneNumber: string;
}

interface ShippingAddressFormProps {
    onSubmit: (data: ShippingAddress) => void;
}

type VerifyPaymentContentProps = {
    reference?: string;
  };
  