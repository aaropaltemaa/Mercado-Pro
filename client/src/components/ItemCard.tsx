import { useCart } from "../store/cart";
import { FaTrash } from "react-icons/fa";
import cartService from "../services/cart";
import { useAuthStore } from "../store/auth";
import toast from "react-hot-toast";

const ItemCard = () => {
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
              <div className="flex flex-row items-center justify-between w-32 font-bold border-4 rounded-2xl px-2 py-1 mt-4 border-yellow-300">
                <button className="text-xl">-</button>
                {item.quantity}
                <button className="ml-2 text-xl">+</button>
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
