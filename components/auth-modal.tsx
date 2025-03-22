"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { AlertCircle, Loader2, CheckCircle, User, Lock, Mail, UserPlus } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
  initialView?: "login" | "register"
}

export default function AuthModal({ isOpen, onClose, initialView = "login" }: AuthModalProps) {
  const { login, register } = useAuth()
  const [view, setView] = useState<"login" | "register">(initialView)
  const [isFlipping, setIsFlipping] = useState(false)

  // Login form state
  const [loginEmail, setLoginEmail] = useState("")
  const [loginPassword, setLoginPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)

  // Register form state
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [agreeTerms, setAgreeTerms] = useState(false)

  // Status state
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setView(initialView)
      setError("")
      setSuccess(false)
      setIsLoading(false)
    }
  }, [isOpen, initialView])

  const handleSwitchView = () => {
    setIsFlipping(true)
    setTimeout(() => {
      setView(view === "login" ? "register" : "login")
      setError("")
      setIsFlipping(false)
    }, 400) // Half of the animation duration
  }

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const result = await login(loginEmail, loginPassword)
      if (result) {
        setSuccess(true)
        setTimeout(() => {
          onClose()
        }, 1500)
      } else {
        setError("Invalid email or password. Please try again.")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Validation
    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (!agreeTerms) {
      setError("You must agree to the terms and conditions")
      return
    }

    setIsLoading(true)

    try {
      const result = await register(name, email, password)
      if (result) {
        setSuccess(true)
        setTimeout(() => {
          onClose()
        }, 1500)
      } else {
        setError("Registration failed. Please try again.")
      }
    } catch (err: any) {
      setError(err.message || "An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[900px] p-0 overflow-hidden">
        <div className="flex flex-col md:flex-row h-full">
          <AnimatePresence initial={false} mode="wait">
            {view === "login" ? (
              <>
                <motion.div
                  key="login-form"
                  className="w-full md:w-1/2 p-8"
                  initial={{ x: isFlipping ? 300 : 0, opacity: isFlipping ? 0 : 1 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -300, opacity: 0 }}
                  transition={{ duration: 0.8, type: "spring" }}
                >
                  <div className="space-y-6">
                    <div className="space-y-2 text-center">
                      <h2 className="text-3xl font-bold text-primary">Welcome Back</h2>
                      <p className="text-sm text-muted-foreground">Sign in to your account to continue</p>
                    </div>

                    <AnimatePresence>
                      {error && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                        >
                          <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{error}</AlertDescription>
                          </Alert>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <form onSubmit={handleLoginSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="email"
                            type="email"
                            placeholder="your.email@example.com"
                            className="pl-10"
                            value={loginEmail}
                            onChange={(e) => setLoginEmail(e.target.value)}
                            required
                            disabled={isLoading || success}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="password">Password</Label>
                          <Button variant="link" size="sm" className="px-0 text-xs" type="button">
                            Forgot password?
                          </Button>
                        </div>
                        <div className="relative">
                          <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            className="pl-10"
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                            required
                            disabled={isLoading || success}
                          />
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="remember"
                          checked={rememberMe}
                          onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                        />
                        <label
                          htmlFor="remember"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Remember me
                        </label>
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-accent hover:bg-accent/90"
                        disabled={isLoading || success}
                      >
                        {isLoading ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : success ? (
                          <CheckCircle className="mr-2 h-4 w-4" />
                        ) : (
                          <User className="mr-2 h-4 w-4" />
                        )}
                        {isLoading ? "Signing in..." : success ? "Success!" : "Sign In"}
                      </Button>
                    </form>

                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">
                        Don't have an account?{" "}
                        <Button
                          variant="link"
                          className="p-0 text-accent"
                          type="button"
                          onClick={handleSwitchView}
                          disabled={isLoading || success}
                        >
                          Sign up
                        </Button>
                      </p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  key="login-image"
                  className="hidden md:block w-1/2 bg-accent relative overflow-hidden"
                  initial={{ x: isFlipping ? -300 : 0, opacity: isFlipping ? 0 : 1 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 300, opacity: 0 }}
                  transition={{ duration: 0.8, type: "spring" }}
                >
                  <div className="absolute inset-0 flex items-center justify-center p-6">
                    <div className="max-w-sm text-center text-white">
                      <h3 className="text-2xl font-bold mb-4">Join ArmForce Pro</h3>
                      <p className="mb-6">
                        Create an account to access exclusive deals, track your orders, and join our community of arm
                        wrestling enthusiasts.
                      </p>
                      <Image
                        src="https://images.pexels.com/photos/6456160/pexels-photo-6456160.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                        alt="Arm wrestling training"
                        width={400}
                        height={300}
                        className="rounded-lg shadow-lg"
                      />
                    </div>
                  </div>
                </motion.div>
              </>
            ) : (
              <>
                <motion.div
                  key="register-image"
                  className="hidden md:block w-1/2 bg-primary relative overflow-hidden"
                  initial={{ x: isFlipping ? 300 : 0, opacity: isFlipping ? 0 : 1 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -300, opacity: 0 }}
                  transition={{ duration: 0.8, type: "spring" }}
                >
                  <div className="absolute inset-0 flex items-center justify-center p-6">
                    <div className="max-w-sm text-center text-white">
                      <h3 className="text-2xl font-bold mb-4">Welcome Back</h3>
                      <p className="mb-6">
                        Already have an account? Sign in to access your profile, orders, and continue your arm wrestling
                        journey.
                      </p>
                      <Image
                        src="https://images.pexels.com/photos/8111311/pexels-photo-8111311.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                        alt="Arm wrestling competition"
                        width={400}
                        height={300}
                        className="rounded-lg shadow-lg"
                      />
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  key="register-form"
                  className="w-full md:w-1/2 p-8"
                  initial={{ x: isFlipping ? -300 : 0, opacity: isFlipping ? 0 : 1 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 300, opacity: 0 }}
                  transition={{ duration: 0.8, type: "spring" }}
                >
                  <div className="space-y-6">
                    <div className="space-y-2 text-center">
                      <h2 className="text-3xl font-bold text-primary">Create Account</h2>
                      <p className="text-sm text-muted-foreground">Sign up to join the ArmForce Pro community</p>
                    </div>

                    <AnimatePresence>
                      {error && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                        >
                          <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{error}</AlertDescription>
                          </Alert>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <form onSubmit={handleRegisterSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="name"
                            placeholder="John Doe"
                            className="pl-10"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            disabled={isLoading || success}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="register-email">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="register-email"
                            type="email"
                            placeholder="your.email@example.com"
                            className="pl-10"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={isLoading || success}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="register-password">Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="register-password"
                            type="password"
                            placeholder="••••••••"
                            className="pl-10"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            disabled={isLoading || success}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="confirm-password"
                            type="password"
                            placeholder="••••••••"
                            className="pl-10"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            disabled={isLoading || success}
                          />
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="terms"
                          checked={agreeTerms}
                          onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                        />
                        <label
                          htmlFor="terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          I agree to the{" "}
                          <Button variant="link" className="p-0 text-accent h-auto" type="button">
                            terms and conditions
                          </Button>
                        </label>
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-accent hover:bg-accent/90"
                        disabled={isLoading || success}
                      >
                        {isLoading ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : success ? (
                          <CheckCircle className="mr-2 h-4 w-4" />
                        ) : (
                          <UserPlus className="mr-2 h-4 w-4" />
                        )}
                        {isLoading ? "Creating account..." : success ? "Success!" : "Create Account"}
                      </Button>
                    </form>

                    <div className="text-center">
                      <p className="text-sm text-muted-foreground">
                        Already have an account?{" "}
                        <Button
                          variant="link"
                          className="p-0 text-accent"
                          type="button"
                          onClick={handleSwitchView}
                          disabled={isLoading || success}
                        >
                          Sign in
                        </Button>
                      </p>
                    </div>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  )
}

