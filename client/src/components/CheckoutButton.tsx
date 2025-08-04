import { Link } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import { useCart } from "../store/cart";

const CheckoutButton = () => {
  const cartItems = useCart((state) => state.cartItems);
  return (
    <div>
      {cartItems.length === 0 ? (
        <span
          data-tooltip-id="checkout-tip"
          className="font-bold border rounded-xl p-3 text-white bg-gray-400 cursor-not-allowed opacity-60"
        >
          Proceed to Checkout
        </span>
      ) : (
        <Link
          to="/checkout"
          className="font-bold border rounded-xl p-3 text-white transition 
              hover:bg-green-600 bg-blue-600"
        >
          Proceed to Checkout
        </Link>
      )}
      <Tooltip
        id="checkout-tip"
        content="Add items to your cart to place an order."
      />
    </div>
  );
};

export default CheckoutButton;
