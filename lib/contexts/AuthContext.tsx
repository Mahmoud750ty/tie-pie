"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

interface MockUser {
  uid: string
  email: string | null
}

interface AuthContextType {
  user: MockUser | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<MockUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate auth state check with a delay
    const timer = setTimeout(() => {
      setLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const login = async (email: string, password: string) => {
    // Mock login for preview environment
    if (email === "mahmoud750t@gmail.com" && password === "123456") {
      setUser({ uid: "mock-admin", email: "admin@tiepie.com" })
    } else {
      throw new Error("بيانات الدخول غير صحيحة")
    }
  }

  const logout = async () => {
    setUser(null)
  }

  const value = {
    user,
    loading,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
