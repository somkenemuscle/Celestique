interface Product {
    _id: string;
    name: string;
    price: number;
    quantity: number;
    colors: string[];
    sizes: string[];
    description: string;
    images: string[];
    category: string;
    gender: {
        gender: string
    };
};

interface CartItem {
    product: {
        _id: string;
        name: string;
        price: string;
        quantity: string;
        colors: string[];
        sizes: string[];
        description: string;
        images: string[];
        category: string;
        gender: {
            gender: string
        };
    };
    quantity: number;
    color: string;
    size: string;
    subtotal: number;
}

interface Cart {
    _id: string;
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

type FieldName = "firstname" | "lastname" | "phonenumber" | "email" | "password";

type CheckOutFieldName = "firstname" | "lastname" | "phonenumber" | "city" | "country" | "address" | "postalCode";
