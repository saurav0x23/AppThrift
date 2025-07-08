// src/App.tsx
import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // ✅ Correct imports
import Navbar from "./components/Navbar";
import Cart from "./components/Cart";
import Footer from "./components/Footer";
import type { Product, CartItem } from "./types";
import { supabase } from "./SupabaseClient";
import LandingPage from "./pages/LandingPage";
import ProductPage from "./pages/ProductsPage";

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .order("price", { ascending: true });

        if (error) throw error;

        setProducts(data || []);
        setFilteredProducts(data || []);
      } catch (err) {
        setError("Failed to load products");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
  const [currency, setCurrency] = useState("INR");

  // Cart functions
  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return;
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  const applyFilters = (filters: {
    category: string;
    minPrice: number;
    maxPrice: number;
  }) => {
    const filtered = products.filter((product) => {
      const matchesCategory =
        filters.category === "all" || product.category === filters.category;
      const matchesPrice =
        product.price >= filters.minPrice && product.price <= filters.maxPrice;
      return matchesCategory && matchesPrice;
    });
    setFilteredProducts(filtered);
  };

  const sortProducts = (method: string) => {
    const sorted = [...filteredProducts].sort((a, b) => {
      if (method === "price-low") return a.price - b.price;
      if (method === "price-high") return b.price - a.price;
      if (method === "name") return a.name.localeCompare(b.name);
      return 0;
    });
    setFilteredProducts(sorted);
  };

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
        <Navbar
          cartCount={cartCount}
          onCartClick={() => setIsCartOpen(true)}
          currency={currency}
          setCurrency={setCurrency}
        />

        <Routes>
          <Route
            path="/"
            element={
              <LandingPage
                products={products}
                onAddToCart={addToCart}
                loading={loading}
                error={error}
              />
            }
          />
          <Route
            path="/products"
            element={
              <ProductPage
                products={products}
                onAddToCart={addToCart}
                loading={loading}
                error={error}
                currency={currency}
              />
            }
          ></Route>
          <Route
            path="/products/:category"
            element={
              <ProductPage
                products={products}
                onAddToCart={addToCart}
                loading={loading}
                error={error}
              />
            }
          ></Route>
        </Routes>

        <AnimatePresence>
          {isCartOpen && (
            <Cart
              cart={cart}
              total={cartTotal}
              onClose={() => setIsCartOpen(false)}
              onRemove={removeFromCart}
              onUpdateQuantity={updateQuantity}
              currency={currency}
            />
          )}
        </AnimatePresence>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
