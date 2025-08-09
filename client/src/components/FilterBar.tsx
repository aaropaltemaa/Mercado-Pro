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
import { useState } from "react";
import { useProductStore } from "../store/products";

const sortOptions = [
  "Newest",
  "Price: Low to High",
  "Price: High to Low",
  "Best Rated",
];
const brandOptions = ["Dell", "Apple", "Samsung", "LG", "Asus"];

export default function FilterBar() {
  const [selectedSort, setSelectedSort] = useState(sortOptions[0]);
  const products = useProductStore((state) => state.products);

  return (
    <div className="sticky top-[70px] z-30 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between px-4 py-3 gap-4">
        {/* LEFT: Result Count */}
        <div className="text-sm text-gray-600 font-medium">
          {products.length} results
        </div>

        {/* RIGHT: Controls */}
        <div className="flex flex-wrap items-center gap-3">
          {/* SORT DROPDOWN */}
          <Listbox value={selectedSort} onChange={setSelectedSort}>
            <ListboxButton className="flex items-center gap-2 rounded-full border border-gray-300 px-4 py-1.5 text-sm font-medium text-gray-700 hover:border-blue-500 transition-colors">
              {selectedSort}
              <ChevronDown size={16} />
            </ListboxButton>
            <ListboxOptions className="absolute mt-2 w-48 rounded-lg border border-gray-200 bg-white shadow-lg focus:outline-none">
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

          {/* PRICE FILTER */}
          <Popover>
            <PopoverButton className="flex items-center gap-2 rounded-full border border-gray-300 px-4 py-1.5 text-sm font-medium text-gray-700 hover:border-blue-500 transition-colors">
              Price
              <ChevronDown size={16} />
            </PopoverButton>
            <PopoverPanel className="absolute mt-2 w-64 rounded-lg border border-gray-200 bg-white shadow-lg p-4 text-sm text-gray-700">
              {/* Range slider will go here */}
              <div className="text-gray-500">Price filter UI here</div>
            </PopoverPanel>
          </Popover>

          {/* BRAND FILTER */}
          <Popover>
            <PopoverButton className="flex items-center gap-2 rounded-full border border-gray-300 px-4 py-1.5 text-sm font-medium text-gray-700 hover:border-blue-500 transition-colors">
              Brand
              <ChevronDown size={16} />
            </PopoverButton>
            <PopoverPanel className="absolute mt-2 w-48 rounded-lg border border-gray-200 bg-white shadow-lg p-4 space-y-2">
              {brandOptions.map((brand) => (
                <label key={brand} className="flex items-center gap-2 text-sm">
                  <input type="checkbox" className="rounded border-gray-300" />
                  {brand}
                </label>
              ))}
            </PopoverPanel>
          </Popover>

          {/* CLEAR FILTERS */}
          <button className="text-sm text-red-500 hover:underline">
            Clear filters
          </button>
        </div>
      </div>
    </div>
  );
}
