import { useCart } from "../store/cart";

import PlaceOrderButton from "../components/PlaceOrderButton";
import ShippingForm from "../components/forms/ShippingForm";

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
          <div
            key={item.id}
            className="flex justify-between items-center border rounded-lg p-4 shadow-sm"
          >
            <div>
              <h2 className="text-lg font-semibold">{item.product.name}</h2>
              <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
            </div>
            <div className="text-right font-bold ml-6">
              ${(item.product.price * item.quantity).toFixed(2)}
            </div>
          </div>
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
