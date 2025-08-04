export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
};

export type CartItem = {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
};

export type CartState = {
  cartItems: CartItem[];
  setCart: (items: CartItem[]) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
};

export interface User {
  id: string;
  email: string;
  role: "BUYER" | "SELLER" | "ADMIN";
}

export interface AuthState {
  user: User | null;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
  initialize: () => void;
}

export type ProductState = {
  products: Product[];
  search: string;
  setProducts: (items: Product[]) => void;
  setSearch: (query: string) => void;
};

export type ShippingData = {
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  phone: string;
};

export interface CheckoutState {
  shippingInfo: ShippingData | null;
  setShippingInfo: (data: ShippingData) => void;
}
