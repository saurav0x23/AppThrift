// src/components/Hero.tsx
import React from "react";
import { motion } from "framer-motion";

const Hero: React.FC = () => {
  return (
    <div className="py-16 md:py-24">
      <div className="flex flex-col md:flex-row items-center">
        <motion.div
          className="md:w-1/2 mb-10 md:mb-0"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Premium Apps.
            <br />
            <span className="bg-gradient-to-r from-white to-gray-400 text-transparent bg-clip-text">
              One Subscription.
            </span>
          </h1>
          <p className="text-gray-400 text-lg mb-8 max-w-lg">
            Access the best digital services with AppThrift. Stream, create, and
            enjoy with our curated collection of premium subscriptions.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <motion.button
              className="px-8 py-3 bg-white text-gray-900 rounded-lg font-medium hover:bg-gray-200 transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.button>
            <motion.button
              className="px-8 py-3 border border-white text-white rounded-lg font-medium hover:bg-gray-800 transition"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Plans
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          className="md:w-1/2 grid grid-cols-2 gap-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="bg-gray-800 p-6 rounded-xl">
            <div className="bg-gray-700 h-8 w-8 rounded-full mb-4"></div>
            <h3 className="font-bold text-lg mb-2">Streaming</h3>
            <p className="text-gray-400 text-sm">
              Movies, shows, and live events
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl">
            <div className="bg-gray-700 h-8 w-8 rounded-full mb-4"></div>
            <h3 className="font-bold text-lg mb-2">Productivity</h3>
            <p className="text-gray-400 text-sm">
              Tools for work and creativity
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl">
            <div className="bg-gray-700 h-8 w-8 rounded-full mb-4"></div>
            <h3 className="font-bold text-lg mb-2">Music</h3>
            <p className="text-gray-400 text-sm">Millions of songs ad-free</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-xl">
            <div className="bg-gray-700 h-8 w-8 rounded-full mb-4"></div>
            <h3 className="font-bold text-lg mb-2">Learning</h3>
            <p className="text-gray-400 text-sm">
              Courses and skill development
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
