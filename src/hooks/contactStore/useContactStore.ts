import { create } from "zustand";

/* Define the shape of the store state and actions */
interface ContactStoreType {
  isOpen: boolean;
  toggle: () => void;
}

/* Create a Zustand store to manage the contact modal/sidebar state */
export const useContactStore = create<ContactStoreType>((set) => ({
  isOpen: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
}));
