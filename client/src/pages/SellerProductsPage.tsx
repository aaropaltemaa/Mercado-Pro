import { useEffect, useState } from "react";
import productService from "../services/products";
import { useAuthStore } from "../store/auth";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import type { Product } from "../../../types";

const SellerProductsPage = () => {
  const token = useAuthStore((state) => state.token);
  const [sellerProducts, setSellerProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (!token) return;
    productService.getSellerProducts(token).then((data) => {
      setSellerProducts(data);
    });
  }, [token]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-10">
      <h1 className="text-3xl font-bold text-gray-800">My Products</h1>

      {sellerProducts.length === 0 ? (
        <p className="text-gray-600">You haven't created any products yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {sellerProducts.map((product) => (
            <div
              key={product.id}
              className="border rounded-xl shadow hover:shadow-lg transition overflow-hidden"
            >
              <img
                src={product.image || "https://placehold.co/300x200"}
                alt={product.name}
                className="w-full h-40 object-cover"
              />

              <div className="p-4 space-y-2">
                <h2 className="text-xl font-semibold">{product.name}</h2>
                <p className="text-gray-500 text-sm line-clamp-2">
                  {product.description}
                </p>
                <p className="text-green-600 font-bold text-lg">
                  ${product.price}
                </p>

                <Link
                  to={`/products/${product.id}`}
                  className="inline-flex items-center gap-2 mt-2 text-blue-600 hover:underline"
                >
                  <FaEdit />
                  View or Edit
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SellerProductsPage;
