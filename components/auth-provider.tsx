"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type User = {
  id: string
  name: string
  email: string
  avatar?: string
}

type AuthContextType = {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  register: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("armforce_user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error("Failed to parse stored user:", error)
        localStorage.removeItem("armforce_user")
      }
    }
    setIsLoading(false)
  }, [])

  // Mock login function
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simple validation - in a real app, this would be a server call
        if (email && password.length >= 6) {
          // Check if user exists in localStorage (for demo purposes)
          const users = JSON.parse(localStorage.getItem("armforce_users") || "[]")
          const existingUser = users.find((u: any) => u.email === email)

          if (existingUser && existingUser.password === password) {
            const loggedInUser = {
              id: existingUser.id,
              name: existingUser.name,
              email: existingUser.email,
            }

            setUser(loggedInUser)
            localStorage.setItem("armforce_user", JSON.stringify(loggedInUser))
            setIsLoading(false)
            resolve(true)
          } else {
            // For demo purposes, allow login with any valid email/password
            const newUser = {
              id: "user_" + Math.random().toString(36).substring(2, 9),
              name: email.split("@")[0],
              email: email,
            }

            setUser(newUser)
            localStorage.setItem("armforce_user", JSON.stringify(newUser))
            setIsLoading(false)
            resolve(true)
          }
        } else {
          setIsLoading(false)
          resolve(false)
        }
      }, 1000) // Simulate network delay
    })
  }

  // Mock register function
  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        if (name && email && password.length >= 6) {
          // Check if user already exists
          const users = JSON.parse(localStorage.getItem("armforce_users") || "[]")
          const existingUser = users.find((user: any) => user.email === email)

          if (existingUser) {
            setIsLoading(false)
            resolve(false)
            return
          }

          // Create new user
          const newUser = {
            id: "user_" + Math.random().toString(36).substring(2, 9),
            name,
            email,
            password, // In a real app, this would be hashed
          }

          // Save to "database" (localStorage)
          users.push(newUser)
          localStorage.setItem("armforce_users", JSON.stringify(users))

          // Log user in
          const loggedInUser = {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email,
          }

          setUser(loggedInUser)
          localStorage.setItem("armforce_user", JSON.stringify(loggedInUser))
          setIsLoading(false)
          resolve(true)
        } else {
          setIsLoading(false)
          resolve(false)
        }
      }, 1500) // Simulate network delay
    })
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("armforce_user")
  }

  const isAuthenticated = !!user

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

