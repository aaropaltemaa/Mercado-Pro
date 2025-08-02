import { create } from "zustand";
import type { ProductState } from "../../../types";

export const useProductStore = create<ProductState>((set) => ({
  products: [],

  setProducts: (items) => {
    set({ products: items });
  },
}));
