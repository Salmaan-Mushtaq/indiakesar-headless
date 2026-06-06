"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface CartItem {
  id: string;
  name: string;
  slug: string;
  optionName: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: string, optionName: string) => void;
  updateQuantity: (id: string, optionName: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load cart from localStorage on mount & setup API URL proxy interceptor if configured
  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    if (apiUrl && typeof window !== "undefined") {
      const originalFetch = window.fetch;
      window.fetch = function (input, init) {
        if (typeof input === "string" && input.startsWith("/api/")) {
          // Prepend the target API host URL
          input = `${apiUrl.replace(/\/$/, "")}${input}`;
        }
        return originalFetch(input, init);
      };
    }

    const savedCart = localStorage.getItem("indiakesar_cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Error parsing cart", e);
      }
    }
  }, []);

  // Save cart to localStorage on changes
  useEffect(() => {
    localStorage.setItem("indiakesar_cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (newItem: Omit<CartItem, "quantity">) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.id === newItem.id && item.optionName === newItem.optionName
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        return updated;
      }
      return [...prev, { ...newItem, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string, optionName: string) => {
    setCart((prev) => prev.filter((item) => !(item.id === id && item.optionName === optionName)));
  };

  const updateQuantity = (id: string, optionName: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id, optionName);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.optionName === optionName ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
