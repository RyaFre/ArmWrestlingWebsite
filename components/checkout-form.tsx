"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { useAuth } from "@/components/auth-provider"
import { useCart } from "@/components/cart-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreditCard, CheckCircle2, Loader2, ShieldCheck, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import AuthModal from "@/components/auth-modal"

interface CheckoutFormProps {
  onCancel: () => void
}

export default function CheckoutForm({ onCancel }: CheckoutFormProps) {
  const { isAuthenticated } = useAuth()
  const { totalPrice, clearCart } = useCart()
  const [step, setStep] = useState<"shipping" | "payment" | "confirmation">("shipping")
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState("")
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(!isAuthenticated)

  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "South Africa",
  })

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvc: "",
  })

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!isAuthenticated) {
      setIsAuthModalOpen(true)
      return
    }

    setStep("payment")
  }

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsProcessing(true)

    // Simulate payment processing
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Basic validation
      if (paymentInfo.cardNumber.replace(/\s/g, "").length !== 16) {
        throw new Error("Invalid card number")
      }

      if (paymentInfo.cvc.length !== 3) {
        throw new Error("Invalid CVC")
      }

      setStep("confirmation")
      clearCart()
    } catch (err: any) {
      setError(err.message || "Payment processing failed")
    } finally {
      setIsProcessing(false)
    }
  }

  const handleShippingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setShippingInfo((prev) => ({ ...prev, [name]: value }))
  }

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    if (name === "cardNumber") {
      // Format card number with spaces
      const formatted = value
        .replace(/\s/g, "")
        .replace(/(\d{4})/g, "$1 ")
        .trim()
      setPaymentInfo((prev) => ({ ...prev, [name]: formatted }))
    } else if (name === "expiry") {
      // Format expiry as MM/YY
      const formatted = value.replace(/\D/g, "").replace(/(\d{2})(\d)/, "$1/$2")
      setPaymentInfo((prev) => ({ ...prev, [name]: formatted }))
    } else {
      setPaymentInfo((prev) => ({ ...prev, [name]: value }))
    }
  }

  // If user is not authenticated, show auth modal
  if (!isAuthenticated) {
    return (
      <>
        <div className="flex flex-col items-center justify-center text-center space-y-4 py-8">
          <AlertCircle className="h-10 w-10 text-accent" />
          <h3 className="text-xl font-bold">Authentication Required</h3>
          <p className="text-muted-foreground">You need to be logged in to complete your purchase.</p>
          <Button className="mt-4 bg-accent hover:bg-accent/90" onClick={() => setIsAuthModalOpen(true)}>
            Sign In or Register
          </Button>
          <Button variant="outline" onClick={onCancel}>
            Back to Cart
          </Button>
        </div>

        <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} initialView="login" />
      </>
    )
  }

  return (
    <div className="space-y-6">
      {step === "confirmation" ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center text-center space-y-4 py-8"
        >
          <div className="rounded-full bg-green-100 p-3">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </div>
          <h3 className="text-xl font-bold">Order Confirmed!</h3>
          <p className="text-muted-foreground">
            Thank you for your purchase. Your order has been confirmed and will be shipped soon.
          </p>
          <p className="text-sm">
            Order reference: <span className="font-medium">ARM-{Math.floor(Math.random() * 10000)}</span>
          </p>
          <Button className="mt-4 bg-accent hover:bg-accent/90" onClick={onCancel}>
            Continue Shopping
          </Button>
        </motion.div>
      ) : (
        <Tabs value={step} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="shipping" disabled={step !== "shipping"}>
              Shipping
            </TabsTrigger>
            <TabsTrigger value="payment" disabled={step !== "payment"}>
              Payment
            </TabsTrigger>
          </TabsList>

          <TabsContent value="shipping" className="space-y-4 pt-4">
            <form onSubmit={handleShippingSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    value={shippingInfo.firstName}
                    onChange={handleShippingChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    value={shippingInfo.lastName}
                    onChange={handleShippingChange}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={shippingInfo.email}
                    onChange={handleShippingChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={shippingInfo.phone}
                    onChange={handleShippingChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  name="address"
                  value={shippingInfo.address}
                  onChange={handleShippingChange}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" name="city" value={shippingInfo.city} onChange={handleShippingChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="postalCode">Postal Code</Label>
                  <Input
                    id="postalCode"
                    name="postalCode"
                    value={shippingInfo.postalCode}
                    onChange={handleShippingChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input
                  id="country"
                  name="country"
                  value={shippingInfo.country}
                  onChange={handleShippingChange}
                  disabled
                />
              </div>

              <div className="flex justify-between pt-4">
                <Button type="button" variant="outline" onClick={onCancel}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-accent hover:bg-accent/90">
                  Continue to Payment
                </Button>
              </div>
            </form>
          </TabsContent>

          <TabsContent value="payment" className="space-y-4 pt-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handlePaymentSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input
                  id="cardNumber"
                  name="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={paymentInfo.cardNumber}
                  onChange={handlePaymentChange}
                  maxLength={19}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cardName">Name on Card</Label>
                <Input
                  id="cardName"
                  name="cardName"
                  placeholder="J. Smith"
                  value={paymentInfo.cardName}
                  onChange={handlePaymentChange}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input
                    id="expiry"
                    name="expiry"
                    placeholder="MM/YY"
                    value={paymentInfo.expiry}
                    onChange={handlePaymentChange}
                    maxLength={5}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvc">CVC</Label>
                  <Input
                    id="cvc"
                    name="cvc"
                    placeholder="123"
                    value={paymentInfo.cvc}
                    onChange={handlePaymentChange}
                    maxLength={3}
                    required
                  />
                </div>
              </div>

              <div className="rounded-md bg-muted p-3 flex items-center space-x-3 text-sm">
                <ShieldCheck className="h-5 w-5 text-muted-foreground" />
                <p className="text-muted-foreground">Your payment information is encrypted and secure.</p>
              </div>

              <Separator className="my-4" />

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Subtotal</span>
                  <span>R {totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Shipping</span>
                  <span>R 150.00</span>
                </div>
                <Separator className="my-2" />
                <div className="flex items-center justify-between font-medium">
                  <span>Total</span>
                  <span>R {(totalPrice + 150).toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <Button type="button" variant="outline" onClick={() => setStep("shipping")}>
                  Back
                </Button>
                <Button type="submit" className="bg-accent hover:bg-accent/90" disabled={isProcessing}>
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard className="mr-2 h-4 w-4" />
                      Pay R {(totalPrice + 150).toFixed(2)}
                    </>
                  )}
                </Button>
              </div>
            </form>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}

