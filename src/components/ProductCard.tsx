// src/components/ProductCard.tsx
import React from "react";
import { motion } from "framer-motion";
import type { Product } from "../types";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <motion.div
      className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-gray-500 transition-colors"
      whileHover={{ y: -5 }}
      layout
    >
      <div className="p-5">
        <div className="flex justify-between items-start mb-4">
          <div className="bg-gray-700 rounded-lg w-14 h-14 flex items-center justify-center">
            <div className="bg-gray-600 rounded-full w-8 h-8"></div>
          </div>
          <span className="bg-gray-700 text-xs px-3 py-1 rounded-full">
            {product.category}
          </span>
        </div>

        <h3 className="text-xl font-bold mb-2">{product.name}</h3>
        <p className="text-gray-400 text-sm mb-4">{product.description}</p>

        <div className="flex justify-between items-center">
          <div>
            <span className="text-2xl font-bold">${product.price}</span>
            <span className="text-gray-500 text-sm">/month</span>
          </div>
          <motion.button
            className="px-4 py-2 bg-white text-gray-900 rounded-lg text-sm font-medium hover:bg-gray-200 transition"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onAddToCart(product)}
          >
            Add to Cart
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
