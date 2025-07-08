// src/components/Cart.tsx
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import logo from "../assets/logo.jpeg";
import type { CartItem } from "../types";

interface CartProps {
  cart: CartItem[];
  total: number;
  onClose: () => void;
  onRemove: (id: number) => void;
  onUpdateQuantity: (id: number, quantity: number) => void;
  currency: string;
}

interface UserInfo {
  fullName: string;
  email: string;
  phoneNumber: string;
}

const Cart: React.FC<CartProps> = ({
  cart,
  total,
  onClose,
  onRemove,
  onUpdateQuantity,
  currency,
}) => {
  const [paymentStep, setPaymentStep] = useState<
    "select" | "userInfo" | "processing" | "success" | "error"
  >("select");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    fullName: "",
    email: "",
    phoneNumber: "",
  });
  const [validationErrors, setValidationErrors] = useState<Partial<UserInfo>>(
    {}
  );

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

  const validateUserInfo = (): boolean => {
    const errors: Partial<UserInfo> = {};

    if (!userInfo.fullName.trim()) {
      errors.fullName = "Full name is required";
    }

    if (!userInfo.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(userInfo.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!userInfo.phoneNumber.trim()) {
      errors.phoneNumber = "Phone number is required";
    } else if (!/^\+?[\d\s-()]{10,}$/.test(userInfo.phoneNumber)) {
      errors.phoneNumber = "Please enter a valid phone number";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const saveToGoogleSheets = async (orderData: any) => {
    try {
      // Replace with your Google Apps Script Web App URL
      const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;

      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error("Failed to save order data");
      }

      console.log("Order data saved successfully");
    } catch (error) {
      console.error("Error saving to Google Sheets:", error);
      // You might want to show an error message to the user here
    }
  };

  const initiateRazorpayPayment = async () => {
    const amountInPaise = total * 100;

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: amountInPaise,
      currency: currency,
      name: "AppThrift Store",
      description: "Payment for your cart",
      image: logo,
      prefill: {
        name: userInfo.fullName,
        email: userInfo.email,
        contact: userInfo.phoneNumber,
      },
      handler: async function (response: any) {
        setPaymentStep("processing");

        // Prepare order data for Google Sheets
        const orderData = {
          orderId: response.razorpay_payment_id,
          customerName: userInfo.fullName,
          customerEmail: userInfo.email,
          customerPhone: userInfo.phoneNumber,
          items: cart.map((item) => ({
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            total: item.price * item.quantity,
          })),
          totalAmount: total,
          currency: currency,
          paymentId: response.razorpay_payment_id,
          timestamp: new Date().toISOString(),
        };

        try {
          // Save to Google Sheets
          await saveToGoogleSheets(orderData);

          setPaymentStep("success");
          setShowSuccessModal(true);

          // Clear cart after successful payment
          cart.forEach((item) => onRemove(item.id));

          // Close cart after a delay
          setTimeout(() => {
            onClose();
          }, 8000);
        } catch (error: any) {
          setPaymentStep("error");
          setErrorMessage(
            error.message || "Payment successful but failed to save order details. Please contact support."
          );
        }
      },
      notes: {
        app_name: "AppThrift",
        customer_name: userInfo.fullName,
        customer_email: userInfo.email,
        customer_phone: userInfo.phoneNumber,
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new (window as any).Razorpay(options);

    rzp.on("payment.failed", function (response: any) {
      console.error("Payment Failed:", response.error.description);
      setPaymentStep("error");
      setErrorMessage(
        response.error.description || "Payment failed. Please try again."
      );
    });

    rzp.open();
  };

  const handleUserInfoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateUserInfo()) {
      setPaymentStep("processing");
      initiateRazorpayPayment();
    }
  };

  const resetPaymentState = () => {
    setPaymentStep("select");
    setErrorMessage("");
    setValidationErrors({});
  };

  const handleInputChange = (field: keyof UserInfo, value: string) => {
    setUserInfo((prev) => ({ ...prev, [field]: value }));
    if (validationErrors[field]) {
      setValidationErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  // Animation variants for smoother transitions
  const backdropVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  const cartVariants: Variants = {
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

  const itemVariants: Variants = {
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

  const buttonVariants: Variants = {
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
          className="relative w-full max-w-md bg-gray-900 h-full overflow-y-auto overflow-x-hidden shadow-2xl"
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
                {paymentStep === "userInfo" ? "Your Information" : "Your Cart"}
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
                  {/* Cart Items - Show only when not in userInfo step */}
                  {paymentStep !== "userInfo" && (
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
                              <h3 className="font-bold text-sm sm:text-base truncate capitalize">
                                {item.name}
                              </h3>
                              <p className="text-gray-400 text-xs sm:text-sm">
                                {currency === "USD" ? "$" : "₹"}
                                {item.price}
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
                                {currency === "USD" ? "$" : "₹"}
                                {(item.price * item.quantity).toFixed(2)}
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
                  )}

                  {/* User Info Form */}
                  {paymentStep === "userInfo" && (
                    <motion.form
                      onSubmit={handleUserInfoSubmit}
                      className="space-y-4 flex-1"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-300">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          value={userInfo.fullName}
                          onChange={(e) =>
                            handleInputChange("fullName", e.target.value)
                          }
                          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-blue-500 focus:outline-none text-white"
                          placeholder="Enter your full name"
                        />
                        {validationErrors.fullName && (
                          <p className="text-red-400 text-sm mt-1">
                            {validationErrors.fullName}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-300">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          value={userInfo.email}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-blue-500 focus:outline-none text-white"
                          placeholder="Enter your email"
                        />
                        {validationErrors.email && (
                          <p className="text-red-400 text-sm mt-1">
                            {validationErrors.email}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2 text-gray-300">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          value={userInfo.phoneNumber}
                          onChange={(e) =>
                            handleInputChange("phoneNumber", e.target.value)
                          }
                          className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:border-blue-500 focus:outline-none text-white"
                          placeholder="Enter your phone number"
                        />
                        {validationErrors.phoneNumber && (
                          <p className="text-red-400 text-sm mt-1">
                            {validationErrors.phoneNumber}
                          </p>
                        )}
                      </div>

                      <div className="border-t border-gray-800 pt-4 mt-auto">
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-gray-400 text-sm sm:text-base">
                            Total
                          </span>
                          <span className="text-lg sm:text-xl font-bold">
                            {currency === "USD" ? "$" : "₹"}
                            {total.toFixed(2)}
                          </span>
                        </div>

                        <div className="space-y-3">
                          <motion.button
                            type="submit"
                            className="w-full py-3 bg-white text-gray-900 rounded-lg font-bold hover:bg-gray-200 transition-colors text-sm sm:text-base"
                            variants={buttonVariants}
                            whileHover="hover"
                            whileTap="tap"
                          >
                            Continue to Payment
                          </motion.button>

                          <motion.button
                            type="button"
                            className="w-full py-3 border border-gray-700 rounded-lg font-medium hover:bg-gray-800 transition-colors text-sm sm:text-base"
                            onClick={() => setPaymentStep("select")}
                            variants={buttonVariants}
                            whileHover="hover"
                            whileTap="tap"
                          >
                            Back to Cart
                          </motion.button>
                        </div>
                      </div>
                    </motion.form>
                  )}

                  {/* Footer - Show only when not in userInfo step */}
                  {paymentStep !== "userInfo" && (
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
                          {currency === "USD" ? "$" : "₹"}
                          {total.toFixed(2)}
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
                              onClick={() => setPaymentStep("userInfo")}
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
                  )}
                </>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>

      {showSuccessModal && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
            <div className="bg-gray-800 rounded-xl shadow-xl p-6 max-w-md w-full text-center">
              <h2 className="text-2xl font-bold text-green-600 mb-4">
                🎉 Thank You!
              </h2>
              <p className="text-gray-200 mb-2">Your payment was successful.</p>
              <p className="text-white">
                Check your WhatsApp for access details
              </p>
              <button
                onClick={() => setShowSuccessModal(false)}
                className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition"
              >
                Close
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Cart;
