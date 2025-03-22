"use client"

import { useState } from "react"
import Image from "next/image"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import type { Product } from "@/lib/types"
import { motion } from "framer-motion"
import ProductDetailModal from "@/components/product-detail-modal"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.03 }}
      >
        <Card
          className="overflow-hidden transition-all duration-300 h-full flex flex-col cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => setIsModalOpen(true)}
        >
          <div className="relative aspect-square overflow-hidden">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              className={`object-cover transition-transform duration-500 ${isHovered ? "scale-110" : "scale-100"}`}
            />
            <div
              className={`absolute inset-0 bg-primary/10 transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}
            />
            <div
              className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
            >
              <Button variant="secondary" className="bg-background/80 hover:bg-background">
                Quick View
              </Button>
            </div>
          </div>
          <CardContent className="flex-1 p-6">
            <div className="space-y-1">
              <h3 className="font-bold text-lg text-primary">{product.name}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-xl font-bold text-primary">R {product.price.toFixed(2)}</span>
              {product.rating && (
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-5 w-5 text-accent"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="ml-1 text-sm font-medium">{product.rating}</span>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="p-6 pt-0">
            <Button
              className="w-full bg-accent hover:bg-accent/90"
              onClick={(e) => {
                e.stopPropagation()
                setIsModalOpen(true)
              }}
            >
              <ShoppingCart className="mr-2 h-4 w-4" /> View Product
            </Button>
          </CardFooter>
        </Card>
      </motion.div>

      <ProductDetailModal product={product} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}

