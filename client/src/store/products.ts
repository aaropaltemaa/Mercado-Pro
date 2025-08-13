import { create } from "zustand";
import type { ProductState } from "../../../types";

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  search: "",

  setProducts: (items) => {
    set({ products: items });
  },

  setSearch: (query) => set({ search: query }),

  sortOption: "Newest",
  setSortOption: (option) => set({ sortOption: option }),

  selectedBrands: [],
  toggleBrand: (brand) =>
    set((state) => {
      const exists = state.selectedBrands.includes(brand);
      return {
        selectedBrands: exists
          ? state.selectedBrands.filter((b) => b !== brand)
          : [...state.selectedBrands, brand],
      };
    }),
  clearBrands: () => set({ selectedBrands: [] }),

  priceRange: [0, 9999],
  setPriceRange: (range) => set({ priceRange: range }),

  clearFilters: () =>
    set({
      sortOption: "Newest",
      selectedBrands: [],
      priceRange: [0, 9999],
    }),
}));

export const selectFilteredCount = (s: ProductState) => {
  const q = s.search.trim().toLowerCase();

  const list = s.products
    .filter((p) => (q ? p.name.toLowerCase().includes(q) : true))
    .filter((p) =>
      s.selectedBrands.length > 0 ? s.selectedBrands.includes(p.brand) : true
    )
    .filter((p) => p.price >= s.priceRange[0] && p.price <= s.priceRange[1]);

  return list.length;
};
