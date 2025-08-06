import { useCart } from "../store/cart";
import PlaceOrderButton from "../components/PlaceOrderButton";
import ShippingForm from "../components/forms/ShippingForm";
import { Link } from "react-router-dom";

const CheckoutPage = () => {
  const cartItems = useCart((state) => state.cartItems);
  const total = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="max-w-4xl mx-auto px-4 space-y-10">
      <h1 className="text-3xl font-bold text-center">Checkout</h1>
      <ShippingForm />

      <div className="space-y-6">
        {cartItems.map((item) => (
          <Link
            to={`/products/${item.product.id}`}
            key={item.id}
            className="flex items-center justify-between border rounded-lg p-4 shadow-sm gap-6 hover:bg-gray-50 transition"
          >
            <img
              src={item.product.image || "https://placehold.co/80x80"}
              alt={item.product.name}
              className="w-20 h-20 object-cover rounded-md border"
            />
            <div className="flex-1">
              <h2 className="text-lg font-semibold">{item.product.name}</h2>
              <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
            </div>
            <div className="text-right font-bold">
              ${(item.product.price * item.quantity).toFixed(2)}
            </div>
          </Link>
        ))}
      </div>

      <div className="flex justify-between items-center text-xl font-semibold border-t pt-6">
        <span>Total:</span>
        <span>${total.toFixed(2)}</span>
      </div>

      <div className="flex justify-end">
        <PlaceOrderButton />
      </div>
    </div>
  );
};

export default CheckoutPage;
