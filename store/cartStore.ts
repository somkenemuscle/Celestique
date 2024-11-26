import { create } from 'zustand';

// Define the CartItem and Cart interfaces
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

// Define the Zustand store
interface CartState {
  cart: Cart;
  setGlobalCart: (cart: Cart) => void;
}

// Create the Zustand store
const useCartStore = create<CartState>((set) => ({
  cart: {
    items: [],
    subtotal: 0,
    deliveryFee: 0,
    totalPrice: 0,
  },
  setGlobalCart: (cart: Cart) => set({ cart }),
}));

export default useCartStore;
