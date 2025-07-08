// src/pages/ProductPage.tsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Filters from "../components/Filters";
import ProductGrid from "../components/ProductGrid";
import type { Product } from "../types";

interface ProductPageProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  loading: boolean;
  error: string | null;
  currency: string;
}

const ProductPage: React.FC<ProductPageProps> = ({
  products,
  onAddToCart,
  loading,
  error,
  currency,
}) => {
  const { category } = useParams<{ category?: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [sortMethod, setSortMethod] = useState<string>("name");
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({
    min: 0,
    max: Infinity,
  });

  const urlParams = new URLSearchParams(location.search);
  const showAll = urlParams.get("show") === "all";

  // Centralized filtering + sorting logic
  useEffect(() => {
    let filtered = products;

    // Filter by category
    if (category && category !== "all") {
      filtered = filtered.filter(
        (product) => product.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Filter by price
    filtered = filtered.filter(
      (product) =>
        product.price >= priceRange.min && product.price <= priceRange.max
    );

    // Sort
    filtered = [...filtered].sort((a, b) => {
      switch (sortMethod) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "name":
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(filtered);
  }, [products, category, priceRange, sortMethod]);

  const handleFilter = ({
    minPrice,
    maxPrice,
  }: {
    category: string;
    minPrice: number;
    maxPrice: number;
  }) => {
    setPriceRange({ min: minPrice, max: maxPrice });
  };

  const handleSort = (method: string) => {
    setSortMethod(method);
  };

  const getCategoryTitle = () => {
    if (showAll) return "All Products";
    if (!category || category === "all") return "All Products";
    return category.charAt(0).toUpperCase() + category.slice(1) + " Products";
  };

  const getCategoryDescription = () => {
    if (showAll)
      return "Explore our complete collection of subscription services";

    const descriptions = {
      streaming:
        "Premium streaming services for movies, TV shows, and entertainment",
      music: "Music streaming and audio services for all your listening needs",
      productivity:
        "Tools and software to boost your productivity and efficiency",
      gaming:
        "Gaming subscriptions and services for the ultimate gaming experience",
      education:
        "Educational platforms and learning resources for skill development",
      entertainment:
        "Entertainment subscriptions for fun and leisure activities",
    };

    return (
      descriptions[category?.toLowerCase() as keyof typeof descriptions] ||
      "Discover amazing subscription services in this category"
    );
  };

  const getCategoryIcon = () => {
    const icons = {
      streaming: "📺",
      music: "🎵",
      productivity: "💼",
      gaming: "🎮",
      education: "📚",
      entertainment: "🎪",
    };

    return icons[category?.toLowerCase() as keyof typeof icons] || "📦";
  };

  const categories = [...new Set(products.map((p) => p.category))];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <motion.div
        className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 py-16 px-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto text-center">
          <motion.div
            className="text-6xl mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            {getCategoryIcon()}
          </motion.div>
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {getCategoryTitle()}
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {getCategoryDescription()}
          </motion.p>
        </div>
      </motion.div>

      {/* Navigation Breadcrumbs */}
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center space-x-2 text-sm">
          <button
            onClick={() => navigate("/")}
            className="text-gray-400 hover:text-white transition-colors"
          >
            Home
          </button>
          <span className="text-gray-500">/</span>
          <button
            onClick={() => navigate("/products")}
            className="text-gray-400 hover:text-white transition-colors"
          >
            Products
          </button>
          {category && category !== "all" && (
            <>
              <span className="text-gray-500">/</span>
              <span className="text-white capitalize">{category}</span>
            </>
          )}
        </nav>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Category Selection Pills */}
        <motion.div
          className="mb-8 flex flex-wrap justify-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <button
            onClick={() => navigate("/products")}
            className={`px-6 py-3 rounded-full font-medium transition-all ${
              !category || category === "all"
                ? "bg-white text-gray-900 shadow-lg"
                : "bg-gray-800 text-white hover:bg-gray-700"
            }`}
          >
            All Categories
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => navigate(`/products/${cat.toLowerCase()}`)}
              className={`px-6 py-3 rounded-full font-medium transition-all capitalize ${
                category === cat.toLowerCase()
                  ? "bg-white text-gray-900 shadow-lg"
                  : "bg-gray-800 text-white hover:bg-gray-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Filters and Results */}
        <div className="flex flex-col lg:flex-row justify-between items-center mb-8 gap-4">
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold">
              {filteredProducts.length} Products Found
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <Filters
              onFilter={handleFilter}
              onSort={handleSort}
              categories={categories}
              currentCategory={category}
              currency={currency}
            />
          </motion.div>
        </div>

        {/* Products Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500 mb-4">{error}</p>
              <button
                className="px-6 py-2 bg-white text-gray-900 rounded-lg font-medium hover:bg-gray-200 transition"
                onClick={() => window.location.reload()}
              >
                Try Again
              </button>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">😕</div>
              <h3 className="text-2xl font-bold mb-2">No Products Found</h3>
              <p className="text-gray-400 mb-6">
                We couldn't find any products matching your criteria.
              </p>
              <button
                onClick={() => navigate("/products")}
                className="px-6 py-3 bg-white text-gray-900 rounded-lg font-medium hover:bg-gray-200 transition"
              >
                View All Products
              </button>
            </div>
          ) : (
            <ProductGrid
              products={filteredProducts}
              onAddToCart={onAddToCart}
            />
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ProductPage;
