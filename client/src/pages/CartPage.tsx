import ItemCard from "../components/ItemCard";
import { Link } from "react-router-dom";
import { Tooltip } from "react-tooltip";

const CartPage = () => {
  return (
    <>
      <h1 className="font-semibold text-4xl">Your Cart</h1>
      <ItemCard />
      <Link
        to="/checkout"
        className="font-bold border rounded-xl p-3 text-white transition 
            hover:bg-green-600 bg-blue-600"
      >
        Proceed to Checkout
      </Link>
    </>
  );
};

export default CartPage;
