// src/components/Filters.tsx
import React, { useState, useEffect } from "react";

interface FiltersProps {
  onFilter: (filters: {
    category: string;
    minPrice: number;
    maxPrice: number;
  }) => void;
  onSort: (method: string) => void;
  categories: string[];
  currentCategory: string;
  currency: string;
}

const Filters: React.FC<FiltersProps> = ({
  onFilter,
  onSort,
  categories,
  currentCategory,
  currency,
}) => {
  const [category, setCategory] = useState("all");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(13000);
  useEffect(() => {
    const timeout = setTimeout(() => {
      onFilter({ category, minPrice, maxPrice });
    }, 200); // debounce to avoid loops or excessive updates

    return () => clearTimeout(timeout);
  }, [category, minPrice, maxPrice, onFilter, currentCategory]);

  return (
    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
      <div>
        <label htmlFor="category" className="sr-only">
          Category
        </label>
        <select
          id="category"
          className="bg-gray-800 border border-gray-700 rounded-lg px-2 py-2"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat} className="capitalize">
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center space-x-2">
        <span className="text-gray-400">Price:</span>
        <input
          type="range"
          min="0"
          max="50"
          value={minPrice}
          onChange={(e) => setMinPrice(parseInt(e.target.value))}
          className="w-24 accent-white"
        />
        <span className="text-gray-400">
          {" "}
          {currency === "USD" ? "$" : "₹"}
          {minPrice}
        </span>
        <span className="text-gray-400">to</span>
        <input
          type="range"
          min="0"
          max="13000"
          value={maxPrice}
          onChange={(e) => setMaxPrice(parseInt(e.target.value))}
          className="w-24 accent-white"
        />
        <span className="text-gray-400">
          {" "}
          {currency === "USD" ? "$" : "₹"}
          {maxPrice}
        </span>
      </div>

      <div>
        <label htmlFor="sort" className="sr-only">
          Sort By
        </label>
        <select
          id="sort"
          className="bg-gray-800 border border-gray-700 rounded-lg px-2 py-2"
          onChange={(e) => onSort(e.target.value)}
          defaultValue="price-low"
        >
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="name">Name: A to Z</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;
