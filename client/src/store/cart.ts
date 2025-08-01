import { create } from "zustand";
import type { CartState } from "../../../types";

export const useCart = create<CartState>((set) => ({
  cartItems: [],

  setCart: (items) => {
    set({ cartItems: items });
  },

  removeItem: (id) => {
    set((state) => ({ cartItems: state.cartItems.filter((i) => i.id !== id) }));
  },

  clearCart: () => {
    set({ cartItems: [] });
  },
}));
