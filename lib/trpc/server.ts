import { initTRPC } from "@trpc/server"
import { z } from "zod"
import type { Product } from "@/lib/types"

// Update the mock product data with Pexels images
const products: Product[] = [
  {
    id: "1",
    name: "Armwrestling Knuckle Handle",
    description: "Professional-grade knuckle handle for improved grip strength and stability during arm wrestling matches.",
    price: 1899.99,
    image: "https://images.pexels.com/photos/3490348/pexels-photo-3490348.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Competition Equipment",
    brand: "BOERFORCE",
    rating: 4.9,
    inStock: true
  },
  {
    id: "2",
    name: "Wrist Pro Handle",
    description: "Advanced wrist handle with ergonomic design for maximum control and comfort during training sessions.",
    price: 2499.99,
    image: "https://images.pexels.com/photos/4793231/pexels-photo-4793231.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Grip & Wrist Training",
    brand: "BOERFORCE",
    rating: 4.7,
    inStock: true
  },
  {
    id: "3",
    name: "Ultra Grip Flat Handle",
    description: "High-friction flat handle designed to build grip endurance and finger strength for competitive arm wrestlers.",
    price: 1299.99,
    image: "https://images.pexels.com/photos/4498482/pexels-photo-4498482.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Grip & Wrist Training",
    brand: "BOERFORCE",
    rating: 4.8,
    inStock: true
  },
  {
    id: "4",
    name: "Realistic Hand Wrist Grip",
    description: "Anatomically correct grip trainer that simulates real opponent hand positioning for authentic training.",
    price: 3499.99,
    image: "https://images.pexels.com/photos/6456303/pexels-photo-6456303.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Grip & Wrist Training",
    brand: "BOERFORCE",
    rating: 4.6,
    inStock: true
  },
  {
    id: "5",
    name: "Elliptical Roll Handle - Slim",
    description: "Slim elliptical roll handle for precise finger positioning and rotational training for improved technique.",
    price: 1799.99,
    image: "https://images.pexels.com/photos/4162451/pexels-photo-4162451.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Grip & Wrist Training",
    brand: "BOERFORCE",
    rating: 4.9,
    inStock: true
  },
  {
    id: "6",
    name: "Eccentric Finger Handle - Slim",
    description: "Specialized slim handle with eccentric loading to target individual finger strength and coordination.",
    price: 1599.99,
    image: "https://images.pexels.com/photos/4397840/pexels-photo-4397840.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Grip & Wrist Training",
    brand: "BOERFORCE",
    rating: 4.5,
    inStock: true
  },
  {
    id: "7",
    name: "Conical Roll Handle - Slim",
    description: "Slim conical roll handle that progressively challenges grip as you move along its length for varied resistance training.",
    price: 1699.99,
    image: "https://images.pexels.com/photos/6456147/pexels-photo-6456147.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Grip & Wrist Training",
    brand: "BOERFORCE",
    rating: 5.0,
    inStock: true
  },
  {
    id: "8",
    name: "Offset Grip Handle - Slim",
    description: "Slim offset grip design that creates imbalanced resistance to strengthen stabilizer muscles in the forearm.",
    price: 1599.99,
    image: "https://images.pexels.com/photos/4162453/pexels-photo-4162453.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Grip & Wrist Training",
    brand: "BOERFORCE",
    rating: 4.7,
    inStock: true
  },
  {
    id: "9",
    name: "Eccentric Wrist Handle - Slim",
    description: "Slim wrist handle with eccentric loading mechanism to build wrist stability and explosive strength.",
    price: 2099.99,
    image: "https://images.pexels.com/photos/4398376/pexels-photo-4398376.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Grip & Wrist Training",
    brand: "BOERFORCE",
    rating: 4.8,
    inStock: true
  },
  {
    id: "10",
    name: "Eccentric Finger Handle - Wide",
    description: "Wide version of the eccentric finger handle for larger hands, providing progressive resistance for finger training.",
    price: 1699.99,
    image: "https://images.pexels.com/photos/4397833/pexels-photo-4397833.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Grip & Wrist Training",
    brand: "BOERFORCE",
    rating: 4.6,
    inStock: true
  },
  {
    id: "11",
    name: "Oval Knuckle Handle - Wide",
    description: "Wide oval knuckle handle designed for maximum comfort and stability during high-intensity training sessions.",
    price: 1899.99,
    image: "https://images.pexels.com/photos/4162487/pexels-photo-4162487.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Grip & Wrist Training",
    brand: "BOERFORCE",
    rating: 4.7,
    inStock: true
  },
  {
    id: "12",
    name: "Offset Grip - Wide",
    description: "Wide offset grip with asymmetrical loading to develop balanced forearm strength and control.",
    price: 1799.99,
    image: "https://images.pexels.com/photos/4398372/pexels-photo-4398372.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Grip & Wrist Training",
    brand: "BOERFORCE",
    rating: 4.9,
    inStock: true
  },
  {
    id: "13",
    name: "Conical Roll Handle - Wide",
    description: "Wide conical roll handle with tapered design to gradually increase resistance as you grip different sections.",
    price: 1899.99,
    image: "https://images.pexels.com/photos/4398357/pexels-photo-4398357.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Grip & Wrist Training",
    brand: "BOERFORCE",
    rating: 4.8,
    inStock: true
  },
  {
    id: "14",
    name: "Eccentric Wrist Handle - Wide",
    description: "Wide eccentric wrist handle that targets wrist extensors and flexors with adjustable resistance levels.",
    price: 2199.99,
    image: "https://images.pexels.com/photos/4398391/pexels-photo-4398391.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Grip & Wrist Training",
    brand: "BOERFORCE",
    rating: 4.7,
    inStock: true
  },
  {
    id: "15",
    name: "Elliptical Roll Handle - Wide",
    description: "Wide elliptical roll handle for enhanced grip development with a design that fits larger hand sizes comfortably.",
    price: 1999.99,
    image: "https://images.pexels.com/photos/4162493/pexels-photo-4162493.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Grip & Wrist Training",
    brand: "BOERFORCE",
    rating: 4.6,
    inStock: true
  },
  {
    id: "16",
    name: "Oval Knuckle Grip - Extra-Wide",
    description: "Extra-wide oval knuckle grip specially designed for those with larger hands or advanced training needs.",
    price: 2299.99,
    image: "https://images.pexels.com/photos/4162577/pexels-photo-4162577.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Grip & Wrist Training",
    brand: "BOERFORCE",
    rating: 4.9,
    inStock: true
  },
  {
    id: "17",
    name: "Offset Grip - Extra-Wide",
    description: "Extra-wide offset grip featuring maximum leverage training for advanced arm wrestlers with larger hands.",
    price: 2499.99,
    image: "https://images.pexels.com/photos/4162519/pexels-photo-4162519.jpeg?auto=compress&cs=tinysrgb&w=800",
    category: "Grip & Wrist Training",
    brand: "BOERFORCE",
    rating: 5.0,
    inStock: true
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

