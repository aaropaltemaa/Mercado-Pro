import ItemCard from "../components/ItemCard";
import PlaceOrderButton from "../components/PlaceOrderButton";

const CartPage = () => {
  return (
    <>
      <h1 className="font-semibold text-4xl">Your Cart</h1>
      <ItemCard />
      <PlaceOrderButton />
    </>
  );
};

export default CartPage;
