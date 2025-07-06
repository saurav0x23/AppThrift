import { useState, useEffect } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import {
  MonitorPlay,
  Music,
  BrainCircuit,
  Sparkles,
  Cloud,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const featuredProducts = [
    {
      name: "Netflix",
      price: "$9.99/mo",
      category: "Streaming",
      gradient: "from-red-600 to-red-800",
      icon: "🎬",
      description: "Unlimited movies and TV shows",
    },
    {
      name: "Spotify Premium",
      price: "$5.99/mo",
      category: "Music",
      gradient: "from-green-500 to-green-700",
      icon: "🎵",
      description: "Ad-free music streaming",
    },
    {
      name: "ChatGPT Plus",
      price: "$20/mo",
      category: "AI Tools",
      gradient: "from-emerald-500 to-emerald-700",
      icon: "🤖",
      description: "Advanced AI assistance",
    },
    {
      name: "Adobe Creative Cloud",
      price: "$22.99/mo",
      category: "Productivity",
      gradient: "from-purple-600 to-purple-800",
      icon: "🎨",
      description: "Complete creative suite",
    },
    {
      name: "YouTube Premium",
      price: "$11.99/mo",
      category: "Streaming",
      gradient: "from-red-500 to-red-700",
      icon: "📺",
      description: "Ad-free YouTube experience",
    },
  ];

  const categories = [
    {
      name: "Streaming",
      icon: <MonitorPlay size={20} />,
      count: 5,
      color: "text-red-400",
    },
    {
      name: "Music",
      icon: <Music size={20} />,
      count: 2,
      color: "text-green-400",
    },
    {
      name: "AI Tools",
      icon: <BrainCircuit size={20} />,
      count: 6,
      color: "text-blue-400",
    },
    {
      name: "Productivity",
      icon: <Sparkles size={20} />,
      count: 8,
      color: "text-purple-400",
    },
    {
      name: "Cloud",
      icon: <Cloud size={20} />,
      count: 1,
      color: "text-cyan-400",
    },
  ];

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredProducts.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [featuredProducts.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredProducts.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + featuredProducts.length) % featuredProducts.length
    );
  };

  // Container animation variants
  const containerVariants : Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants : Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.25, 0.25, 0.75],
      },
    },
  };

  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      {/* Improved background elements with smoother animation */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.3, 0.2, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/3 left-1/3 w-60 h-60 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-10"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <motion.div
          className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-screen lg:min-h-0"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left content */}
          <div className="space-y-6 order-2 lg:order-1">
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-full border border-purple-500/30 w-fit"
            >
              <span className="text-xs sm:text-sm font-medium">
                ✨ 20+ Premium Products
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
            >
              All Your Premium
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 text-transparent bg-clip-text">
                Apps & Tools
              </span>
              <br />
              In One Place
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-gray-300 text-base sm:text-lg lg:text-xl max-w-2xl leading-relaxed"
            >
              Access Netflix, Spotify, ChatGPT Plus, Adobe Creative Cloud, and
              more. Save thousands with our all-in-one subscription bundle.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold text-sm sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Get Started - $29/month
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 sm:px-8 sm:py-4 border-2 border-gray-600 text-white rounded-xl font-semibold text-sm sm:text-lg hover:bg-gray-800 transition-all duration-300"
              >
                View All Products
              </motion.button>
            </motion.div>

            {/* Categories */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 pt-6 sm:pt-8 lg:pt-10"
            >
              {categories.map((cat) => (
                <motion.div
                  key={cat.name}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05 }}
                  className="flex flex-col items-center space-y-2 p-3 rounded-lg hover:bg-gray-800/50 transition-all duration-300 cursor-pointer"
                >
                  <div
                    className={`${cat.color} transition-colors duration-300`}
                  >
                    {cat.icon}
                  </div>
                  <div className="text-xs sm:text-sm font-medium text-center">
                    {cat.name}
                  </div>
                  <div className="text-xs text-gray-400">{cat.count} apps</div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right slider */}
          <div className="w-full order-1 lg:order-2">
            <div className="relative">
              {/* Slider container */}
              <div className="relative h-80 sm:h-96 lg:h-[450px] overflow-hidden rounded-2xl">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, x: 60 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -60 }}
                    transition={{
                      duration: 0.3,
                      ease: "easeInOut",
                    }}
                    className="absolute inset-0"
                  >
                    <div
                      className={`h-full w-full bg-gradient-to-br ${featuredProducts[currentSlide].gradient} p-6 flex flex-col justify-center items-center text-center rounded-2xl shadow-2xl`}
                    >
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                          delay: 0.2,
                          duration: 0.5,
                          ease: "easeOut",
                        }}
                        className="text-6xl sm:text-7xl lg:text-8xl mb-4 sm:mb-6"
                      >
                        {featuredProducts[currentSlide].icon}
                      </motion.div>

                      <motion.h3
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{
                          delay: 0.3,
                          duration: 0.5,
                          ease: "easeOut",
                        }}
                        className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-4"
                      >
                        {featuredProducts[currentSlide].name}
                      </motion.h3>

                      <motion.p
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{
                          delay: 0.4,
                          duration: 0.5,
                          ease: "easeOut",
                        }}
                        className="text-sm sm:text-base lg:text-lg text-white/90 mb-3 sm:mb-4"
                      >
                        {featuredProducts[currentSlide].description}
                      </motion.p>

                      <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{
                          delay: 0.5,
                          duration: 0.5,
                          ease: "easeOut",
                        }}
                        className="text-xl sm:text-2xl lg:text-3xl font-bold text-white/95"
                      >
                        {featuredProducts[currentSlide].price}
                      </motion.div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-black/20 backdrop-blur-sm rounded-full text-white hover:bg-black/40 transition-all duration-300 z-10"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-black/20 backdrop-blur-sm rounded-full text-white hover:bg-black/40 transition-all duration-300 z-10"
              >
                <ChevronRight size={20} />
              </button>

              {/* Slide indicators */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
                {featuredProducts.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? "bg-white scale-125"
                        : "bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom summary */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-12 sm:mt-16 lg:mt-20 text-center"
        >
          <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-2xl p-6 sm:p-8 backdrop-blur-sm border border-gray-700">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4">
              Save Over <span className="text-green-400">$500/month</span>
            </h2>
            <p className="text-gray-300 text-sm sm:text-base lg:text-lg mb-4 sm:mb-6 max-w-2xl mx-auto">
              Individual subscriptions would cost $600+/month. Get everything
              for just $29/month.
            </p>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-400">
              <span>✓ No commitments</span>
              <span>✓ Cancel anytime</span>
              <span>✓ 24/7 support</span>
              <span>✓ Instant access</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
