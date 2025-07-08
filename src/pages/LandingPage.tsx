// src/pages/LandingPage.tsx
import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Hero from "../components/Hero";
import CategorySelection from "../components/CategorySelection";
import ProductGrid from "../components/ProductGrid";
import type { Product } from "../types";

interface LandingPageProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  loading: boolean;
  error: string | null;
}

const LandingPage: React.FC<LandingPageProps> = ({
  products,
  onAddToCart,
  loading,
  error,
}) => {
  const navigate = useNavigate();
  const productGridRef = useRef<HTMLDivElement>(null);

  // Get featured products (first 6 products, or you can add a featured flag to your Product type)
  const featuredProducts = products.slice(0, 6);

  const handleGetStarted = () => {
    productGridRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleViewAllProducts = () => {
    navigate("/products?show=all");
  };

  const handleCategorySelect = (category: string) => {
    navigate(`/products/${category.toLowerCase()}`);
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <Hero
        onGetStarted={handleGetStarted}
        onViewAllProducts={handleViewAllProducts}
      />

      <CategorySelection
        products={products}
        onCategorySelect={handleCategorySelect}
      />

      <div ref={productGridRef} className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured Products
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            Discover our most popular subscription services
          </p>
          <button
            onClick={handleViewAllProducts}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
          >
            View All Products
          </button>
        </div>

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
        ) : (
          <ProductGrid products={featuredProducts} onAddToCart={onAddToCart} />
        )}
      </div>
    </main>
  );
};

export default LandingPage;
