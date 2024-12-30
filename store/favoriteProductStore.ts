import { create } from 'zustand';

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
        gender: string;
    };
}

interface FavoriteProductStore {
    savedProducts: Product[]; // Array of favorite products
    setSavedProducts: (products: Product[]) => void; // Action to update saved products
}

// Create the store
const useFavoriteProductStore = create<FavoriteProductStore>((set) => ({
    savedProducts: [], // Initial state
    setSavedProducts: (products) => set({ savedProducts: products }),
}));

export default useFavoriteProductStore;
