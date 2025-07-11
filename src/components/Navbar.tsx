// src/components/Navbar.tsx
import React, {  useEffect } from "react";
import { motion } from "framer-motion";
import logo from "../assets/logo.jpeg";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
  currency: string;
  setCurrency: React.Dispatch<React.SetStateAction<string>>;
}

const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onCartClick,
  currency,
  setCurrency,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("currency", currency);
  }, [currency]);

  return (
    <motion.nav
      className="sticky top-0 z-50 bg-gray-900 border-b border-gray-800 backdrop-blur-sm"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div className="bg-white text-black w-10 h-10 rounded-lg flex items-center justify-center font-bold text-xl">
            <img
              src={logo}
              alt="AppThrift Logo"
              className="w-10 h-10 object-cover rounded-lg"
            />
          </div>
          <h1 className="text-2xl font-bold">AppThrift</h1>
        </div>

        {/* Currency selector */}
        <div className="flex items-center gap-6">
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="bg-gray-800 text-white text-sm px-3 py-1 rounded border border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="INR">₹ INR</option>
            <option value="USD">$ USD</option>
          </select>

          {/* Cart */}
          <motion.button
            className="relative p-2 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onCartClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            {cartCount > 0 && (
              <motion.span
                className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              >
                {cartCount}
              </motion.span>
            )}
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
