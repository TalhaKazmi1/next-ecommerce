"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface FilterSidebarProps {
  filters: {
    category: string;
    minPrice: number;
    maxPrice: number;
  };
  onFilterChange: (filters: FilterSidebarProps["filters"]) => void;
}

const categories = ["All", "Electronics", "Clothing", "Books", "Home & Garden"];

export default function FilterSidebar({
  filters,
  onFilterChange,
}: FilterSidebarProps) {
  const [localFilters, setLocalFilters] = useState(filters);

  useEffect(() => {
    onFilterChange(localFilters);
  }, [localFilters, onFilterChange]);

  const handleCategoryChange = (category: string) => {
    setLocalFilters((prev) => ({
      ...prev,
      category: category === "All" ? "" : category,
    }));
  };

  const handlePriceChange = (min: number, max: number) => {
    setLocalFilters((prev) => ({ ...prev, minPrice: min, maxPrice: max }));
  };

  return (
    <motion.aside
      className="w-64 bg-gray-800 p-6 rounded-lg"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-bold text-white mb-4">Filters</h2>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white mb-2">Category</h3>
        {categories.map((category) => (
          <motion.button
            key={category}
            className={`block w-full text-left py-2 px-4 rounded ${
              localFilters.category === (category === "All" ? "" : category)
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:bg-gray-700"
            }`}
            onClick={() => handleCategoryChange(category)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category}
          </motion.button>
        ))}
      </div>

      <div>
        <h3 className="text-lg font-semibold text-white mb-2">Price Range</h3>
        <div className="flex flex-col space-y-4 justify-between text-white">
          <button
            className={`py-1 px-3 rounded ${
              localFilters.maxPrice === 50 ? "bg-blue-600" : "bg-gray-700"
            }`}
            onClick={() => handlePriceChange(0, 50)}
          >
            $0 - $50
          </button>
          <button
            className={`py-1 px-3 rounded ${
              localFilters.minPrice === 50 && localFilters.maxPrice === 100
                ? "bg-blue-600"
                : "bg-gray-700"
            }`}
            onClick={() => handlePriceChange(50, 100)}
          >
            $50 - $100
          </button>
          <button
            className={`py-1 px-3 rounded ${
              localFilters.minPrice === 100 ? "bg-blue-600" : "bg-gray-700"
            }`}
            onClick={() => handlePriceChange(100, Infinity)}
          >
            $100+
          </button>
        </div>
        <div>
          <button
            className="mt-4 w-full py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
            onClick={() =>
              setLocalFilters({ category: "", minPrice: 0, maxPrice: Infinity })
            }
          >
            Remove Filters
          </button>
        </div>
      </div>
    </motion.aside>
  );
}
