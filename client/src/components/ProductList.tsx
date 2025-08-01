import { useEffect } from "react";
import productService from "../services/products";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { useProductStore } from "../store/products";
import highlightText from "./HighLightText";

export default function ProductList() {
  const products = useProductStore((state) => state.products);
  const setProducts = useProductStore((state) => state.setProducts);
  const search = useProductStore((state) => state.search);

  useEffect(() => {
    productService.getAll().then((products) => {
      setProducts(products);
    });
  }, [setProducts]);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  if (filteredProducts.length === 0) {
    return <div className="text-lg">No products found.</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-4xl font-extrabold mb-6">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="flex flex-col border p-5 min-h-[350px] rounded-xl shadow-md w-72 transition-all duration-200 hover:scale-[1.02] hover:shadow-xl gap-2"
          >
            <img
              className="h-40 object-cover w-full rounded-t-xl"
              src="https://placehold.co/300x200"
              alt="Product image"
            />
            <h2 className="font-semibold text-2xl">
              {highlightText(product.name, search)}
            </h2>
            <p className="font-bold text-green-600 text-xl">${product.price}</p>
            <p className="text-sm text-gray-500 truncate">
              {product.description}
            </p>
            <Link
              to={`products/${product.id}`}
              className="mt-auto w-full flex items-center justify-center gap-2 px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition"
            >
              <FaEye />
              <span>View</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
