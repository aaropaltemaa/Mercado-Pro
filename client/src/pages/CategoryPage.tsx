import { useParams } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import productService from "../services/products";
import type { Product } from "../../../types";
import FilterBar from "../components/FilterBar";
import { useProductStore } from "../store/products";
import highlightText from "../components/HighLightText";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaEye } from "react-icons/fa";

const CategoryPage = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const capitalizedCategoryName = categoryName
    ? categoryName.charAt(0).toUpperCase() + categoryName.slice(1)
    : "";

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const search = useProductStore((state) => state.search);

  const fetchCategoryProducts = useCallback(async () => {
    if (!categoryName) return;
    setLoading(true);
    try {
      const data = await productService.getByCategory(categoryName);
      setProducts(data);
    } catch (error) {
      console.error("Error fetching category products:", error);
    } finally {
      setLoading(false);
    }
  }, [categoryName]);

  useEffect(() => {
    fetchCategoryProducts();
  }, [fetchCategoryProducts]);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-8">
      {/* PAGE TITLE */}
      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
        {capitalizedCategoryName}
      </h2>

      {/* FILTER BAR */}
      <FilterBar />

      {/* LOADING STATE */}
      {loading && (
        <div className="text-gray-500 text-center py-10">
          Loading {capitalizedCategoryName}...
        </div>
      )}

      {/* EMPTY STATE */}
      {!loading && filteredProducts.length === 0 && (
        <div className="text-gray-500 text-center py-10">
          No products found in this category.
        </div>
      )}

      {/* PRODUCT GRID */}
      {!loading && filteredProducts.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-center">
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              className="flex flex-col border p-5 min-h-[350px] rounded-xl shadow-md w-72 transition-all duration-200 hover:scale-[1.02] hover:shadow-xl gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <img
                className="h-40 object-cover w-full rounded-t-xl"
                src={product.image}
                alt={product.name}
              />
              <h2 className="font-semibold text-2xl">
                {highlightText(product.name, search)}
              </h2>
              <p className="font-bold text-green-600 text-xl">
                ${product.price}
              </p>
              <p className="text-sm text-gray-500 truncate">
                {product.description}
              </p>
              <Link
                to={`/products/${product.id}`}
                className="mt-auto w-full flex items-center justify-center gap-2 px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition"
              >
                <FaEye />
                <span>View</span>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
