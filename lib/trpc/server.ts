import { initTRPC } from "@trpc/server"
import { z } from "zod"
import type { Product } from "@/lib/types"

// Update the mock product data with Pexels images
const products: Product[] = [
  {
    id: "1",
    name: "Pro Competition Arm Wrestling Table",
    description:
      "Competition-grade arm wrestling table with adjustable height and premium padding for professional tournaments.",
    price: 14999.99,
    image: "https://images.pexels.com/photos/3490348/pexels-photo-3490348.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Competition Equipment",
    brand: "ArmMaster",
    rating: 4.9,
    inStock: true,
  },
  {
    id: "2",
    name: "Adjustable Wrist Strengthener",
    description: "Advanced wrist strengthening device with variable resistance for targeted forearm training.",
    price: 2499.99,
    image: "https://images.pexels.com/photos/4793231/pexels-photo-4793231.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Grip & Wrist Training",
    brand: "GripForce",
    rating: 4.7,
    inStock: true,
  },
  {
    id: "3",
    name: "Digital Grip Dynamometer",
    description: "Precision digital grip strength measurement tool with data tracking and analysis.",
    price: 3499.99,
    image: "https://images.pexels.com/photos/4498482/pexels-photo-4498482.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Measurement Tools",
    brand: "PowerMetrics",
    rating: 4.8,
    inStock: true,
  },
  {
    id: "4",
    name: "Premium Arm Wrestling Strap",
    description:
      "Tournament-grade arm wrestling strap with reinforced stitching and ergonomic design for maximum comfort and durability.",
    price: 1299.99,
    image: "https://images.pexels.com/photos/6456303/pexels-photo-6456303.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Accessories",
    brand: "ElitePull",
    rating: 4.6,
    inStock: true,
  },
  {
    id: "5",
    name: "Hydraulic Forearm Trainer",
    description: "Revolutionary hydraulic resistance system for comprehensive forearm and bicep development.",
    price: 5999.99,
    image: "https://images.pexels.com/photos/4162451/pexels-photo-4162451.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Resistance Training",
    brand: "HydroForce",
    rating: 4.9,
    inStock: true,
  },
  {
    id: "6",
    name: "Arm Wrestling Training System",
    description:
      "Complete training system with multiple attachments for simulating various arm wrestling techniques and positions.",
    price: 8499.99,
    image: "https://images.pexels.com/photos/6456147/pexels-photo-6456147.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Training Systems",
    brand: "ArmMaster",
    rating: 5.0,
    inStock: true,
  },
]

const t = initTRPC.create()

export const appRouter = t.router({
  products: t.router({
    getAll: t.procedure.query(() => {
      return products
    }),
    getById: t.procedure.input(z.string()).query(({ input }) => {
      return products.find((product) => product.id === input)
    }),
    getByCategory: t.procedure.input(z.string()).query(({ input }) => {
      return products.filter((product) => product.category === input)
    }),
  }),
})

export type AppRouter = typeof appRouter

