import { useEffect } from "react";
import { useCart } from "../store/cart";
import cartService from "../services/cart";
import { useAuthStore } from "../store/auth";
import ItemCard from "../components/ItemCard";

const CartPage = () => {
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    if (token) {
      cartService
        .getCart(token)
        .then((data) => useCart.getState().setCart(data));
    }
  }, [token]);

  return (
    <>
      <h1 className="font-semibold text-4xl">Your Cart</h1>
      <ItemCard />
    </>
  );
};

export default CartPage;
