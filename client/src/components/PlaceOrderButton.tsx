import toast from "react-hot-toast";
import orderService from "../services/orders";
import { useAuthStore } from "../store/auth";
import { useCart } from "../store/cart";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import { useShipping } from "../store/checkout";

const PlaceOrderButton = () => {
  const token = useAuthStore((state) => state.token);
  const clearCart = useCart((state) => state.clearCart);
  const cartItems = useCart((state) => state.cartItems);
  const hasShippingData = useShipping((state) => state.hasShippingData);
  const navigate = useNavigate();

  const isDisabled = !token || cartItems.length === 0 || !hasShippingData;

  const placeOrder = async () => {
    try {
      await orderService.create(token!);
      clearCart();
      toast.success("Successfully created order!");
      navigate("/");
    } catch {
      toast.error("Failed to create order");
    }
  };

  return (
    <div>
      <button
        data-tooltip-id="order-tip"
        data-tooltip-content={
          !token
            ? "You must be logged in."
            : !hasShippingData
              ? "Please enter shipping info."
              : "Add items to your cart to place an order."
        }
        className="font-bold border rounded-xl p-3 text-white transition 
          hover:bg-green-600 bg-blue-600 
          disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isDisabled}
        onClick={placeOrder}
      >
        Place Order
      </button>
      <Tooltip id="order-tip" />
    </div>
  );
};

export default PlaceOrderButton;
