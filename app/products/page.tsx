"use client"

import { trpc } from "@/lib/trpc/client"
import ProductCard from "@/components/product-card"
import ProductsFilter from "@/components/products-filter"
import { Suspense } from "react"
import ProductsLoading from "@/components/products-loading"
import { motion } from "framer-motion"
import { Input } from "@/components/ui/input"
import React, { useState } from 'react'

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (query: string) => {
    // Implement search logic here
    console.log('Searching for:', query)
    setSearchQuery(query)
  }

  return (
    <main className="flex flex-col min-h-screen">
      <section className="bg-primary-foreground py-12">
        <div className="container px-4 md:px-6">
          <motion.div
            className="flex flex-col items-start gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary">
              Professional Arm Wrestling Equipment
            </h1>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              Browse our collection of high-end training and competition equipment designed for serious athletes.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <div className="relative mb-8">
            <div className="relative">
              <Input 
                type="search" 
                placeholder="Search equipment..." 
                className="w-full md:w-[300px] pr-10" 
                onKeyDown={(e) => e.key === 'Enter' && handleSearch(e.currentTarget.value)} 
              />
              <div 
                className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer" 
                onClick={() => {
                  const inputElement = document.querySelector('input[type=search]');
                  if (inputElement) {
                    handleSearch((inputElement as HTMLInputElement).value);
                  }
                }}
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 12.65z"></path>
                </svg>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8">
            <ProductsFilter />
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Suspense fallback={<ProductsLoading />}>
                <ProductsList />
              </Suspense>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  )
}

function ProductsList() {
  const { data: products } = trpc.products.getAll.useQuery()

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-medium text-muted-foreground">No products found</h2>
        <p className="mt-2">Try adjusting your filters or check back later for new items.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

