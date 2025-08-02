import { create } from "zustand";
import type { ProductState } from "../../../types";

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  search: "",

  setProducts: (items) => {
    set({ products: items });
  },

  setSearch: (query) => set({ search: query }),
}));
