import { useEffect } from "react";
import { useCart } from "../store/cart";
import cartService from "../services/cart";

const CartPage = () => {
  useEffect(() => {
    cartService.getCart().then((data) => useCart.getState().setCart(data));
  }, []);

  return <p>test</p>;
};

export default CartPage;
