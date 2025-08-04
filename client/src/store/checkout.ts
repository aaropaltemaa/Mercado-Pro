import { create } from "zustand";
import type { CheckoutState } from "../../../types";

export const useShipping = create<CheckoutState>((set) => ({
  shippingData: null,
  setShippingData: (data) => set({ shippingData: data }),
  clearShippingData: () => set({ shippingData: null }),
}));
