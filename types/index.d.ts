interface Product {
    _id: string;
    name: string;
    price: number;
    quantity: number;
    colors: string[];
    sizes: string[];
    description: string;
    slug: string;
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
        slug: string;
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


interface Order {
    _id: string; // MongoDB ObjectId as a string
    user: string; // User ID
    items: {
        product: {
            _id: string;
            name: string;
            price: string;
            quantity: string;
            colors: string[];
            sizes: string[];
            description: string;
            slug: string;
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
    }[];
    shippingAddress: {
        firstName: string;
        lastName: string;
        address: string;
        city: string;
        state: string;
        postalCode?: string; // Optional
        country: string;
        phoneNumber: string;
    };
    totalAmount: number;
    paymentStatus: 'Pending' | 'Paid' | 'Failed';
    paymentReference?: string; // Optional because it can be null
    orderStatus: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
    paymentId: { paymentMethod: string };
    createdAt: string; // ISO 8601 timestamp
    updatedAt: string; // ISO 8601 timestamp
}

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

interface FilterSortSidebarProps {
    baseRoute: string;
    onFilterChange: (data: Product[], pages: number) => void;
}

interface ProductDropdownProps {
    links: { href: string; name: string }[];
}