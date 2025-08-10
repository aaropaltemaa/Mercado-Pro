import { useEffect } from "react";
import productService from "../services/products";
import { useProductStore } from "../store/products";
import ProductCard from "./ProductCard";

export default function ProductList() {
  const setProducts = useProductStore((state) => state.setProducts);

  useEffect(() => {
    productService.getAll().then((products) => {
      setProducts(products);
    });
  }, [setProducts]);

  return (
    <div className="max-w-7xl mx-auto px-6">
      <ProductCard />
    </div>
  );
}
