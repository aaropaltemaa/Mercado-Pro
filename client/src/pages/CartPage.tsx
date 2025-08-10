import CheckoutButton from "../components/CheckoutButton";
import CartItemCard from "../components/CartItemCard";

const CartPage = () => {
  return (
    <>
      <h1 className="font-semibold text-4xl">Your Cart</h1>
      <CartItemCard />
      <CheckoutButton />
    </>
  );
};

export default CartPage;
