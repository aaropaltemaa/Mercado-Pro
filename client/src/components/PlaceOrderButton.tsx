import toast from "react-hot-toast";
import orderService from "../services/orders";
import { useAuthStore } from "../store/auth";
import { useCart } from "../store/cart";
import { useNavigate } from "react-router-dom";

const PlaceOrderButton = () => {
  const token = useAuthStore((state) => state.token);
  const clearCart = useCart((state) => state.clearCart);
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
        className="font-bold border rounded-xl p-3 text-white transition hover:bg-green-500 bg-blue-600"
        onClick={() => {
          if (token) {
            placeOrder(token);
          }
        }}
      >
        Place order
      </button>
    </div>
  );
};

export default PlaceOrderButton;
