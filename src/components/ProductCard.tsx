// src/components/ProductCard.tsx
import React, { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { useNavigate } from "react-router-dom";
import type { Product } from "../types";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  currency: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  currency,
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [imageError, setImageError] = useState(false);
  const navigate = useNavigate();

  const handleProductClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent navigation when clicking add to cart
    setIsAdding(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    onAddToCart(product);
    setIsAdding(false);
  };

  const cardVariants: Variants = {
    rest: {
      scale: 1,
      y: 0,
      boxShadow:
        "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    },
    hover: {
      scale: 1.02,
      y: -8,
      boxShadow:
        "0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
    tap: {
      scale: 0.98,
      y: -4,
    },
  };

  const buttonVariants: Variants = {
    rest: {
      scale: 1,
      backgroundColor: "#ffffff",
      color: "#111827",
    },
    hover: {
      scale: 1.05,
      backgroundColor: "#f3f4f6",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
      },
    },
    tap: {
      scale: 0.95,
    },
    loading: {
      scale: 1,
      backgroundColor: "#d1d5db",
      transition: {
        duration: 0.2,
      },
    },
  };

  const imageVariants: Variants = {
    rest: {
      scale: 1,
      filter: "brightness(0.9)",
    },
    hover: {
      scale: 1.1,
      filter: "brightness(1)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
      },
    },
  };

  const priceVariants: Variants = {
    rest: {
      scale: 1,
    },
    hover: {
      scale: 1.05,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
      },
    },
  };

  // Generate category color based on category name
  const getCategoryColor = (category: string) => {
    const colors = {
      streaming: "bg-purple-600",
      productivity: "bg-blue-600",
      entertainment: "bg-pink-600",
      education: "bg-green-600",
      gaming: "bg-red-600",
      music: "bg-orange-600",
      default: "bg-gray-600",
    };
    return (
      colors[category.toLowerCase() as keyof typeof colors] || colors.default
    );
  };

  // Get product image based on category or name
  const getProductImage = (product: Product) => {
    const category = product.category.toLowerCase();
    const name = product.name.toLowerCase();

    // Netflix-like streaming services
    if (name.includes("netflix")) {
      return "https://images.ctfassets.net/y2ske730sjqp/1aONibCke6niZhgPxuiilC/2c401b05a07288746ddf3bd3943fbc76/BrandAssets_Logos_01-Wordmark.jpg?w=940";
    }

    // Spotify/Music
    if (name.includes("spotify")) {
      return "https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/2024-spotify-brand-assets-media-kit.jpg";
    }

    // YouTube/Video
    if (name.includes("youtube")) {
      return "https://lh3.googleusercontent.com/3zkP2SYe7yYoKKe47bsNe44yTgb4Ukh__rBbwXwgkjNRe4PykGG409ozBxzxkrubV7zHKjfxq6y9ShogWtMBMPyB3jiNps91LoNH8A=s500";
    }

    // Gaming
    if (category === "gaming" || name.includes("game")) {
      return "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop";
    }

    // Productivity/Office
    if (category === "productivity" || name.includes("office")) {
      return "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop";
    }

    // Education
    if (category === "education" || name.includes("learn")) {
      return "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop";
    }

    // Entertainment
    if (category === "entertainment") {
      return "https://images.unsplash.com/photo-1489599162718-42af9a341dd2?w=400&h=300&fit=crop";
    }

    // Default tech/app image
    return "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop";
  };

  return (
    <motion.div
      className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-gray-500 transition-colors cursor-pointer group h-full flex flex-col"
      variants={cardVariants}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      layout
      onClick={handleProductClick}
    >
      {/* Product Image */}
      <div className="relative h-48 sm:h-52 lg:h-56 overflow-hidden">
        {!imageError ? (
          <motion.img
            src={product.image_urls || getProductImage(product)}
            alt={product.name}
            className="w-full h-full object-cover"
            variants={imageVariants}
            onError={() => setImageError(true)}
            loading="lazy"
          />
        ) : (
          <motion.div
            className="w-full h-full bg-gray-700 flex items-center justify-center"
            variants={imageVariants}
          >
            <motion.div
              className={`rounded-full w-16 h-16 ${getCategoryColor(
                product.category
              )} flex items-center justify-center`}
              whileHover={{ scale: 1.2 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <span className="text-white text-2xl font-bold">
                {product.name.charAt(0).toUpperCase()}
              </span>
            </motion.div>
          </motion.div>
        )}

        {/* Category Badge */}
        <motion.span
          className={`absolute top-3 right-3 ${getCategoryColor(
            product.category
          )} text-white text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full capitalize font-medium backdrop-blur-sm`}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          {product.category}
        </motion.span>

        {/* Sale Badge */}
        <motion.div
          className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold"
          initial={{ scale: 0, rotate: -12 }}
          animate={{ scale: 1, rotate: -12 }}
          transition={{ delay: 0.3 }}
        >
          SALE
        </motion.div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 lg:p-6 flex-1 flex flex-col">
        {/* Product Name */}
        <motion.h3
          className="text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4 capitalize text-white group-hover:text-blue-200 transition-colors line-clamp-2 flex-shrink-0"
          initial={{ opacity: 0.9 }}
          whileHover={{ opacity: 1 }}
        >
          {product.name}
        </motion.h3>

        {/* Spacer to push price and button to bottom */}
        <div className="flex-1" />

        {/* Price and Validity */}
        <div className="mb-4 text-center">
          <motion.div variants={priceVariants} className="mb-2">
            <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
              {currency === "INR" ? "₹" : "$"}
              {product.price}
            </span>
            <span className="text-sm text-gray-400 ml-2 line-through">
              {currency === "INR" ? "₹" : "$"}
              {Math.floor(product.price * 1.4)}
            </span>
          </motion.div>
          <motion.div variants={priceVariants}>
            <span className="text-sm sm:text-base text-gray-300">
              {product.validity}
            </span>
          </motion.div>
        </div>

        {/* Add to Cart Button */}
        <motion.button
          className="w-full px-4 py-3 sm:py-3.5 lg:py-4 bg-white text-gray-900 rounded-lg text-sm sm:text-base font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 min-h-[48px] flex-shrink-0"
          variants={buttonVariants}
          animate={isAdding ? "loading" : "rest"}
          whileHover={!isAdding ? "hover" : "loading"}
          whileTap={!isAdding ? "tap" : "loading"}
          onClick={handleAddToCart}
          disabled={isAdding}
        >
          {isAdding ? (
            <>
              <motion.div
                className="w-4 h-4 border-2 border-gray-600 border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <span>Adding...</span>
            </>
          ) : (
            <>
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </motion.svg>
              <span>Add to Cart</span>
            </>
          )}
        </motion.button>
      </div>

      {/* Subtle bottom border effect */}
      <motion.div
        className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      />
    </motion.div>
  );
};

export default ProductCard;
