import type React from "react"
import type { Metadata } from "next"
import { ThemeProvider } from "@/components/theme-provider"
import { TRPCProvider } from "@/components/trpc-provider"
import { AuthProvider } from "@/components/auth-provider"
import { CartProvider } from "@/components/cart-provider"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Chatbot } from "@/components/chatbot"
import "./globals.css"

// Update the metadata to reflect the arm wrestling equipment focus
export const metadata: Metadata = {
  title: "BOERFORCE - High-End Arm Wrestling Equipment",
  description: "Revolutionary training and competition equipment for professional arm wrestlers and serious athletes.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://fonts.cdnfonts.com/css/hk-grotesk" />
      </head>
      <body className="min-h-screen font-sans antialiased" suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <TRPCProvider>
            <AuthProvider>
              <CartProvider>
                <div className="relative flex min-h-screen flex-col">
                  <Navbar />
                  <div className="flex-1">{children}</div>
                  <Footer />
                  <Chatbot />
                </div>
              </CartProvider>
            </AuthProvider>
          </TRPCProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'