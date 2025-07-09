// src/pages/ProductDetailPage.tsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Star,
  Shield,
  Clock,
  Users,
  CheckCircle,
  Heart,
  Share2,
  Zap,
} from "lucide-react";
import type { Product } from "../types";

interface ProductDetailPageProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  currency: string;
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  products,
  onAddToCart,
  currency,
}) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    const foundProduct = products.find((p) => p.id === Number(id));
    if (foundProduct) {
      setProduct(foundProduct);
    }
  }, [id, products]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading product details...</p>
        </div>
      </div>
    );
  }

  const handleAddToCart = async () => {
    setIsAdding(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    onAddToCart(product);
    setIsAdding(false);
  };

  const getOffers = (product: Product) => {
    const discountPercent = Math.floor(Math.random() * 30) + 10; // 10-40% discount
    const originalPrice = Math.floor(product.price * 1.5);
    const savings = originalPrice - product.price;

    return {
      discount: discountPercent,
      originalPrice,
      savings,
      offers: [
        `Save ${currency === "INR" ? "₹" : "$"}${savings} on this subscription`,
        "Free trial available for new users",
        "No setup fees or hidden charges",
        "Cancel anytime with full refund",
        "Special pricing for students available",
      ],
    };
  };

  const offers = getOffers(product);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white"
    >
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back Button */}
        <motion.button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-300 hover:text-white mb-8 transition-colors"
          whileHover={{ x: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          <ArrowLeft size={20} />
          <span>Back to Products</span>
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <motion.div
              className="relative aspect-video rounded-xl overflow-hidden bg-gray-800"
              layoutId={`product-image-${product.id}`}
            >
              <img
                src={product.image_urls}
                alt={product.name}
                className="w-full h-full object-cover"
              />

              {/* Sale Badge */}
              <motion.div
                className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold"
                initial={{ scale: 0, rotate: -12 }}
                animate={{ scale: 1, rotate: -12 }}
                transition={{ delay: 0.3 }}
              >
                {offers.discount}% OFF
              </motion.div>

              {/* Wishlist Button */}
              <motion.button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="absolute top-4 right-4 p-2 bg-gray-900/80 rounded-full hover:bg-gray-800 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Heart
                  size={20}
                  className={
                    isWishlisted ? "fill-red-500 text-red-500" : "text-gray-300"
                  }
                />
              </motion.button>
            </motion.div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Product Title and Category */}
            <div>
              <motion.span
                className="inline-block bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium mb-3 capitalize"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                {product.category}
              </motion.span>
              <motion.h1
                className="text-3xl lg:text-4xl font-bold mb-2 capitalize"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {product.name}
              </motion.h1>
              <motion.p
                className="text-gray-300 text-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {product.short_description}
              </motion.p>
            </div>

            {/* Rating */}
            <motion.div
              className="flex items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className={
                      i < 4
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-400"
                    }
                  />
                ))}
              </div>
              <span className="text-gray-300">4.5 (2,847 reviews)</span>
            </motion.div>

            {/* Price */}
            <motion.div
              className="space-y-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center gap-4">
                <span className="text-4xl font-bold text-green-400">
                  {currency === "INR" ? "₹" : "$"}
                  {product.price}
                </span>
                <span className="text-2xl text-gray-400 line-through">
                  {currency === "INR" ? "₹" : "$"}
                  {offers.originalPrice}
                </span>
              </div>
              <p className="text-gray-300">{product.validity}</p>
              <div className="flex items-center gap-2 text-green-400">
                <Zap size={16} />
                <span className="text-sm">
                  You save {currency === "INR" ? "₹" : "$"}
                  {offers.savings}!
                </span>
              </div>
            </motion.div>

            {/* Offers */}
            <motion.div
              className="bg-gradient-to-r from-green-900/20 to-blue-900/20 p-4 rounded-lg border border-green-500/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <h3 className="text-green-400 font-semibold mb-2 flex items-center gap-2">
                <CheckCircle size={16} />
                Special Offers
              </h3>
              <ul className="space-y-1 text-sm text-gray-300">
                {offers.offers.map((offer, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                    {offer}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              className="flex gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <motion.button
                onClick={handleAddToCart}
                disabled={isAdding}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-lg font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isAdding ? (
                  <>
                    <motion.div
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                    Adding...
                  </>
                ) : (
                  "Add to Cart"
                )}
              </motion.button>

              <motion.button
                className="p-4 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Share2 size={24} />
              </motion.button>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              className="flex items-center gap-6 pt-4 border-t border-gray-700"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <div className="flex items-center gap-2 text-gray-300">
                <Shield size={16} />
                <span className="text-sm">Secure Payment</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Clock size={16} />
                <span className="text-sm">Instant Activation</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Users size={16} />
                <span className="text-sm">24/7 Support</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Product Features */}
        <motion.div
          className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          {/* Features List */}
          <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
            <h3 className="text-2xl font-bold mb-4 text-white">Key Features</h3>
            <ul className="space-y-3">
              {product?.features?.split(",").map((feature, index) => (
                <motion.li
                  key={index}
                  className="flex items-start gap-3 text-gray-300"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 + index * 0.1 }}
                >
                  <CheckCircle
                    size={20}
                    className="text-green-400 mt-0.5 flex-shrink-0"
                  />
                  <span>{feature}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Highlights */}
          <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700">
            <h3 className="text-2xl font-bold mb-4 text-white">
              Why Choose This?
            </h3>
            <ul className="space-y-3">
              {product.highlights.split(",").map((highlight, index) => (
                <motion.li
                  key={index}
                  className="flex items-start gap-3 text-gray-300"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.4 + index * 0.1 }}
                >
                  <Zap
                    size={20}
                    className="text-yellow-400 mt-0.5 flex-shrink-0"
                  />
                  <span>{highlight}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProductDetailPage;
