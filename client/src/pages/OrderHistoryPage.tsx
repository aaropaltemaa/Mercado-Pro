import { useEffect, useState } from "react";
import orderService from "../services/orders";
import { useAuthStore } from "../store/auth";
import type { Order } from "../../../types";

const OrderHistoryPage = () => {
  const token = useAuthStore((state) => state.token);
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (!token) return;
    orderService.getAll(token).then((data) => setOrders(data));
  }, [token]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-10">My Orders</h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500">
          You haven’t placed any orders yet.
        </p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border rounded-lg shadow p-6 space-y-4 bg-white"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="font-semibold text-lg">
                    Order ID: {order.id}
                  </h2>
                  <p className="text-sm text-gray-600">
                    Placed on {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-green-600 text-lg">
                    ${order.total}
                  </p>
                  <p className="text-sm text-gray-500 capitalize">
                    {order.status}
                  </p>
                </div>
              </div>

              <div className="text-sm text-gray-600">
                <p>{order.fullName}</p>
                <p>
                  {order.address}, {order.city}, {order.postalCode},{" "}
                  {order.country}
                </p>
                <p>{order.phone}</p>
              </div>

              <div className="border-t pt-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between mb-2">
                    <div>
                      <p className="font-medium">{item.product.name}</p>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <div className="text-sm font-semibold">
                      ${item.price * item.quantity}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistoryPage;
