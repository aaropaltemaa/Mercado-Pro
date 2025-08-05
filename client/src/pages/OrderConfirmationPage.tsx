import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

const OrderConfirmationPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center space-y-6">
      <CheckCircle size={64} className="text-green-600" />
      <h1 className="text-3xl font-bold">Thank you for your order!</h1>
      <p className="text-gray-600 max-w-md">
        Your order has been placed successfully. You’ll receive a confirmation
        email shortly.
      </p>
      <Link
        to="/"
        className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Continue Shopping
      </Link>
    </div>
  );
};

export default OrderConfirmationPage;
