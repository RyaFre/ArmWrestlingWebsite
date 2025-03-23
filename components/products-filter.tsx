"use client"

import { useState } from "react"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { motion } from "framer-motion"

export default function ProductsFilter() {
  const [priceRange, setPriceRange] = useState([0, 10000])

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div>
        <h3 className="text-lg font-semibold mb-4 text-primary">Filters</h3>
        <Accordion type="multiple" defaultValue={["category", "price", "brand"]}>
          <AccordionItem value="category">
            <AccordionTrigger className="text-base font-medium">Category</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 pt-2">
                {categories.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox id={`category-${category}`} />
                    <Label htmlFor={`category-${category}`} className="font-normal">
                      {category}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="price">
            <AccordionTrigger className="text-base font-medium">Price Range</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4 pt-2">
                <Slider
                  defaultValue={[0, 10000]}
                  max={20000}
                  step={100}
                  value={priceRange}
                  onValueChange={setPriceRange}
                />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">R {priceRange[0]}</span>
                  <span className="text-sm text-muted-foreground">R {priceRange[1]}</span>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="brand">
            <AccordionTrigger className="text-base font-medium">Brand</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 pt-2">
                {brands.map((brand) => (
                  <div key={brand} className="flex items-center space-x-2">
                    <Checkbox id={`brand-${brand}`} />
                    <Label htmlFor={`brand-${brand}`} className="font-normal">
                      {brand}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="size">
            <AccordionTrigger className="text-base font-medium">Size</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2 pt-2">
                {sizes.map((size) => (
                  <div key={size} className="flex items-center space-x-2">
                    <Checkbox id={`size-${size}`} />
                    <Label htmlFor={`size-${size}`} className="font-normal">
                      {size}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </motion.div>
  )
}

const categories = [
  "All Categories",
  "Competition Equipment",
  "Grip & Wrist Training",
  "Resistance Training",
  "Measurement Tools",
  "Training Systems",
  "Accessories",
]

const brands = ["BOERFORCE", "GripForce", "PowerMetrics", "ElitePull", "HydroForce", "PullPro"]

const sizes = ["Universal", "Slim", "Wide", "Extra-Wide"]

