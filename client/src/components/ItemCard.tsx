import { useCart } from "../store/cart";
import { FaTrash } from "react-icons/fa";
import cartService from "../services/cart";
import { useAuthStore } from "../store/auth";
import toast from "react-hot-toast";
import { useState } from "react";

const ItemCard = () => {
  const [updatingItemId, setUpdatingItemId] = useState<string | null>(null);
  const token = useAuthStore((state) => state.token);
  const cartItems = useCart((state) => state.cartItems);
  const removeItem = useCart((state) => state.removeItem);
  const total = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handleDelete = async (id: string) => {
    if (!token) {
      return;
    }
    try {
      if (window.confirm("Are you sure you want to delete this item?")) {
        await cartService.removeCartItem(id, token);
        removeItem(id);
      }
    } catch {
      toast.error("Failed to delete cart item");
    }
  };

  const handleUpdate = async (id: string, newQuantity: number) => {
    if (!token) {
      return;
    }
    try {
      setUpdatingItemId(id); // start loading
      await cartService.updateCartItem(id, newQuantity, token);
      const updatedCart = await cartService.getCart(token);
      useCart.getState().setCart(updatedCart);
    } catch {
      toast.error("Failed to update quantity");
    } finally {
      setUpdatingItemId(null);
    }
  };

  return (
    <>
      <div>
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="border rounded-lg p-4 mb-4 shadow-sm flex justify-between items-center"
          >
            <div className="flex flex-col">
              <div className="font-bold text-lg">{item.product.name}</div>
              <div className="text-sm max-w-56">{item.product.description}</div>
              <div className="font-bold">${item.product.price}</div>
              <div className="flex flex-row items-center justify-between w-32 font-bold border-4 rounded-3xl px-3 py-1 mt-4 border-yellow-300">
                <button
                  onClick={() => handleUpdate(item.id, item.quantity - 1)}
                  disabled={item.quantity === 1 || updatingItemId === item.id}
                  className={`ml-2 text-xl ${
                    updatingItemId === item.id
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  {updatingItemId === item.id ? "..." : "-"}
                </button>

                {item.quantity}

                <button
                  onClick={() => handleUpdate(item.id, item.quantity + 1)}
                  disabled={updatingItemId === item.id}
                  className={`ml-2 text-xl ${
                    updatingItemId === item.id
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                >
                  {updatingItemId === item.id ? "..." : "+"}
                </button>
              </div>
            </div>
            <div className="flex flex-row gap-4 pl-8 mb-20">
              Total price: ${item.product.price * item.quantity}
              <button onClick={() => handleDelete(item.id)}>
                <FaTrash size={24} />
              </button>
            </div>
          </div>
        ))}
        <div className="text-xl font-semibold">Cart total: ${total} </div>
      </div>
    </>
  );
};

export default ItemCard;
