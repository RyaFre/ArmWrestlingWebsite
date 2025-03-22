"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ShoppingCart, Plus, Minus, Trash2, CreditCard } from "lucide-react"
import { useCart } from "@/components/cart-provider"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import CheckoutForm from "@/components/checkout-form"

export default function CartDrawer() {
  const { items, itemCount, totalPrice, updateQuantity, removeItem, updateSize } = useCart()
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return
    updateQuantity(productId, newQuantity)
  }

  const handleSizeChange = (productId: string, size: string) => {
    updateSize(productId, size as any)
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="text-primary relative">
          <ShoppingCart className="h-5 w-5" />
          {itemCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] text-white">
              {itemCount}
            </span>
          )}
          <span className="sr-only">Open cart</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader className="space-y-2 pr-6">
          <SheetTitle className="text-xl font-bold">Your Cart ({itemCount})</SheetTitle>
        </SheetHeader>

        <AnimatePresence initial={false}>
          {isCheckingOut ? (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex-1 overflow-auto py-6"
            >
              <CheckoutForm onCancel={() => setIsCheckingOut(false)} />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex-1 overflow-auto py-6"
            >
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center space-y-4">
                  <div className="rounded-full bg-muted p-6">
                    <ShoppingCart className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg font-medium">Your cart is empty</h3>
                    <p className="text-sm text-muted-foreground mt-1">Add items to your cart to see them here.</p>
                  </div>
                  <SheetClose asChild>
                    <Button asChild className="mt-4 bg-accent hover:bg-accent/90">
                      <Link href="/products">Browse Products</Link>
                    </Button>
                  </SheetClose>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={`${item.product.id}-${item.size}`} className="flex space-x-4">
                      <div className="relative h-24 w-24 overflow-hidden rounded-md">
                        <Image
                          src={item.product.image || "/placeholder.svg"}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-1 flex-col">
                        <div className="flex justify-between">
                          <div>
                            <h4 className="font-medium">{item.product.name}</h4>
                            <p className="text-sm text-muted-foreground">R {item.product.price.toFixed(2)}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground"
                            onClick={() => removeItem(item.product.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Remove</span>
                          </Button>
                        </div>
                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() => handleQuantityChange(item.product.id, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                              <span className="sr-only">Decrease quantity</span>
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() => handleQuantityChange(item.product.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                              <span className="sr-only">Increase quantity</span>
                            </Button>
                          </div>
                          <Select value={item.size} onValueChange={(value) => handleSizeChange(item.product.id, value)}>
                            <SelectTrigger className="h-8 w-[110px]">
                              <SelectValue placeholder="Size" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="standard">Standard</SelectItem>
                              <SelectItem value="wide">Wide</SelectItem>
                              <SelectItem value="ultra-wide">Ultra-wide</SelectItem>
                              <SelectItem value="regular">Regular</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {items.length > 0 && !isCheckingOut && (
          <>
            <Separator />
            <div className="space-y-4 py-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Subtotal</span>
                <span>R {totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between font-medium">
                <span>Total</span>
                <span>R {totalPrice.toFixed(2)}</span>
              </div>
              <Button className="w-full bg-accent hover:bg-accent/90" onClick={() => setIsCheckingOut(true)}>
                <CreditCard className="mr-2 h-4 w-4" />
                Checkout
              </Button>
            </div>
          </>
        )}

        {isCheckingOut && (
          <SheetFooter className="pt-2">
            <Button variant="outline" onClick={() => setIsCheckingOut(false)}>
              Back to Cart
            </Button>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  )
}

