import { useCart } from "../store/cart";
import { FaTrash } from "react-icons/fa";
import cartService from "../services/cart";
import { useAuthStore } from "../store/auth";
import toast from "react-hot-toast";
import { useState } from "react";

const CartItemCard = () => {
  const [updatingItemId, setUpdatingItemId] = useState<string | null>(null);
  const token = useAuthStore((state) => state.token);
  const cartItems = useCart((state) => state.cartItems);
  const removeItem = useCart((state) => state.removeItem);
  const total = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handleDelete = async (id: string) => {
    if (!token) return;

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
    if (!token) return;

    try {
      setUpdatingItemId(id);
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
            className="border rounded-lg p-4 mb-4 shadow-sm flex items-center gap-6"
          >
            {/* Product Image */}
            <img
              src={item.product.image || "https://placehold.co/100x100"}
              alt={item.product.name}
              className="w-24 h-24 object-cover rounded-md border"
            />

            {/* Product Info and Controls */}
            <div className="flex flex-col flex-1">
              <div className="font-bold text-lg">{item.product.name}</div>
              <div className="text-sm text-gray-600 max-w-xs line-clamp-2">
                {item.product.description}
              </div>
              <div className="text-green-600 font-semibold text-lg mt-1">
                ${item.product.price}
              </div>

              <div className="flex items-center gap-4 mt-3">
                <div className="flex items-center gap-2 border px-3 py-1 rounded-full border-yellow-400 font-bold">
                  <button
                    onClick={() => handleUpdate(item.id, item.quantity - 1)}
                    disabled={item.quantity === 1 || updatingItemId === item.id}
                    className={`text-lg ${
                      updatingItemId === item.id
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    {updatingItemId === item.id ? "…" : "-"}
                  </button>
                  {item.quantity}
                  <button
                    onClick={() => handleUpdate(item.id, item.quantity + 1)}
                    disabled={updatingItemId === item.id}
                    className={`text-lg ${
                      updatingItemId === item.id
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                  >
                    {updatingItemId === item.id ? "…" : "+"}
                  </button>
                </div>
                <div className="text-sm text-gray-700">
                  Total: ${item.product.price * item.quantity}
                </div>
              </div>
            </div>

            {/* Delete Button */}
            <button onClick={() => handleDelete(item.id)} title="Remove item">
              <FaTrash size={22} className="text-red-500 hover:text-red-700" />
            </button>
          </div>
        ))}

        <div className="text-xl font-semibold mt-6">
          Cart total: ${total.toFixed(2)}
        </div>
      </div>
    </>
  );
};

export default CartItemCard;
