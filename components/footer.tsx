import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"

// Update the footer content to match the arm wrestling equipment focus
export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-bold">BOERFORCE</h3>
            <p className="text-sm text-primary-foreground/80">
              Revolutionary arm wrestling equipment for champions. Quality, innovation, and performance.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-primary-foreground/80 hover:text-primary-foreground">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-primary-foreground/80 hover:text-primary-foreground">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-primary-foreground/80 hover:text-primary-foreground">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Shop</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products" className="text-primary-foreground/80 hover:text-primary-foreground">
                  All Equipment
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=competition-equipment"
                  className="text-primary-foreground/80 hover:text-primary-foreground"
                >
                  Competition Equipment
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=grip-wrist-training"
                  className="text-primary-foreground/80 hover:text-primary-foreground"
                >
                  Grip & Wrist Training
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=training-systems"
                  className="text-primary-foreground/80 hover:text-primary-foreground"
                >
                  Training Systems
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-primary-foreground/80 hover:text-primary-foreground">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/training" className="text-primary-foreground/80 hover:text-primary-foreground">
                  Training Guides
                </Link>
              </li>
              <li>
                <Link href="/athletes" className="text-primary-foreground/80 hover:text-primary-foreground">
                  Pro Athletes
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-primary-foreground/80 hover:text-primary-foreground">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/faq" className="text-primary-foreground/80 hover:text-primary-foreground">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-primary-foreground/80 hover:text-primary-foreground">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link href="/warranty" className="text-primary-foreground/80 hover:text-primary-foreground">
                  Warranty
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-primary-foreground/80 hover:text-primary-foreground">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-primary-foreground/10 text-center text-sm text-primary-foreground/60">
          <p>© {new Date().getFullYear()} BOERFORCE. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

