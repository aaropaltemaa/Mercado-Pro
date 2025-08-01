import { create } from "zustand";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
};

type CartItem = {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
};

type CartState = {
  cartItems: CartItem[];
  setCart: (items: CartItem[]) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
};

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
