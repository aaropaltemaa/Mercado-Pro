import toast from "react-hot-toast";
import orderService from "../services/orders";
import { useAuthStore } from "../store/auth";
import { useCart } from "../store/cart";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";

const PlaceOrderButton = () => {
  const token = useAuthStore((state) => state.token);
  const clearCart = useCart((state) => state.clearCart);
  const cartItems = useCart((state) => state.cartItems);
  const navigate = useNavigate();

  const placeOrder = async (token: string) => {
    try {
      await orderService.create(token);
      clearCart();
      toast.success("Succesfully created order!");
      navigate("/");
    } catch {
      toast.error("Failed to create order");
    }
  };

  return (
    <div>
      <button
        data-tooltip-id="order-tip"
        className="font-bold border rounded-xl p-3 text-white transition 
            hover:bg-green-600 bg-blue-600 
            disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!token || cartItems.length === 0}
        onClick={() => {
          if (token && cartItems.length !== 0) {
            placeOrder(token);
          }
        }}
      >
        Place order
      </button>
      <Tooltip
        id="order-tip"
        content="Add items to your cart to place an order."
      />
    </div>
  );
};

export default PlaceOrderButton;
