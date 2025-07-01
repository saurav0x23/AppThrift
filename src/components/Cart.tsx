// src/components/Cart.tsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { CartItem } from "../types";

interface CartProps {
  cart: CartItem[];
  total: number;
  onClose: () => void;
  onRemove: (id: number) => void;
  onUpdateQuantity: (id: number, quantity: number) => void;
}

const Cart: React.FC<CartProps> = ({
  cart,
  total,
  onClose,
  onRemove,
  onUpdateQuantity,
}) => {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex justify-end"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div
          className="absolute inset-0 bg-black bg-opacity-70"
          onClick={onClose}
        />

        <motion.div
          className="relative w-full max-w-md bg-gray-900 h-full overflow-y-auto"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 30 }}
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold">Your Cart</h2>
              <button
                className="text-gray-400 hover:text-white"
                onClick={onClose}
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="text-center py-12">
                <div className="bg-gray-800 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-gray-500"
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
                </div>
                <p className="text-gray-500">Your cart is empty</p>
                <button
                  className="mt-4 px-6 py-2 bg-white text-gray-900 rounded-lg font-medium hover:bg-gray-200 transition"
                  onClick={onClose}
                >
                  Browse Subscriptions
                </button>
              </div>
            ) : (
              <>
                <div className="space-y-4 mb-8">
                  {cart.map((item) => (
                    <motion.div
                      key={item.id}
                      className="flex items-center justify-between p-4 bg-gray-800 rounded-lg"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div>
                        <h3 className="font-bold">{item.name}</h3>
                        <p className="text-gray-400 text-sm">
                          ${item.price}/mo
                        </p>
                      </div>

                      <div className="flex items-center space-x-3">
                        <div className="flex items-center border border-gray-700 rounded-lg">
                          <button
                            className="px-3 py-1 text-gray-400 hover:text-white"
                            onClick={() =>
                              onUpdateQuantity(item.id, item.quantity - 1)
                            }
                          >
                            -
                          </button>
                          <span className="px-2">{item.quantity}</span>
                          <button
                            className="px-3 py-1 text-gray-400 hover:text-white"
                            onClick={() =>
                              onUpdateQuantity(item.id, item.quantity + 1)
                            }
                          >
                            +
                          </button>
                        </div>

                        <div className="font-bold">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>

                        <button
                          className="text-gray-500 hover:text-red-500"
                          onClick={() => onRemove(item.id)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="border-t border-gray-800 pt-6">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-gray-400">Subtotal</span>
                    <span className="text-xl font-bold">
                      ${total.toFixed(2)}
                    </span>
                  </div>

                  <button className="w-full py-3 bg-white text-gray-900 rounded-lg font-bold hover:bg-gray-200 transition">
                    Proceed to Checkout
                  </button>

                  <button
                    className="w-full mt-3 py-3 border border-gray-700 rounded-lg font-medium hover:bg-gray-800 transition"
                    onClick={onClose}
                  >
                    Continue Shopping
                  </button>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Cart;
