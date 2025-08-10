import { useParams } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import productService from "../services/products";
import FilterBar from "../components/FilterBar";
import ProductCard from "../components/ProductCard";
import { useProductStore } from "../store/products";

const CategoryPage = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const capitalizedCategoryName = categoryName
    ? categoryName.charAt(0).toUpperCase() + categoryName.slice(1)
    : "";

  const [loading, setLoading] = useState(true);
  const setProducts = useProductStore((s) => s.setProducts);
  const products = useProductStore((s) => s.products);

  const fetchCategoryProducts = useCallback(async () => {
    if (!categoryName) return;
    setLoading(true);
    try {
      const data = await productService.getByCategory(categoryName);
      setProducts(data); // <-- push into store
    } catch (error) {
      console.error("Error fetching category products:", error);
      setProducts([]); // safe fallback
    } finally {
      setLoading(false);
    }
  }, [categoryName, setProducts]);

  useEffect(() => {
    fetchCategoryProducts();
  }, [fetchCategoryProducts]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-8">
      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
        {capitalizedCategoryName}
      </h2>

      <FilterBar />

      {loading && (
        <div className="text-gray-500 text-center py-10">
          Loading {capitalizedCategoryName}...
        </div>
      )}

      {!loading && products.length === 0 && (
        <div className="text-gray-500 text-center py-10">
          No products found in this category.
        </div>
      )}

      {!loading && products.length > 0 && <ProductCard />}
    </div>
  );
};

export default CategoryPage;
