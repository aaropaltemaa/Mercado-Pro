import CheckoutButton from "../components/CheckoutButton";
import ItemCard from "../components/ItemCard";

const CartPage = () => {
  return (
    <>
      <h1 className="font-semibold text-4xl">Your Cart</h1>
      <ItemCard />
      <CheckoutButton />
    </>
  );
};

export default CartPage;
