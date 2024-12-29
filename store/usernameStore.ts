import { create } from 'zustand';

// Define the store's type
interface FirstNameStore {
    firstname: string;
    setFirstname: (newFirstname: string) => void;
}

// Create the store with proper typing
const useFirstNameStore = create<FirstNameStore>((set) => ({
    firstname: '', // Initial state
    setFirstname: (newFirstname) => set({ firstname: newFirstname }),
}));

export default useFirstNameStore;
