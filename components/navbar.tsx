"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { motion, AnimatePresence } from "framer-motion"
import UserMenu from "@/components/user-menu"
import CartDrawer from "@/components/cart-drawer"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <AnimatePresence>
      <motion.header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled ? "bg-background/95 backdrop-blur-sm shadow-sm" : "bg-background"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
      >
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-6 md:gap-8 lg:gap-10">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <nav className="grid gap-6 text-lg font-medium">
                  <Link href="/" className="hover:text-accent transition-colors">
                    Home
                  </Link>
                  <Link href="/products" className="hover:text-accent transition-colors">
                    Equipment
                  </Link>
                  <Link href="/about" className="hover:text-accent transition-colors">
                    Training
                  </Link>
                  <Link href="/contact" className="hover:text-accent transition-colors">
                    Contact
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/" className="flex items-center space-x-2">
                <span className="text-xl font-bold tracking-tighter text-primary">ArmForce Pro</span>
              </Link>
            </motion.div>
            <nav className="hidden md:flex gap-6">
              <Link href="/" className="text-sm font-medium hover:text-accent transition-colors">
                Home
              </Link>
              <Link href="/products" className="text-sm font-medium hover:text-accent transition-colors">
                Equipment
              </Link>
              <Link href="/about" className="text-sm font-medium hover:text-accent transition-colors">
                Training
              </Link>
              <Link href="/contact" className="text-sm font-medium hover:text-accent transition-colors">
                Contact
              </Link>
            </nav>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search equipment..." className="w-[200px] lg:w-[300px] pl-8" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <UserMenu />
            <CartDrawer />
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button variant="ghost" size="icon" className="md:hidden text-primary">
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.header>
    </AnimatePresence>
  )
}

