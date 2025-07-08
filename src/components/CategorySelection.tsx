// src/components/CategorySelection.tsx
import React from "react";
import { motion, type Variants } from "framer-motion";
import type { Product } from "../types";

interface CategorySelectionProps {
  products: Product[];
  onCategorySelect: (category: string) => void;
}

const CategorySelection: React.FC<CategorySelectionProps> = ({
  products,
  onCategorySelect,
}) => {
  const categories = [...new Set(products.map((p) => p.category))];

  const getCategoryInfo = (category: string) => {
    const info = {
      streaming: {
        icon: "📺",
        title: "Streaming",
        description: "Movies, TV shows, and entertainment",
        color: "from-purple-600 to-pink-600",
      },
      music: {
        icon: "🎵",
        title: "Music",
        description: "Music streaming and audio services",
        color: "from-green-600 to-blue-600",
      },
      productivity: {
        icon: "💼",
        title: "Productivity",
        description: "Tools to boost your efficiency",
        color: "from-blue-600 to-indigo-600",
      },
      gaming: {
        icon: "🎮",
        title: "Gaming",
        description: "Gaming subscriptions and services",
        color: "from-red-600 to-orange-600",
      },
      education: {
        icon: "📚",
        title: "Education",
        description: "Learning platforms and resources",
        color: "from-yellow-600 to-red-600",
      },
      entertainment: {
        icon: "🎪",
        title: "Entertainment",
        description: "Fun and leisure activities",
        color: "from-pink-600 to-purple-600",
      },
    };

    return (
      info[category.toLowerCase() as keyof typeof info] || {
        icon: "📦",
        title: category,
        description: "Explore this category",
        color: "from-gray-600 to-gray-700",
      }
    );
  };

  const containerVariants : Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants : Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <section className="py-16 bg-gray-800">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Browse by Category
          </h2>
          <p className="text-gray-400 text-lg">
            Find the perfect subscription service for your needs
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {categories.map((category) => {
            const categoryInfo = getCategoryInfo(category);
            const productCount = products.filter(
              (p) => p.category.toLowerCase() === category.toLowerCase()
            ).length;

            return (
              <motion.div
                key={category}
                variants={itemVariants}
                className="group cursor-pointer"
                onClick={() => onCategorySelect(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div
                  className={`relative bg-gradient-to-br ${categoryInfo.color} rounded-2xl p-8 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300`}
                >
                  {/* Background decoration */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-8 translate-x-8" />
                  <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-4 -translate-x-4" />

                  <div className="relative z-10">
                    <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform">
                      {categoryInfo.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-2 text-white">
                      {categoryInfo.title}
                    </h3>
                    <p className="text-white/90 mb-4">
                      {categoryInfo.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-white/80 text-sm">
                        {productCount} products
                      </span>
                      <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                        <svg
                          className="w-4 h-4 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default CategorySelection;
