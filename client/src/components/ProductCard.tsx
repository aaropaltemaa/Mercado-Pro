import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import highlightText from "./HighLightText";
import { useProductStore } from "../store/products";
import { FaEye } from "react-icons/fa";
import { useMemo } from "react";

const ProductCard = () => {
  const { products, search, sortOption, selectedBrands, priceRange } =
    useProductStore();

  const safeProducts = Array.isArray(products) ? products : [];

  const filteredProducts = useMemo(() => {
    const q = search.trim().toLowerCase();

    let list = safeProducts
      // search
      .filter((p) => (q ? p.name.toLowerCase().includes(q) : true))
      // brand
      .filter((p) =>
        selectedBrands.length > 0 ? selectedBrands.includes(p.brand) : true
      )
      // price
      .filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // sort
    list = list.sort((a, b) => {
      switch (sortOption) {
        case "Price: Low to High":
          return a.price - b.price;
        case "Price: High to Low":
          return b.price - a.price;
        case "Best Rated":
          return (b.averageRating ?? 0) - (a.averageRating ?? 0);
        case "Newest":
        default:
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
      }
    });

    return list;
  }, [safeProducts, search, sortOption, selectedBrands, priceRange]);

  if (filteredProducts.length === 0) {
    return <div className="text-lg">No products found.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-center">
      {filteredProducts.map((product, index) => (
        <motion.div
          key={product.id}
          data-testid="product-card"
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
          <p className="font-bold text-green-600 text-xl">${product.price}</p>
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
  );
};

export default ProductCard;
