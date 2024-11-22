type Product = {
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

type Cart={
    _id:string;
    user:string;
    items:CartItem[];
    deliveryFee:string;
    totalPrice:string;
    subtotal:string;
 
}

type CartItem = {
    _id: string;
    quantity: string;
    product: Product;
    subtotal:string;
    color: string; // Array of strings
    size: string;  // Array of strings
  };