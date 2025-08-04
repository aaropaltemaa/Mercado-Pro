import { create } from "zustand";
import type { CheckoutState } from "../../../types";

export const useShipping = create<CheckoutState>((set) => ({
  shippingInfo: null,
  setShippingInfo: (data) => set({ shippingInfo: data }),
}));
