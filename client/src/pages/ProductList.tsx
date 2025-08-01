import { useEffect, useState } from "react";
import productService from "../services/products";
import { Link } from "react-router-dom";
import type { Product } from "../../../types";

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    productService.getAll().then((products) => {
      setProducts(products);
    });
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <Link
            to={`products/${product.id}`}
            key={product.id}
            className="border p-4 rounded shadow transition hover:opacity-60"
          >
            <h2 className="font-semibold text-lg">{product.name}</h2>
            <p className="text-sm text-gray-600">{product.description}</p>
            <p className="font-bold mt-2">${product.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
