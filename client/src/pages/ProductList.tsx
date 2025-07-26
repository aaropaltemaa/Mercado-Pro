import { useEffect, useState } from "react";
import axios from "axios";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
};

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded shadow">
            <h2 className="font-semibold text-lg">{product.name}</h2>
            <p className="text-sm text-gray-600">{product.description}</p>
            <p className="font-bold mt-2">${product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
