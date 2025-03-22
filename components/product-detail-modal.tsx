"use client"

import { useState } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Star, ShoppingCart, ChevronLeft, ChevronRight, Minus, Plus } from "lucide-react"
import { useCart } from "@/components/cart-provider"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import type { Product } from "@/lib/types"

interface ProductDetailModalProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
}

// Mock reviews data
const reviews = [
  {
    id: 1,
    author: "John D.",
    rating: 5,
    date: "2 months ago",
    content: "Excellent quality and performance. This equipment has significantly improved my training results.",
  },
  {
    id: 2,
    author: "Sarah M.",
    rating: 4,
    date: "3 weeks ago",
    content:
      "Very good product, sturdy construction. The only reason for 4 stars is that it took some time to get used to.",
  },
  {
    id: 3,
    author: "Michael T.",
    rating: 5,
    date: "1 month ago",
    content: "Professional grade equipment that's worth every penny. I've seen major improvements in my performance.",
  },
]

export default function ProductDetailModal({ product, isOpen, onClose }: ProductDetailModalProps) {
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [size, setSize] = useState<"standard" | "wide" | "ultra-wide" | "regular">("standard")
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [activeTab, setActiveTab] = useState("description")

  if (!product) return null

  // Generate additional product images based on the main image
  const productImages = [
    product.image,
    "https://images.pexels.com/photos/4162487/pexels-photo-4162487.jpeg?auto=compress&cs=tinysrgb&w=800",
    "https://images.pexels.com/photos/4162577/pexels-photo-4162577.jpeg?auto=compress&cs=tinysrgb&w=800",
  ]

  const handleQuantityChange = (amount: number) => {
    const newQuantity = quantity + amount
    if (newQuantity >= 1) {
      setQuantity(newQuantity)
    }
  }

  const handleAddToCart = () => {
    addItem(product, quantity, size)
    onClose()
  }

  const handleBuyNow = () => {
    addItem(product, quantity, size)
    // Redirect to checkout or open cart drawer
    onClose()
    // In a real app, you might redirect to checkout here
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % productImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + productImages.length) % productImages.length)
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[900px] p-0 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Product Images */}
          <div className="relative bg-muted">
            <div className="relative h-[300px] md:h-[500px] w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={productImages[currentImageIndex] || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>

              <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background/90"
                onClick={prevImage}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background/90"
                onClick={nextImage}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>

            {/* Thumbnail Navigation */}
            <div className="flex justify-center space-x-2 p-4">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  className={`relative h-16 w-16 overflow-hidden rounded-md border-2 ${
                    currentImageIndex === index ? "border-accent" : "border-transparent"
                  }`}
                  onClick={() => setCurrentImageIndex(index)}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="p-6 flex flex-col h-full">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-primary">{product.name}</DialogTitle>
              <DialogDescription className="flex items-center mt-2">
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < (product.rating || 0) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-muted-foreground">
                    {product.rating} ({reviews.length} reviews)
                  </span>
                </div>
              </DialogDescription>
            </DialogHeader>

            <Tabs defaultValue="description" className="mt-6 flex-1 flex flex-col" onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="specifications">Specifications</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <div className="flex-1 overflow-auto">
                <TabsContent value="description" className="pt-4 h-full">
                  <p className="text-muted-foreground">{product.description}</p>
                  <p className="mt-4 text-muted-foreground">
                    This premium {product.category.toLowerCase()} is designed for serious arm wrestlers who demand the
                    best. Crafted with high-quality materials and precision engineering, it provides exceptional
                    performance and durability.
                  </p>
                  <ul className="mt-4 space-y-2">
                    <li className="flex items-center">
                      <span className="mr-2 text-accent">✓</span>
                      <span>Professional-grade quality</span>
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2 text-accent">✓</span>
                      <span>Ergonomic design for comfort</span>
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2 text-accent">✓</span>
                      <span>Durable construction</span>
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2 text-accent">✓</span>
                      <span>Competition approved</span>
                    </li>
                  </ul>
                </TabsContent>

                <TabsContent value="specifications" className="pt-4 h-full">
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-sm font-medium">Brand</div>
                      <div className="text-sm">{product.brand}</div>
                    </div>
                    <Separator />
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-sm font-medium">Category</div>
                      <div className="text-sm">{product.category}</div>
                    </div>
                    <Separator />
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-sm font-medium">Material</div>
                      <div className="text-sm">Premium steel and high-density foam</div>
                    </div>
                    <Separator />
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-sm font-medium">Weight</div>
                      <div className="text-sm">2.5 kg (Standard size)</div>
                    </div>
                    <Separator />
                    <div className="grid grid-cols-2 gap-2">
                      <div className="text-sm font-medium">Warranty</div>
                      <div className="text-sm">2 years</div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="reviews" className="pt-4 h-full">
                  <div className="space-y-6">
                    {reviews.map((review) => (
                      <div key={review.id} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="font-medium">{review.author}</div>
                            <div className="ml-2 text-xs text-muted-foreground">{review.date}</div>
                          </div>
                          <div className="flex">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${
                                  i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{review.content}</p>
                        <Separator className="mt-4" />
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </div>
            </Tabs>

            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-primary">R {product.price.toFixed(2)}</span>
                <div className="text-sm text-green-600 font-medium">
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Size</Label>
                <RadioGroup value={size} onValueChange={(value: any) => setSize(value)} className="flex space-x-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="standard" id="standard" />
                    <Label htmlFor="standard">Standard</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="wide" id="wide" />
                    <Label htmlFor="wide">Wide</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="ultra-wide" id="ultra-wide" />
                    <Label htmlFor="ultra-wide">Ultra-wide</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="regular" id="regular" />
                    <Label htmlFor="regular">Regular</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>Quantity</Label>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center">{quantity}</span>
                  <Button variant="outline" size="icon" onClick={() => handleQuantityChange(1)}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex space-x-2 pt-4">
                <Button className="flex-1 bg-accent hover:bg-accent/90" onClick={handleAddToCart}>
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
                <Button className="flex-1" onClick={handleBuyNow}>
                  Buy Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

