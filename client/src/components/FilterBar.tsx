import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
  Popover,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import { useProductStore, selectFilteredCount } from "../store/products";

const sortOptions = [
  "Newest",
  "Price: Low to High",
  "Price: High to Low",
  "Best Rated",
];
const brandOptions = [
  "Apple",
  "Samsung",
  "Dell",
  "Sony",
  "Logitech",
  "LG",
  "Asus",
  "Other",
];

export default function FilterBar() {
  const resultsCount = useProductStore(selectFilteredCount);
  const {
    sortOption,
    setSortOption,
    selectedBrands,
    toggleBrand,
    priceRange,
    setPriceRange,
    clearFilters,
  } = useProductStore();

  return (
    <div className="sticky top-[70px] z-30 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between px-4 py-3 gap-4">
        <div className="text-sm text-gray-600 font-medium">
          {resultsCount} results
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* SORT */}
          <Listbox value={sortOption} onChange={setSortOption}>
            <ListboxButton className="flex items-center gap-2 rounded-full border border-gray-300 px-4 py-1.5 text-sm font-medium text-gray-700 hover:border-blue-500">
              {sortOption}
              <ChevronDown size={16} />
            </ListboxButton>
            <ListboxOptions className="absolute mt-2 w-48 rounded-lg border border-gray-200 bg-white shadow-lg">
              {sortOptions.map((option) => (
                <ListboxOption
                  key={option}
                  value={option}
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
                >
                  {option}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </Listbox>

          {/* PRICE */}
          <Popover>
            <PopoverButton className="flex items-center gap-2 rounded-full border border-gray-300 px-4 py-1.5 text-sm font-medium text-gray-700 hover:border-blue-500">
              Price
              <ChevronDown size={16} />
            </PopoverButton>
            <PopoverPanel className="absolute mt-2 w-64 rounded-lg border border-gray-200 bg-white shadow-lg p-4 text-sm">
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  className="border rounded px-2 py-1 w-20"
                  value={priceRange[0]}
                  onChange={(e) =>
                    setPriceRange([+e.target.value, priceRange[1]])
                  }
                />
                <span>-</span>
                <input
                  type="number"
                  className="border rounded px-2 py-1 w-20"
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([priceRange[0], +e.target.value])
                  }
                />
              </div>
            </PopoverPanel>
          </Popover>

          {/* BRAND */}
          <Popover>
            <PopoverButton className="flex items-center gap-2 rounded-full border border-gray-300 px-4 py-1.5 text-sm font-medium text-gray-700 hover:border-blue-500">
              Brand
              <ChevronDown size={16} />
            </PopoverButton>
            <PopoverPanel className="absolute mt-2 w-48 rounded-lg border border-gray-200 bg-white shadow-lg p-4 space-y-2">
              {brandOptions.map((brand) => (
                <label key={brand} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => toggleBrand(brand)}
                  />
                  {brand}
                </label>
              ))}
            </PopoverPanel>
          </Popover>

          {/* CLEAR */}
          <button
            onClick={clearFilters}
            className="text-sm text-red-500 hover:underline"
          >
            Clear filters
          </button>
        </div>
      </div>
    </div>
  );
}
