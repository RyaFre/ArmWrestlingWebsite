"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Product } from "@/lib/types"

export type CartItem = {
  product: Product
  quantity: number
  size: "standard" | "wide" | "ultra-wide" | "regular"
}

type CartContextType = {
  items: CartItem[]
  itemCount: number
  totalPrice: number
  addItem: (product: Product, quantity: number, size: "standard" | "wide" | "ultra-wide" | "regular") => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  updateSize: (productId: string, size: "standard" | "wide" | "ultra-wide" | "regular") => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  // Load cart from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedCart = localStorage.getItem("boerforce_cart")
      if (storedCart) {
        try {
          setItems(JSON.parse(storedCart))
        } catch (error) {
          console.error("Failed to parse cart:", error)
          localStorage.removeItem("boerforce_cart")
        }
      }
    }
  }, [])

  // Save cart to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem("boerforce_cart", JSON.stringify(items))
    }
  }, [items])

  const itemCount = items.reduce((total, item) => total + item.quantity, 0)

  const totalPrice = items.reduce((total, item) => total + item.product.price * item.quantity, 0)

  const addItem = (product: Product, quantity: number, size: "standard" | "wide" | "ultra-wide" | "regular") => {
    setItems((prevItems) => {
      // Check if item already exists in cart
      const existingItemIndex = prevItems.findIndex((item) => item.product.id === product.id && item.size === size)

      if (existingItemIndex >= 0) {
        // Update quantity if item exists
        const updatedItems = [...prevItems]
        updatedItems[existingItemIndex].quantity += quantity
        return updatedItems
      } else {
        // Add new item if it doesn't exist
        return [...prevItems, { product, quantity, size }]
      }
    })
  }

  const removeItem = (productId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.product.id !== productId))
  }

  const updateQuantity = (productId: string, quantity: number) => {
    setItems((prevItems) => prevItems.map((item) => (item.product.id === productId ? { ...item, quantity } : item)))
  }

  const updateSize = (productId: string, size: "standard" | "wide" | "ultra-wide" | "regular") => {
    setItems((prevItems) => prevItems.map((item) => (item.product.id === productId ? { ...item, size } : item)))
  }

  const clearCart = () => {
    setItems([])
  }

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        totalPrice,
        addItem,
        removeItem,
        updateQuantity,
        updateSize,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

