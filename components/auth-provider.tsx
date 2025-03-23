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

// Helper function to generate unique IDs
const generateId = () => {
  return 'user_' + Math.random().toString(36).substring(2, 9);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Get user from localStorage on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem("boerforce_user")
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser))
        } catch (error) {
          console.error("Failed to parse stored user:", error)
          localStorage.removeItem("boerforce_user")
        }
      }
    }
  }, [])

  // Mock login function
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    // In a real app, this would be an API call
    // For demo purposes, we'll just check against some hardcoded data
    const users = JSON.parse(localStorage.getItem("boerforce_users") || "[]")
    const loggedInUser = users.find(
      (u: any) => u.email === email && u.password === password
    )

    if (loggedInUser) {
      const userWithoutPassword = { ...loggedInUser }
      delete userWithoutPassword.password
      
      setUser(userWithoutPassword)
      localStorage.setItem("boerforce_user", JSON.stringify(userWithoutPassword))
      setIsLoading(false)
      return true
    }

    setIsLoading(false)
    return false
  }

  // Mock register function
  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true)

    // Create a new user object
    const newUser = {
      id: generateId(),
      name,
      email,
      role: "customer" // Default role
    }

    // In a real app, this would be an API call
    // For demo purposes, we'll save to localStorage
    
    setUser(newUser)
    localStorage.setItem("boerforce_user", JSON.stringify(newUser))

    // Also store the user credentials (only for demo!)
    const userWithPassword = { ...newUser, password }
    
    // Get existing users
    const users = JSON.parse(localStorage.getItem("boerforce_users") || "[]")
    
    // Check if email already exists
    const existingUser = users.find((u: any) => u.email === email)
    
    if (existingUser) {
      setUser(null)
      setIsLoading(false)
      return false
    }
    
    // Add new user to list
    users.push(userWithPassword)
    
    // Save back to localStorage
    localStorage.setItem("boerforce_users", JSON.stringify(users))
    
    // Return success
    localStorage.setItem("boerforce_user", JSON.stringify(newUser))
    setIsLoading(false)
    return true
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("boerforce_user")
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

