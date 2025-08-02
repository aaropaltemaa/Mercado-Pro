import { FaSearch } from "react-icons/fa";
import { useProductStore } from "../store/products";

const SearchBar = () => {
  const search = useProductStore((state) => state.search);
  const setSearch = useProductStore((state) => state.setSearch);

  return (
    <div className="relative w-full max-w-2xl">
      <input
        className="border rounded-3xl py-2.5 px-4 w-full"
        type="text"
        placeholder="Search for products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <FaSearch
        size={22}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
      />
    </div>
  );
};

export default SearchBar;
