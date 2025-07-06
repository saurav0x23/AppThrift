// src/components/Cart.tsx
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, easeInOut, delay } from "framer-motion";
import logo from "../assets/logo.jpeg";
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
  const [paymentStep, setPaymentStep] = useState<
    "select" | "processing" | "success" | "error"
  >("select");
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    if (paymentStep === "success") {
      resetPaymentState();
    }
  }, [paymentStep]);

  // Prevent body scroll when cart is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const initiateRazorpayPayment = async () => {
    const amountInPaise = total * 100;

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: amountInPaise,
      currency: "INR",
      name: "AppThrift Store",
      description: "Payment for your cart",
      image: logo,
      handler: function () {
        onClose();
      },
      notes: {
        app_name: "AppThrift",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new (window as any).Razorpay(options);

    rzp.on("payment.failed", function (response: any) {
      console.error("Payment Failed:", response.error.description);
    });

    rzp.open();
  };

  const resetPaymentState = () => {
    setPaymentStep("select");
    setErrorMessage("");
  };

  // Animation variants for smoother transitions
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.3, ease: "easeIn" },
    },
  };

  const cartVariants = {
    hidden: {
      x: "100%",
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.5,
        delay: 0.2,
      },
    },
    exit: {
      x: "100%",
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeIn",
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      x: 20,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
        delay: 0.2,
      },
    },
    exit: {
      opacity: 0,
      x: 20,
      scale: 0.95,
      transition: {
        duration: 0.2,
        ease: "easeIn",
      },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.02,
      transition: { duration: 0.2 },
    },
    tap: {
      scale: 0.98,
      transition: { duration: 0.1 },
    },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="fixed inset-0 z-50 flex justify-end"
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <motion.div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        <motion.div
          className="relative w-full max-w-md  bg-gray-900 h-full overflow-y-auto overflow-x-hidden shadow-2xl"
          variants={cartVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="p-4 sm:p-6 lg:p-8 h-full flex flex-col">
            {/* Header */}
            <motion.div
              className="flex justify-between items-center mb-6 sm:mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold">
                Your Cart
              </h2>
              <motion.button
                className="text-gray-400 hover:text-white p-2 rounded-full hover:bg-gray-800 transition-colors"
                onClick={onClose}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 sm:h-6 sm:w-6"
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
              </motion.button>
            </motion.div>

            {/* Content */}
            <div className="flex-1 flex flex-col">
              {cart.length === 0 ? (
                <motion.div
                  className="text-center py-12 flex-1 flex flex-col justify-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                >
                  <div className="bg-gray-800 rounded-full w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mx-auto mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 sm:h-10 sm:w-10 text-gray-500"
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
                  <p className="text-gray-500 text-sm sm:text-base mb-4">
                    Your cart is empty
                  </p>
                  <motion.button
                    className="px-6 py-3 bg-white text-gray-900 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                    onClick={onClose}
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    Browse Subscriptions
                  </motion.button>
                </motion.div>
              ) : (
                <>
                  {/* Cart Items */}
                  <motion.div
                    className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 flex-1 overflow-y-auto"
                    initial="hidden"
                    animate="visible"
                    variants={{
                      visible: {
                        transition: {
                          staggerChildren: 0.05,
                          delayChildren: 0.1,
                        },
                      },
                    }}
                  >
                    <AnimatePresence>
                      {cart.map((item) => (
                        <motion.div
                          key={item.id}
                          className="flex items-center justify-between p-3 sm:p-4 bg-gray-800 rounded-lg hover:bg-gray-750 transition-colors"
                          variants={itemVariants}
                          layout
                        >
                          <div className="flex-1 min-w-0">
                            <h3 className="font-bold text-sm sm:text-base truncate">
                              {item.name}
                            </h3>
                            <p className="text-gray-400 text-xs sm:text-sm">
                              ₹{item.price}/mo
                            </p>
                          </div>

                          <div className="flex items-center space-x-2 sm:space-x-3 ml-4">
                            <div className="flex items-center border border-gray-700 rounded-lg">
                              <motion.button
                                className="px-2 sm:px-3 py-1 text-gray-400 hover:text-white transition-colors"
                                onClick={() =>
                                  onUpdateQuantity(item.id, item.quantity - 1)
                                }
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                -
                              </motion.button>
                              <span className="px-2 text-sm sm:text-base">
                                {item.quantity}
                              </span>
                              <motion.button
                                className="px-2 sm:px-3 py-1 text-gray-400 hover:text-white transition-colors"
                                onClick={() =>
                                  onUpdateQuantity(item.id, item.quantity + 1)
                                }
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                +
                              </motion.button>
                            </div>

                            <div className="font-bold text-sm sm:text-base min-w-0">
                              ₹{(item.price * item.quantity).toFixed(2)}
                            </div>

                            <motion.button
                              className="text-gray-500 hover:text-red-500 p-1 rounded transition-colors"
                              onClick={() => onRemove(item.id)}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 sm:h-5 sm:w-5"
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
                            </motion.button>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </motion.div>

                  {/* Footer */}
                  <motion.div
                    className="border-t border-gray-800 pt-4 sm:pt-6 mt-auto"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.4 }}
                  >
                    <div className="flex justify-between items-center mb-4 sm:mb-6">
                      <span className="text-gray-400 text-sm sm:text-base">
                        Subtotal
                      </span>
                      <span className="text-lg sm:text-xl font-bold">
                        ₹{total.toFixed(2)}
                      </span>
                    </div>

                    <AnimatePresence mode="wait">
                      {paymentStep === "processing" && (
                        <motion.div
                          className="text-center py-8"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
                          <p className="mt-4 text-sm sm:text-base">
                            Processing payment...
                          </p>
                        </motion.div>
                      )}

                      {paymentStep === "success" && (
                        <motion.div
                          className="text-center py-8"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="bg-green-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-8 w-8 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </div>
                          <p className="text-green-400 font-bold text-sm sm:text-base">
                            Payment Successful!
                          </p>
                          <p className="text-gray-400 text-xs sm:text-sm mt-2">
                            Your subscription has been activated.
                          </p>
                        </motion.div>
                      )}

                      {paymentStep === "error" && (
                        <motion.div
                          className="text-center py-8"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="bg-red-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-8 w-8 text-white"
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
                          </div>
                          <p className="text-red-400 font-bold text-sm sm:text-base">
                            Payment Failed
                          </p>
                          <p className="text-gray-400 text-xs sm:text-sm mt-2">
                            {errorMessage}
                          </p>
                          <motion.button
                            className="mt-4 px-6 py-2 bg-white text-gray-900 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                            onClick={resetPaymentState}
                            variants={buttonVariants}
                            whileHover="hover"
                            whileTap="tap"
                          >
                            Try Again
                          </motion.button>
                        </motion.div>
                      )}

                      {paymentStep === "select" && (
                        <motion.div
                          className="space-y-3"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 20 }}
                          transition={{ duration: 0.3 }}
                        >
                          <motion.button
                            className="w-full py-3 bg-white text-gray-900 rounded-lg font-bold hover:bg-gray-200 transition-colors text-sm sm:text-base"
                            onClick={initiateRazorpayPayment}
                            variants={buttonVariants}
                            whileHover="hover"
                            whileTap="tap"
                          >
                            Proceed to Checkout
                          </motion.button>

                          <motion.button
                            className="w-full py-3 border border-gray-700 rounded-lg font-medium hover:bg-gray-800 transition-colors text-sm sm:text-base"
                            onClick={onClose}
                            variants={buttonVariants}
                            whileHover="hover"
                            whileTap="tap"
                          >
                            Continue Shopping
                          </motion.button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Cart;
