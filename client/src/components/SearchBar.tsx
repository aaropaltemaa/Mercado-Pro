import { useState, useRef } from "react";
import { FaSearch } from "react-icons/fa";
import { useProductStore } from "../store/products";
import { Link } from "react-router-dom";

const SearchBar = () => {
  const search = useProductStore((state) => state.search);
  const setSearch = useProductStore((state) => state.setSearch);
  const products = useProductStore((state) => state.products);
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredProducts =
    search.length > 0
      ? products.filter((p) =>
          p.name.toLowerCase().includes(search.toLowerCase())
        )
      : [];

  return (
    <div className="relative w-full max-w-2xl mr-10">
      <input
        ref={inputRef}
        className="border rounded-3xl py-2.5 px-4 w-full focus:ring-2 focus:ring-blue-500 outline-none"
        type="text"
        placeholder="Search for products..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setShowDropdown(e.target.value.length > 0);
        }}
        onFocus={() => setShowDropdown(search.length > 0)}
        onBlur={() => setShowDropdown(false)}
      />
      <FaSearch
        size={22}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
      />

      {showDropdown && (
        <div
          className="absolute left-0 top-full mt-2 w-full bg-white border rounded-xl shadow-lg z-50 max-h-80 overflow-auto"
          onMouseDown={(e) => e.preventDefault()} // prevent blur
        >
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Link
                key={product.id}
                to={`/products/${product.id}`}
                className="flex items-center gap-4 px-4 py-3 hover:bg-blue-50 transition"
                onClick={() => {
                  setShowDropdown(false);
                  setSearch("");
                }}
              >
                <img
                  src={product.image || "https://placehold.co/60"}
                  alt={product.name}
                  className="w-14 h-14 object-cover rounded-lg border"
                />
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-900 truncate">
                    {product.name}
                  </div>
                  <div className="text-sm text-gray-500 truncate">
                    {product.description}
                  </div>
                  <div className="text-sm font-semibold text-green-600">
                    ${product.price}
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="px-4 py-3 text-gray-500">No products found.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
