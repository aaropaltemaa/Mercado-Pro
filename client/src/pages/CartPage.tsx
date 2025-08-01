import { useEffect } from "react";
import { useCart } from "../store/cart";
import cartService from "../services/cart";
import { useAuthStore } from "../store/auth";
import { FaTrash } from "react-icons/fa";

const ItemCard = () => {
  const cartItems = useCart((state) => state.cartItems);
  const total = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

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
              <div className="font-bold">Quantity: {item.quantity}</div>
            </div>
            <div className=" flex flex-row mb-20 ml-6 gap-4">
              Total price: ${item.product.price * item.quantity}
              <div>
                <FaTrash size={24} />
              </div>
            </div>
          </div>
        ))}
        <div className="text-xl font-semibold">Cart total: ${total} </div>
      </div>
    </>
  );
};

const CartPage = () => {
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    if (token) {
      cartService
        .getCart(token)
        .then((data) => useCart.getState().setCart(data));
    }
  }, [token]);

  return (
    <>
      <h1 className="font-semibold text-4xl">Your Cart</h1>
      <ItemCard />
    </>
  );
};

export default CartPage;
